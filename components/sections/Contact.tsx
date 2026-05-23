import { ArrowUpRight, FileText, Mail } from "lucide-react";

import { personal } from "@/lib/data";
import { cn } from "@/lib/utils";
import { RevealOnView } from "@/components/core/RevealOnView";
import { SectionHeading } from "@/components/core/SectionHeading";
import { buttonVariants } from "@/components/ui/Button";
import { GitHubIcon } from "@/components/ui/GitHubIcon";

export function Contact() {
  return (
    <section id="contact" className="py-12 md:py-16">
      <div className="mx-auto w-full max-w-container px-5 md:px-6">
        <SectionHeading label="Contact" title="Let's build something." />

        <RevealOnView className="mt-5 max-w-4xl" y={28}>
          <p className="font-heading text-40 leading-tight text-fg md:text-64">
            Open to software engineering roles, careful product work, and
            systems that need a sharp interface.
          </p>

          <p className="mt-6 max-w-2xl text-16 leading-relaxed text-muted md:text-18">
            Based in {personal.location}. Send a note if you want to talk about
            a role, a project, or a thoughtful web experience.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${personal.email}`}
              data-cursor
              className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
            >
              <Mail className="h-4 w-4" />
              Email
            </a>

            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              data-cursor
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              <GitHubIcon className="h-4 w-4" />
              GitHub
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              data-cursor
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              <FileText className="h-4 w-4" />
              Resume
            </a>
          </div>
        </RevealOnView>
      </div>
    </section>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10 text-14 text-muted">
      <div className="mx-auto flex w-full max-w-container flex-col gap-6 px-5 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <p className="font-heading text-18 text-fg">{personal.name}</p>
          <p className="mt-1">{personal.title}</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            href={`mailto:${personal.email}`}
            data-cursor
            className="transition-colors duration-300 hover:text-fg motion-reduce:transition-none"
          >
            Email
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noreferrer"
            data-cursor
            className="transition-colors duration-300 hover:text-fg motion-reduce:transition-none"
          >
            GitHub
          </a>
          <a
            href="#hero"
            data-cursor
            className="transition-colors duration-300 hover:text-fg motion-reduce:transition-none"
          >
            Back to top
          </a>
        </div>

        <p>© {year} All rights reserved.</p>
      </div>
    </footer>
  );
}
