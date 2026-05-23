"use client";

import type { Photo } from "@/lib/photography";

export interface PhotoCardProps {
  photo: Photo;
  onClick: (photo: Photo) => void;
  onLoad?: () => void;
}

export function PhotoCard({ photo, onClick, onLoad }: PhotoCardProps) {
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
        onLoad={onLoad}
        className="block h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />

      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
    </button>
  );
}
