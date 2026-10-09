import { ArrowUpRight } from "lucide-react";
import { Fragment } from "react";

import {
  projects,
  type DiagramStep,
  type Project,
  type ProjectDemo,
  type ProjectDiagram,
  type ProjectFigure,
} from "@/lib/projects";
import { cn } from "@/lib/utils";

import { ProjectIndex } from "./ProjectIndex";
import { labelClass, proseClass, Rich } from "./Section";

const number = (i: number) => String(i + 1).padStart(2, "0");

const figureColumns = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-3", 4: "sm:grid-cols-4" };

/** A short labeled list: numbered steps for a flow, or a plain set of items. */
function Figure({ figure }: { figure: ProjectFigure }) {
  const List = figure.numbered ? "ol" : "ul";

  return (
    <figure className="pt-2">
      <figcaption className={cn(labelClass, "mb-4 text-fg")}>{figure.caption}</figcaption>
      <List
        className={cn(
          "grid gap-x-4 gap-y-3 font-label text-[0.8125rem] leading-[1.6]",
          figure.numbered ? "grid-cols-1" : "grid-cols-2",
          figureColumns[figure.columns ?? 2],
        )}
      >
        {figure.items.map((item, i) => (
          <li key={item} className="border-t border-border pt-3 text-fg-soft">
            {figure.numbered && (
              <span aria-hidden="true" className="mb-1 block text-[0.6875rem] tabular-nums text-muted">
                {number(i)}
              </span>
            )}
            {item}
          </li>
        ))}
      </List>
    </figure>
  );
}

/** Space between the two columns. The connectors below reach halfway into it. */
const columns = "grid grid-cols-2 gap-x-3 sm:gap-x-8";
const line = "absolute bg-border-strong";

/** Open chevron at the foot of a hairline, its tip on the line. */
function Arrowhead({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 9 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("absolute bottom-0 -ml-1 h-1.5 w-[9px] text-border-strong", className)}
    >
      <path d="M1 1 4.5 4.5 8 1" />
    </svg>
  );
}

/** A short line pointing down to the next step. */
function Arrow() {
  return (
    <span aria-hidden="true" className="relative block h-7">
      <span className={cn(line, "inset-y-0 left-1/2 w-px")} />
      <Arrowhead className="left-1/2" />
    </span>
  );
}

/**
 * Lines from the middle of both columns meeting at the center, or splitting
 * from it. Each column draws an L with a rounded elbow that reaches the middle
 * of the gap, and a stem runs between the meeting point and the center.
 */
function Branch({ join }: { join?: boolean }) {
  const elbow = "absolute h-1/2 border-border-strong";
  const left = cn(elbow, "-right-1.5 left-1/2 border-l sm:-right-4");
  const right = cn(elbow, "-left-1.5 right-[calc(50%-1px)] border-r sm:-left-4");

  return (
    <div aria-hidden="true" className={cn(columns, "relative h-10")}>
      <div className="relative">
        <span className={cn(left, join ? "top-0 rounded-bl-md border-b" : "bottom-0 rounded-tl-md border-t")} />
        {!join && <Arrowhead className="left-1/2" />}
      </div>
      <div className="relative">
        <span className={cn(right, join ? "top-0 rounded-br-md border-b" : "bottom-0 rounded-tr-md border-t")} />
        {!join && <Arrowhead className="left-1/2" />}
      </div>
      <span className={cn(line, "left-1/2 w-px", join ? "bottom-0 top-1/2" : "top-0 h-1/2")} />
      {join && <Arrowhead className="left-1/2" />}
    </div>
  );
}

function Step({ step, className }: { step: DiagramStep; className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col justify-center rounded-md border px-2.5 py-2.5 text-center font-label sm:px-4 sm:py-3",
        step.absent ? "border-dashed border-border-strong" : step.filled ? "border-ink bg-ink" : "border-border bg-white/35",
        className,
      )}
    >
      <p
        className={cn(
          "text-[0.8125rem] font-medium leading-[1.4]",
          step.absent ? "text-muted" : step.filled ? "text-bg" : "text-fg",
        )}
      >
        {step.title}
      </p>
      {step.detail && (
        <p className={cn("mt-1 text-[0.75rem] leading-[1.5]", step.filled ? "text-on-ink-muted" : "text-muted")}>
          {step.detail}
        </p>
      )}
    </div>
  );
}

/**
 * Two paths side by side that join at the shared steps and split at the end.
 * The grid fills column by column, so each path reads in order while its rows
 * line up with the other path's. Shared steps are as wide as one column.
 */
function Diagram({ diagram }: { diagram: ProjectDiagram }) {
  return (
    <figure className="pt-2">
      <div
        className={cn(columns, "grid-flow-col")}
        style={{ gridTemplateRows: `repeat(${diagram.paths[0].length}, auto)` }}
      >
        {diagram.paths.map((path, p) =>
          path.map((step, i) => (
            <div key={`${p}-${step.title}`} className="flex flex-col">
              {i > 0 && <Arrow />}
              <Step step={step} className="flex-1" />
            </div>
          )),
        )}
      </div>
      <Branch join />
      {diagram.shared.map((step, i) => (
        <Fragment key={step.title}>
          {i > 0 && <Arrow />}
          <Step step={step} className="mx-auto w-[calc(50%-0.375rem)] sm:w-[calc(50%-1rem)]" />
        </Fragment>
      ))}
      <Branch />
      <div className={columns}>
        {diagram.ends.map((step) => (
          <div key={step.title} className="flex flex-col">
            <Step step={step} className="flex-1" />
          </div>
        ))}
      </div>
      <figcaption className="mt-6 font-label text-[0.8125rem] leading-[1.7] text-muted [text-wrap:pretty]">
        {diagram.caption}
      </figcaption>
    </figure>
  );
}

/** A recorded demo with its description above it. Nothing loads until the reader presses play. */
function Demo({ demo }: { demo: ProjectDemo }) {
  return (
    <div>
      <h4 className={cn(labelClass, "mb-4 text-fg")}>Demo</h4>
      <div className="space-y-6">
        {demo.paragraphs.map((paragraph) => (
          <p key={paragraph} className={proseClass}>
            <Rich text={paragraph} />
          </p>
        ))}
        <figure className="aspect-video overflow-hidden border border-border bg-black">
          <video
            src={demo.src}
            poster={demo.poster}
            aria-label={demo.label}
            controls
            playsInline
            preload="none"
            className="h-full w-full"
          />
        </figure>
      </div>
    </div>
  );
}

function ProjectArticle({ project }: { project: Project }) {
  const titleId = `${project.id}-title`;

  return (
    <article id={project.id} aria-labelledby={titleId} className="project-story border-t border-border pt-9 sm:pt-12">
      <header>
        <p className="font-serif text-[1.0625rem] italic text-muted">
          {project.platform && <>{project.platform} · </>}
          {project.period}
        </p>
        <h3
          id={titleId}
          tabIndex={-1}
          className="mt-3 font-serif text-[clamp(2rem,4vw,2.75rem)] font-normal leading-[1.08] tracking-[-0.02em] text-fg outline-none [text-wrap:balance]"
        >
          {project.title}
        </h3>
        <p className="mt-4 font-serif text-[clamp(1.25rem,2.2vw,1.5rem)] italic leading-[1.4] text-fg-soft [text-wrap:pretty]">
          {project.summary}
        </p>
        <p className="mt-5 font-label text-[0.75rem] leading-[1.7] text-muted">
          <span className="sr-only">Built with </span>
          {project.stack.join(" · ")}
        </p>
      </header>

      <div className="mt-8 space-y-10">
        {project.sections.map((section, i) => (
          <div key={section.heading ?? i}>
            {section.heading && <h4 className={cn(labelClass, "mb-4 text-fg")}>{section.heading}</h4>}
            <div className="space-y-6">
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className={proseClass}>
                  <Rich text={paragraph} />
                </p>
              ))}
              {section.figure && <Figure figure={section.figure} />}
              {section.diagram && <Diagram diagram={section.diagram} />}
            </div>
          </div>
        ))}

        {project.demo && <Demo demo={project.demo} />}

        {project.note && (
          <p className="font-label text-[0.8125rem] leading-[1.7] text-muted">
            <Rich text={project.note} />
          </p>
        )}

        {project.link && (
          <a
            href={project.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-label text-[0.75rem] font-medium uppercase tracking-[0.24em] text-fg underline decoration-border-strong underline-offset-[6px] outline-none transition-colors duration-300 hover:decoration-fg focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-fg"
          >
            {project.link.label}
            <ArrowUpRight
              aria-hidden="true"
              strokeWidth={1.5}
              className="size-3.5 transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px"
            />
            <span className="sr-only"> for {project.title} on GitHub (opens in a new tab)</span>
          </a>
        )}
      </div>
    </article>
  );
}

/** The Projects section, laid out like the Experience write-up with one short post per project, shown one at a time. */
export function ProjectStories() {
  return (
    <div className="relative">
      <p className="mb-12 max-w-[36rem] font-serif text-[1.125rem] italic leading-[1.6] text-muted [text-wrap:pretty] sm:mb-14">
        I like building tools I&apos;ll use myself. Most of these side projects started with a small problem in my own
        day.
      </p>

      <ProjectIndex
        items={projects.map((project) => ({
          id: project.id,
          title: project.navTitle ?? project.title,
          content: <ProjectArticle project={project} />,
        }))}
      />
    </div>
  );
}
