# Versions

用于保留不同视觉与动效方向，方便后续挑选最终版本。

## 2026-05-24 expanded keynote sync

- 将 `0528材料无图版.key` 导出的第 11-30 页背景同步到网站，当前网页共覆盖 Keynote 第 02-30 页。
- 新增 `public/assets/character-keynote/page-media-new/`，接入 `/Users/m/Documents/素材/过程/page` 下新增页面素材。
- 按 `0528材料.key` 有图版位置对齐新增媒体层，覆盖第 14、16、18、19、21、23、24、25、26、27 页。
- MP4 素材使用本机 `avconvert` 压缩，并只保留压缩后更小的版本；GIF 动图保持原格式以避免破坏动画。
- 第 23 页有图版中间的眼皮状态素材未出现在 `/过程/page/23`，从同一套 OC 素材目录 `/Users/m/Documents/素材/过程/OC/带眼皮.gif` 补齐。
- 新增媒体窗口继续使用统一圆角和懒加载逻辑，浏览器自检关键新增页媒体数量、加载状态和圆角。

## 2026-05-23 keynote media replacement

- 将形态设计 Keynote 段第 02-10 页背景替换为 `0528材料无图版.key` 导出的无图背景。
- 新增 `public/assets/character-keynote/page-media/`，接入 `/Users/m/Documents/素材/过程/理想同学/形态设计/page` 下对应 GIF / MP4 素材。
- 按 `0528材料.key` 有图版的位置对齐媒体层：
  - `page/2` -> slide 02
  - `page/3` -> slide 03
  - `page/7` -> slide 06
  - `page/8` -> slide 07
  - `page/10` -> slide 09
  - `page/11` -> slide 10
- 因有图版比无图版多一页“眼睛形态”过程页，后半段按视觉内容错位映射，不直接使用 Keynote 文件页码一一对应。

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

- 上一版
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

## v4-8page-review-draft

- 当前版本
- 面向「评委 3 分钟快速看完」重新压缩为 8 页结构
- 第 1 页补充个人基础信息占位：
  - 司龄：待补充
  - 职级：17级
- 第 2 页改为「能力总览与项目时间轴」：
  - 能力总览：视觉体验判断、复杂资源交付、AI 与原型提效
  - 项目时间轴：使用占位时间点和关键项目节点，方便后续替换准确年月
- 合并原有重复内容：
  - 理想同学实体化 + 毛绒材质实现合为一页
  - 理想同学中心 + 4o 小同桌 + OTA 7.4 交付合为一页
  - AI 实战 + 逆向生产策略合为一页
  - Standby 放射光 + 原型 Demo 合为一页
  - 项目结果与总结合为一页
- 暂时保留原 15 页内容数据为 `sourcePages`，当前渲染使用新的 8 页 `pages`
- 本地截图与整理材料目录 `output/` 已加入 `.gitignore`，不提交到 GitHub
- 修复第 1 页卡片 hover 展开顶动页面的问题：卡片占位高度保持固定，卡片文字整体向上吸附到展开背板顶部。
- 第 3 页新增「素材图库」按钮与弹窗面板：
  - 素材来自 `public/assets/character-upgrade/`。
  - 点击按钮打开自动横向滚动图片面板。
  - 点击面板外空白区域或关闭按钮可收回弹窗。
  - 统一素材入口、弹窗和图片视窗圆角为 18px，与高斯预览窗口一致；入口顶部与高斯窗口顶部对齐，视觉改为纯黑低亮度。
  - 优化图库交互：标题改为「理想同学形象 1.0」，隐藏图片名称，悬浮时滚动减速，面板内滚轮被拦截。
  - 将素材图库自动滚动改为 JS 连续位移，鼠标悬浮时平滑减速到暂停；浮层内滚轮完全失效，不触发横向或背后页面滚动。
  - 第 3 页素材入口改为三张同宽卡片：理想同学形象 1.0、理想同学 OTA 更新、理想同学听想说（视频）。
  - 新增两个第三页循环视频窗，视频素材复制到 `public/assets/character-upgrade/`，视频使用宽度适配和 `object-fit: contain`，不裁切画面；三张卡片整体与右侧高斯窗口上下边界对齐。
- 第 3 页左侧「问题 / 动作 / 结果」条目改为短分割线和悬浮显隐正文；高斯预览补充 SS4 高斯技术下版上线说明。
- 第 4 页新增「中心动画」二级弹窗入口：
  - 入口位于页面左下角。
  - 弹窗展示 `public/assets/li-center/` 中的理想同学中心动画，包括 CUA、年夜饭、放烟花、游戏、绘画、记事等素材。
  - 面板内滚轮转为横向浏览动画，并阻止背后页面滚动。
- 第 4 页预留「4O 小同桌」二级素材弹窗：
  - 新增「4O 车机端」和「4O 手机端」两个入口。
  - 当前暂无素材时展示空视窗占位，后续拿到素材后可直接填入对应 `fourOCarAnimationItems` / `fourOPhoneAnimationItems`。
- 第 6 页 Standby 放射光收紧演示画布与控制器之间的垂直间距，右侧内容改为靠上排列。
- 统一第 6 / 7 / 8 页主要卡片圆角为 18px，与第 3 页素材卡片保持一致。

后续版本建议命名：

- `v5-final-copy-polish`
- `v6-final-candidate`

## 2026-05-18 OC page motion polish

- 第 7 页底部“设计判断 / 表达方式 / 动效策略”去掉原来的卡片展开形式，改成与第 3 页“问题 / 动作 / 结果”一致的短分割线和悬浮显隐正文动效。
- 第 7 页两个 OC 视频窗口统一使用 `object-fit: contain` 和纯黑背景，尽量完整展示视频画面，不再裁切。
- 第 7 页视频窗口继续保持 18px 圆角，与第 3 页主要卡片圆角一致。

## 2026-05-19 Content save protection

- 新增 `src/content.saved.json` 作为“保存文案”的源码同步文件。
- 本地开发环境点击“保存文案”时，会同时写入浏览器 `localStorage` 和 `src/content.saved.json`。
- 站点启动/构建时优先使用 `src/content.saved.json` 中的页面文案，避免文案只存在浏览器缓存里。

## 2026-05-19 4O car material

- 第 4 页“4O 车机端”弹窗新增 `小同桌dark_W.mp4` 素材。
- 视频已复制到 `public/assets/four-o-car/li-table-dark-w.mp4`，并接入 `fourOCarAnimationItems`。

## 2026-05-19 character gallery scrollbar

- 第 3 页“理想同学形象 1.0”素材弹窗底部新增横向位置滑块，方便手动快速浏览图片。
- 弹窗打开期间锁定页面滚轮，避免滚轮带动背后页面滚动。
- 素材图像明确移除额外滤镜和透明度处理，避免出现黑色蒙层感。

## 2026-05-19 8-page only cleanup

- 删除旧 15 页 `sourcePages` 数据，只保留当前 8 页 `pages` 作为唯一页面来源。
- 本地保存文案和源码保存文案若不是 8 页，会被自动忽略并回到当前 8 页版本，避免旧第 10 页再次出现。

## 2026-05-19 page 5 black background

- 第 5 页 AI Workflow 移除 `workflow-ai-lamp.jpg` 背景图。
- 第 5 页背景强制改为纯黑，并去掉 AI 图库背后的浅色渐变层。

## 2026-05-19 OC layout refinement

- 第 7 页“设计判断 / 表达方式 / 动效策略”从视频下方移到左侧文案区，左下竖排三行展示。
- 第 7 页右侧 OC 最终效果视频按原视频比例适配高度，左侧最终演进方案视频窗口与右侧保持同高。

## 2026-05-19 4O phone materials

- 第 4 页“4O 手机端”弹窗素材替换为 `4o形象及小同桌项目/1` 文件夹内的 1 个 MP4 和 9 个 GIF。
- 新增 `public/assets/four-o-phone/` 资源目录，并让素材弹窗支持 GIF 图片播放。

## 2026-05-19 SS4 material page insertion

- 从旧 15 页版本中恢复第 10 页“SS4 质感探索”，插入到当前版本第 6 页和第 7 页之间。
- 当前页面顺序调整为 9 页：Standby 放射光之后为 SS4 质感探索，OC 眼睛顺延为第 8 页，总结顺延为第 9 页。
- 顶部导航新增 `Glass` 标签，并将 Summary 背景映射顺延到第 9 页。
