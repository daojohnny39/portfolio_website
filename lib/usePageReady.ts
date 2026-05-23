"use client";

import { useEffect, useRef, useState } from "react";

interface UsePageReadyOptions {
  criticalImages?: string[];
  minDisplayMs?: number;
}

export function usePageReady({
  criticalImages = [],
  minDisplayMs = 600,
}: UsePageReadyOptions = {}) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [imageProgress, setImageProgress] = useState(
    criticalImages.length === 0 ? 1 : 0,
  );
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const imagesRef = useRef(criticalImages);

  useEffect(() => {
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (!cancelled) setFontsLoaded(true);
    });

    const timer = setTimeout(() => setMinTimeElapsed(true), minDisplayMs);

    const images = imagesRef.current;
    const imgElements: HTMLImageElement[] = [];
    let safety: ReturnType<typeof setTimeout> | undefined;

    if (images.length > 0) {
      let loaded = 0;
      for (const url of images) {
        const img = new window.Image();
        imgElements.push(img);
        const done = () => {
          loaded++;
          if (!cancelled) setImageProgress(loaded / images.length);
        };
        img.onload = done;
        img.onerror = done;
        img.src = url;
      }
      safety = setTimeout(() => setImageProgress(1), 10000);
    }

    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (safety) clearTimeout(safety);
      for (const img of imgElements) {
        img.onload = null;
        img.onerror = null;
        img.src = "";
      }
    };
  }, [minDisplayMs]);

  const hasImages = imagesRef.current.length > 0;
  const fontWeight = hasImages ? 0.2 : 0.6;
  const imageWeight = hasImages ? 0.6 : 0;
  const timeWeight = hasImages ? 0.2 : 0.4;

  const progress = Math.min(
    100,
    Math.round(
      (fontsLoaded ? fontWeight * 100 : 0) +
        imageProgress * imageWeight * 100 +
        (minTimeElapsed ? timeWeight * 100 : 0),
    ),
  );

  const isReady = fontsLoaded && imageProgress >= 1 && minTimeElapsed;

  return { progress, isReady };
}
