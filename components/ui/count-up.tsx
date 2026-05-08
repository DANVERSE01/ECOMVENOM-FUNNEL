"use client";

import { useEffect, useRef, useState } from "react";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { useReducedMotion } from "@/lib/useReducedMotion";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function CountUpNumber({
  value,
  pad = 0,
  duration = 1200,
  className,
}: {
  value: number;
  pad?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInViewOnce(ref, { rootMargin: "0px 0px -18% 0px", threshold: 0.35 });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setDisplay(Math.round(value * easeOutCubic(progress)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [duration, inView, reduced, value]);

  return (
    <span ref={ref} className={className}>
      {String(display).padStart(pad, "0")}
    </span>
  );
}
