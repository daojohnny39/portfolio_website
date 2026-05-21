import { projects } from "@/lib/data";
import { SectionHeading } from "@/components/core/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="mx-auto w-full max-w-container px-5 md:px-6">
        <SectionHeading label="Projects" title="Selected work." />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 md:gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.name}
              name={project.name}
              stack={project.stack}
              bullets={project.bullets}
              github={project.github}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
