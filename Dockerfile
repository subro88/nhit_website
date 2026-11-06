# syntax=docker/dockerfile:1

# ── Stage 1: Dependencies ──────────────────────────────
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# ── Stage 2: Builder ───────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN npm run build

# ── Stage 3: Runner ────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy static assets and standalone server output
COPY --from=builder /app/public ./public
COPY --from=builder /app/content ./content
COPY --from=builder /app/upload ./upload

# Automatically created by "output: 'standalone'" in next.config.mjs
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# CMS state (cms-users.json / cms-secret.txt) is auto-seeded here by the app;
# must be writable by nextjs. deploy-production.sh mounts a persistent volume
# over this path so admin accounts survive redeploys.
RUN mkdir -p /app/cms-state && chown nextjs:nodejs /app/cms-state

USER nextjs

EXPOSE 3000

# 127.0.0.1, not localhost: busybox wget prefers ::1, the server binds IPv4.
HEALTHCHECK --interval=20s --timeout=5s --retries=3 --start-period=10s \
  CMD wget -qO- http://127.0.0.1:3000/api/health || exit 1

CMD ["node", "server.js"]

