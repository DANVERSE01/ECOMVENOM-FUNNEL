"use client";

import { useEffect, useState, type RefObject } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function useInViewOnce<T extends Element>(
  ref: RefObject<T>,
  options: IntersectionObserverInit = { rootMargin: "0px 0px -20% 0px", threshold: 0.2 },
) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(reduced);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return;

    if (reduced || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      setVisible(true);
      observer.disconnect();
    }, options);

    observer.observe(node);

    return () => observer.disconnect();
  }, [options, reduced, ref, visible]);

  return visible;
}
