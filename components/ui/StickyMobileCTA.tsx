"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsap";
import { CtaLink } from "@/components/ui/button";

const HIDDEN_ROUTES = ["/apply", "/schedule", "/confirmation"];

export function StickyMobileCTA() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const hidden = HIDDEN_ROUTES.includes(pathname);

  useEffect(() => {
    if (hidden) return;

    const trigger = document.getElementById("chaos-system-scroll-film");
    if (!trigger) return;

    const st = ScrollTrigger.create({
      trigger,
      start: "bottom 80%",
      onEnter: () => setVisible(true),
      onLeaveBack: () => setVisible(false),
    });

    return () => st.kill();
  }, [hidden, pathname]);

  if (hidden) return null;

  return (
    <div
      ref={barRef}
      data-sticky-mobile-cta
      className="mobile-command-bar fixed bottom-0 left-0 right-0 z-[8000] md:hidden"
      style={{
        transform: visible ? "translate3d(0,0,0)" : "translate3d(0,100%,0)",
        transition: "transform 320ms cubic-bezier(0.16,1,0.3,1)",
        willChange: "transform",
      }}
    >
      <div className="px-4 py-3 flex flex-col items-center gap-1">
        <CtaLink href="/apply" className="w-full max-w-sm text-center">
          APPLY FOR THE PROGRAM
        </CtaLink>
        <p className="font-heading text-[10px] uppercase tracking-caps text-ash">Free 20-minute consultation</p>
      </div>
    </div>
  );
}
