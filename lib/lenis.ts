import Lenis from "lenis";
import { gsap, ScrollTrigger, reducedMotion } from "@/lib/gsap";

let lenis: Lenis | null = null;
let tickerAdded = false;

function tick(time: number) { lenis?.raf(time * 1000); }

export function getLenis() {
  if (typeof window === "undefined" || reducedMotion()) return null;
  if (!lenis) {
    lenis = new Lenis({ lerp: 0.11, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.15 });
    lenis.on("scroll", ScrollTrigger.update);
  }
  if (!tickerAdded) { gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0); tickerAdded = true; }
  return lenis;
}

export function destroyLenis() {
  if (lenis) { lenis.off("scroll", ScrollTrigger.update); lenis.destroy(); lenis = null; }
  if (tickerAdded) { gsap.ticker.remove(tick); tickerAdded = false; }
}
