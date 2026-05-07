"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { CtaLink } from "@/components/ui/button";
import { ScrollFilmScene } from "@/components/cinematic/ScrollFilmScene";
import { SceneEyebrow } from "@/components/cinematic/SceneEyebrow";
import { SystemOverlay } from "@/components/cinematic/SystemOverlay";
import { GENERATED_STILLS } from "@/lib/frameManifest";
import { CTA_LABEL, CTA_SUB } from "@/lib/content";
import { gsap } from "@/lib/gsap";
import { splitText, getStrokeLength } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function Scene08FinalCTA() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const applySpanRef = useRef<HTMLSpanElement | null>(null);
  const ctaWrapRef = useRef<HTMLDivElement | null>(null);
  const subtextRef = useRef<HTMLParagraphElement | null>(null);
  const hairlinePathRef = useRef<SVGLineElement | null>(null);
  const glowRef = useRef<gsap.core.Tween | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const section = sectionRef.current;
      const headline = headlineRef.current;
      const subtext = subtextRef.current;
      const ctaWrap = ctaWrapRef.current;
      if (!section) return;

      if (reduced) {
        if (headline) gsap.set(headline, { opacity: 1, yPercent: 0 });
        gsap.set([subtext, ctaWrap], { opacity: 1, y: 0 });
        return;
      }

      // Headline SplitText — lines with yPercent + rotation
      if (headline) {
        const { elements: headlineLines } = splitText(headline, "lines", { mask: true });
        gsap.set(headlineLines, { yPercent: 120, rotation: 3 });
        if (applySpanRef.current) gsap.set(applySpanRef.current, { scale: 0.9 });
        gsap.set([subtext, ctaWrap], { opacity: 0, y: 22 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: headline, start: "top 72%", once: true },
        });
        tl.to(headlineLines, {
          yPercent: 0,
          rotation: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "filmDrop",
        });
        if (applySpanRef.current) {
          tl.to(applySpanRef.current, { scale: 1, duration: 0.6, ease: "venom" }, "<0.2");
        }
        tl.to([subtext, ctaWrap], {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: "venom",
        }, "-=0.2");

        // CTA breathing glow — after entrance
        if (ctaWrapRef.current) {
          const btn = ctaWrapRef.current.querySelector<HTMLElement>(".btn-primary");
          if (btn && !glowRef.current) {
            glowRef.current = gsap.to(btn, {
              boxShadow: "0 0 60px rgba(184,255,46,0.45)",
              repeat: -1,
              yoyo: true,
              duration: 2,
              ease: "venom",
              delay: 1.5,
            });
          }
        }
      }

      // Subtext word split
      if (subtext) {
        const { elements: words } = splitText(subtext, "words");
        gsap.from(words, {
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "venom",
          scrollTrigger: { trigger: subtext, start: "top 80%", once: true },
        });
      }

      // Venom hairline — stroke-dashoffset (replaces DrawSVG)
      if (hairlinePathRef.current) {
        const line = hairlinePathRef.current;
        const length = getStrokeLength(line);
        line.style.strokeDasharray = `${length}`;
        line.style.strokeDashoffset = `${length}`;
        gsap.to(line, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "venom",
          scrollTrigger: { trigger: line, start: "top 90%", once: true },
        });
      }

      return () => {
        glowRef.current?.kill();
        glowRef.current = null;
      };
    },
    { scope: sectionRef, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <ScrollFilmScene id="book-the-call" scene="08" title="START" className="min-h-screen">
      <div className="absolute inset-0">
        <Image src={GENERATED_STILLS.ctaBg} alt="" fill sizes="100vw" className="object-cover opacity-[0.16]" />
        <div className="clean-system-bg absolute inset-0" aria-hidden />
        <SystemOverlay />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(184,255,46,0.08),transparent_34%,rgba(0,0,0,0.88)_74%)]" />
        <div className="scene-material-wash" data-tone="action" aria-hidden />
        {/* Top gradient from previous scene */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-32 bg-gradient-to-b from-black to-transparent" />
      </div>

      <div ref={sectionRef} className="relative z-10 grid min-h-screen place-items-center px-5 py-28 text-center sm:px-8 lg:px-12">
        {/* Scene ghost */}
        <span
          className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-bone/0 select-none"
          style={{ fontSize: "30vw", opacity: 0.025, WebkitTextStroke: "1px rgba(184,255,46,0.15)" }}
          aria-hidden
        >
          08
        </span>

        <div className="max-w-5xl">
          <SceneEyebrow label="START" />
          <h2
            ref={headlineRef}
            className="mt-6 font-display text-[clamp(3.4rem,8vw,8rem)] uppercase leading-[0.84] tracking-tightest"
          >
            Your system is{" "}
            <span ref={applySpanRef} className="inline-block text-venom">waiting.</span>
          </h2>
          <p
            ref={subtextRef}
            className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ash"
          >
            A 45-day roadmap. A free store build. Two winning products. Dual-market strategies. And a mentor who won&apos;t leave you behind.
          </p>
          <div ref={ctaWrapRef} className="relative z-30 mt-9 flex justify-center">
            <CtaLink href="/apply" sub={CTA_SUB} className="cinematic-command">
              {CTA_LABEL}
            </CtaLink>
          </div>
        </div>

        {/* Venom hairline */}
        <div className="absolute bottom-16 left-0 right-0 px-5 sm:px-8 lg:px-12">
          <svg className="w-full" height="2" viewBox="0 0 1000 2" preserveAspectRatio="none">
            <line
              ref={hairlinePathRef}
              x1="0"
              y1="1"
              x2="1000"
              y2="1"
              stroke="url(#venomGrad)"
              strokeWidth="1"
            />
            <defs>
              <linearGradient id="venomGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B8FF2E" stopOpacity="0" />
                <stop offset="50%" stopColor="#B8FF2E" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#B8FF2E" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </ScrollFilmScene>
  );
}
