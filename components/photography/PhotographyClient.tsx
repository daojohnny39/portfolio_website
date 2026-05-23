"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { personal } from "@/lib/data";
import type { Category, Photo } from "@/lib/photography";

import { FilterBar } from "./FilterBar";
import { PhotoGrid } from "./PhotoGrid";
import { PhotoModal } from "./PhotoModal";
import { PhotographyNav } from "./PhotographyNav";

interface PhotographyClientProps {
  photos: Photo[];
  months: string[];
  totalPhotoCount: number;
}

export default function PhotographyClient({ photos, months, totalPhotoCount }: PhotographyClientProps) {
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [activeMonth, setActiveMonth] = useState<string | "all">("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  // Image loading progress tracking
  const [loadedCount, setLoadedCount] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const dismissTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleImageLoad = useCallback(() => {
    setLoadedCount((prev) => prev + 1);
  }, []);

  // Reset loading state when filters change
  const filteredKey = `${activeCategory}-${activeMonth}-${sortOrder}`;
  const prevFilteredKeyRef = useRef(filteredKey);
  useEffect(() => {
    if (prevFilteredKeyRef.current !== filteredKey) {
      setLoadedCount(0);
      setDismissed(false);
      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
      prevFilteredKeyRef.current = filteredKey;
    }
  }, [filteredKey]);

  const filteredPhotos = useMemo(() => {
    let nextPhotos = photos;

    if (activeCategory === "all") {
      nextPhotos = nextPhotos.filter((photo) => !photo.categories.includes("bw"));
    } else {
      nextPhotos = nextPhotos.filter((photo) => photo.categories.includes(activeCategory));
    }

    if (activeMonth !== "all") {
      nextPhotos = nextPhotos.filter((photo) => photo.month === activeMonth);
    }

    if (sortOrder === "oldest") {
      return [...nextPhotos].reverse();
    }

    return nextPhotos;
  }, [activeCategory, activeMonth, photos, sortOrder]);

  const handlePhotoClick = useCallback(
    (photo: Photo) => {
      setModalIndex(filteredPhotos.indexOf(photo));
      setModalOpen(true);
    },
    [filteredPhotos],
  );

  return (
    <motion.div
      className="min-h-screen pt-16"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <PhotographyNav totalPhotoCount={totalPhotoCount} />

      <div className="mx-auto max-w-lg px-4 pt-10 pb-6 text-center md:px-6">
        <h2 className="font-heading text-lg font-semibold tracking-tight text-[rgb(var(--fg))]">
          {personal.name}
        </h2>
        <p className="mt-1 text-xs font-medium uppercase tracking-widest text-[rgb(var(--muted))]">
          Cyberpunk 2077 Virtual Photographer
        </p>
        <p className="mt-3 text-xs leading-relaxed tracking-wide text-[rgb(var(--muted))]">
          Virtual Photographer recognized by CD Projekt Red.  Occasionally take preview shots for upcoming Cyberpunk 2077 mod releases on NexusMods. All shots are taken using reShade and Otis tools with no post-processing.
        </p>
      </div>

      <FilterBar
        months={months}
        activeCategory={activeCategory}
        activeMonth={activeMonth}
        sortOrder={sortOrder}
        onCategoryChange={setActiveCategory}
        onMonthChange={setActiveMonth}
        onSortChange={setSortOrder}
      />

      <PhotoGrid photos={filteredPhotos} onPhotoClick={handlePhotoClick} onImageLoad={handleImageLoad} />

      <PhotoModal
        photos={filteredPhotos}
        initialIndex={modalIndex}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      <LoadingToast
        loadedCount={loadedCount}
        totalCount={filteredPhotos.length}
        dismissed={dismissed}
        onDismissed={() => setDismissed(true)}
        dismissTimerRef={dismissTimerRef}
      />
    </motion.div>
  );
}

/* ---------- Loading toast ---------- */

interface LoadingToastProps {
  loadedCount: number;
  totalCount: number;
  dismissed: boolean;
  onDismissed: () => void;
  dismissTimerRef: React.MutableRefObject<ReturnType<typeof setTimeout> | undefined>;
}

function LoadingToast({
  loadedCount,
  totalCount,
  dismissed,
  onDismissed,
  dismissTimerRef,
}: LoadingToastProps) {
  const allLoaded = loadedCount >= totalCount;

  // Auto-dismiss 1.2s after all images finish
  useEffect(() => {
    if (allLoaded && !dismissed) {
      dismissTimerRef.current = setTimeout(() => onDismissed(), 1200);
      return () => {
        if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
      };
    }
  }, [allLoaded, dismissed, onDismissed, dismissTimerRef]);

  const progress = totalCount > 0 ? Math.round((loadedCount / totalCount) * 100) : 0;
  const show = totalCount > 0 && !dismissed && loadedCount < totalCount;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loading-toast"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-50"
        >
          <div className="flex items-center gap-3 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg))]/90 px-5 py-2.5 shadow-lg backdrop-blur-md">
            {/* Spinner */}
            <svg
              className="h-3.5 w-3.5 animate-spin text-[rgb(var(--muted))]"
              viewBox="0 0 16 16"
              fill="none"
            >
              <circle
                cx="8"
                cy="8"
                r="6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="28"
                strokeDashoffset="8"
              />
            </svg>

            <span className="text-[11px] font-medium tracking-wide text-[rgb(var(--muted))]">
              Loading images...
            </span>

            {/* Progress bar */}
            <div className="h-1 w-24 overflow-hidden rounded-full bg-[rgb(var(--border))]">
              <div
                className="h-full rounded-full bg-[rgb(var(--fg))] transition-[width] duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <span className="min-w-[2.5rem] text-right text-[10px] tabular-nums text-[rgb(var(--muted))]">
              {loadedCount}/{totalCount}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
