"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

import { EASE_OUT } from "@/lib/motion";

interface SlideOverlayProps {
  isAnimating: boolean;
  direction: "left" | "right";
  onComplete: () => void;
}

export function SlideOverlay({ isAnimating, direction, onComplete }: SlideOverlayProps) {
  const hasFiredRef = useRef(false);

  useEffect(() => {
    if (isAnimating) {
      hasFiredRef.current = false;
    }
  }, [isAnimating]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[9999]"
      style={{ pointerEvents: isAnimating ? "auto" : "none" }}
    >
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ x: direction === "right" ? "100%" : "-100%" }}
            animate={{ x: "0%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            onAnimationComplete={() => {
              if (!hasFiredRef.current) {
                hasFiredRef.current = true;
                onComplete();
              }
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
