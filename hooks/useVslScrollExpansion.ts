"use client";
import { useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function useVslScrollExpansion(
  sectionRef: React.RefObject<HTMLElement>,
  cardRef: React.RefObject<HTMLElement>,
  overlayRef: React.RefObject<HTMLElement>,
  onVideoActive: (active: boolean) => void,
) {
  const reduced = useReducedMotion();
  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const overlay = overlayRef.current;
    if (!section || !card || !overlay || reduced) return;

    if (typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches) return;

    const tl = gsap.timeline({ paused: true });
    tl.to(card, {
      scale: 1.55,
      translateY: "-8vh",
      borderRadius: "4px",
      boxShadow: "0 0 0 100vmax rgba(0,0,0,0.88)",
      duration: 1,
      ease: "none",
    }, 0)
    .to(overlay, {
      opacity: 1,
      duration: 0.6,
      ease: "none",
    }, 0);

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=120%",
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        tl.progress(self.progress);
        onVideoActive(self.progress > 0.58);
      },
      onLeave: () => { onVideoActive(false); },
      onLeaveBack: () => { onVideoActive(false); },
    });
    return () => { st.kill(); tl.kill(); };
  }, [reduced, sectionRef, cardRef, overlayRef, onVideoActive]);
}
