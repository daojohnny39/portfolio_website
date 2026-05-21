"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR =
  "a, button, [data-cursor], input, textarea, select, summary, [role='button']";

function getInteractiveTarget(target: EventTarget | null) {
  return target instanceof Element
    ? (target.closest(INTERACTIVE_SELECTOR) as HTMLElement | null)
    : null;
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const pathname = usePathname();
  const isPhotographyRoute = pathname.startsWith("/photography");

  useEffect(() => {
    if (isPhotographyRoute) {
      setIsEnabled(false);
      document.body.classList.remove("custom-cursor-active");

      return () => {
        document.body.classList.remove("custom-cursor-active");
      };
    }

    const finePointerQuery = window.matchMedia("(pointer: fine)");
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let enabled = false;
    let hoveredElement: HTMLElement | null = null;
    let hoveredRect: DOMRect | null = null;

    const resetLock = () => {
      hoveredElement = null;
      hoveredRect = null;
      ringRef.current?.style.setProperty("width", "");
      ringRef.current?.style.setProperty("height", "");
      ringRef.current?.style.setProperty("border-radius", "");
      cursorRef.current?.classList.remove("custom-cursor--locked");
      trailRef.current?.classList.remove("custom-cursor--locked");
    };

    const updateEnabled = () => {
      enabled = finePointerQuery.matches && !reduceMotionQuery.matches;
      setIsEnabled(enabled);
      document.body.classList.toggle("custom-cursor-active", enabled);

      if (!enabled) {
        cursorRef.current?.style.setProperty("opacity", "0");
        trailRef.current?.style.setProperty("opacity", "0");
        resetLock();
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!enabled || event.pointerType !== "mouse") {
        return;
      }

      const cursor = cursorRef.current;
      const trail = trailRef.current;
      const ring = ringRef.current;

      if (!cursor || !trail || !ring) {
        return;
      }

      const el = getInteractiveTarget(event.target);

      trail.style.opacity = "1";
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;

      if (el) {
        if (hoveredElement !== el) {
          hoveredElement = el;
        }

        hoveredRect = el.getBoundingClientRect();
        trail.style.transform = `translate3d(${hoveredRect.left + hoveredRect.width / 2}px, ${hoveredRect.top + hoveredRect.height / 2}px, 0)`;
        ring.style.width = `${hoveredRect.width + 12}px`;
        ring.style.height = `${hoveredRect.height + 12}px`;
        ring.style.borderRadius = "8px";
        cursor.style.opacity = "0";
        cursor.classList.add("custom-cursor--locked");
        trail.classList.add("custom-cursor--locked");
      } else {
        resetLock();
        cursor.style.opacity = "1";
        trail.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }

      const isInteractive = Boolean(el);
      cursor.classList.toggle("custom-cursor--interactive", isInteractive);
      trail.classList.toggle("custom-cursor--interactive", isInteractive);
    };

    const handlePointerLeave = () => {
      cursorRef.current?.style.setProperty("opacity", "0");
      trailRef.current?.style.setProperty("opacity", "0");
      resetLock();
    };

    updateEnabled();

    finePointerQuery.addEventListener("change", updateEnabled);
    reduceMotionQuery.addEventListener("change", updateEnabled);
    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      finePointerQuery.removeEventListener("change", updateEnabled);
      reduceMotionQuery.removeEventListener("change", updateEnabled);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [isPhotographyRoute]);

  if (isPhotographyRoute || !isEnabled) {
    return null;
  }

  return (
    <>
      <div
        ref={trailRef}
        aria-hidden="true"
        className="custom-cursor custom-cursor__trail pointer-events-none fixed left-0 top-0 z-[99] opacity-0"
      >
        <div
          ref={ringRef}
          className="custom-cursor__ring h-12 w-12 rounded-full border border-white/70 bg-transparent"
        />
      </div>
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[100] opacity-0"
      >
        <div className="custom-cursor__dot h-6 w-6 rounded-full border border-white bg-white shadow-[0_0_0_3px_rgb(255_255_255/0.14),0_0_14px_rgb(255_255_255/0.42)]" />
      </div>
    </>
  );
}
