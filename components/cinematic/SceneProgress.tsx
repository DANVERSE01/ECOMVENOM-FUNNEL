"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function SceneProgress({
  triggerSelector,
  className,
}: {
  triggerSelector: string;
  className?: string;
}) {
  const barRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const bar = barRef.current;
      const trigger = document.querySelector<HTMLElement>(triggerSelector);
      if (!bar || !trigger) return;

      if (reduced) {
        gsap.set(bar, { scaleX: 1 });
        return;
      }

      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );
      return;
    },
    { scope: barRef, dependencies: [triggerSelector, reduced], revertOnUpdate: true },
  );

  return (
    <div className={cn("h-px w-full overflow-hidden bg-white/10", className)} aria-hidden>
      <div ref={barRef} className="h-px w-full origin-left bg-venom" />
    </div>
  );
}
