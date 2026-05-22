"use client";

import { motion } from "framer-motion";
import { useCallback, useMemo, useState } from "react";

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

      <FilterBar
        months={months}
        activeCategory={activeCategory}
        activeMonth={activeMonth}
        sortOrder={sortOrder}
        onCategoryChange={setActiveCategory}
        onMonthChange={setActiveMonth}
        onSortChange={setSortOrder}
      />

      <div className="flex items-center justify-between px-4 py-2 text-[11px] tracking-wide text-[rgb(var(--muted))] md:px-6">
        <span>Showing {filteredPhotos.length} of {totalPhotoCount}</span>
      </div>

      <PhotoGrid photos={filteredPhotos} onPhotoClick={handlePhotoClick} />

      <PhotoModal
        photos={filteredPhotos}
        initialIndex={modalIndex}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </motion.div>
  );
}
