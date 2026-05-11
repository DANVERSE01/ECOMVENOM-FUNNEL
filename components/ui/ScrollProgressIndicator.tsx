"use client";

import { useRef, useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

export function ScrollProgressIndicator() {
  const barRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    const glow = glowRef.current;
    if (!bar) return;

    const st = ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        bar.style.transform = `scaleY(${self.progress})`;
        if (glow) {
          glow.style.top = `${self.progress * 100}%`;
          glow.style.opacity = self.progress > 0.01 && self.progress < 0.99 ? "1" : "0";
        }
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div
      className="fixed right-3 top-1/4 bottom-1/4 z-50 hidden w-px md:block"
      style={{ background: "rgba(255,255,255,0.04)" }}
    >
      <div
        ref={barRef}
        className="absolute inset-0 origin-top"
        style={{
          transform: "scaleY(0)",
          background: "linear-gradient(180deg, rgba(184,255,46,0.2), rgba(184,255,46,0.5))",
        }}
      />
      <div
        ref={glowRef}
        className="absolute left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-opacity duration-300"
        style={{
          background: "var(--c-venom)",
          boxShadow: "0 0 8px rgba(184,255,46,0.7), 0 0 20px rgba(184,255,46,0.3)",
          opacity: 0,
        }}
      />
    </div>
  );
}
