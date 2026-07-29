"use client";

import { motion } from "framer-motion";

import { projects, skills } from "@/lib/data";
import { SectionHeading } from "@/components/core/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { RevealOnView } from "@/components/core/RevealOnView";
import {
  EASE_OUT,
  revealViewport,
  staggerContainer,
  type Variants,
} from "@/lib/motion";
import { useHydratedReducedMotion } from "@/lib/useHydratedReducedMotion";

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

export function Projects() {
  const shouldReduceMotion = useHydratedReducedMotion();
  const skillGroups = Object.entries(skills) as Array<[string, string[]]>;

  return (
    <section id="projects" className="py-12 md:py-16">
      <div className="mx-auto w-full max-w-container px-5 md:px-6">
        <SectionHeading label="Projects" title="Selected work." />

        <div className="mt-6 grid gap-5 sm:grid-cols-2 md:gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.name}
              name={project.name}
              stack={project.stack}
              bullets={project.bullets}
              github={project.github}
              index={index}
            />
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
                className="rounded-lg border border-border bg-surface p-6 transition duration-300 hover:border-accent hover:bg-surface-2"
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
      </div>
    </section>
  );
}
