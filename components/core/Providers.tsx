"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
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

interface FoldTransitionProviderProps {
  children: ReactNode;
}

export function FoldTransitionProvider({ children }: FoldTransitionProviderProps) {
  const callbackRef = useRef<(() => void) | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<TransitionDirection>("right");

  const triggerTransition = useCallback((callback: () => void, dir: TransitionDirection = "right") => {
    callbackRef.current = callback;
    setDirection(dir);
    setIsAnimating(true);
  }, []);

  const handleComplete = useCallback(() => {
    callbackRef.current?.();
    callbackRef.current = null;
    setIsAnimating(false);
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
