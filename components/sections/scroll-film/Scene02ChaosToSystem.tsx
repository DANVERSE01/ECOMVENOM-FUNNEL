"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { CinematicFramePlayer } from "@/components/cinematic/CinematicFramePlayer";
import { MaterialField } from "@/components/cinematic/MaterialField";
import { SceneProgress } from "@/components/cinematic/SceneProgress";
import { SceneEyebrow } from "@/components/cinematic/SceneEyebrow";
import { HIGGSFIELD_FRAME_COUNT, HIGGSFIELD_FRAMES, HIGGSFIELD_STILLS } from "@/lib/frameManifest";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useLang } from "@/lib/lang-context";
import { splitText } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useContent } from "@/lib/useContent";

function splitCinematicHeadline(text: string) {
  const punctuated = text
    .split(/[.!؟]+/u)
    .map((part) => part.trim())
    .filter(Boolean);

  if (punctuated.length >= 2) {
    return {
      lead: punctuated[0],
      trail: punctuated.slice(1).join(" "),
    };
  }

  const words = text.trim().split(/\s+/u);
  const pivot = Math.max(1, Math.ceil(words.length / 2));

  return {
    lead: words.slice(0, pivot).join(" "),
    trail: words.slice(pivot).join(" "),
  };
}

export function Scene02ChaosToSystem() {
  const { lang } = useLang();
  const { chaosToSystem, systemScene } = useContent();
  const isArabic = lang === "ar";
  const { lead: mobileLead, trail: mobileTrail } = splitCinematicHeadline(chaosToSystem.headline);
  const sectionRef = useRef<HTMLElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const mobileEyebrowRef = useRef<HTMLSpanElement | null>(null);
  const mobileLeadRef = useRef<HTMLSpanElement | null>(null);
  const mobileTrailRef = useRef<HTMLSpanElement | null>(null);
  const mobileBodyRef = useRef<HTMLParagraphElement | null>(null);
  const visualRef = useRef<HTMLDivElement | null>(null);
  const frameShellRef = useRef<HTMLDivElement | null>(null);
  const depthRef = useRef<HTMLDivElement | null>(null);
  const hudFrameRef = useRef<HTMLSpanElement | null>(null);
  const hudScrollRef = useRef<HTMLSpanElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pin = pinRef.current;
      const headline = headlineRef.current;
      const mobileEyebrow = mobileEyebrowRef.current;
      const mobileLeadLine = mobileLeadRef.current;
      const mobileTrailLine = mobileTrailRef.current;
      const mobileBody = mobileBodyRef.current;
      const visual = visualRef.current;
      const frameShell = frameShellRef.current;
      const depth = depthRef.current;
      if (!section) return;

      const isMobile = window.matchMedia("(max-width: 767px)").matches;

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
        gsap.set(panels, { opacity: 1, scaleX: 1, y: 0 });
        gsap.set([visual, depth], { opacity: 1, scale: 1, y: 0 });
        if (frameShell) gsap.set(frameShell, { clearProps: "all" });
        if (headline) gsap.set(headline, { opacity: 1 });
        gsap.set([mobileEyebrow, mobileLeadLine, mobileTrailLine, mobileBody], {
          opacity: 1,
          y: 0,
          xPercent: 0,
          clearProps: "filter",
        });
        return;
      }

      // Headline line reveal using free splitText
      if (headline && !isMobile) {
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

      // Checkpoint panels use transform wipes to avoid clip-path paint cost.
      gsap.set(panels, {
        scaleX: 0.96,
        y: isMobile ? 18 : 0,
        transformOrigin: isArabic ? "right center" : "left center",
        opacity: 0,
      });

      if (mobileEyebrow) gsap.set(mobileEyebrow, { autoAlpha: 0, y: 18 });
      if (mobileLeadLine) gsap.set(mobileLeadLine, { autoAlpha: 0, xPercent: isArabic ? 24 : -24, y: 18, filter: "blur(12px)" });
      if (mobileTrailLine) gsap.set(mobileTrailLine, { autoAlpha: 0, xPercent: isArabic ? -24 : 24, y: 18, filter: "blur(12px)" });
      if (mobileBody) gsap.set(mobileBody, { autoAlpha: 0, y: 22 });

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

      if (isMobile) {
        if (frameShell) {
          timeline.fromTo(
            frameShell,
            {
              width: "76vw",
              height: "31svh",
              borderRadius: 28,
              borderColor: "rgba(184,255,46,0.22)",
              boxShadow: "0 32px 88px rgba(0,0,0,0.45)",
            },
            {
              width: "100vw",
              height: "100svh",
              borderRadius: 0,
              borderColor: "rgba(184,255,46,0.08)",
              boxShadow: "0 0 0 rgba(0,0,0,0)",
              duration: 0.42,
              ease: "none",
            },
            0,
          );
        }

        if (visual) {
          timeline.fromTo(
            visual,
            { scale: 1.08, opacity: 0.9 },
            {
              scale: 1.18,
              opacity: 1,
              duration: 0.42,
              ease: "none",
            },
            0,
          );
        }

        if (depth) {
          timeline.fromTo(
            depth,
            { opacity: 0.14, scale: 0.86, rotate: 0 },
            {
              opacity: 0.82,
              scale: 1.12,
              rotate: 1.5,
              duration: 0.42,
              ease: "none",
            },
            0.02,
          );
        }

        if (mobileEyebrow) {
          timeline.to(mobileEyebrow, { autoAlpha: 1, y: 0, duration: 0.08, ease: "none" }, 0.34);
        }

        if (mobileLeadLine) {
          timeline.to(mobileLeadLine, {
            autoAlpha: 1,
            xPercent: 0,
            y: 0,
            filter: "blur(0px)",
            duration: 0.12,
            ease: "none",
            clearProps: "filter",
          }, 0.42);
        }

        if (mobileTrailLine) {
          timeline.to(mobileTrailLine, {
            autoAlpha: 1,
            xPercent: 0,
            y: 0,
            filter: "blur(0px)",
            duration: 0.12,
            ease: "none",
            clearProps: "filter",
          }, 0.48);
        }

        if (mobileBody) {
          timeline.to(mobileBody, { autoAlpha: 1, y: 0, duration: 0.1, ease: "none" }, 0.58);
        }
      } else {
        if (visual) {
          gsap.fromTo(
            visual,
            { scale: 1.02, opacity: 0.86 },
            {
              scale: 1.2,
              opacity: 1,
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
      }

      panels.forEach((panel, index) => {
        const isLast = index === panels.length - 1;
        const panelStart = (isMobile ? 0.68 : 0) + index * (isMobile ? 0.11 : 0.22);
        timeline
          .to(panel, {
            scaleX: 1,
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.08 : 0.12,
            ease: "venom",
            onUpdate() {
              if (hudFrameRef.current) {
                hudFrameRef.current.textContent = String(index + 1).padStart(3, "0");
              }
            },
          }, panelStart)
          .to(panel, {
            opacity: isLast ? 1 : 0.3,
            borderColor: isLast ? "rgba(184,255,46,0.5)" : undefined,
            duration: 0.08,
          }, panelStart + (isMobile ? 0.06 : 0.14));
      });
    },
    { scope: sectionRef, dependencies: [isArabic, reduced], revertOnUpdate: true },
  );

  return (
    <section
      id="chaos-system-scroll-film"
      ref={sectionRef}
      data-scene-title={systemScene.sceneTitle}
      data-scene-n="02"
      data-frame-scrub-scene
      className="relative h-[360vh] bg-black text-bone md:h-[330vh]"
    >
      <MaterialField scene="02" />
      <div ref={pinRef} className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 z-[2]">
          <div ref={visualRef} className="absolute inset-0 origin-center will-change-transform">
            <div ref={frameShellRef} className="scene02-frame-shell">
              <CinematicFramePlayer
                frames={HIGGSFIELD_FRAMES}
                poster={HIGGSFIELD_STILLS.dashboardSystem}
                triggerSelector="#chaos-system-scroll-film"
                className="scene02-frame-player"
              />
              <div className="scene02-frame-rim" aria-hidden />
            </div>
          </div>
        </div>
        <div ref={depthRef} className="scene02-depth-field pointer-events-none absolute inset-0 z-[5]" aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] h-40 bg-gradient-to-b from-transparent via-black/30 to-black" />
        <div className="relative z-10 flex h-full flex-col justify-between px-5 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto hidden w-full max-w-wide pt-8 md:block">
            <SceneEyebrow label={systemScene.eyebrow} />
            <h2
              ref={headlineRef}
              className={`mt-5 max-w-4xl font-display leading-[1.02] ${isArabic ? "text-[clamp(3rem,6vw,6.1rem)] tracking-[-0.03em]" : "text-[clamp(2.9rem,6vw,6.6rem)] uppercase tracking-tightest"}`}
            >
              {chaosToSystem.headline}
            </h2>
            <p className={`mt-4 max-w-xl leading-relaxed text-ash ${isArabic ? "text-[1.02rem]" : "text-base"}`}>
              {chaosToSystem.body}
            </p>
          </div>

          <div className="scene02-mobile-copy md:hidden">
            <span ref={mobileEyebrowRef} className="scene02-mobile-kicker">
              {chaosToSystem.eyebrow}
            </span>
            <h2 className="scene02-mobile-headline" aria-label={chaosToSystem.headline}>
              <span ref={mobileLeadRef}>{mobileLead}</span>
              <span ref={mobileTrailRef}>{mobileTrail}</span>
            </h2>
            <p ref={mobileBodyRef} className="scene02-mobile-body">
              {chaosToSystem.body}
            </p>
          </div>

          <div className="pointer-events-none absolute inset-0 z-[8] bg-[radial-gradient(circle_at_center,transparent_28%,rgba(0,0,0,0.54)_78%)]" />

          {/* HUD readout */}
          <div className="absolute top-4 right-4 z-20 hidden text-right font-heading text-[9px] uppercase leading-relaxed tracking-caps text-venom/50 md:block">
            <span ref={hudFrameRef}>001</span>/{String(HIGGSFIELD_FRAME_COUNT).padStart(3, "0")} · <span ref={hudScrollRef}>0</span>%
          </div>

          <div className="mx-auto grid w-full max-w-wide gap-4 pb-6 lg:grid-cols-4">
            {systemScene.checkpoints.map((checkpoint, i) => (
              <div
                key={checkpoint.t}
                className="checkpoint-panel scene-panel-elevated glow-track border-t border-white/8 p-4 transition-colors duration-300"
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
