# suhaowork

个人作品集站点，用来展示理想汽车相关项目的过程、能力沉淀和阶段性成果。

## 本地开发

```bash
npm install
npm run dev
```

默认本地地址：

```text
http://127.0.0.1:5173/
```

本地预览生产构建：

```bash
npm run build
npm run preview
```

## 构建

```bash
npm run build
```

构建产物输出到 `dist/`。

## 部署

项目已连接到 Vercel。正常上线流程是：本地修改完成后，提交并推送到 GitHub `main` 分支，Vercel 会自动构建并更新线上站点。

```bash
git pull --ff-only origin main
npm run dev
# 修改并本地确认
npm run build
git add .
git commit -m "update portfolio"
npm run deploy
```

`npm run deploy` 会先重新构建，并检查本地没有未提交改动，然后推送到 `origin/main`。如果还有未提交改动，它会停止，避免漏提交。

Vercel 配置：

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

目标域名：

```text
suhaowork.art
```

## 当前版本说明

当前站点为作品集结构，重点展示：

- 理想同学从 0 到 1 的实体化与落地过程
- 理想同学中心、4O 小同桌、OTA 7.4、多端交付等项目
- AI 工作流、Standby 放射光、SS4 质感探索、OC 眼睛等探索
- 角色体系、资源规范和方法沉淀
