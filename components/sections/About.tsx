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
import { personal, skills } from "@/lib/data";

type QuickFact = {
  label: string;
  value: string;
};

const quickFacts: QuickFact[] = [
  { label: "Location", value: personal.location },
  { label: "Focus", value: "Full-stack + AI/ML" },
  { label: "Status", value: "CS @ UMKC, 3.8 GPA" },
];

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

export function About() {
  const shouldReduceMotion = useReducedMotion();
  const skillGroups = Object.entries(skills) as Array<[string, string[]]>;
  const [leadClause = personal.bio, ...remainingClauses] =
    personal.bio.split(",");
  const supportingBio = remainingClauses.length
    ? `,${remainingClauses.join(",")}`
    : "";

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="py-16 md:py-20"
    >
      <div className="mx-auto w-full max-w-container px-5 md:px-6">
        <SectionHeading
          id="about-heading"
          label="About"
          title="Building things that work."
        />

        <div className="mt-10 max-w-[820px]">
          <RevealOnView
            as="p"
            className="max-w-[65ch] text-18 leading-relaxed text-muted md:text-24"
          >
            <span className="text-fg">{leadClause}</span>
            {supportingBio}
          </RevealOnView>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {quickFacts.map((fact, index) => (
            <RevealOnView
              key={fact.label}
              as="article"
              delay={0.06 * index}
              y={18}
              data-cursor
              className="rounded-lg border border-border bg-surface p-4 transition duration-300 hover:border-accent hover:bg-surface-2 md:p-5"
            >
              <p className="font-heading text-12 font-semibold uppercase tracking-widest text-muted">
                {fact.label}
              </p>
              <p className="mt-3 text-16 leading-snug text-fg">{fact.value}</p>
            </RevealOnView>
          ))}
        </div>

        <div
          id="skills"
          aria-labelledby="skills-heading"
          className="mt-14 md:mt-20"
        >
          <RevealOnView y={18}>
            <h3
              id="skills-heading"
              className="font-heading text-24 text-fg md:text-32"
            >
              Tools & technologies.
            </h3>
          </RevealOnView>

          <motion.div
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial={shouldReduceMotion ? undefined : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={revealViewport}
            className="mt-6 grid gap-5 md:mt-8 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
          >
            {skillGroups.map(([group, items], index) => (
              <RevealOnView
                as="article"
                key={group}
                delay={index * 0.06}
                y={24}
                data-cursor
                className="rounded-lg border border-border bg-surface p-6 transition-colors duration-300 hover:border-accent"
              >
                <h4 className="font-heading text-18 text-fg">{group}</h4>

                <motion.ul
                  variants={shouldReduceMotion ? undefined : pillContainer}
                  initial={shouldReduceMotion ? undefined : "hidden"}
                  whileInView={shouldReduceMotion ? undefined : "visible"}
                  viewport={revealViewport}
                  className="mt-6 flex flex-wrap gap-2.5"
                >
                  {items.map((item) => (
                    <motion.li
                      key={item}
                      variants={shouldReduceMotion ? undefined : pillReveal}
                    >
                      <span className="inline-flex rounded-full border border-border bg-surface px-3 py-1.5 text-14 text-muted transition-colors duration-300 hover:border-accent hover:text-fg">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              </RevealOnView>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
