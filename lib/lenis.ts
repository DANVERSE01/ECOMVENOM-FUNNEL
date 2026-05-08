import Lenis from "lenis";
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/gsap";

let lenis: Lenis | null = null;
let tickerAdded = false;

export const LENIS_EASING = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));
export const NAV_SCROLL_OFFSET = 72;

function tick(time: number) { lenis?.raf(time * 1000); }

export function getLenis() {
  if (typeof window === "undefined" || reducedMotion()) return null;
  if (!lenis) {
    lenis = new Lenis({
      duration: 1.2,
      easing: LENIS_EASING,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.15,
    });
    lenis.on("scroll", ScrollTrigger.update);
  }
  if (!tickerAdded) { gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0); tickerAdded = true; }
  return lenis;
}

export function getCurrentLenis() {
  return lenis;
}

export function scrollToElement(target: HTMLElement, offset = -NAV_SCROLL_OFFSET) {
  if (typeof window === "undefined") return;

  const instance = getCurrentLenis();
  if (instance) {
    instance.scrollTo(target, { offset, duration: 1.2, easing: LENIS_EASING });
    return;
  }

  const top = target.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({
    top: Math.max(0, top),
    behavior: reducedMotion() ? "auto" : "smooth",
  });
}

export function scrollToTop() {
  if (typeof window === "undefined") return;

  const instance = getCurrentLenis();
  if (instance) {
    instance.scrollTo(0, { duration: 1.2, easing: LENIS_EASING });
    return;
  }

  window.scrollTo({ top: 0, behavior: reducedMotion() ? "auto" : "smooth" });
}

export function destroyLenis() {
  if (lenis) { lenis.off("scroll", ScrollTrigger.update); lenis.destroy(); lenis = null; }
  if (tickerAdded) { gsap.ticker.remove(tick); tickerAdded = false; }
}
