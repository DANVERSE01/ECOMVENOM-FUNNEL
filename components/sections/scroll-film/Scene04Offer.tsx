"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { CtaLink } from "@/components/ui/button";
import { ScrollFilmScene } from "@/components/cinematic/ScrollFilmScene";
import { SceneEyebrow } from "@/components/cinematic/SceneEyebrow";
import { SystemOverlay } from "@/components/cinematic/SystemOverlay";
import { BRAND_VISUALS, HIGGSFIELD_STILLS } from "@/lib/frameManifest";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { splitText, scrambleText } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useContent } from "@/lib/useContent";

function marketCode(market: string, codes: { saudi: string; default: string }) {
  return market.toLowerCase().includes("saudi") ? codes.saudi : codes.default;
}

export function Scene04Offer() {
  const { CTA_LABEL, CTA_SUB, graduationGift, beyond, offerScene } = useContent();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const beyondHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const section = sectionRef.current;
      const headline = headlineRef.current;
      if (!section) return;

      const optionCards = gsap.utils.toArray<HTMLElement>(".option-card", section);
      const beyondCards = gsap.utils.toArray<HTMLElement>(".beyond-card", section);

      if (reduced) {
        if (headline) gsap.set(headline, { opacity: 1 });
        gsap.set([...optionCards, ...beyondCards], { opacity: 1, y: 0, scaleY: 1 });
        return;
      }

      // Headline line reveal
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

      // Option cards retain the shutter reveal with transform instead of clip-path.
      gsap.set(optionCards, { scaleY: 0.96, transformOrigin: "top center", opacity: 0 });
      gsap.to(optionCards, {
        scaleY: 1,
        opacity: 1,
        duration: 0.7,
        stagger: 0.18,
        ease: "venom",
        scrollTrigger: { trigger: section, start: "top 68%", once: true },
      });

      // Beyond heading scramble
      if (beyondHeadingRef.current) {
        const text = beyondHeadingRef.current.textContent ?? "";
        gsap.from(beyondHeadingRef.current, {
          opacity: 0,
          duration: 0.3,
          scrollTrigger: {
            trigger: beyondHeadingRef.current,
            start: "top 80%",
            once: true,
            onEnter: () => {
              scrambleText(beyondHeadingRef.current!, text, { duration: 0.55 });
            },
          },
        });
      }

      // Beyond cards ScrollTrigger.batch
      ScrollTrigger.batch(beyondCards, {
        onEnter: (elements) => {
          gsap.from(elements, {
            opacity: 0,
            y: 28,
            duration: 0.65,
            stagger: 0.1,
            ease: "venom",
          });
        },
        start: "top 85%",
        once: true,
      });
    },
    { scope: sectionRef, dependencies: [reduced], revertOnUpdate: true },
  );

  const marqueeText = offerScene.marquee;

  return (
    <ScrollFilmScene id="offer" scene="04" title={offerScene.sceneTitle} className="min-h-screen py-16 sm:py-28">
      <span className="scene-ghost bottom-8 left-8">04</span>
      <div className="absolute inset-0">
        <Image src={HIGGSFIELD_STILLS.storePortal} alt="" fill sizes="100vw" className="object-cover opacity-[0.28]" />
        <SystemOverlay />
        <div className="scene-material-wash" data-tone="value" aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] hidden grid-cols-11 gap-1 px-5 pb-5 opacity-[0.05] md:grid">
          {BRAND_VISUALS.slice(0, 10).map((src) => (
            <div key={src} className="relative aspect-video overflow-hidden border border-venom/8">
              <Image src={src} alt="" fill sizes="96px" quality={42} className="object-cover" />
            </div>
          ))}
        </div>
      </div>
      <div ref={sectionRef} className="relative z-10 mx-auto max-w-measure px-5 sm:px-8 lg:px-12">
        <div className="grid min-h-[70vh] items-center gap-10 lg:grid-cols-[1fr_0.82fr]">
          <div>
            <SceneEyebrow label={offerScene.eyebrow} />
            <h2
              ref={headlineRef}
              className="mt-6 font-display text-[clamp(3rem,7vw,7rem)] uppercase leading-[1.02] tracking-tightest"
            >
              {graduationGift.title}
            </h2>
            <p className="mt-5 font-display text-3xl uppercase text-venom">{graduationGift.sub}</p>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ash">{graduationGift.body}</p>
            <div className="mt-8">
              <CtaLink href="/apply" sub={CTA_SUB} className="cinematic-command">
                {CTA_LABEL}
              </CtaLink>
            </div>
          </div>
          <div className="grid gap-4">
            {graduationGift.options.map((option) => (
              <div key={option.label} className="option-card premium-card-hover scene-panel-feature border-gold/15 p-6">
                <p className="font-heading text-[10px] uppercase tracking-caps text-ash-2">{option.label}</p>
                <p className="mt-4 flex items-center gap-3 font-display text-3xl uppercase leading-tight text-bone sm:text-4xl">
                  <span className="market-terminal">
                    {marketCode(option.market, offerScene.marketCodes)}
                  </span>
                  {option.market}
                </p>
              </div>
            ))}
            <p className="scene-panel p-5 font-heading text-xs uppercase leading-relaxed tracking-caps text-bone-2">
              {graduationGift.outro}
            </p>
          </div>
        </div>

        {/* Marquee strip */}
        <div className="mt-16 overflow-hidden border-y border-white/4 py-3">
          <div className="marquee-track font-heading text-[11px] uppercase tracking-widest text-ash/50">
            {Array(4).fill(marqueeText).join("")}
          </div>
        </div>

        {/* BEYOND THE VIDEO */}
        <div className="mt-24">
          <SceneEyebrow label={beyond.heading} />
          <h3
            ref={beyondHeadingRef}
            className="mt-5 font-display text-[clamp(2.4rem,5vw,5rem)] uppercase leading-[1.08] tracking-tightest"
          >
            {beyond.heading}
          </h3>
          <p className="mt-4 max-w-2xl text-ash">{beyond.sub}</p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {beyond.pillars.map((pillar) => (
              <div key={pillar.title} className="beyond-card premium-card-hover scene-panel-elevated border-t border-t-gold/25 p-5">
                <h4 className="font-display text-xl uppercase text-gold">{pillar.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-ash">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Inter-scene divider */}
      <div className="scene-divider" aria-hidden />
    </ScrollFilmScene>
  );
}
