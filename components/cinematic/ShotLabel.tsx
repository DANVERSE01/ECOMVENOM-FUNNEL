"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { scrambleText } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

export function ShotLabel({
  index,
  label,
  scramble,
  className,
}: {
  index: string;
  label: string;
  scramble?: boolean;
  className?: string;
}) {
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
    <div
      ref={wrapRef}
      className={cn(
        "inline-flex items-center gap-3 border border-venom/25 bg-ink-2/80 px-3 py-2 font-heading text-[10px] uppercase tracking-caps text-bone-2 backdrop-blur-sm",
        className,
      )}
    >
      <span className="text-venom">{index}</span>
      <span ref={labelRef}>{label}</span>
    </div>
  );
}
