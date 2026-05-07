"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { CtaLink } from "@/components/ui/button";
import { ScrollFilmScene } from "@/components/cinematic/ScrollFilmScene";
import { SceneEyebrow } from "@/components/cinematic/SceneEyebrow";
import { SystemOverlay } from "@/components/cinematic/SystemOverlay";
import { BRAND_VISUALS, HIGGSFIELD_STILLS } from "@/lib/frameManifest";
import { CTA_LABEL, CTA_SUB, graduationGift, beyond } from "@/lib/content";
import { gsap, SplitText, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

function marketCode(market: string) {
  return market.toLowerCase().includes("saudi") ? "KSA" : "USA";
}

export function Scene04Offer() {
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
        if (headline) gsap.set(headline, { opacity: 1, yPercent: 0 });
        gsap.set([...optionCards, ...beyondCards], { opacity: 1, y: 0 });
        return;
      }

      // Headline SplitText mask
      if (headline) {
        const headlineSplit = SplitText.create(headline, {
          type: "lines",
          linesClass: "split-line",
          mask: "lines",
        });
        gsap.set(headlineSplit.lines, { yPercent: 110 });
        gsap.to(headlineSplit.lines, {
          yPercent: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "filmDrop",
          scrollTrigger: { trigger: headline, start: "top 72%", once: true },
        });
      }

      // Option cards stagger entrance
      gsap.from(optionCards, {
        y: 40,
        opacity: 0,
        duration: 0.65,
        stagger: 0.15,
        ease: "venom",
        scrollTrigger: { trigger: section, start: "top 70%", once: true },
      });

      // Beyond heading ScrambleText
      if (beyondHeadingRef.current) {
        const text = beyondHeadingRef.current.textContent ?? "";
        gsap.to(beyondHeadingRef.current, {
          duration: 0.55,
          scrambleText: {
            text,
            chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            revealDelay: 0.2,
          },
          scrollTrigger: { trigger: beyondHeadingRef.current, start: "top 80%", once: true },
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

  const marqueeText = "FREE STORE BUILD · 2 WINNING PRODUCTS · US MARKET · SAUDI MARKET · ";

  return (
    <ScrollFilmScene id="offer" scene="04" title="THE OFFER" className="min-h-screen py-28">
      <span className="scene-ghost bottom-8 left-8">04</span>
      <div className="absolute inset-0">
        <Image src={HIGGSFIELD_STILLS.storePortal} alt="" fill sizes="100vw" className="object-cover opacity-[0.32]" />
        <SystemOverlay />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] hidden grid-cols-11 gap-1 px-5 pb-5 opacity-[0.07] md:grid">
          {BRAND_VISUALS.map((src) => (
            <div key={src} className="relative aspect-video overflow-hidden border border-venom/10">
              <Image src={src} alt="" fill sizes="8vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
      <div ref={sectionRef} className="relative z-10 mx-auto max-w-[1220px] px-5 sm:px-8 lg:px-12">
        <div className="grid min-h-[70vh] items-center gap-10 lg:grid-cols-[1fr_0.82fr]">
          <div>
            <SceneEyebrow label="THE OFFER" />
            <h2
              ref={headlineRef}
              className="mt-6 font-display text-[clamp(3rem,7vw,7rem)] uppercase leading-[0.86] tracking-tightest"
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
              <div key={option.label} className="option-card scene-panel border-gold/25 p-6 transition-transform duration-200 hover:-translate-y-1 hover:border-gold/55">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash">{option.label}</p>
                <p className="mt-4 flex items-center gap-3 font-display text-3xl uppercase leading-tight text-bone sm:text-4xl">
                  <span className="grid h-10 min-w-14 place-items-center border border-gold/40 bg-gold/10 px-2 font-mono text-[10px] tracking-[0.18em] text-gold">
                    {marketCode(option.market)}
                  </span>
                  {option.market}
                </p>
              </div>
            ))}
            <p className="scene-panel p-5 font-mono text-xs uppercase leading-relaxed tracking-[0.2em] text-bone/80">
              {graduationGift.outro}
            </p>
          </div>
        </div>

        {/* Marquee strip */}
        <div className="mt-16 overflow-hidden border-y border-white/5 py-3">
          <div className="marquee-track font-mono text-[11px] uppercase tracking-widest text-ash/70">
            {Array(4).fill(marqueeText).join("")}
          </div>
        </div>

        {/* BEYOND THE VIDEO */}
        <div className="mt-24">
          <SceneEyebrow label={beyond.heading} />
          <h3
            ref={beyondHeadingRef}
            className="mt-5 font-display text-[clamp(2.4rem,5vw,5rem)] uppercase leading-[0.9] tracking-tightest"
          >
            {beyond.heading}
          </h3>
          <p className="mt-4 max-w-2xl text-ash">{beyond.sub}</p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {beyond.pillars.map((pillar) => (
              <div key={pillar.title} className="beyond-card scene-panel border-t-gold/45 p-5 transition-transform duration-200 hover:-translate-y-1 hover:border-gold/35">
                <h4 className="font-display text-xl uppercase text-venom">{pillar.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-ash">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollFilmScene>
  );
}
