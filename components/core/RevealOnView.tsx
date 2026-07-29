"use client";

import { motion } from "framer-motion";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import {
  enterTransition,
  exitTransition,
  fadeUp,
  revealViewport,
  type Variants,
} from "@/lib/motion";
import { useHydratedReducedMotion } from "@/lib/useHydratedReducedMotion";
import { cn } from "@/lib/utils";

const motionElements = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  footer: motion.footer,
  main: motion.main,
  span: motion.span,
  p: motion.p,
  ul: motion.ul,
  li: motion.li,
} as const;

type RevealElement = keyof typeof motionElements;

type RevealOnViewProps<T extends RevealElement = "div"> = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: T;
  y?: number;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function RevealOnView<T extends RevealElement = "div">({
  children,
  className,
  delay = 0,
  as,
  y,
  ...props
}: RevealOnViewProps<T>) {
  const shouldReduceMotion = useHydratedReducedMotion();
  const tag = (as ?? "div") as RevealElement;
  const Element = tag;
  const MotionElement = motionElements[tag];
  const distance = y ?? 24;

  const variants: Variants =
    y === undefined && delay === 0
      ? fadeUp
      : {
          hidden: { opacity: 0, y: distance },
          visible: {
            opacity: 1,
            y: 0,
            transition: { ...enterTransition, delay },
          },
          exit: {
            opacity: 0,
            y: distance * 0.5,
            transition: exitTransition,
          },
        };

  if (shouldReduceMotion) {
    return (
      <Element className={cn(className)} {...(props as Record<string, unknown>)}>
        {children}
      </Element>
    );
  }

  return (
    <MotionElement
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      {...(props as Record<string, unknown>)}
    >
      {children}
    </MotionElement>
  );
}
