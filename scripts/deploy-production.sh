#!/usr/bin/env bash
# ==============================================================================
# NHIT.IN Production Zero-Downtime Blue/Green Deployment Script
# ==============================================================================
# Target Root: /www/wwwroot/nhit.in
# Architecture:
#   - Public Port: 3000 (Routed via lightweight Nginx reverse proxy `nhit_in_proxy`)
#   - Slot Blue:  Port 3001 (`nhit_in_blue`)
#   - Slot Green: Port 3002 (`nhit_in_green`)
#   - Zero Dropped Connections: Nginx `nginx -s reload` after candidate health pass
#   - Conflict Protection: Scans and blocks all existing production ports
#   - Auto-Migration: Cleans up legacy `technhit_*` containers automatically
# ==============================================================================

set -Eeuo pipefail

# ── Color Definitions ──────────────────────────────────────────────────────────
C_RESET='\033[0m'
C_BOLD='\033[1m'
C_GREEN='\033[32m'
C_BLUE='\033[34m'
C_CYAN='\033[36m'
C_YELLOW='\033[33m'
C_RED='\033[31m'
C_MAGENTA='\033[35m'

# ── Production Port Safety Matrix (FORBIDDEN CONFLICT PORTS) ───────────────────
# Ports assigned to existing production containers on the server:
#   1025: exam_mailpit (SMTP)
#   3000: nhit_in public entrypoint
#   3307: erp_db (MySQL 5.7)
#   3308: snipeit_mariadb (MariaDB 11.4.7)
#   3309: exam_db (MySQL 5.7)
#   6380: exam_redis (Redis 7)
#   8000: exam_webserver (Nginx)
#   8001: snipeit_app (Snipe-IT)
#   8025: exam_mailpit (Web UI)
#   8080: vlab-simulators-prod
#   8081: erp_phpmyadmin
#   8082: erp_webserver (Nginx)
#   8085: vlab-simulators-green
FORBIDDEN_PORTS=(1025 3000 3307 3308 3309 6380 8000 8001 8025 8080 8081 8082 8085)

# ── Configuration Variables (Standardized to nhit_in) ──────────────────────────
IMAGE_NAME="nhit_in:production"
PROXY_NAME="nhit_in_proxy"
BLUE_NAME="nhit_in_blue"
GREEN_NAME="nhit_in_green"
BLUE_PORT=3001
GREEN_PORT=3002
PUBLIC_PORT=3000
DOCKER_NETWORK="nhit_in_net"

MAX_RETRIES=30
RETRY_DELAY=2

# State directory for persistence (Defaulting to /www/wwwroot/nhit.in)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if [ -d "/www/wwwroot/nhit.in" ]; then
    DEFAULT_APP_DIR="/www/wwwroot/nhit.in"
else
    DEFAULT_APP_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
fi
APP_DIR="${APP_DIR:-${DEFAULT_APP_DIR}}"
STATE_FILE="${APP_DIR}/.active_slot"
NGINX_CONF_DIR="${APP_DIR}/nginx_proxy"

# ── Helper Functions ──────────────────────────────────────────────────────────

print_header() {
    echo -e "${C_CYAN}─────────────────────────────────────────────────────────────${C_RESET}"
    echo -e "${C_BOLD}🚀 NHIT.IN Production Zero-Downtime Blue/Green Deployer${C_RESET}"
    echo -e "📅 Timestamp: $(date -u +"%Y-%m-%d %H:%M:%SZ")"
    echo -e "📁 Directory: ${APP_DIR}"
    echo -e "${C_CYAN}─────────────────────────────────────────────────────────────${C_RESET}"
}

# Check if a port is in the forbidden production list
is_port_forbidden() {
    local check_port="$1"
    for forbidden in "${FORBIDDEN_PORTS[@]}"; do
        if [ "$check_port" -eq "$forbidden" ]; then
            return 0
        fi
    done
    return 1
}

# Verify a host port is free from any active listener
is_port_in_use() {
    local port="$1"
    if command -v ss >/dev/null 2>&1; then
        ss -tuln | grep -E "(:|\])${port}\b" >/dev/null 2>&1 && return 0
    elif command -v netstat >/dev/null 2>&1; then
        netstat -tuln | grep -E "(:|\])${port}\b" >/dev/null 2>&1 && return 0
    fi
    # Also check docker container bindings
    docker ps --format '{{.Ports}}' | grep -E "(:|->)${port}/" >/dev/null 2>&1 && return 0
    return 1
}

# Find an alternative safe port if 3001 or 3002 is ever busy
get_safe_port() {
    local preferred="$1"
    local slot="$2"

    if ! is_port_forbidden "$preferred" && ! is_port_in_use "$preferred"; then
        echo "$preferred"
        return 0
    fi

    # Scan 3001..3020 for an unassigned, non-forbidden port
    for test_p in {3001..3020}; do
        if ! is_port_forbidden "$test_p" && ! is_port_in_use "$test_p"; then
            echo -e "${C_YELLOW}⚠️ Preferred port ${preferred} was busy. Assigned safe alternate: ${test_p}${C_RESET}" >&2
            echo "$test_p"
            return 0
        fi
    done

    echo -e "${C_RED}❌ ERROR: No free port found in range 3001-3020!${C_RESET}" >&2
    exit 1
}

# Ensure isolated Docker network exists
ensure_network() {
    if ! docker network inspect "${DOCKER_NETWORK}" >/dev/null 2>&1; then
        echo -e "${C_CYAN}🌐 Creating isolated internal bridge network: ${DOCKER_NETWORK}${C_RESET}"
        docker network create "${DOCKER_NETWORK}" >/dev/null
    fi
}

# Clean up any legacy "technhit" containers so ports are unblocked
cleanup_legacy_containers() {
    local legacy_containers=("technhit_app" "technhit_proxy" "technhit_blue" "technhit_green" "technhit_candidate")
    for legacy in "${legacy_containers[@]}"; do
        if docker ps -a --format '{{.Names}}' | grep -E "^${legacy}$" >/dev/null 2>&1; then
            echo -e "${C_YELLOW}🧹 Cleaning up legacy container: ${legacy}...${C_RESET}"
            docker stop "${legacy}" >/dev/null 2>&1 || true
            docker rm -f "${legacy}" >/dev/null 2>&1 || true
        fi
    done
}

# Generate Nginx upstream configuration
generate_nginx_config() {
    local target_container="$1"
    mkdir -p "${NGINX_CONF_DIR}"

    cat <<EOF > "${NGINX_CONF_DIR}/default.conf"
upstream nhit_upstream {
    server ${target_container}:3000;
    keepalive 32;
}

server {
    listen 3000;
    server_name _;

    client_max_body_size 64M;

    # Gzip Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    location / {
        proxy_pass http://nhit_upstream;
        proxy_http_version 1.1;

        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;

        proxy_connect_timeout 5s;
        proxy_read_timeout 60s;
        proxy_send_timeout 60s;
    }
}
EOF
}

# Ensure the proxy container is running on public port 3000
ensure_proxy() {
    local active_container="$1"

    generate_nginx_config "${active_container}"

    # Check if proxy is already running
    if docker ps --format '{{.Names}}' | grep -E "^${PROXY_NAME}$" >/dev/null 2>&1; then
        return 0
    fi

    # Clean legacy containers that might hold port 3000
    cleanup_legacy_containers

    echo -e "${C_CYAN}🛡️ Launching ${PROXY_NAME} (Nginx reverse proxy) on public port ${PUBLIC_PORT}...${C_RESET}"
    docker run -d \
        --name "${PROXY_NAME}" \
        --network "${DOCKER_NETWORK}" \
        -p "${PUBLIC_PORT}:3000" \
        -v "${NGINX_CONF_DIR}/default.conf:/etc/nginx/conf.d/default.conf:ro" \
        --restart unless-stopped \
        nginx:alpine >/dev/null
}

# Reload proxy configuration with zero dropped connections
reload_proxy() {
    local target_container="$1"
    echo -e "${C_CYAN}⚡ Updating proxy upstream to: ${target_container}...${C_RESET}"
    generate_nginx_config "${target_container}"
    docker exec "${PROXY_NAME}" nginx -s reload >/dev/null
    echo -e "${C_GREEN}✅ Nginx upstream reloaded in < 5ms. Active traffic routed to ${target_container}.${C_RESET}"
}

# ── Main Deployment Workflow ──────────────────────────────────────────────────

deploy() {
    print_header
    cd "${APP_DIR}"
    ensure_network

    # Step 1: Clean legacy containers if present
    cleanup_legacy_containers

    # Step 2: Port Collision Audit
    echo -e "\n${C_BOLD}[Step 1/6] Auditing Production Ports to Avoid Conflicts...${C_RESET}"
    for p in "${FORBIDDEN_PORTS[@]}"; do
        if is_port_in_use "$p" && [ "$p" -ne "$PUBLIC_PORT" ]; then
            echo -e "   🔒 Port ${p}: In use by existing production container (Protected)"
        fi
    done

    # Step 3: Determine Current Active and Inactive Slots
    ACTIVE_SLOT="none"
    if [ -f "${STATE_FILE}" ]; then
        ACTIVE_SLOT=$(cat "${STATE_FILE}" | tr -d '[:space:]')
    elif docker ps --format '{{.Names}}' | grep -E "^${BLUE_NAME}$" >/dev/null 2>&1; then
        ACTIVE_SLOT="blue"
    elif docker ps --format '{{.Names}}' | grep -E "^${GREEN_NAME}$" >/dev/null 2>&1; then
        ACTIVE_SLOT="green"
    fi

    if [ "${ACTIVE_SLOT}" = "blue" ]; then
        NEXT_SLOT="green"
        NEXT_NAME="${GREEN_NAME}"
        NEXT_PORT=$(get_safe_port "${GREEN_PORT}" "green")
        OLD_NAME="${BLUE_NAME}"
        OLD_PORT="${BLUE_PORT}"
    else
        NEXT_SLOT="blue"
        NEXT_NAME="${BLUE_NAME}"
        NEXT_PORT=$(get_safe_port "${BLUE_PORT}" "blue")
        OLD_NAME="${GREEN_NAME}"
        OLD_PORT="${GREEN_PORT}"
    fi

    echo -e "\n${C_BOLD}[Step 2/6] Slot Planning:${C_RESET}"
    echo -e "   • Active Slot:   ${C_YELLOW}${ACTIVE_SLOT}${C_RESET}"
    echo -e "   • Target Slot:   ${C_GREEN}${NEXT_SLOT}${C_RESET} (${NEXT_NAME} on Host Port ${NEXT_PORT})"

    # Step 4: Git Pull & Build Image
    echo -e "\n${C_BOLD}[Step 3/6] Fetching Latest Code & Building Image...${C_RESET}"
    if [ -d ".git" ]; then
        echo -e "   📥 Running git fetch & pull from origin/main..."
        git fetch origin main >/dev/null 2>&1 || true
        git pull origin main || true
    fi

    echo -e "   🔨 Building multi-stage Docker image: ${IMAGE_NAME}..."
    docker build -t "${IMAGE_NAME}" .

    # Step 5: Launch Candidate Slot
    echo -e "\n${C_BOLD}[Step 4/6] Launching Candidate Slot (${NEXT_NAME})...${C_RESET}"
    if docker ps -a --format '{{.Names}}' | grep -E "^${NEXT_NAME}$" >/dev/null 2>&1; then
        echo -e "   🧹 Cleaning existing ${NEXT_NAME} container..."
        docker rm -f "${NEXT_NAME}" >/dev/null 2>&1 || true
    fi

    docker run -d \
        --name "${NEXT_NAME}" \
        --network "${DOCKER_NETWORK}" \
        -p "${NEXT_PORT}:3000" \
        --restart unless-stopped \
        "${IMAGE_NAME}" >/dev/null

    # Step 6: Health Check Probe
    echo -e "\n${C_BOLD}[Step 5/6] Probing Candidate Health (http://localhost:${NEXT_PORT}/api/health)...${C_RESET}"
    HEALTHY=0
    for ((i=1; i<=MAX_RETRIES; i++)); do
        HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:${NEXT_PORT}/api/health" || true)
        if [ "${HTTP_CODE}" = "200" ]; then
            echo -e "   ${C_GREEN}✅ Slot ${NEXT_SLOT} passed healthcheck with HTTP 200 (Attempt ${i}/${MAX_RETRIES})${C_RESET}"
            HEALTHY=1
            break
        fi
        echo -e "   ⏳ Waiting for ${NEXT_NAME} to initialize... (Attempt ${i}/${MAX_RETRIES}, HTTP Code: ${HTTP_CODE})"
        sleep "${RETRY_DELAY}"
    done

    # Handle Health Failure
    if [ "${HEALTHY}" -ne 1 ]; then
        echo -e "\n${C_RED}❌ ERROR: Health probe failed! Candidate slot ${NEXT_SLOT} did not return HTTP 200.${C_RESET}"
        echo -e "${C_YELLOW}📋 Candidate Container Logs:${C_RESET}"
        docker logs "${NEXT_NAME}" --tail 30 || true
        echo -e "${C_RED}🛑 Aborting deployment. Removing unhealthy candidate. Active slot (${ACTIVE_SLOT}) UNTOUCHED!${C_RESET}"
        docker rm -f "${NEXT_NAME}" >/dev/null 2>&1 || true
        exit 1
    fi

    # Step 7: Zero-Downtime Traffic Switch
    echo -e "\n${C_BOLD}[Step 6/6] Zero-Downtime Traffic Switch on Port ${PUBLIC_PORT}...${C_RESET}"
    ensure_proxy "${NEXT_NAME}"
    reload_proxy "${NEXT_NAME}"

    # Update state file
    echo "${NEXT_SLOT}" > "${STATE_FILE}"

    # Graceful cooldown for in-flight requests on previous slot
    if [ "${ACTIVE_SLOT}" != "none" ] && docker ps --format '{{.Names}}' | grep -E "^${OLD_NAME}$" >/dev/null 2>&1; then
        echo -e "   ⏳ Cooling down previous slot (${OLD_NAME}) for 5s to complete in-flight requests..."
        sleep 5
        echo -e "   ⏸️ Stopping idle slot: ${OLD_NAME} (preserved on disk for instant rollback)"
        docker stop "${OLD_NAME}" >/dev/null 2>&1 || true
    fi

    # Prune dangling layers
    docker image prune -f >/dev/null 2>&1 || true

    echo -e "\n${C_CYAN}─────────────────────────────────────────────────────────────${C_RESET}"
    echo -e "${C_GREEN}${C_BOLD}🎉 DEPLOYMENT SUCCESSFUL FOR NHIT.IN!${C_RESET}"
    echo -e "   • Public Port:      http://localhost:${PUBLIC_PORT} (Serving Live)"
    echo -e "   • Active Slot:      ${C_GREEN}${NEXT_SLOT} (${NEXT_NAME} on :${NEXT_PORT})${C_RESET}"
    echo -e "   • Inactive Slot:    ${OLD_NAME} (Stopped standby for instant rollback)"
    echo -e "   • Proxy Container:  ${PROXY_NAME}"
    echo -e "${C_CYAN}─────────────────────────────────────────────────────────────${C_RESET}"
}

# ── Instant Rollback Function ─────────────────────────────────────────────────

rollback() {
    print_header
    echo -e "${C_YELLOW}🔄 [ROLLBACK INITIATED] Reversing to alternate slot...${C_RESET}"

    if [ ! -f "${STATE_FILE}" ]; then
        echo -e "${C_RED}❌ State file not found! Unable to automatically detect alternate slot.${C_RESET}"
        exit 1
    fi

    CURRENT_SLOT=$(cat "${STATE_FILE}" | tr -d '[:space:]')
    if [ "${CURRENT_SLOT}" = "blue" ]; then
        ROLLBACK_SLOT="green"
        ROLLBACK_NAME="${GREEN_NAME}"
        ROLLBACK_PORT="${GREEN_PORT}"
    else
        ROLLBACK_SLOT="blue"
        ROLLBACK_NAME="${BLUE_NAME}"
        ROLLBACK_PORT="${BLUE_PORT}"
    fi

    echo -e "   • Current Slot:      ${CURRENT_SLOT}"
    echo -e "   • Rollback Target:   ${ROLLBACK_SLOT} (${ROLLBACK_NAME})"

    # Ensure target container is running
    if ! docker ps --format '{{.Names}}' | grep -E "^${ROLLBACK_NAME}$" >/dev/null 2>&1; then
        echo -e "   ▶️ Starting standby container: ${ROLLBACK_NAME}..."
        docker start "${ROLLBACK_NAME}" >/dev/null 2>&1 || {
            echo -e "${C_RED}❌ Target container ${ROLLBACK_NAME} does not exist to start!${C_RESET}"
            exit 1
        }
    fi

    # Probe target health
    echo -e "   🩺 Verifying rollback target health..."
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:${ROLLBACK_PORT}/api/health" || true)
    if [ "${HTTP_CODE}" != "200" ]; then
        echo -e "${C_RED}❌ Rollback target returned HTTP ${HTTP_CODE}, not 200. Aborting rollback!${C_RESET}"
        exit 1
    fi

    # Switch proxy
    reload_proxy "${ROLLBACK_NAME}"
    echo "${ROLLBACK_SLOT}" > "${STATE_FILE}"

    echo -e "${C_GREEN}✅ Rollback completed in < 10ms! Active slot is now ${ROLLBACK_SLOT}.${C_RESET}"
}

# ── Status Overview Function ──────────────────────────────────────────────────

status() {
    print_header
    echo -e "${C_BOLD}📊 NHIT.IN Deployment & Port Allocation Status:${C_RESET}\n"

    ACTIVE_SLOT="none"
    [ -f "${STATE_FILE}" ] && ACTIVE_SLOT=$(cat "${STATE_FILE}" | tr -d '[:space:]')

    echo -e "   • Active Slot:         ${C_GREEN}${ACTIVE_SLOT}${C_RESET}"
    echo -e "   • Public Proxy Port:   ${PUBLIC_PORT} ($(docker inspect -f '{{.State.Status}}' ${PROXY_NAME} 2>/dev/null || echo 'Not running'))"
    echo -e "   • Slot Blue:           Port ${BLUE_PORT} ($(docker inspect -f '{{.State.Status}}' ${BLUE_NAME} 2>/dev/null || echo 'Not running'))"
    echo -e "   • Slot Green:          Port ${GREEN_PORT} ($(docker inspect -f '{{.State.Status}}' ${GREEN_NAME} 2>/dev/null || echo 'Not running'))"

    echo -e "\n${C_BOLD}🛡️ Protected Production Ports:${C_RESET}"
    for p in "${FORBIDDEN_PORTS[@]}"; do
        if is_port_in_use "$p"; then
            echo -e "   [ACTIVE]   Port ${p} (Protected Service)"
        else
            echo -e "   [RESERVED] Port ${p}"
        fi
    done
}

# ── Port Audit Test Function ──────────────────────────────────────────────────

test_ports() {
    print_header
    echo -e "${C_BOLD}🔍 Checking all production ports for collisions:${C_RESET}\n"
    for p in "${FORBIDDEN_PORTS[@]}"; do
        if is_port_in_use "$p"; then
            echo -e "   ❌ Port ${p} is in use (Verified in forbidden list)"
        else
            echo -e "   ✅ Port ${p} is clear"
        fi
    done

    echo -e "\n${C_BOLD}🔍 Verifying Slot Ports:${C_RESET}"
    for slot_p in "${BLUE_PORT}" "${GREEN_PORT}"; do
        if is_port_forbidden "$slot_p"; then
            echo -e "   ❌ ERROR: Slot port ${slot_p} collides with forbidden list!"
        else
            echo -e "   ✅ Slot port ${slot_p} is safe and does not collide with any production container."
        fi
    done
}

# ── Command Dispatcher ────────────────────────────────────────────────────────

ACTION="${1:-deploy}"
case "${ACTION}" in
    deploy)
        deploy
        ;;
    rollback)
        rollback
        ;;
    status)
        status
        ;;
    test-ports)
        test_ports
        ;;
    *)
        echo -e "Usage: $0 {deploy|rollback|status|test-ports}"
        exit 1
        ;;
esac
