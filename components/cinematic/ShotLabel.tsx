"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
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

      gsap.to(el, {
        duration: 0.45,
        scrambleText: {
          text: label,
          chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
          revealDelay: 0.2,
        },
        scrollTrigger: { trigger: wrap, start: "top 88%", once: true },
      });
    },
    { scope: wrapRef, dependencies: [label, reduced] },
  );

  return (
    <div
      ref={wrapRef}
      className={cn(
        "inline-flex items-center gap-3 border border-venom/25 bg-black/55 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/80 backdrop-blur-md",
        className,
      )}
    >
      <span className="text-venom">{index}</span>
      <span ref={labelRef}>{label}</span>
    </div>
  );
}
