"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollFilmScene } from "@/components/cinematic/ScrollFilmScene";
import { SceneEyebrow } from "@/components/cinematic/SceneEyebrow";
import { SceneHairline } from "@/components/cinematic/SceneHairline";
import { SystemOverlay } from "@/components/cinematic/SystemOverlay";
import { HIGGSFIELD_STILLS } from "@/lib/frameManifest";
import { gsap } from "@/lib/gsap";
import { useLang } from "@/lib/lang-context";
import { splitText } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useContent } from "@/lib/useContent";

export function Scene01Problem() {
  const { lang } = useLang();
  const { problem } = useContent();
  const isArabic = lang === "ar";
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const statusRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const bodyRef = useRef<HTMLParagraphElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const section = sectionRef.current;
      const status = statusRef.current;
      const headline = headlineRef.current;
      const body = bodyRef.current;
      if (!section) return;

      const items = gsap.utils.toArray<HTMLElement>(".chaos-signal", section);

      if (reduced) {
        gsap.set(items, { opacity: 1, x: 0, scaleX: 1 });
        if (status) gsap.set(status, { opacity: 1, x: 0, y: 0 });
        if (headline) gsap.set(headline, { opacity: 1, yPercent: 0 });
        return;
      }

      if (status) {
        gsap.from(status, {
          opacity: 0,
          x: isArabic ? 16 : -16,
          y: 10,
          duration: 0.55,
          ease: "venom",
          scrollTrigger: { trigger: status, start: "top 80%", once: true },
        });
      }

      // Headline SplitText mask
      if (headline) {
        const { elements } = splitText(headline, "lines", { mask: true });
        gsap.set(elements, { yPercent: 110 });
        gsap.to(elements, {
          yPercent: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "filmDrop",
          scrollTrigger: { trigger: headline, start: "top 72%", once: true },
        });
      }

      // Body text word split
      if (body) {
        const { elements: words } = splitText(body, "words");
        gsap.from(words, {
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "venom",
          scrollTrigger: { trigger: body, start: "top 80%", once: true },
        });
      }

      // Signal cards keep the wipe feel with transform instead of clip-path.
      gsap.set(items, { scaleX: 0.96, transformOrigin: isArabic ? "right center" : "left center", opacity: 0, y: 18 });
      gsap.to(items, {
        scaleX: 1,
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.15,
        ease: "venom",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          once: true,
        },
        onComplete: () => {
          // Pulse the signal glyphs after reveal
          const glyphs = gsap.utils.toArray<HTMLElement>(".signal-glyph--alert", section);
          if (glyphs.length) {
            gsap.to(glyphs, { opacity: 0.6, duration: 1.2, ease: "power1.inOut", yoyo: true, repeat: -1, stagger: 0.4 });
          }
        },
      });
    },
    { scope: sectionRef, dependencies: [isArabic, reduced], revertOnUpdate: true },
  );

  return (
    <ScrollFilmScene id="chaos-input" scene="01" title={problem.sceneTitle} className="min-h-screen py-16 sm:py-28">
      <span className="scene-ghost bottom-8 right-8">01</span>
      <div className="absolute inset-0">
        <Image src={HIGGSFIELD_STILLS.cartChaos} alt="" fill sizes="100vw" className="object-cover opacity-[0.35]" />
        <SystemOverlay />
        <div className="scene-material-wash" data-tone="alert" aria-hidden />
      </div>
      <div ref={sectionRef} className="relative z-10 mx-auto grid min-h-[70vh] max-w-[1200px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12">
        <div>
          <SceneEyebrow label={problem.eyebrow} />
          <div ref={statusRef} className="chaos-status mt-5">
            <span className="chaos-status__pulse" aria-hidden />
            <span>{isArabic ? "حالة المشهد" : "SCENE STATUS"}</span>
            <span className="chaos-status__divider" aria-hidden />
            <span>{isArabic ? "فوضى مرصودة" : "CHAOS DETECTED"}</span>
          </div>
          <h2
            ref={headlineRef}
            className="mt-6 font-display text-[clamp(3rem,7vw,7rem)] uppercase leading-[1.02] tracking-tightest"
          >
            {problem.headline}
          </h2>
        </div>
        <div className="space-y-4">
          {problem.signals.map((signal, index) => (
            <div
              key={signal.label}
              className="chaos-signal scene-panel-elevated border-l-2 border-l-crimson/40 p-5"
            >
              <div className="chaos-signal__header font-heading text-[10px] uppercase tracking-caps text-ash">
                <span className="chaos-signal__label flex items-center gap-2">
                  <span className="signal-glyph signal-glyph--alert" aria-hidden />
                  {problem.signalLabel} {String(index + 1).padStart(2, "0")}
                </span>
                <span className="chaos-signal__state">{problem.signalState}</span>
              </div>
              <p className="chaos-signal__title mt-3 font-display text-2xl uppercase text-bone">{signal.label}</p>
              {/* Bumped from text-ash-2 (3.7:1) to text-ash (5.6:1) — WCAG AA body text */}
              <p className="mt-2 text-sm leading-relaxed text-ash">{signal.detail}</p>
            </div>
          ))}
          <SceneHairline />
          <p ref={bodyRef} className="max-w-xl text-base leading-relaxed text-ash">
            {problem.body}
          </p>
        </div>
      </div>
      {/* Inter-scene divider */}
      <div className="scene-divider" aria-hidden />
    </ScrollFilmScene>
  );
}
