"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";

import { useFoldTransition } from "@/components/core/Providers";
import { cn } from "@/lib/utils";
import { EASE_OUT, fadeUp, spring, staggerContainer } from "@/lib/motion";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
] as const;

const SECTION_IDS = ["hero", "about", "experience", "projects", "skills", "education", "contact"] as const;

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

export function TopNav() {
  const router = useRouter();
  const { triggerFold } = useFoldTransition();
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [activeId, setActiveId] = useState<(typeof SECTION_IDS)[number]>("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMenuOpenRef = useRef(false);

  useEffect(() => {
    isMenuOpenRef.current = isMenuOpen;

    if (isMenuOpen) {
      setIsHidden(false);
    }
  }, [isMenuOpen]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? latest;

    setIsScrolled(latest > 24);

    if (shouldReduceMotion || isMenuOpenRef.current) {
      setIsHidden(false);
      return;
    }

    setIsHidden(latest > 80 && latest > previous);
  });

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
    triggerFold(() => router.push("/photography"));
  };

  const handleMobilePhotographyClick = () => {
    setIsMenuOpen(false);
    triggerFold(() => router.push("/photography"));
  };

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
          isScrolled || isMenuOpen ? "border-border bg-bg/70 backdrop-blur-xl" : "border-transparent bg-transparent",
        )}
        animate={{ y: shouldReduceMotion || !isHidden ? 0 : "-100%" }}
        transition={shouldReduceMotion ? { duration: 0 } : spring}
      >
        <div className="mx-auto grid h-16 max-w-container grid-cols-[1fr_auto_1fr] items-center px-5 md:px-6">
          <nav aria-label="Primary navigation" className="col-start-2 hidden items-center gap-2 md:flex">
            {NAV_LINKS.map((link) => {
              const id = link.href.slice(1);
              const isActive = activeId === id;

              return (
                <Fragment key={link.href}>
                  <a
                    href={link.href}
                    data-cursor
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      focusRing,
                      "group relative flex h-12 items-center px-4 text-14 font-medium transition-colors duration-200",
                      isActive ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        "absolute bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent opacity-0 transition-opacity duration-200",
                        isActive && "opacity-100",
                      )}
                    />
                  </a>
                  {link.label === "Education" ? (
                    <button
                      type="button"
                      data-cursor
                      onClick={handlePhotographyClick}
                      className={cn(
                        focusRing,
                        "group relative flex h-12 items-center px-4 text-14 font-medium text-muted transition-colors duration-200 hover:text-fg",
                      )}
                    >
                      Photography
                    </button>
                  ) : null}
                </Fragment>
              );
            })}

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              download
              data-cursor
              className={cn(
                focusRing,
                "ml-4 inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-14 font-medium text-fg transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-bg",
              )}
            >
              Resume
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </nav>

          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            data-cursor
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
            className={cn(
              focusRing,
              "col-start-3 ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-fg transition-colors duration-200 hover:border-accent hover:text-accent md:hidden",
            )}
          >
            {isMenuOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 bg-bg md:hidden"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.2, ease: EASE_OUT }}
          >
            <motion.nav
              aria-label="Mobile navigation"
              className="flex min-h-dvh flex-col justify-end px-6 pb-12 pt-28"
              variants={staggerContainer}
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
              exit="exit"
            >
              <div className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <Fragment key={link.href}>
                    <motion.a
                      href={link.href}
                      data-cursor
                      variants={fadeUp}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        focusRing,
                        "flex min-h-14 items-center border-b border-border py-4 font-heading text-40 leading-none tracking-tight text-fg transition-colors duration-200 hover:text-accent",
                      )}
                    >
                      {link.label}
                    </motion.a>
                    {link.label === "Education" ? (
                      <motion.button
                        type="button"
                        data-cursor
                        variants={fadeUp}
                        onClick={handleMobilePhotographyClick}
                        className={cn(
                          focusRing,
                          "flex min-h-14 w-full items-center border-b border-border py-4 text-left font-heading text-40 leading-none tracking-tight text-fg transition-colors duration-200 hover:text-accent",
                        )}
                      >
                        Photography
                      </motion.button>
                    ) : null}
                  </Fragment>
                ))}
              </div>

              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                download
                data-cursor
                variants={fadeUp}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  focusRing,
                  "mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-accent px-5 text-14 font-semibold uppercase tracking-[0.2em] text-accent transition-colors duration-200 hover:bg-accent hover:text-bg",
                )}
              >
                Resume
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </motion.a>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
