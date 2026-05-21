"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

import { FoldOverlay } from "./FoldOverlay";

interface FoldTransitionContextValue {
  triggerFold: (callback: () => void) => void;
  isAnimating: boolean;
}

const FoldTransitionContext = createContext<FoldTransitionContextValue | undefined>(undefined);

export function useFoldTransition() {
  const context = useContext(FoldTransitionContext);

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

  const triggerFold = useCallback((callback: () => void) => {
    callbackRef.current = callback;
    setIsAnimating(true);
  }, []);

  const handleFoldComplete = useCallback(() => {
    callbackRef.current?.();
    callbackRef.current = null;
    setIsAnimating(false);
  }, []);

  const value = useMemo(
    () => ({
      triggerFold,
      isAnimating,
    }),
    [triggerFold, isAnimating],
  );

  return (
    <FoldTransitionContext.Provider value={value}>
      {children}
      <FoldOverlay isAnimating={isAnimating} onComplete={handleFoldComplete} />
    </FoldTransitionContext.Provider>
  );
}
