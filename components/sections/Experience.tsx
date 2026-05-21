"use client";
import { motion } from "framer-motion";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 border-t border-[#1E1E1E]">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs text-[#444444] mb-12 tracking-widest uppercase">Experience</p>

        <div className="space-y-14">
          {experience.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="grid md:grid-cols-[180px_1fr] gap-6"
            >
              {/* Meta */}
              <div className="pt-0.5">
                <p className="text-xs text-[#444444] leading-relaxed">{job.period}</p>
                <p className="text-xs text-[#444444] mt-1">{job.location}</p>
              </div>

              {/* Content */}
              <div className="border-l border-[#1E1E1E] pl-6">
                <h3
                  className="text-[#EFEFEF] font-semibold mb-1"
                  style={{ fontFamily: "Archivo, sans-serif" }}
                >
                  {job.title}
                </h3>
                <p className="text-sm text-[#666666] mb-5">{job.org}</p>
                <ul className="space-y-2.5">
                  {job.bullets.map((b, j) => (
                    <li key={j} className="text-sm text-[#888888] leading-relaxed flex gap-3">
                      <span className="text-[#333333] shrink-0 mt-px">—</span>
                      <span>{b}</span>
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
