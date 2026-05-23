import { SectionHeading } from "@/components/core/SectionHeading";
import { ExperienceItem } from "@/components/ui/ExperienceItem";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" className="pt-12 pb-20 md:pt-14 md:pb-28">
      <div className="mx-auto w-full max-w-container px-5 md:px-6">
        <SectionHeading label="Experience" title="Where I've worked." />

        <div className="mt-6 space-y-12 md:mt-8 md:space-y-16">
          {experience.map((item, index) => (
            <ExperienceItem
              key={`${item.org}-${item.title}`}
              title={item.title}
              org={item.org}
              location={item.location}
              period={item.period}
              bullets={item.bullets}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
