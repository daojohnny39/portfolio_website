"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function useHydratedReducedMotion() {
  const prefersReducedMotion = useReducedMotion();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => setIsHydrated(true), []);

  return isHydrated && prefersReducedMotion === true;
}
