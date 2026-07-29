"use client";

import { ChevronDown, MapPin } from "lucide-react";
import { GitHubIcon } from "@/components/ui/GitHubIcon";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { MotionStyle, Transition } from "framer-motion";
import { useRef } from "react";

import { EASE_OUT } from "@/lib/motion";
import { useHydratedReducedMotion } from "@/lib/useHydratedReducedMotion";
import { personal } from "@/lib/data";
import { cn } from "@/lib/utils";

const headlineLines = ["Johnny", "Dao"] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useHydratedReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  const parallaxStyle: MotionStyle = shouldReduceMotion
    ? {}
    : { y: parallaxY, opacity: parallaxOpacity };

  const itemInitial = shouldReduceMotion
    ? { opacity: 0, y: 0 }
    : { opacity: 0, y: 18 };

  const itemAnimate = { opacity: 1, y: 0 };

  const lineInitial = shouldReduceMotion
    ? { opacity: 0, y: "0%" }
    : { opacity: 0, y: "110%" };

  const lineAnimate = { opacity: 1, y: "0%" };

  const transition = (delay: number): Transition => ({
    duration: shouldReduceMotion ? 0.2 : 0.72,
    ease: EASE_OUT,
    delay: shouldReduceMotion ? 0 : delay,
  });

  const lineTransition = (delay: number): Transition => ({
    duration: shouldReduceMotion ? 0.2 : 0.84,
    ease: EASE_OUT,
    delay: shouldReduceMotion ? 0 : delay,
  });

  const ctaClassName = cn(
    "inline-flex min-h-11 items-center justify-center rounded-lg px-5 font-heading text-12 font-semibold uppercase tracking-widest transition duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
  );

  return (
    <section
      ref={sectionRef}
      id="intro"
      className="hero-shell relative flex min-h-dvh items-center py-24 md:py-28"
    >
      <motion.div
        style={parallaxStyle}
        className="relative z-10 mx-auto w-full max-w-container px-5 md:px-6"
      >
        <div className="max-w-[940px]">
          <div>
            <h1 className="font-heading text-hero font-semibold leading-[0.88] tracking-[-0.06em] text-fg">
              {headlineLines.map((line, index) => (
                <span key={line} className="block overflow-hidden pb-2">
                  <motion.span
                    initial={lineInitial}
                    animate={lineAnimate}
                    transition={lineTransition(0.18 + index * 0.12)}
                    className="block will-change-transform"
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.div
              initial={itemInitial}
              animate={itemAnimate}
              transition={transition(0.5)}
              className="mt-8 max-w-2xl"
            >
              <p className="text-18 leading-relaxed text-fg md:text-24">
                Computer Science student at UMKC with a 3.8 GPA, focused on{" "}
                <em>full-stack development</em> and <em>AI/ML</em>. Looking to
                contribute to <em>meaningful projects</em> and <em>grow</em> as
                a software engineer.
              </p>

              <p className="mt-3 flex items-center gap-2 text-14 text-muted md:text-16">
                <MapPin className="size-4 text-accent" aria-hidden="true" />
                {personal.location}
              </p>
            </motion.div>

            <motion.div
              initial={itemInitial}
              animate={itemAnimate}
              transition={transition(0.64)}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                data-cursor="link"
                className={cn(
                  ctaClassName,
                  "bg-accent text-bg hover:-translate-y-0.5 hover:text-white",
                )}
              >
                View Projects
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                className={cn(
                  ctaClassName,
                  "border border-border text-fg hover:-translate-y-0.5 hover:border-accent",
                )}
              >
                Resume
              </a>

              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                aria-label="Open GitHub profile"
                data-cursor="link"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border text-fg transition duration-300 hover:-translate-y-0.5 hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <GitHubIcon className="size-5" />
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted md:left-[calc(50%-2.5rem)]"
        animate={
          shouldReduceMotion
            ? undefined
            : { y: [0, 8, 0], opacity: [0.55, 1, 0.55] }
        }
        transition={
          shouldReduceMotion
            ? undefined
            : { duration: 1.8, ease: EASE_OUT, repeat: Infinity }
        }
      >
        <span className="font-heading text-12 uppercase tracking-widest">
          Scroll
        </span>
        <ChevronDown className="size-4" aria-hidden="true" />
      </motion.div>
    </section>
  );
}
