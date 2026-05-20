import { Component, Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import {
  ClipboardCheck,
  ClipboardList,
  Eye,
  EyeOff,
  Film,
  Images,
  PencilLine,
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
    "eyebrow": "02 / Overview",
    "title": "能力总览与项目历程",
    "demo": "capabilityTimeline",
    "conclusion": "能力：专业手头功夫；职业协同决策；技术探索与业务转化",
    "intro": "我将自身能力沉淀为三个层次：立身之本的专业技术、推进复杂项目的职业素养、以及不断突破边界的技术探索能力。",
    "points": [
      {
        "label": "专业能力",
        "text": "深耕 3D 角色设计与产品动效多年，具备扎实的“手头功夫”。能够精准把控形体、材质、动画节奏与交互体验，将高品质的视觉效果完美落地。"
      },
      {
        "label": "协同能力",
        "text": "跨越职业壁垒与技术盲区，率先完成方案验证并赋能团队，承担关键衔接作用（对应：车端语音形象协同、放空放射光落地）"
      },
      {
        "label": "创新能力",
        "text": "保持敏锐，善于结合与吸收 AI 等新技术。能够快速摸清技术的边界，并将其转化为解决实际业务痛点、提升团队设计效能的落地流程。"
      }
    ],
    "timeline": [
      {
        "time": "2024 Q4",
        "label": "理想同学实体化",
        "text": "从平面符号推进到实体化形象，完成理想汽车全新理想同学形象建设。"
      },
      {
        "time": "2025 Q1",
        "label": "理想同学中心",
        "text": "主导了理想同学中心设计（首页、毛绒时钟和场景交互动画），推动视觉素材、动效和研发还原落地。"
      },
      {
        "time": "2025 Q2",
        "label": "4o 小同桌 / OTA 7.4",
        "text": "负责了OTA7.4与4o小同桌的多角色、多状态和多端项目的落地交付。"
      },
      {
        "time": "2025 Q3",
        "label": "AI 工作流与 Standby 原型",
        "text": "探索 AI 批量生成、筛选、视频处理提供业务交付效率；探索全新AI技术路径完成光效原型设计"
      },
      {
        "time": "2025 Q4",
        "label": "OC 眼睛与未来体验",
        "text": "主导完成OC眼镜形态的设计，构建注意力系统的表达方式，为舱外交互建立基础。"
      }
    ]
  },
  {
    "eyebrow": "03 / Character Key Question",
    "title": "理想同学实体化｜关键问题",
    "detailType": "problem",
    "parentTitle": "理想同学实体化",
    "conclusion": "待补充：这个项目最关键的问题、判断边界和需要解决的核心矛盾。",
    "intro": "待补充。",
    "points": [
      {
        "label": "关键问题",
        "text": "待补充。"
      },
      {
        "label": "判断标准",
        "text": "待补充。"
      },
      {
        "label": "业务约束",
        "text": "待补充。"
      }
    ]
  },
  {
    "eyebrow": "04 / Character Process",
    "title": "理想同学实体化｜过程解法",
    "detailType": "process",
    "parentTitle": "理想同学实体化",
    "conclusion": "待补充：这个项目的推进过程、方案拆解、技术路径和最终解法。",
    "intro": "待补充。",
    "points": [
      {
        "label": "过程路径",
        "text": "待补充。"
      },
      {
        "label": "解法拆解",
        "text": "待补充。"
      },
      {
        "label": "沉淀结果",
        "text": "待补充。"
      }
    ]
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
    "eyebrow": "06 / Delivery Key Question",
    "title": "理想同学中心与 4o 小同桌交付｜关键问题",
    "detailType": "problem",
    "parentTitle": "理想同学中心与 4o 小同桌交付",
    "conclusion": "待补充：这个项目最关键的问题、判断边界和需要解决的核心矛盾。",
    "intro": "待补充。",
    "points": [
      {
        "label": "关键问题",
        "text": "待补充。"
      },
      {
        "label": "判断标准",
        "text": "待补充。"
      },
      {
        "label": "业务约束",
        "text": "待补充。"
      }
    ]
  },
  {
    "eyebrow": "07 / Delivery Process",
    "title": "理想同学中心与 4o 小同桌交付｜过程解法",
    "detailType": "process",
    "parentTitle": "理想同学中心与 4o 小同桌交付",
    "conclusion": "待补充：这个项目的推进过程、方案拆解、技术路径和最终解法。",
    "intro": "待补充。",
    "points": [
      {
        "label": "过程路径",
        "text": "待补充。"
      },
      {
        "label": "解法拆解",
        "text": "待补充。"
      },
      {
        "label": "沉淀结果",
        "text": "待补充。"
      }
    ]
  },
  {
    "eyebrow": "08 / Delivery",
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
    "eyebrow": "09 / AI Workflow Key Question",
    "title": "AI 实战工作流｜关键问题",
    "detailType": "problem",
    "parentTitle": "AI 实战工作流",
    "conclusion": "待补充：这个项目最关键的问题、判断边界和需要解决的核心矛盾。",
    "intro": "待补充。",
    "points": [
      {
        "label": "关键问题",
        "text": "待补充。"
      },
      {
        "label": "判断标准",
        "text": "待补充。"
      },
      {
        "label": "业务约束",
        "text": "待补充。"
      }
    ]
  },
  {
    "eyebrow": "10 / AI Workflow Process",
    "title": "AI 实战工作流｜过程解法",
    "detailType": "process",
    "parentTitle": "AI 实战工作流",
    "conclusion": "待补充：这个项目的推进过程、方案拆解、技术路径和最终解法。",
    "intro": "待补充。",
    "points": [
      {
        "label": "过程路径",
        "text": "待补充。"
      },
      {
        "label": "解法拆解",
        "text": "待补充。"
      },
      {
        "label": "沉淀结果",
        "text": "待补充。"
      }
    ]
  },
  {
    "eyebrow": "11 / AI Workflow",
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
    "eyebrow": "12 / Prototype Key Question",
    "title": "Standby 放射光｜关键问题",
    "detailType": "problem",
    "parentTitle": "Standby 放射光",
    "conclusion": "待补充：这个项目最关键的问题、判断边界和需要解决的核心矛盾。",
    "intro": "待补充。",
    "points": [
      {
        "label": "关键问题",
        "text": "待补充。"
      },
      {
        "label": "判断标准",
        "text": "待补充。"
      },
      {
        "label": "业务约束",
        "text": "待补充。"
      }
    ]
  },
  {
    "eyebrow": "13 / Prototype Process",
    "title": "Standby 放射光｜过程解法",
    "detailType": "process",
    "parentTitle": "Standby 放射光",
    "conclusion": "待补充：这个项目的推进过程、方案拆解、技术路径和最终解法。",
    "intro": "待补充。",
    "points": [
      {
        "label": "过程路径",
        "text": "待补充。"
      },
      {
        "label": "解法拆解",
        "text": "待补充。"
      },
      {
        "label": "沉淀结果",
        "text": "待补充。"
      }
    ]
  },
  {
    "eyebrow": "14 / Prototype",
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
    "eyebrow": "15 / Material Study Key Question",
    "title": "SS4 质感探索｜关键问题",
    "detailType": "problem",
    "parentTitle": "SS4 质感探索",
    "conclusion": "待补充：这个项目最关键的问题、判断边界和需要解决的核心矛盾。",
    "intro": "待补充。",
    "points": [
      {
        "label": "关键问题",
        "text": "待补充。"
      },
      {
        "label": "判断标准",
        "text": "待补充。"
      },
      {
        "label": "业务约束",
        "text": "待补充。"
      }
    ]
  },
  {
    "eyebrow": "16 / Material Study Process",
    "title": "SS4 质感探索｜过程解法",
    "detailType": "process",
    "parentTitle": "SS4 质感探索",
    "conclusion": "待补充：这个项目的推进过程、方案拆解、技术路径和最终解法。",
    "intro": "待补充。",
    "points": [
      {
        "label": "过程路径",
        "text": "待补充。"
      },
      {
        "label": "解法拆解",
        "text": "待补充。"
      },
      {
        "label": "沉淀结果",
        "text": "待补充。"
      }
    ]
  },
  {
    "eyebrow": "17 / Material Study",
    "title": "SS4 质感探索",
    "demo": "fluidGlass",
    "conclusion": "先行做技术路径的示效探索，通过流体玻璃的折射、透光和动态形变，验证 SS4 界面质感中透明层次与动态材质的表达方式。",
    "intro": "通过 3D 动效先去验证目前技术路径所有可实现的效果，然后再逐渐收敛成 SS4 系统的 UI 材质参数效果。提供视效玻璃质感技术实现的思路给到技术。",
    "points": []
  },
  {
    "eyebrow": "18 / OC Eyes Key Question",
    "title": "OC 眼睛｜关键问题",
    "detailType": "problem",
    "parentTitle": "OC 眼睛",
    "conclusion": "待补充：这个项目最关键的问题、判断边界和需要解决的核心矛盾。",
    "intro": "待补充。",
    "points": [
      {
        "label": "关键问题",
        "text": "待补充。"
      },
      {
        "label": "判断标准",
        "text": "待补充。"
      },
      {
        "label": "业务约束",
        "text": "待补充。"
      }
    ]
  },
  {
    "eyebrow": "19 / OC Eyes Process",
    "title": "OC 眼睛｜过程解法",
    "detailType": "process",
    "parentTitle": "OC 眼睛",
    "conclusion": "待补充：这个项目的推进过程、方案拆解、技术路径和最终解法。",
    "intro": "待补充。",
    "points": [
      {
        "label": "过程路径",
        "text": "待补充。"
      },
      {
        "label": "解法拆解",
        "text": "待补充。"
      },
      {
        "label": "沉淀结果",
        "text": "待补充。"
      }
    ]
  },
  {
    "eyebrow": "20 / OC Eyes",
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
    "eyebrow": "21 / Summary",
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
const CONTENT_STORAGE_VERSION = "2026-05-20-21page-project-detail-shell-v1";

const activeVisualMode = {
  id: "space",
  label: "Tag 1",
  name: "home",
  desc: "巨型标题 / 黑白空间 / 科技卡片",
  Icon: Orbit,
};

const pillNavItems = [
  { label: "Intro", href: "#page-1" },
  { label: "Overview", href: "#page-2" },
  { label: "Character", href: "#page-3" },
  { label: "Delivery", href: "#page-6" },
  { label: "AI", href: "#page-9" },
  { label: "Light", href: "#page-12" },
  { label: "Glass", href: "#page-15" },
  { label: "OC", href: "#page-18" },
  { label: "Sum", href: "#page-21" },
];

function getActivePillHref(activePageIndex) {
  const pageNumber = activePageIndex + 1;

  if (pageNumber <= 2) return `#page-${pageNumber}`;
  if (pageNumber <= 5) return "#page-3";
  if (pageNumber <= 8) return "#page-6";
  if (pageNumber <= 11) return "#page-9";
  if (pageNumber <= 14) return "#page-12";
  if (pageNumber <= 17) return "#page-15";
  if (pageNumber <= 20) return "#page-18";
  return "#page-21";
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
