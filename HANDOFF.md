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

DNS 当前托管在腾讯云 DNSPod。

记录配置：

```text
@      A       76.76.21.21
www    CNAME   cname.vercel-dns.com
```

说明：

Vercel 后台可能提示 nameserver 不是 Vercel DNS，这是正常的，因为当前使用 DNSPod 管理解析，不需要切换 nameserver。

## 目录说明

```text
src/App.jsx        页面结构、内容数据、滚动叙事逻辑
src/styles.css     全站视觉样式、响应式、动效
public/assets/     站点图片素材
vercel.json        Vercel 部署配置
```

## 当前已完成功能

- React + Vite 项目搭建
- 作品集视觉方向重设计
- 使用「理想同学」图片作为展示素材
- 滚动叙事页面结构
- 物理阻尼滚动
- 图像视差与棱镜光效
- 文字入场动效
- 黑白主题切换
- 移动端响应式基础适配
- Vercel 自动部署
- 自定义域名接入

## 最近一次关键修改

已修复滚动状态同步问题：

```text
186c78c fix scroll state sync
```

作用：

- 手动滚动、触控板滚动、导航点击后，当前 active slide 能正确同步
- 减少动态效果模式下，导航点击仍可正常跳转

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
