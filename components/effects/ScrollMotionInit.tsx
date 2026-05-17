"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { initHeroParallax, initScrollReveals, initSectionHeadlineReveals, initSectionSheen } from "@/lib/motion";

export function ScrollMotionInit() {
  useEffect(() => {
    let cleanupReveals: (() => void) | undefined;
    let cleanupParallax: (() => void) | undefined;
    let rescanInterval: number | undefined;

    let cleanupSheen: (() => void) | undefined;
    let cleanupHeadlines: (() => void) | undefined;

    const run = () => {
      cleanupReveals = initScrollReveals();
      cleanupParallax = initHeroParallax();
      cleanupSheen = initSectionSheen();
      cleanupHeadlines = initSectionHeadlineReveals();
      ScrollTrigger.refresh();
    };

    const id = window.setTimeout(run, 300);

    rescanInterval = window.setInterval(() => {
      const pending = document.querySelectorAll(
        "[data-vx-reveal]:not([data-vx-reveal-init])",
      );
      if (pending.length > 0) {
        initScrollReveals();
        ScrollTrigger.refresh();
      }
    }, 1000);

    return () => {
      window.clearTimeout(id);
      if (rescanInterval) window.clearInterval(rescanInterval);
      cleanupReveals?.();
      cleanupParallax?.();
      cleanupSheen?.();
      cleanupHeadlines?.();
    };
  }, []);

  return null;
}
