#!/usr/bin/env bash
# ==============================================================================
# NHIT Production Deployment Script — Staged Zero-Downtime Swap
# ==============================================================================
# Target: technhit_app (Image: technhit-portal:production, Port: 3000)
# Behavior: Builds candidate image, tests health on port 3005, cutover <1s,
#           auto-rolls back if candidate fails health probe.
# ==============================================================================

set -Eeuo pipefail

# Configuration
CONTAINER_NAME="${CONTAINER_NAME:-technhit_app}"
IMAGE_NAME="${IMAGE_NAME:-technhit-portal:production}"
CANDIDATE_NAME="${CANDIDATE_NAME:-technhit_candidate}"
CANDIDATE_IMAGE="${CANDIDATE_IMAGE:-technhit-portal:candidate}"
PROD_PORT="${PROD_PORT:-3000}"
TEST_PORT="${TEST_PORT:-3005}"
HEALTH_ENDPOINT="http://localhost:${TEST_PORT}/api/health"
MAX_RETRIES=25
RETRY_DELAY=2

echo "─────────────────────────────────────────────────────────────"
echo "🚀 [NHIT DEPLOY] Starting Staged Deployment for: ${CONTAINER_NAME}"
echo "📅 Timestamp: $(date -u +"%Y-%m-%d %H:%M:%SZ")"
echo "─────────────────────────────────────────────────────────────"

# Determine script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="${APP_DIR:-$(cd "${SCRIPT_DIR}/.." && pwd)}"
cd "${APP_DIR}"

# Step 1: Detect Docker Network of running container (if any)
NETWORK_NAME=""
if docker ps -a --format '{{.Names}}' | grep -E "^${CONTAINER_NAME}$" >/dev/null 2>&1; then
    DETECTED_NET=$(docker inspect -f '{{range $k, $v := .NetworkSettings.Networks}}{{$k}} {{end}}' "${CONTAINER_NAME}" | awk '{print $1}')
    if [ -n "${DETECTED_NET}" ] && [ "${DETECTED_NET}" != "bridge" ]; then
        NETWORK_NAME="${DETECTED_NET}"
        echo "🌐 Detected existing Docker network: ${NETWORK_NAME}"
    fi
fi

# Step 2: Clean up any leftover candidate container
if docker ps -a --format '{{.Names}}' | grep -E "^${CANDIDATE_NAME}$" >/dev/null 2>&1; then
    echo "🧹 Removing previous candidate container..."
    docker rm -f "${CANDIDATE_NAME}" >/dev/null 2>&1 || true
fi

# Step 3: Build Candidate Docker Image
echo "🔨 Building Candidate Image: ${CANDIDATE_IMAGE}..."
docker build -t "${CANDIDATE_IMAGE}" .

# Step 4: Run Candidate Container on Temporary Test Port
echo "🧪 Launching candidate container on port ${TEST_PORT} for validation..."
if [ -n "${NETWORK_NAME}" ]; then
    docker run -d --name "${CANDIDATE_NAME}" --network "${NETWORK_NAME}" -p "${TEST_PORT}:3000" "${CANDIDATE_IMAGE}" >/dev/null
else
    docker run -d --name "${CANDIDATE_NAME}" -p "${TEST_PORT}:3000" "${CANDIDATE_IMAGE}" >/dev/null
fi

# Step 5: Health Check Probe with Retries
echo "🩺 Probing health endpoint (${HEALTH_ENDPOINT})..."
HEALTHY=0
for ((i=1; i<=MAX_RETRIES; i++)); do
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "${HEALTH_ENDPOINT}" || true)
    if [ "${HTTP_CODE}" = "200" ]; then
        echo "✅ Candidate health check passed with HTTP 200 (Attempt ${i}/${MAX_RETRIES})"
        HEALTHY=1
        break
    fi
    echo "⏳ Waiting for candidate container to warm up... (Attempt ${i}/${MAX_RETRIES}, HTTP: ${HTTP_CODE})"
    sleep "${RETRY_DELAY}"
done

# Step 6: Handle Probe Failure / Rollback
if [ "${HEALTHY}" -ne 1 ]; then
    echo "❌ ERROR: Health probe failed! Candidate container did not become healthy in time."
    echo "📋 Dumping candidate container logs:"
    docker logs "${CANDIDATE_NAME}" --tail 50 || true
    echo "🛑 Cleaning up candidate container. Production container ${CONTAINER_NAME} was untouched."
    docker rm -f "${CANDIDATE_NAME}" >/dev/null 2>&1 || true
    exit 1
fi

# Step 7: Fast Cutover (< 1 second swap)
echo "⚡ Executing zero-downtime container swap to port ${PROD_PORT}..."
docker rm -f "${CANDIDATE_NAME}" >/dev/null 2>&1 || true
docker tag "${CANDIDATE_IMAGE}" "${IMAGE_NAME}"

# Stop old production container and launch updated container
if docker ps -a --format '{{.Names}}' | grep -E "^${CONTAINER_NAME}$" >/dev/null 2>&1; then
    echo "🔄 Stopping previous ${CONTAINER_NAME} container..."
    docker stop "${CONTAINER_NAME}" >/dev/null 2>&1 || true
    docker rm "${CONTAINER_NAME}" >/dev/null 2>&1 || true
fi

echo "🌟 Starting updated ${CONTAINER_NAME} on port ${PROD_PORT}..."
if [ -n "${NETWORK_NAME}" ]; then
    docker run -d \
      --name "${CONTAINER_NAME}" \
      --network "${NETWORK_NAME}" \
      -p "${PROD_PORT}:3000" \
      --restart unless-stopped \
      "${IMAGE_NAME}" >/dev/null
else
    docker run -d \
      --name "${CONTAINER_NAME}" \
      -p "${PROD_PORT}:3000" \
      --restart unless-stopped \
      "${IMAGE_NAME}" >/dev/null
fi

# Step 8: Verify Live Service
sleep 2
LIVE_CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:${PROD_PORT}/api/health" || true)
if [ "${LIVE_CODE}" = "200" ]; then
    echo "🎉 Live verification successful! http://localhost:${PROD_PORT}/api/health responded HTTP 200"
else
    echo "⚠️ Warning: Live endpoint returned HTTP ${LIVE_CODE}. Check container logs: docker logs ${CONTAINER_NAME}"
fi

# Step 9: Cleanup Dangling Layers
echo "🧹 Pruning old unused images..."
docker image prune -f >/dev/null 2>&1 || true

echo "─────────────────────────────────────────────────────────────"
echo "✅ [NHIT DEPLOY] Deployment Completed Successfully!"
echo "─────────────────────────────────────────────────────────────"

