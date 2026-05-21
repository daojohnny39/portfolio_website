"use client";

import React, { useRef, useState } from "react";
import { FileText, FolderOpen, Mail, User } from "lucide-react";
import Window from "@/components/desktop/Window";
import MenuBar from "@/components/desktop/MenuBar";
import Dock from "@/components/desktop/Dock";
import ResumeApp from "@/components/apps/ResumeApp";
import AboutApp from "@/components/apps/AboutApp";
import ProjectsApp from "@/components/apps/ProjectsApp";
import ContactApp from "@/components/apps/ContactApp";

interface AppWindow {
  id: string;
  title: string;
  icon: React.ReactNode;
  component: React.ReactNode;
  zIndex: number;
  isMinimized: boolean;
  isOpen: boolean;
  defaultPosition: { x: number; y: number };
  defaultSize: { width: number; height: number };
}

function IconBrackets() {
  return (
    <>
      <span className="absolute left-0 top-0 h-2 w-2 border-l border-t border-[#F5C518]/60 transition-colors group-hover:border-[#F5C518]" />
      <span className="absolute right-0 top-0 h-2 w-2 border-r border-t border-[#F5C518]/60 transition-colors group-hover:border-[#F5C518]" />
      <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#F5C518]/60 transition-colors group-hover:border-[#F5C518]" />
      <span className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-[#F5C518]/60 transition-colors group-hover:border-[#F5C518]" />
    </>
  );
}

export default function Desktop() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [maxZ, setMaxZ] = useState(100);
  const [windows, setWindows] = useState<AppWindow[]>(() => [
    {
      id: "resume",
      title: "Resume.pdf",
      icon: <FileText className="h-4 w-4" />,
      component: <ResumeApp />,
      zIndex: 100,
      isMinimized: false,
      isOpen: false,
      defaultPosition: { x: 80, y: 60 },
      defaultSize: { width: 700, height: 580 },
    },
    {
      id: "about",
      title: "About Me",
      icon: <User className="h-4 w-4" />,
      component: <AboutApp />,
      zIndex: 100,
      isMinimized: false,
      isOpen: false,
      defaultPosition: { x: 160, y: 80 },
      defaultSize: { width: 750, height: 560 },
    },
    {
      id: "projects",
      title: "Projects",
      icon: <FolderOpen className="h-4 w-4" />,
      component: <ProjectsApp />,
      zIndex: 100,
      isMinimized: false,
      isOpen: false,
      defaultPosition: { x: 240, y: 100 },
      defaultSize: { width: 760, height: 540 },
    },
    {
      id: "contact",
      title: "Contact",
      icon: <Mail className="h-4 w-4" />,
      component: <ContactApp />,
      zIndex: 100,
      isMinimized: false,
      isOpen: false,
      defaultPosition: { x: 320, y: 120 },
      defaultSize: { width: 500, height: 400 },
    },
  ]);

  const dockApps = [
    { id: "resume", label: "Resume", icon: <FileText className="h-7 w-7" /> },
    { id: "about", label: "About Me", icon: <User className="h-7 w-7" /> },
    { id: "projects", label: "Projects", icon: <FolderOpen className="h-7 w-7" /> },
    { id: "contact", label: "Contact", icon: <Mail className="h-7 w-7" /> },
  ];

  const handleFocus = (id: string) => {
    const nextZ = maxZ + 1;
    setMaxZ(nextZ);
    setWindows((current) =>
      current.map((w) => (w.id === id ? { ...w, zIndex: nextZ } : w)),
    );
  };

  const handleOpenApp = (id: string) => {
    const nextZ = maxZ + 1;
    setMaxZ(nextZ);
    setWindows((current) =>
      current.map((w) =>
        w.id === id
          ? { ...w, isOpen: true, isMinimized: false, zIndex: nextZ }
          : w,
      ),
    );
  };

  const handleClose = (id: string) => {
    setWindows((current) =>
      current.map((w) => (w.id === id ? { ...w, isOpen: false } : w)),
    );
  };

  const handleMinimize = (id: string) => {
    setWindows((current) =>
      current.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)),
    );
  };

  const openWindows = windows
    .filter((w) => w.isOpen && !w.isMinimized)
    .map((w) => w.id);

  return (
    <div
      ref={constraintsRef}
      className="relative min-h-dvh w-full overflow-hidden bg-[#0A0A0F]"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0H0V40' fill='none' stroke='rgba(245,197,24,0.03)' stroke-width='1'/%3E%3C/svg%3E\")",
          backgroundSize: "40px 40px",
        }}
      />

      <MenuBar />

      <div className="absolute right-6 top-12 z-10 flex flex-col gap-5">
        {dockApps.map((app) => (
          <button
            key={app.id}
            type="button"
            onClick={() => handleOpenApp(app.id)}
            className="group flex w-20 flex-col items-center gap-2 p-2 text-center transition-colors"
          >
            <span className="relative flex h-12 w-12 items-center justify-center border border-[#2A2A3A] bg-[#12121A] text-[#F5C518] transition-colors group-hover:border-[#F5C518] group-hover:bg-[#1C1C2E]">
              <IconBrackets />
              {app.icon}
            </span>
            <span className="text-xs uppercase leading-tight tracking-widest text-[#888899] transition-colors group-hover:text-[#F5C518]">
              {app.label}
            </span>
          </button>
        ))}
      </div>

      {windows
        .filter((w) => w.isOpen && !w.isMinimized)
        .map((w) => (
          <Window
            key={w.id}
            id={w.id}
            title={w.title}
            icon={w.icon}
            zIndex={w.zIndex}
            isMinimized={w.isMinimized}
            constraintsRef={constraintsRef}
            defaultPosition={w.defaultPosition}
            defaultSize={w.defaultSize}
            onFocus={handleFocus}
            onClose={handleClose}
            onMinimize={handleMinimize}
          >
            {w.component}
          </Window>
        ))}

      <div className="fixed bottom-4 left-4 z-10 font-mono text-xs tracking-widest text-[#2A2A3A]">
        NEURAL LINK OS v2.4.7
      </div>

      <Dock apps={dockApps} openWindows={openWindows} onOpenApp={handleOpenApp} />
    </div>
  );
}
