#!/usr/bin/env bash
# 在仓库目录里直接安装、构建，覆盖 dist 后重启 PM2。
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

PM2_WEB="${DEPLOY_PM2_WEB:-shop}"
WEB_PORT="${DEPLOY_WEB_PORT:-3001}"
BRANCH="${DEPLOY_BRANCH:-main}"

echo "==> shop deploy @ $(date -u +%Y-%m-%dT%H:%M:%SZ)"

git fetch origin "${BRANCH}"
git checkout "${BRANCH}"
git pull --ff-only origin "${BRANCH}"

pnpm install --frozen-lockfile
pnpm build

export PM2_SERVE_PATH="${ROOT}/dist"
export PM2_SERVE_PORT="${WEB_PORT}"
export PM2_SERVE_SPA=true
export PM2_SERVE_HOMEPAGE=/index.html

if pm2 describe "${PM2_WEB}" >/dev/null 2>&1; then
  pm2 reload "${PM2_WEB}" --update-env
else
  echo "==> PM2 app ${PM2_WEB} not found, starting"
  pm2 start "${ROOT}/ecosystem.config.js" --only "${PM2_WEB}" --update-env
fi
pm2 save

sleep 2
curl -sf "http://127.0.0.1:${WEB_PORT}/" >/dev/null
echo "==> Deploy finished"
pm2 status
