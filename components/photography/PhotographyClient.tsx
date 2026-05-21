"use client";

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

    if (activeCategory !== "all") {
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
    <div className="min-h-screen bg-[#0a0a0a] pt-16 text-[#fafafa]">
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

      <div className="flex items-center justify-between px-4 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#8a8a93] md:px-6">
        <span>Showing {filteredPhotos.length} of {totalPhotoCount}</span>
        <span className="hidden text-[#3b82f6] sm:inline">Night City Archive</span>
      </div>

      <PhotoGrid photos={filteredPhotos} onPhotoClick={handlePhotoClick} />

      <PhotoModal
        photos={filteredPhotos}
        initialIndex={modalIndex}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
