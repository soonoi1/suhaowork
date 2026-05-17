import { Component, Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import {
  ClipboardCheck,
  ClipboardList,
  PencilLine,
  Menu,
  MessageSquareText,
  Orbit,
  RotateCcw,
  Save,
  X,
} from "lucide-react";
import GradualBlur from "./components/GradualBlur";
import PillNav from "./components/PillNav";
import { PrismaticBurst } from "./components/PrismaticBurst";

const FluidGlass = lazy(() => import("./components/FluidGlass"));
const GaussianSplatViewer = lazy(() => import("./components/GaussianSplatViewer"));
const InfiniteMenu = lazy(() => import("./components/InfiniteMenu"));

class DemoErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // Keep experimental demos isolated so one asset failure cannot blank the deck.
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

const pages = [
  {
    eyebrow: "01 / Intro",
    layout: "cover",
    title: "宿浩（Suhao Work）",
    conclusion: "3D 动画 / 产品动效 / 视觉交互 / AI 应用工作流 / 多端体验落地",
    intro:
      "我的工作侧重技术体验结合：把 3D、动画、视觉交互、资源落地和 AI 应用工作流结合起来，推动复杂视觉体验从探索走向可上线方案。",
    coverItems: [
      {
        label: "负责的工作内容",
        text: "3D 形象与动画、产品动效、视觉交互、多端资源交付、研发还原、AI 应用工作流和体验原型验证。",
      },
      {
        label: "主要的工作项目",
        text: "理想同学实体化、理想同学中心、4o 小同桌、7.4 OTA 设计交付、AI 实战工作流、Standby 放射光、OC 眼睛。",
      },
      {
        label: "能力简介",
        text: "具备 3D 与动画的专业基础，也有产品动效、交互动态、多端资源适配和 AI 工具探索经验。工作重点不是单点视觉输出，而是把偏技术的体验方案转化为可被研发还原、可被用户感知的产品结果。",
      },
    ],
    points: [],
  },
  {
    eyebrow: "02 / Capability",
    title: "专业能力背景",
    demo: "capabilityDock",
    conclusion:
      "能力覆盖 3D 与动画、产品动效与交互、AI 应用工作流和创新探索。",
    intro:
      "这部分不是工具清单，而是我在项目中形成的专业判断、执行方法和可对应的成果基础。",
    points: [
      {
        label: "3D 与动画能力",
        text: "我熟悉 3D 从形体、材质、灯光、渲染到动画的完整制作路径，能够判断方案的视觉质量、实现成本和上线稳定性。动画经验覆盖 3D 角色动画、UI 动效和体验型交互动态，能够把重量、节奏、情绪和状态反馈转化为用户可感知的动态表达。",
      },
      {
        label: "产品动效与交互能力",
        text: "我会从状态表达、注意力引导、层级关系和操作反馈理解产品动效。在项目中，我会结合缓动曲线、状态切换、动效频率、停留时长和交互连续性，判断动效是否清晰、克制，并适合长期使用场景。",
      },
      {
        label: "资源适配与落地能力",
        text: "我具备跨端资源交付经验，熟悉图片、视频、透明通道、编码格式、压缩方式、性能限制和版本兼容等要求。在设计阶段，我会提前规划资源拆分、导出规范、压缩策略和研发接入方式，降低后期返工和适配成本。",
      },
      {
        label: "AI 应用工作流",
        text: "我持续观察 AI 工具的能力边界，并将其转化为可复用的提效流程，包括批量生成、结果筛选、视频裁切压缩、脚本自动化和可交互原型验证。我的重点不是单次使用工具，而是把 AI 嵌入真实项目流程，用于解决效率、验证和交付问题。",
      },
      {
        label: "创新探索能力",
        text: "我在理想同学相关项目中承担过多项早期探索工作，包括原生形象、视觉语言、交互动效和未来体验方向。探索过程强调可验证、可讨论、可转化，目标是把前期概念逐步推进为可落地的产品方案。",
      },
    ],
  },
  {
    eyebrow: "03 / Case 01",
    title: "理想同学实体化",
    conclusion:
      "从平面符号探索出一个可被感知、可被记住，并与原始形象保持关联的 3D 实体化形象。",
    intro:
      "理想同学早期形态更接近平面符号：一个圈和两个点。实体化项目需要把它转化为一个用户能感受到、能记住的 3D 形象，同时保持足够简洁，并与原有视觉特征有继承关系。",
    points: [
      {
        label: "项目背景",
        text: "这个项目不是简单做一个 3D 角色，而是为理想同学建立更具体的形象记忆点。它需要从抽象图形走向实体化表达，让用户看到后能感知它的性格、材质和存在感。",
      },
      {
        label: "关键难点",
        text: "形象既不能过度复杂，也不能变成普通玩偶；既要保留原始形象的简洁识别，又要在 3D 中建立可亲近、可记忆、可延展的视觉效果。",
      },
      {
        label: "我的动作",
        text: "围绕外形比例、眼睛特征、帽子关系、身体体积和毛绒质感做多轮探索，并结合 AI 辅助生成与 3D 判断，持续收敛到更符合品牌气质和产品使用场景的实体化方向。",
      },
      {
        label: "结果",
        text: "形成了理想同学毛绒实体化形象的核心方向，也为后续理想同学中心、4o 小同桌、多端形象和更多 AI 角色探索提供了基础资产。",
      },
    ],
  },
  {
    eyebrow: "04 / Case 01 Detail",
    title: "毛绒材质实现",
    demo: "gaussianSplat",
    conclusion:
      "通过 3D 材质和动画判断，把毛绒的真实感、亲和感和线上稳定性结合起来。",
    intro:
      "理想同学实体化中，帽子和身体的毛发效果是关键转折点。它决定角色是否真实、是否亲和，也决定最终视觉是否能在线上稳定呈现。",
    points: [
      {
        label: "线上落地方案",
        text: "最初上线采用 Spline 平面方案，优先保证版本稳定、资源可控和视觉还原，确保毛绒形象可以在当前产品条件下顺利交付。",
      },
      {
        label: "持续攻克方向",
        text: "核心问题是毛绒在 3D 中的质量与性能关系。毛发由多层、随机、成簇的结构构成，需要在真实质感、体积感、边缘细节和运行稳定性之间找到平衡。",
      },
      {
        label: "阶段性方案",
        text: "目前找到的更优解是 Gaussian Splatting 高斯模型方案。它能更好保留毛绒的真实空间质感和细节层次，同时具备继续优化性能与展示效果的空间。右侧图示用于展示这一方向的模型预览效果。",
      },
    ],
  },
  {
    eyebrow: "05 / Case 02",
    title: "理想同学中心",
    demo: "scrollStack",
    conclusion:
      "通过交互设计、3D 动画和资源落地，将理想同学中心做成可上线、可交互、可作为屏保使用的产品场景。",
    intro:
      "理想同学中心与实体化形象首次上线时一起出现，承载理想同学 AI 形象和能力介绍，同时包含一个可作为屏保使用的毛绒时钟界面。",
    points: [
      {
        label: "我做了什么",
        text: "参与整体交互模式设计，制作关键视觉素材和 3D 动画资源，并和研发对接资源导入、性能优化和上线还原。毛绒时钟的方向是保持简洁、耐看、有实用价值，同时允许用户进行基础交互。",
      },
      {
        label: "遇到的问题",
        text: "理想同学中心不是单一页面，而是图片、视频、透明素材、页面属性动画和交互状态的组合。交互设计、视觉素材制作和研发还原需要并行推进，过程中有很多显示、性能和资源细节需要调试。",
      },
      {
        label: "解决策略",
        text: "一边推进交互和视觉，一边参与研发 debug，持续校准资源大小、播放方式和显示效果。Alpha Player 透明视频边缘黑白边的问题，被整合到资源处理策略中解决：通过压缩资源和增加背景边缘虚化，弱化特殊透明视频的显示瑕疵。",
      },
      {
        label: "结果",
        text: "最终将理想同学中心的核心交互和视觉效果完整落地，毛绒时钟作为简洁、实用、可交互的屏保场景被还原上线。",
      },
    ],
  },
  {
    eyebrow: "06 / Case 03",
    title: "4o 小同桌",
    conclusion:
      "围绕车载长时对话场景，完成多角色、多状态、多端动效资源的设计与交付。",
    intro:
      "4o 小同桌基于理想同学，通过不同帽子衍生出多个角色，用于车载长时对话场景。角色需要具备听、想、说等状态，以及状态之间的过渡动画。",
    points: [
      {
        label: "项目背景",
        text: "这个功能需要让用户在长时对话中感知理想同学当前状态：它是在听、在想，还是正在表达。形象不只是静态角色，而是承担对话状态反馈的动态载体。",
      },
      {
        label: "我的贡献",
        text: "参与角色视觉与动效资源设计，负责整体资源判断、任务拆解、质量把控和跨线协调，推动手机 App、车机端以及黑白模式下的资源同步交付。",
      },
      {
        label: "遇到的问题",
        text: "素材量大、状态多、端侧复杂。最终需要产出 200 多组视频素材，并完成渲染检查、合成、分层打包、压缩、上传和研发导入。",
      },
      {
        label: "解决策略与结果",
        text: "将高频触达的出场动画和关键状态重点打磨，低频状态采用模板化复用，并通过详细交付文档降低研发接入成本。最终完成多端资源交付，保证核心状态体验和版本节点。",
      },
    ],
  },
  {
    eyebrow: "07 / Case 04",
    title: "7.4 OTA 设计交付",
    conclusion:
      "在多个理想同学项目并行上线的周期内，统筹资源节奏、任务分配和交付风险。",
    intro:
      "7.4 OTA 同期涉及理想同学实体化、理想同学中心、理想同学小同桌 4.0、手机 App 4.0 形象等多个板块，对设计产能、资源组织和版本节奏都有很高要求。",
    points: [
      {
        label: "项目背景",
        text: "前面几个项目不是孤立上线，而是在同一个 OTA 节点集中交付。多个端、多个状态、多个资源链路同时推进，任何一个环节拖延都会影响整体版本节奏。",
      },
      {
        label: "核心问题",
        text: "项目同时面临资源量大、时间紧、端侧复杂、研发接入链路长的问题，需要判断哪些体验必须重点投入，哪些资源可以复用，哪些风险要提前处理。",
      },
      {
        label: "我的策略",
        text: "基于 3D 和动效资源经验预判工作量，拆解不同同事的任务边界；把高频触达、用户最容易感知的状态放在最高优先级，低频状态通过模板化和复用控制成本，同时用文档化交付降低沟通成本。",
      },
      {
        label: "结果与价值",
        text: "在有限周期内完成多个板块的设计资源交付，平衡了核心体验质量、资源制作成本和版本上线风险，也提升了跨设计、研发、后期资源处理之间的协作效率。",
      },
    ],
  },
  {
    eyebrow: "08 / AI Practice",
    title: "AI 实战",
    conclusion:
      "将 AI 现有能力接入真实项目流程，最大化需求到结果之间的效率和命中率。",
    intro:
      "过去 2025 年和 OTA 7.4 相关的理想同学项目中，我对 AI 的应用不是停留在单点出图，而是把 AI 放进形象探索、素材生成、脚本处理、资源交付和原型验证的完整流程里。",
    points: [
      {
        label: "实体形象探索",
        text: "在理想同学实体化阶段，持续利用 AI 进行形象方向探索，用大量过程图辅助判断什么样的形体、材质和气质更适合理想同学，再结合 3D 专业判断进行收敛。",
      },
      {
        label: "自定义形象与 24 小时动画",
        text: "自定义形象和 App 4 楼首页 24 小时动画都属于大量资源探索需求。我不是逐个构思后单点生成，而是先扩大生成结果池，再从高质量结果中反向筛选帽子、形象、场景和动作方向。",
      },
      {
        label: "数字实践与脚本处理",
        text: "在理想同学中心和 4o 小同桌项目中，使用 AI 辅助编写视频压缩、裁切和批处理脚本，并在 VS Code 中编写生成工作流脚本，支撑大批量资源导出、命名、压缩和交付。",
      },
      {
        label: "视频与素材生成",
        text: "结合 Nano-Banana、即梦、可灵、O1 等生成工具，为形象探索、交付素材和春节营销活动生成特定资源，再通过专业筛选判断哪些结果能进入项目链路。",
      },
      {
        label: "性能优化",
        text: "利用 Claude Code 等工具对视频资源进行裁剪和批量压缩，优化交付资源体积和端侧性能，使 AI 应用真正服务于上线效率。",
      },
      {
        label: "流程价值",
        text: "将 AI 现有能力和项目流程结合起来，不只是给 AI 一个需求等待结果，而是系统化设计需求、生成、筛选、压缩、交付之间的路径，提高完成率和可控性。",
      },
    ],
  },
  {
    eyebrow: "09 / AI Method",
    title: "逆向生产策略",
    demo: "aiGallery",
    conclusion:
      "把 AI 的随机性转化为可筛选、可决策、可复用的生产流程。",
    intro:
      "核心方式是先扩大结果池，再用设计判断反向收敛，让生成从单点尝试变成流程能力。",
    points: [
      {
        label: "两行说明",
        text: "先用 AI 扩大结果池，再用设计判断反向筛选高质量结果。把费时的构思和试错交给批量生成，把关键的审美判断、场景匹配和结果决策留给设计师。",
      },
      {
        label: "逆向生产模式",
        text: "不从单个明确想法开始逐个生成，而是围绕项目需求提前设计生成范围，批量覆盖可能方向，再从成功率高、完整度高的结果中反向收敛最终需求。",
      },
      {
        label: "漏斗式筛选流程",
        text: "通过大量生图和生视频覆盖帽子、形象、场景、动作等可能范围，再根据优质结果倒筛，像漏斗一样快速聚焦并锚定最终可用方向。",
      },
      {
        label: "核心优势",
        text: "效率和准确率更高：构思与试错环节先被 AI 快速筛一轮；同时更容易出现意外灵感，让项目不只得到预期结果，也能发现新的设计可能。",
      },
    ],
  },
  {
    eyebrow: "10 / Material Study",
    title: "SS4 质感探索",
    demo: "fluidGlass",
    conclusion:
      "通过流体玻璃的折射、透光和动态形变，验证 SS4 界面质感中透明层次与动态材质的表达方式。",
    intro:
      "这一页先作为质感交互原型，用 ReactBits Fluid Glass 的方式呈现可被鼠标扰动的玻璃折射效果。后续可以继续替换为 SS4 的具体素材、界面控件和材质参数，用来说明质感方案如何从静态视觉进入可交互验证。",
    points: [],
  },
  {
    eyebrow: "11 / Case 05",
    title: "Standby 放射光",
    demo: "radiance",
    conclusion:
      "针对放空小同桌的桌面场景，设计一种可感知、可调用、可调参数的交互光效方案。",
    intro:
      "放空小同桌需要一种特定的桌面灯光效果。传统三维建模或呼吸灯效较难表达这种可交互、可绑定状态、可参数控制的光效，因此需要新的设计和验证方式。",
    points: [
      {
        label: "项目背景",
        text: "这个光效不是单纯装饰，而是希望在 Standby 场景中成为一种可被感知的状态反馈，让用户能感受到桌面处于某种轻微、低打扰但可响应的状态。",
      },
      {
        label: "关键难点",
        text: "团队当时缺少图形化代码经验，早期 demo 效果也不理想。光效需要同时满足视觉氛围、参数可调、模态绑定和后续研发迭代空间。",
      },
      {
        label: "我的动作",
        text: "利用 AI Studio 和最新代码工具探索边界，将视觉目标、灯光节奏、扩散层次和参数控制需求描述给 AI，并结合我对视觉和灯光表达的判断，完成初版原生 demo。",
      },
      {
        label: "结果",
        text: "产出了初版可交互放射光方案，也形成一套基于 vibeCoding 的可控交互光原型工作方式。该方式后续分享给同事，并被继续迭代完善。",
      },
    ],
  },
  {
    eyebrow: "12 / Prototype",
    title: "Standby 原型 Demo",
    conclusion:
      "此页用于后续嵌入初版交互 demo，展示放射光的可调、可控和可验证参数。",
    intro:
      "后续可以把最初的交互原型代码直接放进这一页，让评审看到设计早期的 demo 效果，而不是只阅读文字描述。",
    points: [
      {
        label: "演示内容",
        text: "展示放射光在桌面场景中的初版效果，包括光心位置、扩散范围、明暗节奏、冷暖颜色、波动速度和状态切换。",
      },
      {
        label: "可调参数",
        text: "计划保留几个核心控制项：亮度、扩散半径、颜色温度、流动速度、呼吸节奏和响应状态，用来说明这个方案不是静态视觉，而是可被参数化控制的交互光。",
      },
      {
        label: "设计价值",
        text: "通过 demo 把原本抽象的光效体验提前可视化，让设计、产品和研发能在上线前讨论同一个可交互对象，降低后续落地的不确定性。",
      },
      {
        label: "后续补充",
        text: "这一页暂时作为交互 demo 占位。等原型代码和参数整理完成后，可以直接替换为可操作的网页模块。",
      },
    ],
  },
  {
    eyebrow: "13 / Case 06",
    title: "OC 眼睛",
    demo: "ocVideos",
    conclusion:
      "基于生物感知和注意力系统，完成无人驾驶汽车车外眼睛的视觉与动效方案设计。",
    intro:
      "OC 是面向未来无人驾驶汽车的项目。眼睛是车辆外部的可视表达，需要让车像一个智能体，让路人知道它在看哪里、注意什么、处于什么状态。",
    points: [
      {
        label: "设计初衷",
        text: "目标不是做夸张的动画眼睛，而是设计一套汽车天生就该有的眼睛：有识别性和抓眼感，但不过度拟人；同时与理想同学已有的椭圆眼睛特征保持继承关系。",
      },
      {
        label: "关键难点",
        text: "瞳孔本身变化空间有限，真正传递情绪和生命感的是外轮廓、眼白、眼皮和眉弓关系。方案需要在汽车风格、品牌继承、信息表达和自然感之间取得平衡。",
      },
      {
        label: "我的动作",
        text: "将理想同学的椭圆 / 半椭圆眼睛特征转译到车外眼睛上，用液态眼白承担眉头、眉弓和眼皮的情绪表达；同时让眼睛在缩小时能承接文字信息，适配车外云交互场景。",
      },
      {
        label: "注意力策略",
        text: "将眼睛视为可交互的生命体，绑定注意力机制和状态机。注意力转移参考人眼快速跳转的运动规律，使用强加速缓出曲线，让车辆“看向某处”的动态更符合人类直觉。",
      },
    ],
  },
  {
    eyebrow: "14 / Result",
    title: "项目结果与方法沉淀",
    conclusion:
      "这些项目共同沉淀了视觉体系、动效方法、多端交付经验和 AI 应用流程。",
    intro:
      "这一页用于把前面案例中的结果收束成可复用的方法，而不是再次罗列项目内容。",
    points: [
      {
        label: "视觉体系",
        text: "从理想同学实体化出发，沉淀了毛绒形象、毛绒材质和相关场景视觉语言，为后续角色和多端形象提供统一基础。",
      },
      {
        label: "动效与交互方法",
        text: "围绕听、想、说、注意力转移、屏保时钟、放射光等场景，积累了状态表达、低打扰反馈、情绪传递和可交互动态的设计方法。",
      },
      {
        label: "资源交付方法",
        text: "在 7.4 OTA 中沉淀了多端资源拆分、优先级判断、模板复用、文档化交付和研发接入协作方式，能支撑高压版本交付。",
      },
      {
        label: "AI 应用方法",
        text: "形成了逆向生产、漏斗筛选、脚本自动化、视频压缩裁切和代码原型验证等方法，让 AI 从单点工具变成项目流程的一部分。",
      },
    ],
  },
  {
    eyebrow: "15 / Summary",
    title: "总结回顾",
    conclusion:
      "围绕理想同学和未来车外交互，我在视觉体验、技术实现、资源交付和 AI 应用上持续输出可落地结果。",
    intro:
      "最后一页集中呈现做过的项目与业务、个人能力和解决的问题、最终产出结果，以及相关方法沉淀。",
    points: [
      {
        label: "项目与业务",
        text: "参与理想同学实体化、理想同学中心、4o 小同桌、7.4 OTA 设计交付、AI 实战工作流、Standby 放射光和 OC 眼睛等项目，覆盖形象、交互、动效、资源和未来体验探索。",
      },
      {
        label: "能力与问题",
        text: "解决的问题主要集中在 3D 形象真实感、复杂交互还原、多端资源交付、AI 提效、交互光原型和车外注意力表达等方向。",
      },
      {
        label: "产出结果",
        text: "产出了可上线的形象资产、交互动效资源、多端视频素材、资源处理脚本、AI 生成流程、Standby 初版 demo 和 OC 眼睛方案。",
      },
      {
        label: "方法沉淀",
        text: "沉淀出毛绒视觉语言、动态状态表达、多端资源交付、AI 逆向生产、自动化处理和可交互原型验证等方法，支持后续项目继续复用。",
      },
    ],
  },
];

function pad(value) {
  return String(value).padStart(2, "0");
}

const NOTES_STORAGE_KEY = "suhaowork-review-notes-v2";
const CONTENT_STORAGE_KEY = "suhaowork-page-content-v1";

const activeVisualMode = {
  id: "space",
  label: "Tag 1",
  name: "银黑宇宙",
  desc: "巨型标题 / 黑白空间 / 科技卡片",
  Icon: Orbit,
};

const pillLogo = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="18" fill="#050505"/>
  <path d="M18 35.5c4.8 9.5 18.4 9.5 27.9 0 6.3-6.3 6.3-16.5 0-22.8-4.2-4.2-11-4.2-15.2 0-2.8 2.8-2.8 7.3 0 10.1 1.9 1.9 5 1.9 6.9 0" fill="none" stroke="#f5f5f0" stroke-width="5" stroke-linecap="round"/>
  <circle cx="22" cy="42" r="4" fill="#c9905e"/>
</svg>
`)}`;

const pillNavItems = [
  { label: "Intro", href: "#page-1" },
  { label: "Skill", href: "#page-2" },
  { label: "Case", href: "#page-3" },
  { label: "AI", href: "#page-8" },
  { label: "SS4", href: "#page-10" },
  { label: "Light", href: "#page-11" },
  { label: "OC", href: "#page-13" },
  { label: "Sum", href: "#page-15" },
];

function getActivePillHref(activePageIndex) {
  const pageNumber = activePageIndex + 1;

  if (pageNumber <= 2) return `#page-${pageNumber}`;
  if (pageNumber <= 7) return "#page-3";
  if (pageNumber <= 9) return "#page-8";
  if (pageNumber === 10) return "#page-10";
  if (pageNumber <= 12) return "#page-11";
  if (pageNumber <= 14) return "#page-13";
  return "#page-15";
}

const pageBackdrops = {
  3: {
    type: "video",
    src: "/assets/li-ota74-bg.mp4",
    className: "backdrop-ota74",
  },
  4: {
    type: "image",
    src: "/assets/fur-material-close-bg.jpg",
    className: "backdrop-fur-close",
  },
  5: {
    type: "video",
    src: "/assets/li-center/cua-black-bg.mp4",
    className: "backdrop-li-center",
  },
  6: {
    type: "image",
    src: "/assets/fur-characters-bg.png",
    className: "backdrop-fur-lineup",
  },
  10: {
    type: "image",
    src: "/assets/ss4/ss4-glass-bg.png",
    className: "backdrop-ss4-ui",
  },
};

const liCenterStackVideos = [
  {
    title: "CUA",
    meta: "中心场景动态素材",
    src: "/assets/li-center/stack-cua.mp4",
  },
  {
    title: "年夜饭",
    meta: "节日氛围与能力场景",
    src: "/assets/li-center/stack-dinner.mp4",
  },
  {
    title: "放烟花",
    meta: "情绪化瞬间与场景表达",
    src: "/assets/li-center/stack-fireworks.mp4",
  },
  {
    title: "游戏",
    meta: "轻娱乐状态演示",
    src: "/assets/li-center/stack-game.mp4",
  },
  {
    title: "绘画",
    meta: "创作型状态演示",
    src: "/assets/li-center/stack-painting.mp4",
  },
  {
    title: "记事",
    meta: "工具型能力场景",
    src: "/assets/li-center/stack-notes.mp4",
  },
];

const aiWorkflowPeopleItems = Array.from({ length: 16 }, (_, index) => ({
  image: `/assets/ai-workflow/results/characters/characters-${pad(index + 1)}.webp`,
  link: "",
  title: `AI Workflow ${pad(index + 1)}`,
  description: "AI 角色形象筛选",
}));

const aiGalleryGroups = [
  {
    key: "characters",
    label: "人物形象",
    tone: "black",
    count: 24,
  },
  {
    key: "animals",
    label: "动物形象",
    tone: "black",
    count: 20,
  },
  {
    key: "hats",
    label: "帽子探索",
    tone: "black",
    count: 24,
  },
  {
    key: "daily",
    label: "24 小时场景",
    tone: "black",
    count: 20,
  },
];

const ocShowcaseVideos = [
  {
    title: "OC 最终眼睛方案",
    meta: "注意力与眼睛形态方案",
    src: "/assets/oc/oc-eye-scheme.mp4",
  },
  {
    title: "OC 最终效果",
    meta: "车外交互视觉效果",
    src: "/assets/oc/oc-final-effect.mp4",
  },
];

const gaussianModelOptions = [
  {
    key: "splat",
    label: "SPLAT",
    src: "/assets/bodyhand.splat",
    meta: "2.5 MB / body hand",
  },
  {
    key: "ply",
    label: "PLY",
    src: "/assets/bodyhand.ply",
    meta: "20 MB / body hand",
  },
];

function loadStoredNotes() {
  if (typeof window === "undefined") return {};

  try {
    const saved = window.localStorage.getItem(NOTES_STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function clonePages(sourcePages = pages) {
  return JSON.parse(JSON.stringify(sourcePages));
}

function loadStoredPages() {
  if (typeof window === "undefined") return clonePages();

  try {
    const saved = window.localStorage.getItem(CONTENT_STORAGE_KEY);
    return saved ? JSON.parse(saved) : clonePages();
  } catch {
    return clonePages();
  }
}

function formatAllNotes(notes, sourcePages = pages) {
  const filledNotes = sourcePages
    .map((page, index) => ({
      index,
      title: page.title,
      note: (notes[index] || "").trim(),
    }))
    .filter((item) => item.note);

  if (!filledNotes.length) {
    return "当前没有填写任何页面备注。";
  }

  return filledNotes
    .map((item) => `第 ${pad(item.index + 1)} 页｜${item.title}\n${item.note}`)
    .join("\n\n---\n\n");
}

function formatPageNote(page, index, note) {
  const value = note.trim() || "当前页尚未填写备注。";
  return `第 ${pad(index + 1)} 页｜${page.title}\n${value}`;
}

function updateContentValue(sourcePages, pageIndex, path, value) {
  const nextPages = clonePages(sourcePages);
  let target = nextPages[pageIndex];

  for (let index = 0; index < path.length - 1; index += 1) {
    target = target[path[index]];
  }

  target[path[path.length - 1]] = value;
  return nextPages;
}

function splitPoints(points) {
  const middle = Math.ceil(points.length / 2);
  return [points.slice(0, middle), points.slice(middle)];
}

function NoteButton({ index, hasNote, onOpen }) {
  return (
    <button
      className={`note-float-button ${hasNote ? "has-note" : ""}`}
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`打开第 ${pad(index + 1)} 页修改意见`}
    >
      <MessageSquareText size={16} aria-hidden="true" />
      <span>备注</span>
    </button>
  );
}

function EditableText({ as: Tag = "p", className = "", value, editing, onChange }) {
  if (!editing) {
    return <Tag className={className}>{value}</Tag>;
  }

  return (
    <Tag
      className={`${className} editable-text`.trim()}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      onBlur={(event) => onChange(event.currentTarget.innerText.trim())}
    >
      {value}
    </Tag>
  );
}

function PageBackdrop({ backdrop }) {
  if (!backdrop) return null;

  return (
    <div className={`page-backdrop ${backdrop.className}`} aria-hidden="true">
      {backdrop.type === "video" ? (
        <video src={backdrop.src} autoPlay muted loop playsInline preload="auto" />
      ) : (
        <img src={backdrop.src} alt="" />
      )}
    </div>
  );
}

function ViewportGradualBlur() {
  return (
    <GradualBlur
      className="viewport-gradual-blur"
      position="bottom"
      target="page"
      height="15svh"
      strength={3.4}
      divCount={9}
      curve="bezier"
      exponential
      zIndex={60}
    />
  );
}

function AIWorkflowInfiniteBackdrop() {
  return (
    <div className="ai-infinite-backdrop" aria-hidden="true">
      <Suspense fallback={null}>
        <InfiniteMenu
          className="ai-infinite-menu"
          items={aiWorkflowPeopleItems}
          scale={1.5}
          autoRotate
          showDetails={false}
        />
      </Suspense>
    </div>
  );
}

function getGalleryImages(group) {
  return Array.from({ length: group.count }, (_, index) => ({
    src: `/assets/ai-workflow/results/${group.key}/${group.key}-${pad(index + 1)}.webp`,
    title: `${group.label} ${pad(index + 1)}`,
  }));
}

function AIStreamGallery({ points, editing, onChange }) {
  const [activeGroup, setActiveGroup] = useState(aiGalleryGroups[0].key);
  const viewportRef = useRef(null);
  const group = aiGalleryGroups.find((item) => item.key === activeGroup) || aiGalleryGroups[0];
  const images = getGalleryImages(group);
  const streamItems = [...images, ...images];

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;

    viewport.scrollLeft = 0;

    const handleWheel = (event) => {
      const section = viewport.closest(".case-section");
      const rect = section?.getBoundingClientRect();
      const isPrimaryPage =
        rect && rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4;

      if (!isPrimaryPage || Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;

      event.preventDefault();
      viewport.scrollLeft += event.deltaY;
    };

    const handleScroll = () => {
      const half = viewport.scrollWidth / 2;
      if (viewport.scrollLeft < 8) {
        viewport.scrollLeft += half;
      } else if (viewport.scrollLeft > half + 8) {
        viewport.scrollLeft -= half;
      }
    };

    viewport.addEventListener("wheel", handleWheel, { passive: false });
    viewport.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      viewport.removeEventListener("wheel", handleWheel);
      viewport.removeEventListener("scroll", handleScroll);
    };
  }, [activeGroup, images.length]);

  return (
    <div className={`ai-stream-gallery is-${group.tone}`}>
      <div className="ai-stream-tabs" aria-label="AI 素材分类">
        {aiGalleryGroups.map((item) => (
          <button
            className={item.key === activeGroup ? "is-active" : ""}
            type="button"
            onClick={() => setActiveGroup(item.key)}
            key={item.key}
          >
            {item.label}
            <span>{item.count}</span>
          </button>
        ))}
      </div>
      <div className="ai-stream-viewport" aria-label={`${group.label}素材浏览`} ref={viewportRef}>
        <div className="ai-stream-track">
          {streamItems.map((item, index) => (
            <figure className="ai-stream-item" key={`${item.src}-${index}`}>
              <img src={item.src} alt="" loading={index < 10 ? "eager" : "lazy"} />
            </figure>
          ))}
        </div>
      </div>
      <div className="ai-stream-summary">
        {points.map((item, index) => (
          <article tabIndex={0} key={item.label}>
            <span>{pad(index + 1)}</span>
            <div>
              <EditableText
                as="strong"
                value={item.label}
                editing={editing}
                onChange={(value) => onChange(["points", index, "label"], value)}
              />
              <EditableText
                value={item.text}
                editing={editing}
                onChange={(value) => onChange(["points", index, "text"], value)}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function AIMethodInteractive({ points, editing, onChange }) {
  return (
    <div className="ai-method-panel">
      <div className="ai-method-visual" aria-label="AI 工作流生成结果池">
        <Suspense fallback={<div className="ai-method-loading">AI RESULT POOL</div>}>
          <InfiniteMenu
            className="ai-method-infinite-menu"
            items={aiWorkflowPeopleItems}
            scale={1.5}
            autoRotate
            showDetails={false}
          />
        </Suspense>
      </div>
      <div className="ai-method-cards">
        {points.map((item, index) => (
          <article className="ai-method-card" tabIndex={0} key={item.label}>
            <span>{pad(index + 1)}</span>
            <EditableText
              as="h3"
              value={item.label}
              editing={editing}
              onChange={(value) => onChange(["points", index, "label"], value)}
            />
            <EditableText
              value={item.text}
              editing={editing}
              onChange={(value) => onChange(["points", index, "text"], value)}
            />
          </article>
        ))}
      </div>
    </div>
  );
}

function NotesModal({ page, index, note, onNoteChange, onCopyNote, copied, onClose }) {
  return (
    <div className="notes-modal" role="dialog" aria-modal="true" aria-label={`第 ${pad(index + 1)} 页修改意见`}>
      <button className="notes-backdrop" type="button" aria-label="关闭修改意见" onClick={onClose} />
      <section className="notes-dialog">
        <div className="notes-head">
          <div>
            <p className="notes-kicker">页面备注</p>
            <h3>第 {pad(index + 1)} 页｜{page.title}</h3>
          </div>
          <button className="notes-close-button" type="button" aria-label="关闭修改意见" onClick={onClose}>
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <textarea
          value={note}
          onChange={(event) => onNoteChange(index, event.target.value)}
          autoFocus
          placeholder="在这里写这一页的修改意见。备注会自动保存在当前浏览器；写完后点顶部「复制备注」或弹窗内「复制本页」，发给 Codex 继续改网页。"
        />
        <div className="notes-actions">
          <p className="notes-helper">
            <MessageSquareText size={14} aria-hidden="true" />
            自动保存到本机浏览器，不占正文排版。
          </p>
          <button className="note-copy-button" type="button" onClick={() => onCopyNote(index)}>
            {copied ? <ClipboardCheck size={16} /> : <ClipboardList size={16} />}
            {copied ? "已复制" : "复制本页"}
          </button>
        </div>
      </section>
    </div>
  );
}

function CoverCards({ items, editing, onChange }) {
  return (
    <div className="cover-cards">
      {items.map((item, index) => (
        <article className="cover-card" key={item.label}>
          <span>{pad(index + 1)}</span>
          <EditableText
            as="h3"
            value={item.label}
            editing={editing}
            onChange={(value) => onChange(["coverItems", index, "label"], value)}
          />
          <EditableText
            value={item.text}
            editing={editing}
            onChange={(value) => onChange(["coverItems", index, "text"], value)}
          />
        </article>
      ))}
    </div>
  );
}

function PointCard({ item, index, editing, onChange }) {
  return (
    <article className="point-card">
      <span>{pad(index + 1)}</span>
      <EditableText
        as="h3"
        value={item.label}
        editing={editing}
        onChange={(value) => onChange(["points", index, "label"], value)}
      />
      <EditableText
        value={item.text}
        editing={editing}
        onChange={(value) => onChange(["points", index, "text"], value)}
      />
    </article>
  );
}

function CapabilityDock({ points, editing, onChange }) {
  const [openItems, setOpenItems] = useState(() => new Set([0]));

  const openItem = (index) => {
    setOpenItems((current) => {
      if (current.has(index)) return current;
      const next = new Set(current);
      next.add(index);
      return next;
    });
  };

  const toggleItem = (index) => {
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="capability-dock" aria-label="专业能力背景">
      {points.map((item, index) => {
        const isOpen = openItems.has(index);
        const content = (
          <>
            <span className="capability-count">{pad(index + 1)}</span>
            <EditableText
              as="h3"
              value={item.label}
              editing={editing}
              onChange={(value) => onChange(["points", index, "label"], value)}
            />
            <EditableText
              value={item.text}
              editing={editing}
              onChange={(value) => onChange(["points", index, "text"], value)}
            />
          </>
        );

        if (editing) {
          return (
            <article className={`capability-panel ${isOpen ? "is-open" : ""}`} key={item.label}>
              {content}
            </article>
          );
        }

        return (
          <button
            className={`capability-panel ${isOpen ? "is-open" : ""}`}
            type="button"
            onMouseEnter={() => openItem(index)}
            onFocus={() => openItem(index)}
            onClick={() => toggleItem(index)}
            aria-expanded={isOpen}
            key={item.label}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}

const radianceDefault = {
  intensity: 2.05,
  distort: 0,
  rayCount: 15,
  speed: 0.15,
  base: "#A87534",
  highlight: "#D2A14B",
};

function RadianceSlider({ label, value, onChange, min, max, step = 1 }) {
  const displayValue = Number.isInteger(value) ? value : value.toFixed(2);

  return (
    <label className="radiance-control">
      <span>
        {label}
        <strong>{displayValue}</strong>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function RadianceColorControl({ label, value, onChange }) {
  return (
    <label className="radiance-color-control">
      <span>{label}</span>
      <input type="color" value={value} onChange={(event) => onChange(event.target.value)} />
      <strong>{value}</strong>
    </label>
  );
}

function StandbyRadianceDemo() {
  const [light, setLight] = useState({
    intensity: radianceDefault.intensity,
    distort: radianceDefault.distort,
    rayCount: radianceDefault.rayCount,
    speed: radianceDefault.speed,
    base: radianceDefault.base,
    highlight: radianceDefault.highlight,
  });
  const stageRef = useRef(null);
  const keysRef = useRef({ up: false, down: false, left: false, right: false });
  const targetFocusRef = useRef({ x: 0, y: 0 });
  const clickGlowRef = useRef({ strength: 0, x: 0.5, y: 0.5 });
  const clickHoldRef = useRef(false);
  const [focus, setFocus] = useState({ x: 0, y: 0 });
  const [clickGlow, setClickGlow] = useState({ strength: 0, x: 0.5, y: 0.5 });

  const setLightValue = (key, value) => {
    setLight((current) => ({ ...current, [key]: value }));
  };

  const burstColors = useMemo(
    () => [light.highlight, light.base, light.highlight],
    [light.base, light.highlight],
  );

  useEffect(() => {
    let rafId = 0;

    const animateInteraction = () => {
      const nextTarget = { x: 0, y: 0 };
      if (keysRef.current.up) nextTarget.y += 1;
      if (keysRef.current.down) nextTarget.y -= 1;
      if (keysRef.current.right) nextTarget.x += 1;
      if (keysRef.current.left) nextTarget.x -= 1;

      const length = Math.hypot(nextTarget.x, nextTarget.y);
      if (length > 0) {
        nextTarget.x /= length;
        nextTarget.y /= length;
      }

      targetFocusRef.current.x += (nextTarget.x - targetFocusRef.current.x) * 0.08;
      targetFocusRef.current.y += (nextTarget.y - targetFocusRef.current.y) * 0.08;
      clickGlowRef.current.strength += ((clickHoldRef.current ? 0.95 : 0) - clickGlowRef.current.strength) * 0.12;

      setFocus({ ...targetFocusRef.current });
      setClickGlow({ ...clickGlowRef.current });
      rafId = window.requestAnimationFrame(animateInteraction);
    };

    rafId = window.requestAnimationFrame(animateInteraction);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    const isControlTarget = (target) =>
      target instanceof HTMLElement &&
      Boolean(target.closest('input, textarea, select, button, a, [contenteditable="true"]'));

    const isRadiancePageActive = () => {
      const section = stageRef.current?.closest(".case-section");
      if (!section) return false;
      const rect = section.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.62 && rect.bottom > window.innerHeight * 0.38;
    };

    const updateKey = (event, pressed) => {
      if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) return;
      if (isControlTarget(event.target)) return;
      if (pressed && !isRadiancePageActive()) return;

      event.preventDefault();
      if (event.key === "ArrowUp") keysRef.current.up = pressed;
      if (event.key === "ArrowDown") keysRef.current.down = pressed;
      if (event.key === "ArrowLeft") keysRef.current.left = pressed;
      if (event.key === "ArrowRight") keysRef.current.right = pressed;
    };

    const handleKeyDown = (event) => updateKey(event, true);
    const handleKeyUp = (event) => updateKey(event, false);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const updateClickGlowPosition = (event, hold = true) => {
    const rect = event.currentTarget.getBoundingClientRect();
    clickHoldRef.current = hold;
    clickGlowRef.current.x = (event.clientX - rect.left) / Math.max(rect.width, 1);
    clickGlowRef.current.y = (event.clientY - rect.top) / Math.max(rect.height, 1);
    setClickGlow({ ...clickGlowRef.current });
  };

  const releaseClickGlow = () => {
    clickHoldRef.current = false;
  };

  const holdDirection = (direction, pressed) => {
    keysRef.current[direction] = pressed;
  };

  return (
    <div className="radiance-demo">
      <div
        className="radiance-stage"
        ref={stageRef}
        onPointerDown={(event) => updateClickGlowPosition(event, true)}
        onPointerMove={(event) => {
          if (clickHoldRef.current) updateClickGlowPosition(event, true);
        }}
        onPointerUp={releaseClickGlow}
        onPointerLeave={releaseClickGlow}
        onPointerCancel={releaseClickGlow}
      >
        <div className="radiance-webgl" aria-hidden="true">
          <PrismaticBurst
            intensity={light.intensity}
            distort={light.distort}
            rayCount={light.rayCount}
            speed={light.speed}
            colors={burstColors}
            animationType="rotate3d"
            mixBlendMode="screen"
            focus={focus}
            pulse={{ strength: 0, x: 0, y: 0, scale: 0 }}
            shockwave={0}
            shockwaveCenter={{ x: 0.5, y: 0.5 }}
            clickGlow={clickGlow}
          />
        </div>
      </div>
      <div className="radiance-panel">
        <div className="radiance-direction-pad" aria-label="放射光方向控制">
          {[
            ["left", "←", "左侧视角"],
            ["up", "↑", "上方视角"],
            ["down", "↓", "下方视角"],
            ["right", "→", "右侧视角"],
          ].map(([key, label, helper]) => (
            <button
              type="button"
              onPointerDown={() => holdDirection(key, true)}
              onPointerUp={() => holdDirection(key, false)}
              onPointerLeave={() => holdDirection(key, false)}
              onPointerCancel={() => holdDirection(key, false)}
              onBlur={() => holdDirection(key, false)}
              key={key}
            >
              <span>{label}</span>
              <small>{helper}</small>
            </button>
          ))}
        </div>
        <div className="radiance-controls">
          <RadianceSlider
            label="Intensity"
            value={light.intensity}
            min={0.1}
            max={3}
            step={0.05}
            onChange={(value) => setLightValue("intensity", value)}
          />
          <RadianceSlider
            label="Distortion"
            value={light.distort}
            min={0}
            max={2}
            step={0.05}
            onChange={(value) => setLightValue("distort", value)}
          />
          <RadianceSlider
            label="Ray Count"
            value={light.rayCount}
            min={4}
            max={42}
            step={1}
            onChange={(value) => setLightValue("rayCount", value)}
          />
          <RadianceSlider
            label="Speed"
            value={light.speed}
            min={0.05}
            max={1.8}
            step={0.05}
            onChange={(value) => setLightValue("speed", value)}
          />
        </div>
        <div className="radiance-color-space">
          <RadianceColorControl
            label="Base Color"
            value={light.base}
            onChange={(value) => setLightValue("base", value)}
          />
          <RadianceColorControl
            label="Light Color"
            value={light.highlight}
            onChange={(value) => setLightValue("highlight", value)}
          />
        </div>
      </div>
    </div>
  );
}

function SS4FluidGlassDemo() {
  return (
    <div className="fluid-glass-demo">
      <video className="fluid-glass-source-video" src="/assets/ss4/ss4-ui-bg.mp4" autoPlay muted loop playsInline />
      <Suspense fallback={<div className="fluid-glass-loading">SS4 MATERIAL</div>}>
        <FluidGlass
          mode="lens"
          showSceneImages={false}
          lensProps={{
            scale: 0.3,
            ior: 1.2,
            thickness: 5.6,
            transmission: 1,
            roughness: 0.045,
            chromaticAberration: 0.1,
            anisotropy: 0.035,
            color: "#ffffff",
            attenuationColor: "#fff5e8",
            attenuationDistance: 0.42,
            highlightOpacity: 0.3,
          }}
        />
      </Suspense>
      <div className="fluid-glass-lens-glow" aria-hidden="true" />
      <div className="fluid-glass-meta" aria-hidden="true">
        <span>SS4 MATERIAL</span>
        <strong>GLASS RESPONSE</strong>
      </div>
    </div>
  );
}

function GaussianSplatDemo() {
  const [activeModel, setActiveModel] = useState(gaussianModelOptions[0].key);
  const model = gaussianModelOptions.find((item) => item.key === activeModel) || gaussianModelOptions[0];

  return (
    <div className="gaussian-splat-demo">
      <div className="gaussian-model-switch" aria-label="Gaussian model source">
        {gaussianModelOptions.map((item) => (
          <button
            className={item.key === activeModel ? "is-active" : ""}
            type="button"
            onClick={() => setActiveModel(item.key)}
            key={item.key}
          >
            <span>{item.label}</span>
            <small>{item.meta}</small>
          </button>
        ))}
      </div>
      <DemoErrorBoundary fallback={<div className="gaussian-splat-loading">GAUSSIAN SPLAT PREVIEW</div>}>
        <Suspense fallback={<div className="gaussian-splat-loading">GAUSSIAN SPLAT</div>} key={model.src}>
          <GaussianSplatViewer src={model.src} />
        </Suspense>
      </DemoErrorBoundary>
    </div>
  );
}

function LiCenterScrollStackDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef(null);
  const wheelLockRef = useRef(false);
  const lastIndex = liCenterStackVideos.length - 1;

  const moveActiveVideo = (direction) => {
    setActiveIndex((current) => Math.min(lastIndex, Math.max(0, current + direction)));
  };

  useEffect(() => {
    let snapTimeout;

    const alignSection = () => {
      const section = rootRef.current?.closest(".case-section");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      const visibleRatio = visibleHeight / Math.max(rect.height, 1);

      const offset = Math.abs(rect.top);
      if (visibleRatio > 0.58 && offset > 18 && offset < 140) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const scheduleSnap = () => {
      window.clearTimeout(snapTimeout);
      snapTimeout = window.setTimeout(alignSection, 180);
    };

    window.addEventListener("scroll", scheduleSnap, { passive: true });

    return () => {
      window.clearTimeout(snapTimeout);
      window.removeEventListener("scroll", scheduleSnap);
    };
  }, []);

  useEffect(() => {
    const handleWheel = (event) => {
      const root = rootRef.current;
      const section = root?.closest(".case-section");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const isPrimaryPage = rect.top < window.innerHeight * 0.55 && rect.bottom > window.innerHeight * 0.45;
      if (!isPrimaryPage) return;

      const direction = Math.sign(event.deltaY);
      if (!direction || Math.abs(event.deltaY) < 18) return;

      const canMoveInside =
        (direction > 0 && activeIndex < lastIndex) || (direction < 0 && activeIndex > 0);

      if (!canMoveInside) return;

      event.preventDefault();
      event.stopPropagation();

      if (wheelLockRef.current) return;
      wheelLockRef.current = true;
      moveActiveVideo(direction);
      window.setTimeout(() => {
        wheelLockRef.current = false;
      }, 520);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeIndex, lastIndex]);

  return (
    <div
      className="li-center-scroll-demo"
      ref={rootRef}
      role="region"
      aria-label="理想同学中心视频堆叠展示"
    >
      <div className="li-center-stack-stage">
        {liCenterStackVideos.map((item, index) => {
          const offset = index - activeIndex;
          const isActive = offset === 0;

          return (
            <article
              className={`li-center-stack-card ${isActive ? "is-active" : ""}`}
              data-stack-state={offset < 0 ? "past" : offset > 0 ? "future" : "active"}
              style={{
                "--stack-offset": offset,
                "--stack-depth": Math.abs(offset),
                zIndex: liCenterStackVideos.length - Math.abs(offset),
              }}
              key={item.src}
            >
              <video
                className="li-center-stack-video"
                src={item.src}
                autoPlay
                muted
                loop
                playsInline
                preload={Math.abs(offset) < 2 ? "auto" : "metadata"}
              />
              <div className="li-center-stack-copy">
                <span>{pad(index + 1)}</span>
                <h3>{item.title}</h3>
                <p>{item.meta}</p>
              </div>
            </article>
          );
        })}
      </div>
      <div className="li-center-stack-rail">
        {liCenterStackVideos.map((item, index) => (
          <button
            className={index === activeIndex ? "is-active" : ""}
            type="button"
            aria-label={`Switch to video ${index + 1}`}
            onClick={() => setActiveIndex(index)}
            key={item.src}
          >
            {pad(index + 1)}
          </button>
        ))}
      </div>
    </div>
  );
}

function OCVideoShowcase({ points, editing, onChange }) {
  return (
    <div className="oc-video-showcase">
      <div className="oc-video-grid">
        {ocShowcaseVideos.map((item, index) => (
          <article className="oc-video-card" key={item.src}>
            <video src={item.src} autoPlay muted loop playsInline preload="auto" />
            <div className="oc-video-copy">
              <span>{pad(index + 1)}</span>
              <h3>{item.title}</h3>
              <p>{item.meta}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="oc-strategy-board">
        {points.map((item, index) => (
          <article className="oc-strategy-item" key={item.label}>
            <span>{pad(index + 1)}</span>
            <div>
              <EditableText
                as="h3"
                value={item.label}
                editing={editing}
                onChange={(value) => onChange(["points", index, "label"], value)}
              />
              <EditableText
                value={item.text}
                editing={editing}
                onChange={(value) => onChange(["points", index, "text"], value)}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function HeroSection({ page, mode, note, onOpenNote, isActive, editing, onChange }) {
  return (
    <section className={`hero-section ${isActive ? "is-active" : ""}`} id="page-1">
      <NoteButton index={0} hasNote={Boolean(note?.trim())} onOpen={onOpenNote} />
      <div className="hero-orbit" aria-hidden="true" />
      <div className="hero-copy">
        <p className="eyebrow">{mode.label} / {mode.name}</p>
        <EditableText
          as="h1"
          value={page.title}
          editing={editing}
          onChange={(value) => onChange(0, ["title"], value)}
        />
        <EditableText
          className="hero-line"
          value={page.conclusion}
          editing={editing}
          onChange={(value) => onChange(0, ["conclusion"], value)}
        />
        <EditableText
          className="hero-intro"
          value={page.intro}
          editing={editing}
          onChange={(value) => onChange(0, ["intro"], value)}
        />
      </div>
      <CoverCards
        items={page.coverItems || []}
        editing={editing}
        onChange={(path, value) => onChange(0, path, value)}
      />
    </section>
  );
}

function FinalSummaryShowcase({ points, editing, onChange }) {
  const [activeCardIndex, setActiveCardIndex] = useState(null);

  return (
    <div className="final-summary-showcase">
      <div className="final-summary-cards" aria-label="Summary details">
        {points.map((item, pointIndex) => (
          <article
            className={`final-summary-card${activeCardIndex === pointIndex ? " is-expanded" : ""}`}
            tabIndex={0}
            onMouseEnter={() => setActiveCardIndex(pointIndex)}
            onMouseLeave={() => setActiveCardIndex(null)}
            onFocus={() => setActiveCardIndex(pointIndex)}
            onBlur={() => setActiveCardIndex(null)}
            key={item.label}
          >
            <span>{pad(pointIndex + 1)}</span>
            <EditableText
              as="h3"
              value={item.label}
              editing={editing}
              onChange={(value) => onChange(["points", pointIndex, "label"], value)}
            />
            <EditableText
              value={item.text}
              editing={editing}
              onChange={(value) => onChange(["points", pointIndex, "text"], value)}
            />
          </article>
        ))}
      </div>
      <div className="final-summary-visual">
        <img src="/assets/final-summary-banner.jpg" alt="" />
      </div>
    </div>
  );
}

function CaseSection({ page, index, note, onOpenNote, isActive, editing, onChange }) {
  const [firstColumn, secondColumn] = splitPoints(page.points);
  const pageNumber = index + 1;
  const backdrop = pageBackdrops[pageNumber];
  const sectionClasses = ["case-section"];
  if (isActive) {
    sectionClasses.push("is-active");
  }

  if (backdrop) {
    sectionClasses.push("has-backdrop", backdrop.className);
  }

  if (page.demo === "scrollStack") {
    sectionClasses.push("has-scroll-stack");
  }

  if (page.demo === "ocVideos") {
    sectionClasses.push("has-oc-videos");
  }

  if (page.demo === "aiMethod") {
    sectionClasses.push("has-ai-method");
  } else if (page.demo === "aiGallery") {
    sectionClasses.push("has-ai-gallery");
  } else if (page.demo === "capabilityDock") {
    sectionClasses.push("has-capability-dock");
  } else if (pageNumber === 9) {
    sectionClasses.push("has-infinite-menu");
  }

  if (pageNumber === pages.length) {
    sectionClasses.push("final-summary-section");
  }

  return (
    <section className={sectionClasses.join(" ")} id={`page-${pageNumber}`}>
      <PageBackdrop backdrop={backdrop} />
      {pageNumber === 9 && page.demo !== "aiGallery" && page.demo !== "aiMethod" ? <AIWorkflowInfiniteBackdrop /> : null}
      <NoteButton index={index} hasNote={Boolean(note?.trim())} onOpen={onOpenNote} />
      <div className="case-index" aria-hidden="true">
        {pad(pageNumber)}
      </div>
      <div className="case-copy">
        <p className="eyebrow">{page.eyebrow}</p>
        <EditableText
          as="h2"
          value={page.title}
          editing={editing}
          onChange={(value) => onChange(index, ["title"], value)}
        />
        <EditableText
          className="conclusion"
          value={page.conclusion}
          editing={editing}
          onChange={(value) => onChange(index, ["conclusion"], value)}
        />
        <EditableText
          className="intro"
          value={page.intro}
          editing={editing}
          onChange={(value) => onChange(index, ["intro"], value)}
        />
        {page.demo === "gaussianSplat" ? (
          <div className="gaussian-copy-points">
            {page.points.map((item, pointIndex) => (
              <article key={item.label}>
                <span>{pad(pointIndex + 1)}</span>
                <div>
                  <EditableText
                    as="h3"
                    value={item.label}
                    editing={editing}
                    onChange={(value) => onChange(index, ["points", pointIndex, "label"], value)}
                  />
                  <EditableText
                    value={item.text}
                    editing={editing}
                    onChange={(value) => onChange(index, ["points", pointIndex, "text"], value)}
                  />
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </div>
      {page.demo === "radiance" ? (
        <StandbyRadianceDemo />
      ) : page.demo === "fluidGlass" ? (
        <SS4FluidGlassDemo />
      ) : page.demo === "gaussianSplat" ? (
        <GaussianSplatDemo />
      ) : page.demo === "scrollStack" ? (
        <LiCenterScrollStackDemo />
      ) : page.demo === "aiMethod" ? (
        <AIMethodInteractive
          points={page.points}
          editing={editing}
          onChange={(path, value) => onChange(index, path, value)}
        />
      ) : page.demo === "aiGallery" ? (
        <AIStreamGallery
          points={page.points}
          editing={editing}
          onChange={(path, value) => onChange(index, path, value)}
        />
      ) : page.demo === "capabilityDock" ? (
        <CapabilityDock
          points={page.points}
          editing={editing}
          onChange={(path, value) => onChange(index, path, value)}
        />
      ) : page.demo === "ocVideos" ? (
        <OCVideoShowcase
          points={page.points}
          editing={editing}
          onChange={(path, value) => onChange(index, path, value)}
        />
      ) : pageNumber === pages.length ? (
        <FinalSummaryShowcase
          points={page.points}
          editing={editing}
          onChange={(path, value) => onChange(index, path, value)}
        />
      ) : (
        <div className="points-grid">
          <div>
            {firstColumn.map((item, pointIndex) => (
              <PointCard
                item={item}
                index={pointIndex}
                editing={editing}
                onChange={(path, value) => onChange(index, path, value)}
                key={item.label}
              />
            ))}
          </div>
          <div>
            {secondColumn.map((item, pointIndex) => (
              <PointCard
                item={item}
                index={pointIndex + firstColumn.length}
                editing={editing}
                onChange={(path, value) => onChange(index, path, value)}
                key={item.label}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function VisualDeck({ mode, pagesSource, notes, onOpenNote, activePageIndex, editing, onChange }) {
  return (
    <main className={`visual-deck deck-${mode.id}`}>
      <HeroSection
        page={pagesSource[0]}
        mode={mode}
        note={notes[0] || ""}
        onOpenNote={onOpenNote}
        isActive={activePageIndex === 0}
        editing={editing}
        onChange={onChange}
      />
      {pagesSource.slice(1).map((page, offset) => {
        const index = offset + 1;
        return (
          <CaseSection
            page={page}
            index={index}
            key={`${mode.id}-${page.eyebrow}`}
            note={notes[index] || ""}
            onOpenNote={onOpenNote}
            isActive={activePageIndex === index}
            editing={editing}
            onChange={onChange}
          />
        );
      })}
    </main>
  );
}

function NavDrawer({ open, onClose, pagesSource }) {
  return (
    <aside className={`toc ${open ? "is-open" : ""}`}>
      <p className="toc-title">目录</p>
      <nav aria-label="页面目录">
        {pagesSource.map((page, index) => (
          <a href={`#page-${index + 1}`} key={page.eyebrow} onClick={onClose}>
            <span>{pad(index + 1)}</span>
            {page.title}
          </a>
        ))}
      </nav>
    </aside>
  );
}

export function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [notes, setNotes] = useState(loadStoredNotes);
  const [contentPages, setContentPages] = useState(loadStoredPages);
  const [activeNoteIndex, setActiveNoteIndex] = useState(null);
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [copiedTarget, setCopiedTarget] = useState("");
  const [contentEditing, setContentEditing] = useState(false);
  const [contentDirty, setContentDirty] = useState(false);
  const pageCount = useMemo(() => contentPages.length, [contentPages.length]);
  const notesCount = useMemo(
    () => Object.values(notes).filter((value) => value?.trim()).length,
    [notes],
  );
  const activeMode = activeVisualMode;

  useEffect(() => {
    try {
      window.localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
    } catch {
      // Notes are a convenience layer; storage failures must not affect page rendering.
    }
  }, [notes]);

  useEffect(() => {
    document.documentElement.dataset.finalSummary = activePageIndex === pageCount - 1 ? "true" : "false";
    return () => {
      delete document.documentElement.dataset.finalSummary;
    };
  }, [activePageIndex, pageCount]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll(".hero-section, .case-section"));
    if (!sections.length) return undefined;

    let rafId = 0;

    const updateActiveSection = () => {
      rafId = 0;

      try {
        const viewportCenter = window.innerHeight / 2;
        let nextActiveIndex = 0;
        let nearestDistance = Number.POSITIVE_INFINITY;

        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nextActiveIndex = Number(section.id.replace("page-", "")) - 1;
          }
        });

        if (!Number.isNaN(nextActiveIndex)) {
          setActivePageIndex(nextActiveIndex);
        }
      } catch {
        setActivePageIndex(0);
      }
    };

    const scheduleUpdate = () => {
      if (rafId) return;
      if (typeof window.requestAnimationFrame === "function") {
        rafId = window.requestAnimationFrame(updateActiveSection);
      } else {
        rafId = window.setTimeout(updateActiveSection, 16);
      }
    };

    updateActiveSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (rafId) {
        if (typeof window.cancelAnimationFrame === "function") {
          window.cancelAnimationFrame(rafId);
        } else {
          window.clearTimeout(rafId);
        }
      }
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    const isEditingTarget = (target) => {
      if (!(target instanceof HTMLElement)) return false;
      return Boolean(
        target.closest(
          'input, textarea, select, button, a, [contenteditable="true"], [role="textbox"]',
        ),
      );
    };

    const getCurrentPageIndex = (sections) => {
      const viewportCenter = window.innerHeight / 2;
      return sections.reduce(
        (nearest, section, index) => {
          const rect = section.getBoundingClientRect();
          const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);
          return distance < nearest.distance ? { distance, index } : nearest;
        },
        { distance: Number.POSITIVE_INFINITY, index: activePageIndex },
      ).index;
    };

    const handleKeyDown = (event) => {
      const isSpaceKey = event.key === " " || event.key === "Spacebar" || event.code === "Space";
      if (!isSpaceKey || event.metaKey || event.ctrlKey || event.altKey) return;
      if (isEditingTarget(event.target)) return;

      const sections = Array.from(document.querySelectorAll(".hero-section, .case-section"));
      if (!sections.length) return;

      event.preventDefault();
      const currentIndex = getCurrentPageIndex(sections);
      const direction = event.shiftKey ? -1 : 1;
      const nextIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + direction));
      const nextSection = sections[nextIndex];
      if (!nextSection || nextIndex === currentIndex) return;

      setActivePageIndex(nextIndex);
      window.scrollTo({ top: nextSection.offsetTop, behavior: "smooth" });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePageIndex]);

  const updateNote = (index, value) => {
    setNotes((current) => ({ ...current, [index]: value }));
  };

  const updateContent = (pageIndex, path, value) => {
    setContentPages((current) => updateContentValue(current, pageIndex, path, value));
    setContentDirty(true);
  };

  const saveContent = () => {
    try {
      window.localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(contentPages));
      setContentDirty(false);
      setContentEditing(false);
      setCopiedTarget("content-save");
      window.setTimeout(() => setCopiedTarget(""), 1600);
    } catch {
      setCopiedTarget("content-save-failed");
      window.setTimeout(() => setCopiedTarget(""), 1600);
    }
  };

  const resetContent = () => {
    const nextPages = clonePages();
    setContentPages(nextPages);
    setContentDirty(false);
    setContentEditing(false);
    try {
      window.localStorage.removeItem(CONTENT_STORAGE_KEY);
    } catch {
      // Local content reset is non-critical.
    }
  };

  const copyText = async (text, target) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        throw new Error("Clipboard API unavailable");
      }
    } catch {
      const fallback = document.createElement("textarea");
      fallback.value = text;
      fallback.setAttribute("readonly", "");
      fallback.className = "clipboard-fallback";
      document.body.appendChild(fallback);
      fallback.select();
      document.execCommand("copy");
      document.body.removeChild(fallback);
    }

    setCopiedTarget(target);
    window.setTimeout(() => setCopiedTarget(""), 1600);
  };

  const copyAllNotes = () => {
    copyText(formatAllNotes(notes, contentPages), "all");
  };

  const copyPageNote = (index) => {
    copyText(formatPageNote(contentPages[index], index, notes[index] || ""), `page-${index}`);
  };

  return (
    <div className={`app-shell theme-${activeMode.id}`}>
      <header className="site-header">
        <PillNav
          logo={pillLogo}
          logoAlt="Suhao Work"
          items={pillNavItems}
          activeHref={getActivePillHref(activePageIndex)}
          baseColor="#f5f5f0"
          pillColor="#08080a"
          hoveredPillTextColor="#08080a"
          pillTextColor="#f5f5f0"
          initialLoadAnimation
          onNavigate={() => setNavOpen(false)}
        />
        <div className="header-actions">
          <div className="header-meta">
            <span>{pageCount} pages</span>
            <span>{notesCount} notes</span>
          </div>
          <button
            className={`edit-content-button ${contentEditing ? "is-active" : ""}`}
            type="button"
            onClick={() => setContentEditing((value) => !value)}
          >
            <PencilLine size={16} />
            {contentEditing ? "退出编辑" : "编辑文案"}
          </button>
          {contentEditing || contentDirty ? (
            <>
              <button className="save-content-button" type="button" onClick={saveContent}>
                {copiedTarget === "content-save" ? <ClipboardCheck size={16} /> : <Save size={16} />}
                {copiedTarget === "content-save"
                  ? "已保存"
                  : copiedTarget === "content-save-failed"
                    ? "保存失败"
                    : "保存文案"}
              </button>
              <button className="reset-content-button" type="button" onClick={resetContent}>
                <RotateCcw size={16} />
                还原
              </button>
            </>
          ) : null}
          <button className="copy-all-button" type="button" onClick={copyAllNotes}>
            {copiedTarget === "all" ? <ClipboardCheck size={16} /> : <ClipboardList size={16} />}
            {copiedTarget === "all" ? "已复制备注" : "复制备注"}
          </button>
          <button
            className="menu-button"
            type="button"
            aria-expanded={navOpen}
            aria-label={navOpen ? "关闭目录" : "打开目录"}
            onClick={() => setNavOpen((value) => !value)}
          >
            {navOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <NavDrawer open={navOpen} onClose={() => setNavOpen(false)} pagesSource={contentPages} />
      <ViewportGradualBlur />

      <VisualDeck
        mode={activeMode}
        pagesSource={contentPages}
        notes={notes}
        onOpenNote={setActiveNoteIndex}
        activePageIndex={activePageIndex}
        editing={contentEditing}
        onChange={updateContent}
      />

      {activeNoteIndex !== null ? (
        <NotesModal
          page={contentPages[activeNoteIndex]}
          index={activeNoteIndex}
          note={notes[activeNoteIndex] || ""}
          onNoteChange={updateNote}
          onCopyNote={copyPageNote}
          copied={copiedTarget === `page-${activeNoteIndex}`}
          onClose={() => setActiveNoteIndex(null)}
        />
      ) : null}
    </div>
  );
}
