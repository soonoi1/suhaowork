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

- 上一版
- 统一深色作品集背景，不再按页面切换黑白底色
- 移除手写弹性回弹滚动，改为更自然的原生纵向吸附滚动
- 降低背景光斑强度，减少摩尔纹和干扰感
- 统一所有图片容器圆角，形成一致的作品展示框架

## v3-capability-cases

- 当前版本
- 以晋升能力维度组织内容：决断力、执行力、协作力、自驱力
- 页面从 8 屏扩展到 16 屏
- 每屏保留「背景问题 / 解决策略 / 结果」结构
- 每屏使用不同 layout 类型，避免同模板重复：
  - home-orbit
  - route-compare
  - focus-eye
  - delivery-board
  - timeline-flow
  - wide-stage
  - system-stack
  - tool-wall
- 新增站点访问保护 middleware
- 后续每次内容或代码修改都需要同步维护记录并推送 GitHub

后续版本建议命名：

- `v4-prism-gallery`
- `v5-text-pressure`
- `v6-final-candidate`
