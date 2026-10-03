import { ArrowUpRight } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

import type { Entry } from "@/lib/data";
import { cn } from "@/lib/utils";

/** Inline style for .home-enter / .home-draw elements: start delay plus any extra custom properties. */
export const delay = (ms: number, extra?: Record<string, string>) =>
  ({ "--delay": `${ms}ms`, ...extra }) as CSSProperties;

/** Home nav rows rise one after another, starting after the intro line. */
export const rowDelay = (i: number, extraMs = 0) => delay(820 + i * 50 + extraMs);

/** Wraps home page content that folds away while a section is open (see .home-collapse in globals.css). */
export function Collapsible({ children }: { children: ReactNode }) {
  return (
    <div className="home-collapse w-full">
      <div>{children}</div>
    </div>
  );
}

/** Hairline that draws outward from the element it flanks. */
export function Rule({ side, className, delay: ms }: { side: "left" | "right"; className?: string; delay?: number }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "home-draw h-px w-10 shrink-0 bg-border sm:w-20",
        side === "left" ? "origin-right" : "origin-left",
        className,
      )}
      style={ms ? delay(ms) : undefined}
    />
  );
}

/** Renders resume text, turning **phrase** into emphasis. */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold text-fg">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function EntryList({ entries }: { entries: Entry[] }) {
  return (
    <div className="divide-y divide-border">
      {entries.map((entry) => (
        <EntryBlock key={entry.title} entry={entry} />
      ))}
    </div>
  );
}

function EntryBlock({ entry }: { entry: Entry }) {
  return (
    <article className="py-10 first:pt-0 last:pb-0">
      {/* Desktop: title and detail on the left, dates pinned right. Mobile: dates
          sit above the title and the italic detail joins the subtitle line. */}
      <header className="grid gap-y-1 sm:grid-cols-[1fr_auto] sm:gap-x-10">
        <h3 className="flex flex-wrap items-baseline gap-x-4 gap-y-1 sm:col-start-1 sm:row-start-1">
          <span className="font-label text-[0.8125rem] font-medium uppercase leading-relaxed tracking-[0.24em] text-fg">
            {entry.title}
          </span>
          {entry.detail && (
            <span className="hidden font-serif text-[1.1875rem] font-normal italic text-muted sm:inline">
              {entry.detail}
            </span>
          )}
        </h3>
        <p className="order-first font-serif text-[1.0625rem] italic text-muted sm:order-none sm:col-start-2 sm:row-start-1 sm:whitespace-nowrap sm:text-right">
          {entry.period}
        </p>
        <p className="font-serif text-[1.1875rem] italic text-muted sm:col-span-2">
          {entry.detail && <span className="sm:hidden">{entry.detail} · </span>}
          {entry.subtitle}
        </p>
      </header>

      {entry.note && <p className="mt-5 font-serif text-[1.1875rem] italic text-fg-soft">{entry.note}</p>}

      {entry.bullets.length > 0 && (
        <ul className={cn("space-y-3", entry.note ? "mt-2" : "mt-5")}>
          {entry.bullets.map((bullet) => (
            <li
              key={bullet}
              className="relative pl-6 font-serif text-[1.1875rem] font-medium leading-[1.6] text-fg-soft sm:text-[1.25rem] [text-wrap:pretty] before:absolute before:left-0 before:top-[0.8em] before:h-px before:w-3 before:bg-muted"
            >
              <Rich text={bullet} />
            </li>
          ))}
        </ul>
      )}

      {entry.href && (
        <a
          href={entry.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-6 inline-flex items-center gap-2 font-label text-[0.75rem] font-medium uppercase tracking-[0.24em] text-fg underline decoration-border-strong underline-offset-[6px] outline-none transition-colors duration-300 hover:decoration-fg focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-fg"
        >
          View code
          <ArrowUpRight
            aria-hidden="true"
            strokeWidth={1.5}
            className="size-3.5 transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px"
          />
          <span className="sr-only"> for {entry.title} on GitHub (opens in a new tab)</span>
        </a>
      )}
    </article>
  );
}
