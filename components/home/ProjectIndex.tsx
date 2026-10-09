"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { delay, labelClass } from "./Section";

export interface ProjectIndexItem {
  id: string;
  title: string;
  content: ReactNode;
}

const ARTICLE_ID = "project-article";

const buttonFocus =
  "outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-fg";

/** Nearest ancestor that scrolls vertically. For the home page this is the section panel. */
function scrollParent(node: HTMLElement | null) {
  for (let el = node?.parentElement; el; el = el.parentElement) {
    const { overflowY } = getComputedStyle(el);
    if (overflowY === "auto" || overflowY === "scroll") return el;
  }
  return null;
}

/**
 * Shows one project at a time, picked from a list of projects. On extra-wide
 * screens the list is sticky in the margin to the right of the article. The
 * parent must be position: relative so the list spans its height. Narrower
 * screens have no margin to spare, so the list sits inline above the project
 * instead.
 */
export function ProjectIndex({ items }: { items: ProjectIndexItem[] }) {
  const articleRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(items[0]?.id);
  // The panel already fades the first project in, so only later switches animate.
  const [hasSwitched, setHasSwitched] = useState(false);
  // Set by a click so the effect below only runs for a switch, not on mount.
  const switched = useRef(false);
  const current = items.find((item) => item.id === active) ?? items[0];

  // If the reader had scrolled into the previous project, bring the new one's
  // top into view. Then move focus to its heading so keyboard and screen
  // reader users continue from there.
  useEffect(() => {
    if (!switched.current) return;
    switched.current = false;
    const article = articleRef.current?.firstElementChild;
    if (!(article instanceof HTMLElement)) return;
    const scroller = scrollParent(article);
    const viewTop = (scroller?.getBoundingClientRect().top ?? 0) + parseFloat(getComputedStyle(article).scrollMarginTop);
    if (article.getBoundingClientRect().top < viewTop) article.scrollIntoView({ block: "start" });
    document.getElementById(`${active}-title`)?.focus({ preventScroll: true });
  }, [active]);

  const select = (id: string) => {
    if (id === active) return;
    switched.current = true;
    setHasSwitched(true);
    setActive(id);
  };

  return (
    <>
      {/* The project's top rule closes this list off. */}
      <nav aria-label="Projects" className="mb-14 border-t border-border pt-6 sm:mb-16 xl:hidden">
        <p className={cn(labelClass, "mb-3 text-muted")}>Projects</p>
        <ul className="sm:columns-2 sm:gap-x-8">
          {items.map((item) => {
            const selected = item.id === active;
            return (
              <li key={item.id} className="break-inside-avoid">
                <button
                  type="button"
                  aria-current={selected ? "true" : undefined}
                  aria-controls={ARTICLE_ID}
                  onClick={() => select(item.id)}
                  className={cn(
                    "w-full py-1.5 text-left font-label text-[0.875rem] leading-[1.5] underline underline-offset-4 transition-colors duration-300",
                    buttonFocus,
                    selected
                      ? "text-fg decoration-fg"
                      : "text-muted decoration-transparent hover:text-fg hover:decoration-border-strong",
                  )}
                >
                  {item.title}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="absolute inset-y-0 left-full ml-12 hidden w-44 xl:block 2xl:ml-16 2xl:w-52">
        <nav aria-label="Projects" className="sticky top-24">
          <p className={cn(labelClass, "mb-5 text-muted")}>Projects</p>
          <ul className="border-l border-border">
            {items.map((item) => {
              const selected = item.id === active;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    aria-current={selected ? "true" : undefined}
                    aria-controls={ARTICLE_ID}
                    onClick={() => select(item.id)}
                    className={cn(
                      "-ml-px block w-full border-l py-1.5 pl-4 text-left font-label text-[0.8125rem] leading-[1.45] transition-colors duration-300",
                      buttonFocus,
                      selected ? "border-fg text-fg" : "border-transparent text-muted hover:text-fg",
                    )}
                  >
                    {item.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Keyed so each newly picked project fades in. It doesn't rise, so its
          position is settled when the effect above measures it. */}
      <div
        ref={articleRef}
        key={current?.id}
        id={ARTICLE_ID}
        className={cn(hasSwitched && "home-enter")}
        style={delay(0, { "--rise": "0px" })}
      >
        {current?.content}
      </div>
    </>
  );
}
