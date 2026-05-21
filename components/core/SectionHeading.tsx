"use client";

import { motion, useReducedMotion } from "framer-motion";

import { clipReveal, fadeUp, revealViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id?: string;
  label: string;
  title: string;
  className?: string;
};

export function SectionHeading({ id, label, title, className }: SectionHeadingProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <header id={id} className={cn("max-w-[900px]", className)}>
        <p className="mb-4 font-heading text-12 font-semibold uppercase tracking-widest text-accent">{label}</p>
        <h2 className="font-heading text-40 font-semibold leading-[0.95] tracking-tight text-fg md:text-64">
          {title}
        </h2>
      </header>
    );
  }

  return (
    <header id={id} className={cn("max-w-[900px]", className)}>
      <motion.p
        className="mb-4 font-heading text-12 font-semibold uppercase tracking-widest text-accent"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
      >
        {label}
      </motion.p>

      <h2 className="overflow-hidden font-heading text-40 font-semibold leading-[0.95] tracking-tight text-fg md:text-64">
        <motion.span
          className="block"
          variants={clipReveal}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          {title}
        </motion.span>
      </h2>
    </header>
  );
}
