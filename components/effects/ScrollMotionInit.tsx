"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import {
  initAtmosphereTransitions,
  initHeroParallax,
  initScrollReveals,
  initSectionHeadlineReveals,
  initSectionSheen,
} from "@/lib/motion";

/**
 * ScrollMotionInit — single, app-wide motion orchestrator.
 *
 * Initialises the global GSAP-driven systems once after a short timeout
 * (so fonts have settled) and watches `document.body` with a
 * MutationObserver to re-initialise scroll reveals when new
 * `[data-vx-reveal]` targets appear (e.g. after route change or
 * conditional mount). This replaces the previous 1 s `setInterval`
 * polling rescan, which thrashed `ScrollTrigger.refresh()`.
 *
 * Reveal-state propagation is handled entirely by `initScrollReveals` in
 * `lib/motion.ts`, including the reduced-motion path. The duplicate
 * IntersectionObserver inside `SectionWrapper` was removed because its
 * `data-vx-visible` attribute had no CSS or JS consumer.
 */
export function ScrollMotionInit() {
  useEffect(() => {
    let cleanupReveals: (() => void) | undefined;
    let cleanupParallax: (() => void) | undefined;
    let cleanupSheen: (() => void) | undefined;
    let cleanupHeadlines: (() => void) | undefined;
    let cleanupAtmosphere: (() => void) | undefined;
    let cleanupHairlines: (() => void) | undefined;
    let mutationObserver: MutationObserver | undefined;
    let pendingRescan = 0;

    const run = () => {
      cleanupReveals = initScrollReveals();
      cleanupParallax = initHeroParallax();
      cleanupSheen = initSectionSheen();
      cleanupHeadlines = initSectionHeadlineReveals();
      cleanupAtmosphere = initAtmosphereTransitions();
      ScrollTrigger.refresh();

      // Section hairline fade-in via IntersectionObserver.
      // Targets: #problem, #mechanism, #offer, #final-cta
      const hairlineSections = document.querySelectorAll<HTMLElement>(
        "#problem, #mechanism, #offer, #final-cta",
      );
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reducedMotion) {
        hairlineSections.forEach((section) => {
          // Only add if not already present
          if (!section.querySelector(".vx-section-hairline")) {
            const hairline = document.createElement("span");
            hairline.className = "vx-section-hairline";
            hairline.setAttribute("aria-hidden", "true");
            section.prepend(hairline);
          }
        });

        const hairlineObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const hairline = entry.target.querySelector<HTMLElement>(".vx-section-hairline");
              if (hairline) {
                hairline.setAttribute("data-visible", entry.isIntersecting ? "true" : "false");
              }
            });
          },
          { threshold: 0.05 },
        );

        hairlineSections.forEach((section) => hairlineObserver.observe(section));
        cleanupHairlines = () => hairlineObserver.disconnect();
      }

      // Rescan only when new reveal targets are added to the DOM.
      // Debounced via rAF so a burst of mutations triggers a single re-init.
      const scheduleRescan = () => {
        if (pendingRescan) return;
        pendingRescan = window.requestAnimationFrame(() => {
          pendingRescan = 0;
          const pending = document.querySelectorAll(
            "[data-vx-reveal]:not([data-vx-reveal-init])",
          );
          if (pending.length > 0) {
            initScrollReveals();
            ScrollTrigger.refresh();
          }
        });
      };

      mutationObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type !== "childList") continue;
          for (const node of mutation.addedNodes) {
            if (!(node instanceof Element)) continue;
            if (node.matches?.("[data-vx-reveal]") || node.querySelector?.("[data-vx-reveal]")) {
              scheduleRescan();
              return;
            }
          }
        }
      });

      mutationObserver.observe(document.body, { childList: true, subtree: true });
    };

    const id = window.setTimeout(run, 300);

    return () => {
      window.clearTimeout(id);
      if (pendingRescan) window.cancelAnimationFrame(pendingRescan);
      mutationObserver?.disconnect();
      cleanupReveals?.();
      cleanupParallax?.();
      cleanupSheen?.();
      cleanupHeadlines?.();
      cleanupAtmosphere?.();
      cleanupHairlines?.();
    };
  }, []);

  return null;
}
