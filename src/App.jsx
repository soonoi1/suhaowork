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
    "intro": "一句话定位：我擅长把不确定的视觉体验问题，拆解成可验证、可交付、可复用的设计与技术方案。",
    "coverItems": [
      {
        "label": "个人定位",
        "text": "技术体验型设计师：既能判断 3D、动效与视觉质量，也能把探索方案转化为研发可接入、业务可上线、团队可复用的资源和流程。"
      },
      {
        "label": "核心能力",
        "text": "复杂视觉体验判断、3D/动效技术验证、角色资产建设、AI 工作流搭建、跨端资源交付、工具化提效、体验原型设计。"
      },
      {
        "label": "代表项目",
        "text": "理想同学实体化、理想同学中心、4o 小同桌、OTA 7.4 多端交付、AI 生产工作流、Standby 放射光、SS4 质感探索、OC 眼睛。"
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
    "title": "从何开始？",
    "demo": "keynoteSlide",
    "slide": "03",
    "conclusion": "",
    "intro": "",
    "points": []
  },
  {
    "eyebrow": "04 / Fur",
    "title": "怎么毛绒化？",
    "demo": "keynoteSlide",
    "slide": "04",
    "conclusion": "",
    "intro": "",
    "points": []
  },
  {
    "eyebrow": "05 / Styling",
    "title": "为什么戴帽子？",
    "demo": "keynoteSlide",
    "slide": "05",
    "conclusion": "",
    "intro": "",
    "points": []
  },
  {
    "eyebrow": "06 / Eye Shape",
    "title": "眼睛形态应该是个啥样的？",
    "demo": "keynoteSlide",
    "slide": "06",
    "conclusion": "",
    "intro": "",
    "points": []
  },
  {
    "eyebrow": "07 / Model",
    "title": "要动起来 必须得建模",
    "demo": "keynoteSlide",
    "slide": "07",
    "conclusion": "",
    "intro": "",
    "points": []
  },
  {
    "eyebrow": "08 / Fur Detail",
    "title": "如何攻克毛绒渲染效果？",
    "demo": "keynoteSlide",
    "slide": "08",
    "conclusion": "",
    "intro": "",
    "points": []
  },
  {
    "eyebrow": "09 / Birth",
    "title": "理想同学形象诞生",
    "demo": "keynoteSlide",
    "slide": "09",
    "conclusion": "",
    "intro": "",
    "points": []
  },
  {
    "eyebrow": "10 / Technical Route",
    "title": "如何选择技术路径？",
    "demo": "keynoteSlide",
    "slide": "10",
    "conclusion": "",
    "intro": "",
    "points": []
  },
  {
    "eyebrow": "11 / Delivery",
    "title": "理想同学从设计到交付",
    "demo": "keynoteSlide",
    "slide": "11",
    "conclusion": "",
    "intro": "",
    "points": []
  },
  {
    "eyebrow": "12 / Character",
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
    "eyebrow": "13 / Collaboration",
    "title": "同期复杂项目如何保证交付？",
    "demo": "keynoteSlide",
    "slide": "13",
    "conclusion": "",
    "intro": "",
    "points": []
  },
  {
    "eyebrow": "14 / Resource Delivery",
    "title": "如何整合资源保障交付？",
    "demo": "keynoteSlide",
    "slide": "14",
    "conclusion": "",
    "intro": "",
    "points": []
  },
  {
    "eyebrow": "15 / 4O Delivery",
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
    "eyebrow": "16 / AI Application",
    "title": "AI实战怎么应用？",
    "demo": "keynoteSlide",
    "slide": "16",
    "conclusion": "",
    "intro": "",
    "points": []
  },
  {
    "eyebrow": "17 / AI Workflow",
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
    "eyebrow": "18 / Standby Prompt",
    "title": "Standby放射光怎么来的？",
    "demo": "keynoteSlide",
    "slide": "18",
    "conclusion": "",
    "intro": "",
    "points": []
  },
  {
    "eyebrow": "19 / Light Language",
    "title": "光视觉语言的设想？",
    "demo": "keynoteSlide",
    "slide": "19",
    "conclusion": "",
    "intro": "",
    "points": []
  },
  {
    "eyebrow": "20 / Standby Light",
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
    "eyebrow": "21 / Technical Validation",
    "title": "技术验证有用吗？",
    "demo": "keynoteSlide",
    "slide": "21",
    "conclusion": "",
    "intro": "",
    "points": []
  },
  {
    "eyebrow": "22 / SS4 Material",
    "title": "SS4 质感探索",
    "demo": "fluidGlass",
    "conclusion": "先行做技术路径的示效探索，通过流体玻璃的折射、透光和动态形变，验证 SS4 界面质感中透明层次与动态材质的表达方式。",
    "intro": "通过 3D 动效先去验证目前技术路径所有可实现的效果，然后再逐渐收敛成 SS4 系统的 UI 材质参数效果。提供视效玻璃质感技术实现的思路给到技术。",
    "points": []
  },
  {
    "eyebrow": "23 / Welcome Research",
    "title": "车如果有眼睛应该长啥样？",
    "demo": "keynoteSlide",
    "slide": "23",
    "conclusion": "",
    "intro": "",
    "points": []
  },
  {
    "eyebrow": "24 / Helping Eyes",
    "title": "如何驱动眼睛？",
    "demo": "keynoteSlide",
    "slide": "24",
    "conclusion": "",
    "intro": "",
    "points": []
  },
  {
    "eyebrow": "25 / Natural Blink",
    "title": "真实感如何用做？",
    "demo": "keynoteSlide",
    "slide": "25",
    "conclusion": "",
    "intro": "",
    "points": []
  },
  {
    "eyebrow": "26 / Tooling",
    "title": "如何串联工作？",
    "demo": "keynoteSlide",
    "slide": "26",
    "conclusion": "",
    "intro": "",
    "points": []
  },
  {
    "eyebrow": "27 / Binding",
    "title": "眼睛都长不一样怎么驱动？",
    "demo": "keynoteSlide",
    "slide": "27",
    "conclusion": "",
    "intro": "",
    "points": []
  },
  {
    "eyebrow": "28 / Scenario",
    "title": "实际业务场景如何应用？",
    "demo": "keynoteSlide",
    "slide": "28",
    "conclusion": "",
    "intro": "",
    "points": []
  },
  {
    "eyebrow": "29 / OC Eyes",
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
    "eyebrow": "30 / Summary",
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

const storyPageOrder = [
  "01 / Intro",
  "12 / Character",
  "02 / Character Process",
  "03 / Shape",
  "04 / Fur",
  "05 / Styling",
  "06 / Eye Shape",
  "07 / Model",
  "08 / Fur Detail",
  "09 / Birth",
  "10 / Technical Route",
  "11 / Delivery",
  "13 / Collaboration",
  "14 / Resource Delivery",
  "15 / 4O Delivery",
  "16 / AI Application",
  "17 / AI Workflow",
  "18 / Standby Prompt",
  "19 / Light Language",
  "20 / Standby Light",
  "22 / SS4 Material",
  "21 / Technical Validation",
  "23 / Welcome Research",
  "24 / Helping Eyes",
  "25 / Natural Blink",
  "26 / Tooling",
  "27 / Binding",
  "28 / Scenario",
  "29 / OC Eyes",
  "30 / Summary",
];

function orderPagesForStory(pagesToOrder = pages) {
  const pagesByEyebrow = new Map(pagesToOrder.map((page) => [page.eyebrow, page]));
  const orderedPages = storyPageOrder
    .map((eyebrow) => pagesByEyebrow.get(eyebrow))
    .filter(Boolean);

  return orderedPages.length === pagesToOrder.length ? orderedPages : pagesToOrder;
}

const orderedPages = orderPagesForStory(pages);

function pad(value) {
  return String(value).padStart(2, "0");
}

const NOTES_STORAGE_KEY = "suhaowork-review-notes-v2";
const CONTENT_STORAGE_KEY = "suhaowork-page-content-v3-keynote-30";
const CONTENT_STORAGE_VERSION = "2026-05-25-story-order-v2";

const activeVisualMode = {
  id: "space",
  label: "Tag 1",
  name: "home",
  desc: "巨型标题 / 黑白空间 / 科技卡片",
  Icon: Orbit,
};

const pillNavItems = [
  { label: "Intro", meta: "01", href: "#page-1", ariaLabel: "Intro, page 1" },
  { label: "Shape", meta: "02-11", href: "#page-2", ariaLabel: "Shape and character process, pages 2 to 11" },
  { label: "Delivery", meta: "12-15", href: "#page-12", ariaLabel: "Delivery and collaboration, pages 12 to 15" },
  { label: "AI", meta: "16-17", href: "#page-16", ariaLabel: "AI workflow, pages 16 to 17" },
  { label: "Light", meta: "18-20", href: "#page-18", ariaLabel: "Light language, pages 18 to 20" },
  { label: "SS4", meta: "21-22", href: "#page-21", ariaLabel: "SS4 material and validation, pages 21 to 22" },
  { label: "OC", meta: "23-29", href: "#page-23", ariaLabel: "OC eye project, pages 23 to 29" },
  { label: "Sum", meta: "30", href: "#page-30", ariaLabel: "Summary, page 30" },
];

function getActivePillHref(activePageIndex) {
  const pageNumber = activePageIndex + 1;

  if (pageNumber === 1) return "#page-1";
  if (pageNumber <= 11) return "#page-2";
  if (pageNumber <= 15) return "#page-12";
  if (pageNumber <= 17) return "#page-16";
  if (pageNumber <= 20) return "#page-18";
  if (pageNumber <= 22) return "#page-21";
  if (pageNumber <= 29) return "#page-23";
  return "#page-30";
}

function getPageIndexFromHref(href = "") {
  const pageNumber = Number(href.replace("#page-", ""));
  if (Number.isNaN(pageNumber)) return null;
  return pageNumber - 1;
}

function emphasizeText(value = "", preferredTokens) {
  const highlightMap = preferredTokens
    ? Object.fromEntries(preferredTokens.map((token) => [token, "key"]))
    : {
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

const keynoteMediaBase = "/assets/character-keynote/page-media-sync";

function pctBox(left, top, width, height) {
  return {
    left: `${left}%`,
    top: `${top}%`,
    width: `${width}%`,
    height: `${height}%`,
  };
}

function mediaItem(src, box, options = {}) {
  return {
    type: src.endsWith(".mp4") || src.endsWith(".mov") ? "video" : "image",
    src,
    style: pctBox(...box),
    fit: options.fit,
    className: options.className,
    label: options.label,
  };
}

function textLayer(kind, text, box, options = {}) {
  return {
    kind,
    text,
    style: pctBox(...box),
    className: options.className,
    highlightTerms: options.highlightTerms,
  };
}

const htmlTextSlides = new Set(["13", "14", "16", "18", "19", "21", "23", "24", "25", "26", "27"]);

const keynoteSlideMedia = {
  "02": [
    mediaItem(`${keynoteMediaBase}/page-02-old-li.mp4`, [41.46, 44.81, 17.81, 31.67], { fit: "contain", label: "旧版理想同学" }),
  ],
  "03": [
    mediaItem(`${keynoteMediaBase}/page-03-original.mp4`, [28.7, 50.74, 10.78, 19.07], { fit: "contain", label: "原始形态" }),
    mediaItem(`${keynoteMediaBase}/page-03-handmade.mp4`, [39.95, 33.7, 20.36, 36.11], { fit: "cover", label: "手搓版雏形" }),
  ],
  "07": [
    mediaItem(`${keynoteMediaBase}/page-07-hat.mp4`, [30.73, 11.11, 9.9, 17.59], { fit: "cover", label: "换帽子" }),
    mediaItem(`${keynoteMediaBase}/page-07-memory.mp4`, [40.63, 11.11, 28.13, 17.59], { fit: "cover", label: "记忆" }),
  ],
  "08": [
    mediaItem(`${keynoteMediaBase}/page-08-fur-grooming.mp4`, [11.41, 43.43, 35.36, 40.74], { fit: "cover", label: "毛发细节渲染" }),
  ],
  "10": [
    mediaItem(`${keynoteMediaBase}/page-10-spine.mp4`, [9.9, 33.89, 21.15, 37.5], { fit: "cover", label: "Spine效果" }),
    mediaItem(`${keynoteMediaBase}/page-10-multipass.mp4`, [41.98, 39.17, 16.72, 25.09], { fit: "cover", label: "3D multipass 效果" }),
    mediaItem(`${keynoteMediaBase}/page-10-dark-car.mp4`, [73.39, 35.83, 16.72, 34.72], { fit: "cover", label: "深色模式实车效果" }),
  ],
  "11": [
    mediaItem(`${keynoteMediaBase}/page-11-light-car.mp4`, [8.33, 39.35, 33.07, 26.48], { fit: "cover", label: "浅色模式实车效果" }),
    mediaItem(`${keynoteMediaBase}/page-11-result.mp4`, [42.76, 39.35, 46.98, 47.22], { fit: "cover", label: "落地效果" }),
  ],
  "13": [
    mediaItem(`${keynoteMediaBase}/page-13-4o-filled.mp4`, [4.48, 28, 55.21, 48.43], { fit: "cover", label: "4o 小同桌交付资源" }),
    mediaItem(`${keynoteMediaBase}/page-13-center-delivery.mp4`, [61.88, 28, 29.38, 48.43], { fit: "cover", label: "理想同学中心交付资源" }),
  ],
  "14": [
    mediaItem(`${keynoteMediaBase}/page-14-split.mp4`, [37.24, 31.11, 25.68, 31.48], { fit: "cover", label: "资源分割素材" }),
  ],
  "16": [
    mediaItem(`${keynoteMediaBase}/page-16-custom.mp4`, [11.67, 25.28, 49.1, 43.7], { fit: "cover", label: "自定义形象" }),
    mediaItem(`${keynoteMediaBase}/page-16-spring.mp4`, [61.56, 25.28, 27.45, 43.7], { fit: "cover", label: "春节形象" }),
  ],
  "18": [
    mediaItem(`${keynoteMediaBase}/page-18-1.mp4`, [1.67, 28.06, 31.35, 30.28], { fit: "cover", label: "方案一" }),
    mediaItem(`${keynoteMediaBase}/page-18-2.mp4`, [34.32, 28.06, 31.35, 30.28], { fit: "cover", label: "方案二" }),
    mediaItem(`${keynoteMediaBase}/page-18-3.mp4`, [66.98, 28.06, 31.35, 30.28], { fit: "cover", label: "方案三" }),
    mediaItem(`${keynoteMediaBase}/page-18-wakeup.mp4`, [33.54, 60.37, 32.97, 30.37], { fit: "cover", label: "唤醒模式" }),
  ],
  "19": [
    mediaItem(`${keynoteMediaBase}/page-19-attention.mp4`, [1.46, 25.93, 25.94, 17.22], { fit: "cover", label: "注意力" }),
    mediaItem(`${keynoteMediaBase}/page-19-temperature.mp4`, [34.58, 25.93, 25.94, 17.22], { fit: "cover", label: "温度感知" }),
    mediaItem(`${keynoteMediaBase}/page-19-visibility.mp4`, [67.76, 25.93, 25.94, 17.22], { fit: "cover", label: "能见度" }),
    mediaItem(`${keynoteMediaBase}/page-19-driving.mp4`, [1.46, 60.37, 25.94, 17.22], { fit: "cover", label: "行驶状态" }),
    mediaItem(`${keynoteMediaBase}/page-19-warning.mp4`, [34.58, 60.37, 25.94, 17.22], { fit: "cover", label: "警告" }),
    mediaItem(`${keynoteMediaBase}/page-19-dialog.mp4`, [67.76, 60.37, 25.94, 17.22], { fit: "cover", label: "进入对话" }),
  ],
  "21": [
    mediaItem(`${keynoteMediaBase}/page-21-before.mp4`, [1.9, 55.2, 38.9, 33], { fit: "cover", label: "不带透镜" }),
    mediaItem(`${keynoteMediaBase}/page-21-after.mp4`, [42, 55.2, 38.2, 35.8], { fit: "contain", label: "边缘透镜效果" }),
  ],
  "23": [
    mediaItem(`${keynoteMediaBase}/page-23-doc-1.mp4`, [12.92, 68.15, 11.3, 10.56], { fit: "contain", label: "迎宾形态" }),
    mediaItem(`${keynoteMediaBase}/page-23-eyelid.mp4`, [33.33, 68.52, 14.58, 10.56], { fit: "contain", label: "眼皮状态" }),
    mediaItem(`${keynoteMediaBase}/page-23-welcome.mp4`, [53.96, 69.95, 13.33, 7.64], { fit: "contain", label: "迎宾视频" }),
    mediaItem(`${keynoteMediaBase}/page-23-greeting.mp4`, [75.52, 68.52, 12.5, 10.56], { fit: "contain", label: "呼吸灯状态" }),
  ],
  "24": [
    mediaItem(`${keynoteMediaBase}/page-24-attention-system.mp4`, [21.67, 31.48, 56.67, 56.94], { fit: "cover", label: "注意力系统" }),
  ],
  "25": [
    mediaItem(`${keynoteMediaBase}/page-25-eye-capture.mp4`, [21.67, 29.72, 56.67, 56.02], { fit: "cover", label: "人眼捕捉" }),
  ],
  "26": [
    mediaItem(`${keynoteMediaBase}/page-26-chatgpt-expression.mp4`, [15.42, 26.11, 69.17, 66.85], { fit: "cover", label: "ChatGPT 驱动表情" }),
  ],
  "27": [
    mediaItem(`${keynoteMediaBase}/page-27-eye-bind.mp4`, [4.53, 23.98, 56.67, 68.15], { fit: "cover", label: "眼睛绑定" }),
    mediaItem(`${keynoteMediaBase}/page-27-eye-bind-2.mp4`, [62.55, 23.89, 32.92, 67.96], { fit: "cover", label: "绑定面板" }),
  ],
  "28": [
    mediaItem(`${keynoteMediaBase}/page-28-oc-bubble.mp4`, [20.83, 70.37, 58.33, 18.52], { fit: "contain", label: "OC 气泡动效" }),
  ],
};

const keynoteProcessSlides = {
  "02": {
    variant: "question",
    background: true,
    title: "怎么升级",
  },
  "03": {
    variant: "shape",
    background: true,
    title: "从何开始？",
  },
  "04": {
    variant: "fur",
    background: true,
    title: "怎么毛绒化？",
  },
  "05": {
    variant: "styling",
    background: true,
    title: "为什么戴帽子？",
  },
  "06": {
    variant: "eye-shape",
    background: true,
    title: "眼睛形态应该是个啥样的？",
  },
  "07": {
    variant: "model",
    background: true,
    title: "要动起来\n必须得建模",
  },
  "08": {
    variant: "fur-detail",
    background: true,
    title: "如何攻克毛绒渲染效果？",
  },
  "09": {
    variant: "birth",
    background: true,
    title: "理想同学形象诞生",
  },
  "10": {
    variant: "route",
    background: true,
    title: "如何选择技术路径？",
  },
  "11": {
    variant: "delivery",
    background: true,
    title: "理想同学从设计到交付",
  },
  "12": {
    variant: "full-slide",
    background: true,
    title: "理想同学实体化",
  },
  "13": {
    variant: "full-slide",
    background: "notext",
    title: "同期复杂项目如何保证交付？",
    subtitle: "OTA7.4随着理想同学全新形象一起同期推出的产品还有  理想同学中心  和  4o小同桌\n除了加班加点还有什么方式能提效是我需要解决的",
    textLayers: [
      textLayer("title", "同期复杂项目如何保证交付？", [24, 4.8, 52, 9.5]),
      textLayer("subtitle", "OTA7.4随着理想同学全新形象一起同期推出的产品还有  理想同学中心  和  4o小同桌\n除了加班加点还有什么方式能提效是我需要解决的", [25.8, 14.7, 48.4, 6.6], { highlightTerms: ["理想同学中心", "4o小同桌"] }),
      textLayer("caption", "4o小同桌 可交互动画资源共计  378段动画资源", [20.1, 82.2, 33, 4.5], { highlightTerms: ["4o小同桌", "378段动画资源"] }),
      textLayer("caption", "理想同学中心共计  214段动画资源", [66.2, 82.2, 30, 4.5], { highlightTerms: ["214段动画资源"] }),
    ],
  },
  "14": {
    variant: "full-slide",
    background: "notext",
    title: "如何整合资源保障交付？",
    subtitle: "随着理想同学全新形象上线，需要确保一个月内将近 600段 的资源素材产出\n我负责把控整个项目节奏，团队协作中负责 补位协调 。",
    textLayers: [
      textLayer("title", "如何整合资源保障交付？", [27, 5, 46, 9.5]),
      textLayer("subtitle", "随着理想同学全新形象上线，需要确保一个月内将近 600段 的资源素材产出\n我主负责把控整个项目节奏，因为我最了解整个项目的进度以及所有的技术交付，所以我在团队协作中负责 补位协调 。", [16, 14.2, 68, 6.4], { highlightTerms: ["一个月内", "600段", "补位协调"] }),
      textLayer("columnTitle", "优先级", [23.4, 71.2, 15, 4.5]),
      textLayer("columnBody", "精力分配\n节省 85%\n保证基础体验\n将精力分配至高频场景", [23.4, 76.3, 18, 13], { highlightTerms: ["节省 85%"] }),
      textLayer("columnTitle", "流程分工", [49.2, 71.2, 18, 4.5]),
      textLayer("columnBody", "做最擅长的事\n3天变1天\n拆解流程各司其职\n分配动画、建模、交付", [49.2, 76.3, 20, 13], { highlightTerms: ["3天变1天"] }),
      textLayer("columnTitle", "AI提效", [77.5, 71.2, 15, 4.5]),
      textLayer("columnBody", "数字时钟167段素材\n减少 95% 时间\n利用AI编写\n视频切分压缩脚本", [77.5, 76.3, 21, 13], { highlightTerms: ["减少 95% 时间"] }),
      textLayer("subtitle", "团队中没有人会毛绒角色的建模，所以我在该项目中负责将所有的精力用在模型制作上，包括理想同学中心和4o的形象。\n动画部分，我将交付结构和动画模版分出去。", [14.5, 92.4, 71, 6.8]),
    ],
  },
  "15": {
    variant: "full-slide",
    background: true,
    title: "理想同学中心与 4o 小同桌交付",
  },
  "16": {
    variant: "full-slide",
    background: "notext",
    title: "AI实战怎么应用？",
    subtitle: "我在不断探索 Ai能力边界、AI生图当前阶段的最大问题就是 成功率 影响效率。",
    textLayers: [
      textLayer("title", "AI实战怎么应用？", [31, 5, 38, 9.5]),
      textLayer("subtitle", "我在不断探索 Ai能力边界、AI生图当前阶段的最大问题就是 成功率 影响效率。", [27.5, 15.5, 45, 5], { highlightTerms: ["Ai能力边界", "成功率"] }),
      textLayer("columnTitle", "批量工作流", [27.6, 76.3, 18, 4.5]),
      textLayer("columnBody", "通过API调用定制化生图工作流\n生图和视频效率\n提升 50%\n正向生图成功率和生图时间是损耗\n但是逆向筛选就能快很多", [27.6, 81.3, 24, 15.6], { highlightTerms: ["提升 50%"] }),
      textLayer("columnTitle", "应用", [69.8, 76.3, 12, 4.5]),
      textLayer("columnBody", "春节形象设计、app首页场景\n减少 90% 时间\n在一个方向上\n用海量资源中去做筛选好的形态", [69.8, 81.3, 24, 14], { highlightTerms: ["减少 90% 时间"] }),
    ],
  },
  "17": {
    variant: "full-slide",
    background: true,
    title: "AI 实战工作流",
  },
  "18": {
    variant: "full-slide",
    background: "notext",
    title: "Standby放射光怎么来的？",
    subtitle: "从抽象氛围到可交互视觉语言，先把方向跑通，再拆解成研发能实现的参数和状态",
    textLayers: [
      textLayer("title", "Standby放射光怎么来的？", [25, 5, 50, 9.5]),
      textLayer("subtitle", "从抽象氛围到可交互视觉语言，先把方向跑通，再拆解成研发能实现的参数和状态", [20, 15.5, 60, 5]),
      textLayer("label", "方案一", [12.5, 60.3, 12, 4]),
      textLayer("label", "方案二", [45.2, 60.3, 12, 4]),
      textLayer("label", "方案三", [77.8, 60.3, 12, 4]),
      textLayer("caption", "唤醒模式", [44, 91.2, 12, 4]),
    ],
  },
  "19": {
    variant: "full-slide",
    background: "notext",
    title: "光视觉语言的设想？",
    subtitle: "让光不只是装饰，而是能表达注意力、温度、能见度、行驶状态和提醒的视觉语言",
    textLayers: [
      textLayer("title", "光视觉语言的设想？", [28, 5, 44, 9.5]),
      textLayer("subtitle", "让光不只是装饰，而是能表达注意力、温度、能见度、行驶状态和提醒的视觉语言", [20, 15.5, 60, 5]),
      textLayer("label", "注意力", [10.8, 45.5, 10, 4]),
      textLayer("label", "温度感知", [42.5, 45.5, 14, 4]),
      textLayer("label", "能见度", [76, 45.5, 10, 4]),
      textLayer("label", "行驶状态", [9.8, 79.8, 14, 4]),
      textLayer("label", "警告", [44.5, 79.8, 10, 4]),
      textLayer("label", "进入对话", [75.2, 79.8, 14, 4]),
    ],
  },
  "20": {
    variant: "full-slide",
    background: true,
    title: "Standby 放射光",
  },
  "21": {
    variant: "full-slide",
    background: "notext",
    title: "技术验证有用吗？",
    subtitle: "我对SS4卡片质感材质进行了一轮视效的技术摸底，验证了一轮高斯玻璃在UI界面中效果的所有可能性",
    textLayers: [
      textLayer("title", "技术验证有用吗？", [31.5, 4.5, 37, 9.5]),
      textLayer("subtitle", "我对SS4卡片质感材质进行了一轮视效的技术摸底，验证了一轮高斯玻璃在UI界面中效果的所有可能性", [17.5, 15, 65, 5]),
      textLayer("label", "纯高斯（闪烁）", [14.6, 89.4, 18, 4]),
      textLayer("label", "带置换（不闪）", [55.2, 91.6, 18, 4]),
      textLayer("sideTitle", "液态玻璃", [82.5, 56.2, 13, 5]),
      textLayer("sideBody", "透明高斯会导致边缘闪烁\n边缘置换法线的使用逻辑", [82.5, 62, 16, 9]),
      textLayer("sideEmphasis", "解决闪烁", [82.5, 71.5, 14, 6]),
      textLayer("sideBody", "充分了解了\n这个技术路径的选择的原因", [82.5, 79.2, 16, 8]),
    ],
  },
  "22": {
    variant: "full-slide",
    background: true,
    title: "SS4 质感探索",
  },
  "23": {
    variant: "full-slide",
    background: "notext",
    title: "车如果有眼睛应该长啥样？",
    subtitle: "围绕迎宾、眼皮、呼吸灯和情绪状态，探索车端眼睛的形态边界",
    textLayers: [
      textLayer("title", "车如果有眼睛应该长啥样？", [22, 5, 56, 9.5]),
      textLayer("subtitle", "OC项目是需要做一个舱外的眼睛，如果只能做一个眼睛，那这个眼睛应该长啥样？\n我需要拆解流程，分步去思考怎么做这件事", [26.5, 16.2, 47, 6.5]),
      textLayer("columnTitle", "外形设计", [14, 28.9, 18, 4.5]),
      textLayer("columnBody", "在合理的形态框架内结合\n硬件边界\n去平衡形态样式\n设计不同的样式去感受\n美式、卡通、日式、皮克斯", [14, 33.9, 20, 15.5], { highlightTerms: ["硬件边界"] }),
      textLayer("columnTitle", "真实感", [36.1, 28.9, 18, 4.5]),
      textLayer("columnBody", "真实感灵动感设计需要\n面部捕捉\n做数据驱动\n加入最自然的生理状态", [36.1, 33.9, 20, 12.4], { highlightTerms: ["面部捕捉"] }),
      textLayer("columnTitle", "情感表达", [56.1, 28.9, 18, 4.5]),
      textLayer("columnBody", "构建一个动态驱动系统的\n原型绑定\n负责驱动控制其\n注意力、情绪、真实感", [56.1, 33.9, 20, 12.4], { highlightTerms: ["原型绑定"] }),
      textLayer("columnTitle", "原型构建", [76.2, 28.9, 18, 4.5]),
      textLayer("columnBody", "对话需要接入LLM\nAI驱动\n串联传感器、Agent、驱动器\n将其构建出一个prototype", [76.2, 33.9, 21, 12.4], { highlightTerms: ["AI驱动"] }),
      textLayer("label", "demo", [47.5, 56.8, 5, 4]),
    ],
  },
  "24": {
    variant: "full-slide",
    background: "notext",
    title: "如何驱动眼睛？",
    subtitle: "设计注意力系统，用来判断注意力对象。通过摄像头捕捉，获得一个 注意力锚点\n将锚点的坐标传递至驱动器，从而实现注意力观察的效果",
    textLayers: [
      textLayer("title", "如何驱动眼睛？", [32, 5, 36, 9.5]),
      textLayer("subtitle", "设计注意力系统，用来判断注意力对象。通过摄像头捕捉，获得一个 注意力锚点\n将锚点的坐标传递至驱动器，从而实现注意力观察的效果", [27, 16.1, 46, 6.5], { highlightTerms: ["注意力系统", "注意力锚点"] }),
    ],
  },
  "25": {
    variant: "full-slide",
    background: "notext",
    title: "真实感如何用做？",
    subtitle: "通过人眼捕捉和眨眼节奏分析，把真实感拆成可复用的运动规律",
    textLayers: [
      textLayer("title", "真实感如何用做？", [31, 5, 38, 9.5]),
      textLayer("subtitle", "通过人眼捕捉和眨眼节奏分析，把真实感拆成可复用的运动规律", [24, 15.5, 52, 5]),
    ],
  },
  "26": {
    variant: "full-slide",
    background: "notext",
    title: "如何串联工作？",
    subtitle: "把表情驱动、工具链和实时反馈串在一起，减少从设计到验证之间的断点",
    textLayers: [
      textLayer("title", "如何串联工作？", [32, 5, 36, 9.5]),
      textLayer("subtitle", "把表情驱动、工具链和实时反馈串在一起，减少从设计到验证之间的断点", [22, 15.5, 56, 5]),
    ],
  },
  "27": {
    variant: "full-slide",
    background: "notext",
    title: "眼睛都长不一样怎么驱动？",
    subtitle: "把不同眼型抽象成统一绑定关系，让动画逻辑能迁移到不同形态",
    textLayers: [
      textLayer("title", "眼睛都长不一样怎么驱动？", [20, 5, 60, 9.5]),
      textLayer("subtitle", "把不同眼型抽象成统一绑定关系，让动画逻辑能迁移到不同形态", [24, 15.5, 52, 5]),
    ],
  },
  "28": {
    variant: "full-slide",
    background: true,
    title: "实际业务场景如何应用？",
    subtitle: "基于实际业务中的沟通状态，把眼睛和气泡动画组合成更明确的反馈方式",
    textLayers: [
      textLayer("title", "实际业务场景如何应用？", [23, 5, 54, 9.5]),
      textLayer("subtitle", "基于实际业务中的沟通状态，把眼睛和气泡动画组合成更明确的反馈方式", [22, 15.5, 56, 5]),
    ],
  },
  "29": {
    variant: "full-slide",
    background: true,
    title: "OC 眼睛",
  },
  "30": {
    variant: "full-slide",
    background: true,
    title: "结果与方法沉淀",
  }
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
  return Array.isArray(value) && value.length === orderedPages.length;
}

function getDefaultPages() {
  return isCurrentPageSet(savedContent.pages) ? orderPagesForStory(savedContent.pages) : orderedPages;
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

function getMediaProgressFromVideo(video) {
  if (!video?.duration || Number.isNaN(video.duration) || !video.buffered?.length) {
    return video?.readyState >= HTMLMediaElement.HAVE_METADATA ? 42 : 18;
  }

  const bufferedEnd = video.buffered.end(video.buffered.length - 1);
  return Math.max(18, Math.min(96, Math.round((bufferedEnd / video.duration) * 100)));
}

function recordMediaLoadEvent(node, detail) {
  if (typeof window === "undefined" || !node) return;

  const section = node.closest?.(".hero-section, .case-section");
  window.__suhaoMediaTimeline = window.__suhaoMediaTimeline || [];
  window.__suhaoMediaTimeline.push({
    time: Math.round(performance.now()),
    page: section?.id || "unknown",
    ...detail,
  });
}

function MediaLoadOverlay({ status, progress = 0 }) {
  if (status === "ready" || status === "queued") return null;

  const safeProgress = Math.max(8, Math.min(96, progress || 8));
  const text = status === "error" ? "RETRY" : "LOADING";

  return (
    <span className={`media-load-overlay is-${status}`} aria-hidden="true">
      <span className="media-load-copy">
        <span>{text}</span>
      </span>
      <span className="media-load-track">
        <span style={{ width: `${safeProgress}%` }} />
      </span>
    </span>
  );
}

function LazyVideo({
  src,
  className = "",
  style,
  poster,
  preload = "metadata",
  rootMargin = "1200px 0px",
  showLoader = true,
  ...props
}) {
  const videoRef = useRef(null);
  const isReadyRef = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loadStatus, setLoadStatus] = useState(src ? "queued" : "ready");
  const [loadProgress, setLoadProgress] = useState(0);
  const { onLoadedData, onCanPlay, onError, onProgress, onLoadedMetadata, onWaiting, onPlaying, ...videoProps } = props;

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return undefined;

    const loadIfNearViewport = () => {
      const rect = node.getBoundingClientRect();
      const preloadMargin = window.innerHeight * 1.6;
      if (rect.top < window.innerHeight + preloadMargin && rect.bottom > -preloadMargin) {
        setShouldLoad(true);
        return true;
      }

      return false;
    };

    if (loadIfNearViewport()) return undefined;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    window.addEventListener("scroll", loadIfNearViewport, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", loadIfNearViewport);
    };
  }, [rootMargin]);

  useEffect(() => {
    const video = videoRef.current;
    isReadyRef.current = false;

    if (!src) {
      setLoadStatus("ready");
      setLoadProgress(100);
      return;
    }

    if (shouldLoad && video && (video.readyState >= 2 || !video.paused)) {
      isReadyRef.current = true;
      setLoadStatus("ready");
      setLoadProgress(100);
      return;
    }

    setLoadStatus(shouldLoad ? "loading" : "queued");
    setLoadProgress(shouldLoad ? 18 : 0);
  }, [src, shouldLoad]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    recordMediaLoadEvent(video, {
      type: "video",
      state: "start",
      src,
    });
  }, [src, shouldLoad]);

  const markLoading = (event, nextProgress) => {
    if (isReadyRef.current || event.currentTarget.readyState >= 2 || !event.currentTarget.paused) {
      setLoadStatus("ready");
      setLoadProgress(100);
      isReadyRef.current = true;
      return;
    }

    setLoadStatus("loading");
    setLoadProgress(nextProgress ?? getMediaProgressFromVideo(event.currentTarget));
  };

  const markReady = (event) => {
    isReadyRef.current = true;
    setLoadStatus("ready");
    setLoadProgress(100);
    recordMediaLoadEvent(event.currentTarget, {
      type: "video",
      state: "ready",
      src,
    });
  };

  return (
    <>
      <video
        {...videoProps}
        ref={videoRef}
        className={className}
        src={shouldLoad ? src : undefined}
        poster={poster}
        preload={shouldLoad ? preload : "none"}
        style={style}
        data-media-state={loadStatus}
        onLoadedMetadata={(event) => {
          markLoading(event, 42);
          onLoadedMetadata?.(event);
        }}
        onProgress={(event) => {
          markLoading(event);
          onProgress?.(event);
        }}
        onLoadedData={(event) => {
          markReady(event);
          onLoadedData?.(event);
        }}
        onCanPlay={(event) => {
          markReady(event);
          onCanPlay?.(event);
        }}
        onPlaying={(event) => {
          markReady(event);
          onPlaying?.(event);
        }}
        onWaiting={(event) => {
          markLoading(event);
          onWaiting?.(event);
        }}
        onError={(event) => {
          setLoadStatus("error");
          setLoadProgress(100);
          recordMediaLoadEvent(event.currentTarget, {
            type: "video",
            state: "error",
            src,
          });
          onError?.(event);
        }}
      />
      {showLoader ? (
        <MediaLoadOverlay
          status={loadStatus}
          progress={loadProgress}
        />
      ) : null}
    </>
  );
}

function LazyImage({
  src,
  alt = "",
  className = "",
  style,
  loading = "lazy",
  rootMargin = "1200px 0px",
  showLoader = true,
  immediate = false,
  ...props
}) {
  const imageRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(immediate);
  const [loadStatus, setLoadStatus] = useState(immediate ? "loading" : "queued");
  const [loadProgress, setLoadProgress] = useState(immediate ? 30 : 0);
  const { onLoad, onError, ...imageProps } = props;

  useEffect(() => {
    const node = imageRef.current;
    if (!node || shouldLoad) return undefined;

    const loadIfNearViewport = () => {
      const rect = node.getBoundingClientRect();
      const preloadMargin = window.innerHeight * 1.7;
      if (rect.top < window.innerHeight + preloadMargin && rect.bottom > -preloadMargin) {
        setShouldLoad(true);
        return true;
      }

      return false;
    };

    if (loadIfNearViewport()) return undefined;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    window.addEventListener("scroll", loadIfNearViewport, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", loadIfNearViewport);
    };
  }, [rootMargin, shouldLoad]);

  useEffect(() => {
    const image = imageRef.current;

    if (immediate) {
      setShouldLoad(true);
      if (image?.complete && image.naturalWidth > 0) {
        setLoadStatus("ready");
        setLoadProgress(100);
      } else {
        setLoadStatus("loading");
        setLoadProgress(30);
      }
      return;
    }

    if (shouldLoad && image?.complete && image.naturalWidth > 0) {
      setLoadStatus("ready");
      setLoadProgress(100);
      return;
    }

    setLoadStatus(shouldLoad ? "loading" : "queued");
    setLoadProgress(shouldLoad ? 30 : 0);
  }, [src, shouldLoad, immediate]);

  useEffect(() => {
    const image = imageRef.current;
    if (!image || !shouldLoad) return;

    recordMediaLoadEvent(image, {
      type: "image",
      state: "start",
      src,
    });
  }, [src, shouldLoad]);

  return (
    <>
      <img
        {...imageProps}
        ref={imageRef}
        className={className}
        src={shouldLoad ? src : undefined}
        data-src={shouldLoad ? undefined : src}
        alt={alt}
        loading={loading}
        decoding="async"
        style={style}
        data-media-state={loadStatus}
        onLoad={(event) => {
          setLoadStatus("ready");
          setLoadProgress(100);
          recordMediaLoadEvent(event.currentTarget, {
            type: "image",
            state: "ready",
            src,
          });
          onLoad?.(event);
        }}
        onError={(event) => {
          setLoadStatus("error");
          setLoadProgress(100);
          recordMediaLoadEvent(event.currentTarget, {
            type: "image",
            state: "error",
            src,
          });
          onError?.(event);
        }}
      />
      {showLoader ? (
        <MediaLoadOverlay
          status={loadStatus}
          progress={loadProgress}
        />
      ) : null}
    </>
  );
}

function PageBackdrop({ backdrop }) {
  if (!backdrop) return null;

  return (
    <div className={`page-backdrop ${backdrop.className}`} aria-hidden="true">
      {backdrop.type === "video" ? (
        <LazyVideo src={backdrop.src} autoPlay muted loop playsInline preload="metadata" showLoader={false} />
      ) : (
        <LazyImage src={backdrop.src} alt="" showLoader={false} />
      )}
    </div>
  );
}

function StoryMedia({ item, className = "", loading = "lazy" }) {
  const mediaClassName = `character-story-media ${item.tone ? `is-${item.tone}` : ""} ${className}`.trim();

  if (item.type === "video" || item.src.endsWith(".mp4")) {
    const poster = item.poster || item.src.replace("/assets/character-process/", "/assets/character-process/posters/").replace(".mp4", ".webp");

    return (
      <LazyVideo
        className={mediaClassName}
        src={item.src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        aria-label={item.label}
      />
    );
  }

  return <LazyImage className={mediaClassName} src={item.src} alt={item.label || ""} loading={loading} />;
}

function KeynoteMedia({ item }) {
  const mediaRole = item.type === "video" ? "is-video" : "is-image";
  const mediaStyle = item.fit ? { objectFit: item.fit } : undefined;

  const content = item.type === "video" ? (
    <LazyVideo
      src={item.src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      rootMargin="1800px 0px"
      aria-label={item.label}
      style={mediaStyle}
    />
  ) : (
    <LazyImage src={item.src} alt={item.label || ""} loading="lazy" style={mediaStyle} />
  );

  return (
    <figure
      className={`keynote-media-window ${mediaRole} ${item.className || ""}`.trim()}
      style={item.style}
    >
      {content}
      {item.label ? <figcaption>{item.label}</figcaption> : null}
    </figure>
  );
}

function flattenKeynoteMediaItems(pagesSource = []) {
  return pagesSource.flatMap((page) => {
    if (page.demo !== "keynoteSlide") return [];

    const slideData = keynoteProcessSlides[page.slide] || {};
    return [...(slideData.media || []), ...(keynoteSlideMedia[page.slide] || [])];
  });
}

const warmedKeynoteAssets = new Set();

function warmKeynoteAsset(src) {
  if (!src || warmedKeynoteAssets.has(src)) return;
  warmedKeynoteAssets.add(src);

  const isVideo = src.endsWith(".mp4") || src.endsWith(".mov");
  if (isVideo) {
    return;
  }

  const image = new Image();
  image.decoding = "async";
  image.src = src;
}

function useKeynoteAssetWarmup(pagesSource, activePageIndex) {
  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const mediaItems = flattenKeynoteMediaItems(pagesSource);
    const backgroundItems = pagesSource
      .filter((page) => page.demo === "keynoteSlide")
      .map((page) => `/assets/character-keynote/slides/page-${page.slide}.jpg`);
    const mediaBySrc = new Map(
      [...backgroundItems.map((src) => ({ src })), ...mediaItems].map((item) => [item.src, item]),
    );

    const orderedSlides = [];
    for (let offset = 0; offset <= 8; offset += 1) {
      const page = pagesSource[activePageIndex + offset];
      if (page?.demo === "keynoteSlide") {
        orderedSlides.push(page);
      }
    }

    const queue = [];
    orderedSlides.forEach((page) => {
      const slideSrc = `/assets/character-keynote/slides/page-${page.slide}.jpg`;
      queue.push(slideSrc);
      (keynoteSlideMedia[page.slide] || []).forEach((item) => queue.push(item.src));
    });

    let cancelled = false;
    const seen = new Set();
    const uniqueQueue = queue.filter((src) => {
      if (!mediaBySrc.has(src) || seen.has(src)) return false;
      seen.add(src);
      return true;
    });

    const warmNext = (index = 0) => {
      if (cancelled || index >= uniqueQueue.length) return;
      warmKeynoteAsset(uniqueQueue[index]);
      window.setTimeout(() => warmNext(index + 1), index < 3 ? 180 : 420);
    };

    const start = window.requestIdleCallback
      ? window.requestIdleCallback(() => warmNext(), { timeout: 900 })
      : window.setTimeout(() => warmNext(), 220);

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback && typeof start === "number") {
        window.cancelIdleCallback(start);
      } else {
        window.clearTimeout(start);
      }
    };
  }, [activePageIndex, pagesSource]);
}

function KeynoteSlide({ slide, title }) {
  const data = keynoteProcessSlides[slide];
  if (!data) return null;

  const hasSlideBackground = Boolean(data.background);
  const useHtmlTextLayer = data.background === "notext" || htmlTextSlides.has(slide);
  const backgroundSrc = data.background === "notext"
    ? `/assets/character-keynote/slides-notext/page-${slide}.jpg`
    : typeof data.background === "string"
      ? data.background
      : `/assets/character-keynote/slides/page-${slide}.jpg`;
  const mediaItems = [...(data.media || []), ...(keynoteSlideMedia[slide] || [])];

  return (
    <div className={`keynote-slide-stage keynote-${data.variant}${useHtmlTextLayer ? " has-html-text" : ""}`} aria-label={title}>
      {hasSlideBackground ? (
        <LazyImage
          className="keynote-slide-background"
          src={backgroundSrc}
          alt=""
          aria-hidden="true"
          loading="lazy"
          showLoader={false}
        />
      ) : null}

      {useHtmlTextLayer ? (
        <div className="keynote-html-text-layer" aria-hidden="true">
          {(data.textLayers || []).map((item, index) => (
            <p
              className={`keynote-html-text keynote-html-${item.kind} ${item.className || ""}`.trim()}
              style={item.style}
              key={`${item.kind}-${item.text}-${index}`}
            >
              {emphasizeText(item.text, item.highlightTerms)}
            </p>
          ))}
        </div>
      ) : null}

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

      <span className="keynote-page-number" aria-hidden="true">{slide}</span>

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
  const streamImages = [...images, ...images, ...images];

  useEffect(() => {
    let frameId;
    let lastTime = performance.now();
    let offset = 0;
    let direction = 1;
    const speed = 18;

    const tick = (time) => {
      const track = trackRef.current;
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      if (track) {
        const viewportWidth = track.parentElement?.clientWidth || 0;
        const maxOffset = Math.max(0, track.scrollWidth - viewportWidth);

        if (maxOffset > 0) {
          offset += speed * direction * delta;
          if (offset >= maxOffset) {
            offset = maxOffset;
            direction = -1;
          } else if (offset <= 0) {
            offset = 0;
            direction = 1;
          }
        } else {
          offset = 0;
        }

        track.style.transform = `translate3d(${-offset}px, 0, 0)`;
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
          {streamImages.map((item, index) => (
            <button
              className="ai-stream-item"
              type="button"
              key={`${item.src}-${index}`}
              onClick={() => setPreviewImage(item)}
              aria-label={`打开${item.title}大图`}
            >
              <LazyImage src={item.src} alt="" loading="lazy" />
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
            <LazyImage src={previewImage.src} alt={previewImage.title} loading="eager" immediate />
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
                  <LazyImage src={item.src} alt={`${item.label} 理想同学实体化素材`} loading="lazy" />
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
          <LazyVideo src={item.src} muted autoPlay loop playsInline preload="metadata" />
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
                    <LazyImage src={item.src} alt={item.label} loading="lazy" />
                  ) : (
                    <LazyVideo src={item.src} muted autoPlay loop playsInline preload="metadata" />
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
              <LazyVideo
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
            <LazyVideo src={item.src} autoPlay muted loop playsInline preload="metadata" />
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
      <span className="hero-page-number" aria-hidden="true">01</span>
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
        <LazyImage src="/assets/final-summary-banner.webp" alt="" />
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

function useNearViewport(rootMargin = "1600px 0px") {
  const ref = useRef(null);
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || isNear) return undefined;

    const checkIfNear = () => {
      const rect = node.getBoundingClientRect();
      const preloadMargin = window.innerHeight * 1.8;
      if (rect.top < window.innerHeight + preloadMargin && rect.bottom > -preloadMargin) {
        setIsNear(true);
        return true;
      }

      return false;
    };

    if (checkIfNear()) return undefined;

    if (!("IntersectionObserver" in window)) {
      setIsNear(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNear(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(node);
    window.addEventListener("scroll", checkIfNear, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", checkIfNear);
    };
  }, [isNear, rootMargin]);

  return [ref, isNear];
}

function DeferredDemo({ active, children, label = "MODULE" }) {
  const [ref, isNear] = useNearViewport("1800px 0px");

  return (
    <div className="deferred-demo-mount" ref={ref}>
      {active || isNear ? children : (
        <MediaLoadOverlay status="queued" progress={12} label={label} />
      )}
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
  const isFinalSummaryPage = index === orderedPages.length - 1;
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
        <DeferredDemo active={isActive} label="RADIANCE">
          <StandbyRadianceDemo />
        </DeferredDemo>
      ) : page.demo === "fluidGlass" ? (
        <DeferredDemo active={isActive} label="SS4 MATERIAL">
          <SS4FluidGlassDemo />
        </DeferredDemo>
      ) : page.demo === "gaussianSplat" ? (
        <DeferredDemo active={isActive} label="GAUSSIAN SPLAT">
          <GaussianSplatDemo />
        </DeferredDemo>
      ) : page.demo === "scrollStack" ? (
        <DeferredDemo active={isActive} label="LI CENTER">
          <LiCenterScrollStackDemo />
        </DeferredDemo>
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
  const [pendingPillHref, setPendingPillHref] = useState(null);
  const pendingPillTimeoutRef = useRef(null);
  const pageCount = useMemo(() => contentPages.length, [contentPages.length]);
  const notesCount = useMemo(
    () => Object.values(notes).filter((value) => value?.trim()).length,
    [notes],
  );
  const activeMode = activeVisualMode;
  const activePillHref = getActivePillHref(activePageIndex);
  const displayedPillHref = pendingPillHref ?? activePillHref;
  useKeynoteAssetWarmup(contentPages, activePageIndex);

  useEffect(() => {
    if (!pendingPillHref || activePillHref !== pendingPillHref) return undefined;

    const clearPendingPill = window.setTimeout(() => {
      setPendingPillHref(null);
    }, 160);

    return () => window.clearTimeout(clearPendingPill);
  }, [activePillHref, pendingPillHref]);

  useEffect(() => {
    return () => {
      if (pendingPillTimeoutRef.current) {
        window.clearTimeout(pendingPillTimeoutRef.current);
      }
    };
  }, []);

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

      const alignTarget = () => {
        window.scrollTo({ top: target.offsetTop, behavior: "auto" });
        const nextIndex = Number(targetId.replace("page-", "")) - 1;
        if (!Number.isNaN(nextIndex)) {
          setActivePageIndex(nextIndex);
        }
      };

      window.requestAnimationFrame(() => {
        alignTarget();
        window.setTimeout(alignTarget, 120);
        window.setTimeout(alignTarget, 420);
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
          activeHref={displayedPillHref}
          baseColor="#f5f5f0"
          pillColor="#08080a"
          hoveredPillTextColor="#08080a"
          pillTextColor="#f5f5f0"
          initialLoadAnimation
          onNavigate={(item) => {
            setNavOpen(false);
            if (!item?.href) return;

            setPendingPillHref(item.href);
            const nextIndex = getPageIndexFromHref(item.href);
            if (nextIndex !== null) {
              setActivePageIndex(nextIndex);
            }

            if (pendingPillTimeoutRef.current) {
              window.clearTimeout(pendingPillTimeoutRef.current);
            }

            pendingPillTimeoutRef.current = window.setTimeout(() => {
              setPendingPillHref(null);
              pendingPillTimeoutRef.current = null;
            }, 1800);
          }}
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
