import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { CustomEase } from "gsap/CustomEase";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// Club plugins removed — license status unverified.
// Replaced by free utilities in @/lib/motion.ts:
//   SplitText        → splitText()
//   ScrambleTextPlugin → scrambleText()
//   DrawSVGPlugin    → setupStrokeDraw() + gsap stroke-dashoffset tween

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Flip, CustomEase, MotionPathPlugin);
  CustomEase.create("venom", "M0,0 C0.11,0 0.192,0.001 0.256,0.008 0.4,0.062 0.458,0.149 0.523,0.237 0.586,0.507 0.615,0.657 0.64,0.821 0.74,0.984 0.833,1 1,1");
  CustomEase.create("filmDrop", "M0,0 C0.2,0 0.4,0.15 0.5,0.4 0.6,0.65 0.65,0.85 0.7,0.95 0.8,1.02 0.9,1 1,1");
  CustomEase.create("venomIn", "M0,0 C0.3,0 0.5,0.1 0.6,0.3 0.8,0.6 0.9,0.9 1,1");
}

export function reducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger, Flip, CustomEase };
