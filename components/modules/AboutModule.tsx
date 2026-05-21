"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { GitBranch, Mail, MapPin } from "lucide-react"
import { personal, experience, education, skills } from "@/lib/data"

type ActiveTab = "bio" | "experience" | "education" | "skills"

const tabs: { id: ActiveTab; label: string }[] = [
  { id: "bio", label: "Bio" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
]

export default function AboutModule() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("bio")

  return (
    <section className="flex h-full flex-col bg-[--color-bg]">
      <header className="px-10 pt-10 pb-6">
        <h2 className="font-archivo text-3xl font-semibold text-[--color-fg]">
          About
        </h2>
        <p className="mt-1 truncate text-sm text-[--color-muted]">
          {personal.bio}
        </p>
      </header>

      <nav className="flex gap-6 border-b border-[--color-border] px-10 pb-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`py-3 text-sm transition-colors ${
              activeTab === tab.id
                ? "-mb-px border-b-2 border-[--color-fg] font-medium text-[--color-fg]"
                : "text-[--color-muted] hover:text-[--color-fg]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="hide-scrollbar flex-1 overflow-auto px-10 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {activeTab === "bio" && (
              <div>
                <h3 className="font-archivo text-2xl font-semibold text-[--color-fg]">
                  {personal.name}
                </h3>
                <p className="mt-1 text-sm text-[--color-muted]">
                  {personal.title}
                </p>

                <p className="mt-6 max-w-3xl text-sm leading-relaxed text-[--color-fg]">
                  {personal.bio}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 rounded-lg border border-[--color-border] px-4 py-3 text-sm text-[--color-fg]">
                    <MapPin size={16} />
                    <span>{personal.location}</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-[--color-border] px-4 py-3 text-sm text-[--color-fg]">
                    <Mail size={16} />
                    <span>{personal.email}</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-[--color-border] px-4 py-3 text-sm text-[--color-fg]">
                    <GitBranch size={16} />
                    <span>{personal.github}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "experience" && (
              <div>
                {experience.map((item) => (
                  <article
                    key={`${item.title}-${item.org}`}
                    className="mb-4 rounded-xl border border-[--color-border] p-6"
                  >
                    <p className="mb-1 text-xs text-[--color-muted]">
                      {item.period}
                    </p>
                    <h3 className="font-archivo font-semibold text-[--color-fg]">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 mb-4 text-sm text-[--color-muted]">
                      {item.org} · {item.location}
                    </p>
                    <ul className="space-y-2">
                      {item.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="text-sm leading-relaxed text-[--color-fg]"
                        >
                          <span className="text-[--color-muted]">— </span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            )}

            {activeTab === "education" && (
              <div>
                {education.map((item) => (
                  <article
                    key={`${item.school}-${item.degree}`}
                    className="mb-4 rounded-xl border border-[--color-border] p-6"
                  >
                    <p className="mb-1 text-xs text-[--color-muted]">
                      {item.period}
                    </p>
                    <h3 className="font-archivo font-semibold text-[--color-fg]">
                      {item.school}
                    </h3>
                    <p className="mt-0.5 text-sm text-[--color-muted]">
                      {item.degree}
                    </p>
                    {item.gpa && (
                      <p className="mt-4 text-sm text-[--color-fg]">
                        GPA: {item.gpa}
                      </p>
                    )}
                    <p className="mt-1 text-sm text-[--color-muted]">
                      {item.location}
                    </p>
                  </article>
                ))}
              </div>
            )}

            {activeTab === "skills" && (
              <div className="space-y-8">
                {Object.entries(skills).map(([category, items]) => (
                  <section key={category}>
                    <h3 className="mb-3 text-xs tracking-widest text-[--color-muted] uppercase">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-[--color-border] bg-[--color-surface] px-3 py-1 text-xs text-[--color-fg]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
