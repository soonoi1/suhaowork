import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

const media = {
  homeCenter: "/assets/cases/home-center.mp4",
  homeAlarm: "/assets/cases/home-alarm.mp4",
  homeDraw: "/assets/cases/home-draw.mp4",
  homeFestival: "/assets/cases/home-festival.mp4",
  gaussMain: "/assets/cases/gauss-main.mp4",
  gaussEngine: "/assets/cases/gauss-engine.mp4",
  ocAttention: "/assets/cases/oc-attention.mp4",
  ocPickup: "/assets/cases/oc-pickup.mp4",
  ocParking: "/assets/cases/oc-parking.mp4",
  otaUpdate: "/assets/cases/ota-update.mp4",
  otaDesk: "/assets/cases/ota-desk.mp4",
  otaTheater: "/assets/cases/ota-theater.mp4",
  appFlow: "/assets/cases/app-flow.mp4",
  appCoffee: "/assets/cases/app-coffee.mp4",
  appMusic: "/assets/cases/app-music.mp4",
  radiantAttention: "/assets/cases/radiant-attention.mp4",
  radiantColor: "/assets/cases/radiant-color.mp4",
  radiantSpeak: "/assets/cases/radiant-speak.mp4",
  entityDark: "/assets/cases/entity-dark.png",
  entityDefault: "/assets/cases/entity-default.png",
  workflowComfy: "/assets/cases/workflow-comfyui.png",
  workflowChat: "/assets/cases/workflow-chatgpt.png",
  workflowLamp: "/assets/cases/workflow-ai-lamp.jpg",
  workflowOptions: "/assets/cases/workflow-ai-options.jpg",
  otaScene: "/assets/cases/ota-scene-dark.png",
  otaCharacters: "/assets/cases/ota-characters.png",
};

const cases = [
  {
    layout: "home-orbit",
    dimension: "决断力",
    principle: "创造用户价值",
    eyebrow: "01 / HOME CENTER",
    title: "理想同学中心首页设计",
    summary: "把首页从视觉承载页推进为能力理解入口，让用户看得懂、愿意用，也能承接后续活动与新能力。",
    problem: "首页需要同时承担能力传达、内容组织和长期运营入口。如果只追求炫目动效，用户会很快疲劳；如果只做静态陈列，又无法建立理想同学新能力的感知。",
    strategy: "重新组织信息层级，判断不同动效的露出频率：轻量、低打扰动效提高出现频次，高反馈、长时长动效降低重复露出，并在结构上预留新活动和新能力的接入空间。",
    result: "首页既满足当前能力表达，也顺畅接入春节活动，形成可持续扩展的产品入口。",
    background: { type: "video", src: media.homeCenter },
    gallery: [
      { type: "video", src: media.homeAlarm, label: "轻量状态" },
      { type: "video", src: media.homeDraw, label: "能力场景" },
      { type: "video", src: media.homeFestival, label: "活动接入" },
    ],
    metrics: ["长期使用体验", "扩展空间", "低打扰动效"],
  },
  {
    layout: "wide-stage",
    dimension: "决断力",
    principle: "创造用户价值",
    eyebrow: "02 / HOME MOTION",
    title: "首页动效露出策略",
    summary: "不是把所有动效都做满，而是判断哪些应该常驻、哪些应该克制，保护用户的长期新鲜感。",
    problem: "首页动效如果高频重复，会快速消耗用户兴趣；但如果弱化太多，又无法让新能力被用户感知。",
    strategy: "把动效分为轻量陪伴、能力反馈和活动强提醒三类，轻量动效承担日常陪伴，高反馈动效只在关键场景出现。",
    result: "首页保持活跃但不打扰，后续春节活动也能自然接入，不需要重新推翻首页结构。",
    background: { type: "video", src: media.homeFestival },
    gallery: [
      { type: "video", src: media.homeAlarm, label: "低打扰提醒" },
      { type: "video", src: media.homeDraw, label: "能力表达" },
      { type: "video", src: media.homeCenter, label: "首页承载" },
    ],
    metrics: ["露出频率", "审美疲劳控制", "运营扩展"],
  },
  {
    layout: "route-compare",
    dimension: "决断力",
    principle: "创造用户价值",
    eyebrow: "03 / GAUSS ROUTE",
    title: "理想同学语搜形象技术路线判断",
    summary: "在版本安全和体验上限之间做判断：用 Spine 保交付，用 Gauss 争取更好的毛发质感和三维记忆点。",
    problem: "毛绒实体化形象在车端展示中，传统 3D 方案难以同时满足毛发质感、三维体积和稳定落地，直接上线表现一般的方案会稀释用户记忆点。",
    strategy: "推动 Spine、3D Multipass、Gauss 三条技术路线并行验证。后期基于最终体验效果，选择 Spine 保障版本交付，同时保留 Gauss 方案攻坚空间。",
    result: "业务节点没有被创新探索拖垮，同时为更优体验方案保留继续收敛的路径。",
    background: { type: "video", src: media.gaussMain },
    gallery: [
      { type: "video", src: media.gaussEngine, label: "引擎验证" },
      { type: "image", src: media.entityDark, label: "毛绒质感" },
      { type: "image", src: media.entityDefault, label: "默认形象" },
    ],
    metrics: ["业务安全", "体验上限", "技术判断"],
  },
  {
    layout: "system-stack",
    dimension: "决断力",
    principle: "创造用户价值",
    eyebrow: "04 / ENTITY",
    title: "实体化形象升级",
    summary: "从单张形象图推进到可交付资产，持续收敛外形、材质和默认状态的产品表达。",
    problem: "毛绒角色既要有亲和力，也要能在 APP、车机、PC 等不同载体上稳定呈现，单次视觉探索无法支撑长期复用。",
    strategy: "围绕默认形象、唤醒状态和材质质感做多轮收敛，把概念探索转化为能进入交付链路的规范化资源。",
    result: "角色形象从概念走向体系，后续多端资源和高斯方向都能基于同一套资产判断继续推进。",
    background: { type: "image", src: media.entityDark },
    gallery: [
      { type: "image", src: media.entityDefault, label: "默认形象" },
      { type: "image", src: media.entityDark, label: "深色质感" },
      { type: "video", src: media.gaussMain, label: "动效验证" },
    ],
    metrics: ["形象收敛", "材质判断", "资产复用"],
  },
  {
    layout: "focus-eye",
    dimension: "决断力",
    principle: "创造用户价值",
    eyebrow: "05 / OC EYES",
    title: "OC 眼睛动效",
    summary: "在车端注意力变化很小的场景里，让眼睛不是机械跟随，而是持续有生命感。",
    problem: "车辆注意力变化幅度很小，如果眼睛只绑定状态跟随，会显得机械、僵硬，用户很难感受到角色存在。",
    strategy: "把真实物理世界中的不确定性引入动效：加入仿真人眼微抖、眨眼和低幅度随机变化，让常驻状态也保留灵动感。",
    result: "OC 眼睛的精致度和生动度明显增强，在低动态幅度下依然能保持角色感。",
    background: { type: "video", src: media.ocAttention },
    gallery: [
      { type: "video", src: media.ocPickup, label: "接人场景" },
      { type: "video", src: media.ocParking, label: "临停请求" },
      { type: "video", src: media.ocAttention, label: "注意力变化" },
    ],
    metrics: ["生命感", "低幅动态", "角色精致度"],
  },
  {
    layout: "route-compare",
    dimension: "决断力",
    principle: "创造用户价值",
    eyebrow: "06 / OC SCENE",
    title: "OC 车端场景表达",
    summary: "围绕接人、临停、注意力变化等真实车端场景，让角色反馈从状态绑定变成可感知的情绪表达。",
    problem: "车端场景里信息密度和注意力成本都很高，角色动效既要可见，又不能抢占驾驶相关信息。",
    strategy: "用场景分层控制动效强度：日常关注保持轻微生命感，临停和接人等任务场景加强反馈节奏。",
    result: "角色在不同车端场景中保持一致性，同时让用户更容易理解车辆当前状态和意图。",
    background: { type: "video", src: media.ocPickup },
    gallery: [
      { type: "video", src: media.ocParking, label: "临停请求" },
      { type: "video", src: media.ocPickup, label: "接人反馈" },
      { type: "video", src: media.ocAttention, label: "注意力状态" },
    ],
    metrics: ["场景分层", "低干扰反馈", "状态理解"],
  },
  {
    layout: "delivery-board",
    dimension: "执行力",
    principle: "责任担当",
    eyebrow: "07 / OTA 7.4",
    title: "OTA 7.4 理想同学 4o 项目交付",
    summary: "两周内完成多端、多形象、黑白模式资源交付，用优先级策略控制成本和风险。",
    problem: "新形象与小同桌需要车端和手机端同期上线，涉及 9 个形象、黑白两套模式，动画制作到交付测试只有 2 周。",
    strategy: "按成员擅长方向拆分任务，把主要精力投向曝光高、点击频次高的核心出现状态，低频状态采用复用策略，保证关键体验优先。",
    result: "关键节点前顺利完成交付，同时控制了资源制作成本和版本风险。",
    background: { type: "video", src: media.otaUpdate },
    gallery: [
      { type: "video", src: media.otaDesk, label: "小同桌" },
      { type: "video", src: media.otaTheater, label: "小剧场" },
      { type: "image", src: media.otaScene, label: "黑色模式" },
      { type: "image", src: media.otaCharacters, label: "角色矩阵" },
    ],
    metrics: ["2 周交付", "9 个形象", "黑白双模式"],
  },
  {
    layout: "tool-wall",
    dimension: "执行力",
    principle: "责任担当",
    eyebrow: "08 / MULTI-END",
    title: "多端 CUI 资源一致性",
    summary: "在 APP、车机和 PC 的不同展示条件下，统一角色资产的识别度、节奏和模式适配。",
    problem: "多端上线不是简单复制资源。不同屏幕尺寸、黑白模式和交互频次都会影响角色展示效果。",
    strategy: "优先保障核心出现状态和高频点击状态，在黑白模式和小同桌资源上建立复用规则，减少临近上线时的返工。",
    result: "关键状态体验稳定，多端资源交付压力被拆解到可管理范围内。",
    background: { type: "image", src: media.otaScene },
    gallery: [
      { type: "video", src: media.otaDesk, label: "小同桌状态" },
      { type: "video", src: media.otaUpdate, label: "OTA 更新" },
      { type: "image", src: media.otaCharacters, label: "角色集合" },
      { type: "video", src: media.otaTheater, label: "小剧场" },
    ],
    metrics: ["多端一致", "状态优先级", "复用策略"],
  },
  {
    layout: "timeline-flow",
    dimension: "执行力",
    principle: "责任担当",
    eyebrow: "09 / APP 24H",
    title: "APP 首页理想同学 24 小时动画资源产出策略调整",
    summary: "从纯 3D 转向 AI 批量生产工作流，用更高密度的探索换取更稳定的交付节奏。",
    problem: "24 小时动画资源需求快速增加，纯 3D 制作方式无法支撑高密度交付；AI 视频生成又存在随机性，难以直接稳定产出。",
    strategy: "调整为先批量生图、生视频扩大探索范围，再从优质结果中筛选和收敛概念方向。进一步用 VS Code 搭建批量工作流，提高生成、筛选、复用效率。",
    result: "资源产出效率和可控性提升，项目能按节奏推进，也沉淀出后续可复用的生产方法。",
    background: { type: "video", src: media.appFlow },
    gallery: [
      { type: "video", src: media.appCoffee, label: "午后状态" },
      { type: "video", src: media.appMusic, label: "音乐状态" },
      { type: "image", src: media.workflowLamp, label: "批量概念" },
      { type: "image", src: media.workflowOptions, label: "方向筛选" },
    ],
    metrics: ["批量生成", "筛选收敛", "节奏保障"],
  },
  {
    layout: "delivery-board",
    dimension: "执行力",
    principle: "责任担当",
    eyebrow: "10 / AI PIPELINE",
    title: "AI 批量生产流程调整",
    summary: "从先定概念再还原，转向大规模生成后筛选收敛，用方法变化解决交付密度问题。",
    problem: "AI 视频生成结果随机，按照传统“先想清楚再制作”的方式推进，仍然无法稳定覆盖大量动画需求。",
    strategy: "先扩大生成样本，再从高质量结果中反向筛选概念方向，并用 VS Code 工作流把批量生成、命名和筛选串起来。",
    result: "资源探索从线性制作变成批量筛选，效率和方向命中率都更适合高密度项目节奏。",
    background: { type: "image", src: media.workflowLamp },
    gallery: [
      { type: "image", src: media.workflowOptions, label: "方向筛选" },
      { type: "video", src: media.appCoffee, label: "状态样本" },
      { type: "video", src: media.appMusic, label: "动效样本" },
      { type: "image", src: media.workflowLamp, label: "批量概念" },
    ],
    metrics: ["批量样本", "反向筛选", "流程自动化"],
  },
  {
    layout: "wide-stage",
    dimension: "协作力",
    principle: "建立高效团队",
    eyebrow: "11 / RADIANT LIGHT",
    title: "放空桌面放射光效果方案共享与协同推进",
    summary: "把个人探索及时沉淀成团队可继续推进的方案，让共享成果比个人完成更重要。",
    problem: "放射光方案具备进一步打磨价值，但单人精力不足以覆盖后续细化、验证和交付。",
    strategy: "基于 AI Studio 和 React 动效源码形成初版方向后，主动整理设计经验、实现思路和方案判断，交给团队成员在已有基础上继续推进。",
    result: "团队成员进一步完善方案并完成交付，个人探索转化为团队共享资产。",
    background: { type: "video", src: media.radiantAttention },
    gallery: [
      { type: "video", src: media.radiantColor, label: "冷暖色" },
      { type: "video", src: media.radiantSpeak, label: "说话态" },
      { type: "video", src: media.radiantAttention, label: "注意力" },
    ],
    metrics: ["方案沉淀", "共享推进", "团队交付"],
  },
  {
    layout: "focus-eye",
    dimension: "协作力",
    principle: "建立高效团队",
    eyebrow: "12 / REACT PROTOTYPE",
    title: "React 动效方案转译",
    summary: "把 AI Studio 和 React 动效源码中的可行片段转译成设计方案，让团队能继续接力。",
    problem: "创新动效早期往往停在灵感层，如果没有把实现方式和设计判断讲清楚，团队很难继续推进。",
    strategy: "先把源码动效和交互目标对齐，再沉淀关键参数、节奏判断和可交付边界，降低后续协作成本。",
    result: "放射光方案从个人探索变成团队可以继续打磨的半成品，而不是一次性灵感展示。",
    background: { type: "video", src: media.radiantColor },
    gallery: [
      { type: "video", src: media.radiantSpeak, label: "说话态" },
      { type: "video", src: media.radiantColor, label: "冷暖色" },
      { type: "video", src: media.radiantAttention, label: "注意力" },
    ],
    metrics: ["源码转译", "参数沉淀", "协作接力"],
  },
  {
    layout: "system-stack",
    dimension: "协作力",
    principle: "建立高效团队",
    eyebrow: "13 / CROSS ROLE",
    title: "理想同学车端语音形象跨角色协同",
    summary: "在设计、Spine、Gauss、引擎之间建立共同目标，把探索方案继续推向落地。",
    problem: "车端语音形象涉及基础资源、动画设计、高斯模型动作结构和引擎效果整合，需要多角色持续对齐。",
    strategy: "线上交付阶段提供完整基础资源并协同 Spine 动画落地；Gauss 阶段设计骨骼动作层级，协同动作设计与引擎资源优化。",
    result: "基础方案稳定上线，高斯方向从设计探索继续向可落地方案收敛。",
    background: { type: "image", src: media.entityDark },
    gallery: [
      { type: "video", src: media.gaussMain, label: "高斯方向" },
      { type: "image", src: media.entityDefault, label: "基础资源" },
      { type: "video", src: media.gaussEngine, label: "引擎整合" },
    ],
    metrics: ["跨角色对齐", "动作层级", "方案收敛"],
  },
  {
    layout: "route-compare",
    dimension: "协作力",
    principle: "建立高效团队",
    eyebrow: "14 / ENGINE",
    title: "高斯模型引擎协同",
    summary: "在动作设计、骨骼层级和引擎效果之间持续对齐，把视觉目标压进可实现边界。",
    problem: "高斯模型进入引擎后，视觉效果、动作结构和性能边界会互相影响，单点设计判断不足以完成落地。",
    strategy: "设计高斯模型的骨骼动作层级，与动作设计和引擎资源优化同步推进，持续校准效果还原和落地成本。",
    result: "探索方案不止停留在视觉演示，而是继续向可进入产品链路的资源形态收敛。",
    background: { type: "video", src: media.gaussEngine },
    gallery: [
      { type: "video", src: media.gaussMain, label: "视觉目标" },
      { type: "video", src: media.gaussEngine, label: "引擎验证" },
      { type: "image", src: media.entityDark, label: "形象基础" },
    ],
    metrics: ["骨骼层级", "引擎优化", "落地边界"],
  },
  {
    layout: "tool-wall",
    dimension: "自驱力",
    principle: "自我发展",
    eyebrow: "15 / AI TOOLING",
    title: "AI 工作流与设计辅助工具探索",
    summary: "从 Gemini API、批量生成到 vibe coding 插件，把新能力转化为实际产出和团队方法。",
    problem: "AI 生成和图片处理如果停留在单次尝试，无法支撑项目节奏；色调不一致、手动校色等重复操作会打断设计流程。",
    strategy: "早期用脚本接入 Gemini API 探索批量生成图片到视频的流程；后续结合 Codex、Antigravity、Claude Code 等工具开发白平衡和校色插件，让图片处理留在工作流内部完成。",
    result: "个人提效转化为团队可复用方法，也为春节活动和后续 AI 设计资源快速产出积累经验。",
    background: { type: "image", src: media.workflowComfy },
    gallery: [
      { type: "image", src: media.workflowChat, label: "提示词协作" },
      { type: "image", src: media.workflowComfy, label: "批量工作流" },
      { type: "image", src: media.workflowLamp, label: "生成结果" },
      { type: "video", src: media.appFlow, label: "资源应用" },
    ],
    metrics: ["主动学习", "插件提效", "团队复用"],
  },
  {
    layout: "timeline-flow",
    dimension: "自驱力",
    principle: "自我发展",
    eyebrow: "16 / SELF GROWTH",
    title: "从个人提效到团队方法",
    summary: "把新工具体验转化为可复用工作流，再把工作流分享给团队，形成持续增长的能力闭环。",
    problem: "如果 AI 工具只停留在个人试用层面，很难真正改变项目效率，也无法形成团队共同方法。",
    strategy: "围绕真实工作中的重复环节开发白平衡、校色和批量处理插件，并把工具用法和适用边界同步给团队。",
    result: "新能力从个人探索扩散为团队方法，减少重复手工操作，也让后续活动资源生产更快启动。",
    background: { type: "image", src: media.workflowChat },
    gallery: [
      { type: "image", src: media.workflowComfy, label: "流程节点" },
      { type: "image", src: media.workflowChat, label: "提示词协作" },
      { type: "image", src: media.workflowOptions, label: "结果筛选" },
      { type: "video", src: media.appFlow, label: "应用场景" },
    ],
    metrics: ["工具沉淀", "方法分享", "持续增长"],
  },
];

function pad(number) {
  return String(number).padStart(2, "0");
}

function clampCaseIndex(index) {
  return Math.max(0, Math.min(cases.length - 1, index));
}

function Reveal({ as: Tag = "div", className = "", delay = 0, children, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        node.classList.toggle("is-inview", entry.isIntersecting);
      },
      { threshold: 0.2, rootMargin: "-8% 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ "--reveal-delay": `${delay}ms` }} {...props}>
      {children}
    </Tag>
  );
}

function Media({ item, className = "", background = false }) {
  const commonClass = `${className} ${background ? "background-media" : ""}`;

  if (item.type === "video") {
    return <video className={commonClass} src={item.src} autoPlay muted loop playsInline preload="metadata" />;
  }

  return <img className={commonClass} src={item.src} alt="" />;
}

function FloatingGallery({ items }) {
  return (
    <Reveal className="floating-gallery" delay={160}>
      {items.map((item, index) => (
        <figure className="media-card" style={{ "--i": index }} key={`${item.src}-${item.label}`}>
          <Media item={item} />
          <figcaption>{item.label}</figcaption>
        </figure>
      ))}
    </Reveal>
  );
}

function CaseIntro({ item }) {
  return (
    <>
      <p className="eyebrow">{item.eyebrow}</p>
      <div className="dimension-row">
        <span>{item.dimension}</span>
        <span>{item.principle}</span>
      </div>
      <h1>{item.title}</h1>
      <p className="summary">{item.summary}</p>
    </>
  );
}

function CaseTextGrid({ item }) {
  return (
    <div className="case-grid">
      <article>
        <h2>背景问题</h2>
        <p>{item.problem}</p>
      </article>
      <article>
        <h2>解决策略</h2>
        <p>{item.strategy}</p>
      </article>
      <article>
        <h2>结果</h2>
        <p>{item.result}</p>
      </article>
    </div>
  );
}

function Metrics({ items }) {
  return (
    <ul className="metrics">
      {items.map((metric) => (
        <li key={metric}>{metric}</li>
      ))}
    </ul>
  );
}

function CapabilityCase({ item, index, active }) {
  return (
    <section
      className={`case-section ${active ? "is-active" : ""}`}
      data-dimension={item.dimension}
      data-layout={item.layout}
      id={`case-${index + 1}`}
    >
      <div className="case-background" aria-hidden="true">
        <Media item={item.background} background />
      </div>
      <div className="case-shade" aria-hidden="true" />
      <div className="case-shell">
        <Reveal className="case-copy">
          <CaseIntro item={item} />
          <CaseTextGrid item={item} />
          <Metrics items={item.metrics} />
        </Reveal>
        <FloatingGallery items={item.gallery} />
      </div>
      <span className="case-index" aria-hidden="true">
        {pad(index + 1)}
      </span>
    </section>
  );
}

export function App() {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const animateToRef = useRef(null);
  const caseIds = useMemo(() => cases.map((_, index) => `case-${index + 1}`), []);

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    activeRef.current = active;
    document.documentElement.style.setProperty("--active", active);
  }, [active]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let scrollFrame = 0;

    const getSections = () => caseIds.map((id) => document.getElementById(id)).filter(Boolean);

    const syncActiveFromScroll = () => {
      scrollFrame = 0;
      const sections = getSections();
      if (!sections.length) return;

      const anchor = window.scrollY + window.innerHeight * 0.48;
      const nearestIndex = sections.reduce(
        (nearest, section, index) => {
          const distance = Math.abs(section.offsetTop - anchor);
          return distance < nearest.distance ? { distance, index } : nearest;
        },
        { distance: Number.POSITIVE_INFINITY, index: activeRef.current },
      ).index;

      if (nearestIndex !== activeRef.current) {
        setActive(nearestIndex);
      }
    };

    const requestActiveSync = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(syncActiveFromScroll);
    };

    const animateTo = (targetIndex) => {
      const nextIndex = clampCaseIndex(targetIndex);
      const section = document.getElementById(caseIds[nextIndex]);
      if (!section) return;

      setActive(nextIndex);
      section.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    };

    animateToRef.current = animateTo;
    window.addEventListener("scroll", requestActiveSync, { passive: true });
    requestActiveSync();

    const onKeyDown = (event) => {
      const directionMap = { ArrowDown: 1, PageDown: 1, " ": 1, ArrowUp: -1, PageUp: -1 };
      const direction = directionMap[event.key];
      if (!direction) return;
      event.preventDefault();
      const nextIndex = clampCaseIndex(activeRef.current + direction);
      if (nextIndex !== activeRef.current) animateTo(nextIndex);
    };

    const onPointerMove = (event) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      document.documentElement.style.setProperty("--px", x.toFixed(3));
      document.documentElement.style.setProperty("--py", y.toFixed(3));
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointermove", onPointerMove);

    return () => {
      window.removeEventListener("scroll", requestActiveSync);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointermove", onPointerMove);
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      animateToRef.current = null;
    };
  }, [caseIds]);

  return (
    <>
      <header className="topbar">
        <a
          className="brand"
          href="#case-1"
          aria-label="回到开场"
          onClick={(event) => {
            event.preventDefault();
            animateToRef.current?.(0);
          }}
        >
          <span className="brand-mark" />
          <span>理想同学 / 能力自荐</span>
        </a>
        <p className="progress-label">
          {cases[active].dimension} · {pad(active + 1)} / {pad(cases.length)}
        </p>
      </header>

      <main className="story">
        {cases.map((item, index) => (
          <CapabilityCase item={item} index={index} active={active === index} key={item.eyebrow} />
        ))}
      </main>

      <nav className="rail" aria-label="案例导航">
        {cases.map((item, index) => (
          <a
            className={active === index ? "is-active" : ""}
            href={`#case-${index + 1}`}
            aria-label={`跳转到${item.title}`}
            key={item.eyebrow}
            onClick={(event) => {
              event.preventDefault();
              animateToRef.current?.(index);
            }}
          >
            <span>{pad(index + 1)}</span>
          </a>
        ))}
      </nav>

      <div className="bottom-blur" aria-hidden="true" />
    </>
  );
}
