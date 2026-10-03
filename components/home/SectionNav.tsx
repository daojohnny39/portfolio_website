"use client";

import { X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import { personal, sections, type SectionSlug } from "@/lib/data";
import { cn } from "@/lib/utils";

import { LinkRow } from "./LinkRow";
import { PhotographyRow } from "./PhotographyRow";
import { delay, rowDelay } from "./Section";

const PANEL_ID = "section-panel";
const buttonId = (slug: SectionSlug) => `section-button-${slug}`;
const chipId = (slug: SectionSlug) => `section-chip-${slug}`;
const initials = personal.name
  .split(" ")
  .map((word) => word[0])
  .join("");

/**
 * Home page nav plus the section view. Opening a section sets data-open on
 * the panel. globals.css keys off that: on wide screens the hero folds into a
 * narrow column of small buttons (name to initials, bio and icons hidden) and
 * the section slides in beside it. On small screens the section covers the
 * page.
 */
export function SectionNav({ content }: { content: Record<SectionSlug, ReactNode> }) {
  const panelRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const chipRowRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<SectionSlug | null>(null);
  const [open, setOpen] = useState(false);
  // Bumped on every open or switch so the panel body remounts and its entrance
  // animation plays again.
  const [view, setView] = useState(0);

  const show = (slug: SectionSlug) => {
    // The folded column sits at the top of the page, so bring the page back up.
    if (!open && window.matchMedia("(min-width: 1024px)").matches) window.scrollTo({ top: 0 });
    setActive(slug);
    setOpen(true);
    setView((v) => v + 1);
    panelRef.current?.scrollTo({ top: 0 });
  };

  const close = useCallback(() => {
    setOpen(false);
    // The panel turns invisible as it slides out. If focus was inside it,
    // hand focus back to the button for the section that was showing.
    if (active && panelRef.current?.contains(document.activeElement)) {
      document.getElementById(buttonId(active))?.focus({ preventScroll: true });
    }
  }, [active]);

  // Move focus to the new heading so keyboard and screen reader users land in
  // the content they just opened. On small screens, center the matching chip.
  // Scrolling the row directly keeps the page itself from moving.
  useEffect(() => {
    if (!open || !active) return;
    titleRef.current?.focus({ preventScroll: true });
    const row = chipRowRef.current;
    const chip = document.getElementById(chipId(active));
    if (row && chip) {
      row.scrollTo({ left: chip.offsetLeft - (row.clientWidth - chip.offsetWidth) / 2, behavior: "smooth" });
    }
  }, [open, active, view]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  const index = sections.findIndex((s) => s.slug === active);
  const section = index === -1 ? undefined : sections[index];
  const next = section ? sections[index + 1] : undefined;

  return (
    <>
      <nav aria-label="Site" className="home-nav mt-11 flex w-full flex-col gap-3 sm:mt-12">
        {sections.map((s, i) => {
          const expanded = open && active === s.slug;
          return (
            <LinkRow
              key={s.slug}
              id={buttonId(s.slug)}
              label={s.title}
              detail={s.summary}
              expanded={expanded}
              controls={PANEL_ID}
              onClick={() => (expanded ? close() : show(s.slug))}
              className="home-navrow home-enter"
              style={rowDelay(i)}
            />
          );
        })}
        {/* Outlined while a section is open, so the open section's button is the only filled one. */}
        <LinkRow
          variant={open ? "outline" : "solid"}
          href={personal.resume}
          newTab
          label="Résumé"
          detail="PDF"
          className="home-navrow home-enter"
          style={rowDelay(sections.length)}
        />
        <PhotographyRow className="home-navrow home-enter" style={rowDelay(sections.length + 1)} />
      </nav>

      <section
        ref={panelRef}
        id={PANEL_ID}
        aria-labelledby="section-panel-title"
        data-open={open ? "" : undefined}
        className="home-panel fixed inset-y-0 right-0 z-40 w-full overflow-y-auto overscroll-contain bg-bg text-left text-fg"
      >
        <div className="sticky top-0 z-10 bg-bg">
          <div className="flex min-h-16 items-center justify-between px-[clamp(1.5rem,5vw,4rem)] lg:justify-end">
            <span aria-hidden="true" className="font-serif text-[1.75rem] italic leading-none lg:hidden">
              {initials}
            </span>
            <button
              type="button"
              onClick={close}
              className="group -mr-2 inline-flex min-h-11 items-center gap-2.5 px-2 font-label text-[0.75rem] font-medium uppercase tracking-[0.24em] text-fg outline-none transition-opacity duration-300 hover:opacity-55 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-fg"
            >
              Close
              <X
                aria-hidden="true"
                strokeWidth={1.5}
                className="size-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-90"
              />
            </button>
          </div>

          {/* Small screens have no room for the folded column, so the sections
              sit in a scrolling row of small buttons instead. */}
          <div
            ref={chipRowRef}
            className="hide-scrollbar relative flex gap-2 overflow-x-auto px-[clamp(1.5rem,5vw,4rem)] pb-4 lg:hidden"
          >
            {sections.map((s) => (
              <button
                key={s.slug}
                id={chipId(s.slug)}
                type="button"
                aria-current={s.slug === active ? "true" : undefined}
                onClick={() => show(s.slug)}
                className={cn(
                  "shrink-0 border px-3.5 py-2.5 font-label text-[0.6875rem] font-medium uppercase tracking-[0.22em] outline-none transition-colors duration-300 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-fg",
                  s.slug === active ? "border-ink bg-ink text-bg" : "border-border-strong text-fg hover:border-ink",
                )}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>

        {section && (
          <div key={view} data-section={section.slug} className="home-article mx-auto max-w-[44rem] px-[clamp(1.5rem,5vw,4rem)] pb-20 pt-8 sm:pt-10 lg:pt-6">
            <div className="flex items-center gap-6 sm:gap-8">
              <h2
                id="section-panel-title"
                ref={titleRef}
                tabIndex={-1}
                className="home-enter font-serif text-[clamp(3rem,6vw,5.25rem)] font-normal italic leading-none tracking-[-0.01em] text-fg outline-none"
                style={delay(120, { "--rise": "0.06em", "--blur": "10px" })}
              >
                {section.title}
              </h2>
              <span aria-hidden="true" className="home-draw h-px flex-1 origin-left bg-border" style={delay(320)} />
            </div>

            <div className="home-enter mt-12 sm:mt-16" style={delay(240)}>
              {content[section.slug]}
            </div>

            {next && (
              <LinkRow
                label="Next"
                detail={next.title}
                onClick={() => show(next.slug)}
                className="home-enter mt-20 sm:mt-24"
                style={delay(360)}
              />
            )}
          </div>
        )}
      </section>
    </>
  );
}
