"use client";

import { AnimatePresence, motion } from "framer-motion";

import { EASE_OUT } from "@/lib/motion";

const PANEL_COUNT = 8;
const PANEL_HEIGHT = `${100 / PANEL_COUNT}vh`;
const PANEL_DURATION = 0.55;
const PANEL_STAGGER = 0.09;

const panels = Array.from({ length: PANEL_COUNT }, (_, index) => index);

interface FoldOverlayProps {
  isAnimating: boolean;
  onComplete: () => void;
}

export function FoldOverlay({ isAnimating, onComplete }: FoldOverlayProps) {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9999] overflow-hidden"
      style={{
        pointerEvents: isAnimating ? "auto" : "none",
        perspective: "1200px",
        transformStyle: "preserve-3d",
      }}
    >
      <AnimatePresence>
        {isAnimating ? (
          <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
            {panels.map((index) => (
              <motion.div
                key={index}
                className="absolute left-0 w-full bg-[#f8f8f4]"
                initial={{ rotateX: 0 }}
                animate={{ rotateX: -90 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: PANEL_DURATION,
                  ease: EASE_OUT,
                  delay: index * PANEL_STAGGER,
                }}
                onAnimationComplete={index === PANEL_COUNT - 1 ? onComplete : undefined}
                style={{
                  top: `${index * (100 / PANEL_COUNT)}vh`,
                  height: PANEL_HEIGHT,
                  transformOrigin: "top center",
                }}
              />
            ))}
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
