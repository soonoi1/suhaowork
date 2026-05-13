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
    layout: "route-compare",
    dimension: "决断力",
    principle: "创造用户价值",
    eyebrow: "02 / GAUSS ROUTE",
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
    layout: "focus-eye",
    dimension: "决断力",
    principle: "创造用户价值",
    eyebrow: "03 / OC EYES",
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
    layout: "delivery-board",
    dimension: "执行力",
    principle: "责任担当",
    eyebrow: "04 / OTA 7.4",
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
    layout: "timeline-flow",
    dimension: "执行力",
    principle: "责任担当",
    eyebrow: "05 / APP 24H",
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
    layout: "wide-stage",
    dimension: "协作力",
    principle: "建立高效团队",
    eyebrow: "06 / RADIANT LIGHT",
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
    layout: "system-stack",
    dimension: "协作力",
    principle: "建立高效团队",
    eyebrow: "07 / CROSS ROLE",
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
    layout: "tool-wall",
    dimension: "自驱力",
    principle: "自我发展",
    eyebrow: "08 / AI TOOLING",
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
