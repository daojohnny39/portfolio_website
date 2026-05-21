import { RevealOnView } from "@/components/core/RevealOnView";
import { SectionHeading } from "@/components/core/SectionHeading";
import { education } from "@/lib/data";

export function Education() {
  return (
    <section id="education" className="py-24 md:py-32">
      <div className="mx-auto w-full max-w-container px-5 md:px-6">
        <SectionHeading label="Education" title="Education." />

        <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2 md:gap-6">
          {education.map((item, index) => (
            <RevealOnView
              as="article"
              data-cursor
              key={`${item.school}-${item.degree}`}
              delay={index * 0.08}
              y={24}
              className="rounded-lg border border-border bg-surface p-6 transition-colors duration-300 hover:border-accent md:p-8"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h3 className="font-heading text-24 leading-tight text-fg">
                    {item.school}
                  </h3>
                  <p className="mt-4 text-16 leading-relaxed text-muted">
                    {item.degree}
                  </p>
                </div>

                {item.gpa ? (
                  <span className="shrink-0 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-12 uppercase tracking-widest text-accent">
                    {item.gpa}
                  </span>
                ) : null}
              </div>

              <div className="mt-10 border-t border-border pt-5">
                <p className="font-sans text-12 uppercase tracking-widest text-muted tabular-nums">
                  {item.period}
                </p>
                <p className="mt-2 text-14 text-muted">{item.location}</p>
              </div>
            </RevealOnView>
          ))}
        </div>
      </div>
    </section>
  );
}
