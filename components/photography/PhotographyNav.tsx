"use client";

import { useRouter } from "next/navigation";

import { useFoldTransition } from "@/components/core/Providers";

export interface PhotographyNavProps {
  totalPhotoCount: number;
}

export function PhotographyNav({ totalPhotoCount }: PhotographyNavProps) {
  const router = useRouter();
  const { triggerTransition } = useFoldTransition();

  const handlePortfolioClick = () => {
    triggerTransition(() => router.push("/"), "left");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-16 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg))]/95 backdrop-blur-sm">
      <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center px-4 md:px-6">
        <button
          type="button"
          onClick={handlePortfolioClick}
          className="justify-self-start text-xs font-medium tracking-wide text-[rgb(var(--muted))] transition-colors duration-200 hover:text-[rgb(var(--fg))] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[rgb(var(--fg))]"
        >
          ← Back
        </button>

        <div className="justify-self-center text-center">
          <p className="text-sm font-semibold tracking-wide text-[rgb(var(--fg))]">
            Photography
          </p>
          <p className="text-[9px] tracking-widest text-[rgb(var(--muted))] uppercase">
            Recognized Virtual Photographer by CD Projekt Red
          </p>
        </div>

        <p className="justify-self-end text-[11px] tracking-wide text-[rgb(var(--muted))]">
          {totalPhotoCount} photos
        </p>
      </div>
    </header>
  );
}
