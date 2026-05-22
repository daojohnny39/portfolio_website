"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useFoldTransition } from "@/components/core/Providers";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

const SECTION_IDS = ["hero", "about", "experience", "projects", "skills", "education", "contact"] as const;

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export function GhostTopNav() {
  const router = useRouter();
  const { triggerTransition } = useFoldTransition();
  const shouldReduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<(typeof SECTION_IDS)[number]>("hero");

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (section): section is HTMLElement => Boolean(section),
    );

    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);

        if (visibleEntry?.target.id && SECTION_IDS.includes(visibleEntry.target.id as (typeof SECTION_IDS)[number])) {
          setActiveId(visibleEntry.target.id as (typeof SECTION_IDS)[number]);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handlePhotographyClick = () => {
    triggerTransition(() => router.push("/photography"), "right");
  };

  return (
    <motion.nav
      aria-label="Featured navigation"
      className="fixed left-1/2 top-6 z-50 hidden items-center gap-8 md:flex"
      initial={shouldReduceMotion ? false : { opacity: 0, x: "-50%", y: -8 }}
      animate={{ opacity: 1, x: "-50%", y: 0 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.35, ease: EASE_OUT }}
    >
      <a
        href="#about"
        data-cursor
        aria-current={activeId === "about" ? "location" : undefined}
        className={cn(
          focusRing,
          "group relative py-2 text-14 font-medium transition-colors duration-200",
          activeId === "about" ? "text-fg" : "text-muted hover:text-fg",
        )}
      >
        About me
        <span
          aria-hidden="true"
          className={cn(
            "absolute -bottom-0.5 left-1/2 h-px w-0 -translate-x-1/2 bg-accent transition-all duration-200",
            activeId === "about" && "w-8",
          )}
        />
      </a>

      <button
        type="button"
        data-cursor
        onClick={handlePhotographyClick}
        className={cn(
          focusRing,
          "group relative py-2 text-14 font-medium text-muted transition-colors duration-200 hover:text-fg",
        )}
      >
        Photography
        <span
          aria-hidden="true"
          className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        />
      </button>
    </motion.nav>
  );
}
