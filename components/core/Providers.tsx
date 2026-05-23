"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { SlideOverlay } from "./SlideOverlay";

type TransitionDirection = "left" | "right";

interface PageTransitionContextValue {
  triggerTransition: (callback: () => void, direction?: TransitionDirection) => void;
  isAnimating: boolean;
  direction: TransitionDirection;
}

const PageTransitionContext = createContext<PageTransitionContextValue | undefined>(undefined);

export function useFoldTransition() {
  const context = useContext(PageTransitionContext);

  if (!context) {
    throw new Error("useFoldTransition must be used within FoldTransitionProvider");
  }

  return context;
}

export function FoldTransitionProvider({ children }: { children: ReactNode }) {
  const callbackRef = useRef<(() => void) | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<TransitionDirection>("right");
  const awaitingNavRef = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    if (awaitingNavRef.current) {
      awaitingNavRef.current = false;
      setIsAnimating(false);
    }
  }, [pathname]);

  const triggerTransition = useCallback((callback: () => void, dir: TransitionDirection = "right") => {
    callbackRef.current = callback;
    setDirection(dir);
    setIsAnimating(true);
  }, []);

  const handleComplete = useCallback(() => {
    if (awaitingNavRef.current) return;
    awaitingNavRef.current = true;
    callbackRef.current?.();
    callbackRef.current = null;
    setTimeout(() => {
      if (awaitingNavRef.current) {
        awaitingNavRef.current = false;
        setIsAnimating(false);
      }
    }, 2000);
  }, []);

  const value = useMemo(
    () => ({
      triggerTransition,
      isAnimating,
      direction,
    }),
    [triggerTransition, isAnimating, direction],
  );

  return (
    <PageTransitionContext.Provider value={value}>
      {children}
      <SlideOverlay isAnimating={isAnimating} direction={direction} onComplete={handleComplete} />
    </PageTransitionContext.Provider>
  );
}
