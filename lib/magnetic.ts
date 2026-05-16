"use client";

import { useEffect, useRef } from "react";

export function useMagnetic<T extends HTMLElement>(strength = 0.25, radius = 140) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const tick = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        cx += (tx - cx) * 0.18;
        cy += (ty - cy) * 0.18;
        el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
        if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) tick();
      });
    };

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const ex = e.clientX - (r.left + r.width / 2);
      const ey = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(ex, ey);
      if (dist < radius) {
        tx = ex * strength;
        ty = ey * strength;
      } else {
        tx = 0;
        ty = 0;
      }
      tick();
    };

    const onLeave = () => {
      tx = 0;
      ty = 0;
      tick();
    };

    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, [strength, radius]);

  return ref;
}
