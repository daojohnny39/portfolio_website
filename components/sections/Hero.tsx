"use client";
import { motion } from "framer-motion";
import { personal } from "@/lib/data";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-14">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <p className="text-[#555555] text-sm mb-10 tracking-wide">
            Software Developer · {personal.location}
          </p>

          <h1
            className="font-black leading-none text-[#EFEFEF] mb-8"
            style={{
              fontFamily: "Archivo, sans-serif",
              fontSize: "clamp(3.5rem, 11vw, 9.5rem)",
              letterSpacing: "-0.04em",
            }}
          >
            Johnny
            <br />
            Dao.
          </h1>

          <p className="text-[#888888] text-lg max-w-lg mb-14 leading-relaxed font-light">
            {personal.bio}
          </p>

          <div className="flex gap-8">
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-[#EFEFEF] hover:text-[#3B82F6] transition-colors cursor-pointer"
            >
              GitHub ↗
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="text-sm text-[#EFEFEF] hover:text-[#3B82F6] transition-colors cursor-pointer"
            >
              Email ↗
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
