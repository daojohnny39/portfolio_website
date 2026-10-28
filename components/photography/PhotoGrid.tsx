"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import type { Photo } from "@/lib/photography";

import { PhotoCard } from "./PhotoCard";

const DEFAULT_ASPECT = 16 / 9;
const MAX_ROW_HEIGHT = 440;
const MIN_ROW_HEIGHT = 320;
// Below about 910px wide, the minimum is this share of the width instead, so
// phones don't fall back to one photo per row.
const MIN_ROW_HEIGHT_RATIO = 0.35;
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

// The random photo count for a row goes up to this. A row takes more photos
// when it needs them to stay under MAX_ROW_HEIGHT.
function getMaxPreferredPerRow(width: number): number {
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
  // False for a last row that runs out of photos while still too tall.
  fillsWidth: boolean;
}

function computeRows(
  photos: PhotoWithAspect[],
  containerWidth: number,
): Row[] {
  if (containerWidth <= 0 || photos.length === 0) return [];

  const rows: Row[] = [];
  let i = 0;
  const maxPreferred = getMaxPreferredPerRow(containerWidth);
  const minRowHeight = Math.min(MIN_ROW_HEIGHT, containerWidth * MIN_ROW_HEIGHT_RATIO);
  const seed = hashString(photos[0].photo.filename);
  const rng = mulberry32(seed);

  // How far a height falls outside the min–max range, as a ratio (1 means inside it).
  const miss = (height: number) =>
    height < minRowHeight
      ? minRowHeight / height
      : height > MAX_ROW_HEIGHT
        ? height / MAX_ROW_HEIGHT
        : 1;

  while (i < photos.length) {
    const remaining = photos.length - i;
    const preferred = Math.min(2 + Math.floor(rng() * (maxPreferred - 1)), remaining);

    // Each added photo makes the row shorter, so stop once past the random
    // count and under the minimum.
    const heights: number[] = [];
    let totalAspect = 0;
    for (let n = 1; n <= remaining; n++) {
      totalAspect += photos[i + n - 1].aspectRatio;
      heights.push((containerWidth - (n - 1) * GAP) / totalAspect);
      if (n >= preferred && heights[n - 1] < minRowHeight) break;
    }

    // Keep the random count when its height is in range. Otherwise take the count
    // whose height comes closest, preferring counts near the random one.
    let count = preferred;
    for (let n = 1; n <= heights.length; n++) {
      const diff = miss(heights[n - 1]) - miss(heights[count - 1]);
      if (diff < 0 || (diff === 0 && Math.abs(n - preferred) < Math.abs(count - preferred))) {
        count = n;
      }
    }

    // A row that is still a little too tall gets capped, cropping its photos
    // slightly. The last row can run out of photos, so it's capped without
    // stretching to the full width.
    const height = heights[count - 1];
    rows.push({
      photos: photos.slice(i, i + count),
      height: Math.min(height, MAX_ROW_HEIGHT),
      fillsWidth: count < remaining || height <= MAX_ROW_HEIGHT,
    });
    i += count;
  }

  return rows;
}

export interface PhotoGridProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
  onImageLoad?: () => void;
}

export function PhotoGrid({ photos, onPhotoClick, onImageLoad }: PhotoGridProps) {
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
                flexGrow: row.fillsWidth ? aspectRatio : 0,
                flexBasis: row.fillsWidth ? 0 : aspectRatio * row.height,
                height: row.height,
                minWidth: 0,
              }}
            >
              <PhotoCard photo={photo} onClick={onPhotoClick} onLoad={onImageLoad} />
            </div>
          ))}
        </motion.div>
      ))}
    </motion.div>
  );
}
