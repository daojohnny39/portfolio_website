"use client";
import { motion } from "framer-motion";
import { personal } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="py-24 px-6 border-t border-[#1E1E1E]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs text-[#444444] mb-10 tracking-widest uppercase">About</p>

          <div className="grid md:grid-cols-[1fr_220px] gap-12 items-start">
            <div>
              <p className="text-[#EFEFEF] text-lg leading-relaxed mb-5 font-light">
                {personal.bio}
              </p>
              <p className="text-[#888888] leading-relaxed text-sm">
                I enjoy working across the full stack — from designing database schemas to
                building polished UIs. Currently focused on research at UMKC&apos;s ASSET Lab
                while completing my CS degree.
              </p>
            </div>

            <div className="space-y-2 text-sm text-[#555555]">
              <p>{personal.location}</p>
              <a
                href={`mailto:${personal.email}`}
                className="block hover:text-[#EFEFEF] transition-colors cursor-pointer"
              >
                {personal.email}
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                className="block hover:text-[#EFEFEF] transition-colors cursor-pointer"
              >
                github.com/daojohnny39
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
