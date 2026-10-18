/**
 * 静态站点。pnpm build 覆盖 dist 后，由 shop 挂在 /shop/。
 * 端口 3001，与 Nginx location /shop/ 对齐。
 * 使用 .cjs：package.json 的 "type": "module" 会把 .js 当成 ES 模块，PM2 无法读取 module.exports。
 */
const webPort = process.env.DEPLOY_WEB_PORT || process.env.PM2_SERVE_PORT || '3001';

module.exports = {
  apps: [
    {
      name: 'shop',
      script: 'scripts/serve-shop.mjs',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'production',
        DEPLOY_WEB_PORT: webPort,
      },
    },
  ],
};
