"use client";

import { useEffect, useRef } from "react";

export function useTilt<T extends HTMLElement>(maxDeg = 8) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(1000px) rotateY(${x * maxDeg}deg) rotateX(${-y * maxDeg}deg)`;
      });
    };
    const onLeave = () => {
      el.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, [maxDeg]);

  return ref;
}
