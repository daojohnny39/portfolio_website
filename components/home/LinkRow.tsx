import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { CSSProperties, MouseEventHandler } from "react";

import { cn } from "@/lib/utils";

interface LinkRowProps {
  /** Leave out to render a button instead of a link. */
  href?: string;
  label: string;
  detail?: string;
  variant?: "solid" | "outline";
  /** Client-side route (uses next/link). Otherwise a plain anchor. */
  route?: boolean;
  newTab?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  /** Button only. Marks the row whose section is open and keeps it inked. */
  expanded?: boolean;
  /** Button only. id of the element this button opens. */
  controls?: string;
  id?: string;
  className?: string;
  style?: CSSProperties;
}

const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

export function LinkRow({
  href,
  label,
  detail,
  variant = "outline",
  route = false,
  newTab = false,
  onClick,
  expanded,
  controls,
  id,
  className,
  style,
}: LinkRowProps) {
  const solid = variant === "solid";
  const inked = solid || expanded;
  // Links leave the page (up-right arrow). Buttons open the side panel (right arrow).
  const Arrow = href ? ArrowUpRight : ArrowRight;

  const classes = cn(
    "group relative isolate flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left sm:min-h-16 sm:gap-6 sm:px-8",
    "outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-fg",
    "transition-colors duration-500",
    EASE,
    solid
      ? "bg-ink text-bg hover:bg-fg"
      : cn(
          "border border-border-strong text-fg hover:border-ink hover:text-bg",
          // Ink wipes in from the left on hover and exits to the right.
          "before:absolute before:inset-0 before:-z-10 before:origin-right before:scale-x-0 before:bg-ink",
          "before:transition-transform before:duration-700 before:ease-[cubic-bezier(0.16,1,0.3,1)]",
          "hover:before:origin-left hover:before:scale-x-100",
          expanded && "border-ink text-bg before:origin-left before:scale-x-100",
        ),
    className,
  );

  const content = (
    <>
      <span className="home-row-text flex min-w-0 flex-wrap items-baseline gap-x-4 gap-y-0.5 sm:gap-x-5">
        <span className="font-label text-[0.8125rem] font-medium uppercase tracking-[0.26em] sm:tracking-[0.3em]">
          {label}
        </span>
        {detail && (
          <span
            className={cn(
              "home-row-detail min-w-0 break-words font-serif text-[1.125rem] italic leading-snug transition-colors duration-500",
              inked ? "text-on-ink-muted" : "text-muted group-hover:text-on-ink-muted",
            )}
          >
            {detail}
          </span>
        )}
      </span>
      <Arrow
        aria-hidden="true"
        strokeWidth={1.5}
        className={cn(
          "size-[1.125rem] shrink-0 transition-transform duration-500",
          href ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5" : "group-hover:translate-x-1",
          EASE,
        )}
      />
      {newTab && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );

  if (!href) {
    return (
      <button
        type="button"
        id={id}
        aria-expanded={expanded}
        aria-controls={controls}
        onClick={onClick}
        className={classes}
        style={style}
      >
        {content}
      </button>
    );
  }

  if (route) {
    return (
      <Link href={href} onClick={onClick} className={classes} style={style}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      onClick={onClick}
      className={classes}
      style={style}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
}
