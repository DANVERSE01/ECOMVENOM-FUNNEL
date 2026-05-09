"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { splitText } from "@/lib/motion";
import { useLang } from "@/lib/lang-context";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function useSplitHeading<T extends HTMLElement = HTMLHeadingElement>() {
  const ref = useRef<T>(null);
  const { lang } = useLang();
  const reduced = useReducedMotion();
  useGSAP(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const isArabic = lang === "ar";
    const { elements } = splitText(el, "lines", { mask: true });

    if (isArabic) {
      gsap.set(elements, { opacity: 0, x: 34, y: 16, filter: "blur(10px)" });
      gsap.to(elements, {
        opacity: 1,
        x: 0,
        y: 0,
        filter: "blur(0px)",
        duration: 0.88,
        stagger: 0.11,
        ease: "power3.out",
        clearProps: "filter",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
      return;
    }

    gsap.set(elements, { yPercent: 108 });
    gsap.to(elements, {
      yPercent: 0,
      duration: 0.82,
      stagger: 0.09,
      ease: "filmDrop",
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });
  }, { scope: ref, dependencies: [lang, reduced] });
  return ref;
}
