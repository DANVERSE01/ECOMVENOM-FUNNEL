"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { CinematicFramePlayer } from "@/components/cinematic/CinematicFramePlayer";
import { MaterialField } from "@/components/cinematic/MaterialField";
import { SceneProgress } from "@/components/cinematic/SceneProgress";
import { SceneEyebrow } from "@/components/cinematic/SceneEyebrow";
import { HIGGSFIELD_FRAME_COUNT, HIGGSFIELD_FRAMES, HIGGSFIELD_STILLS } from "@/lib/frameManifest";
import { chaosToSystem } from "@/lib/content";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { splitText } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

const checkpoints = [
  {
    t: "00-20%",
    label: "System wakes",
    body: "The operator view opens. Inputs are still loose, but the frame establishes control.",
  },
  {
    t: "20-45%",
    label: "Chaos enters",
    body: "Carts, products, panels, and random signals move through the dark field.",
  },
  {
    t: "45-70%",
    label: "Frames align",
    body: "The conversion engine stops drifting and starts arranging decisions into a repeatable path.",
  },
  {
    t: "70-100%",
    label: "Operating mode",
    body: "Store, roadmap, booking, and ECOMVENOM lockup resolve into one command state.",
  },
];

export function Scene02ChaosToSystem() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const visualRef = useRef<HTMLDivElement | null>(null);
  const depthRef = useRef<HTMLDivElement | null>(null);
  const hudFrameRef = useRef<HTMLSpanElement | null>(null);
  const hudScrollRef = useRef<HTMLSpanElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pin = pinRef.current;
      const headline = headlineRef.current;
      const visual = visualRef.current;
      const depth = depthRef.current;
      if (!section) return;

      const panels = gsap.utils.toArray<HTMLElement>(".checkpoint-panel", section);

      if (pin) {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          pin,
          pinSpacing: false,
          anticipatePin: 1,
        });
      }

      if (reduced) {
        gsap.set(panels, { opacity: 1, clipPath: "inset(0 0% 0 0)" });
        gsap.set([visual, depth], { opacity: 1, scale: 1, y: 0 });
        if (headline) gsap.set(headline, { opacity: 1 });
        return;
      }

      // Headline line reveal using free splitText
      if (headline) {
        const { elements, revert } = splitText(headline, "lines", { mask: true });
        gsap.set(elements, { yPercent: 110 });
        gsap.to(elements, {
          yPercent: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: "filmDrop",
          scrollTrigger: { trigger: headline, start: "top 72%", once: true },
        });
      }

      // Checkpoint panels — clipPath wipe
      gsap.set(panels, { clipPath: "inset(0 100% 0 0)", opacity: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          onUpdate: (self) => {
            if (hudScrollRef.current) {
              hudScrollRef.current.textContent = String(Math.round(self.progress * 100));
            }
          },
        },
      });

      if (visual) {
        gsap.fromTo(
          visual,
          { scale: 1.02, filter: "brightness(0.78) contrast(1.08)" },
          {
            scale: 1.2,
            filter: "brightness(1.02) contrast(1.18)",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.2,
            },
          },
        );
      }

      if (depth) {
        gsap.fromTo(
          depth,
          { opacity: 0.2, scale: 0.92, rotate: 0 },
          {
            opacity: 0.72,
            scale: 1.18,
            rotate: 2,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.1,
            },
          },
        );
      }

      panels.forEach((panel, index) => {
        const isLast = index === panels.length - 1;
        timeline
          .to(panel, {
            clipPath: "inset(0 0% 0 0)",
            opacity: 1,
            duration: 0.12,
            ease: "venom",
            onUpdate() {
              if (hudFrameRef.current) {
                hudFrameRef.current.textContent = String(index + 1).padStart(3, "0");
              }
            },
          }, index * 0.22)
          .to(panel, {
            opacity: isLast ? 1 : 0.3,
            borderColor: isLast ? "rgba(184,255,46,0.5)" : undefined,
            duration: 0.08,
          }, index * 0.22 + 0.14);
      });
    },
    { scope: sectionRef, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section
      id="chaos-system-scroll-film"
      ref={sectionRef}
      data-scene-title="THE SYSTEM"
      data-scene-n="02"
      data-frame-scrub-scene
      className="relative h-[330vh] bg-black text-bone"
    >
      <MaterialField scene="02" />
      <div ref={pinRef} className="relative h-screen overflow-hidden">
        <div ref={visualRef} className="absolute inset-0 origin-center will-change-transform">
          <CinematicFramePlayer
            frames={HIGGSFIELD_FRAMES}
            poster={HIGGSFIELD_STILLS.dashboardSystem}
            triggerSelector="#chaos-system-scroll-film"
          />
        </div>
        <div ref={depthRef} className="scene02-depth-field pointer-events-none absolute inset-0 z-[5]" aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] h-40 bg-gradient-to-b from-transparent via-black/30 to-black" />
        <div className="relative z-10 flex h-full flex-col justify-between px-5 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto w-full max-w-wide pt-8">
            <SceneEyebrow label="THE SYSTEM" />
            <h2
              ref={headlineRef}
              className="mt-5 max-w-4xl font-display text-[clamp(2.9rem,6vw,6.6rem)] uppercase leading-[0.88] tracking-tightest"
            >
              {chaosToSystem.headline}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ash">
              {chaosToSystem.body.slice(0, 140)}…
            </p>
          </div>

          <div className="pointer-events-none absolute inset-0 z-[8] bg-[radial-gradient(circle_at_center,transparent_28%,rgba(0,0,0,0.54)_78%)]" />

          {/* HUD readout */}
          <div className="absolute top-4 right-4 z-20 text-right font-heading text-[9px] uppercase leading-relaxed tracking-caps text-venom/50">
            <span ref={hudFrameRef}>001</span>/{String(HIGGSFIELD_FRAME_COUNT).padStart(3, "0")} · <span ref={hudScrollRef}>0</span>%
          </div>

          <div className="mx-auto grid w-full max-w-wide gap-4 pb-6 lg:grid-cols-4">
            {checkpoints.map((checkpoint, i) => (
              <div
                key={checkpoint.t}
                className="checkpoint-panel scene-panel-elevated border-t border-white/8 p-4 transition-colors duration-300"
              >
                <p className="font-heading text-[10px] uppercase tracking-caps text-venom/70">
                  {checkpoint.t}
                </p>
                <h3 className="mt-3 font-display text-xl uppercase text-bone">{checkpoint.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ash">{checkpoint.body}</p>
              </div>
            ))}
          </div>

          <span className="scene-ghost bottom-0 left-4 opacity-[0.015]">02</span>
          <SceneProgress triggerSelector="#chaos-system-scroll-film" />
        </div>
      </div>
    </section>
  );
}
