import type { ReactNode } from "react";

import {
  coursework,
  education,
  leadership,
  personal,
  projects,
  skills,
  type SectionSlug,
} from "@/lib/data";

import { LinkRow } from "./LinkRow";
import { EntryList } from "./Section";
import { ExperienceResearch } from "./ExperienceResearch";

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
  projects: <EntryList entries={projects} />,
  education: <EntryList entries={education} />,
  skills: <SkillList />,
  leadership: <EntryList entries={leadership} />,
  coursework: <EntryList entries={coursework} />,
  contact: <ContactLinks />,
};
