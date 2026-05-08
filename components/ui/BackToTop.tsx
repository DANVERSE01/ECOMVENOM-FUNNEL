"use client";

import { useEffect, useState } from "react";
import { scrollToTop } from "@/lib/lenis";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      setVisible(window.scrollY > window.innerHeight * 3);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      data-visible={visible}
      onClick={scrollToTop}
      className="fixed bottom-5 right-5 z-[8900] hidden h-11 w-11 place-items-center rounded-lg border border-white/10 bg-ink-2/90 text-venom shadow-lg backdrop-blur transition-[opacity,transform,border-color,background-color] duration-300 ease-out hover:border-venom/60 hover:bg-ink-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-venom data-[visible=false]:pointer-events-none data-[visible=false]:translate-y-3 data-[visible=false]:opacity-0 md:grid"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </button>
  );
}
