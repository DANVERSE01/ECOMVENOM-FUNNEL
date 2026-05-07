"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/cn";
import { gsap } from "@/lib/gsap";
import { setupStrokeDraw, getStrokeLength } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function SceneHairline({
  className,
  color = "rgba(184,255,46,0.34)",
}: {
  className?: string;
  color?: string;
}) {
  const ref = useRef<SVGLineElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const line = ref.current;
      if (!line) return;

      if (reduced) return;

      const length = getStrokeLength(line);
      // Start from center expanding outward
      line.style.strokeDasharray = `${length}`;
      line.style.strokeDashoffset = `${length}`;

      gsap.to(line, {
        strokeDashoffset: 0,
        duration: 1,
        ease: "venom",
        scrollTrigger: {
          trigger: line,
          start: "top 88%",
          once: true,
        },
      });
    },
    { scope: ref, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <svg className={cn("h-px w-full overflow-visible", className)} viewBox="0 0 1000 1" preserveAspectRatio="none" aria-hidden>
      <line ref={ref} x1="0" y1="0.5" x2="1000" y2="0.5" stroke={color} strokeWidth="1" />
    </svg>
  );
}
