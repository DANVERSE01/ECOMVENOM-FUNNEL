"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function SectionEyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reduced = useReducedMotion();
  const visible = useInViewOnce(ref, { rootMargin: "0px 0px -20% 0px", threshold: 0.2 });

  return (
    <span
      ref={ref}
      className={cn(
        "inline-block text-[11px] font-semibold uppercase tracking-[0.12em] text-venom sm:text-xs",
        className,
      )}
      style={{
        opacity: visible || reduced ? 1 : 0,
        transform: visible || reduced ? "translate3d(0,0,0)" : "translate3d(-16px,0,0)",
        transition: "opacity 300ms ease-out, transform 300ms ease-out",
      }}
    >
      {children}
    </span>
  );
}
