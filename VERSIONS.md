# Versions

用于保留不同视觉与动效方向，方便后续挑选最终版本。

## v0-portfolio-frame

- 基线版本
- 作品集式 15 屏滚动框架
- 每屏不同版式
- 已接入基础物理滚动、棱镜光、图像视差

## v1-scroll-reveal

- 当前版本
- 参考 ReactBits 的 Scroll Reveal 类动效方向
- 新增 `Reveal` 组件
- 滚动进入视口时触发：
  - 标题逐字上浮
  - kicker / subtitle 模糊解除并上移
  - keyword 分组延迟入场
  - 图片区域遮罩展开

后续版本建议命名：

- `v2-spotlight-cards`
- `v3-prism-gallery`
- `v4-text-pressure`
- `v5-final-candidate`
