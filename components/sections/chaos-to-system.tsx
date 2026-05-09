"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Container } from "@/components/ui/container";
import { DeviceFrame } from "@/components/cinematic/DeviceFrame";
import { chaosToSystem } from "@/lib/content";
import { gsap } from "@/lib/gsap";
import { splitText } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function ChaosToSystem() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const frameShellRef = useRef<HTMLDivElement | null>(null);
  const copyRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLSpanElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const bodyRef = useRef<HTMLParagraphElement | null>(null);
  const captionRef = useRef<HTMLParagraphElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    (ctx) => {
      const panel = panelRef.current;
      const copy = copyRef.current;
      const eyebrow = eyebrowRef.current;
      const headline = headlineRef.current;
      const body = bodyRef.current;
      const caption = captionRef.current;

      if (!panel || !copy || !eyebrow || !headline || !body || !caption) {
        return () => ctx.revert();
      }

      if (reduced) {
        gsap.set([panel, eyebrow, headline, body, caption], {
          opacity: 1,
          y: 0,
          yPercent: 0,
          clipPath: "inset(0% 0% 0% 0%)",
        });
        return () => ctx.revert();
      }

      const { elements: headlineLines, revert: revertHeadline } = splitText(headline, "lines", { mask: true });

      gsap.fromTo(
        panel,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            scrub: 1,
            start: "top 80%",
            end: "top 30%",
          },
        },
      );

      gsap.set(eyebrow, {
        opacity: 0,
        clipPath: "inset(0% 100% 0% 0%)",
        scaleX: 0.96,
        transformOrigin: "left center",
      });
      gsap.set(headlineLines, { yPercent: 100 });
      gsap.set([body, caption], { opacity: 0, y: 20 });

      const copyTl = gsap.timeline({
        scrollTrigger: {
          trigger: copy,
          start: "top 78%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      copyTl
        .to(eyebrow, {
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          scaleX: 1,
          duration: 0.55,
          ease: "power3.out",
        })
        .to(
          headlineLines,
          {
            yPercent: 0,
            duration: 0.85,
            stagger: 0.15,
            ease: "power4.out",
          },
          "-=0.05",
        )
        .to(body, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }, "-=0.15")
        .to(caption, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, "-=0.2");

      if (!reduced) {
        const frameShell = frameShellRef.current;
        if (frameShell) {
          gsap.fromTo(
            frameShell,
            { rotateX: 8, scale: 0.7, transformPerspective: 1200 },
            {
              rotateX: 0,
              scale: 1.05,
              transformPerspective: 1200,
              ease: "none",
              scrollTrigger: {
                trigger: frameShell,
                scrub: 1.2,
                start: "top 85%",
                end: "top 30%",
              },
            },
          );
          const bezel = frameShell.querySelector(".device-frame-bezel") as HTMLElement | null;
          if (bezel) {
            gsap.fromTo(
              bezel,
              { opacity: 0 },
              {
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: frameShell,
                  scrub: 1,
                  start: "top 85%",
                  end: "top 55%",
                },
              },
            );
          }
        }
      }

      return () => {
        revertHeadline();
        ctx.revert();
      };
    },
    { scope: sectionRef, dependencies: [reduced], revertOnUpdate: true },
  );

  useEffect(() => {
    const node = panelRef.current;
    const video = videoRef.current;
    if (!node || !video) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.intersectionRatio >= 0.35) {
            void video.play().catch(() => {});
          } else {
            video.pause();
          }
        }
      },
      { threshold: 0.35 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="chaos-system-heading"
      className="relative py-16 sm:py-28 border-y border-white/5 bg-ink-2/30 overflow-hidden"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative">
            <div
              ref={panelRef}
              className="relative w-full max-w-2xl mx-auto lg:mx-0"
            >
              <DeviceFrame ref={frameShellRef}>
                <video
                  ref={videoRef}
                  className="block h-full w-full object-cover"
                  src="/media/chaos-system.mp4"
                  poster="/posters/chaos-system-poster.jpg"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                  tabIndex={-1}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(0,0,0,0.55), transparent 16%, transparent 84%, rgba(0,0,0,0.55)), linear-gradient(180deg, rgba(0,0,0,0.5), transparent 18%, transparent 82%, rgba(0,0,0,0.5))",
                  }}
                />
              </DeviceFrame>
            </div>

            <div className="mt-3 grid gap-2 text-[11px] uppercase tracking-[0.12em] text-ash/80 sm:grid-cols-3">
              {["SYSTEM ACTIVE", "MUTED LOOP", "FRAME LOCKED"].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 border border-white/8 bg-black/50 px-3 py-2 font-mono"
                >
                  <span className="system-status-dot h-1.5 w-1.5 rounded-full bg-venom" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div ref={copyRef} className="max-w-xl">
            <span
              ref={eyebrowRef}
              className="inline-block text-xs sm:text-sm font-semibold tracking-[0.12em] text-venom"
            >
              {chaosToSystem.eyebrow}
            </span>
            <h2
              ref={headlineRef}
              id="chaos-system-heading"
              className="font-display text-3xl sm:text-5xl lg:text-6xl uppercase leading-[1.05] tracking-tightest mt-3"
            >
              {chaosToSystem.headline}
            </h2>
            <p
              ref={bodyRef}
              className="mt-5 text-ash text-base sm:text-lg leading-relaxed"
            >
              {chaosToSystem.body}
            </p>
            <p
              ref={captionRef}
              className="mt-6 text-xs uppercase tracking-[0.12em] text-ash/70"
            >
              {chaosToSystem.caption}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
