"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { EASE_OUT } from "@/lib/motion";
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
  const shouldReduceMotion = useReducedMotion();
  const visibleBullets = bullets.slice(0, 3);
  const titleId = `project-${index}-title`;

  return (
    <RevealOnView className="h-full" delay={index * 0.08} y={28}>
      <motion.article
        aria-labelledby={titleId}
        data-cursor
        whileHover={shouldReduceMotion ? undefined : { y: -4 }}
        transition={{ duration: 0.28, ease: EASE_OUT }}
        className="group/card relative h-full overflow-hidden rounded-lg border border-border bg-surface p-6 transition-colors duration-300 hover:border-accent motion-reduce:transition-none md:p-8"
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-300 group-hover/card:opacity-100 motion-reduce:transition-none" />

        <div className="relative flex items-start justify-between gap-5">
          <h3 id={titleId} className="font-heading text-24 text-fg">
            {github ? (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="outline-none transition-colors duration-300 focus-visible:text-accent motion-reduce:transition-none"
              >
                {name}
              </a>
            ) : (
              name
            )}
          </h3>

          {github ? (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${name} repository on GitHub`}
              className="group/link inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors duration-300 hover:border-accent hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg motion-reduce:transition-none"
            >
              <span className="relative h-4 w-4">
                <GitHubIcon className="absolute inset-0 h-4 w-4 opacity-100 transition-opacity duration-300 group-hover/link:opacity-0 motion-reduce:transition-none" />
                <ArrowUpRight className="absolute inset-0 h-4 w-4 opacity-0 transition-opacity duration-300 group-hover/link:opacity-100 motion-reduce:transition-none" />
              </span>
            </a>
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
      </motion.article>
    </RevealOnView>
  );
}
