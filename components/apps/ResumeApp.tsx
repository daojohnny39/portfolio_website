"use client";

import { Download, FileText } from "lucide-react";

export default function ResumeApp() {
  return (
    <div className="flex h-full w-full flex-col bg-[#0A0A0F]">
      <div className="flex items-center justify-between border-b border-[#2A2A3A] bg-[#0A0A0F] px-4 py-2">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#888899]">
          <FileText className="h-4 w-4 text-[#F5C518]" />
          <span>Resume.pdf</span>
        </div>

        <a
          href="/resume.pdf"
          download
          className="flex items-center gap-1.5 border border-[#2A2A3A] bg-[#1C1C2E] px-3 py-1.5 text-xs uppercase tracking-widest text-[#888899] transition-colors hover:border-[#F5C518] hover:text-[#F5C518]"
        >
          <Download className="h-3.5 w-3.5" />
          Download
        </a>
      </div>

      <div className="flex-1 overflow-hidden">
        <embed src="/resume.pdf" type="application/pdf" className="h-full w-full" />
      </div>
    </div>
  );
}
