"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";

import { useFoldTransition } from "@/components/core/Providers";
import { EASE_OUT, fadeUp, spring, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Intro", href: "#intro" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
] as const;

const SECTION_IDS = ["intro", "hero", "about", "experience", "projects", "education", "contact"] as const;

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const desktopNavWidth = {
  collapsed: 48,
  expanded: 220,
} as const;

const desktopNavHeight = {
  collapsed: 200,
  expanded: 320,
  wheel: 380,
} as const;

export function TopNav() {
  const router = useRouter();
  const { triggerFold } = useFoldTransition();
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [activeId, setActiveId] = useState<(typeof SECTION_IDS)[number]>("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isWheelMode, setIsWheelMode] = useState(false);
  const [isWheelHovered, setIsWheelHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navScrollRef = useRef<HTMLDivElement | null>(null);
  const navItemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const isMenuOpenRef = useRef(false);
  const activeNavId = activeId === "hero" ? "intro" : activeId;
  const activeIndex = Math.max(
    0,
    NAV_LINKS.findIndex((link) => link.href.slice(1) === activeNavId),
  );

  useEffect(() => {
    isMenuOpenRef.current = isMenuOpen;

    if (isMenuOpen) {
      setIsHidden(false);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const latest = scrollY.get();

    setIsScrolled(latest > 24);
    setIsWheelMode(latest > 300);
  }, [scrollY]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? latest;

    setIsScrolled(latest > 24);
    setIsWheelMode(latest > 300);

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

  useEffect(() => {
    if (isWheelMode) {
      return;
    }

    const container = navScrollRef.current;
    const item = navItemRefs.current[activeId];

    if (!container || !item) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      container.scrollTo({
        top: Math.max(0, item.offsetTop - container.clientHeight / 2 + item.clientHeight / 2),
        behavior: shouldReduceMotion ? "auto" : "smooth",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [activeId, isWheelMode, shouldReduceMotion]);

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
          "fixed left-0 top-1/2 z-50 hidden md:block",
          "px-2 py-4",
        )}
        animate={{
          width: desktopNavWidth.expanded,
          x: 0,
          y: "-50%",
        }}
        transition={shouldReduceMotion ? { duration: 0 } : spring}
      >
        <nav aria-label="Primary navigation" className="flex flex-col items-start gap-3">
          <motion.div
            className="w-full overflow-hidden"
            animate={{
              height: isWheelHovered ? 500 : (isWheelMode ? desktopNavHeight.wheel : desktopNavHeight.expanded),
            }}
            transition={shouldReduceMotion ? { duration: 0 } : spring}
            onMouseEnter={() => isWheelMode && setIsWheelHovered(true)}
            onMouseLeave={() => setIsWheelHovered(false)}
            style={{
              maskImage: isWheelHovered
                ? "none"
                : "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
              WebkitMaskImage: isWheelHovered
                ? "none"
                : "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
            }}
          >
            <div className="relative h-full">
              <AnimatePresence initial={false}>
                {!isWheelMode ? (
                  <motion.div
                    key="flat-nav"
                    className="absolute inset-0"
                    initial={shouldReduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={shouldReduceMotion ? { duration: 0 } : spring}
                  >
                    <div
                      ref={navScrollRef}
                      className="relative h-full overflow-y-auto py-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        {NAV_LINKS.map((link) => {
                          const id = link.href.slice(1);
                          const isActive = activeId === id || (id === "intro" && activeId === "hero");

                          return (
                            <a
                              key={link.href}
                              ref={(element) => {
                                navItemRefs.current[id] = element;
                              }}
                              href={link.href}
                              data-cursor
                              aria-label={link.label}
                              aria-current={isActive ? "location" : undefined}
                              className={cn(
                                focusRing,
                                "group relative flex h-9 w-full items-center rounded-full border text-12 font-medium uppercase tracking-[0.18em] transition-colors duration-200",
                                "justify-start gap-2 px-3",
                                isActive
                                  ? "border-transparent font-semibold text-white"
                                  : "border-transparent text-muted hover:border-border hover:bg-bg/30 hover:text-fg",
                              )}
                            >
                              <span
                                aria-hidden="true"
                                className={cn(
                                  "h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-200",
                                  isActive ? "scale-125 bg-accent" : "bg-muted group-hover:bg-fg",
                                )}
                              />
                              <motion.span
                                className="overflow-hidden whitespace-nowrap"
                                animate={{
                                  maxWidth: 150,
                                  opacity: 1,
                                }}
                                transition={shouldReduceMotion ? { duration: 0 } : spring}
                              >
                                {link.label}
                              </motion.span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="wheel-nav"
                    className="absolute inset-0 py-8"
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={shouldReduceMotion ? { duration: 0 } : spring}
                  >
                    <div className="relative h-full w-full">
                      {NAV_LINKS.map((link, index) => {
                        const id = link.href.slice(1);
                        const offset = index - activeIndex;
                        const isActive = offset === 0;
                        const isHiddenOnWheel = !isWheelHovered && Math.abs(offset) >= 3;

                        return (
                          <motion.a
                            key={link.href}
                            ref={(element) => {
                              navItemRefs.current[id] = element;
                            }}
                            href={link.href}
                            data-cursor
                            aria-label={link.label}
                            aria-current={isActive ? "location" : undefined}
                            className={cn(
                              focusRing,
                              "group absolute left-0 top-1/2 flex h-9 w-full items-center justify-start rounded-full px-3 text-12 font-medium uppercase tracking-[0.18em] text-muted transition-colors duration-200 hover:text-fg",
                              isActive && "font-semibold text-white",
                            )}
                            animate={{
                              y: "-50%",
                              rotateX: 0,
                              translateY: offset * 62,
                              translateZ: 0,
                              opacity: isHiddenOnWheel ? 0 : isWheelHovered ? Math.max(0.4, 1 - Math.abs(offset) * 0.18) : Math.max(0, 1 - Math.abs(offset) * 0.35),
                              pointerEvents: isHiddenOnWheel ? "none" : "auto",
                            }}
                            transition={shouldReduceMotion ? { duration: 0 } : spring}
                            style={{
                              transformOrigin: "50% 50%",
                            }}
                          >
                            {link.label}
                          </motion.a>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </nav>
      </motion.header>

      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 md:hidden",
          isScrolled || isMenuOpen ? "border-border bg-bg/70 backdrop-blur-xl" : "border-transparent bg-transparent",
        )}
        animate={{ y: shouldReduceMotion || !isHidden ? 0 : "-100%" }}
        transition={shouldReduceMotion ? { duration: 0 } : spring}
      >
        <div className="flex h-16 items-center justify-end px-5">
          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            data-cursor
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
            className={cn(
              focusRing,
              "inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-fg transition-colors duration-200 hover:border-accent hover:text-accent",
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
