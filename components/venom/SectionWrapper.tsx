"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionWrapperProps = {
  children: ReactNode;
  className?: string;
  id: string;
  finalCtaZone?: boolean;
  sceneTitle?: string;
};

export function SectionWrapper({ children, className, id, finalCtaZone, sceneTitle }: SectionWrapperProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;

    const targets = Array.from(section.querySelectorAll<HTMLElement>("[data-vx-reveal]"));
    if (!targets.length) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      targets.forEach((target) => target.setAttribute("data-vx-visible", "true"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.setAttribute("data-vx-visible", "true");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -14% 0px", threshold: 0.12 },
    );

    targets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={cn("vx-section", className)}
      data-final-cta-zone={finalCtaZone ? "true" : undefined}
      data-scene-title={sceneTitle}
    >
      {children}
    </section>
  );
}
