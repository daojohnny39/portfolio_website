"use client";

import React from "react";
import { motion } from "framer-motion";

interface DockProps {
  apps: { id: string; label: string; icon: React.ReactNode }[];
  openWindows: string[];
  onOpenApp: (id: string) => void;
}

export default function Dock({ apps, openWindows, onOpenApp }: DockProps) {
  return (
    <div className="fixed bottom-4 left-1/2 z-[9998] -translate-x-1/2">
      <div
        className="relative flex items-end gap-2 border border-[#2A2A3A] bg-[#12121A] px-3 py-2"
        style={{
          clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
        }}
      >
        <div className="absolute left-0 top-0 h-px w-full bg-[#F5C518]" />

        {apps.map((app) => (
          <motion.button
            key={app.id}
            type="button"
            whileHover={{ scale: 1.25, y: -8 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
            onClick={() => onOpenApp(app.id)}
            className="group relative flex flex-col items-center gap-1"
          >
            <span className="pointer-events-none absolute -top-9 border border-[#F5C518] bg-[#0A0A0F] px-2 py-1 text-xs uppercase tracking-wider text-[#F5C518] opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
              {app.label}
            </span>

            <span className="flex h-12 w-12 items-center justify-center border border-[#2A2A3A] bg-[#0A0A0F] text-[#888899] transition-all group-hover:border-[#F5C518] group-hover:bg-[#1C1C2E] group-hover:text-[#F5C518] group-hover:shadow-[0_0_12px_rgba(245,197,24,0.3)]">
              {app.icon}
            </span>

            <span
              className={`h-1 w-1 ${
                openWindows.includes(app.id) ? "bg-[#F5C518]" : "bg-transparent"
              }`}
            />
          </motion.button>
        ))}

        <div className="mx-1 h-10 border-l border-[#2A2A3A]" />
      </div>
    </div>
  );
}
