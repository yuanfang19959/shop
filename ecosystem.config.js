/**
 * 静态站点。pnpm build 覆盖 dist 后，由 shop 托管。
 * 端口 3001。
 */
const webPort = process.env.DEPLOY_WEB_PORT || process.env.PM2_SERVE_PORT || '3001';

module.exports = {
  apps: [
    {
      name: 'shop',
      script: 'serve',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '300M',
      env: {
        NODE_ENV: 'production',
        PM2_SERVE_PATH: './dist',
        PM2_SERVE_PORT: webPort,
        PM2_SERVE_SPA: 'true',
        PM2_SERVE_HOMEPAGE: '/index.html',
      },
    },
  ],
};
