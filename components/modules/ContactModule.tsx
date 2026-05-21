"use client";

import { useState } from "react";
import {
  Check,
  Clipboard,
  Download,
  ExternalLink,
  GitBranch,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { personal } from "@/lib/data";

export default function ContactModule() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyValue = async (id: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section className="flex h-full flex-col bg-[--color-bg]">
      <header className="px-10 pt-10 pb-8">
        <h2 className="font-archivo text-3xl font-semibold text-[--color-fg]">
          Contact
        </h2>
        <p className="mt-1 text-sm text-[--color-muted]">
          Open to software development, research, and full-stack project
          opportunities.
        </p>
      </header>

      <div className="flex-1 px-10 pb-10">
        <div className="max-w-lg">
          <div className="flex items-center gap-4 border-b border-[--color-border] py-5">
            <Mail size={18} className="text-[--color-muted]" />
            <div className="flex-1">
              <p className="mb-0.5 text-xs uppercase tracking-widest text-[--color-muted]">
                Email
              </p>
              <p className="text-sm text-[--color-fg]">{personal.email}</p>
            </div>
            <button
              type="button"
              onClick={() => copyValue("email", personal.email)}
              className="rounded-lg border border-[--color-border] p-2 text-[--color-muted] transition-colors hover:border-[--color-fg] hover:text-[--color-fg]"
            >
              {copied === "email" ? <Check size={16} /> : <Clipboard size={16} />}
            </button>
          </div>

          <div className="flex items-center gap-4 border-b border-[--color-border] py-5">
            <GitBranch size={18} className="text-[--color-muted]" />
            <div className="flex-1">
              <p className="mb-0.5 text-xs uppercase tracking-widest text-[--color-muted]">
                GitHub
              </p>
              <p className="text-sm text-[--color-fg]">{personal.github}</p>
            </div>
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-[--color-border] p-2 text-[--color-muted] transition-colors hover:border-[--color-fg] hover:text-[--color-fg]"
            >
              <ExternalLink size={16} />
            </a>
          </div>

          <div className="flex items-center gap-4 border-b border-[--color-border] py-5">
            <MapPin size={18} className="text-[--color-muted]" />
            <div className="flex-1">
              <p className="mb-0.5 text-xs uppercase tracking-widest text-[--color-muted]">
                Location
              </p>
              <p className="text-sm text-[--color-fg]">{personal.location}</p>
            </div>
            <button
              type="button"
              onClick={() => copyValue("location", personal.location)}
              className="rounded-lg border border-[--color-border] p-2 text-[--color-muted] transition-colors hover:border-[--color-fg] hover:text-[--color-fg]"
            >
              {copied === "location" ? <Check size={16} /> : <Clipboard size={16} />}
            </button>
          </div>

          <div className="flex items-center gap-4 border-b border-[--color-border] py-5">
            <Phone size={18} className="text-[--color-muted]" />
            <div className="flex-1">
              <p className="mb-0.5 text-xs uppercase tracking-widest text-[--color-muted]">
                Phone
              </p>
              <p className="text-sm text-[--color-fg]">{personal.phone}</p>
            </div>
            <button
              type="button"
              onClick={() => copyValue("phone", personal.phone)}
              className="rounded-lg border border-[--color-border] p-2 text-[--color-muted] transition-colors hover:border-[--color-fg] hover:text-[--color-fg]"
            >
              {copied === "phone" ? <Check size={16} /> : <Clipboard size={16} />}
            </button>
          </div>
        </div>
      </div>

      <div className="px-10 pb-10">
        <a
          href="/resume.pdf"
          download
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[--color-fg] py-3.5 text-sm font-medium text-[--color-bg] transition-colors hover:bg-[--color-muted]"
        >
          <Download size={16} />
          Download Resume
        </a>
      </div>
    </section>
  );
}
