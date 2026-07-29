"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";

import { useFoldTransition } from "@/components/core/Providers";
import { EASE_OUT, fadeUp, spring, staggerContainer } from "@/lib/motion";
import { useHydratedReducedMotion } from "@/lib/useHydratedReducedMotion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Intro", href: "#intro" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
] as const;

const SECTION_IDS = ["intro", "experience", "projects", "education", "contact"] as const;

const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const desktopNavWidth = 220;

const desktopNavHeight = 520;

export function TopNav() {
  const router = useRouter();
  const { triggerTransition } = useFoldTransition();
  const shouldReduceMotion = useHydratedReducedMotion();
  const { scrollY } = useScroll();
  const [activeId, setActiveId] = useState<(typeof SECTION_IDS)[number]>("intro");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isWheelMode, setIsWheelMode] = useState(false);
  const [isWheelHovered, setIsWheelHovered] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dialIndex, setDialIndex] = useState<number | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const navItemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const isMenuOpenRef = useRef(false);
  const dialIndexRef = useRef(0);
  const [sectionProgress, setSectionProgress] = useState<number[]>(new Array(SECTION_IDS.length - 1).fill(0));
  const visibleSectionsRef = useRef(new Set<string>());
  const sectionBoundsRef = useRef<{ top: number; height: number }[]>([]);
  const activeNavId = activeId;
  const activeIndex = Math.max(
    0,
    NAV_LINKS.findIndex((link) => link.href.slice(1) === activeNavId),
  );
  const effectiveIndex = dialIndex ?? activeIndex;
  dialIndexRef.current = effectiveIndex;

  let smoothScrollPosition = 0;
  for (let i = sectionProgress.length - 1; i >= 0; i--) {
    if (sectionProgress[i] > 0) {
      smoothScrollPosition = i + Math.min(1, sectionProgress[i]);
      break;
    }
  }

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

    const progress = sectionBoundsRef.current.map(({ top, height }) =>
      Math.min(1, Math.max(0, (latest - top) / height))
    );
    if (progress.length > 0) setSectionProgress(progress);

    if (shouldReduceMotion || isMenuOpenRef.current) {
      setIsHidden(false);
      return;
    }

    setIsHidden(latest > 80);
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
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleSectionsRef.current.add(entry.target.id);
          } else {
            visibleSectionsRef.current.delete(entry.target.id);
          }
        }

        const lastVisible = [...SECTION_IDS].reverse().find(
          (id) => visibleSectionsRef.current.has(id),
        );

        if (lastVisible) {
          setActiveId(lastVisible as (typeof SECTION_IDS)[number]);
        }
      },
      {
        rootMargin: "10% 0px -100% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const computeBounds = () => {
      const bounds: { top: number; height: number }[] = [];
      for (let i = 0; i < SECTION_IDS.length - 1; i++) {
        const section = document.getElementById(SECTION_IDS[i]);
        const nextSection = document.getElementById(SECTION_IDS[i + 1]);
        if (section && nextSection) {
          bounds.push({
            top: section.offsetTop,
            height: nextSection.offsetTop - section.offsetTop,
          });
        } else {
          bounds.push({ top: 0, height: 1 });
        }
      }
      sectionBoundsRef.current = bounds;
    };
    computeBounds();
    window.addEventListener("resize", computeBounds);
    return () => window.removeEventListener("resize", computeBounds);
  }, []);

  const handleMobilePhotographyClick = () => {
    setIsMenuOpen(false);
    triggerTransition(() => router.push("/photography"), "right");
  };

  const handleIntroClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: shouldReduceMotion ? "auto" : "smooth" });
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

  useEffect(() => {
    if (isWheelMode && !isWheelHovered) {
      document.body.setAttribute("data-wheel-nav-expanded", "");
    } else {
      document.body.removeAttribute("data-wheel-nav-expanded");
    }

    return () => document.body.removeAttribute("data-wheel-nav-expanded");
  }, [isWheelMode, isWheelHovered]);


  return (
    <>
      <motion.header
        className={cn(
          "fixed left-0 top-[40%] z-50 hidden md:block",
          "px-2 py-4",
        )}
        animate={{
          width: desktopNavWidth,
          x: isWheelMode ? 0 : -desktopNavWidth,
          y: "-50%",
          opacity: isWheelMode ? 1 : 0,
        }}
        style={{ pointerEvents: isWheelMode ? "auto" : "none" }}
        transition={shouldReduceMotion ? { duration: 0 } : spring}
      >
        <nav aria-label="Primary navigation" className="flex flex-col items-start gap-3">
          <motion.div
            ref={navContainerRef}
            className="w-full overflow-hidden"
            animate={{
              height: !isWheelHovered ? 420 : desktopNavHeight,
            }}
            transition={shouldReduceMotion ? { duration: 0 } : spring}
            onMouseEnter={() => { setIsWheelHovered(true); setDialIndex(2); }}
            onMouseLeave={() => { setIsWheelHovered(false); setDialIndex(null); }}
            style={{
              maskImage: !isWheelHovered
                ? "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)"
                : "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
              WebkitMaskImage: !isWheelHovered
                ? "linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)"
                : "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
            }}
          >
            <div className="relative h-full w-full py-8">
              {NAV_LINKS.slice(0, -1).map((_, index) => {
                const barOffset = (index - smoothScrollPosition) * 180 - 8;
                const barDist = Math.abs(index - smoothScrollPosition);
                return (
                  <motion.div
                    key={`progress-${index}`}
                    className="absolute left-[6px] top-1/2 w-[2px] overflow-hidden rounded-full"
                    animate={{
                      translateY: isWheelHovered ? 0 : barOffset,
                      height: isWheelHovered ? 0 : 200,
                      opacity: isWheelHovered ? 0 : (index === 0 ? 0 : Math.max(0, 1 - barDist)),
                    }}
                    transition={shouldReduceMotion ? { duration: 0 } : spring}
                  >
                    <div className="absolute inset-0 rounded-full bg-blue-500/20" />
                    <motion.div
                      className="absolute inset-x-0 top-0 rounded-full bg-blue-500"
                      animate={{ height: `${sectionProgress[index] * 100}%` }}
                      transition={{ duration: 0.05, ease: "linear" }}
                    />
                  </motion.div>
                );
              })}
              {NAV_LINKS.map((link, index) => {
                const id = link.href.slice(1);
                const wheelOffset = index - effectiveIndex;
                const scrollOffset = (index - smoothScrollPosition) * 180;
                const scrollDist = Math.abs(index - smoothScrollPosition);
                const isActive = index === activeIndex;
                const isHiddenOnWheel = false;

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
                    onClick={id === "intro" ? handleIntroClick : undefined}
                    className={cn(
                      focusRing,
                      "group absolute left-0 top-1/2 flex h-9 w-full items-center justify-start rounded-full px-3 text-12 font-medium uppercase tracking-[0.18em] text-muted transition-colors duration-200 hover:text-fg",
                      isActive && "font-semibold text-white",
                    )}
                    animate={{
                      y: "-50%",
                      rotateX: 0,
                      translateY: !isWheelHovered
                        ? scrollOffset
                        : wheelOffset * 44,
                      translateZ: 0,
                      opacity: !isWheelHovered
                        ? (index === 0 ? 0 : Math.max(0, 1 - scrollDist))
                        : 1,
                      fontSize: !isWheelHovered ? "1.25rem" : "0.875rem",
                      pointerEvents: !isWheelHovered && (scrollDist > 0.8 || index === 0) ? "none" : "auto",
                    }}
                    transition={shouldReduceMotion ? { duration: 0 } : spring}
                    style={{
                      transformOrigin: "50% 50%",
                      fontSize: "0.875rem",
                    }}
                  >
                    {link.label}
                  </motion.a>
                );
              })}
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
                      onClick={(e) => {
                        if (link.href === "#intro") handleIntroClick(e as unknown as React.MouseEvent<HTMLAnchorElement>);
                        setIsMenuOpen(false);
                      }}
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
