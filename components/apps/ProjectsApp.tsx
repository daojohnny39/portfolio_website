"use client";

import { ExternalLink } from "lucide-react";
import { projects } from "@/lib/data";

const cardChamfer = {
  clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)",
};

export default function ProjectsApp() {
  return (
    <div className="flex h-full flex-col bg-[#0A0A0F]">
      <header className="border-b border-[#2A2A3A] bg-[#12121A] px-4 py-3">
        <div className="flex items-center gap-3">
          <h2
            className="font-semibold uppercase tracking-wider text-[#F5C518]"
            style={{ fontFamily: "Orbitron" }}
          >
            Projects
          </h2>
          <span className="border border-[#2A2A3A] bg-[#1C1C2E] px-2 py-0.5 text-xs text-[#888899]">
            {projects.length}
          </span>
        </div>
      </header>

      <main className="hide-scrollbar flex-1 overflow-auto p-4">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.name}
              className="cursor-default border border-[#2A2A3A] bg-[#12121A] p-4 transition-all duration-200 hover:border-[#F5C518] hover:shadow-[0_0_16px_rgba(245,197,24,0.15)]"
              style={cardChamfer}
            >
              <h3
                className="text-sm font-semibold uppercase text-[#F5C518]"
                style={{ fontFamily: "Orbitron" }}
              >
                {project.name}
              </h3>

              <div className="my-2 flex flex-wrap gap-1.5">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="border border-[#00D4FF] bg-[#1C1C2E] px-2 py-0.5 text-xs text-[#00D4FF]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <ul className="space-y-1.5">
                {project.bullets.map((bullet) => (
                  <li key={bullet} className="text-xs leading-relaxed text-[#E0E0E0]">
                    ▶ {bullet}
                  </li>
                ))}
              </ul>

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 flex items-center gap-1 text-xs uppercase tracking-wider text-[#F5C518] transition-colors hover:text-[#C49B10]"
                >
                  // REPO
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
