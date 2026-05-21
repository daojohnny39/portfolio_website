"use client";
import { motion } from "framer-motion";
import { projects } from "@/lib/data";
import GitHubIcon from "@/components/GitHubIcon";

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 border-t border-[#1E1E1E]">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs text-[#444444] mb-12 tracking-widest uppercase">Projects</p>

        <div className="divide-y divide-[#1E1E1E]">
          {projects.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="grid md:grid-cols-[180px_1fr] gap-6 py-10 first:pt-0 last:pb-0"
            >
              {/* Stack tags */}
              <div className="pt-0.5">
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                  {proj.stack.map((tech) => (
                    <span key={tech} className="text-xs text-[#444444]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div>
                <div className="flex items-start justify-between mb-3 gap-4">
                  <h3
                    className="text-[#EFEFEF] font-semibold"
                    style={{ fontFamily: "Archivo, sans-serif" }}
                  >
                    {proj.name}
                  </h3>
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub repo"
                      className="text-[#444444] hover:text-[#EFEFEF] transition-colors cursor-pointer shrink-0 mt-0.5"
                    >
                      <GitHubIcon size={15} />
                    </a>
                  )}
                </div>
                <ul className="space-y-2">
                  {proj.bullets.map((b, j) => (
                    <li key={j} className="text-sm text-[#888888] leading-relaxed">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
