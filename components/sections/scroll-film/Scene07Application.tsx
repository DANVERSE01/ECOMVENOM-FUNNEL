"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { CtaLink } from "@/components/ui/button";
import { ScrollFilmScene } from "@/components/cinematic/ScrollFilmScene";
import { SceneEyebrow } from "@/components/cinematic/SceneEyebrow";
import { SceneHairline } from "@/components/cinematic/SceneHairline";
import { SystemOverlay } from "@/components/cinematic/SystemOverlay";
import { CTA_LABEL, CTA_SUB, faq } from "@/lib/content";
import { HIGGSFIELD_STILLS } from "@/lib/frameManifest";
import { gsap } from "@/lib/gsap";
import { splitText, setupStrokeDraw, getStrokeLength } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

const steps = [
  {
    title: "Application",
    body: "Send the details needed to understand fit before the call.",
  },
  {
    title: "Schedule",
    body: "Choose a 20-minute consultation window that works for your time zone.",
  },
  {
    title: "Confirmation",
    body: "Watch the pre-call video and arrive prepared with your questions.",
  },
];

export function Scene07Application() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const stepCardsRef = useRef<HTMLDivElement | null>(null);
  const svgPathRef = useRef<SVGPathElement | null>(null);
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
        gsap.set(stepCards, { opacity: 1, y: 0, clipPath: "inset(0 0% 0 0)" });
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

      // Step cards — clipPath wipe left→right + y stagger
      gsap.set(stepCards, { clipPath: "inset(0 100% 0 0)", y: 30, opacity: 0 });
      gsap.to(stepCards, {
        clipPath: "inset(0 0% 0 0)",
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
    },
    { scope: sectionRef, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <ScrollFilmScene id="application-flow" scene="07" title="APPLY" className="py-28">
      <span className="scene-ghost bottom-8 left-8">07</span>
      <div className="absolute inset-0">
        <Image src={HIGGSFIELD_STILLS.storePortal} alt="" fill sizes="100vw" className="object-cover opacity-[0.10]" />
        <SystemOverlay />
      </div>
      <div ref={sectionRef} className="relative z-10 mx-auto max-w-measure px-5 sm:px-8 lg:px-12">
        <SceneEyebrow label="APPLY" />
        <div className="mt-8 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2
              ref={headlineRef}
              className="font-display text-[clamp(3rem,6vw,6rem)] uppercase leading-[0.88] tracking-tightest"
            >
              Enter the operating system.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ash">
              The funnel stays simple: submit your application, confirm fit, then choose a consultation time. No fake scarcity, no hidden endpoint.
            </p>
            <div className="relative z-30 mt-8">
              <CtaLink href="/apply" sub={CTA_SUB} className="cinematic-command">
                {CTA_LABEL}
              </CtaLink>
            </div>
            <p className="mt-4 max-w-md font-heading text-[10px] uppercase leading-relaxed tracking-label text-ash/70">
              Applications are reviewed for fit before scheduling.
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
              <circle cx="8" cy="0" r="3" fill="#B8FF2E" fillOpacity="0.4" />
              <circle cx="8" cy="150" r="3" fill="#B8FF2E" fillOpacity="0.4" />
              <circle cx="8" cy="300" r="3" fill="#B8FF2E" fillOpacity="0.4" />
              <path
                ref={svgPathRef}
                d="M8 0 L8 300"
                stroke="#B8FF2E"
                strokeWidth="1"
                strokeOpacity="0.3"
                fill="none"
              />
            </svg>

            <div className="grid gap-3">
              {steps.map((step, index) => (
                <div key={step.title} className="step-card scene-panel p-5">
                  <p className="font-heading text-[10px] uppercase tracking-caps text-venom">
                    Step {String(index + 1).padStart(2, "0")}
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
          <h3 className="font-display text-4xl uppercase tracking-tightest">{faq.heading}</h3>
          <div className="mt-6 grid gap-3 lg:grid-cols-2">
            {faq.items.map((item, index) => (
              <div
                key={item.q}
                className={`scene-panel p-4 transition-colors duration-200 ${
                  openIndex === index ? "border-venom/25" : "border-white/6"
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
    </ScrollFilmScene>
  );
}
