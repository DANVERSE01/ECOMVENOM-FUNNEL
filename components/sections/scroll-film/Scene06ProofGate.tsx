"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollFilmScene } from "@/components/cinematic/ScrollFilmScene";
import { SceneEyebrow } from "@/components/cinematic/SceneEyebrow";
import { ResponsiveMediaFrame } from "@/components/cinematic/ResponsiveMediaFrame";
import { SystemOverlay } from "@/components/cinematic/SystemOverlay";
import { CountUpNumber } from "@/components/ui/count-up";
import { FINAL_FUNNEL_IMAGES, GENERATED_STILLS } from "@/lib/frameManifest";
import { gsap } from "@/lib/gsap";
import { splitText } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useContent } from "@/lib/useContent";

export function Scene06ProofGate() {
  const { testimonials, proofScene } = useContent();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const reduced = useReducedMotion();
  const testimonialImages = FINAL_FUNNEL_IMAGES.slice(0, 3).map((src, index) => ({
    src,
    label: proofScene.cardLabel,
    note: proofScene.imageNotes[index] ?? proofScene.imageNotes[0],
  }));

  useGSAP(
    () => {
      const section = sectionRef.current;
      const headline = headlineRef.current;
      if (!section) return;

      if (reduced) {
        if (headline) gsap.set(headline, { opacity: 1, yPercent: 0 });
        gsap.set(".proof-card", { opacity: 1, y: 0 });
        return;
      }

      // Heading reveal with rotation
      if (headline) {
        const { elements } = splitText(headline, "lines", { mask: true });
        gsap.set(elements, { yPercent: 120, rotation: 2 });
        gsap.to(elements, {
          yPercent: 0,
          rotation: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "filmDrop",
          scrollTrigger: { trigger: headline, start: "top 72%", once: true },
        });
      }

      // Staggered proof cards with scale + opacity
      const cards = gsap.utils.toArray<HTMLElement>(".proof-card", section);
      gsap.from(cards, {
        opacity: 0,
        y: 40,
        scale: 0.95,
        duration: 0.7,
        stagger: 0.15,
        ease: "venom",
        scrollTrigger: { trigger: section, start: "top 58%", once: true },
      });

      // SIGNATURE INTERACTION (Batch 2 Phase 2g):
      // Verification ledger entry — metrics cells rise with a hairline reveal.
      // Count-up itself is handled by CountUpNumber via its own in-view hook.
      const ledgerCells = gsap.utils.toArray<HTMLElement>(".ledger-cell", section);
      if (ledgerCells.length) {
        gsap.from(ledgerCells, {
          opacity: 0,
          y: 18,
          duration: 0.6,
          stagger: 0.1,
          ease: "venom",
          scrollTrigger: { trigger: ledgerCells[0], start: "top 82%", once: true },
        });
      }

      // Honesty note fade
      const note = section.querySelector(".honesty-note");
      if (note) {
        gsap.from(note, {
          opacity: 0,
          y: 16,
          duration: 0.5,
          ease: "venom",
          scrollTrigger: { trigger: note, start: "top 88%", once: true },
        });
      }
    },
    { scope: sectionRef, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <ScrollFilmScene id="proof-gate" scene="06" title={proofScene.sceneTitle} className="py-16 sm:py-28">
      <span className="scene-ghost bottom-8 right-8">06</span>
      <div className="absolute inset-0">
        <Image src={GENERATED_STILLS.proofBg} alt="" fill sizes="100vw" className="object-cover opacity-[0.12]" />
        <SystemOverlay />
        <div className="scene-material-wash" data-tone="value" aria-hidden />
      </div>
      <div ref={sectionRef} className="relative z-10 mx-auto max-w-measure px-5 sm:px-8 lg:px-12">
        <SceneEyebrow label={proofScene.eyebrow} />

        {/* Header section */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <h2
            ref={headlineRef}
            className="font-display text-[clamp(2.8rem,6vw,5.5rem)] uppercase leading-[1.02] tracking-tightest"
          >
            {testimonials.heading}
          </h2>
          <div>
            <p className="text-lg leading-relaxed text-ash lg:text-right">
              {testimonials.subheading}
            </p>
          </div>
        </div>

        {/*
          Verification ledger — Batch 2 Phase 2g.
          Honest metrics only: counts derived from real product state (3 visible
          captures, 100% direct screenshots per honesty note, 45-day program).
          No fabricated student counts or revenue claims.
        */}
        <div
          className="mt-10 border-y border-venom/14 bg-ink-2/40 py-6"
          aria-label={proofScene.metricsHeading}
        >
          <p className="font-heading text-[10px] uppercase tracking-caps text-venom/80">
            {proofScene.metricsHeading}
          </p>
          <dl className="mt-4 grid grid-cols-3 gap-4 sm:gap-8">
            {proofScene.metrics.map((metric) => (
              <div key={metric.label} className="ledger-cell relative">
                <dt className="sr-only">{metric.label}</dt>
                <dd className="flex items-baseline gap-0.5 font-display text-[clamp(2.4rem,5vw,4rem)] leading-none tracking-tightest text-bone">
                  <CountUpNumber value={metric.value} />
                  {metric.suffix ? (
                    <span className="text-venom">{metric.suffix}</span>
                  ) : null}
                </dd>
                <p className="mt-2 text-[11px] uppercase leading-tight tracking-[0.08em] text-ash sm:text-xs">
                  {metric.label}
                </p>
                {/* Hairline divider — desktop only, between cells */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-[-1rem] top-1/2 hidden h-10 w-px -translate-y-1/2 bg-venom/15 sm:block"
                  style={{ display: "var(--ledger-divider, block)" }}
                />
              </div>
            ))}
          </dl>
        </div>

        {/* Evidence Grid — 3 cards with premium treatment */}
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {testimonialImages.map((t, i) => (
            <div
              key={i}
              className="proof-card premium-card-hover proof-evidence glow-track group relative overflow-hidden"
            >
              <ResponsiveMediaFrame className="aspect-[3/4]">
                <Image
                  src={t.src}
                  alt={`${t.label} ${i + 1}`}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-venom group-hover:scale-[1.04]"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                {/* Bottom info */}
                <div className="absolute bottom-0 inset-x-0 p-5 z-30">
                  <div className="proof-badge mb-2.5 w-fit">
                    <span className="signal-glyph signal-glyph--gold" />
                    <span className="font-heading">
                      {t.label}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-ash">
                    {t.note}
                  </p>
                </div>
              </ResponsiveMediaFrame>
            </div>
          ))}
        </div>

        {/* Honesty note — confident, not apologetic */}
        <div className="honesty-note mt-8 flex items-start gap-4 border border-steel/15 bg-steel/5 p-5">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0" aria-hidden>
            <path d="M10 2L18 18H2L10 2Z" stroke="currentColor" strokeWidth="1.2" className="text-steel" />
            <circle cx="10" cy="13" r="0.8" fill="currentColor" className="text-steel" />
            <line x1="10" y1="7" x2="10" y2="11" stroke="currentColor" strokeWidth="1.2" className="text-steel" />
          </svg>
          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-label text-steel">
              {proofScene.transparencyLabel}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-ash">
              {testimonials.honestNote}
            </p>
          </div>
        </div>
      </div>
      {/* Inter-scene divider */}
      <div className="scene-divider" aria-hidden />
    </ScrollFilmScene>
  );
}
