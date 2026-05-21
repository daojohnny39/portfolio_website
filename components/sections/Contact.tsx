"use client";
import { motion } from "framer-motion";
import { personal } from "@/lib/data";
import GitHubIcon from "@/components/GitHubIcon";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 border-t border-[#1E1E1E]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs text-[#444444] mb-8 tracking-widest uppercase">Contact</p>

          <h2
            className="font-black text-[#EFEFEF] leading-none mb-8"
            style={{
              fontFamily: "Archivo, sans-serif",
              fontSize: "clamp(2.25rem, 7vw, 5.5rem)",
              letterSpacing: "-0.035em",
            }}
          >
            Let&apos;s work
            <br />
            together.
          </h2>

          <p className="text-[#888888] max-w-sm mb-12 leading-relaxed text-sm">
            Open to opportunities, collaborations, or just a conversation.
          </p>

          <div className="flex flex-col gap-4">
            <a
              href={`mailto:${personal.email}`}
              className="text-[#EFEFEF] text-base hover:text-[#3B82F6] transition-colors cursor-pointer w-fit"
            >
              {personal.email} ↗
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="text-[#555555] text-sm hover:text-[#EFEFEF] transition-colors cursor-pointer flex items-center gap-2 w-fit"
            >
              <GitHubIcon size={13} />
              github.com/daojohnny39
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
