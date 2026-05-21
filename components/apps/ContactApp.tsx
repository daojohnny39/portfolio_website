"use client";

import { useState } from "react";
import { Check, Clipboard, Download, ExternalLink, GitBranch, Mail, MapPin, Phone } from "lucide-react";
import { personal } from "@/lib/data";

const ctaChamfer = {
  clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)",
};

export default function ContactApp() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyValue = async (id: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(id);
    window.setTimeout(() => setCopied(null), 2000);
  };

  const actionClass =
    "border border-[#2A2A3A] bg-[#1C1C2E] p-2 text-[#888899] transition-colors hover:border-[#F5C518] hover:text-[#F5C518]";

  return (
    <div className="flex h-full flex-col bg-[#0A0A0F] p-6">
      <header>
        <h2
          className="text-2xl font-semibold uppercase tracking-wider text-[#F5C518]"
          style={{ fontFamily: "Orbitron" }}
        >
          Get in Touch
        </h2>
        <p className="mt-2 text-xs uppercase tracking-widest text-[#888899]">
          Open to software development, research, and full-stack project opportunities.
        </p>
      </header>

      <div className="mt-5 flex-1">
        <div className="flex items-center gap-3 border-b border-[#2A2A3A] py-3">
          <Mail className="h-5 w-5 text-[#00D4FF]" />
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-widest text-[#888899]">Email</p>
            <p className="truncate text-sm text-[#E0E0E0]">
              {personal.email}
              <span className="cp-blink ml-1">▮</span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => copyValue("email", personal.email)}
            className={`${actionClass} ${
              copied === "email" ? "border-[#00D4FF] text-[#00D4FF]" : ""
            }`}
          >
            {copied === "email" ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
          </button>
        </div>

        <div className="flex items-center gap-3 border-b border-[#2A2A3A] py-3">
          <GitBranch className="h-5 w-5 text-[#00D4FF]" />
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-widest text-[#888899]">GitHub</p>
            <p className="truncate text-sm text-[#E0E0E0]">daojohnny39</p>
          </div>
          <a href={personal.github} target="_blank" rel="noreferrer" className={actionClass}>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="flex items-center gap-3 border-b border-[#2A2A3A] py-3">
          <MapPin className="h-5 w-5 text-[#00D4FF]" />
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-widest text-[#888899]">Location</p>
            <p className="truncate text-sm text-[#E0E0E0]">{personal.location}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 border-b border-[#2A2A3A] py-3">
          <Phone className="h-5 w-5 text-[#00D4FF]" />
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-widest text-[#888899]">Phone</p>
            <p className="truncate text-sm text-[#E0E0E0]">{personal.phone}</p>
          </div>
          <button
            type="button"
            onClick={() => copyValue("phone", personal.phone)}
            className={`${actionClass} ${
              copied === "phone" ? "border-[#00D4FF] text-[#00D4FF]" : ""
            }`}
          >
            {copied === "phone" ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <a
        href="/resume.pdf"
        download
        className="mt-5 flex items-center justify-center gap-2 bg-[#F5C518] px-4 py-3 text-sm font-medium uppercase tracking-wider text-[#0A0A0F] transition-colors hover:bg-[#C49B10]"
        style={{ ...ctaChamfer, fontFamily: "Orbitron" }}
      >
        <Download className="h-4 w-4" />
        Download Resume
      </a>
    </div>
  );
}
