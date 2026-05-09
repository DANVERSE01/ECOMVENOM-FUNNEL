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

    const heroCta = document.querySelector<HTMLElement>('#system-boot [data-hero-cta]');

    if (heroCta) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setVisible(!entry.isIntersecting);
        },
        {
          threshold: 0.01,
          rootMargin: "-88px 0px 0px 0px",
        },
      );

      observer.observe(heroCta);
      return () => observer.disconnect();
    }

    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.35);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [hidden, pathname, reduced]);

  if (hidden) return null;

  return (
    <div
      ref={barRef}
      data-sticky-mobile-cta
      data-visible={visible ? "true" : "false"}
      data-reduced-motion={reduced ? "true" : "false"}
      className="mobile-command-bar fixed bottom-0 left-0 right-0 z-[8000] md:hidden"
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
