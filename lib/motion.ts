import type { Transition, Variants } from "framer-motion";

export type { Variants };

export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const spring: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 0.9,
};

export const enterTransition: Transition = {
  duration: 0.72,
  ease: EASE_OUT,
};

export const exitTransition: Transition = {
  duration: 0.47,
  ease: EASE_OUT,
};

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: enterTransition,
  },
  exit: {
    opacity: 0,
    y: 16,
    transition: exitTransition,
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

export const revealViewport = {
  once: true,
  margin: "-15%",
} as const;

export const clipReveal: Variants = {
  hidden: {
    opacity: 0,
    y: "110%",
  },
  visible: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.84,
      ease: EASE_OUT,
    },
  },
  exit: {
    opacity: 0,
    y: "-72%",
    transition: {
      duration: 0.55,
      ease: EASE_OUT,
    },
  },
};
