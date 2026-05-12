"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

type ScrollChoreographyOptions = {
  stagger?: number;
  distance?: number;
  blur?: number;
  once?: boolean;
};

export function useScrollChoreography<T extends HTMLElement = HTMLDivElement>(
  opts: ScrollChoreographyOptions = {},
) {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();
  const { stagger = 0.08, distance = 60, blur = 0, once = true } = opts;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const targets = Array.from(el.querySelectorAll<HTMLElement>("[data-choreography]"));
      if (!targets.length) return;

      if (reduced) {
        gsap.set(targets, { opacity: 1, y: 0, filter: "none" });
        return;
      }

      gsap.set(targets, {
        opacity: 0,
        y: distance,
        ...(blur > 0 ? { filter: `blur(${blur}px)` } : {}),
      });

      gsap.to(targets, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.72,
        stagger,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 82%", once },
      });
    },
    { scope: ref },
  );

  return ref;
}
