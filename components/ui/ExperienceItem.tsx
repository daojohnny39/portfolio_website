import { RevealOnView } from "@/components/core/RevealOnView";
import { cn } from "@/lib/utils";

export type ExperienceItemProps = {
  title: string;
  org: string;
  location: string;
  period: string;
  bullets: string[];
  index: number;
};

export function ExperienceItem({
  title,
  org,
  location,
  period,
  bullets,
  index,
}: ExperienceItemProps) {
  return (
    <RevealOnView
      as="article"
      delay={index * 0.08}
      y={24}
      data-cursor
      className={cn(
        "group relative rounded-lg border border-border bg-surface/40 p-5 transition-colors duration-300 hover:border-accent md:grid md:grid-cols-[13rem_1fr] md:gap-10 md:p-8",
        "before:absolute before:left-0 before:top-8 before:h-[calc(100%-4rem)] before:w-px before:bg-accent/45",
        "after:absolute after:left-[-4px] after:top-8 after:size-2 after:rounded-full after:bg-accent"
      )}
    >
      <div className="mb-8 pl-5 md:mb-0">
        <div className="md:sticky md:top-28">
          <p className="font-sans text-12 uppercase tracking-widest text-muted tabular-nums">
            {period}
          </p>
          <p className="mt-3 text-14 leading-relaxed text-muted">{location}</p>
        </div>
      </div>

      <div className="pl-5 md:pl-0">
        <h3 className="font-heading text-24 leading-tight text-fg md:text-40">
          {title}
        </h3>
        <p className="mt-3 text-16 text-accent">{org}</p>

        <ul className="mt-8 max-w-[70ch] space-y-4">
          {bullets.map((bullet) => (
            <li
              key={bullet}
              className="relative pl-5 text-16 leading-relaxed text-muted before:absolute before:left-0 before:top-[0.75em] before:size-1 before:rounded-full before:bg-accent/70"
            >
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </RevealOnView>
  );
}
