"use client";

import { motion } from "framer-motion";

import type { Category, Photo } from "@/lib/photography";

export interface PhotoCardProps {
  photo: Photo;
  onClick: (photo: Photo) => void;
  index: number;
}

const MONTH_NAMES = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

const CATEGORY_LABELS: Record<Category, string> = {
  portrait: "Portrait",
  artsy: "Artsy",
  environment: "Environment",
  cars: "Cars",
  bw: "B&W",
};

function formatCaptionDate(date: Date) {
  const month = MONTH_NAMES[date.getMonth()];
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${month} ${day}, ${year}  ${hours}:${minutes}`;
}

export function PhotoCard({ photo, onClick, index }: PhotoCardProps) {
  const category = photo.categories[0];
  const categoryLabel = category ? CATEGORY_LABELS[category] : "Photo";

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.035, 0.42), duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onClick(photo)}
      className="group relative block w-full cursor-pointer overflow-hidden border border-[#1f1f25] bg-[#0d0d10] text-left transition-all duration-300 hover:border-[#00ffe1]/70 hover:shadow-[0_0_28px_rgba(0,255,225,0.18)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00ffe1]"
      style={{ borderRadius: 0 }}
    >
      <div className="relative overflow-hidden">
        <img
          src={photo.url}
          alt={`Cyberpunk 2077, ${photo.date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}`}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full transition duration-500 group-hover:scale-[1.015] group-hover:brightness-75"
          style={{ display: "block" }}
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="pointer-events-none absolute left-3 top-3 translate-y-1 border border-[#00ffe1] bg-[#050808]/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[#00ffe1] opacity-0 shadow-[0_0_16px_rgba(0,255,225,0.24)] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {categoryLabel}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[#1f1f25] bg-[#08080a] px-2.5 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8a8a93]">
        <span>{formatCaptionDate(photo.date)}</span>
        <span className="text-[#3b82f6]">{categoryLabel}</span>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 z-20 h-0 w-0 border-r-[14px] border-t-[14px] border-r-[#00ffe1] border-t-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100"
      />
    </motion.button>
  );
}
