"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  selector: string,
  options: { y?: number; stagger?: number; duration?: number; ease?: string; start?: string; } = {}
) {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();
  useGSAP(() => {
    const container = ref.current;
    if (!container || reduced) return;
    const items = gsap.utils.toArray<HTMLElement>(selector, container);
    if (!items.length) return;
    gsap.set(items, { opacity: 0, y: options.y ?? 32 });
    ScrollTrigger.batch(items, {
      onEnter: (batch) => gsap.to(batch, {
        opacity: 1, y: 0, duration: options.duration ?? 0.75,
        stagger: options.stagger ?? 0.09, ease: options.ease ?? "filmDrop", overwrite: true,
      }),
      start: options.start ?? "top 88%",
      once: true,
    });
  }, { scope: ref, dependencies: [reduced] });
  return ref;
}
