"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/cn";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function Hairline({
  color = "rgba(255,255,255,0.07)",
  className,
}: {
  color?: string;
  className?: string;
}) {
  const lineRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    (ctx) => {
      const line = lineRef.current;
      if (!line) return () => ctx.revert();

      if (reduced) {
        gsap.set(line, { scaleX: 1 });
        return () => ctx.revert();
      }

      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: line,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );

      return () => ctx.revert();
    },
    { scope: lineRef, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <div aria-hidden className={cn("h-px w-full overflow-hidden", className)}>
      <div
        ref={lineRef}
        className="h-px w-full"
        style={{
          backgroundColor: color,
          transformOrigin: "left center",
        }}
      />
    </div>
  );
}
