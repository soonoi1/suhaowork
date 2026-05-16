import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  CircleDot,
  Layers3,
  Menu,
  X,
} from "lucide-react";

const pages = [
  {
    eyebrow: "01 / Intro",
    title: "宿浩｜个人项目与能力材料",
    conclusion:
      "3D 动画 / 产品动效 / 视觉交互 / AI 工作流 / 多端体验落地",
    intro:
      "本人长期负责 3D 动画、产品动效、视觉交互及相关技术落地工作。围绕理想同学相关项目，主要参与形象设计、材质研究、交互动效、多端资源交付、研发还原、AI 工作流搭建及体验原型验证等工作。",
    points: [
      {
        label: "材料定位",
        text: "以项目事实和解决问题过程为主，呈现专业能力、技术理解、资源落地和业务交付结果。",
      },
      {
        label: "内容范围",
        text: "覆盖理想同学毛绒形象、理想同学中心、4o 小同桌、AI 资源工作流、Standby 放射光和 OC 前脸眼睛等项目。",
      },
      {
        label: "阅读方式",
        text: "每页优先呈现核心结论，详细内容通过要点和展开说明承接，方便快速扫读和深入查看。",
      },
    ],
  },
  {
    eyebrow: "02 / Capability",
    title: "专业能力背景",
    conclusion:
      "能力覆盖 3D 与动画、产品动效与交互、多端资源适配、AI 工作流和从 0 到 1 的创新探索。",
    intro:
      "我的专业能力不是单一工具能力，而是围绕视觉体验从定义、制作到落地形成的一套综合能力。",
    points: [
      {
        label: "3D 与动画能力",
        text: "关注真实世界中的形体、材质、光照和运动规律如何被转译到数字环境中。核心是用结构化方式理解体积、空间、质感和动态关系，并通过动画让虚拟形象具备可信的重量、节奏、情绪和生命感。",
      },
      {
        label: "产品动效与交互能力",
        text: "产品动效不是装饰，而是交互信息的一部分。动效需要表达状态变化、引导注意力、建立层级关系、降低理解成本，并通过节奏、缓动曲线、状态切换和连续性原则服务于交互理解。",
      },
      {
        label: "多端资源适配落地能力",
        text: "多端落地的核心是理解不同端侧对格式、尺寸、编码、透明通道、性能、版本兼容和显示效果的要求。设计阶段需要提前判断资源类型、压缩方式、导入方式和异常显示风险，减少后期反复调整。",
      },
      {
        label: "AI 工作流能力",
        text: "AI 工作流的核心价值是解决效率问题。重点不在于使用某个工具，而在于识别新工具的能力边界，并将其转化为批量生成、结果筛选、脚本自动化和原型验证等可复用流程。",
      },
      {
        label: "创新探索能力",
        text: "工作中包含较多从 0 到 1 的探索任务，重点在于定义新的视觉表现和交互形式。以理想同学为例，项目早期即围绕原生形象、视觉语言和交互表达进行持续探索，并将探索结果转化为可验证、可延展的产品方案。",
      },
    ],
  },
  {
    eyebrow: "03 / Case 01",
    title: "理想同学毛绒形象的 3D 视觉实现",
    conclusion:
      "通过毛发材质研究和 3D 渲染表达，完成理想同学毛绒形象的核心视觉效果。",
    intro:
      "理想同学需要从概念形象进入更真实、更亲和、更具产品延展性的 3D 表达。项目核心难点集中在帽子和身体的毛发效果：既要接近真实物理规律，又要符合品牌气质和用户感受。",
    points: [
      {
        label: "关键难点",
        text: "传统 3D 材质容易出现塑料感、僵硬感或装饰感；毛绒不是单一材质，而是多层、随机、成簇分布的复杂结构；线上效果需要同时兼顾真实感、亲和感、审美和落地稳定性。",
      },
      {
        label: "观察物理规律",
        text: "通过观察真实世界中毛发的层级、随机性和柔软结构，研究毛绒质感如何由多种、多层、非均匀的毛发结构共同形成。",
      },
      {
        label: "模拟制作工艺",
        text: "参考毛绒玩具的制作方式，将一簇一簇的丝状分布转译到 3D 材质和渲染表达中，避免毛发表现过于均匀或僵硬。",
      },
      {
        label: "材质结构还原",
        text: "从微观材质结构出发，控制毛发层次、反光、柔软感和随机分布，将真实物理规律转译为可上线的 3D 视觉效果。",
      },
    ],
  },
  {
    eyebrow: "04 / Case 01 Extension",
    title: "理想同学毛绒视觉语言设定",
    conclusion: "围绕毛绒形象，建立统一的材质语言和场景视觉规则。",
    intro:
      "在理想同学中心及相关视觉设计中，如果只有角色本身是毛绒，而周围元素使用其他材质，会削弱整体沉浸感和形象一致性。因此需要建立完整的毛绒视觉语言。",
    points: [
      {
        label: "视觉判断",
        text: "既然理想同学本身是毛绒形象，其所在环境也应该使用同一套毛绒世界观表达，而不是让角色和场景使用割裂的材质体系。",
      },
      {
        label: "材质语言",
        text: "以毛绒、毛毡、仿毛皮、手工缝纫等材质作为核心语言，统一角色、场景、界面元素和整体视觉氛围。",
      },
      {
        label: "规则设定",
        text: "设定材质颗粒度和元素使用边界，控制毛绒世界观的构成方式，避免视觉元素只停留在装饰层面。",
      },
      {
        label: "项目价值",
        text: "理想同学不再只是单一角色，而是具备了统一、温暖、可延展的产品视觉系统，支撑 App、车机和更多场景中的形象延展。",
      },
    ],
  },
  {
    eyebrow: "05 / Case 02",
    title: "理想同学中心：多素材综合交互场景落地",
    conclusion:
      "完成理想同学中心交互模式、视觉素材和研发还原相关工作。",
    intro:
      "理想同学中心是毛绒视觉语言的重要落地场景。它不是单一页面，而是由图片、视频、透明素材、页面属性动画和多种状态共同构成的综合交互体验。",
    points: [
      {
        label: "交互复杂度",
        text: "页面同时包含图片、视频、透明素材和页面属性动画，不同资源形态需要在同一交互场景中稳定运行，对性能和还原要求较高。",
      },
      {
        label: "并行推进",
        text: "项目中需要一边进行交互设计，一边同步制作关键视觉素材，保证设计方案、素材产出和研发接入能够持续对齐。",
      },
      {
        label: "研发协同",
        text: "研发阶段深入参与 debug，通过不断调试资源、性能和显示细节，逐步磨出最终上线效果。",
      },
      {
        label: "用户感知",
        text: "复杂技术实现最终服务于页面的沉浸感和亲和感，让用户在完整的毛绒世界中理解理想同学的形象与能力。",
      },
    ],
  },
  {
    eyebrow: "06 / Case 02 Extension",
    title: "Alpha Player 透明视频边缘问题处理",
    conclusion:
      "通过资源压缩和背景虚化处理，解决特殊透明视频的显示瑕疵。",
    intro:
      "项目中使用的 Alpha Player 技术资源来自外部，中途出现透明视频边缘黑白边问题，影响最终视觉效果。该问题如果不处理，会破坏毛绒世界观的整体质感，也会影响页面精致度和沉浸感。",
    points: [
      {
        label: "问题来源",
        text: "特殊透明视频在播放和叠加过程中出现边缘黑白边，属于设计资源、播放技术和实际显示环境共同作用下的落地问题。",
      },
      {
        label: "资源处理",
        text: "通过压缩图片尺寸和控制资源大小，降低资源负担，减少显示异常概率。",
      },
      {
        label: "视觉补偿",
        text: "增加背景边缘虚化层，弱化透明视频边缘瑕疵，使问题在真实页面中不破坏整体视觉效果。",
      },
      {
        label: "项目价值",
        text: "该方案保障复杂多素材页面的上线还原效果，降低透明视频资源在特殊场景下的视觉风险。",
      },
    ],
  },
  {
    eyebrow: "07 / Case 03",
    title: "4o 小同桌：8 个角色，200 多组视频素材，多端同步交付",
    conclusion:
      "完成 4o 小同桌多角色、多状态、多端动效资源设计与交付。",
    intro:
      "4o 小同桌基于理想同学，通过不同帽子衍生出 8 个角色。作为车载长时对话形象，每个角色都需要具备完整的听、想、说状态，以及状态之间的过渡动画。",
    points: [
      {
        label: "多端协同",
        text: "手机 App 端和车机端需要同步更新能力，车机端还涉及黑白两种模式，导致整体素材量显著增加。",
      },
      {
        label: "资源规模",
        text: "最终设计制作 200 多组视频素材，每组资源都涉及渲染检查、合成、分层打包、压缩、上传和研发导入。",
      },
      {
        label: "流程要求",
        text: "为确保质量和顺利交接，项目中需要梳理详细交付文档，使资源状态、命名、导入方式和验证方式可追踪。",
      },
      {
        label: "并行压力",
        text: "该项目与理想同学中心、全新毛绒形象等项目同期推进，对时间预判、资源管理和协同效率要求较高。",
      },
    ],
  },
  {
    eyebrow: "08 / Case 03 Extension",
    title: "高压周期下的资源组织与优先级拆解",
    conclusion: "通过任务拆解、人员分工和资源复用，保障 7.4 OTA 相关资源交付。",
    intro:
      "面对极限周期和高强度任务，项目采用明确分工和资源优先级策略，在有限时间内平衡体验质量与整体制作成本。",
    points: [
      {
        label: "人员分工",
        text: "一位同事负责后期资源整理、压缩、文档上传和研发对接；一位同事负责 K 帧动画制作；本人负责资源判断、任务拆解、质量把控和跨线协调。",
      },
      {
        label: "核心资源预判",
        text: "基于 3D 项目经验，对项目所需人力和时间进行提前预判，识别资源生产、研发导入和版本节奏中可能出现的问题。",
      },
      {
        label: "优先级策略",
        text: "高频触达的切换形象出场动画重点打磨，确保用户最容易感知的部分有足够质量；低频状态采用模板化动作复用，避免资源被低频场景过度消耗。",
      },
      {
        label: "项目结果",
        text: "在有限周期内完成多端资源交付，兼顾核心体验质量、制作成本和版本节点。",
      },
    ],
  },
  {
    eyebrow: "09 / Case 04",
    title: "AI 批量生成与资源筛选流程",
    conclusion: "通过脚本、API 和批量生成流程，提升形象与动画资源探索效率。",
    intro:
      "在理想同学自定义形象和 24 小时动画资源项目中，需要探索大量角色、帽子、场景和动画方案。传统人工构思、找参考、逐个生成的方式效率较低，难以满足项目需求。",
    points: [
      {
        label: "效率问题",
        text: "高质量形象和动画方案需要大量探索。如果完全依赖人工正向构思，再逐个寻找参考、生成和筛选，时间成本过高。",
      },
      {
        label: "方法转换",
        text: "AI 生成结果具有不确定性，本质上更接近抽卡。与其按正向方式逐个推导，不如通过批量生成建立结果池，再从结果池中筛选高质量内容。",
      },
      {
        label: "工作方法",
        text: "通过脚本调用 AI API，批量生成提示词、图片和视频，再从海量结果中筛选高质量方案，并将结果反向匹配到具体业务场景。",
      },
      {
        label: "流程复用",
        text: "该流程策略同步给协作同事使用，使更多人可以沿用同一套方法解决类似资源探索需求。",
      },
    ],
  },
  {
    eyebrow: "10 / Case 04 Application",
    title: "理想同学自定义形象批量探索",
    conclusion: "通过批量生成和逆向筛选，提升不同帽子角色方案的探索效率。",
    intro:
      "自定义形象项目中，团队希望探索理想同学不同帽子和不同风格的角色形象。如果完全依赖人工构思和找参考，时间成本较高，方案覆盖面也有限。",
    points: [
      {
        label: "需求背景",
        text: "围绕理想同学是否必须佩戴牛仔帽，团队希望探索更多形象可能性，包括不同帽子、不同气质和不同角色方向。",
      },
      {
        label: "批量生成",
        text: "建立 AI 批量生成流程，大量生成不同帽子、不同风格的角色结果，扩大前期探索范围。",
      },
      {
        label: "专业筛选",
        text: "从结果池中筛选完整度高、视觉效果好、符合理想同学气质的方案，将生成结果用于后续设计判断和方案推进。",
      },
      {
        label: "项目价值",
        text: "降低前期创意探索成本，提高形象方案的数量、覆盖面和筛选效率，也让设计师把精力集中在判断和决策上。",
      },
    ],
  },
  {
    eyebrow: "11 / Case 04 Application",
    title: "理想同学 App 4 楼首页 24 小时动画资源",
    conclusion:
      "通过先生成、再筛选、后匹配的方式，完成 24 小时场景动画资源探索。",
    intro:
      "理想同学 App 4 楼首页需要表达 24 小时中的不同行为状态。若逐小时构思行为，再针对每个时间点生成图片和视频，效率较低，且容易陷入反复试错。",
    points: [
      {
        label: "传统路径问题",
        text: "如果先设想 1 点、2 点、6 点分别应该发生什么，再逐个生成素材，需要同时验证行为合理性、画面质量和场景匹配度，效率很低。",
      },
      {
        label: "逆向工作流",
        text: "先让 AI 大量生成理想同学的场景素材、视频和动画，再从生成结果中筛选质量较高、画面完整、情绪合适的素材。",
      },
      {
        label: "反向匹配",
        text: "将筛选出的高质量素材反向匹配到不同时间节点，以结果质量为基础完成 24 小时动画资源组合。",
      },
      {
        label: "项目价值",
        text: "降低逐小时构思的试错成本，提高资源完成率，也为协作同事提供可复用的流程策略。",
      },
    ],
  },
  {
    eyebrow: "12 / Case 05",
    title: "Standby 放射光：AI + 代码方式验证可交互光效原型",
    conclusion:
      "通过 AI Studio 和参数调整，完成 Standby 放空桌面放射光初版 demo。",
    intro:
      "Standby 放空桌面希望实现一种可感知、可调用、可设置参数的放射光效果。传统三维建模或呼吸灯效较难表达这种可交互、可绑定状态的光效。",
    points: [
      {
        label: "关键难点",
        text: "光效需要被感知、被调用，并支持参数设置，还需要绑定不同模态进行输出。团队当时缺少图形化代码经验，初期 demo 效果不理想。",
      },
      {
        label: "寻找参考",
        text: "先寻找外部参考和开源代码文档，确认视觉方向和技术可能性。虽然代码不容易直接理解，但可以作为 AI 辅助沟通和原型生成的输入。",
      },
      {
        label: "AI 原型",
        text: "通过 AI Studio 用自然语言描述视觉目标和交互需求，生成可交互原型，并通过调整代码参数完成初版放射光 demo。",
      },
      {
        label: "协同推进",
        text: "初版方向得到认可后，将方法分享给合作团队，后续由同事继续完善功能、提升效果并推进落地。",
      },
    ],
  },
  {
    eyebrow: "13 / Case 06",
    title: "OC 前脸眼睛：基于生物感知规律的车外交互视觉方案",
    conclusion:
      "通过人眼注意力系统研究，完成 OC 前脸眼睛的交互模态与视觉方案设计。",
    intro:
      "OC 项目中，前脸眼睛需要表达车辆的注意力、情绪和交互状态。该项目不是简单制作固定动画，而是研究人眼注意力系统如何转译到汽车风格中。",
    points: [
      {
        label: "核心灵感",
        text: "最初希望获得类似《赛车总动员》中闪电麦昆眼睛的神韵，但不能直接照搬，需要适配真实汽车场景和理想同学的形象特征。",
      },
      {
        label: "造型结合",
        text: "瞳孔部分由于是圆形，变化空间有限，因此将圆形瞳孔与理想同学椭圆 / 半椭圆眼睛特征结合，保留品牌识别。",
      },
      {
        label: "液态眼白",
        text: "眼白对应现实中的眉头、眉弓和眼皮，是传递情绪与真实感的核心。采用液体状外轮廓塑造五官，使眼睛可以柔软变形。",
      },
      {
        label: "信息承接",
        text: "液态眼睛在变小时可以自然承接文字信息。真实使用场景中，声音不一定是最佳传达手段，车外云交互中的文字表达更有效。",
      },
    ],
  },
  {
    eyebrow: "14 / Case 06 Extension",
    title: "让汽车前脸具备更自然的注意力表达",
    conclusion: "基于人眼自然运动规律，设计注意力转移和状态切换机制。",
    intro:
      "OC 前脸眼睛的底层逻辑，是将人类对生命感、注意力和情绪的感知方式转译为汽车前脸的交互表达。",
    points: [
      {
        label: "生物属性模拟",
        text: "项目不是设计一个固定状态，而是将眼睛视为可交互的生命体，通过注意力机制、状态机和生物属性动态，使其呈现更自然的状态。",
      },
      {
        label: "注意力机制",
        text: "通过绑定注意力并设计状态切换机制，使眼睛能针对不同条件和场景做出准确的情绪表达。",
      },
      {
        label: "动态曲线",
        text: "人眼在注意力转移时通常不是匀速移动，而是快速跳转到目标位置。动效曲线采用加速度非常快的缓出方式，使运动符合人类认知直觉。",
      },
      {
        label: "项目价值",
        text: "该方案从用户对生命感、注意力和情绪的感知方式出发，探索汽车前脸在车外交互中的视觉表达方式。",
      },
    ],
  },
  {
    eyebrow: "15 / Summary",
    title: "能力与项目结果总结",
    conclusion:
      "相关项目体现了专业深度、复杂落地、项目协同、AI 实战和交互方法沉淀等能力。",
    intro:
      "上述项目围绕产品体验、技术实现和业务交付展开，重点体现稳定、可复用的设计结果与流程方法。",
    points: [
      {
        label: "专业深度",
        text: "完成高难度 3D 材质、毛绒形象和动效表达设计，能够从真实物理规律、材质结构和动画规律出发定义视觉效果。",
      },
      {
        label: "复杂落地",
        text: "参与多素材、多端、多技术约束下的体验上线，能够在设计、资源、研发还原和显示问题之间持续校准结果。",
      },
      {
        label: "项目协同",
        text: "在高压周期中进行任务拆解、资源分配和研发对接，通过优先级判断和资源复用保障关键体验与版本交付。",
      },
      {
        label: "AI 实战",
        text: "将 AI 生成、脚本、API 和代码原型应用到真实业务项目，把新工具转化为批量生成、筛选决策和原型验证流程。",
      },
      {
        label: "方法沉淀",
        text: "形成毛绒视觉体系、资源交付方法、AI 批量生成流程和交互原型验证方式，支持后续项目继续复用。",
      },
    ],
  },
];

function pad(value) {
  return String(value).padStart(2, "0");
}

function DetailCard({ item, index }) {
  const [open, setOpen] = useState(index < 2);

  return (
    <article className={`detail-card ${open ? "is-open" : ""}`}>
      <button className="detail-trigger" type="button" onClick={() => setOpen((value) => !value)}>
        <span>
          <strong>{pad(index + 1)}</strong>
          {item.label}
        </span>
        <ChevronDown size={18} aria-hidden="true" />
      </button>
      <div className="detail-body">
        <p>{item.text}</p>
      </div>
    </article>
  );
}

function PageSection({ page, index }) {
  const firstColumn = page.points.slice(0, Math.ceil(page.points.length / 2));
  const secondColumn = page.points.slice(Math.ceil(page.points.length / 2));

  return (
    <section className="page-section" id={`page-${index + 1}`}>
      <div className="section-number" aria-hidden="true">
        {pad(index + 1)}
      </div>
      <div className="page-shell">
        <div className="page-header">
          <p className="eyebrow">{page.eyebrow}</p>
          <h2>{page.title}</h2>
          <p className="conclusion">{page.conclusion}</p>
          <p className="intro">{page.intro}</p>
        </div>
        <div className="details-grid">
          <div>
            {firstColumn.map((item, pointIndex) => (
              <DetailCard item={item} index={pointIndex} key={item.label} />
            ))}
          </div>
          <div>
            {secondColumn.map((item, pointIndex) => (
              <DetailCard
                item={item}
                index={pointIndex + firstColumn.length}
                key={item.label}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function App() {
  const [navOpen, setNavOpen] = useState(false);
  const pageCount = useMemo(() => pages.length, []);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#page-1" onClick={() => setNavOpen(false)}>
          <span className="brand-mark" aria-hidden="true">
            <Layers3 size={16} />
          </span>
          <span>Suhao Work</span>
        </a>
        <div className="header-meta">
          <span>Text Deck</span>
          <span>{pageCount} pages</span>
        </div>
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

      <aside className={`toc ${navOpen ? "is-open" : ""}`}>
        <p className="toc-title">目录</p>
        <nav aria-label="页面目录">
          {pages.map((page, index) => (
            <a href={`#page-${index + 1}`} key={page.eyebrow} onClick={() => setNavOpen(false)}>
              <span>{pad(index + 1)}</span>
              {page.title}
            </a>
          ))}
        </nav>
      </aside>

      <main>
        <section className="hero" id="top">
          <div className="hero-content">
            <p className="eyebrow">Portfolio Text Draft</p>
            <h1>个人项目与能力材料</h1>
            <p>
              纯文字版先聚焦信息结构、核心结论和案例证据。图片与视频暂不加入，后续可按每页内容逐步补充视觉素材。
            </p>
            <a className="hero-link" href="#page-1">
              开始阅读
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-index" aria-label="材料摘要">
            {["专业能力", "毛绒形象", "复杂落地", "AI 工作流", "交互探索"].map((item) => (
              <span key={item}>
                <CircleDot size={14} aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </section>

        {pages.map((page, index) => (
          <PageSection page={page} index={index} key={page.eyebrow} />
        ))}
      </main>
    </>
  );
}
