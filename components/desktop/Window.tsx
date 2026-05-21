"use client";

import React, { useEffect, useState } from "react";
import { motion, useDragControls } from "framer-motion";

interface WindowProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  zIndex: number;
  isMinimized: boolean;
  constraintsRef: React.RefObject<HTMLDivElement | null>;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  onFocus: (id: string) => void;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
}

function CornerBrackets() {
  return (
    <>
      <svg className="pointer-events-none absolute left-1 top-1 h-2 w-2 text-[#F5C518] opacity-60" viewBox="0 0 8 8" fill="none">
        <path d="M7 1H1V7" stroke="currentColor" strokeWidth="1" />
      </svg>
      <svg className="pointer-events-none absolute right-1 top-1 h-2 w-2 text-[#F5C518] opacity-60" viewBox="0 0 8 8" fill="none">
        <path d="M1 1H7V7" stroke="currentColor" strokeWidth="1" />
      </svg>
      <svg className="pointer-events-none absolute bottom-1 left-1 h-2 w-2 text-[#F5C518] opacity-60" viewBox="0 0 8 8" fill="none">
        <path d="M1 1V7H7" stroke="currentColor" strokeWidth="1" />
      </svg>
      <svg className="pointer-events-none absolute bottom-1 right-1 h-2 w-2 text-[#F5C518] opacity-60" viewBox="0 0 8 8" fill="none">
        <path d="M7 1V7H1" stroke="currentColor" strokeWidth="1" />
      </svg>
    </>
  );
}

export default function Window({
  id,
  title,
  icon,
  children,
  zIndex,
  isMinimized,
  constraintsRef,
  defaultPosition = { x: 100, y: 80 },
  defaultSize = { width: 800, height: 560 },
  onFocus,
  onClose,
  onMinimize,
}: WindowProps) {
  const dragControls = useDragControls();
  const [isGlitching, setIsGlitching] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsGlitching(false), 300);
    return () => window.clearTimeout(timeout);
  }, []);

  if (isMinimized) return null;

  const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    onFocus(id);
    dragControls.start(event);
  };

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={constraintsRef}
      onMouseDown={() => onFocus(id)}
      initial={{ opacity: 0, scaleX: 0.96, scaleY: 0.98 }}
      animate={{ opacity: 1, scaleX: 1, scaleY: 1 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="absolute flex flex-col overflow-hidden border border-[#2A2A3A] bg-[#12121A] shadow-2xl"
      style={{
        x: defaultPosition.x,
        y: defaultPosition.y,
        width: defaultSize.width,
        height: defaultSize.height,
        zIndex,
        clipPath:
          "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
        animation: isGlitching ? "cp-glitch 0.3s steps(2, end)" : undefined,
      }}
    >
      <div className="absolute left-0 top-0 z-10 h-[2px] w-full bg-[#F5C518]" />
      <CornerBrackets />

      <div
        data-drag-handle
        onPointerDown={startDrag}
        className="relative flex cursor-move select-none items-center gap-2 border-b border-[#2A2A3A] bg-[#0A0A0F] px-3 py-2"
      >
        <div className="flex items-center gap-2">
          <button
            aria-label="Close window"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              onClose(id);
            }}
            className="relative h-2.5 w-2.5 bg-[#FF3366] transition-opacity hover:opacity-80"
          >
            <span className="absolute left-1/2 top-1/2 h-px w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#0A0A0F]" />
            <span className="absolute left-1/2 top-1/2 h-px w-2 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-[#0A0A0F]" />
          </button>
          <button
            aria-label="Minimize window"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              onMinimize(id);
            }}
            className="relative h-2.5 w-2.5 bg-[#F5C518] transition-opacity hover:opacity-80"
          >
            <span className="absolute left-1/2 top-1/2 h-px w-2 -translate-x-1/2 -translate-y-1/2 bg-[#0A0A0F]" />
          </button>
          <button
            aria-label="Fullscreen window"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={(event) => event.stopPropagation()}
            className="relative h-2.5 w-2.5 bg-[#2A2A3A] transition-opacity hover:opacity-80"
          >
            <span className="absolute left-1/2 top-1/2 h-px w-2 -translate-x-1/2 -translate-y-1/2 bg-[#F5C518]" />
            <span className="absolute left-1/2 top-1/2 h-2 w-px -translate-x-1/2 -translate-y-1/2 bg-[#F5C518]" />
          </button>
        </div>

        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1.5 text-xs uppercase tracking-widest text-[#F5C518]">
          <span className="flex h-4 w-4 items-center justify-center text-[#F5C518]">{icon}</span>
          <span>{title}</span>
        </div>
      </div>

      <div className="hide-scrollbar min-h-0 flex-1 overflow-auto">{children}</div>
    </motion.div>
  );
}
