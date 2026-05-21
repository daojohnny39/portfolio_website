"use client";

import { Download, FileText } from "lucide-react";

export default function ResumeModule() {
  return (
    <section className="flex h-full flex-col bg-[--color-bg]">
      <header className="px-10 pt-10 pb-8">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <FileText size={24} className="text-[--color-muted]" />
            <h2 className="font-archivo text-3xl font-semibold text-[--color-fg]">
              Resume
            </h2>
          </div>

          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 rounded-lg border border-[--color-border] px-4 py-2 text-sm font-medium transition-colors hover:bg-[--color-surface]"
          >
            <Download size={16} />
            Download
          </a>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <embed
          src="/resume.pdf"
          type="application/pdf"
          className="h-full w-full"
        />
        <p className="p-10 text-sm text-[--color-muted]">
          Your browser does not support embedded PDFs.{" "}
          <a href="/resume.pdf" download className="underline">
            Download the resume
          </a>
          .
        </p>
      </div>
    </section>
  );
}
