"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useFoldTransition } from "@/components/core/Providers";
import { EASE_OUT } from "@/lib/motion";
import { useHydratedReducedMotion } from "@/lib/useHydratedReducedMotion";
import { cn } from "@/lib/utils";

export interface PhotographyNavProps {
  totalPhotoCount: number;
}

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--fg))] focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--bg))]";

export function PhotographyNav(_props: PhotographyNavProps) {
  const router = useRouter();
  const { triggerTransition } = useFoldTransition();
  const shouldReduceMotion = useHydratedReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY <= 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAboutClick = () => {
    triggerTransition(() => router.push("/"), "left");
  };

  const handlePhotographyClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-40 h-16 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/95 backdrop-blur-sm"
      initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -64 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3, ease: EASE_OUT }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <div className="flex h-full items-center justify-center px-4 md:px-6">
        <nav aria-label="Site navigation" className="flex items-center gap-6">
          <button
            type="button"
            onClick={handleAboutClick}
            className={cn(
              focusRing,
              "group relative py-2 text-xs font-medium uppercase tracking-widest transition-colors duration-200",
              "text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))]",
            )}
          >
            About Me
            <span
              aria-hidden="true"
              className="absolute -bottom-0.5 left-1/2 h-px w-0 -translate-x-1/2 bg-[rgb(var(--accent))] opacity-0 transition-all duration-200 group-hover:w-8 group-hover:opacity-100"
            />
          </button>

          <button
            type="button"
            onClick={handlePhotographyClick}
            className={cn(
              focusRing,
              "group relative py-2 text-xs font-medium uppercase tracking-widest transition-colors duration-200",
              "text-[rgb(var(--fg))]",
            )}
          >
            Photography
            <span
              aria-hidden="true"
              className="absolute -bottom-0.5 left-1/2 h-px w-8 -translate-x-1/2 bg-[rgb(var(--accent))] transition-all duration-200"
            />
          </button>
        </nav>
      </div>
    </motion.header>
  );
}
