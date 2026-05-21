"use client";

import { useEffect, useState } from "react";

function formatClock(date: Date) {
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = date.getDate();
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${weekday} ${month} ${day} ${time}`;
}

export default function MenuBar() {
  const [clock, setClock] = useState(() => formatClock(new Date()));

  useEffect(() => {
    const interval = window.setInterval(() => {
      setClock(formatClock(new Date()));
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const navItems = ["FINDER", "FILE", "EDIT", "VIEW", "WINDOW", "HELP"];

  return (
    <div className="fixed left-0 top-0 z-[9999] flex h-8 w-full items-center justify-between border-b border-[#2A2A3A] bg-[#0A0A0F] px-4 text-xs">
      <div className="absolute left-0 top-0 h-full w-1 bg-[#F5C518] opacity-30" />

      <div className="flex items-center gap-4 pl-2">
        <span className="text-[#F5C518]">▶</span>
        {navItems.map((item) => (
          <span
            key={item}
            className="tracking-widest text-[#888899] transition-colors duration-150 hover:text-[#F5C518]"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <span className="tracking-wider text-[#00D4FF]">SYS_OK</span>
        <span className="text-[#2A2A3A]">|</span>
        <span className="uppercase tracking-widest text-[#F5C518]">{clock}</span>
      </div>
    </div>
  );
}
