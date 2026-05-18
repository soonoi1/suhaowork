# suhaowork 作品集站点对接文档

## 项目定位

`suhaowork` 是个人业绩作品集站点，用于展示「理想同学」相关项目成果、设计探索、AI 工作流、跨端交付和体系化建设能力。

站点方向已经从“晋升答辩 PPT”调整为“作品集式业绩展示站点”。

## 线上地址

主域名：

```text
https://suhaowork.art
```

www 域名：

```text
https://www.suhaowork.art
```

Vercel 默认域名：

```text
https://suhaowork.vercel.app
```

## GitHub 仓库

```text
https://github.com/soonoi1/suhaowork
```

默认分支：

```bash
main
```

## 技术栈

- React
- Vite
- lucide-react
- CSS 动效
- Vercel 部署

## 本地开发

新电脑首次拉取：

```bash
git clone https://github.com/soonoi1/suhaowork.git
cd suhaowork
npm install
npm run dev
```

默认本地地址：

```text
http://127.0.0.1:5173/
```

## 构建

```bash
npm run build
```

构建产物输出到：

```text
dist/
```

## 部署方式

项目已接入 Vercel，并连接 GitHub 仓库。

正常流程：

```bash
git pull
# 修改代码
npm run build
git add .
git commit -m "update portfolio"
git push origin main
```

推送到 `main` 后，Vercel 会自动触发 Production 部署。

## Vercel 项目

Vercel 项目：

```text
suhao-s-projects/suhaowork
```

已绑定域名：

```text
suhaowork.art
www.suhaowork.art
```

## DNS 配置

DNS 当前托管在外部 DNS 服务，不使用 Vercel Nameserver。

Vercel 当前建议记录配置：

```text
@      A       216.198.79.1
www    CNAME   1463312ecb76e427.vercel-dns-017.com
```

说明：

Vercel 因 IP range expansion 可能推荐项目专属新记录。旧记录 `76.76.21.21` 和 `cname.vercel-dns.com` 仍可能可用，但后台会显示 `DNS Change Recommended`。以后优先以 Vercel Domains 页面当前提示为准。

## 访问保护

站点包含 Vercel Middleware Basic Auth：

```text
middleware.js
```

Vercel 环境变量：

```text
SITE_AUTH_USER
SITE_AUTH_PASSWORD
```

只要 Production 环境中设置了这两个变量，访问站点会先出现浏览器用户名 / 密码验证。不要把真实密码写入代码或文档。修改环境变量后需要重新部署才会生效。

## 目录说明

```text
src/App.jsx        页面结构、内容数据、滚动叙事逻辑
src/styles.css     全站视觉样式、响应式、动效
public/assets/     站点图片素材
vercel.json        Vercel 部署配置
middleware.js      Vercel Basic Auth 访问保护
```

## 当前已完成功能

- React + Vite 项目搭建
- 作品集式业绩展示方向
- 16 屏案例滚动叙事结构
- 每屏不同 layout 版式
- 视频 / 图片背景铺底
- 悬浮媒体卡片和 hover 聚焦
- 文字入场动效和侧边导航
- 底部渐变模糊滤镜
- 移动端响应式适配
- Alphaplayer 左 alpha / 右 RGB 透明视频播放器组件
- Basic Auth 访问密码保护
- Vercel 自动部署
- 自定义域名接入

## 最近一次关键修改

2026-05-14：

```text
将站点扩展为 16 屏晋升能力案例展示，并同步维护记录。
```

作用：

- 从 8 屏扩展到 16 屏，覆盖决断力、执行力、协作力、自驱力
- 每屏保留「背景问题 / 解决策略 / 结果」的有序叙事
- 收紧文字排版、卡片高度、侧边导航密度
- 明确后续每次修改都需要同步 GitHub 记录

## 注意事项

`.gitignore` 已排除：

```text
node_modules
dist
.vercel
texture
.DS_Store
```

不要提交 `.vercel`、`dist`、`node_modules` 和本地素材源文件夹。

## 后续内容方向

继续围绕“作品集式业绩展示”扩展，而不是传统 PPT：

- 理想同学从 0 到 1 的探索与上线
- 实体化形象升级
- OTA 7.4 多端交付
- APP / 车机 / PC 跨端 CUI 设计
- AI 工作流探索
- 高斯渲染与引擎落地
- 角色体系、世界观、资产规范
- 审美判断、方向把控、复杂项目推进能力

## 事件日志

### 2026-05-18

- 根据「评委 3 分钟快速看完」目标，在本地完成 8 页精简版并推送 GitHub。
- 当前版本从原 15 页作品集叙事压缩为 8 页重点结构：
  - 01 个人定位：补充司龄占位和职级 17 级
  - 02 能力总览与项目时间轴：新增项目经历时间轴占位
  - 03 理想同学实体化：合并毛绒材质和技术路线判断
  - 04 理想同学中心与 4o 小同桌交付：合并中心、4o、OTA 7.4 交付
  - 05 AI 实战工作流：合并 AI 应用和逆向生产策略
  - 06 Standby 放射光：合并交互光效与原型说明
  - 07 OC 眼睛：保留未来车外交互代表案例
  - 08 结果与方法沉淀：合并结果页和总结页
- 第 2 页新增 `timeline` 数据结构和 `ProjectTimeline` 组件，时间点目前为占位内容，后续可直接替换。
- 更新顶部导航为 8 页结构：Intro / Overview / Character / Delivery / AI / Light / OC / Sum。
- 将 `output/` 加入 `.gitignore`，避免本地截图和整理材料进入仓库。
- 当前渲染使用新的 8 页 `pages`，旧 15 页内容暂保留为 `sourcePages` 备份。
- 修复第 1 页悬浮卡片展开时把页面向上顶动的问题：
  - 保持 `.cover-card` 固定占位高度。
  - 使用 `::before` 作为 hover 背板，让展开效果只发生在视觉层。
  - 桌面端卡片文字整体向上吸附到展开背板顶部，移动端仍自然展开显示。

### 2026-05-14

- 用户确认站点内容属于公司内部材料，不适合公开。
- 新增 `middleware.js`，通过 Vercel 环境变量 `SITE_AUTH_USER` / `SITE_AUTH_PASSWORD` 启用 Basic Auth。
- 用户确认实际域名为 `suhaowork.art`，不是 `suhaowork.com`。
- Vercel Domains 页面显示 `suhaowork.art` / `www.suhaowork.art` 已绑定，但推荐更新 DNS：
  - `@ A 216.198.79.1`
  - `www CNAME 1463312ecb76e427.vercel-dns-017.com`
- 已将作品集重构版本推送到 GitHub：
  - `6e9c431 update portfolio case pages`
- 用户要求后续每次修改后，同步变化和备注到 GitHub。
- 当前继续扩展站点页数，从 8 页扩展到 16 页，并调整文字排版秩序。

### 2026-05-13

- 从 GitHub 仓库熟悉项目并克隆到本地 `C:\suhaowork-site`。
- 确认原始 `C:\suhaowork` 是素材整理工作区，不是网站 Git 仓库。
- 新增 `AlphaVideoPlayer`，支持左右拼接透明视频：
  - 左侧黑白 alpha
  - 右侧 RGB
  - WebGL 合成为透明 canvas
- 从 `C:\suhaowork\理想素材_手动整理框架` 中挑选并压缩站点素材到 `public/assets/cases/`。
