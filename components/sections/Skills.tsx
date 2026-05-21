"use client";

import { motion, useReducedMotion } from "framer-motion";

import { RevealOnView } from "@/components/core/RevealOnView";
import { SectionHeading } from "@/components/core/SectionHeading";
import {
  EASE_OUT,
  revealViewport,
  staggerContainer,
  type Variants,
} from "@/lib/motion";
import { skills } from "@/lib/data";

const pillContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.08,
    },
  },
};

const pillReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: EASE_OUT,
    },
  },
};

export function Skills() {
  const shouldReduceMotion = useReducedMotion();
  const skillGroups = Object.entries(skills) as Array<[string, string[]]>;

  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="mx-auto w-full max-w-container px-5 md:px-6">
        <SectionHeading label="Skills" title="Tools & technologies." />

        <motion.div
          variants={shouldReduceMotion ? undefined : staggerContainer}
          initial={shouldReduceMotion ? undefined : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={revealViewport}
          className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
        >
          {skillGroups.map(([group, items], index) => (
            <RevealOnView
              as="article"
              key={group}
              delay={index * 0.06}
              y={24}
              className="rounded-lg border border-border bg-surface p-6 transition-colors duration-300 hover:border-accent"
            >
              <h3 className="font-heading text-18 text-fg">{group}</h3>

              <motion.ul
                variants={shouldReduceMotion ? undefined : pillContainer}
                initial={shouldReduceMotion ? undefined : "hidden"}
                whileInView={shouldReduceMotion ? undefined : "visible"}
                viewport={revealViewport}
                className="pointer-events-none mt-6 flex flex-wrap gap-2.5"
              >
                {items.map((item) => (
                  <motion.li
                    key={item}
                    variants={shouldReduceMotion ? undefined : pillReveal}
                  >
                    <span className="inline-flex rounded-full border border-border bg-surface px-3 py-1.5 text-14 text-muted">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </RevealOnView>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
