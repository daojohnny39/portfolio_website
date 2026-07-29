"use client";

import { motion } from "framer-motion";

import { EASE_OUT } from "@/lib/motion";
import { useHydratedReducedMotion } from "@/lib/useHydratedReducedMotion";
import { RevealOnView } from "@/components/core/RevealOnView";
import { GitHubIcon } from "@/components/ui/GitHubIcon";

export interface ProjectCardProps {
  name: string;
  stack: string[];
  bullets: string[];
  github: string | null;
  index: number;
}

export function ProjectCard({
  name,
  stack,
  bullets,
  github,
  index,
}: ProjectCardProps) {
  const shouldReduceMotion = useHydratedReducedMotion();
  const visibleBullets = bullets.slice(0, 3);
  const titleId = `project-${index}-title`;

  return (
    <RevealOnView className="h-full" delay={index * 0.08} y={28}>
      <div className="group/wrap relative h-full">
        <motion.article
          aria-labelledby={titleId}
          data-cursor
          whileHover={shouldReduceMotion ? undefined : { y: -4 }}
          transition={{ duration: 0.28, ease: EASE_OUT }}
          className={`group/card relative h-full overflow-hidden rounded-lg border border-border bg-surface p-6 transition-colors duration-300 hover:border-accent motion-reduce:transition-none md:p-8${github ? " cursor-pointer" : ""}`}
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-300 group-hover/card:opacity-100 motion-reduce:transition-none" />

          {github && (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="absolute inset-0 z-10"
              aria-labelledby={titleId}
            />
          )}

          <div className="relative flex items-start justify-between gap-5">
            <h3 id={titleId} className="font-heading text-24 text-fg">
              {name}
            </h3>

            {github ? (
              <span
                aria-hidden="true"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors duration-300 group-hover/card:border-accent group-hover/card:text-accent motion-reduce:transition-none"
              >
                <GitHubIcon className="h-4 w-4" />
              </span>
            ) : null}
          </div>

          <ul className="relative mt-5 space-y-2.5">
            {visibleBullets.map((bullet) => (
              <li
                key={bullet}
                className="flex gap-3 text-14 leading-relaxed text-muted md:text-16"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="relative mt-8 flex flex-wrap gap-2">
            {stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border px-2.5 py-1 text-12 text-muted"
              >
                {item}
              </span>
            ))}
          </div>

          {github && (
            <div
              aria-hidden="true"
              className="relative flex items-center gap-1.5 overflow-hidden text-12 text-muted opacity-0 transition-all duration-300 max-h-0 group-hover/card:max-h-10 group-hover/card:mt-5 group-hover/card:opacity-100 motion-reduce:transition-none"
            >
              <span>Click to view on GitHub</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-3 w-3"
              >
                <path
                  fillRule="evenodd"
                  d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H5.75a.75.75 0 0 1 0-1.5h5.5a.75.75 0 0 1 .75.75v5.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </motion.article>

      </div>
    </RevealOnView>
  );
}
