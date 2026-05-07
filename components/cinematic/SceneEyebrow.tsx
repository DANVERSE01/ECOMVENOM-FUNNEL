"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { scrambleText } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

export function SceneEyebrow({ label, className }: { label: string; className?: string }) {
  const labelRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = labelRef.current;
      const wrap = wrapRef.current;
      if (!el || !wrap || reduced) return;

      gsap.from(el, {
        opacity: 0,
        duration: 0.3,
        scrollTrigger: {
          trigger: wrap,
          start: "top 88%",
          once: true,
          onEnter: () => {
            scrambleText(el, label, { duration: 0.45 });
          },
        },
      });
    },
    { scope: wrapRef, dependencies: [label, reduced] },
  );

  return (
    <div ref={wrapRef} className={cn("flex items-center gap-3", className)}>
      <span className="h-px w-6 flex-shrink-0 bg-venom" />
      <span ref={labelRef} className="font-heading text-[10px] uppercase tracking-caps text-ash">
        {label}
      </span>
    </div>
  );
}
