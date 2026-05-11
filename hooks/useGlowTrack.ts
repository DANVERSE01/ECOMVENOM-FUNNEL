import { useEffect, useRef } from "react";
import { reducedMotion } from "@/lib/gsap";

export function useGlowTrack<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container || reducedMotion()) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cards = container.querySelectorAll<HTMLElement>(".glow-track");
    if (!cards.length) return;

    const handler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(".glow-track") as HTMLElement | null;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--glow-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
      target.style.setProperty("--glow-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
    };

    container.addEventListener("mousemove", handler, { passive: true });
    return () => container.removeEventListener("mousemove", handler);
  }, []);

  return ref;
}
