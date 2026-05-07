"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollFilmScene } from "@/components/cinematic/ScrollFilmScene";
import { SceneEyebrow } from "@/components/cinematic/SceneEyebrow";
import { ResponsiveMediaFrame } from "@/components/cinematic/ResponsiveMediaFrame";
import { SystemOverlay } from "@/components/cinematic/SystemOverlay";
import { CinematicPanel } from "@/components/ui/CinematicPanel";
import { HoverGrid } from "@/components/ui/HoverGrid";
import { FINAL_FUNNEL_IMAGES, GENERATED_STILLS } from "@/lib/frameManifest";
import { testimonials } from "@/lib/content";
import { gsap, SplitText } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

const testimonialImages = [
  { src: FINAL_FUNNEL_IMAGES[0], label: "VERIFIED STUDENT" },
  { src: FINAL_FUNNEL_IMAGES[1], label: "VERIFIED STUDENT" },
  { src: FINAL_FUNNEL_IMAGES[2], label: "VERIFIED STUDENT" },
];

export function Scene06ProofGate() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const reduced = useReducedMotion();

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

      // Heading SplitText reveal
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

      gsap.from(".proof-card", {
        opacity: 0,
        y: 28,
        duration: 0.65,
        stagger: 0.1,
        ease: "venom",
        scrollTrigger: { trigger: section, start: "top 62%", once: true },
      });
    },
    { scope: sectionRef, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <ScrollFilmScene id="proof-gate" scene="06" title="RESULTS" className="py-28">
      <span className="scene-ghost bottom-8 right-8">06</span>
      <div className="absolute inset-0">
        <Image src={GENERATED_STILLS.proofBg} alt="" fill sizes="100vw" className="object-cover opacity-[0.16]" />
        <SystemOverlay />
      </div>
      <div ref={sectionRef} className="relative z-10 mx-auto max-w-[1120px] px-5 sm:px-8 lg:px-12">
        <SceneEyebrow label="RESULTS" />

        <CinematicPanel className="mt-8 grid gap-6 p-6 sm:p-8 lg:grid-cols-[0.85fr_1.15fr]">
          <h2
            ref={headlineRef}
            className="font-display text-[clamp(2.8rem,6vw,6rem)] uppercase leading-[0.88] tracking-tightest"
          >
            {testimonials.heading}
          </h2>
          <div className="self-end">
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ash">
              Student screenshots are shown only as captured assets. Claims stay restrained, and identities are not inflated into invented stories.
            </p>
          </div>
        </CinematicPanel>

        {/* 3 Testimonial Cards */}
        <HoverGrid className="mt-8 grid-cols-1 sm:grid-cols-3">
          {testimonialImages.map((t, i) => (
            <ResponsiveMediaFrame
              key={i}
              className="proof-card hover-grid-item group aspect-[3/4]"
            >
              <Image
                src={t.src}
                alt={`${t.label} ${i + 1}`}
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 p-3 z-20">
                <p className="font-mono text-[9px] uppercase tracking-widest text-venom">
                  {t.label}
                </p>
              </div>
            </ResponsiveMediaFrame>
          ))}
        </HoverGrid>
        <p className="mt-4 border-l border-steel/30 pl-4 text-xs leading-relaxed text-ash/70">
          {testimonials.honestNote}
        </p>
      </div>
    </ScrollFilmScene>
  );
}
