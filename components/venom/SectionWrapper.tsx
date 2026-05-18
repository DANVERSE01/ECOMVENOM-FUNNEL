"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionWrapperProps = {
  children: ReactNode;
  className?: string;
  id: string;
  finalCtaZone?: boolean;
  sceneTitle?: string;
};

/**
 * SectionWrapper — purely structural. Owns the `<section>` element, id,
 * scene-title metadata, final-cta-zone flag, and a ref for downstream
 * components that need to query the section.
 *
 * Reveal animation is delegated to the global `initScrollReveals`
 * orchestrator in `lib/motion.ts`, driven by `ScrollMotionInit`. The
 * previous duplicate IntersectionObserver here wrote `data-vx-visible`,
 * which had no CSS or JS consumer; it was removed during the Phase 5
 * motion consolidation.
 */
export function SectionWrapper({ children, className, id, finalCtaZone, sceneTitle }: SectionWrapperProps) {
  const ref = useRef<HTMLElement | null>(null);

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
