"use client"

import { type Variants, motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { projects } from "@/lib/data"

const containerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
}

export default function ProjectsModule() {
  return (
    <section className="flex h-full flex-col bg-[--color-bg]">
      <header className="px-10 pt-10 pb-8">
        <h2 className="font-archivo text-3xl font-semibold text-[--color-fg]">
          Projects
        </h2>
        <p className="mt-1 text-sm text-[--color-muted]">Selected work</p>
      </header>

      <div className="hide-scrollbar flex-1 overflow-auto px-10 pb-10">
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 gap-6"
        >
          {projects.map((project) => (
            <motion.article
              key={project.name}
              variants={itemVariants}
              className="group rounded-2xl border border-[--color-border] bg-[--color-surface] p-7 transition-colors duration-200 hover:border-[--color-fg]"
            >
              <h3 className="font-archivo text-xl font-semibold text-[--color-fg]">
                {project.name}
              </h3>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[--color-border] bg-[--color-surface-2] px-2.5 py-0.5 text-xs text-[--color-muted]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <ul className="mt-4 space-y-1.5">
                {project.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="border-l-2 border-[--color-border] pl-3 text-sm leading-relaxed text-[--color-muted]"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>

              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-[--color-fg] transition-colors hover:text-[--color-muted]"
                >
                  GitHub
                  <ExternalLink size={12} />
                </a>
              ) : null}
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
