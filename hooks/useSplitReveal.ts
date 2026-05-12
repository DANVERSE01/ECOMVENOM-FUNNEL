"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { splitText } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

type SplitRevealOptions = {
  animation?: "clip-up" | "fade" | "clip-down";
  stagger?: number;
  duration?: number;
  delay?: number;
  ease?: string;
};

export function useSplitReveal<T extends HTMLElement = HTMLElement>(
  opts: SplitRevealOptions = {},
) {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();

  const { animation = "clip-up", stagger = 0.06, duration = 0.8, delay = 0, ease = "power4.out" } = opts;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (reduced) {
        gsap.set(el, { opacity: 1 });
        return;
      }

      const { elements } = splitText(el, "words", { mask: true });
      const yFrom = animation === "clip-down" ? -100 : 110;
      gsap.set(elements, { yPercent: yFrom });
      gsap.to(elements, {
        yPercent: 0,
        duration,
        stagger,
        delay,
        ease,
        scrollTrigger: { trigger: el, start: "top 80%", once: true },
      });
    },
    { scope: ref },
  );

  return ref;
}
