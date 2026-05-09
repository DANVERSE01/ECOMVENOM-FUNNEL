"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { splitText } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function useSplitHeading<T extends HTMLElement = HTMLHeadingElement>() {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();
  useGSAP(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const { elements } = splitText(el, "lines", { mask: true });
    gsap.set(elements, { yPercent: 108 });
    gsap.to(elements, {
      yPercent: 0, duration: 0.82, stagger: 0.09, ease: "filmDrop",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
  }, { scope: ref, dependencies: [reduced] });
  return ref;
}
