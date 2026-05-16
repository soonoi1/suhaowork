import { useCallback, useLayoutEffect, useRef } from "react";
import "./ScrollStack.css";

export function ScrollStackItem({ children, itemClassName = "" }) {
  return <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>;
}

function parsePosition(value, containerHeight) {
  if (typeof value === "string" && value.includes("%")) {
    return (parseFloat(value) / 100) * containerHeight;
  }

  return Number.parseFloat(value);
}

function calculateProgress(scrollTop, start, end) {
  if (scrollTop < start) return 0;
  if (scrollTop > end) return 1;
  return (scrollTop - start) / Math.max(1, end - start);
}

function getDocumentOffset(element) {
  const rect = element.getBoundingClientRect();
  return rect.top + window.scrollY;
}

export default function ScrollStack({
  children,
  className = "",
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
}) {
  const scrollerRef = useRef(null);
  const cardsRef = useRef([]);
  const frameRef = useRef(null);
  const lastTransformsRef = useRef(new Map());
  const stackCompletedRef = useRef(false);

  const updateCardTransforms = useCallback(() => {
    const cards = cardsRef.current;
    const scroller = scrollerRef.current;
    if (!scroller || !cards.length) return;

    const scrollTop = window.scrollY;
    const containerHeight = window.innerHeight;
    const stackPositionPx = parsePosition(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePosition(scaleEndPosition, containerHeight);
    const endElement = scroller.querySelector(".scroll-stack-end");
    const endElementTop = endElement ? getDocumentOffset(endElement) : 0;

    let topCardIndex = 0;
    if (blurAmount) {
      cards.forEach((card, index) => {
        const cardTop = getDocumentOffset(card);
        const triggerStart = cardTop - stackPositionPx - itemStackDistance * index;
        if (scrollTop >= triggerStart) {
          topCardIndex = index;
        }
      });
    }

    cards.forEach((card, index) => {
      const cardTop = getDocumentOffset(card);
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * index;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = triggerStart;
      const pinEnd = endElementTop - containerHeight / 2;
      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + index * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? index * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount && index < topCardIndex) {
        blur = Math.max(0, (topCardIndex - index) * blurAmount);
      }

      let translateY = 0;
      if (scrollTop >= pinStart && scrollTop <= pinEnd) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * index;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * index;
      }

      const nextTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };
      const previousTransform = lastTransformsRef.current.get(index);
      const changed =
        !previousTransform ||
        Math.abs(previousTransform.translateY - nextTransform.translateY) > 0.1 ||
        Math.abs(previousTransform.scale - nextTransform.scale) > 0.001 ||
        Math.abs(previousTransform.rotation - nextTransform.rotation) > 0.1 ||
        Math.abs(previousTransform.blur - nextTransform.blur) > 0.1;

      if (changed) {
        card.style.transform = `translate3d(0, ${nextTransform.translateY}px, 0) scale(${nextTransform.scale}) rotate(${nextTransform.rotation}deg)`;
        card.style.filter = nextTransform.blur ? `blur(${nextTransform.blur}px)` : "";
        lastTransformsRef.current.set(index, nextTransform);
      }

      if (index === cards.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isInView && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });
  }, [
    baseScale,
    blurAmount,
    itemScale,
    itemStackDistance,
    onStackComplete,
    rotationAmount,
    scaleEndPosition,
    stackPosition,
  ]);

  const requestUpdate = useCallback(() => {
    if (frameRef.current) return;

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      updateCardTransforms();
    });
  }, [updateCardTransforms]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    const cards = Array.from(scroller.querySelectorAll(".scroll-stack-card"));
    cardsRef.current = cards;

    cards.forEach((card, index) => {
      if (index < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = "transform, filter";
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
      card.style.transform = "translateZ(0)";
      card.style.perspective = "1000px";
    });

    updateCardTransforms();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
      cardsRef.current = [];
      lastTransformsRef.current.clear();
      stackCompletedRef.current = false;
    };
  }, [itemDistance, requestUpdate, updateCardTransforms]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
}
