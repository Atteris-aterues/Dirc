## 学习与环境准备清单（Education Resource Platform）

本项目为 Vue 2.7 + Vite 5 + Tailwind CSS 的前端应用，内置简易 Express 静态/代理服务与 Nginx/Docker 部署示例。本文档列出“需要学习的知识点”和“需要安装的软件”，并提供安装与验证步骤（Windows/PowerShell）。

### 1) 必装软件（Windows）
- Node.js 18 LTS 或更高（建议 18.x，兼容 Vite 5）
  - 可选：NVM for Windows（多版本管理）
- 包管理器：Yarn（仓库包含 `yarn.lock`；也可用 npm/pnpm）,用npm来运行项目
- Git（版本管理）
- VS Code（推荐编辑器）
  - 扩展：ESLint、Prettier、Tailwind CSS IntelliSense、Vue Language Features (Volar)、GitLens
- Chrome/Edge（开发者工具）
- Apifox（接口调试）
- Docker Desktop（可选，用于一键容器化部署）
- Nginx（可选，本地验证 `nginx.conf`）



### 2) 快速安装命令（PowerShell）
```powershell
nvm install 18.20.3
nvm use 18.20.3
npm i -g yarn
git clone <your-repo-url>
cd qianduan
yarn install
```

### 3) 本地运行与构建
```powershell
yarn dev
yarn build
yarn preview
yarn serve
```

### 4) 需要学习的知识点（按优先级）
- 核心框架
  - Vue 2.7 基础与进阶（Options API 与内置 Composition API 兼容层）
  - Vue Router 3（路由、守卫、滚动行为）
  - Vuex 3（状态管理、模块化、持久化策略）
- 工具链与工程化
  - Vite 5（别名配置、环境变量、构建优化）
  - Tailwind CSS 3（原子化样式、响应式/暗色、组件化模式）
  - ESLint/Prettier（代码规范与自动修复）
  - Axios（请求封装、拦截器、错误处理、重试与取消）
- 业务与接口
  - REST API 约定、分页/排序/筛选参数标准化
  - 鉴权：JWT/Token 存储、刷新机制、路由权限控制
  - 文件上传与下载（`multipart/form-data`、进度、限速与断点续传可选）
- UI/UX 与可访问性
  - 设计规范：颜色/字体/图标、布局与导航规范
  - 可访问性（WCAG 2.1 AA）：键盘导航、aria-*、对比度、读屏支持
  - 骨架屏、加载与错误状态、空状态引导
- 部署与运维（可选进阶）
  - Nginx 反向代理与静态资源缓存（使用 `nginx.conf`）
  - Docker 化与 Compose（`Dockerfile`、`docker-compose.yml`）
  - 监控与日志：前端性能指标、错误上报（Sentry 等）

### 5) 项目结构要点（已存在）
- 构建与运行：`vite.config.js`、`package.json`（scripts: dev/build/preview/serve）
- 样式：`tailwind.config.js`、`postcss.config.js`、`src/style.css`
- 入口与路由：`src/main.js`、`src/App.vue`、`src/router/index.js`
- 视图与组件：`src/views/*.vue`、`src/components/*.vue`
- API 封装：`src/api/*.js`（Axios 实例、统一错误处理）
- 部署：`Dockerfile`、`docker-compose.yml`、`nginx.conf`、`serve.js`

### 6) 环境验证清单（必须通过）
```powershell
node -v
npm -v
yarn -v
yarn install
yarn dev
yarn build && yarn preview
yarn serve
```

### 7) 常见问题速查（FAQ）
- Vite 启动报 Node 版本不兼容：升级到 Node 18+ 或使用 nvm 切换
- 样式不生效：检查 Tailwind 是否正确引入于 `src/style.css`，确保模板类名未被 Tree-Shaking
- 接口跨域：在 `serve.js` 增加代理或本地配置 CORS；生产用 Nginx 反代
- 路由 404（生产）：Nginx 需配置 `try_files $uri /index.html;` 以支持前端路由
- 构建白屏：查看控制台与网络面板，确认资源路径与 `base` 配置、CDN/缓存是否正确

### 8) 推荐工具与插件（可选）
- 浏览器扩展：Vue Devtools（Vue 2 兼容版）、Lighthouse、axe DevTools（无障碍扫描）
- 设计：Figma/Sketch（界面原型、组件标注）、Squoosh（图片压缩）
- Git：Git LFS（如有大资源）、Commitizen（提交规范化）

### 9) 学习资源
- Vue 2.7 指南（RFC 与兼容 API）：[Vue Docs](https://v2.vuejs.org/)
- Vite 官方文档：[Vite](https://vitejs.dev/)
- Tailwind CSS 指南：[Tailwind CSS](https://tailwindcss.com/docs)
- Axios 最佳实践：[Axios](https://axios-http.com/)
- 可访问性 WAI-ARIA 模式：[WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/)

---
按上述清单安装软件并跑通 dev/build，即可开始基于现有接口文档进行页面开发与联调。






