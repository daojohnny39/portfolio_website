"use client";

import { useRouter } from "next/navigation";
import type { CSSProperties, MouseEvent } from "react";

import { useFoldTransition } from "@/components/core/Providers";
import { useHydratedReducedMotion } from "@/lib/useHydratedReducedMotion";

import { LinkRow } from "./LinkRow";

interface PhotographyRowProps {
  className?: string;
  style?: CSSProperties;
}

export function PhotographyRow({ className, style }: PhotographyRowProps) {
  const router = useRouter();
  const { triggerTransition } = useFoldTransition();
  const shouldReduceMotion = useHydratedReducedMotion();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // Let modified clicks (new tab, new window) and reduced motion fall through
    // to a normal link navigation.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    if (shouldReduceMotion) return;

    event.preventDefault();
    triggerTransition(() => router.push("/photography"), "right");
  };

  return (
    <LinkRow
      route
      href="/photography"
      label="Photography"
      detail="Cyberpunk 2077"
      onClick={handleClick}
      className={className}
      style={style}
    />
  );
}
