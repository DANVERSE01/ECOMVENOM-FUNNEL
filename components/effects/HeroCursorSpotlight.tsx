"use client";

import { useEffect, useRef, useState } from "react";
import { reducedMotion } from "@/lib/gsap";

export function HeroCursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (reducedMotion()) return;
    if (window.matchMedia("(pointer: coarse), (max-width: 767px)").matches) return;

    const el = ref.current;
    if (!el) return;

    setActive(true);

    const onMove = (e: MouseEvent) => {
      el.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(184,255,46,0.04) 0%, rgba(90,154,173,0.02) 30%, transparent 60%)`;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      className="hero-cursor-spotlight"
      data-active={active}
      aria-hidden="true"
    />
  );
}
