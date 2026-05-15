"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CtaLink } from "@/components/ui/button";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useContent } from "@/lib/useContent";

const HIDDEN_ROUTES = ["/apply", "/schedule", "/confirmation"];

export function StickyMobileCTA() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  const { stickyCta } = useContent();

  const hidden = HIDDEN_ROUTES.includes(pathname);

  useEffect(() => {
    if (hidden) {
      setVisible(false);
      return;
    }

    const heroSection = document.getElementById("system-boot");
    const finalCtaZone = document.querySelector<HTMLElement>('[data-final-cta-zone]');
    let heroExited = false;
    let finalVisible = false;
    let denseContentVisible = false;
    const denseContent = new Set<Element>();
    const syncVisibility = () => setVisible(heroExited && !finalVisible && !denseContentVisible);

    const updateHeroState = () => {
      if (heroSection) {
        heroExited = heroSection.getBoundingClientRect().bottom <= 88;
      } else {
        heroExited = window.scrollY > window.innerHeight * 0.75;
      }
      syncVisibility();
    };

    const observers: IntersectionObserver[] = [];

    if (finalCtaZone) {
      const finalObserver = new IntersectionObserver(
        ([entry]) => {
          finalVisible = entry.isIntersecting;
          syncVisibility();
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -18% 0px",
        },
      );
      finalObserver.observe(finalCtaZone);
      observers.push(finalObserver);
    }

    const denseTargets = document.querySelectorAll<HTMLElement>(
      ".v2-scroll-film, .vx-command-board, .vx-timeline-list, .vx-founder, .v2-proof-rail, .vx-offer-list, .vx-faq-list",
    );
    if (denseTargets.length) {
      const denseObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              denseContent.add(entry.target);
            } else {
              denseContent.delete(entry.target);
            }
          });
          denseContentVisible = denseContent.size > 0;
          syncVisibility();
        },
        {
          threshold: 0,
          rootMargin: "-64% 0px 0px 0px",
        },
      );
      denseTargets.forEach((target) => denseObserver.observe(target));
      observers.push(denseObserver);
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        updateHeroState();
        ticking = false;
      });
    };

    updateHeroState();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      observers.forEach((observer) => observer.disconnect());
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [hidden, pathname, reduced]);

  if (hidden) return null;

  return (
    <div
      ref={barRef}
      data-sticky-mobile-cta
      data-visible={visible ? "true" : "false"}
      data-reduced-motion={reduced ? "true" : "false"}
      className="mobile-command-bar venom-mobile-cta fixed bottom-0 left-0 right-0 z-[8000] md:hidden"
    >
      <div className="px-4 py-3 flex flex-col items-center gap-1">
        <CtaLink href="/apply" className="w-full max-w-sm text-center">
          {stickyCta.label}
        </CtaLink>
        <p className="font-heading text-[10px] uppercase tracking-caps text-ash">{stickyCta.sub}</p>
      </div>
    </div>
  );
}
