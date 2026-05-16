import { useEffect, useMemo, useState } from "react";
import {
  ClipboardCheck,
  ClipboardList,
  Menu,
  MessageSquareText,
  Orbit,
  X,
} from "lucide-react";
import { PrismaticBurst } from "./components/PrismaticBurst";

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
        text: "理想同学实体化形象、理想同学中心、4o 小同桌、7.4 OTA 设计交付、AI 实战工作流、Standby 放射光、OC 眼睛。",
      },
      {
        label: "简单简介",
        text: "具备 3D 与动画的专业基础，也有产品动效、交互动态、多端资源适配和 AI 工具探索经验。工作重点不是单点视觉输出，而是把偏技术的体验方案转化为可被研发还原、可被用户感知的产品结果。",
      },
    ],
    points: [],
  },
  {
    eyebrow: "02 / Capability",
    title: "专业能力背景",
    conclusion:
      "能力覆盖 3D 与动画、产品动效与交互、AI 应用工作流和创新探索。",
    intro:
      "这部分不是工具清单，而是我在相关项目中形成的能力基础和可对应的项目成果。",
    points: [
      {
        label: "3D 与动画能力",
        text: "我熟悉 3D 全流程制作与技术路径，能够从形体、材质、灯光、渲染到动画节奏判断方案的可实现性与上线稳定性。动画能力覆盖 3D 角色动画、UI 动效和体验型交互动态，能够将重量、节奏、情绪和状态反馈转化为用户可感知的动态表达。",
      },
      {
        label: "产品动效与交互能力",
        text: "我对产品动效的理解侧重于状态表达、注意力引导、层级关系和操作反馈。实际项目中，会结合缓动曲线、状态切换、动效频率、停留时长和交互连续性，判断动效是否清晰、是否克制，以及是否适合长期使用场景。",
      },
      {
        label: "多端资源适配落地能力",
        text: "我具备多端资源交付经验，熟悉不同端侧对格式、尺寸、编码、透明通道、压缩方式、性能和版本兼容的要求。在设计阶段会提前判断资源拆分、导出、压缩和研发接入方式，降低后期返工和端侧适配成本。",
      },
      {
        label: "AI 应用工作流",
        text: "我持续关注 AI 工具的能力边界，并将其转化为具体提效流程，包括批量生成、结果筛选、视频裁切压缩、脚本自动化和可交互原型验证。重点不在于单次使用某个工具，而在于将 AI 嵌入真实项目流程，用于解决效率、验证和交付问题。",
      },
      {
        label: "创新探索能力",
        text: "我在理想同学相关项目中承担过多项早期探索工作，包括原生形象、视觉语言、交互动效和未来体验方向。探索过程强调可验证、可讨论和可转化，目标是将前期概念逐步推进为可落地的产品方案。",
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
        text: "形成了理想同学毛绒实体化形象的核心方向，也为后续理想同学中心、4o 小同桌、多端形象和更多 AI 角色探索提供了基础资产。毛绒世界观的设定在这里作为补充方向被纳入：相关场景尽量沿用毛绒、毛毡和手工缝纫等材质语言。",
      },
    ],
  },
  {
    eyebrow: "04 / Case 01 Detail",
    title: "毛绒材质实现",
    conclusion:
      "通过 3D 材质和动画判断，把毛绒的真实感、亲和感和线上稳定性结合起来。",
    intro:
      "理想同学实体化形象中，帽子和身体的毛发效果是关键转折点。它决定角色是否真实、是否亲和，也决定最终视觉是否能在线上稳定呈现。",
    points: [
      {
        label: "项目背景",
        text: "毛绒形象需要让用户感受到柔软、温暖和真实触感，但传统 3D 材质容易出现塑料感、僵硬感或过度装饰感。",
      },
      {
        label: "关键难题",
        text: "毛绒不是单一材质，而是多层、随机、成簇分布的复杂结构。线上效果还要兼顾审美、性能、渲染稳定性和多场景复用。",
      },
      {
        label: "我的动作",
        text: "将真实毛发的层级、随机性、柔软结构和毛绒玩具的制作工艺转译进 3D 材质表达中，用一套可控的材质和渲染方式还原毛绒层次、反光和柔软感。",
      },
      {
        label: "结果",
        text: "最终让理想同学的帽子和身体具备更接近真实毛绒玩具的视觉质感，使实体化形象从概念探索进入可上线、可复用的产品资产阶段。",
      },
    ],
  },
  {
    eyebrow: "05 / Case 02",
    title: "理想同学中心",
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
        text: "在理想同学实体化形象阶段，持续利用 AI 进行形象方向探索，用大量过程图辅助判断什么样的形体、材质和气质更适合理想同学，再结合 3D 专业判断进行收敛。",
      },
      {
        label: "数字实践",
        text: "在理想同学中心和 4o 小同桌项目中，使用 AI 辅助编写视频压缩、裁切和批处理脚本，支撑大批量资源导出和交付。",
      },
      {
        label: "视频与素材生成",
        text: "结合 Nano-Banana、即梦、可灵、O1 等生成工具，为形象探索、交付素材和春节营销活动生成特定资源，再通过专业筛选判断哪些结果能进入项目链路。",
      },
      {
        label: "性能优化",
        text: "利用 Claude Code 等工具对视频资源进行裁剪和批量压缩，优化交付资源体积和端侧性能，使 AI 应用真正服务于上线效率。",
      },
    ],
  },
  {
    eyebrow: "09 / AI Method",
    title: "逆向生产策略",
    conclusion:
      "关键贡献不是简单生图，而是把 AI 的随机性改造成可被筛选、可被决策、可被复用的生产流程。",
    intro:
      "AI 生成本身并不复杂，真正的问题是如何让普通生图在真实项目中提高效率和命中率。我采用的核心方式，是把传统正向构思改成逆向生产和漏斗式筛选。",
    points: [
      {
        label: "两行说明",
        text: "先用 AI 扩大结果池，再用设计判断反向筛选高质量结果；把费时的构思和试错交给批量生成，把关键的审美判断、场景匹配和结果决策留给设计师。",
      },
      {
        label: "逆向生产模式",
        text: "不再从单个明确想法开始逐个生成，而是围绕项目需求提前设计生成范围，批量覆盖可能的方向，再从成功率高、完整度高的结果中反向收敛最终需求。",
      },
      {
        label: "漏斗式筛选流程",
        text: "先通过 AI 大量生图和生视频，覆盖帽子、形象、场景、动作等可能范围；再根据优质结果倒筛，像漏斗一样快速聚焦并锚定最终可用方向。",
      },
      {
        label: "核心优势",
        text: "效率和准确率更高：构思与试错环节先被 AI 快速筛一轮；同时也更容易出现意外灵感，让项目不只得到预期结果，也能发现新的设计可能。",
      },
    ],
  },
  {
    eyebrow: "10 / AI Workflow",
    title: "AI 自动化交付",
    conclusion:
      "通过自动化脚本和批量工作流，将 AI 生成能力转化为可支撑项目交付的生产方式。",
    intro:
      "自定义形象和 App 4 楼首页 24 小时动画都属于大量资源探索需求。单靠人工构思和单点生成，很难覆盖足够多的可能性，也难以满足项目节奏。",
    points: [
      {
        label: "自定义形象",
        text: "先通过 AI 大量生成不同帽子、不同气质和不同角色方向的图片，再从高质量结果中倒筛，快速判断哪些方向更符合理想同学气质和业务需求。",
      },
      {
        label: "24 小时动画",
        text: "不是逐小时先想场景再生成，而是先生成大量理想同学场景素材、视频和动画，再把质量较高、情绪合适的素材反向匹配到不同时间节点。",
      },
      {
        label: "自动化工作流",
        text: "制作批量、快速的生图和生视频流程，并在 VS Code 中编写生成工作流脚本（基于 AnyGraph），把生成、命名、筛选和复用尽量串成稳定流程。",
      },
      {
        label: "项目价值",
        text: "将 AI 现有能力和项目流程结合起来，不只是给 AI 一个需求等结果，而是系统化设计需求、生成、筛选、压缩、交付之间的路径，提高完成率和可控性。",
      },
    ],
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
        text: "从理想同学实体化形象出发，沉淀了毛绒形象、毛绒材质和相关场景视觉语言，为后续角色和多端形象提供统一基础。",
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
        text: "参与理想同学实体化形象、理想同学中心、4o 小同桌、7.4 OTA 设计交付、AI 实战工作流、Standby 放射光和 OC 眼睛等项目，覆盖形象、交互、动效、资源和未来体验探索。",
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

const activeVisualMode = {
  id: "space",
  label: "Tag 1",
  name: "银黑宇宙",
  desc: "巨型标题 / 黑白空间 / 科技卡片",
  Icon: Orbit,
};

function loadStoredNotes() {
  if (typeof window === "undefined") return {};

  try {
    const saved = window.localStorage.getItem(NOTES_STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

function formatAllNotes(notes) {
  const filledNotes = pages
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

function CoverCards({ items }) {
  return (
    <div className="cover-cards">
      {items.map((item, index) => (
        <article className="cover-card" key={item.label}>
          <span>{pad(index + 1)}</span>
          <h3>{item.label}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  );
}

function PointCard({ item, index }) {
  return (
    <article className="point-card">
      <span>{pad(index + 1)}</span>
      <h3>{item.label}</h3>
      <p>{item.text}</p>
    </article>
  );
}

const radiancePresets = {
  standby: {
    label: "Standby",
    helper: "低打扰待机",
    intensity: 1.45,
    distort: 0.55,
    rayCount: 14,
    speed: 0.46,
    base: "#d5851f",
    highlight: "#fff0c2",
  },
  listening: {
    label: "Listening",
    helper: "轻响应感知",
    intensity: 1.8,
    distort: 0.72,
    rayCount: 18,
    speed: 0.72,
    base: "#ff9b26",
    highlight: "#fff4d6",
  },
  thinking: {
    label: "Thinking",
    helper: "慢节奏波动",
    intensity: 1.55,
    distort: 1.1,
    rayCount: 24,
    speed: 0.95,
    base: "#be7b1a",
    highlight: "#fff1ba",
  },
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

function StandbyRadianceDemo() {
  const [light, setLight] = useState({
    mode: "standby",
    intensity: radiancePresets.standby.intensity,
    distort: radiancePresets.standby.distort,
    rayCount: radiancePresets.standby.rayCount,
    speed: radiancePresets.standby.speed,
    base: radiancePresets.standby.base,
    highlight: radiancePresets.standby.highlight,
  });

  const setLightValue = (key, value) => {
    setLight((current) => ({ ...current, [key]: value }));
  };

  const applyPreset = (mode) => {
    const preset = radiancePresets[mode];
    setLight({
      mode,
      intensity: preset.intensity,
      distort: preset.distort,
      rayCount: preset.rayCount,
      speed: preset.speed,
      base: preset.base,
      highlight: preset.highlight,
    });
  };

  const burstColors = useMemo(
    () => [light.highlight, light.base, light.highlight],
    [light.base, light.highlight],
  );

  return (
    <div className="radiance-demo">
      <div className="radiance-stage">
        <div className="radiance-screen-mask" aria-hidden="true">
          <div className="radiance-webgl">
            <PrismaticBurst
              intensity={light.intensity}
              distort={light.distort}
              rayCount={light.rayCount}
              speed={light.speed}
              colors={burstColors}
              animationType="rotate3d"
              mixBlendMode="screen"
              focus={{ x: 0, y: 0 }}
              pulse={{ strength: 0, x: 0, y: 0, scale: 0 }}
              shockwave={0}
              shockwaveCenter={{ x: 0.5, y: 0.5 }}
            />
          </div>
        </div>
      </div>
      <div className="radiance-panel">
        <div className="radiance-modes" aria-label="放射光状态">
          {Object.entries(radiancePresets).map(([key, preset]) => (
            <button
              className={light.mode === key ? "is-selected" : ""}
              type="button"
              onClick={() => applyPreset(key)}
              key={key}
            >
              <span>{preset.label}</span>
              <small>{preset.helper}</small>
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
      </div>
    </div>
  );
}

function HeroSection({ page, mode, note, onOpenNote }) {
  return (
    <section className="hero-section" id="page-1">
      <NoteButton index={0} hasNote={Boolean(note?.trim())} onOpen={onOpenNote} />
      <div className="hero-orbit" aria-hidden="true" />
      <div className="hero-copy">
        <p className="eyebrow">{mode.label} / {mode.name}</p>
        <h1>{page.title}</h1>
        <p className="hero-line">{page.conclusion}</p>
        <p className="hero-intro">{page.intro}</p>
      </div>
      <CoverCards items={page.coverItems || []} />
    </section>
  );
}

function CaseSection({ page, index, note, onOpenNote }) {
  const [firstColumn, secondColumn] = splitPoints(page.points);

  return (
    <section className="case-section" id={`page-${index + 1}`}>
      <NoteButton index={index} hasNote={Boolean(note?.trim())} onOpen={onOpenNote} />
      <div className="case-index" aria-hidden="true">
        {pad(index + 1)}
      </div>
      <div className="case-copy">
        <p className="eyebrow">{page.eyebrow}</p>
        <h2>{page.title}</h2>
        <p className="conclusion">{page.conclusion}</p>
        <p className="intro">{page.intro}</p>
      </div>
      {page.demo === "radiance" ? (
        <StandbyRadianceDemo />
      ) : (
        <div className="points-grid">
          <div>
            {firstColumn.map((item, pointIndex) => (
              <PointCard item={item} index={pointIndex} key={item.label} />
            ))}
          </div>
          <div>
            {secondColumn.map((item, pointIndex) => (
              <PointCard
                item={item}
                index={pointIndex + firstColumn.length}
                key={item.label}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function VisualDeck({ mode, notes, onOpenNote }) {
  return (
    <main className={`visual-deck deck-${mode.id}`}>
      <HeroSection
        page={pages[0]}
        mode={mode}
        note={notes[0] || ""}
        onOpenNote={onOpenNote}
      />
      {pages.slice(1).map((page, offset) => {
        const index = offset + 1;
        return (
          <CaseSection
            page={page}
            index={index}
            key={`${mode.id}-${page.eyebrow}`}
            note={notes[index] || ""}
            onOpenNote={onOpenNote}
          />
        );
      })}
    </main>
  );
}

function NavDrawer({ open, onClose }) {
  return (
    <aside className={`toc ${open ? "is-open" : ""}`}>
      <p className="toc-title">目录</p>
      <nav aria-label="页面目录">
        {pages.map((page, index) => (
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
  const [activeNoteIndex, setActiveNoteIndex] = useState(null);
  const [copiedTarget, setCopiedTarget] = useState("");
  const pageCount = useMemo(() => pages.length, []);
  const notesCount = useMemo(
    () => Object.values(notes).filter((value) => value?.trim()).length,
    [notes],
  );
  const activeMode = activeVisualMode;

  useEffect(() => {
    window.localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll(".hero-section, .case-section"));
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-active", entry.isIntersecting);
        });
      },
      { threshold: 0.58 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const updateNote = (index, value) => {
    setNotes((current) => ({ ...current, [index]: value }));
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
    copyText(formatAllNotes(notes), "all");
  };

  const copyPageNote = (index) => {
    copyText(formatPageNote(pages[index], index, notes[index] || ""), `page-${index}`);
  };

  const ModeIcon = activeMode.Icon;

  return (
    <div className={`app-shell theme-${activeMode.id}`}>
      <header className="site-header">
        <a className="brand" href="#page-1" onClick={() => setNavOpen(false)}>
          <span className="brand-mark" aria-hidden="true">
            <ModeIcon size={17} />
          </span>
          <span>Suhao Work</span>
        </a>
        <div className="active-tag" aria-label="当前视觉版本">
          <ModeIcon size={15} aria-hidden="true" />
          <span>{activeMode.label}</span>
          <strong>{activeMode.name}</strong>
        </div>
        <div className="header-meta">
          <span>{pageCount} pages</span>
          <span>{notesCount} notes</span>
        </div>
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
      </header>

      <NavDrawer open={navOpen} onClose={() => setNavOpen(false)} />

      <VisualDeck
        mode={activeMode}
        notes={notes}
        onOpenNote={setActiveNoteIndex}
      />

      {activeNoteIndex !== null ? (
        <NotesModal
          page={pages[activeNoteIndex]}
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
