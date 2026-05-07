"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { CtaLink } from "@/components/ui/button";
import { CinematicLoopVideo } from "@/components/cinematic/CinematicLoopVideo";
import { ScrollFilmScene } from "@/components/cinematic/ScrollFilmScene";
import { SceneEyebrow } from "@/components/cinematic/SceneEyebrow";
import { VideoStage } from "@/components/cinematic/VideoStage";
import { SystemOverlay } from "@/components/cinematic/SystemOverlay";
import { HIGGSFIELD_LOOPS, HIGGSFIELD_STILLS, GENERATED_STILLS } from "@/lib/frameManifest";
import { CTA_LABEL, CTA_SUB, hero } from "@/lib/content";
import { gsap } from "@/lib/gsap";
import { splitText, scrambleText } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

const HERO_VSL_SRC = "/media/hero-vsl.mp4";
const HERO_VSL_POSTER = "/media/hero-vsl-poster.jpg";

export function Scene00ColdOpen() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const supportRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const logo = logoRef.current;
      const eyebrow = eyebrowRef.current;
      const headline = headlineRef.current;
      const support = supportRef.current;
      if (!logo || !eyebrow || !headline || !support) return;

      if (reduced) {
        gsap.set([logo, eyebrow, headline, support], { opacity: 1, y: 0, yPercent: 0 });
        return;
      }

      const { elements: headlineLines, revert: revertSplit } = splitText(headline, "lines", { mask: true });
      const eyebrowText = eyebrow.textContent ?? "";

      gsap.set(logo, { opacity: 0 });
      gsap.set(eyebrow, { opacity: 0 });
      gsap.set(headlineLines, { yPercent: 110 });
      gsap.set(support, { opacity: 0, y: 22 });

      gsap
        .timeline({ defaults: { ease: "venom" } })
        .to(logo, { opacity: 1, duration: 0.6 })
        .to(eyebrow, {
          opacity: 1,
          duration: 0.6,
          onStart: () => scrambleText(eyebrow, eyebrowText, { duration: 0.6 }),
        }, 0.5)
        .to(
          headlineLines,
          { yPercent: 0, duration: 0.9, stagger: 0.1, ease: "filmDrop" },
          0.65,
        )
        .to(support, { opacity: 1, y: 0, duration: 0.65 }, ">-0.12");

      return () => {
        revertSplit();
      };
    },
    { scope: sectionRef, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <ScrollFilmScene
      id="system-boot"
      scene="00"
      title="ECOMVENOM"
      className="min-h-[112svh]"
    >
      <span className="scene-ghost top-4 right-8">00</span>
      <div ref={sectionRef} className="absolute inset-0" />
      <div className="absolute inset-0">
        <Image src={GENERATED_STILLS.heroBg} alt="" fill sizes="100vw" className="object-cover opacity-[0.18]" priority />
        <CinematicLoopVideo
          src={HIGGSFIELD_LOOPS.systemWake}
          poster={HIGGSFIELD_STILLS.systemIntro}
          preload="metadata"
          hideOnMobile
          className="opacity-55"
        />
        <SystemOverlay />
      </div>

      <div className="relative z-10 grid min-h-[100svh] items-center px-5 pb-14 pt-24 sm:px-8 sm:pb-16 sm:pt-28 lg:px-12">
        <div className="mx-auto grid w-full max-w-[1320px] gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(360px,520px)] lg:items-center">
          <div className="max-w-5xl">
            <SceneEyebrow label="ECOMVENOM" />
            <div
              ref={logoRef}
              className="relative mt-6 h-16 w-64 overflow-hidden sm:h-20 sm:w-[24rem] lg:h-24 lg:w-[28rem]"
              aria-label="ECOMVENOM"
            >
              <Image
                src="/brand/ecomvenom-logo-final.png"
                alt=""
                fill
                sizes="448px"
                className="object-contain"
                priority
              />
            </div>
            <p
              ref={eyebrowRef}
              className="mt-6 max-w-3xl font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-ash sm:text-[11px]"
            >
              {hero.eyebrow}
            </p>
            <h1
              ref={headlineRef}
              className="mt-4 max-w-5xl font-display text-[clamp(2.55rem,5.4vw,5.85rem)] uppercase leading-[0.94] tracking-tightest text-bone"
            >
              {hero.headlineLead}{" "}
              <span className="text-venom">{hero.headlineHighlight}</span>{" "}
              {hero.headlineTail}{" "}
              <span className="text-venom">{hero.headlineHighlight2}</span>
            </h1>
            <div ref={supportRef} className="relative z-30 mt-7 flex flex-col gap-5 sm:flex-row sm:items-center">
              <CtaLink href="/apply" sub={CTA_SUB} className="cinematic-command min-w-[min(100%,17rem)]">
                {CTA_LABEL}
              </CtaLink>
              <p className="max-w-xl text-sm leading-relaxed text-ash sm:text-[13px]">
                {hero.sub}
              </p>
            </div>

            {/* Scroll invitation */}
            <div className="mt-10 flex items-center gap-3 opacity-50">
              <div className="h-8 w-[1px] bg-gradient-to-b from-venom/60 to-transparent animate-float" />
              <p className="font-heading text-[10px] uppercase tracking-caps text-ash-2">
                {hero.scrollCue}
              </p>
            </div>
          </div>

          <VideoStage
            src={HERO_VSL_SRC}
            poster={HERO_VSL_POSTER}
            title="ECOMVENOM founder VSL"
            className="w-full max-w-[34rem] justify-self-center"
          />
        </div>
      </div>
    </ScrollFilmScene>
  );
}
