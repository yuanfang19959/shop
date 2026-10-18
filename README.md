# Atlas House

面向海外消费者的商品选购 Web 应用。用户可以浏览商品、按分类和关键词找到想买的东西，并把商品放进购物袋。界面默认英文，可切换中文；价格为美元。电脑和手机都可以使用。

技术栈：React、Vite。

## 启动

需要 Node.js 20 或更高版本。

```bash
npm install
npm run dev
```

浏览器打开终端里显示的本地地址。生产构建：

```bash
npm run build
npm run preview
```

端到端测试（会自行拉起开发服务）：

```bash
pnpm test:e2e
```

## 更新记录

### 2026-10-18

**图片资源。** `public/products/` 里 13 张商品 JPEG 的宽高和文件名都没改，只重新压缩了体积。合计从 1,811,968 字节降到 1,226,569 字节，少了约 32%（约 572 KB）。降幅最大的是 `arc-lamp.jpg`（96,380 → 45,960，约 52%）和 `candle.jpg`（183,979 → 88,552，约 52%）；`journal.jpg` 只少了约 4%（144,905 → 138,942）。`catalog.js` 里的图片路径没有动。

**测试用例。** 新增 `e2e/shop.spec.js` 和 `playwright.config.js`。`pnpm test:e2e` 会在 `127.0.0.1:5173` 执行 `pnpm dev`，桌面视口 1280×800；在 CI 里失败会重试 2 次。依赖为 `@playwright/test` 1.64.1，Vite 从 6.3.5 调到 6.4.4。`.gitignore` 忽略 `test-results`、`playwright-report`、`blob-report`、`playwright/.cache`。八条用例分别锁住：

- 首页英文标题、13 件商品、空购物袋，以及满 $120 全球免运费文案。
- 搜「床品」只留下 Chalk Linen Bedding；搜不存在的词出现 No pieces match，清空后回到 13 件。Apparel 只留踝靴。价格选 under $50 能看到 Trail Flask、看不到 Arc Floor Lamp。按价格从高到低时，第一件是 Chestnut Ankle Boots。价格和排序改用下拉框角色定位，避免和页面上其他同名标签冲突。
- 橄榄油（$28）加入后，寄美国结算 $36，改寄澳大利亚为 $46。关掉购物袋，再把首页主推的床品（$148）加入，合计 $176 并出现全球免运费；刷新后仍是 2 件。原先在购物袋里给橄榄油加数量，两件只有 $56，到不了 $120 免运费线，这条已改掉。
- 床品加到第 9 次时，状态提示 limited to 8 per order。
- 踝靴先选 39 码再加入，购物袋里显示 Size 39。
- 空结算表单提示 Please fix the highlighted fields，并聚焦姓名。填完姓名、邮箱、街道、城市、邮编后出现 Noted.、单号 `AH-` 加六位数字，以及未扣款说明。回到商店后购物袋为 0。
- 切到中文后刷新，标题仍是「给海外生活的器物。」，再切回英文。
- 390×844：展开搜索搜 flask，从底部购物袋条打开后能看到 Trail Flask。

**CI/CD。** `.github/workflows/ci.yml` 在推送到 `main`、向 `main` 提 Pull Request，或手动触发时运行。同一分支上新的一次会取消还在跑的检查。四项检查并行，都用 pnpm 8.6.1 和 Node.js 20，安装命令是 `pnpm install --frozen-lockfile`。锁文件是 `lockfileVersion: 6.1`，由 pnpm 8.6.1 生成；pnpm 9 会把它当成过期锁文件，冻结安装会直接失败。服务器上的 `scripts/deploy.sh` 会用 corepack 切到 pnpm 8.6.1 再安装：

- `build`：执行 `pnpm build`。
- `audit`：执行 `pnpm audit --audit-level high`，高危及以上漏洞会使流水线失败。
- `secrets`：安装 gitleaks 8.28.0，对全部提交历史执行 `gitleaks detect --source . --redact`。
- `e2e`：安装 Chromium 及系统依赖后执行 `pnpm test:e2e`。

四项都通过，并且不是 Pull Request 时，`deploy` 才跑。它使用仓库 `production` 环境，经 `appleboy/ssh-action` 1.2.2 SSH 到 ECS，超时 30 分钟。同一时间只允许一次生产部署。密钥为 `DEPLOY_HOST`、`DEPLOY_USER`、`DEPLOY_SSH_KEY`；`DEPLOY_PORT` 默认 22，`DEPLOY_PATH` 默认 `~/shop`。服务器上先 `git fetch origin main` 再 `git reset --hard origin/main`，然后执行 `scripts/deploy.sh`：快进拉取 `main`、按锁文件安装、`pnpm build`，已有 PM2 进程 `shop` 就 `pm2 reload`，没有则按 `ecosystem.config.js` 启动。`dist` 由 `serve` 以单页应用托管在 3001 端口，内存超过 300MB 会重启。脚本最后请求 `http://127.0.0.1:3001/`，失败则这次部署失败。`.gitattributes` 规定 `*.sh` 使用 LF，保证 `deploy.sh` 在 Linux 上能执行。

## 可以做什么

- 按分类、价格和关键词浏览 13 件商品，并切换排序。
- 打开商品详情，选择数量；踝靴需要先选尺码。
- 加入购物袋，修改数量或移除。满 $120 显示全球免运费，运费会随寄送国家变化。
- 提交一笔示例订单。这是演示结算，不会扣款，也不会发货。
- 购物袋、语言和寄送国家保存在浏览器本地。

## 说明

没有后端，也没有真实支付。刷新页面会回到商店首页，购物袋仍会保留；商品详情和结算页不会保留在网址里。
