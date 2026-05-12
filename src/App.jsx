import { Moon, Sun } from "lucide-react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

const assets = {
  hero: "/assets/li-light.png",
  heroDark: "/assets/li-dark.png",
  prism: "/assets/li-prism-web.jpg",
  board: "/assets/li-board-web.jpg",
  ui: "/assets/li-ui.jpg",
  wide: "/assets/li-01.jpg",
  avatar: "/assets/li-avatar-01.jpg",
  character: "/assets/li-character.jpg",
  human: "/assets/li-human.jpg",
  student: "/assets/li-student.jpg",
  frame: "/assets/li-frame-web.jpg",
};

const slides = [
  {
    tone: "light",
    layout: "hero-mask",
    kicker: "00 / LI AUTO AI",
    title: "理想同学",
    subtitle: "从形象探索到产品上线",
    words: ["0 TO 1", "ENTITY", "MOTION", "SYSTEM"],
    image: assets.hero,
  },
  {
    tone: "dark",
    layout: "manifesto",
    kicker: "01 / NARRATIVE",
    title: "不是做一张图，是把一个角色推向可用",
    subtitle: "探索、判断、交付、复用，在同一条业务线上收束。",
    words: ["探索", "推进", "判断", "落地"],
    image: assets.prism,
  },
  {
    tone: "light",
    layout: "split-race",
    kicker: "02 / CONTEXT",
    title: "从多端业务语境进入",
    subtitle: "APP、HMI、眼镜、AI 场景，先建立对载体和协作方式的理解。",
    words: ["APP", "HMI", "GLASS", "AI"],
    image: assets.ui,
  },
  {
    tone: "light",
    layout: "cyber-portrait",
    kicker: "03 / CHARACTER",
    title: "实体化形象升级",
    subtitle: "外形、材质、默认形象，从概念收敛到可交付资产。",
    words: ["毛绒", "牛仔帽", "默认形象"],
    image: assets.character,
  },
  {
    tone: "dark",
    layout: "giant-index",
    kicker: "04 / OTA 7.4",
    title: "多端升级交付",
    subtitle: "APP / 车机 / PC 三端 CUI 交互工程设计。",
    words: ["APP", "CAR", "PC"],
    image: assets.board,
  },
  {
    tone: "light",
    layout: "kinetic-band",
    kicker: "05 / CONSTRAINT",
    title: "在限制里找更优解",
    subtitle: "性能、包体、内存、画质、帧率，体验不是只靠理想方案成立。",
    words: ["性能", "包体", "画质", "帧率"],
    image: assets.wide,
  },
  {
    tone: "dark",
    layout: "stack-cards",
    kicker: "06 / SYSTEM",
    title: "从单个形象到角色体系",
    subtitle: "世界观、视觉语言、资产库和复用规范，让工作变成系统能力。",
    words: ["世界观", "资产库", "规范"],
    image: assets.student,
  },
  {
    tone: "light",
    layout: "prism-stage",
    kicker: "07 / RENDER",
    title: "高斯渲染与引擎落地",
    subtitle: "主线突破与兜底方案并行，目标是让效果真正进入产品。",
    words: ["高斯", "引擎", "还原", "兜底"],
    image: assets.prism,
  },
  {
    tone: "dark",
    layout: "workflow-grid",
    kicker: "08 / AI WORKFLOW",
    title: "AI 不只是出图工具",
    subtitle: "在探索、验证、交付阶段选择不同方法，提高效率和成本结构。",
    words: ["探索提效", "验证提速", "流程替代"],
    image: assets.human,
  },
  {
    tone: "light",
    layout: "studio-lab",
    kicker: "09 / PROTOTYPE",
    title: "新工具进入业务验证",
    subtitle: "AI Studio、vibe coding、React 原型，把想法快速推到可讨论状态。",
    words: ["AI Studio", "React", "SS4 光效"],
    image: assets.frame,
  },
  {
    tone: "dark",
    layout: "line-system",
    kicker: "10 / COLLAB",
    title: "把设计变成可交付方案",
    subtitle: "研发、引擎、供应商、业务方之间反复对齐，方案才有落地的形状。",
    words: ["研发", "引擎", "供应商", "业务方"],
    image: assets.ui,
  },
  {
    tone: "light",
    layout: "editorial",
    kicker: "11 / TASTE",
    title: "审美方向与体验把控",
    subtitle: "判断什么方向适合业务，也判断什么方案可以继续投入。",
    words: ["方向", "风格", "品质", "兜底"],
    image: assets.avatar,
  },
  {
    tone: "dark",
    layout: "results",
    kicker: "12 / VALUE",
    title: "效率、质量、复用",
    subtitle: "批量交付不是堆资源，而是让资产体系降低下一次启动成本。",
    words: ["效率", "质量", "复用"],
    image: assets.board,
  },
  {
    tone: "light",
    layout: "capability-map",
    kicker: "13 / GROWTH",
    title: "从执行者到方向贡献者",
    subtitle: "探索力、推进力、创新力和体系化能力，在同一个项目里被验证。",
    words: ["探索力", "推进力", "创新力", "体系化"],
    image: assets.student,
  },
  {
    tone: "dark",
    layout: "finale",
    kicker: "14 / NEXT",
    title: "继续创造更大的设计价值",
    subtitle: "承担更核心的 AI 角色体系、工作流和复杂创新项目。",
    words: ["核心探索", "AI 方法", "复杂落地"],
    image: assets.heroDark,
  },
];

function pad(number) {
  return String(number).padStart(2, "0");
}

function SplitTitle({ text }) {
  return (
    <h1 className="split-title">
      {text.split("").map((char, index) => (
        <span style={{ "--i": index }} key={`${char}-${index}`}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
}

function KeywordLine({ words }) {
  return (
    <ul className="keyword-line">
      {words.map((word, index) => (
        <li style={{ "--i": index }} key={word}>
          {word}
        </li>
      ))}
    </ul>
  );
}

function Visual({ slide, index }) {
  return (
    <div className="visual" data-layout={slide.layout}>
      <div className="visual-image depth-card">
        <img src={slide.image} alt="" />
      </div>
      <div className="prism-light" aria-hidden="true" />
      <span className="orbital-line" aria-hidden="true" />
      <span className="micro-index" aria-hidden="true">
        {pad(index + 1)}
      </span>
    </div>
  );
}

function StorySection({ index, slide, active }) {
  return (
    <section className={`story-section ${slide.tone} ${slide.layout} ${active ? "is-active" : ""}`} id={`slide-${index + 1}`}>
      <div className="section-rule" aria-hidden="true" />
      <div className="copy-block">
        <p className="kicker">{slide.kicker}</p>
        <SplitTitle text={slide.title} />
        <p className="subtitle">{slide.subtitle}</p>
        <KeywordLine words={slide.words} />
      </div>
      <Visual slide={slide} index={index} />
      <div className="section-number" aria-hidden="true">
        {pad(index + 1)}
      </div>
    </section>
  );
}

export function App() {
  const [themeOverride, setThemeOverride] = useState(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const animateToRef = useRef(null);
  const springRef = useRef({ frame: 0, target: 0, velocity: 0, locked: false });
  const slideIds = useMemo(() => slides.map((_, index) => `slide-${index + 1}`), []);

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  const currentTheme = themeOverride || slides[active]?.tone || "light";

  useEffect(() => {
    document.documentElement.dataset.theme = currentTheme;
  }, [currentTheme]);

  useEffect(() => {
    activeRef.current = active;
    document.documentElement.style.setProperty("--active", active);
  }, [active]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return undefined;

    const spring = springRef.current;

    const stopSpring = () => {
      if (spring.frame) {
        cancelAnimationFrame(spring.frame);
        spring.frame = 0;
      }
      spring.locked = false;
    };

    const animateTo = (targetIndex) => {
      const section = document.getElementById(slideIds[targetIndex]);
      if (!section) return;

      spring.target = section.offsetTop;
      spring.locked = true;
      setActive(targetIndex);

      let lastTime = performance.now();
      const stiffness = 0.044;
      const damping = 0.865;

      const tick = (now) => {
        const delta = Math.min((now - lastTime) / 16.67, 2.4);
        lastTime = now;

        const current = window.scrollY;
        const distance = spring.target - current;
        spring.velocity = (spring.velocity + distance * stiffness * delta) * damping;

        window.scrollTo(0, current + spring.velocity * delta);

        if (Math.abs(distance) < 0.55 && Math.abs(spring.velocity) < 0.5) {
          window.scrollTo(0, spring.target);
          spring.velocity = 0;
          spring.frame = 0;
          window.setTimeout(() => {
            spring.locked = false;
          }, 120);
          return;
        }

        spring.frame = requestAnimationFrame(tick);
      };

      if (!spring.frame) {
        spring.frame = requestAnimationFrame(tick);
      }
    };

    animateToRef.current = animateTo;

    const onWheel = (event) => {
      const isHorizontalGesture = Math.abs(event.deltaX) > Math.abs(event.deltaY);
      if (isHorizontalGesture || Math.abs(event.deltaY) < 8) return;
      event.preventDefault();
      if (spring.locked) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      const nextIndex = Math.max(0, Math.min(slides.length - 1, activeRef.current + direction));
      if (nextIndex !== activeRef.current) animateTo(nextIndex);
    };

    const onKeyDown = (event) => {
      const directionMap = { ArrowDown: 1, PageDown: 1, " ": 1, ArrowUp: -1, PageUp: -1 };
      const direction = directionMap[event.key];
      if (!direction || spring.locked) return;
      event.preventDefault();
      const nextIndex = Math.max(0, Math.min(slides.length - 1, activeRef.current + direction));
      if (nextIndex !== activeRef.current) animateTo(nextIndex);
    };

    const onPointerMove = (event) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      document.documentElement.style.setProperty("--px", x.toFixed(3));
      document.documentElement.style.setProperty("--py", y.toFixed(3));
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointermove", onPointerMove);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointermove", onPointerMove);
      animateToRef.current = null;
      stopSpring();
    };
  }, [slideIds]);

  return (
    <>
      <div className="ambient-prism" aria-hidden="true" />
      <header className="topbar">
        <a
          className="brand"
          href="#slide-1"
          aria-label="回到开场"
          onClick={(event) => {
            event.preventDefault();
            animateToRef.current?.(0);
          }}
        >
          <span className="brand-mark" />
          <span>理想同学</span>
        </a>
        <button
          className="icon-button"
          type="button"
          aria-label="切换黑白模式"
          title="切换黑白模式"
          onClick={() => setThemeOverride((value) => {
            const base = value || currentTheme;
            return base === "dark" ? "light" : "dark";
          })}
        >
          {currentTheme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </header>

      <main className="story">
        {slides.map((slide, index) => (
          <StorySection active={active === index} index={index} slide={slide} key={slide.kicker} />
        ))}
      </main>

      <nav className="rail" aria-label="页面导航">
        {slides.map((_, index) => (
          <a
            className={active === index ? "is-active" : ""}
            href={`#slide-${index + 1}`}
            aria-label={`跳转到第 ${index + 1} 屏`}
            key={index}
            onClick={(event) => {
              event.preventDefault();
              animateToRef.current?.(index);
            }}
          />
        ))}
      </nav>
    </>
  );
}
