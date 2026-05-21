"use client";
import { motion } from "framer-motion";

export default function Hobbies() {
  return (
    <section id="hobbies" className="py-24 px-6 border-t border-[#1E1E1E]">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs text-[#444444] mb-12 tracking-widest uppercase">Hobbies</p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm text-[#333333]"
        >
          Coming soon.
        </motion.p>
      </div>
    </section>
  );
}
