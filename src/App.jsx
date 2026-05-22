import { Component, Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import {
  ClipboardCheck,
  ClipboardList,
  Eye,
  EyeOff,
  Film,
  Hand,
  Images,
  PencilLine,
  Sparkles,
  Menu,
  MessageSquareText,
  Orbit,
  Save,
  X,
} from "lucide-react";
import GradualBlur from "./components/GradualBlur";
import PillNav from "./components/PillNav";
import { PrismaticBurst } from "./components/PrismaticBurst";
import BorderGlow from "./components/BorderGlow";
import savedContent from "./content.saved.json";

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
    "eyebrow": "01 / Intro",
    "layout": "cover",
    "title": "宿浩（Suhao Work）",
    "conclusion": "司龄：2年｜职级：17级｜3D 动效 / AI / 创新探索 / 交互体验设计",
    "intro": "将综合技术能力与产品体验结合进业务的设计师",
    "coverItems": [
      {
        "label": "个人定位",
        "text": "技术体验型设计师：既能判断 3D、动效和视觉质量，也能把方案拆成研发可接入、业务可上线的资源和流程。"
      },
      {
        "label": "核心能力",
        "text": "3D技术、产品动效、角色设计、视觉品质把控、交互体验设计、资源整合、AI工作模式、交互原型设计。"
      },
      {
        "label": "代表项目",
        "text": "理想同学实体化、理想同学中心、 4o 小同桌、OTA 7.4 多端交付、AI 实战工作流、Standby 放射光、OC 眼睛。"
      }
    ],
    "points": []
  },
  {
    "eyebrow": "02 / Character Process",
    "title": "怎么升级",
    "demo": "keynoteSlide",
    "slide": "02",
    "conclusion": "",
    "intro": "",
    "points": []
  },
  {
    "eyebrow": "03 / Shape",
    "title": "形态探索",
    "demo": "keynoteSlide",
    "slide": "03",
    "conclusion": "",
    "intro": "",
    "points": []
  },
  {
    "eyebrow": "04 / Fur",
    "title": "毛绒化",
    "demo": "keynoteSlide",
    "slide": "04",
    "conclusion": "",
    "intro": "",
    "points": []
  },
  {
    "eyebrow": "05 / Styling",
    "title": "造型优化",
    "demo": "keynoteSlide",
    "slide": "05",
    "conclusion": "",
    "intro": "",
    "points": []
  },
  {
    "eyebrow": "06 / Model",
    "title": "要动起来 必须得建模",
    "demo": "keynoteSlide",
    "slide": "06",
    "conclusion": "",
    "intro": "",
    "points": []
  },
  {
    "eyebrow": "07 / Fur Detail",
    "title": "攻克毛绒细节渲染效果",
    "demo": "keynoteSlide",
    "slide": "07",
    "conclusion": "",
    "intro": "",
    "points": []
  },
  {
    "eyebrow": "08 / Birth",
    "title": "理想同学形象诞生",
    "demo": "keynoteSlide",
    "slide": "08",
    "conclusion": "",
    "intro": "",
    "points": []
  },
  {
    "eyebrow": "09 / Technical Route",
    "title": "技术路径盘点",
    "demo": "keynoteSlide",
    "slide": "09",
    "conclusion": "",
    "intro": "",
    "points": []
  },
  {
    "eyebrow": "10 / Delivery",
    "title": "理想同学形象从设计到交付",
    "demo": "keynoteSlide",
    "slide": "10",
    "conclusion": "",
    "intro": "",
    "points": []
  },
  {
    "eyebrow": "05 / Character",
    "title": "理想同学实体化",
    "demo": "gaussianSplat",
    "conclusion": "从0到1开始建设理想同学实体化3D形象。从平面符号进化成为可被记住的3D毛绒形象。",
    "intro": "这是理想同学这个符号的第一次实体化探索。在明确这是长期陪伴用户的数字人IP之后，我们开始探索它在车端的视觉存在感。",
    "points": [
      {
        "label": "问题",
        "text": "如何将二维平面符号转化为 3D 实体？如何平衡毛绒材质的真实感与线上性能？如何构建有温度的陪伴感，同时满足跨端一致性、车机性能与品牌调性？"
      },
      {
        "label": "动作",
        "text": "解决3D毛绒质感视觉问题，构建毛绒形象基础形态，多种技术路线并行探索,能够基于最终体验效果、业务风险与交付节奏进行综合判断,最终选择以Spine方案保障稳定交付,同时保留Gauss方案的后续探索空间,为后续体验升级蓄力。"
      },
      {
        "label": "结果",
        "text": "实现理想汽车车机端理想同学形象的全面迭代换新，为理想同学中心、4o 小同桌、多端形象和后续角色体系提供基础资产。"
      }
    ]
  },
  {
    "eyebrow": "06 / Delivery",
    "title": "理想同学中心与 4o 小同桌交付",
    "conclusion": "强化了从用户理解出发的设计决策，以及应对小同桌9个形象黑白两套复杂资源的交付执行力",
    "intro": "不止是完成了在版本周期内完成了 OTA 7.4 理想同学换新所配套的所有相关应用服务。",
    "points": [
      {
        "label": "首页设计决策",
        "text": "跳出单纯视觉表达，从“用户是否真正理解并持续使用”出发组织信息结构与交互节奏。主动调整动效露出频率解决疲劳问题，兼顾当前体验与长期演进。"
      },
      {
        "label": "设计价值主张",
        "text": "视觉减负：减少交互行为带来的审美疲劳；长期主义：坚持使用透明素材作为基础框架，减少了后续不同版本适配成本"
      },
      {
        "label": "交付执行力",
        "text": "在 OTA 7.4 中面对手机/车机双端、9个形象、黑白两套资源的并行交付挑战，快速完成任务拆解、资源协调与优先级管理，有效控制风险。"
      },
      {
        "label": "结果",
        "text": "保障关键节点顺利上线，有效控制多板块并行交付的制作成本与风险。数字时钟效果如同预期被高频使用和曝光。"
      }
    ],
    "demo": "deliveryPopups"
  },
  {
    "eyebrow": "07 / AI Workflow",
    "title": "AI 实战工作流",
    "demo": "aiGallery",
    "conclusion": "把 AI 从单点出图工具变成项目生产流程，用批量生成、反向筛选和脚本处理提高命中率与交付效率。",
    "intro": "发现AI的边界，提出解决问题的思路，并利用AI将其解决。人的瓶颈在于思考的速度，AI的瓶颈在于成功率。我只要解决这两点就行了，构建AI特定workflow批量生图人工筛选解决成功率问题，AI泛化思考批量生图解决人工思考瓶颈。",
    "points": [
      {
        "label": "流程与效率",
        "text": "在理想同学APP首页动画素材规模快速增长的时候，主动推动 AI 化生产。allin Ai ，搭建批量生图、生视频工作流，提升出图效率，保障项目推进节奏。"
      },
      {
        "label": "探索与验证",
        "text": "在行业未形成成熟 AI 设计流程阶段，主动探索 open claw、VibeCoding 等AI的能力边界，提前积累 AI 在业务场景中的使用可能性。"
      },
      {
        "label": "沉淀与应用",
        "text": "结合团队在批量调色与流程衔接中的真实痛点，主动开发适配流程的辅助工具与插件，降低重复性操作成本，并在团队内部共享提升整体效率。"
      }
    ]
  },
  {
    "eyebrow": "08 / Prototype",
    "title": "Standby 放射光",
    "demo": "radiance",
    "conclusion": "用 AI Studio、代码工具和视觉判断，把抽象光效需求搭建成可调参数、可讨论、可继续交付的交互原型。",
    "intro": "基于 Aistudio 尝试设计交互效果并结合 React 源码验证；在团队缺少相关经验的情况下，率先完成技术方向验证与方案沉淀，并将经验共享给团队成员，建立推进基础。",
    "points": [
      {
        "label": "问题",
        "text": "光效需要同时满足视觉氛围、状态绑定、参数可调和后续研发迭代空间，而在设计初期团队缺少相关图形化代码经验。"
      },
      {
        "label": "动作",
        "text": "因为前期的探索和验证，有用AI做过绑定的经验，基于此使用 Aistudio 结合 React 动效源码，将其与设计想法结合，形成了该效果的可交互的初版视觉方案。"
      },
      {
        "label": "结果",
        "text": "率先完成方向验证与方案沉淀，并将经验共享给团队成员，帮助团队建立后续协同推进的基础。"
      }
    ]
  },
  {
    "eyebrow": "09 / Material Study",
    "title": "SS4 质感探索",
    "demo": "fluidGlass",
    "conclusion": "先行做技术路径的示效探索，通过流体玻璃的折射、透光和动态形变，验证 SS4 界面质感中透明层次与动态材质的表达方式。",
    "intro": "通过 3D 动效先去验证目前技术路径所有可实现的效果，然后再逐渐收敛成 SS4 系统的 UI 材质参数效果。提供视效玻璃质感技术实现的思路给到技术。",
    "points": []
  },
  {
    "eyebrow": "10 / OC Eyes",
    "title": "OC 眼睛",
    "demo": "ocVideos",
    "conclusion": "面向未来无人驾驶舱外交互，把眼睛设计成能表达注意力、状态和生命感的车辆外部视觉语言。",
    "intro": "结合真实用户场景判断“角色生命感”问题，通过引入仿真人眼微动作与非规律变化逻辑，增强角色灵动感与情绪反馈。",
    "points": [
      {
        "label": "问题和难点",
        "text": "如何塑造“角色生命感”问题，目标不是夸张拟人，而是让车辆像一个有注意力、情绪反馈的智能体。在特定的尺寸边界下如何做好情绪表达，如何延续理想同学的特征。"
      },
      {
        "label": "表达方式",
        "text": "在OC眼睛动效方案中,能够结合真实用户场景判断\"角色生命感\"问题,通过引入仿真人眼微动作与\n非规律变化逻辑,增强角色灵动感与情绪反馈,使角色状态更加自然生动。"
      },
      {
        "label": "动效策略",
        "text": "通过引入仿真人眼微动作与非规律变化逻辑，参考眼动跳转规律，增强角色灵动感，使状态更自然生动。"
      }
    ]
  },
  {
    "eyebrow": "11 / Summary",
    "title": "结果与方法沉淀",
    "conclusion": "我能把复杂视觉体验从探索推进到上线，并把过程沉淀成下一次可以复用的能力。",
    "intro": "我的核心价值不是单点产出视觉资产，而是围绕理想同学和未来交互体验，持续完成从方向判断、技术验证、资源交付到方法沉淀的闭环：既保障 OTA 版本和关键项目上线，也为后续 AI 化生产、角色体系升级和舱外交互探索积累可复用能力。",
    "points": [
      {
        "label": "主要业务产出",
        "text": "完成理想同学实体化、理想同学中心、4o 小同桌、7.4 多端交付、App 首页动画、Standby放射光、具身迎宾、SS4质感探索和 OC眼睛等关键项目。"
      },
      {
        "label": "业务价值沉淀",
        "text": "让理想同学更容易被用户理解、持续使用和高频感知，同时通过资源复用、透明素材框架和交付优先级管理，降低后续版本适配成本与上线风险。"
      },
      {
        "label": "方法与工具沉淀",
        "text": "沉淀 AI 逆向生产、批量生成、资源处理脚本、辅助插件和代码原型方法，提升探索效率、资源产出效率和团队协作效率。"
      },
      {
        "label": "跨界价值与未来延展",
        "text": "在 Spine、Gauss、React 动效、SS4 质感和 OC 眼睛等方向中连接设计与技术，把不确定探索转化为可验证、可复用、可继续推进的体验方案。"
      }
    ]
  }
];

function pad(value) {
  return String(value).padStart(2, "0");
}

const NOTES_STORAGE_KEY = "suhaowork-review-notes-v2";
const CONTENT_STORAGE_KEY = "suhaowork-page-content-v2-8page-draft";
const CONTENT_STORAGE_VERSION = "2026-05-22-keynote-character-process-v1";

const activeVisualMode = {
  id: "space",
  label: "Tag 1",
  name: "home",
  desc: "巨型标题 / 黑白空间 / 科技卡片",
  Icon: Orbit,
};

const pillNavItems = [
  { label: "Intro", href: "#page-1" },
  { label: "Process", href: "#page-2" },
  { label: "Route", href: "#page-9" },
  { label: "Character", href: "#page-11" },
  { label: "Delivery", href: "#page-12" },
  { label: "AI", href: "#page-13" },
  { label: "Light", href: "#page-14" },
  { label: "Glass", href: "#page-15" },
  { label: "OC", href: "#page-16" },
  { label: "Sum", href: "#page-17" },
];

function getActivePillHref(activePageIndex) {
  const pageNumber = activePageIndex + 1;

  if (pageNumber === 1) return "#page-1";
  if (pageNumber <= 8) return "#page-2";
  if (pageNumber <= 10) return "#page-9";
  if (pageNumber === 11) return "#page-11";
  if (pageNumber === 12) return "#page-12";
  if (pageNumber === 13) return "#page-13";
  if (pageNumber === 14) return "#page-14";
  if (pageNumber === 15) return "#page-15";
  if (pageNumber === 16) return "#page-16";
  return "#page-17";
}

function emphasizeText(value = "") {
  const highlightMap = {
    "具象化": "key",
    "形态": "key",
    "3D化": "key",
    "有手了": "key",
    "毛发": "key",
    "簇状": "key",
    "头顶光秃秃": "key",
    "改改形态": "key",
    "戴帽子": "key",
    "牛仔帽": "key",
    "建模": "key",
    "手动梳理": "key",
    "细节质感": "key",
    "怎么上车": "key",
    "<10%": "key",
    "分阶段": "key",
    "强推高斯": "key",
    "两套方案": "key",
    "100%": "key",
    "一年": "key",
  };
  const tokens = Object.keys(highlightMap).sort((first, second) => second.length - first.length);
  if (!tokens.length) return value;

  const pattern = new RegExp(`(${tokens.map((token) => token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return value.split(pattern).map((part, index) => {
    if (!highlightMap[part]) return part;
    return <strong key={`${part}-${index}`}>{part}</strong>;
  });
}

function getPageBackdrop(page) {
  if (page.demo === "gaussianSplat") {
    return {
    type: "image",
    src: "/assets/fur-material-close-bg.webp",
    className: "backdrop-fur-close",
    };
  }

  if (page.demo === "deliveryPopups") {
    return {
    type: "video",
    src: "/assets/li-center/cua-black-bg.mp4",
    className: "backdrop-li-center",
    };
  }

  return null;
}

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
    label: "人物反推",
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
    count: 24,
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

const liCenterAnimationItems = liCenterStackVideos.map((item) => ({
  ...item,
  label: item.title,
}));

const fourOCarAnimationItems = [
  {
    src: "/assets/four-o-car/li-table-dark-w.mp4",
    label: "小同桌 dark",
    meta: "4o car animation",
  },
  {
    src: "/assets/four-o-car/li-student-update-v3.mp4",
    label: "理想同学更新 v3",
    meta: "4o car animation",
  },
  {
    src: "/assets/four-o-car/voice-search-card.mp4",
    label: "语搜卡",
    meta: "4o car animation",
  },
  {
    src: "/assets/four-o-car/beijing-uncle-entrance.mp4",
    label: "北京大爷入场",
    meta: "4o entrance animation",
  },
  {
    src: "/assets/four-o-car/dongbei-auntie-entrance.mp4",
    label: "东北大姨入场",
    meta: "4o entrance animation",
  },
  {
    src: "/assets/four-o-car/light-warrior-entrance.mp4",
    label: "光之勇士入场",
    meta: "4o entrance animation",
  },
  {
    src: "/assets/four-o-car/haagen-dazs-entrance.mp4",
    label: "哈根达斯入场",
    meta: "4o entrance animation",
  },
  {
    src: "/assets/four-o-car/roaring-dragon-entrance.mp4",
    label: "吼吼龙入场",
    meta: "4o entrance animation",
  },
  {
    src: "/assets/four-o-car/li-bai-entrance.mp4",
    label: "李白入场",
    meta: "4o entrance animation",
  },
  {
    src: "/assets/four-o-car/riddle-man-entrance.mp4",
    label: "谜语人入场",
    meta: "4o entrance animation",
  },
  {
    src: "/assets/four-o-car/cowboy-entrance.mp4",
    label: "牛仔入场",
    meta: "4o entrance animation",
  },
  {
    src: "/assets/four-o-car/snow-princess-entrance.mp4",
    label: "雪国公主入场",
    meta: "4o entrance animation",
  },
];

const fourOPhoneAnimationItems = [
  {
    src: "/assets/four-o-phone/app-4o.mp4",
    label: "APP 4o",
    meta: "4o mobile video",
    type: "video",
  },
  {
    src: "/assets/four-o-phone/li-student.mp4",
    label: "理想同学",
    meta: "4o mobile video",
    type: "video",
  },
  {
    src: "/assets/four-o-phone/sweet-li-student.mp4",
    label: "甜美理同",
    meta: "4o mobile video",
    type: "video",
  },
  {
    src: "/assets/four-o-phone/light-warrior.mp4",
    label: "光之勇士",
    meta: "4o mobile video",
    type: "video",
  },
  {
    src: "/assets/four-o-phone/beijing-auntie.mp4",
    label: "北京大姨",
    meta: "4o mobile video",
    type: "video",
  },
  {
    src: "/assets/four-o-phone/beijing-uncle.mp4",
    label: "北京大爷",
    meta: "4o mobile video",
    type: "video",
  },
  {
    src: "/assets/four-o-phone/roaring-dragon.mp4",
    label: "吼吼龙",
    meta: "4o mobile video",
    type: "video",
  },
  {
    src: "/assets/four-o-phone/li-bai.mp4",
    label: "李白",
    meta: "4o mobile video",
    type: "video",
  },
  {
    src: "/assets/four-o-phone/riddle-king.mp4",
    label: "谜语大王",
    meta: "4o mobile video",
    type: "video",
  },
  {
    src: "/assets/four-o-phone/snow-princess.mp4",
    label: "雪国公主",
    meta: "4o mobile video",
    type: "video",
  },
];

const characterMaterialImages = [
  "dark2.webp",
  "dark3.webp",
  "dark4.webp",
  "dark5.webp",
  "dark6.webp",
  "dark7.webp",
  "dark8.webp",
  "dark9.webp",
  "dark10.webp",
].map((name, index) => ({
  src: `/assets/character-upgrade/${name}`,
  label: `Material ${pad(index + 1)}`,
}));

const characterEntityVideos = [
  {
    title: "理想同学 OTA 更新",
    src: "/assets/character-upgrade/li-ota74-update.mp4",
  },
  {
    title: "理想同学听想说（视频）",
    src: "/assets/character-upgrade/li-listen-think-speak.mp4",
  },
];

const characterShapeHeroMedia = [
  {
    src: "/assets/character-process/shape-final-confidence.webp",
    label: "目标形象",
    meta: "从模糊概念收束出的毛绒理想同学",
    type: "image",
  },
  {
    src: "/assets/character-process/shape-old.mp4",
    label: "旧版符号",
    meta: "从原始理想同学的识别资产出发",
    type: "video",
    tone: "light-evidence",
  },
];

const characterShapeStageMedia = [
  {
    src: "/assets/character-process/shape-old.mp4",
    label: "01 / 原始识别",
    meta: "保留旧形象的亲和、陪伴和轻量感",
    type: "video",
    tone: "light-evidence",
  },
  {
    src: "/assets/character-process/shape-hand-draft.mp4",
    label: "02 / 手的接口",
    meta: "让角色可以趴着、探出、回应用户",
    type: "video",
    tone: "light-evidence",
  },
  {
    src: "/assets/character-process/shape-eye-highlight.webp",
    label: "03 / 眼神高光",
    meta: "用视线方向和生命感稳定情绪表达",
    type: "image",
    tone: "light-evidence",
  },
  {
    src: "/assets/character-process/shape-hat-feeling.webp",
    label: "04 / 帽子记忆点",
    meta: "找到更强的轮廓和品牌识别锚点",
    type: "image",
    tone: "light-evidence",
  },
];

const characterShapeCollageMedia = [
  {
    src: "/assets/character-process/shape-eye-ratio.webp",
    label: "眼睛比例",
    meta: "不断校准可爱感与识别度",
    type: "image",
    tone: "light-evidence",
  },
  {
    src: "/assets/character-process/shape-ai-hat.webp",
    label: "AI 发散",
    meta: "用 AI 扩展帽子和体块的可能性",
    type: "image",
    tone: "light-evidence",
  },
  {
    src: "/assets/character-process/fur-handmade-study.mp4",
    label: "手搓毛发",
    meta: "研究毛绒应有的蓬松、厚度和边缘",
    type: "video",
  },
  {
    src: "/assets/character-process/fur-render-tune.mp4",
    label: "材质调节",
    meta: "把“很多毛”转成可判断的渲染质感",
    type: "video",
  },
  {
    src: "/assets/character-process/shape-3d-render.mp4",
    label: "纯手搓 3D",
    meta: "验证体块和基础毛绒渲染是否成立",
    type: "video",
  },
  {
    src: "/assets/character-process/shape-cua-hand.mp4",
    label: "动作入口",
    meta: "手、眼睛和姿态共同形成陪伴感",
    type: "video",
  },
];

const characterLandingStageMedia = [
  {
    src: "/assets/character-process/landing-spine-principle.mp4",
    label: "Spine 状态验证",
    meta: "先用稳定路径跑通状态表达",
    type: "video",
  },
  {
    src: "/assets/character-process/landing-multipass-bad.mp4",
    label: "3D 多通道试错",
    meta: "结构成立，但毛绒真实感不达预期",
    type: "video",
  },
  {
    src: "/assets/character-process/landing-gauss-process.mp4",
    label: "Gaussian 继续推进",
    meta: "借助真实采集和新技术保留毛绒体积",
    type: "video",
  },
  {
    src: "/assets/character-process/landing-gauss-dark.mp4",
    label: "车机暗色效果",
    meta: "验证暗色界面里的识别和氛围",
    type: "video",
  },
];

const characterSpineStateVideos = [
  { src: "/assets/character-process/spine-listen.mp4", label: "听", tone: "light-evidence" },
  { src: "/assets/character-process/spine-think.mp4", label: "想", tone: "light-evidence" },
  { src: "/assets/character-process/spine-happy.mp4", label: "开心", tone: "light-evidence" },
  { src: "/assets/character-process/spine-confused.mp4", label: "困惑", tone: "light-evidence" },
];

const characterLandingResultMedia = [
  {
    src: "/assets/character-process/landing-multipass-effect.mp4",
    label: "多通道效果",
    meta: "用于判断路线边界，而不是盲目投入",
    type: "video",
  },
  {
    src: "/assets/character-process/landing-gauss-light.mp4",
    label: "高斯实车亮色",
    meta: "保留毛绒柔软边界和真实光照",
    type: "video",
  },
];

const keynoteProcessSlides = {
  "02": {
    variant: "question",
    background: true,
    title: "怎么升级",
    subtitle: "作为理想同学新形象设计负责人，聚焦从零开始，将一个模糊的形象具象化。创造一个全新的形态。",
    center: "faces",
    callouts: [
      { text: "要做实体化？", x: 24, y: 18 },
      { text: "全新理想同学长啥样？", x: 77, y: 12 },
      { text: "要升级？", x: 70, y: 35 },
      { text: "加手？", x: 31, y: 43 },
      { text: "手跟身体怎么结合？", x: 17, y: 56 },
      { text: "毛绒形态？", x: 34, y: 66 },
      { text: "特征继承吗？", x: 81, y: 56 },
      { text: "毛绒能上车吗？", x: 70, y: 64 },
    ],
  },
  "03": {
    variant: "shape",
    background: true,
    title: "形态探索",
    subtitle: "我：先建模吧 3D化 再加上一个手",
    kicker: "有手了，能点了！",
    media: [
      { type: "video", src: "/assets/character-process/shape-old.mp4", className: "shape-old", label: "早期 3D 化" },
      { type: "video", src: "/assets/character-keynote/hand-draft.mp4", className: "shape-hand", label: "加上手的模型" },
    ],
  },
  "04": {
    variant: "fur",
    background: true,
    title: "毛绒化",
    subtitle: "先要去尝试、探索毛发的渲染效果。然后需要疏毛了，选择将毛发梳成簇状，更接近毛绒玩具质感",
    media: [
      { type: "image", src: "/assets/character-keynote/fur-disc.webp", className: "fur-disc", label: "毛绒材质" },
      { type: "video", src: "/assets/character-process/shape-cua-hand.mp4", className: "fur-final", label: "毛绒形态" },
    ],
  },
  "05": {
    variant: "styling",
    background: true,
    title: "造型优化",
    subtitle: "理想同学长出毛以后，显得头顶光秃秃的，不太好看，得找个法子改改形态。",
    note: "使用 AI 先玩一玩。效果还不错，要不试试戴帽子？",
    media: [
      { type: "image", src: "/assets/character-process/shape-ai-hat.webp", className: "styling-grid", label: "帽子方向探索" },
      { type: "video", src: "/assets/character-keynote/hat-animation.mp4", className: "styling-final", label: "帽子造型动画" },
    ],
  },
  "06": {
    variant: "model",
    background: true,
    title: "要动起来\n必须得建模",
    subtitle: "我在形态上用 AI 做了个不错的牛仔帽，接下来压力给到建模。",
    note: "好吧！建模也是我。",
    media: [
      { type: "video", src: "/assets/character-keynote/memory-animation.mp4", className: "model-memory", label: "车机界面记忆点" },
      { type: "video", src: "/assets/character-keynote/hat-animation.mp4", className: "model-reference", label: "牛仔帽动画参考" },
      { type: "image", src: "/assets/character-keynote/hand-model.webp", className: "model-character", label: "牛仔帽形象" },
    ],
  },
  "07": {
    variant: "fur-detail",
    background: true,
    title: "攻克毛绒细节渲染效果",
    subtitle: "真实感需要用多层随机毛发混合，我用了最不取巧却实用的方式一根根手动梳理。在3D中构建真实毛发结构，增强细节质感。",
    media: [
      { type: "video", src: "/assets/character-keynote/fur-grooming.mp4", className: "detail-video", label: "毛发细节渲染" },
      { type: "image", src: "/assets/character-keynote/dark-model.webp", className: "detail-character", label: "暗光细节效果" },
    ],
  },
  "08": {
    variant: "birth",
    background: true,
    title: "理想同学形象诞生",
    subtitle: "卖家秀有了，买家秀怎么办！光这300万根毛发，4090都卡，怎么上车！",
    problem: "毛绒形象落地困难！",
    text: "没有任何同类产品出现过，更何况车机上有限的算力空间 <10%。需要分阶段优化解决渲染品质。",
    media: [
      { type: "image", src: "/assets/character-keynote/hand-model.webp", className: "birth-character", label: "理想同学形象" },
    ],
  },
  "09": {
    variant: "route",
    background: true,
    title: "技术路径盘点",
    items: [
      "1、Spine自研引擎，用2D绑定做；（有相应技能能力，效果一般）",
      "2、3D引擎：真实毛发，多通道渲染（shell fur、multipass）；（我们没有技术储备，且效果较差）",
      "3、高斯泼溅（3D Gaussian Splatting）全新技术，在年底才出现。发现新的可能性。",
    ],
    captions: ["Spine效果（目前线上方案）", "3D multipass 效果（弃用）", "高斯方案（SS4 OTA9.1上线，目前线上效果）"],
    bottom: "我的工作：三条技术路线同步推进，我负责提供所有的子弹，spine特殊处理的切图、3D multipass中的定制模型、高斯方案中的高斯模型，以及所有模型的骨骼动画。我的决策：主张强推高斯方案，为了能保交付，我可以同期对spine和高斯维护两套方案的设计交付。",
    media: [
      { type: "video", src: "/assets/character-keynote/spine.mp4", className: "route-media route-spine", label: "Spine效果" },
      { type: "video", src: "/assets/character-keynote/multipass.mp4", className: "route-media route-multipass", label: "3D multipass 效果" },
      { type: "video", src: "/assets/character-keynote/car-dark.mp4", className: "route-media route-gauss", label: "高斯方案" },
    ],
  },
  "10": {
    variant: "delivery",
    background: true,
    title: "理想同学形象从设计到交付",
    subtitle: "高斯效果的落地基本上 100% 还原了离线渲染的设计效果，尤其高斯点云对毛发质感的效果表现尤为突出。",
    note: "从一个面片到高斯理同，花了整整一年",
    media: [
      { type: "video", src: "/assets/character-keynote/car-light.mp4", className: "delivery-side delivery-light", label: "浅色模式实车效果" },
      { type: "video", src: "/assets/character-keynote/gauss-result.mp4", className: "delivery-main", label: "高斯落地效果" },
    ],
  },
};

const ss4MaterialItems = [
  {
    src: "/assets/ss4-material/ui-material-backplate.mp4",
    label: "UI 材质背板测试",
    meta: "SS4 material video",
  },
  {
    src: "/assets/ss4-material/ss4-ui.mp4",
    label: "SS4 UI 动效",
    meta: "SS4 UI video",
  },
  {
    src: "/assets/ss4-material/ui2.webp",
    label: "UI 材质方案图",
    meta: "SS4 UI image",
    type: "image",
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

function isCurrentPageSet(value) {
  return Array.isArray(value) && value.length === pages.length;
}

function getDefaultPages() {
  return isCurrentPageSet(savedContent.pages) ? savedContent.pages : pages;
}

function clonePages(pagesToClone = getDefaultPages()) {
  return JSON.parse(JSON.stringify(pagesToClone));
}

function loadStoredPages() {
  if (typeof window === "undefined") return clonePages();

  try {
    const saved = window.localStorage.getItem(CONTENT_STORAGE_KEY);
    if (!saved) return clonePages();

    const parsed = JSON.parse(saved);
    const parsedPages = Array.isArray(parsed) ? null : parsed?.pages;
    if (parsed?.version === CONTENT_STORAGE_VERSION && isCurrentPageSet(parsedPages)) {
      return parsedPages;
    }

    window.localStorage.removeItem(CONTENT_STORAGE_KEY);
    return clonePages();
  } catch {
    return clonePages();
  }
}

async function syncContentToSource(contentPages) {
  if (!import.meta.env.DEV || typeof fetch !== "function") return false;

  const response = await fetch("/__suhaowork/save-content-source", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ pages: contentPages }),
  });

  if (!response.ok) {
    throw new Error("Failed to sync content to source.");
  }

  return true;
}

function formatAllNotes(notes, pagesSource = getDefaultPages()) {
  const filledNotes = pagesSource
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

function updateContentValue(currentPages, pageIndex, path, value) {
  const nextPages = clonePages(currentPages);
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

function StoryMedia({ item, className = "", loading = "lazy" }) {
  const mediaClassName = `character-story-media ${item.tone ? `is-${item.tone}` : ""} ${className}`.trim();

  if (item.type === "video" || item.src.endsWith(".mp4")) {
    const poster = item.poster || item.src.replace("/assets/character-process/", "/assets/character-process/posters/").replace(".mp4", ".webp");

    return (
      <video
        className={mediaClassName}
        src={item.src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={item.label}
      />
    );
  }

  return <img className={mediaClassName} src={item.src} alt={item.label || ""} loading={loading} />;
}

function KeynoteMedia({ item }) {
  const mediaRole = item.type === "video" ? "is-video" : "is-image";
  const content = item.type === "video" ? (
    <video src={item.src} autoPlay muted loop playsInline preload="auto" aria-label={item.label} />
  ) : (
    <img src={item.src} alt={item.label || ""} loading="lazy" />
  );

  return (
    <figure className={`keynote-media-window ${mediaRole} ${item.className || ""}`.trim()}>
      {content}
      {item.label ? <figcaption>{item.label}</figcaption> : null}
    </figure>
  );
}

function KeynoteSlide({ slide, title }) {
  const data = keynoteProcessSlides[slide];
  if (!data) return null;

  const hasSlideBackground = Boolean(data.background);
  const backgroundSrc = typeof data.background === "string" ? data.background : `/assets/character-keynote/slides/page-${slide}.jpg`;
  const mediaItems = hasSlideBackground ? data.media?.filter((item) => item.type === "video") : data.media;

  return (
    <div className={`keynote-slide-stage keynote-${data.variant}`} aria-label={title}>
      {hasSlideBackground ? <img className="keynote-slide-background" src={backgroundSrc} alt="" aria-hidden="true" /> : null}

      {!hasSlideBackground ? (
        <>
          {data.eyebrow ? <p className="keynote-eyebrow">{data.eyebrow}</p> : null}
          <h2>{data.title}</h2>
          {data.subtitle ? <p className="keynote-subtitle">{emphasizeText(data.subtitle)}</p> : null}
          {data.note ? <p className="keynote-note">{emphasizeText(data.note)}</p> : null}
          {data.kicker ? <p className="keynote-kicker">{emphasizeText(data.kicker)}</p> : null}
        </>
      ) : null}

      {!hasSlideBackground && data.center ? (
        <div className="keynote-question-map" aria-hidden="true">
          <div className="keynote-center-mark">
            <span />
            <span />
          </div>
          {data.callouts.map((item) => (
            <span key={item.text} style={{ left: `${item.x}%`, top: `${item.y}%` }}>
              {item.text}
            </span>
          ))}
        </div>
      ) : null}

      {!hasSlideBackground && data.items ? (
        <ol className="keynote-route-list">
          {data.items.map((item) => <li key={item}>{item}</li>)}
        </ol>
      ) : null}

      {mediaItems?.map((item) => (
        <KeynoteMedia item={item} key={`${item.src}-${item.className}`} />
      ))}

      {!hasSlideBackground && data.captions ? (
        <div className="keynote-route-captions">
          {data.captions.map((caption) => <span key={caption}>{caption}</span>)}
        </div>
      ) : null}

      {!hasSlideBackground && data.problem ? <strong className="keynote-problem">{data.problem}</strong> : null}
      {!hasSlideBackground && data.text ? <p className="keynote-body-copy">{emphasizeText(data.text)}</p> : null}
      {!hasSlideBackground && data.bottom ? <p className="keynote-bottom-copy">{emphasizeText(data.bottom)}</p> : null}
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
  const [previewImage, setPreviewImage] = useState(null);
  const trackRef = useRef(null);
  const group = aiGalleryGroups.find((item) => item.key === activeGroup) || aiGalleryGroups[0];
  const images = getGalleryImages(group);
  const streamItems = [...images, ...images];

  useEffect(() => {
    let frameId;
    let lastTime = performance.now();
    let offset = 0;
    const speed = 18;

    const tick = (time) => {
      const track = trackRef.current;
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      if (track) {
        const loopWidth = track.scrollWidth / 2;
        if (loopWidth > 0) {
          offset = (offset + speed * delta) % loopWidth;
          track.style.transform = `translate3d(${-offset}px, 0, 0)`;
        }
      }

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [activeGroup]);

  useEffect(() => {
    if (!previewImage) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setPreviewImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewImage]);

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
      <div className="ai-stream-viewport" aria-label={`${group.label}素材浏览`}>
        <div className="ai-stream-track" ref={trackRef}>
          {streamItems.map((item, index) => (
            <button
              className="ai-stream-item"
              type="button"
              key={`${item.src}-${index}`}
              onClick={() => setPreviewImage(item)}
              aria-label={`打开${item.title}大图`}
            >
              <img src={item.src} alt="" loading={index < 10 ? "eager" : "lazy"} />
            </button>
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
      {previewImage ? (
        <div
          className="ai-image-preview-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setPreviewImage(null);
            }
          }}
        >
          <section className="ai-image-preview-dialog" role="dialog" aria-modal="true" aria-label={previewImage.title}>
            <button
              className="ai-image-preview-close"
              type="button"
              aria-label="关闭大图"
              onClick={() => setPreviewImage(null)}
            >
              <X size={18} />
            </button>
            <img src={previewImage.src} alt={previewImage.title} />
          </section>
        </div>
      ) : null}
    </div>
  );
}

function AIMethodInteractive({ points, editing, onChange }) {
  return (
    <div className="ai-method-panel">
      <div className="ai-method-visual" aria-label="AI 工作流素材浏览">
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
          <BorderGlow as="article" className="ai-method-card" tabIndex={0} key={item.label}>
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
          </BorderGlow>
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
        <BorderGlow as="article" className="cover-card" tabIndex={0} key={item.label} fillOpacity={0}>
          <span className="cover-card-shell" aria-hidden="true" />
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
        </BorderGlow>
      ))}
    </div>
  );
}

function PointCard({ item, index, editing, onChange }) {
  return (
    <BorderGlow as="article" className="point-card" tabIndex={0}>
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
    </BorderGlow>
  );
}

function ProjectTimeline({ items = [], editing, onChange }) {
  if (!items.length) return null;

  return (
    <div className="project-timeline" aria-label="项目经历时间轴">
      <div className="project-timeline-head">
        <span>Project Timeline</span>
        <strong>重要项目节点</strong>
      </div>
      <div className="project-timeline-track">
        {items.map((item, index) => (
          <article className="project-timeline-item" key={`${item.time}-${item.label}`}>
            <EditableText
              as="span"
              className="project-timeline-time"
              value={item.time}
              editing={editing}
              onChange={(value) => onChange(["timeline", index, "time"], value)}
            />
            <EditableText
              as="h3"
              value={item.label}
              editing={editing}
              onChange={(value) => onChange(["timeline", index, "label"], value)}
            />
            <EditableText
              value={item.text}
              editing={editing}
              onChange={(value) => onChange(["timeline", index, "text"], value)}
            />
          </article>
        ))}
      </div>
    </div>
  );
}

function CapabilityDock({ points, timeline = [], editing, onChange }) {
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
    <div className="capability-overview">
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
              <BorderGlow
                as="article"
                className={`capability-panel ${isOpen ? "is-open" : ""}`}
                key={item.label}
              >
                {content}
              </BorderGlow>
            );
          }

          return (
            <BorderGlow
              as="button"
              className={`capability-panel ${isOpen ? "is-open" : ""}`}
              type="button"
              onMouseEnter={() => openItem(index)}
              onFocus={() => openItem(index)}
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
              key={item.label}
            >
              {content}
            </BorderGlow>
          );
        })}
      </div>
      <ProjectTimeline items={timeline} editing={editing} onChange={onChange} />
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
      <Suspense fallback={<div className="fluid-glass-loading">SS4 MATERIAL</div>}>
        <FluidGlass
          mode="lens"
          videoUrl="/assets/ss4/ss4-ui-bg.mp4"
          showSceneImages={false}
          lensProps={{
            scale: 0.3,
            ior: 1.2,
            thickness: 5.6,
            transmission: 1,
            roughness: 0.08,
            chromaticAberration: 0.1,
            anisotropy: 0.035,
            color: "#ffffff",
            attenuationColor: "#fff5e8",
            attenuationDistance: 0.42,
            highlightOpacity: 0,
          }}
        />
      </Suspense>
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

function CharacterMaterialPanel({ open, onClose }) {
  const trackRef = useRef(null);
  const rangeRef = useRef(null);
  const hoverRef = useRef(false);
  const offsetRef = useRef(0);
  const loopWidthRef = useRef(0);
  const scrubActiveRef = useRef(false);

  useEffect(() => {
    if (!open) return undefined;

    const preventWheel = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("wheel", preventWheel, { passive: false, capture: true });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("wheel", preventWheel, { capture: true });
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return undefined;

    let frameId;
    let lastTime = performance.now();
    let speed = 26;

    const tick = (time) => {
      const track = trackRef.current;
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      const targetSpeed = hoverRef.current ? 0 : 26;
      speed += (targetSpeed - speed) * Math.min(1, delta * 3.2);

      if (track) {
        const loopWidth = track.scrollWidth / 2;
        loopWidthRef.current = loopWidth;

        if (loopWidth > 0) {
          offsetRef.current = (offsetRef.current + speed * delta) % loopWidth;
          track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;

          if (rangeRef.current && !scrubActiveRef.current) {
            rangeRef.current.value = String(Math.round((offsetRef.current / loopWidth) * 1000));
          }
        }
      }

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [open]);

  if (!open) return null;

  const loopImages = [...characterMaterialImages, ...characterMaterialImages];

  const blockWheel = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleScrub = (event) => {
    const loopWidth = loopWidthRef.current;
    const track = trackRef.current;
    if (!loopWidth || !track) return;

    const nextOffset = (Number(event.currentTarget.value) / 1000) * loopWidth;
    offsetRef.current = nextOffset;
    track.style.transform = `translate3d(${-nextOffset}px, 0, 0)`;
  };

  return (
    <div
      className="character-material-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      onWheel={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <section
        className="character-material-panel"
        role="dialog"
        aria-modal="true"
        aria-label="理想同学形象 1.0"
        onWheelCapture={blockWheel}
      >
        <div className="character-material-head">
          <div>
            <span>CHARACTER MATERIAL</span>
            <h3>理想同学形象 1.0</h3>
          </div>
          <button className="character-material-close" type="button" aria-label="关闭素材面板" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div
          className="character-material-viewport"
          aria-label="形象素材图片列表"
          onMouseEnter={() => {
            hoverRef.current = true;
          }}
          onMouseLeave={() => {
            hoverRef.current = false;
          }}
          onWheelCapture={blockWheel}
        >
          <div className="character-material-track" ref={trackRef}>
            {loopImages.map((item, index) => (
              <figure className="character-material-frame" key={`${item.src}-${index}`}>
                <img src={item.src} alt={`${item.label} 理想同学实体化素材`} loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
        <div className="character-material-scrollbar" onWheelCapture={blockWheel}>
          <input
            ref={rangeRef}
            type="range"
            min="0"
            max="1000"
            defaultValue="0"
            aria-label="调整素材图库横向位置"
            onInput={handleScrub}
            onPointerDown={() => {
              scrubActiveRef.current = true;
            }}
            onPointerUp={() => {
              scrubActiveRef.current = false;
            }}
            onPointerCancel={() => {
              scrubActiveRef.current = false;
            }}
          />
        </div>
      </section>
    </div>
  );
}

function CharacterAssetStack({ onOpenGallery }) {
  return (
    <div className="character-asset-stack">
      <button className="character-asset-card character-gallery-card" type="button" onClick={onOpenGallery}>
        <Images size={18} />
        <span>理想同学形象 1.0</span>
      </button>
      {characterEntityVideos.map((item) => (
        <article className="character-asset-card character-video-card" key={item.src}>
          <video src={item.src} muted autoPlay loop playsInline preload="metadata" />
          <strong>{item.title}</strong>
        </article>
      ))}
    </div>
  );
}

function AnimationAssetPanel({
  open,
  onClose,
  title,
  kicker,
  items,
  emptyTitle = "素材待补充",
  emptyText = "素材放入项目后，这里会自动切换为动画浏览视窗。",
}) {
  const viewportRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handlePanelWheel = (event) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    event.preventDefault();
    event.stopPropagation();
    viewport.scrollLeft += event.deltaY + event.deltaX;
  };

  return (
    <div
      className="center-animation-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      onWheel={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
    >
      <section
        className="center-animation-panel"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onWheel={handlePanelWheel}
      >
        <div className="center-animation-head">
          <div>
            <span>{kicker}</span>
            <h3>{title}</h3>
          </div>
          <button className="center-animation-close" type="button" aria-label="关闭动画面板" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="center-animation-viewport" aria-label={`${title}列表`} ref={viewportRef}>
          {items.length ? (
            <div className="center-animation-track">
              {items.map((item) => (
                <article className="center-animation-card" key={item.src}>
                  {item.type === "image" ? (
                    <img src={item.src} alt={item.label} loading="lazy" />
                  ) : (
                    <video src={item.src} muted autoPlay loop playsInline preload="metadata" />
                  )}
                  <div className="center-animation-copy">
                    <span>{item.meta}</span>
                    <strong>{item.label}</strong>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="center-animation-empty">
              <span>{emptyTitle}</span>
              <p>{emptyText}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function LiCenterAnimationPanel({ open, onClose }) {
  return (
    <AnimationAssetPanel
      open={open}
      onClose={onClose}
      title="理想同学中心动画"
      kicker="LI CENTER ANIMATION"
      items={liCenterAnimationItems}
    />
  );
}

function FourOAnimationPanel({ open, onClose, type }) {
  const isCar = type === "car";

  return (
    <AnimationAssetPanel
      open={open}
      onClose={onClose}
      title={isCar ? "4O 小同桌 · 车机端" : "4O 小同桌 · 手机端"}
      kicker={isCar ? "4O CAR ANIMATION" : "4O MOBILE ANIMATION"}
      items={isCar ? fourOCarAnimationItems : fourOPhoneAnimationItems}
      emptyTitle={isCar ? "车机端素材待补充" : "手机端素材待补充"}
      emptyText="你把素材给我后，我会把这里替换成对应端的动画浏览视窗。"
    />
  );
}

function SS4MaterialPanel({ open, onClose }) {
  return (
    <AnimationAssetPanel
      open={open}
      onClose={onClose}
      title="SS4 质感素材"
      kicker="SS4 MATERIAL"
      items={ss4MaterialItems}
    />
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

function OCStrategyBoard({ points, editing, onChange }) {
  return (
    <div className="oc-strategy-board">
      {points.map((item, index) => (
        <article className="oc-strategy-item" tabIndex={0} key={item.label}>
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
  );
}

function OCVideoShowcase() {
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

function IntroOverlay({ page, mode, active, editing, onChange }) {
  return (
    <section className={`intro-overlay ${active ? "is-visible" : ""}`} aria-hidden={!active}>
      <div className="intro-overlay-copy">
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
      <div className="intro-overlay-cards">
        {(page.coverItems || []).map((item, index) => (
          <article className="intro-overlay-card" key={item.label}>
            <span>{pad(index + 1)}</span>
            <EditableText
              as="h3"
              value={item.label}
              editing={editing}
              onChange={(value) => onChange(0, ["coverItems", index, "label"], value)}
            />
            <EditableText
              value={item.text}
              editing={editing}
              onChange={(value) => onChange(0, ["coverItems", index, "text"], value)}
            />
          </article>
        ))}
      </div>
    </section>
  );
}

function FinalSummaryShowcase({ points, editing, onChange }) {
  const [activeCardIndex, setActiveCardIndex] = useState(null);

  return (
    <div className="final-summary-showcase">
      <div className="final-summary-cards" aria-label="Summary details">
        {points.map((item, pointIndex) => (
          <BorderGlow
            as="article"
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
          </BorderGlow>
        ))}
      </div>
      <div className="final-summary-visual">
        <img src="/assets/final-summary-banner.webp" alt="" />
      </div>
    </div>
  );
}

function CharacterStoryPointList({ points, editing, onChange, start = 0 }) {
  return (
    <div className="character-story-point-list">
      {points.map((item, pointIndex) => (
        <article className="character-story-point" key={item.label}>
          <span>{pad(start + pointIndex + 1)}</span>
          <div>
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
          </div>
        </article>
      ))}
    </div>
  );
}

function CharacterShapeStory({ page, editing, onChange }) {
  return (
    <div className="character-story character-shape-story">
      <section className="character-story-hero">
        <div className="character-story-orbit" aria-hidden="true">
          <Sparkles size={18} />
          <Hand size={18} />
          <Eye size={18} />
        </div>
        <div className="character-story-kicker">
          <span>01</span>
          <p>{page.parentTitle}</p>
        </div>
        <div className="character-story-title">
          <p className="eyebrow">{page.eyebrow}</p>
          <EditableText
            as="h2"
            value={page.title}
            editing={editing}
            onChange={(value) => onChange(["title"], value)}
          />
          <EditableText
            className="character-story-question"
            value={page.conclusion}
            editing={editing}
            onChange={(value) => onChange(["conclusion"], value)}
          />
          <EditableText
            className="character-story-intro"
            value={page.intro}
            editing={editing}
            onChange={(value) => onChange(["intro"], value)}
          />
        </div>
        <div className="character-story-hero-media" aria-label="理想同学形态探索素材">
          {characterShapeHeroMedia.map((item, mediaIndex) => (
            <figure className={`character-story-frame hero-frame-${mediaIndex + 1}`} key={item.src}>
              <StoryMedia item={item} loading={mediaIndex === 0 ? "eager" : "lazy"} />
              <figcaption>
                <span>{item.label}</span>
                <small>{item.meta}</small>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="character-story-section character-shape-flow">
        <div className="character-story-section-copy">
          <span>Birth</span>
          <h3>从旧符号出发，而不是重新发明一个角色。</h3>
          <p>
            这个阶段的核心不是“画一个可爱的毛球”，而是把旧版理想同学已经被用户记住的部分转译成三维语言：
            保留亲近感，强化被看见的眼神，再补上能参与动作的手。
          </p>
        </div>
        <div className="character-story-stage-grid is-dark-process-grid">
          {[characterShapeCollageMedia[2], characterShapeCollageMedia[3], characterLandingStageMedia[2], characterLandingStageMedia[3]].map((item) => (
            <figure className="character-story-frame" key={item.src}>
              <StoryMedia item={item} />
              <figcaption>
                <span>{item.label}</span>
                <small>{item.meta}</small>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="character-story-section character-design-proof">
        <div className="character-story-large-copy">
          <span>Proof</span>
          <h3>有手、有高光、有帽子，都是为了让它能被记住。</h3>
          <p>
            白底探索图不作为主视觉，而是作为推导证据：手让角色能回应，眼睛高光让它有生命感，帽子让轮廓有更强记忆点。
            这些判断共同把“毛绒绒”从情绪描述推进成可交付的形态规则。
          </p>
        </div>
        <div className="character-story-stage-grid is-proof-grid">
          {characterShapeStageMedia.map((item) => (
            <figure className="character-story-frame is-evidence-frame" key={`${item.src}-proof`}>
              <StoryMedia item={item} />
              <figcaption>
                <span>{item.label}</span>
                <small>{item.meta}</small>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="character-story-section character-shape-collage">
        <div className="character-story-large-copy">
          <span>Question</span>
          <h3>毛绒应该长什么样？</h3>
          <p>
            我把模糊的质感问题拆成能被团队判断的视觉参数：毛发长短、边缘柔软度、眼睛比例、帽子轮廓、手的姿态和暗色界面里的识别速度。
          </p>
        </div>
        <div className="character-story-collage-grid">
          {[characterShapeCollageMedia[0], characterShapeCollageMedia[1], characterShapeStageMedia[2], characterShapeStageMedia[3]].map((item, mediaIndex) => (
            <figure className={`character-story-frame collage-frame-${mediaIndex + 1}`} key={item.src}>
              <StoryMedia item={item} />
              <figcaption>
                <span>{item.label}</span>
                <small>{item.meta}</small>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="character-story-section character-story-summary">
        <CharacterStoryPointList points={page.points} editing={editing} onChange={onChange} />
      </section>
    </div>
  );
}

function CharacterLandingStory({ page, editing, onChange }) {
  return (
    <div className="character-story character-landing-story">
      <section className="character-story-hero landing-story-hero">
        <div className="character-story-orbit" aria-hidden="true">
          <Film size={18} />
          <Orbit size={18} />
          <Sparkles size={18} />
        </div>
        <div className="character-story-kicker">
          <span>02</span>
          <p>{page.parentTitle}</p>
        </div>
        <div className="character-story-title">
          <p className="eyebrow">{page.eyebrow}</p>
          <EditableText
            as="h2"
            value={page.title}
            editing={editing}
            onChange={(value) => onChange(["title"], value)}
          />
          <EditableText
            className="character-story-question"
            value={page.conclusion}
            editing={editing}
            onChange={(value) => onChange(["conclusion"], value)}
          />
          <EditableText
            className="character-story-intro"
            value={page.intro}
            editing={editing}
            onChange={(value) => onChange(["intro"], value)}
          />
        </div>
        <div className="character-landing-hero-media" aria-label="技术落地关键素材">
          {[characterLandingStageMedia[2], characterLandingStageMedia[0]].map((item, mediaIndex) => (
            <figure className="character-story-frame" key={item.src}>
              <StoryMedia item={item} loading={mediaIndex === 0 ? "eager" : "lazy"} />
              <figcaption>
                <span>{item.label}</span>
                <small>{item.meta}</small>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="character-story-section character-spine-proof">
        <div className="character-story-large-copy">
          <span>States</span>
          <h3>先让它能表达，再继续逼近真实毛绒。</h3>
          <p>
            Spine 不是最终质感答案，但它能快速确认“听、想、说、开心、困惑”等状态是否成立。稳定表达先支撑业务，质感路线再继续推进。
          </p>
        </div>
        <div className="character-landing-spine-strip" aria-label="Spine 状态动画">
          {characterSpineStateVideos.map((item, mediaIndex) => (
            <figure className="character-story-frame is-evidence-frame" key={item.src}>
              <StoryMedia item={{ ...item, type: "video" }} loading={mediaIndex === 0 ? "eager" : "lazy"} />
              <figcaption>
                <span>{item.label}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="character-story-section character-landing-roadmap">
        <div className="character-story-section-copy">
          <span>Route</span>
          <h3>技术路线不是线性成功，而是不断缩小风险。</h3>
          <p>
            我把“真实毛绒”拆成先能动、再能像、最后能真实三步。每一步都明确判断口径：能不能支撑上线，能不能保留毛感，能不能继续升级。
          </p>
        </div>
        <div className="character-landing-stage-grid">
          {characterLandingStageMedia.map((item, mediaIndex) => (
            <figure className={`character-story-frame landing-stage-${mediaIndex + 1}`} key={item.src}>
              <StoryMedia item={item} loading={mediaIndex === 0 ? "eager" : "lazy"} />
              <figcaption>
                <span>{item.label}</span>
                <small>{item.meta}</small>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="character-story-section character-landing-decision">
        <div className="character-story-large-copy">
          <span>Decision</span>
          <h3>效果不好，就不要把错路拖到交付末端。</h3>
          <p>
            3D 多通道方案提供了结构判断，但在毛绒真实感上没有通过；Gaussian 则更适合承接真实材质、体积光和柔软边缘。
            这不是换一个炫技方案，而是把前面的形象基础、3D 基础和新技术重新组合成可继续推进的路线。
          </p>
        </div>
        <div className="character-landing-result-grid">
          {characterLandingResultMedia.map((item) => (
            <figure className="character-story-frame" key={item.src}>
              <StoryMedia item={item} />
              <figcaption>
                <span>{item.label}</span>
                <small>{item.meta}</small>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="character-story-section character-story-summary">
        <CharacterStoryPointList points={page.points} editing={editing} onChange={onChange} />
      </section>
    </div>
  );
}

function RevealPointList({ points, editing, onChange, className = "" }) {
  return (
    <div className={`gaussian-copy-points ${className}`.trim()}>
      {points.map((item, pointIndex) => (
        <article key={item.label}>
          <span>{pad(pointIndex + 1)}</span>
          <div>
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
          </div>
        </article>
      ))}
    </div>
  );
}

function CaseSection({ page, index, note, onOpenNote, isActive, editing, onChange }) {
  const [isMaterialPanelOpen, setMaterialPanelOpen] = useState(false);
  const [isCenterAnimationPanelOpen, setCenterAnimationPanelOpen] = useState(false);
  const [isSS4MaterialPanelOpen, setSS4MaterialPanelOpen] = useState(false);
  const [activeFourOPanel, setActiveFourOPanel] = useState(null);
  const [firstColumn, secondColumn] = splitPoints(page.points);
  const pageNumber = index + 1;
  const backdrop = getPageBackdrop(page);
  const isFinalSummaryPage = index === pages.length - 1;
  const isCharacterProjectPage = page.demo === "gaussianSplat";
  const isDeliveryProjectPage = page.demo === "deliveryPopups";
  const isCharacterStoryPage = page.detailType === "problem" || page.detailType === "process";
  const isKeynoteSlidePage = page.demo === "keynoteSlide";
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

  if (isCharacterStoryPage) {
    sectionClasses.push("has-character-story", `is-character-${page.detailType}`);
  }

  if (isKeynoteSlidePage) {
    sectionClasses.push("has-keynote-slide");
  }

  if (page.demo === "radiance") {
    sectionClasses.push("has-radiance");
  }

  if (page.demo === "ocVideos") {
    sectionClasses.push("has-oc-videos");
  }

  if (page.demo === "aiMethod") {
    sectionClasses.push("has-ai-method");
  } else if (page.demo === "aiGallery") {
    sectionClasses.push("has-ai-gallery");
  } else if (page.demo === "capabilityDock" || page.demo === "capabilityTimeline") {
    sectionClasses.push("has-capability-dock");
  } else if (page.demo === "infiniteMenu") {
    sectionClasses.push("has-infinite-menu");
  }

  if (isFinalSummaryPage) {
    sectionClasses.push("final-summary-section");
  }

  return (
    <section className={sectionClasses.join(" ")} id={`page-${pageNumber}`}>
      <PageBackdrop backdrop={backdrop} />
      {page.demo === "infiniteMenu" ? <AIWorkflowInfiniteBackdrop /> : null}
      <NoteButton index={index} hasNote={Boolean(note?.trim())} onOpen={onOpenNote} />
      <div className="case-index" aria-hidden="true">
        {pad(pageNumber)}
      </div>
      {isCharacterProjectPage ? (
        <CharacterAssetStack onOpenGallery={() => setMaterialPanelOpen(true)} />
      ) : null}
      {isDeliveryProjectPage ? (
        <div className="delivery-popup-triggers">
          <BorderGlow
            as="button"
            className="center-animation-trigger is-center"
            type="button"
            onClick={() => setCenterAnimationPanelOpen(true)}
            borderRadius={18}
            glowRadius={38}
            fillOpacity={0}
          >
            <span className="delivery-entry-media" aria-hidden="true" />
            <span className="delivery-entry-shade" aria-hidden="true" />
            <span className="delivery-entry-sheen" aria-hidden="true" />
            <span className="delivery-entry-copy">
              <span>01</span>
              <strong>中心动画</strong>
              <small>理想同学中心里的其他动画（含未上线）</small>
            </span>
            <Film size={22} />
          </BorderGlow>
          <BorderGlow
            as="button"
            className="center-animation-trigger is-car"
            type="button"
            onClick={() => setActiveFourOPanel("car")}
            borderRadius={18}
            glowRadius={38}
            fillOpacity={0}
          >
            <span className="delivery-entry-media" aria-hidden="true" />
            <span className="delivery-entry-shade" aria-hidden="true" />
            <span className="delivery-entry-sheen" aria-hidden="true" />
            <span className="delivery-entry-copy">
              <span>02</span>
              <strong>4O 小同桌 · 车机端</strong>
              <small>车机端动画与小同桌素材</small>
            </span>
            <Film size={22} />
          </BorderGlow>
          <BorderGlow
            as="button"
            className="center-animation-trigger is-phone"
            type="button"
            onClick={() => setActiveFourOPanel("phone")}
            borderRadius={18}
            glowRadius={38}
            fillOpacity={0}
          >
            <span className="delivery-entry-media" aria-hidden="true" />
            <span className="delivery-entry-shade" aria-hidden="true" />
            <span className="delivery-entry-sheen" aria-hidden="true" />
            <span className="delivery-entry-copy">
              <span>03</span>
              <strong>4O 手机端</strong>
              <small>手机端形象与动态素材</small>
            </span>
            <Film size={22} />
          </BorderGlow>
        </div>
      ) : null}
      {page.demo === "fluidGlass" ? (
        <BorderGlow
          as="button"
          className="center-animation-trigger ss4-material-trigger"
          type="button"
          onClick={() => setSS4MaterialPanelOpen(true)}
          borderRadius={18}
          glowRadius={38}
          fillOpacity={0}
        >
          <span className="delivery-entry-media" aria-hidden="true" />
          <span className="delivery-entry-shade" aria-hidden="true" />
          <span className="delivery-entry-sheen" aria-hidden="true" />
          <span className="delivery-entry-copy">
            <span>01</span>
            <strong>SS4 质感素材</strong>
            <small>玻璃背板、UI 动效与材质方案图</small>
          </span>
          <Images size={22} />
        </BorderGlow>
      ) : null}
      {isCharacterStoryPage || isKeynoteSlidePage ? null : (
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
            <RevealPointList
              points={page.points}
              editing={editing}
              onChange={(path, value) => onChange(index, path, value)}
            />
          ) : null}
          {page.demo === "radiance" ? (
            <RevealPointList
              points={page.points}
              editing={editing}
              onChange={(path, value) => onChange(index, path, value)}
              className="radiance-copy-points"
            />
          ) : null}
          {page.demo === "ocVideos" ? (
            <OCStrategyBoard
              points={page.points}
              editing={editing}
              onChange={(path, value) => onChange(index, path, value)}
            />
          ) : null}
        </div>
      )}
      {isKeynoteSlidePage ? (
        <KeynoteSlide slide={page.slide} title={page.title} />
      ) : page.detailType === "problem" ? (
        <CharacterShapeStory
          page={page}
          editing={editing}
          onChange={(path, value) => onChange(index, path, value)}
        />
      ) : page.detailType === "process" ? (
        <CharacterLandingStory
          page={page}
          editing={editing}
          onChange={(path, value) => onChange(index, path, value)}
        />
      ) : page.demo === "radiance" ? (
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
      ) : page.demo === "capabilityDock" || page.demo === "capabilityTimeline" ? (
        <CapabilityDock
          points={page.points}
          timeline={page.timeline}
          editing={editing}
          onChange={(path, value) => onChange(index, path, value)}
        />
      ) : page.demo === "ocVideos" ? (
        <OCVideoShowcase />
      ) : isFinalSummaryPage ? (
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
      <CharacterMaterialPanel open={isMaterialPanelOpen} onClose={() => setMaterialPanelOpen(false)} />
      <LiCenterAnimationPanel open={isCenterAnimationPanelOpen} onClose={() => setCenterAnimationPanelOpen(false)} />
      <FourOAnimationPanel open={activeFourOPanel === "car"} type="car" onClose={() => setActiveFourOPanel(null)} />
      <FourOAnimationPanel open={activeFourOPanel === "phone"} type="phone" onClose={() => setActiveFourOPanel(null)} />
      <SS4MaterialPanel open={isSS4MaterialPanelOpen} onClose={() => setSS4MaterialPanelOpen(false)} />
    </section>
  );
}

function VisualDeck({ mode, pagesSource, notes, onOpenNote, activePageIndex, editing, onChange }) {
  return (
    <main className={`visual-deck deck-${mode.id}${editing ? " is-editing" : ""}`}>
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
  const [interfaceHidden, setInterfaceHidden] = useState(true);
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
    const scrollToHash = () => {
      const targetId = window.location.hash.slice(1);
      if (!targetId) return;

      const target = document.getElementById(targetId);
      if (!target) return;

      window.requestAnimationFrame(() => {
        window.scrollTo({ top: target.offsetTop, behavior: "auto" });
        const nextIndex = Number(targetId.replace("page-", "")) - 1;
        if (!Number.isNaN(nextIndex)) {
          setActivePageIndex(nextIndex);
        }
      });
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, [contentPages.length]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll(".hero-section, .case-section"));
    if (!sections.length) return undefined;

    const resolveByViewportCenter = () => {
      try {
        const viewportCenter = window.innerHeight / 2;
        let nextActiveIndex = 0;
        let nearestDistance = Number.POSITIVE_INFINITY;

        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
            nextActiveIndex = Number(section.id.replace("page-", "")) - 1;
            nearestDistance = 0;
            return;
          }

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

    if ("IntersectionObserver" in window) {
      let rafId = 0;
      const scheduleResolve = () => {
        if (rafId) return;
        rafId = window.requestAnimationFrame(() => {
          rafId = 0;
          resolveByViewportCenter();
        });
      };

      const observer = new IntersectionObserver(
        (entries) => {
          const visibleEntries = entries.filter((entry) => entry.isIntersecting);
          if (!visibleEntries.length) {
            scheduleResolve();
            return;
          }

          const bestEntry = visibleEntries.reduce((best, entry) => {
            if (!best) return entry;
            if (entry.intersectionRatio !== best.intersectionRatio) {
              return entry.intersectionRatio > best.intersectionRatio ? entry : best;
            }
            return Math.abs(entry.boundingClientRect.top) < Math.abs(best.boundingClientRect.top)
              ? entry
              : best;
          }, null);

          if (bestEntry) {
            const nextIndex = Number(bestEntry.target.id.replace("page-", "")) - 1;
            if (!Number.isNaN(nextIndex)) {
              setActivePageIndex(nextIndex);
            }
          } else {
            scheduleResolve();
          }
        },
        {
          threshold: [0.1, 0.25, 0.4, 0.55, 0.7, 0.85],
        },
      );

      sections.forEach((section) => observer.observe(section));
      scheduleResolve();
      window.addEventListener("resize", scheduleResolve);

      return () => {
        if (rafId) {
          window.cancelAnimationFrame(rafId);
        }
        observer.disconnect();
        window.removeEventListener("resize", scheduleResolve);
      };
    }

    let rafId = 0;
    const scheduleUpdate = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        resolveByViewportCenter();
      });
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
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
          if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
            return { distance: 0, index };
          }

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

  const saveContent = async () => {
    try {
      window.localStorage.setItem(
        CONTENT_STORAGE_KEY,
        JSON.stringify({
          version: CONTENT_STORAGE_VERSION,
          pages: contentPages,
        }),
      );
      const sourceSynced = await syncContentToSource(contentPages);
      setContentDirty(false);
      setContentEditing(false);
      setCopiedTarget(sourceSynced ? "content-save" : "content-save-local");
      window.setTimeout(() => setCopiedTarget(""), 1600);
    } catch {
      setCopiedTarget("content-save-failed");
      window.setTimeout(() => setCopiedTarget(""), 1600);
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

  const toggleInterfaceHidden = () => {
    setInterfaceHidden((current) => {
      const next = !current;
      if (next) {
        setNavOpen(false);
      }
      return next;
    });
  };

  return (
    <div className={`app-shell theme-${activeMode.id}${interfaceHidden ? " is-interface-hidden" : ""}`}>
      <header className="site-header">
        <PillNav
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
                {copiedTarget === "content-save" || copiedTarget === "content-save-local" ? (
                  <ClipboardCheck size={16} />
                ) : (
                  <Save size={16} />
                )}
                {copiedTarget === "content-save"
                  ? "已同步源码"
                  : copiedTarget === "content-save-local"
                    ? "已本地保存"
                    : copiedTarget === "content-save-failed"
                      ? "保存失败"
                      : "保存文案"}
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
          <button
            className="interface-toggle-button"
            type="button"
            aria-pressed={interfaceHidden}
            aria-label={interfaceHidden ? "显示界面控件" : "隐藏界面控件"}
            title={interfaceHidden ? "显示界面控件" : "隐藏界面控件"}
            onClick={toggleInterfaceHidden}
          >
            {interfaceHidden ? <Eye size={18} /> : <EyeOff size={18} />}
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
