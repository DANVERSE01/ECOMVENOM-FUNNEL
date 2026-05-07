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
import { splitText } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

const signals = [
  { label: "Random tutorials", detail: "Hours of YouTube videos, contradicting advice, no clear path forward" },
  { label: "Random products", detail: "Testing blindly, burning budget on items nobody wants to buy" },
  { label: "Random ad spend", detail: "Money leaving your account with zero idea what's working or why" },
];

export function Scene01Problem() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const bodyRef = useRef<HTMLParagraphElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const section = sectionRef.current;
      const headline = headlineRef.current;
      const body = bodyRef.current;
      if (!section) return;

      const items = gsap.utils.toArray<HTMLElement>(".chaos-signal", section);

      if (reduced) {
        gsap.set(items, { opacity: 1, x: 0, scaleX: 1 });
        if (headline) gsap.set(headline, { opacity: 1, yPercent: 0 });
        return;
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
      gsap.set(items, { scaleX: 0.96, transformOrigin: "left center", opacity: 0 });
      gsap.to(items, {
        scaleX: 1,
        opacity: 1,
        duration: 0.65,
        stagger: 0.15,
        ease: "venom",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          once: true,
        },
      });
    },
    { scope: sectionRef, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <ScrollFilmScene id="chaos-input" scene="01" title="THE PROBLEM" className="min-h-screen py-28">
      <span className="scene-ghost bottom-8 right-8">01</span>
      <div className="absolute inset-0">
        <Image src={HIGGSFIELD_STILLS.cartChaos} alt="" fill sizes="100vw" className="object-cover opacity-[0.35]" />
        <SystemOverlay />
        <div className="scene-material-wash" data-tone="alert" aria-hidden />
      </div>
      <div ref={sectionRef} className="relative z-10 mx-auto grid min-h-[70vh] max-w-[1200px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-12">
        <div>
          <SceneEyebrow label="THE PROBLEM" />
          <h2
            ref={headlineRef}
            className="mt-6 font-display text-[clamp(3rem,7vw,7rem)] uppercase leading-[0.86] tracking-tightest"
          >
            Random inputs create expensive chaos.
          </h2>
        </div>
        <div className="space-y-4">
          {signals.map((signal, index) => (
            <div
              key={signal.label}
              className="chaos-signal scene-panel-elevated border-l-2 border-l-alert/40 p-5"
            >
              <div className="flex items-center justify-between gap-4 font-heading text-[10px] uppercase tracking-caps text-ash">
                <span className="flex items-center gap-2">
                  <span className="signal-glyph signal-glyph--alert" aria-hidden />
                  Signal {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-alert/80">Uncontrolled</span>
              </div>
              <p className="mt-3 font-display text-2xl uppercase text-bone">{signal.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-ash-2">{signal.detail}</p>
            </div>
          ))}
          <SceneHairline />
          <p ref={bodyRef} className="max-w-xl text-base leading-relaxed text-ash">
            Most people who try dropshipping operate on guesswork. The system you&apos;re about to see replaces that chaos with a structured operating path.
          </p>
        </div>
      </div>
      {/* Inter-scene divider */}
      <div className="scene-divider" aria-hidden />
    </ScrollFilmScene>
  );
}
