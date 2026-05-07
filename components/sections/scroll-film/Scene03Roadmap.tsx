"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollFilmScene } from "@/components/cinematic/ScrollFilmScene";
import { SceneEyebrow } from "@/components/cinematic/SceneEyebrow";
import { SystemOverlay } from "@/components/cinematic/SystemOverlay";
import { CinematicPanel } from "@/components/ui/CinematicPanel";
import { HoverGrid, HoverGridItem } from "@/components/ui/HoverGrid";
import { GENERATED_STILLS } from "@/lib/frameManifest";
import { curriculum, learn } from "@/lib/content";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { scrambleText, getStrokeLength } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function Scene03Roadmap() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const learnHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const svgPathRef = useRef<SVGPathElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const cards = gsap.utils.toArray<HTMLElement>(".system-module", section);
      const learnHeading = learnHeadingRef.current;

      if (reduced) {
        gsap.set(cards, { opacity: 1, scaleY: 1 });
        return;
      }

      // Module cards use a transform wipe instead of clip-path for smoother paints.
      gsap.set(cards, { scaleY: 0.97, transformOrigin: "top center", opacity: 0 });
      const triggers = ScrollTrigger.batch(cards, {
        onEnter: (elements) => {
          gsap.to(elements, {
            scaleY: 1,
            opacity: 1,
            ease: "venom",
            duration: 0.7,
            stagger: 0.055,
          });
        },
        start: "top 86%",
        once: true,
      });

      // SVG connector — stroke-dashoffset animation (replaces DrawSVG)
      if (svgPathRef.current) {
        const path = svgPathRef.current;
        const length = getStrokeLength(path);
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "venom",
          scrollTrigger: { trigger: section, start: "top 60%", once: true },
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
    <ScrollFilmScene id="roadmap" scene="03" title="ROADMAP" className="py-28">
      <span className="scene-ghost top-8 right-8">03</span>
      <div className="absolute inset-0">
        <Image src={GENERATED_STILLS.roadmapBg} alt="" fill sizes="100vw" className="object-cover opacity-[0.18]" />
        <SystemOverlay />
      </div>
      <div ref={sectionRef} className="relative z-10 mx-auto max-w-wide px-5 sm:px-8 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SceneEyebrow label="ROADMAP" />
            <h2 className="mt-5 font-display text-[clamp(3rem,7vw,7rem)] uppercase leading-[0.86] tracking-tightest">
              {curriculum.heading}
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ash">{curriculum.sub}</p>
          </div>

          {/* Module cards with connector */}
          <div className="relative">
            {/* Vertical connector */}
            <svg
              className="pointer-events-none absolute -left-4 top-0 hidden h-full w-4 lg:block"
              viewBox="0 0 16 400"
              preserveAspectRatio="none"
            >
              <path
                ref={svgPathRef}
                d="M8 0 L8 400"
                stroke="#B8FF2E"
                strokeWidth="1.5"
                strokeOpacity="0.45"
                fill="none"
              />
            </svg>

            <HoverGrid className="sm:grid-cols-2">
              {curriculum.modules.map((module) => (
                <HoverGridItem key={module.n} className="system-module border border-white/6 bg-ink-3/70 p-5 backdrop-blur-sm">
                  <p className="font-display text-5xl uppercase leading-none text-venom/70">{module.n}</p>
                  <p className="mt-2 font-heading text-[10px] uppercase tracking-caps text-ash-2">Module</p>
                  <h3 className="mt-3 font-display text-2xl uppercase leading-tight text-bone">{module.title}</h3>
                  <ul className="mt-4 list-none space-y-1.5">
                    {module.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2 text-xs leading-relaxed text-ash/70 transition-colors duration-200 group-hover:text-bone/80">
                        <span aria-hidden className="mt-[0.45em] h-1 w-1 shrink-0 rounded-full bg-venom/50" />
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
          <SceneEyebrow label="WHAT YOU LEARN" />
          <h3
            ref={learnHeadingRef}
            className="mt-4 max-w-4xl font-display text-[clamp(2.6rem,5vw,5rem)] uppercase leading-[0.9] tracking-tightest"
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
                  Skill {String(index + 1).padStart(2, "0")}
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
