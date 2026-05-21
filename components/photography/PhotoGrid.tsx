"use client";

import { motion } from "framer-motion";

import type { Photo } from "@/lib/photography";

import { PhotoCard } from "./PhotoCard";

export interface PhotoGridProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
}

export function PhotoGrid({ photos, onPhotoClick }: PhotoGridProps) {
  if (photos.length === 0) {
    return (
      <div className="flex min-h-[42vh] items-center justify-center px-4 py-10 text-center font-mono text-[11px] uppercase tracking-[0.24em] text-[#8a8a93] md:px-6">
        No exposures match this filter
      </div>
    );
  }

  return (
    <motion.div
      className="masonry-grid px-4 py-6 md:px-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 1 },
        visible: { opacity: 1, transition: { staggerChildren: 0.025 } },
      }}
    >
      {photos.map((photo, i) => (
        <div key={photo.filename} className="masonry-item">
          <PhotoCard photo={photo} onClick={onPhotoClick} index={i} />
        </div>
      ))}
    </motion.div>
  );
}
