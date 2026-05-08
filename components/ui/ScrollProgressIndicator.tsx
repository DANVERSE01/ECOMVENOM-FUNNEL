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
        bar.style.transform = `scaleX(${self.progress})`;
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 z-[9100] hidden h-0.5 bg-white/5 md:block">
      <div
        ref={barRef}
        className="absolute inset-0 origin-left bg-venom"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
