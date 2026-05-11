"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { CtaLink } from "@/components/ui/button";
import { ScrollFilmScene } from "@/components/cinematic/ScrollFilmScene";
import { SceneEyebrow } from "@/components/cinematic/SceneEyebrow";
import { SceneHairline } from "@/components/cinematic/SceneHairline";
import { SystemOverlay } from "@/components/cinematic/SystemOverlay";
import { HIGGSFIELD_STILLS } from "@/lib/frameManifest";
import { gsap } from "@/lib/gsap";
import { splitText, getStrokeLength } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useContent } from "@/lib/useContent";

export function Scene07Application() {
  const { CTA_LABEL, CTA_SUB, faq, applicationScene } = useContent();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const stepCardsRef = useRef<HTMLDivElement | null>(null);
  const svgPathRef = useRef<SVGPathElement | null>(null);
  const gateRef = useRef<HTMLDivElement | null>(null);
  const gateBracketsRef = useRef<HTMLSpanElement | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduced = useReducedMotion();

  const toggle = (index: number) => {
    const prevIndex = openIndex;

    if (prevIndex !== null && prevIndex !== index) {
      const prevEl = contentRefs.current[prevIndex];
      if (prevEl) gsap.to(prevEl, { height: 0, duration: reduced ? 0 : 0.3, ease: "venom" });
    }

    if (openIndex === index) {
      const el = contentRefs.current[index];
      if (el) gsap.to(el, { height: 0, duration: reduced ? 0 : 0.3, ease: "venom" });
      setOpenIndex(null);
    } else {
      const el = contentRefs.current[index];
      if (el) gsap.to(el, { height: el.scrollHeight, duration: reduced ? 0 : 0.45, ease: "venom" });
      setOpenIndex(index);
    }
  };

  useGSAP(
    () => {
      const section = sectionRef.current;
      const headline = headlineRef.current;
      if (!section) return;

      const stepCards = gsap.utils.toArray<HTMLElement>(".step-card", section);

      if (reduced) {
        if (headline) gsap.set(headline, { opacity: 1 });
        gsap.set(stepCards, { opacity: 1, y: 0, scaleX: 1 });
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

      // Step cards wipe with transform/opacity to keep mobile scroll light.
      gsap.set(stepCards, { scaleX: 0.96, transformOrigin: "left center", y: 24, opacity: 0 });
      gsap.to(stepCards, {
        scaleX: 1,
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.12,
        ease: "venom",
        scrollTrigger: { trigger: stepCardsRef.current, start: "top 75%", once: true },
      });

      // SVG connector — stroke-dashoffset (replaces DrawSVG)
      if (svgPathRef.current) {
        const path = svgPathRef.current;
        const length = getStrokeLength(path);
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "venom",
          scrollTrigger: { trigger: stepCardsRef.current, start: "top 70%", once: true },
        });
      }

      // SIGNATURE INTERACTION (Batch 2 Phase 2h):
      // Gate-open metaphor — 4 corner brackets sequentially draw around the apply
      // CTA cluster as the section enters view. Marks the action as a sealed gate
      // that opens for the user, reinforcing the "application before scheduling" framing.
      const gateBrackets = gateBracketsRef.current;
      const gate = gateRef.current;
      if (gateBrackets && gate) {
        const brackets = Array.from(
          gateBrackets.querySelectorAll<SVGPathElement>("[data-gate-bracket]"),
        );
        brackets.forEach((bracket) => {
          const length = getStrokeLength(bracket);
          bracket.style.strokeDasharray = `${length}`;
          bracket.style.strokeDashoffset = `${length}`;
        });
        gsap.to(brackets, {
          strokeDashoffset: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "venom",
          scrollTrigger: { trigger: gate, start: "top 78%", once: true },
        });
        // Subtle gate glow rises with the brackets
        gsap.fromTo(
          gate,
          { "--gate-glow": 0 } as gsap.TweenVars,
          {
            "--gate-glow": 1,
            duration: 1.0,
            ease: "venom",
            scrollTrigger: { trigger: gate, start: "top 78%", once: true },
          } as gsap.TweenVars,
        );
      }
    },
    { scope: sectionRef, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <ScrollFilmScene id="application-flow" scene="07" title={applicationScene.sceneTitle} className="py-16 sm:py-28">
      <span className="scene-ghost bottom-8 left-8">07</span>
      <div className="absolute inset-0">
        <Image src={HIGGSFIELD_STILLS.storePortal} alt="" fill sizes="100vw" loading="eager" className="object-cover opacity-[0.10]" />
        <SystemOverlay />
      </div>
      <div ref={sectionRef} className="relative z-10 mx-auto max-w-measure px-5 sm:px-8 lg:px-12">
        <SceneEyebrow label={applicationScene.eyebrow} />
        <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2
              ref={headlineRef}
              className="font-display text-[clamp(3rem,6vw,6rem)] uppercase leading-[1.02] tracking-tightest"
            >
              {applicationScene.headline}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ash">
              {applicationScene.body}
            </p>
            {/* Apply CTA inside the gate frame — Batch 2 Phase 2h */}
            <div
              ref={gateRef}
              className="apply-gate relative z-30 mt-8 max-w-md px-4 py-5 sm:px-6 sm:py-6"
              style={{
                ["--gate-glow" as string]: "0",
                background: "radial-gradient(120% 80% at 50% 0%, rgba(184,255,46,calc(0.06 * var(--gate-glow))) 0%, transparent 65%)",
              } as React.CSSProperties}
            >
              {/* 4 corner brackets — drawn sequentially on scroll entry.
                  Four small SVGs (not one with percentage transforms) for
                  cross-browser reliability incl. iOS Safari. */}
              <span ref={gateBracketsRef} className="pointer-events-none absolute inset-0" aria-hidden>
                {/* Top-left */}
                <svg className="absolute left-0 top-0" width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path data-gate-bracket d="M0 22 L0 0 L22 0" stroke="var(--c-venom)" strokeWidth="1.4" strokeOpacity="0.75" />
                </svg>
                {/* Top-right */}
                <svg className="absolute right-0 top-0" width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path data-gate-bracket d="M0 0 L22 0 L22 22" stroke="var(--c-venom)" strokeWidth="1.4" strokeOpacity="0.75" />
                </svg>
                {/* Bottom-left */}
                <svg className="absolute bottom-0 left-0" width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path data-gate-bracket d="M0 0 L0 22 L22 22" stroke="var(--c-venom)" strokeWidth="1.4" strokeOpacity="0.75" />
                </svg>
                {/* Bottom-right */}
                <svg className="absolute bottom-0 right-0" width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path data-gate-bracket d="M22 0 L22 22 L0 22" stroke="var(--c-venom)" strokeWidth="1.4" strokeOpacity="0.75" />
                </svg>
              </span>
              <CtaLink href="/apply" sub={CTA_SUB} className="cinematic-command">
                {CTA_LABEL}
              </CtaLink>
            </div>
            <p className="mt-4 max-w-md font-heading text-[10px] uppercase leading-relaxed tracking-label text-ash/70">
              {applicationScene.support}
            </p>
          </div>

          {/* Step cards with connector */}
          <div ref={stepCardsRef} className="relative">
            {/* Vertical connector — desktop only */}
            <svg
              className="pointer-events-none absolute -left-5 top-0 hidden h-full w-4 lg:block"
              viewBox="0 0 16 300"
              preserveAspectRatio="none"
            >
              <circle cx="8" cy="0" r="3" fill="var(--c-venom)" fillOpacity="0.4" />
              <circle cx="8" cy="150" r="3" fill="var(--c-venom)" fillOpacity="0.4" />
              <circle cx="8" cy="300" r="3" fill="var(--c-venom)" fillOpacity="0.4" />
              <path
                ref={svgPathRef}
                d="M8 0 L8 300"
                stroke="var(--c-venom)"
                strokeWidth="1"
                strokeOpacity="0.3"
                fill="none"
              />
            </svg>

            <div className="grid gap-3">
              {applicationScene.steps.map((step, index) => (
                <div key={step.title} className="step-card scene-panel-elevated p-5">
                  <p className="font-heading text-[10px] uppercase tracking-caps text-venom">
                    {applicationScene.stepLabel} {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-display text-2xl uppercase text-bone">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ash">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <SceneHairline className="my-16" />

        {/* FAQ */}
        <div>
          <h3 className="font-display text-4xl uppercase tracking-tightest">{applicationScene.faqHeading}</h3>
          <div className="mt-6 grid gap-3 lg:grid-cols-2">
            {faq.items.map((item, index) => (
              <div
                key={item.q}
                className={`scene-panel-elevated p-4 transition-colors duration-200 ${
                  openIndex === index ? "border-venom/25" : ""
                }`}
              >
                <button
                  type="button"
                  aria-expanded={openIndex === index}
                  aria-controls={`scene-faq-answer-${index}`}
                  onClick={() => toggle(index)}
                  className="tap-target flex w-full items-center justify-between gap-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-venom"
                >
                  <span className="font-display text-base uppercase leading-tight text-bone sm:text-lg">{item.q}</span>
                  <span
                    aria-hidden
                    className="grid h-7 w-7 shrink-0 place-items-center text-venom transition-transform duration-300"
                    style={{ transform: openIndex === index ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M7 2.5V11.5M2.5 7H11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div
                  id={`scene-faq-answer-${index}`}
                  aria-hidden={openIndex !== index}
                  ref={(el) => { contentRefs.current[index] = el; }}
                  style={{ height: 0, overflow: "hidden" }}
                >
                  <p className="mt-3 text-sm leading-relaxed text-ash">{item.a}</p>
                </div>
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
