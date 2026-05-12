# Versions

用于保留不同视觉与动效方向，方便后续挑选最终版本。

## v0-portfolio-frame

- 基线版本
- 作品集式 15 屏滚动框架
- 每屏不同版式
- 已接入基础物理滚动、棱镜光、图像视差

## v1-scroll-reveal

- 上一版滚动显隐动效
- 参考 ReactBits 的 Scroll Reveal 类动效方向
- 新增 `Reveal` 组件
- 滚动进入视口时触发：
  - 标题逐字上浮
  - kicker / subtitle 模糊解除并上移
  - keyword 分组延迟入场
  - 图片区域遮罩展开

## v2-dark-snap

- 当前版本
- 统一深色作品集背景，不再按页面切换黑白底色
- 移除手写弹性回弹滚动，改为更自然的原生纵向吸附滚动
- 降低背景光斑强度，减少摩尔纹和干扰感
- 统一所有图片容器圆角，形成一致的作品展示框架

后续版本建议命名：

- `v3-spotlight-cards`
- `v4-prism-gallery`
- `v5-text-pressure`
- `v6-final-candidate`
