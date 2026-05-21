"use client";

import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

const cursorSize = 12;
const interactiveSelector =
  'a, button, [role="button"], input, textarea, select, label';

export default function CustomCursor() {
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const handleChange = () => setHasFinePointer(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!hasFinePointer) return;

    const handleMouseMove = (event: MouseEvent) => {
      x.set(event.clientX - cursorSize / 2);
      y.set(event.clientY - cursorSize / 2);
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target;

      if (target instanceof Element && target.closest(interactiveSelector)) {
        setIsInteractive(true);
      }
    };

    const handleMouseOut = (event: MouseEvent) => {
      const relatedTarget = event.relatedTarget;

      if (
        relatedTarget instanceof Element &&
        relatedTarget.closest(interactiveSelector)
      ) {
        return;
      }

      const target = event.target;

      if (target instanceof Element && target.closest(interactiveSelector)) {
        setIsInteractive(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [hasFinePointer, x, y]);

  if (!hasFinePointer) return null;

  return (
    <motion.div
      animate={{ scale: isInteractive ? 2 : 1 }}
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 rounded-full bg-white mix-blend-difference"
      style={{
        x,
        y,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    />
  );
}
