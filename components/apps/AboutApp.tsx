"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GitBranch, Mail, MapPin } from "lucide-react";
import { education, experience, personal, skills } from "@/lib/data";

type Tab = "bio" | "experience" | "education" | "skills";

const tabs: { id: Tab; label: string }[] = [
  { id: "bio", label: "Bio" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
];

const chamfer = {
  clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)",
};

export default function AboutApp() {
  const [activeTab, setActiveTab] = useState<Tab>("bio");

  return (
    <div className="flex h-full bg-[#0A0A0F]">
      <aside className="flex w-44 flex-col gap-1 border-r border-[#2A2A3A] bg-[#12121A] p-3">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            type="button"
            whileHover={{ x: 2 }}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full px-3 py-2 text-left text-xs uppercase tracking-widest transition-colors ${
              activeTab === tab.id
                ? "border-l-2 border-[#F5C518] bg-[#1C1C2E] text-[#F5C518]"
                : "text-[#888899] hover:bg-[#1C1C2E] hover:text-[#E0E0E0]"
            }`}
          >
            {tab.label}
          </motion.button>
        ))}
      </aside>

      <main className="hide-scrollbar flex-1 overflow-auto p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {activeTab === "bio" && (
              <section className="space-y-6">
                <div className="border border-[#2A2A3A] bg-[#12121A] p-6" style={chamfer}>
                  <div className="mb-5 flex items-center gap-4">
                    <div
                      className="flex h-20 w-20 items-center justify-center border border-[#F5C518] bg-[#1C1C2E] text-3xl font-semibold text-[#F5C518]"
                      style={{ fontFamily: "Orbitron" }}
                    >
                      JD
                    </div>
                    <div>
                      <h2
                        className="text-2xl font-semibold uppercase tracking-wider text-[#F5C518]"
                        style={{ fontFamily: "Orbitron" }}
                      >
                        {personal.name}
                      </h2>
                      <p className="mt-1 text-xs uppercase tracking-widest text-[#888899]">
                        {personal.title}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-[#E0E0E0]">{personal.bio}</p>
                </div>

                <div className="grid gap-3 text-sm">
                  <div className="flex items-center gap-3 border border-[#2A2A3A] bg-[#12121A] p-3">
                    <MapPin className="h-4 w-4 text-[#00D4FF]" />
                    <span className="text-[#E0E0E0]">{personal.location}</span>
                  </div>
                  <div className="flex items-center gap-3 border border-[#2A2A3A] bg-[#12121A] p-3">
                    <Mail className="h-4 w-4 text-[#00D4FF]" />
                    <span className="text-[#E0E0E0]">{personal.email}</span>
                  </div>
                  <div className="flex items-center gap-3 border border-[#2A2A3A] bg-[#12121A] p-3">
                    <GitBranch className="h-4 w-4 text-[#00D4FF]" />
                    <span className="text-[#E0E0E0]">{personal.github}</span>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "experience" && (
              <section className="space-y-5">
                {experience.map((item) => (
                  <article
                    key={`${item.title}-${item.period}`}
                    className="border border-[#2A2A3A] bg-[#12121A] p-5"
                    style={chamfer}
                  >
                    <p className="mb-2 text-xs text-[#00D4FF]">{item.period}</p>
                    <h3
                      className="font-semibold uppercase text-[#F5C518]"
                      style={{ fontFamily: "Orbitron" }}
                    >
                      {item.title}
                    </h3>
                    <p className="mb-4 text-sm text-[#888899]">
                      {item.org} · {item.location}
                    </p>
                    <ul className="space-y-2">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="text-sm leading-relaxed text-[#E0E0E0]">
                          ▶ {bullet}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </section>
            )}

            {activeTab === "education" && (
              <section className="space-y-4">
                {education.map((item) => (
                  <article
                    key={item.school}
                    className="border border-[#2A2A3A] bg-[#12121A] p-5"
                    style={chamfer}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3
                          className="font-semibold uppercase text-[#F5C518]"
                          style={{ fontFamily: "Orbitron" }}
                        >
                          {item.school}
                        </h3>
                        <p className="mt-1 text-sm text-[#888899]">{item.degree}</p>
                        {item.gpa && <p className="mt-2 text-sm text-[#00D4FF]">{item.gpa}</p>}
                      </div>
                      <div className="text-right text-xs text-[#00D4FF]">
                        <p>{item.period}</p>
                        <p className="mt-1 text-[#888899]">{item.location}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </section>
            )}

            {activeTab === "skills" && (
              <section className="space-y-5">
                {Object.entries(skills).map(([category, items]) => (
                  <div
                    key={category}
                    className="border border-[#2A2A3A] bg-[#12121A] p-5"
                    style={chamfer}
                  >
                    <h3
                      className="mb-3 text-sm font-semibold uppercase text-[#F5C518]"
                      style={{ fontFamily: "Orbitron" }}
                    >
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <span
                          key={skill}
                          className="border border-[#2A2A3A] bg-[#1C1C2E] px-2 py-0.5 text-xs text-[#E0E0E0]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
