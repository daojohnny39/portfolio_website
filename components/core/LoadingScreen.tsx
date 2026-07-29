"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";

import { EASE_OUT } from "@/lib/motion";
import { useHydratedReducedMotion } from "@/lib/useHydratedReducedMotion";
import { usePageReady } from "@/lib/usePageReady";

interface LoadingScreenProps {
  variant: "main" | "photography";
  criticalImages?: string[];
}

export function LoadingScreen({
  variant,
  criticalImages = [],
}: LoadingScreenProps) {
  const shouldReduceMotion = useHydratedReducedMotion();
  const { progress, isReady } = usePageReady({
    criticalImages,
    minDisplayMs: variant === "photography" ? 800 : 600,
  });
  const [exited, setExited] = useState(false);
  const [skip, setSkip] = useState(false);
  const showedRef = useRef(false);

  useLayoutEffect(() => {
    if (
      document.fonts.status === "loaded" &&
      criticalImages.length === 0
    ) {
      setSkip(true);
      return;
    }
    showedRef.current = true;
  }, [criticalImages.length]);

  if (shouldReduceMotion || skip || exited) return null;

  const isMain = variant === "main";

  return (
    <AnimatePresence onExitComplete={() => setExited(true)}>
      {!isReady && (
        <motion.div
          key="loading-screen"
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center ${
            isMain ? "bg-[rgb(10,10,10)]" : "bg-white"
          }`}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: EASE_OUT },
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="mb-8"
          >
            {isMain ? (
              <span className="font-heading text-40 font-semibold tracking-[-0.05em] text-[rgb(250,250,250)]">
                JD
              </span>
            ) : (
              <span className="text-14 font-semibold uppercase tracking-[0.2em] text-[rgb(20,20,20)]">
                Photography
              </span>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15, ease: EASE_OUT }}
            className={`h-[2px] w-48 overflow-hidden rounded-full ${
              isMain ? "bg-[rgb(35,35,39)]" : "bg-[rgb(230,230,230)]"
            }`}
          >
            <motion.div
              className={`h-full rounded-full ${
                isMain
                  ? "bg-gradient-to-r from-accent-dim to-accent shadow-[0_0_12px_rgba(79,140,255,0.35)]"
                  : "bg-[rgb(20,20,20)]"
              }`}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
            />
          </motion.div>

          {!isMain && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4, ease: EASE_OUT }}
              className="mt-4 text-[11px] tracking-wide text-[rgb(160,160,160)]"
            >
              This can take a bit...
            </motion.p>
          )}

          {isMain && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-40 w-56 rounded-full bg-accent/[0.04] blur-3xl" />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
