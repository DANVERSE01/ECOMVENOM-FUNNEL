import { useRef, useEffect } from "react";
import { gsap, reducedMotion } from "@/lib/gsap";

export function useMagnetic<T extends HTMLElement = HTMLDivElement>(strength = 0.4) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rawX = (e.clientX - cx) * strength;
      const rawY = (e.clientY - cy) * strength;
      const dx = Math.max(-6, Math.min(6, rawX));
      const dy = Math.max(-6, Math.min(6, rawY));
      gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: "power2.out" });
    };

    const onMouseLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [strength]);

  return ref;
}
