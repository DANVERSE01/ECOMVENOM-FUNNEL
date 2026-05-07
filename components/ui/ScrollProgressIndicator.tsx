"use client";

import { useRef, useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

export function ScrollProgressIndicator() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const st = ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        bar.style.transform = `scaleY(${self.progress})`;
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div className="fixed right-3 top-1/4 bottom-1/4 w-px bg-white/5 z-50 hidden md:block">
      <div
        ref={barRef}
        className="absolute inset-0 bg-venom/50 origin-top"
        style={{ transform: "scaleY(0)" }}
      />
    </div>
  );
}
