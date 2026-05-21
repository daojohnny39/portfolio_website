"use client";
import { motion } from "framer-motion";
import { education } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 border-t border-[#1E1E1E]">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs text-[#444444] mb-12 tracking-widest uppercase">Education</p>

        <div className="space-y-14">
          {education.map((edu, i) => (
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
                <p className="text-xs text-[#444444]">{edu.period}</p>
                <p className="text-xs text-[#444444] mt-1">{edu.location}</p>
              </div>

              {/* Content */}
              <div className="border-l border-[#1E1E1E] pl-6">
                <h3
                  className="text-[#EFEFEF] font-semibold mb-1"
                  style={{ fontFamily: "Archivo, sans-serif" }}
                >
                  {edu.school}
                </h3>
                <p className="text-sm text-[#888888] mb-1">{edu.degree}</p>
                {edu.gpa && (
                  <p className="text-xs text-[#555555]">{edu.gpa}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
