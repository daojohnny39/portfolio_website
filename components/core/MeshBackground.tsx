"use client";

import { useEffect, useRef } from "react";

type MeshDot = {
  restX: number;
  restY: number;
  x: number;
  y: number;
  phase: number;
  glow: number;
};

type CursorState = {
  x: number;
  y: number;
  active: boolean;
};

const BACKGROUND = "#0a0a0a";
const ACCENT_RGB = "79, 140, 255";
const ACCENT_COLOR = `rgb(${ACCENT_RGB})`;
const DOT_SPACING = 28;
const CURSOR_RADIUS = 320;
const MAX_REPEL = 45;
const FRAME_INTERVAL = 33;
const SPRITE_RADIUS_BUCKETS = 8;
const TAU = Math.PI * 2;
const INTERACTIVE_SELECTOR =
  "a, button, [data-cursor], input, textarea, select, summary, [role='button']";

type DotSprite = {
  canvas: HTMLCanvasElement;
  size: number;
};

export function MeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cursor: CursorState = { x: 0, y: 0, active: false };
    let hoveredRect: DOMRect | null = null;
    let dots: MeshDot[] = [];
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let animationFrame = 0;
    let lastFrameTime = 0;
    let reducedMotion = motionQuery.matches;
    const spriteCache = new Map<string, DotSprite>();

    const createDots = () => {
      dots = [];

      for (let y = -DOT_SPACING; y <= height + DOT_SPACING; y += DOT_SPACING) {
        for (
          let x = -DOT_SPACING;
          x <= width + DOT_SPACING;
          x += DOT_SPACING
        ) {
          dots.push({
            restX: x,
            restY: y,
            x,
            y,
            phase: x * 0.018 + y * 0.012,
            glow: 0,
          });
        }
      }
    };

    const getDotSprite = (radius: number) => {
      const radiusBucket = Math.round(radius * SPRITE_RADIUS_BUCKETS);
      const key = `${pixelRatio}:${radiusBucket}`;
      const cachedSprite = spriteCache.get(key);

      if (cachedSprite) {
        return cachedSprite;
      }

      const spriteRadius = radiusBucket / SPRITE_RADIUS_BUCKETS;
      const size = Math.ceil(spriteRadius * 2 + 2);
      const sprite = document.createElement("canvas");
      const spriteContext = sprite.getContext("2d");

      sprite.width = Math.max(1, Math.round(size * pixelRatio));
      sprite.height = Math.max(1, Math.round(size * pixelRatio));

      if (!spriteContext) {
        const fallbackSprite = { canvas: sprite, size };
        spriteCache.set(key, fallbackSprite);
        return fallbackSprite;
      }

      const center = size / 2;
      spriteContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      spriteContext.fillStyle = ACCENT_COLOR;
      spriteContext.beginPath();
      spriteContext.arc(center, center, spriteRadius, 0, TAU);
      spriteContext.fill();

      const dotSprite = { canvas: sprite, size };
      spriteCache.set(key, dotSprite);
      return dotSprite;
    };

    const drawDot = (dot: MeshDot, radius: number, alpha: number) => {
      const sprite = getDotSprite(radius);
      context.globalAlpha = Math.min(1, alpha);
      context.drawImage(
        sprite.canvas,
        dot.x - sprite.size / 2,
        dot.y - sprite.size / 2,
        sprite.size,
        sprite.size,
      );
    };

    const draw = (timestamp: number) => {
      if (
        !reducedMotion &&
        lastFrameTime !== 0 &&
        timestamp - lastFrameTime < FRAME_INTERVAL
      ) {
        animationFrame = window.requestAnimationFrame(draw);
        return;
      }

      lastFrameTime = timestamp;
      const seconds = timestamp / 1000;

      context.globalAlpha = 1;
      context.shadowBlur = 0;
      context.fillStyle = BACKGROUND;
      context.fillRect(0, 0, width, height);

      for (const dot of dots) {
        let targetX = dot.restX;
        let targetY = dot.restY;
        let pulse = 0.3;
        let influence = 0;

        if (!reducedMotion) {
          pulse = (Math.sin(seconds * (TAU / 12) + dot.phase) + 1) / 2;
          targetX += Math.sin(seconds * (TAU / 14) + dot.phase) * 6.0;
          targetY += Math.cos(seconds * (TAU / 11) + dot.phase) * 6.0;

          if (cursor.active && !document.body.hasAttribute("data-wheel-nav-expanded")) {
            const deltaX = targetX - cursor.x;
            const deltaY = targetY - cursor.y;
            const distance = Math.hypot(deltaX, deltaY);

            if (distance < CURSOR_RADIUS) {
              influence = (1 - distance / CURSOR_RADIUS) ** 2;
              const angle =
                distance > 0 ? Math.atan2(deltaY, deltaX) : dot.phase;
              const repel = influence * MAX_REPEL;
              targetX += Math.cos(angle) * repel;
              targetY += Math.sin(angle) * repel;
            }
          }

          if (hoveredRect) {
            const padding = 8;
            const expandedLeft = hoveredRect.left - padding;
            const expandedTop = hoveredRect.top - padding;
            const expandedRight = hoveredRect.right + padding;
            const expandedBottom = hoveredRect.bottom + padding;
            const closestX = Math.max(
              expandedLeft,
              Math.min(expandedRight, targetX),
            );
            const closestY = Math.max(
              expandedTop,
              Math.min(expandedBottom, targetY),
            );
            const dX = targetX - closestX;
            const dY = targetY - closestY;
            const dist = Math.hypot(dX, dY);
            const rectRadius = 100;

            if (dist < rectRadius && dist > 0) {
              const rectInfluence = (1 - dist / rectRadius) ** 2;
              const angle = Math.atan2(dY, dX);
              const repel = rectInfluence * MAX_REPEL * 1.8;
              targetX += Math.cos(angle) * repel;
              targetY += Math.sin(angle) * repel;
            }

            influence = 0;
          }

          dot.x += (targetX - dot.x) * 0.12;
          dot.y += (targetY - dot.y) * 0.12;
          dot.glow += (influence - dot.glow) * 0.22;
        } else {
          dot.x = targetX;
          dot.y = targetY;
          dot.glow = 0;
        }

        drawDot(
          dot,
          1.3 + pulse * 0.75 + dot.glow * 8.0,
          0.10 + pulse * 0.09 + dot.glow * 1.0,
        );
      }

      context.globalAlpha = 1;

      if (!reducedMotion) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    const renderStatic = () => {
      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }

      draw(0);
    };

    const start = () => {
      if (animationFrame === 0 && !reducedMotion) {
        lastFrameTime = 0;
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const nextPixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      if (nextPixelRatio !== pixelRatio) {
        pixelRatio = nextPixelRatio;
        spriteCache.clear();
      }

      canvas.width = Math.max(1, Math.round(width * pixelRatio));
      canvas.height = Math.max(1, Math.round(height * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      createDots();

      if (reducedMotion) {
        renderStatic();
      } else {
        start();
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || reducedMotion) {
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      cursor.active = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
      cursor.x = x;
      cursor.y = y;

      const target = event.target as Element | null;
      const interactiveEl = target?.closest(
        INTERACTIVE_SELECTOR,
      ) as HTMLElement | null;

      if (interactiveEl) {
        const r = interactiveEl.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();
        hoveredRect = new DOMRect(
          r.left - canvasRect.left,
          r.top - canvasRect.top,
          r.width,
          r.height,
        );
      } else {
        hoveredRect = null;
      }
    };

    const handlePointerLeave = () => {
      cursor.active = false;
      hoveredRect = null;
    };

    const handleMotionChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      cursor.active = false;
      hoveredRect = null;

      if (reducedMotion) {
        renderStatic();
      } else {
        start();
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    motionQuery.addEventListener("change", handleMotionChange);
    resize();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      motionQuery.removeEventListener("change", handleMotionChange);

      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 block size-full"
      aria-hidden="true"
    />
  );
}
