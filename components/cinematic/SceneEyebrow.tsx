"use client";

import { useEffect, useRef } from "react";
import { scrambleText } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { useLang } from "@/lib/lang-context";

export function SceneEyebrow({ label, className }: { label: string; className?: string }) {
  const labelRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { lang } = useLang();
  const reduced = useReducedMotion();
  const visible = useInViewOnce(wrapRef, { rootMargin: "0px 0px -20% 0px", threshold: 0.2 });
  const hiddenTransform = lang === "ar" ? "translate3d(16px,0,0)" : "translate3d(-16px,0,0)";

  useEffect(() => {
    const el = labelRef.current;
    if (!el || !visible || reduced) return;
    scrambleText(el, label, { duration: 0.45 });
  }, [label, reduced, visible]);

  return (
    <div
      ref={wrapRef}
      className={cn("scene-eyebrow flex items-center gap-3", className)}
      style={{
        opacity: visible || reduced ? 1 : 0,
        transform: visible || reduced ? "translate3d(0,0,0)" : hiddenTransform,
        transition: "opacity 300ms ease-out, transform 300ms ease-out",
      }}
    >
      <span className="scene-eyebrow__mark" />
      <span
        ref={labelRef}
        className={cn(
          "font-heading text-ash",
          lang === "ar" ? "text-[0.78rem] tracking-[0.02em]" : "text-[11px] uppercase tracking-[0.12em]",
        )}
      >
        {label}
      </span>
    </div>
  );
}
