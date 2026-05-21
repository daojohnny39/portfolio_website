"use client";

import { useRouter } from "next/navigation";

import { useFoldTransition } from "@/components/core/Providers";

export interface PhotographyNavProps {
  totalPhotoCount: number;
}

export function PhotographyNav({ totalPhotoCount }: PhotographyNavProps) {
  const router = useRouter();
  const { triggerFold } = useFoldTransition();

  const handlePortfolioClick = () => {
    triggerFold(() => router.push("/"));
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-16 border-b border-[#202027] bg-[#0a0a0a]/95 text-[#fafafa] shadow-[0_0_32px_rgba(0,0,0,0.65)]">
      <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center px-4 md:px-6">
        <button
          type="button"
          onClick={handlePortfolioClick}
          className="justify-self-start font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-[#8a8a93] transition-colors duration-200 hover:text-[#00ffe1] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00ffe1]"
        >
          ← Portfolio
        </button>

        <p className="justify-self-center whitespace-nowrap font-heading text-sm font-black uppercase tracking-[0.18em] text-[#fafafa] md:text-lg">
          Night City Archive
        </p>

        <p className="justify-self-end whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.22em] text-[#8a8a93] md:text-[11px]">
          {totalPhotoCount} exposures
        </p>
      </div>
    </header>
  );
}
