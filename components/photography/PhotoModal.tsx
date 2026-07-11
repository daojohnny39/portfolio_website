"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

import type { Photo } from "@/lib/photography";

export interface PhotoModalProps {
  photos: Photo[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          aria-modal="true"
          aria-label="Photo viewer"
          role="dialog"
        >
          <div className="absolute left-4 top-4 z-20 text-[11px] tracking-wide text-[rgb(var(--muted))] md:left-6 md:top-6">
            {photos.length > 0 ? `${currentIndex + 1} / ${photos.length}` : "0 / 0"}
          </div>

          <button
            type="button"
            aria-label="Close photo modal"
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center text-2xl text-[rgb(var(--muted))] transition-colors duration-200 hover:text-[rgb(var(--fg))] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[rgb(var(--fg))] md:right-6 md:top-6"
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
                className="absolute left-0 top-0 z-10 flex h-full w-14 items-center justify-center text-2xl text-[rgb(var(--muted))] transition-colors duration-200 hover:text-[rgb(var(--fg))] focus-visible:outline-none md:w-20"
              >
                ‹
              </button>

              <button
                type="button"
                aria-label="Next photo"
                onClick={(event) => {
                  event.stopPropagation();
                  goToNext();
                }}
                className="absolute right-0 top-0 z-10 flex h-full w-14 items-center justify-center text-2xl text-[rgb(var(--muted))] transition-colors duration-200 hover:text-[rgb(var(--fg))] focus-visible:outline-none md:w-20"
              >
                ›
              </button>
            </>
          )}

          {currentPhoto && (
            <div className="flex max-h-screen flex-col items-center gap-3 px-16 py-16 md:px-24">
              <motion.img
                key={currentPhoto.filename}
                src={currentPhoto.url}
                alt={`Cyberpunk 2077, ${currentPhoto.date.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                  timeZone: "UTC",
                })}`}
                className="max-h-[82vh] max-w-[85vw] object-contain"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                decoding="async"
                onClick={(event) => event.stopPropagation()}
              />

              <div className="text-center text-[11px] tracking-wide text-[rgb(var(--muted))]">
                {currentPhoto.date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  timeZone: "UTC",
                })}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
