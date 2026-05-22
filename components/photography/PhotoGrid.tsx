"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import type { Photo } from "@/lib/photography";

import { PhotoCard } from "./PhotoCard";

const DEFAULT_ASPECT = 16 / 9;
const MAX_ROW_HEIGHT = 380;
const GAP = 3;

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return hash;
}

function getMaxPerRow(width: number): number {
  if (width < 500) return 2;
  if (width < 768) return 3;
  if (width < 1100) return 4;
  return 5;
}

interface PhotoWithAspect {
  photo: Photo;
  aspectRatio: number;
}

interface Row {
  photos: PhotoWithAspect[];
  height: number;
}

function computeRows(
  photos: PhotoWithAspect[],
  containerWidth: number,
): Row[] {
  if (containerWidth <= 0 || photos.length === 0) return [];

  const rows: Row[] = [];
  let i = 0;
  const maxPerRow = getMaxPerRow(containerWidth);
  const seed = hashString(photos[0].photo.filename);
  const rng = mulberry32(seed);

  while (i < photos.length) {
    const remaining = photos.length - i;
    let count = Math.min(
      2 + Math.floor(rng() * (maxPerRow - 1)),
      remaining,
    );

    let totalAspect = photos.slice(i, i + count).reduce((s, p) => s + p.aspectRatio, 0);
    let availableWidth = containerWidth - (count - 1) * GAP;
    let rowHeight = availableWidth / totalAspect;

    while (rowHeight > MAX_ROW_HEIGHT && count < Math.min(maxPerRow, remaining)) {
      count++;
      totalAspect = photos.slice(i, i + count).reduce((s, p) => s + p.aspectRatio, 0);
      availableWidth = containerWidth - (count - 1) * GAP;
      rowHeight = availableWidth / totalAspect;
    }

    rows.push({ photos: photos.slice(i, i + count), height: rowHeight });
    i += count;
  }

  return rows;
}

export interface PhotoGridProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
}

export function PhotoGrid({ photos, onPhotoClick }: PhotoGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [aspects, setAspects] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    for (const photo of photos) {
      if (aspects.has(photo.filename)) continue;
      const img = new Image();
      img.onload = () => {
        setAspects((prev) => {
          const next = new Map(prev);
          next.set(photo.filename, img.naturalWidth / img.naturalHeight);
          return next;
        });
      };
      img.src = photo.url;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos]);

  const photosWithAspect = useMemo(
    () =>
      photos.map((photo) => ({
        photo,
        aspectRatio: aspects.get(photo.filename) ?? DEFAULT_ASPECT,
      })),
    [photos, aspects],
  );

  const rows = useMemo(
    () => computeRows(photosWithAspect, containerWidth),
    [photosWithAspect, containerWidth],
  );

  if (photos.length === 0) {
    return (
      <div className="flex min-h-[42vh] items-center justify-center px-4 py-10 text-center text-sm text-[rgb(var(--muted))]">
        No photos match this filter
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className="px-1 py-1"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
      }}
    >
      {rows.map((row) => (
        <motion.div
          key={row.photos[0].photo.filename}
          className="flex"
          style={{ gap: GAP, marginBottom: GAP }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.4 }}
        >
          {row.photos.map(({ photo, aspectRatio }) => (
            <div
              key={photo.filename}
              className="overflow-hidden"
              style={{
                flexGrow: aspectRatio,
                flexBasis: 0,
                height: row.height,
                minWidth: 0,
              }}
            >
              <PhotoCard photo={photo} onClick={onPhotoClick} />
            </div>
          ))}
        </motion.div>
      ))}
    </motion.div>
  );
}
