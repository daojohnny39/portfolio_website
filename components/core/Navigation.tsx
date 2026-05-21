"use client";

import { personal } from "@/lib/data";
import { MODULES } from "@/lib/modules";
import { motion } from "framer-motion";
import {
  Camera,
  ExternalLink,
  FileText,
  FolderOpen,
  GitBranch,
  Mail,
  User,
  type LucideIcon,
} from "lucide-react";

type NavigationProps = {
  activeModule: string;
  onNavigate: (id: string) => void;
};

const iconMap: Record<string, LucideIcon> = {
  User,
  FolderOpen,
  FileText,
  Mail,
  Camera,
};

export default function Navigation({
  activeModule,
  onNavigate,
}: NavigationProps) {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-dvh w-72 flex-col border-r border-[--color-border] bg-[--color-surface]">
      <div className="p-8">
        <div className="flex h-12 w-12 items-center justify-center bg-[--color-fg] font-archivo text-xl font-semibold text-[--color-bg]">
          JD
        </div>

        <h1 className="mt-4 font-archivo text-lg font-semibold text-[--color-fg]">
          {personal.name}
        </h1>

        <p className="mt-1 text-xs leading-relaxed text-[--color-muted]">
          {personal.title}
        </p>
      </div>

      <nav className="flex flex-1 flex-col justify-center px-8">
        <p className="mb-4 text-[10px] uppercase tracking-[0.15em] text-[--color-muted]">
          Navigation
        </p>

        <div>
          {MODULES.map((module) => {
            if (!module.available) return null;

            const Icon = iconMap[module.iconName] ?? User;
            const isActive = activeModule === module.id;

            return (
              <div key={module.id} className="relative">
                {isActive ? (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute left-[-32px] top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-r-full bg-[--color-fg]"
                  />
                ) : null}

                <button
                  type="button"
                  onClick={() => onNavigate(module.id)}
                  className={`group flex w-full items-center gap-3 py-2.5 text-left text-sm transition-colors duration-150 hover:text-[--color-fg] ${
                    isActive
                      ? "font-medium text-[--color-fg]"
                      : "text-[--color-muted]"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{module.label}</span>
                </button>
              </div>
            );
          })}
        </div>
      </nav>

      <div className="flex items-center gap-4 border-t border-[--color-border] p-8">
        <a
          href={personal.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-xs text-[--color-muted] transition-colors hover:text-[--color-fg]"
        >
          <GitBranch className="h-3 w-3" />
          GitHub
          <ExternalLink className="h-3 w-3" />
        </a>

        <a
          href={`mailto:${personal.email}`}
          className="flex items-center gap-1 text-xs text-[--color-muted] transition-colors hover:text-[--color-fg]"
        >
          <Mail className="h-3 w-3" />
          Email
        </a>
      </div>
    </aside>
  );
}
