"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollFilmScene } from "@/components/cinematic/ScrollFilmScene";
import { SceneEyebrow } from "@/components/cinematic/SceneEyebrow";
import { SystemOverlay } from "@/components/cinematic/SystemOverlay";
import { CinematicPanel } from "@/components/ui/CinematicPanel";
import { CountUpNumber } from "@/components/ui/count-up";
import { HoverGrid, HoverGridItem } from "@/components/ui/HoverGrid";
import { GENERATED_STILLS } from "@/lib/frameManifest";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useLang } from "@/lib/lang-context";
import { scrambleText, getStrokeLength } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useContent } from "@/lib/useContent";

export function Scene03Roadmap() {
  const { lang } = useLang();
  const { curriculum, learn, sceneLabels } = useContent();
  const moduleLabel = lang === "ar" ? "الوحدة" : "Module";
  const skillLabel = lang === "ar" ? "المهارة" : "Skill";
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const learnHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const svgPathRef = useRef<SVGPathElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const cards = gsap.utils.toArray<HTMLElement>(".system-module", section);
      const learnHeading = learnHeadingRef.current;
      const rail = railRef.current;

      if (reduced) {
        gsap.set(cards, { opacity: 1, scaleY: 1 });
        // Reduced motion: show the spine fully activated immediately
        if (rail) rail.style.setProperty("--cp-progress", "1");
        gsap.set(cards, { "--cp-a": 1 } as gsap.TweenVars);
        return;
      }

      // Module cards: per-card --cp-a CSS variable drives node + border activation
      gsap.set(cards, {
        scaleY: 0.97,
        transformOrigin: "top center",
        opacity: 0,
        "--cp-a": 0,
      } as gsap.TweenVars);

      const triggers = ScrollTrigger.batch(cards, {
        onEnter: (elements) => {
          gsap.to(elements, {
            scaleY: 1,
            opacity: 1,
            "--cp-a": 1,
            ease: "venom",
            duration: 0.7,
            stagger: 0.055,
          } as gsap.TweenVars);
        },
        start: "top 86%",
        once: true,
      });

      // SIGNATURE INTERACTION (CTO recovery Batch 2 — Phase 2d):
      // Replace once-triggered draw with scroll-scrubbed progress fill.
      // Spine fills as user scrolls through the roadmap; SCSS bound --cp-progress
      // drives the dasharray reveal and the rail's node-fill gradient.
      const path = svgPathRef.current;
      if (path && rail) {
        const length = getStrokeLength(path);
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: rail,
            start: "top 78%",
            end: "bottom 32%",
            scrub: 0.6,
            onUpdate: (self) => {
              // Mirror progress into a CSS variable for node tinting / glow
              rail.style.setProperty("--cp-progress", String(self.progress));
            },
          },
        });
      }

      // Learn heading scramble (replaces ScrambleTextPlugin)
      if (learnHeading) {
        const text = learnHeading.textContent ?? "";
        gsap.from(learnHeading, {
          opacity: 0,
          duration: 0.3,
          scrollTrigger: {
            trigger: learnHeading,
            start: "top 80%",
            once: true,
            onEnter: () => {
              scrambleText(learnHeading, text, { duration: 0.55 });
            },
          },
        });
      }

      return () => {
        triggers.forEach((trigger) => trigger.kill());
      };
    },
    { scope: sectionRef, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <ScrollFilmScene id="roadmap" scene="03" title={sceneLabels.roadmap} className="py-16 sm:py-28">
      <span className="scene-ghost top-8 right-8">03</span>
      <div className="absolute inset-0">
        <Image src={GENERATED_STILLS.roadmapBg} alt="" fill sizes="100vw" className="object-cover opacity-[0.18]" />
        <SystemOverlay />
      </div>
      <div ref={sectionRef} className="relative z-10 mx-auto max-w-wide px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SceneEyebrow label={sceneLabels.roadmap} />
            <h2 className="mt-5 font-display text-[clamp(3rem,7vw,7rem)] uppercase leading-[1.02] tracking-tightest">
              {curriculum.heading}
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ash">{curriculum.sub}</p>
          </div>

          {/* Module cards with scroll-scrubbed OS spine — Batch 2 Phase 2d */}
          <div ref={railRef} className="relative" data-cp-rail style={{ ["--cp-progress" as string]: "0" } as React.CSSProperties}>
            {/* Vertical OS spine — desktop only */}
            <svg
              className="pointer-events-none absolute -left-4 top-0 hidden h-full w-4 lg:block"
              viewBox="0 0 16 400"
              preserveAspectRatio="none"
              aria-hidden
            >
              {/* Background rail */}
              <path
                d="M8 0 L8 400"
                stroke="rgba(184,255,46,0.14)"
                strokeWidth="1.5"
                fill="none"
              />
              {/* Foreground venom fill — animated via stroke-dashoffset */}
              <path
                ref={svgPathRef}
                d="M8 0 L8 400"
                stroke="var(--c-venom)"
                strokeWidth="1.5"
                strokeOpacity="0.92"
                fill="none"
              />
            </svg>

            <HoverGrid className="sm:grid-cols-2">
              {curriculum.modules.map((module) => (
                <HoverGridItem
                  key={module.n}
                  data-cp-node
                  className="system-module premium-card-hover relative border border-white/6 bg-ink-3/70 p-5 backdrop-blur-sm"
                  style={{
                    borderColor: "rgba(255,255,255,calc(0.06 + 0.10 * var(--cp-a, 0)))",
                    boxShadow: "0 0 0 1px rgba(184,255,46,calc(0.18 * var(--cp-a, 0))) inset",
                  }}
                >
                  {/* Node dot — desktop only, hugs the spine. Fills with --cp-a. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -left-[1.4rem] top-6 hidden h-2.5 w-2.5 -translate-x-1/2 rounded-full lg:block"
                    style={{
                      background: "rgba(184,255,46,calc(0.18 + 0.82 * var(--cp-a, 0)))",
                      boxShadow: "0 0 0 calc(2px * var(--cp-a, 0)) rgba(184,255,46,0.18)",
                    }}
                  />
                  <p className="font-display text-5xl uppercase leading-none text-venom/70">
                    <CountUpNumber value={Number(module.n)} pad={2} />
                  </p>
                  <p className="mt-2 font-heading text-[10px] uppercase tracking-caps text-ash-2">{moduleLabel}</p>
                  <h3 className="mt-3 font-display text-2xl uppercase leading-tight text-bone">{module.title}</h3>
                  <ul className="mt-4 list-none space-y-1.5">
                    {module.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2 text-xs leading-relaxed text-ash/70 transition-colors duration-200 group-hover:text-bone/80">
                        <span aria-hidden className="mt-1 h-1 w-1 shrink-0 rounded-full bg-venom/50" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </HoverGridItem>
              ))}
            </HoverGrid>
          </div>
        </div>

        <div className="mt-24">
          <SceneEyebrow label={sceneLabels.learn} />
          <h3
            ref={learnHeadingRef}
            className="mt-4 max-w-4xl font-display text-[clamp(2.6rem,5vw,5rem)] uppercase leading-[1.08] tracking-tightest"
          >
            {learn.heading}
          </h3>
          <p className="mt-4 max-w-2xl text-ash">{learn.sub}</p>
          <HoverGrid className="mt-10 sm:grid-cols-2 lg:grid-cols-4">
            {learn.cards.map((card, index) => (
              <CinematicPanel
                as="article"
                key={card.title}
                className="system-module hover-grid-item group border border-steel/15 bg-steel/5 p-5"
              >
                <p className="font-heading text-[10px] uppercase tracking-caps text-venom">
                  {skillLabel} <CountUpNumber value={index + 1} pad={2} />
                </p>
                <h4 className="mt-3 font-display text-xl uppercase text-bone">{card.title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-ash">{card.body}</p>
              </CinematicPanel>
            ))}
          </HoverGrid>
        </div>
      </div>
      {/* Inter-scene divider */}
      <div className="scene-divider" aria-hidden />
    </ScrollFilmScene>
  );
}
