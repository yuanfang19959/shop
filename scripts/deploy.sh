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

# 锁文件是 pnpm 8.6.1 的 lockfileVersion 6.1，pnpm 9 无法冻结安装。
corepack enable
corepack prepare pnpm@8.6.1 --activate

pnpm install --frozen-lockfile
pnpm build

export DEPLOY_WEB_PORT="${WEB_PORT}"

if pm2 describe "${PM2_WEB}" >/dev/null 2>&1; then
  pm2 delete "${PM2_WEB}"
fi
pm2 start "${ROOT}/ecosystem.config.js" --only "${PM2_WEB}" --update-env
pm2 save

sleep 2
curl -sf "http://127.0.0.1:${WEB_PORT}/shop/" >/dev/null
curl -sf -o /dev/null -w "%{content_type}" "http://127.0.0.1:${WEB_PORT}/shop/products/linen-throw.jpg" | grep -q image/jpeg
echo "==> Deploy finished"
pm2 status
