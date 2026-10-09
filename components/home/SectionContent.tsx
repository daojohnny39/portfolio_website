import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

import { courses, education, keyCourses, leadership, personal, skills, type SectionSlug } from "@/lib/data";

import { LinkRow } from "./LinkRow";
import { EntryList, labelClass } from "./Section";
import { ExperienceResearch } from "./ExperienceResearch";
import { ProjectStories } from "./Projects";

function SkillList() {
  return (
    <dl className="space-y-6">
      {skills.map((group) => (
        <div key={group.label} className="grid gap-1 sm:grid-cols-[13rem_1fr] sm:gap-8">
          <dt className="font-label text-[0.75rem] font-medium uppercase leading-relaxed tracking-[0.24em] text-fg sm:pt-1">
            {group.label}
          </dt>
          <dd className="font-serif text-[1.1875rem] font-medium leading-[1.6] text-fg-soft">
            {group.items.join(", ")}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Key coursework by name, then every course by school and term. */
function Coursework() {
  return (
    <div className="divide-y divide-border">
      <section className="pb-10">
        <h4 className={`${labelClass} mb-6 text-muted`}>Key Coursework</h4>
        <ul className="space-y-1 font-serif text-[1.1875rem] font-medium leading-[1.5] text-fg-soft [text-wrap:pretty]">
          {keyCourses.map((course) => (
            <li key={course.name}>
              {course.href ? (
                <a
                  href={course.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group underline decoration-border-strong underline-offset-[6px] outline-none transition-colors duration-300 hover:decoration-fg focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-fg"
                >
                  {/* The last word stays on the same line as the arrow. */}
                  {course.name.slice(0, course.name.lastIndexOf(" ") + 1)}
                  <span className="whitespace-nowrap">
                    {course.name.slice(course.name.lastIndexOf(" ") + 1)}
                    <ArrowUpRight
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="ml-1 inline size-3.5 transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px"
                    />
                  </span>
                  <span className="sr-only"> code on GitHub (opens in a new tab)</span>
                </a>
              ) : (
                course.name
              )}
              {course.note && <span className="italic text-muted"> ({course.note})</span>}
            </li>
          ))}
        </ul>
      </section>
      {courses.map((school) => (
        <section key={school.school} className="py-10 last:pb-0">
          <h4 className="font-label text-[0.8125rem] font-medium uppercase leading-relaxed tracking-[0.24em] text-fg">
            {school.school}
          </h4>
          <dl className="mt-6 space-y-6">
            {school.terms.map((group) => (
              <div key={group.term} className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-8">
                <dt className="font-serif text-[1.0625rem] italic text-muted sm:pt-0.5">{group.term}</dt>
                <dd>
                  <ul className="space-y-1 font-serif text-[1.1875rem] font-medium leading-[1.5] text-fg-soft [text-wrap:pretty]">
                    {group.courses.map((course) => (
                      <li key={course}>{course}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}

/** Degrees in a compact list, one block per degree. */
function Degrees({ className }: { className?: string }) {
  return (
    <aside aria-labelledby="degrees-title" className={className}>
      <h3 id="degrees-title" className={`${labelClass} mb-6 text-muted`}>
        Degrees
      </h3>
      <div className="space-y-6">
        {education.map((entry) => (
          <section key={entry.degree}>
            <h4 className="font-label text-[0.75rem] font-medium uppercase leading-relaxed tracking-[0.2em] text-fg">
              {entry.school}
            </h4>
            <p className="mt-1 font-serif text-[1.0625rem] font-medium leading-[1.45] text-fg-soft [text-wrap:pretty]">
              {entry.degree}
              {entry.detail && <span className="font-normal italic text-muted"> · {entry.detail}</span>}
            </p>
            <p className="font-serif text-[1rem] italic text-muted">
              {entry.period} · {entry.location}
            </p>
            {entry.note && <p className="mt-1 font-serif text-[1rem] italic leading-[1.45] text-fg-soft">{entry.note}</p>}
          </section>
        ))}
      </div>
    </aside>
  );
}

/** Coursework on the left with degrees beside it on wide screens. Smaller
 * screens stack the degrees above the coursework. */
function Education() {
  return (
    <div className="grid gap-16 xl:grid-cols-[minmax(0,1fr)_16rem] xl:gap-x-14">
      <Degrees className="xl:col-start-2 xl:row-start-1 xl:pt-3" />
      <section aria-labelledby="coursework-title" className="xl:col-start-1 xl:row-start-1">
        <div className="mb-10 flex items-center gap-6 sm:gap-8">
          <h3
            id="coursework-title"
            className="font-serif text-[clamp(2rem,4vw,2.75rem)] font-normal italic leading-none tracking-[-0.01em] text-fg"
          >
            Coursework
          </h3>
          <span aria-hidden="true" className="h-px flex-1 bg-border" />
        </div>
        <Coursework />
      </section>
    </div>
  );
}

function ContactLinks() {
  return (
    <div className="text-center">
      <p className="mx-auto max-w-[30ch] font-serif text-[clamp(1.375rem,3.4vw,1.75rem)] italic leading-[1.4] text-fg-soft [text-wrap:balance]">
        Reach me by email, or read through my code on GitHub.
      </p>
      <div className="mt-11 flex flex-col gap-3">
        <LinkRow variant="solid" href={`mailto:${personal.email}`} label="Email" detail={personal.email} />
        <LinkRow href={personal.github} newTab label="GitHub" detail={personal.githubHandle} />
      </div>
    </div>
  );
}

/** Body of each section, rendered on the server and handed to the side panel. */
export const sectionContent: Record<SectionSlug, ReactNode> = {
  experience: <ExperienceResearch />,
  projects: <ProjectStories />,
  education: <Education />,
  skills: <SkillList />,
  leadership: <EntryList entries={leadership} />,
  contact: <ContactLinks />,
};
