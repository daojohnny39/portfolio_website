"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

import type { Category, Photo } from "@/lib/photography";

export interface PhotoModalProps {
  photos: Photo[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

const MONTH_NAMES = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

const CATEGORY_LABELS: Record<Category, string> = {
  portrait: "Portrait",
  artsy: "Artsy",
  environment: "Environment",
  cars: "Cars",
  bw: "B&W",
};

function formatCaptionDate(date: Date) {
  const month = MONTH_NAMES[date.getMonth()];
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${month} ${day}, ${year}  ${hours}:${minutes}`;
}

export function PhotoModal({ photos, initialIndex, isOpen, onClose }: PhotoModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const currentPhoto = photos[currentIndex];

  const goToPrevious = useCallback(() => {
    if (photos.length === 0) return;
    setCurrentIndex((index) => (index - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const goToNext = useCallback(() => {
    if (photos.length === 0) return;
    setCurrentIndex((index) => (index + 1) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    if (isOpen) setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") goToPrevious();
      if (event.key === "ArrowRight") goToNext();
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goToNext, goToPrevious, isOpen, onClose]);

  const category = currentPhoto?.categories[0];
  const categoryLabel = category ? CATEGORY_LABELS[category] : "Photo";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/95 text-[#fafafa]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          aria-modal="true"
          aria-label="Photo viewer"
          role="dialog"
        >
          <div className="absolute left-4 top-4 z-20 font-mono text-[11px] uppercase tracking-[0.24em] text-[#8a8a93] md:left-6 md:top-6">
            {photos.length > 0 ? `${currentIndex + 1} / ${photos.length}` : "0 / 0"}
          </div>

          <button
            type="button"
            aria-label="Close photo modal"
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            className="absolute right-4 top-4 z-20 flex h-12 w-12 items-center justify-center border border-[#202027] bg-[#08080a] font-mono text-3xl leading-none text-[#fafafa] transition-all duration-200 hover:border-[#00ffe1] hover:text-[#00ffe1] hover:shadow-[0_0_20px_rgba(0,255,225,0.22)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00ffe1] md:right-6 md:top-6"
          >
            ×
          </button>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={(event) => {
                  event.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-0 top-0 z-10 flex h-full w-14 items-center justify-center bg-black/20 font-mono text-4xl text-[#8a8a93] transition-all duration-200 hover:bg-[#00ffe1]/10 hover:text-[#00ffe1] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#00ffe1] md:w-20"
              >
                ←
              </button>

              <button
                type="button"
                aria-label="Next photo"
                onClick={(event) => {
                  event.stopPropagation();
                  goToNext();
                }}
                className="absolute right-0 top-0 z-10 flex h-full w-14 items-center justify-center bg-black/20 font-mono text-4xl text-[#8a8a93] transition-all duration-200 hover:bg-[#00ffe1]/10 hover:text-[#00ffe1] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#00ffe1] md:w-20"
              >
                →
              </button>
            </>
          )}

          {currentPhoto && (
            <div className="flex max-h-screen flex-col items-center gap-4 px-16 py-20 md:px-24">
              <motion.img
                key={currentPhoto.filename}
                src={currentPhoto.url}
                alt={`Cyberpunk 2077, ${formatCaptionDate(currentPhoto.date)}`}
                className="max-h-[85vh] max-w-[85vw] border border-[#202027] object-contain shadow-[0_0_46px_rgba(0,0,0,0.72)]"
                style={{ borderRadius: 0 }}
                initial={{ opacity: 0, scale: 0.975 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.975 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                decoding="async"
                onClick={(event) => event.stopPropagation()}
              />

              <div className="text-center font-mono text-[11px] uppercase tracking-[0.22em] text-[#8a8a93]">
                <span className="text-[#00ffe1]">{categoryLabel}</span> · {formatCaptionDate(currentPhoto.date)}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
