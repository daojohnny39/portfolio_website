"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navigation from "@/components/core/Navigation";
import AboutModule from "@/components/modules/AboutModule";
import ProjectsModule from "@/components/modules/ProjectsModule";
import ResumeModule from "@/components/modules/ResumeModule";
import ContactModule from "@/components/modules/ContactModule";
import type { ModuleId } from "@/lib/modules";

export default function PortfolioPage() {
  const [activeModule, setActiveModule] = useState<ModuleId>("about");

  const moduleMap: Record<ModuleId, React.ReactNode> = {
    about: <AboutModule />,
    projects: <ProjectsModule />,
    resume: <ResumeModule />,
    contact: <ContactModule />,
    photography: null,
  };

  const activeContent = moduleMap[activeModule];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex h-dvh w-full overflow-hidden bg-[--color-bg]"
    >
      <Navigation activeModule={activeModule} onNavigate={(id) => setActiveModule(id as ModuleId)} />

      <div className="relative ml-72 h-dvh flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{
              duration: 0.22,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="h-full w-full"
          >
            {activeContent ?? (
              <div className="flex h-full w-full items-center justify-center text-sm text-[--color-muted]">
                Coming soon
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
