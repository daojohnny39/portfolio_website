"use client";

import type { Category, Photo } from "@/lib/photography";

export interface PhotoCardProps {
  photo: Photo;
  onClick: (photo: Photo) => void;
}

const CATEGORY_LABELS: Record<Category, string> = {
  portrait: "Portrait",
  artsy: "Artsy",
  environment: "Environment",
  cars: "Cars",
  bw: "B&W",
};

export function PhotoCard({ photo, onClick }: PhotoCardProps) {
  const category = photo.categories[0];
  const categoryLabel = category ? CATEGORY_LABELS[category] : "Photo";

  return (
    <button
      type="button"
      onClick={() => onClick(photo)}
      className="group relative block w-full cursor-pointer overflow-hidden bg-[rgb(var(--surface))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--fg))]"
    >
      <img
        src={photo.url}
        alt={`Cyberpunk 2077, ${photo.date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}`}
        loading="lazy"
        decoding="async"
        className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />

      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />

      <div className="pointer-events-none absolute bottom-3 left-3 translate-y-1 text-[10px] font-medium uppercase tracking-widest text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {categoryLabel}
      </div>
    </button>
  );
}
