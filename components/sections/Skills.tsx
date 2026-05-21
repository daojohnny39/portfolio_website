"use client";
import { motion } from "framer-motion";
import { skills } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 border-t border-[#1E1E1E]">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs text-[#444444] mb-12 tracking-widest uppercase">Skills</p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {Object.entries(skills).map(([category, items]) => (
            <div key={category}>
              <p className="text-xs text-[#444444] uppercase tracking-widest mb-3">
                {category}
              </p>
              <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                {items.map((skill) => (
                  <span key={skill} className="text-sm text-[#888888]">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
