"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import { CtaLink } from "@/components/ui/button";
import { CinematicLoopVideo } from "@/components/cinematic/CinematicLoopVideo";
import { ResponsiveMediaFrame } from "@/components/cinematic/ResponsiveMediaFrame";
import { ScrollFilmScene } from "@/components/cinematic/ScrollFilmScene";
import { SystemOverlay } from "@/components/cinematic/SystemOverlay";
import { HIGGSFIELD_LOOPS, HIGGSFIELD_STILLS, GENERATED_STILLS } from "@/lib/frameManifest";
import { CTA_LABEL, CTA_SUB, hero } from "@/lib/content";
import { gsap } from "@/lib/gsap";
import { scrambleText } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

const HERO_MEDIA = {
  embedSrc: "https://player.vimeo.com/video/1190366994",
  posterSrc: "/media/hero-vsl-poster.jpg",
  orientation: "landscape",
  purpose: "homepage-hero-vsl",
} as const;
const HERO_VSL_SESSION_KEY = "ecomvenom.heroVslIntro.seen";
const HERO_HEADLINE_LINES = [
  [{ text: "BUILD" }, { text: "A" }],
  [{ text: "PROFITABLE", className: "text-venom" }, { text: "DROPSHIPPING" }],
  [{ text: "SYSTEM", className: "text-venom" }],
  [{ text: "IN" }, { text: "45" }, { text: "DAYS" }],
  [{ text: "ZERO", className: "text-venom" }, { text: "EXPERIENCE", className: "text-venom" }],
] as const;

type OverlayPhase = "opening" | "closing";
type LaunchMode = "auto" | "manual";
type CollapseVars = CSSProperties & {
  "--collapse-x"?: string;
  "--collapse-y"?: string;
  "--collapse-scale"?: string;
};

export function Scene00ColdOpen() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const supportRef = useRef<HTMLDivElement | null>(null);
  const tunnelRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const vslCardRef = useRef<HTMLDivElement | null>(null);
  const overlayPanelRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const reduced = useReducedMotion();

  const [overlayOpen, setOverlayOpen] = useState(false);
  const [overlayPhase, setOverlayPhase] = useState<OverlayPhase>("opening");
  const [launchMode, setLaunchMode] = useState<LaunchMode>("auto");
  const [collapseStyle, setCollapseStyle] = useState<CollapseVars>({});

  const heroEmbedSrc = overlayOpen
    ? `${HERO_MEDIA.embedSrc}?badge=0&autopause=0&player_id=0&app_id=58479&dnt=1&autoplay=1${launchMode === "auto" ? "&muted=1" : ""}`
    : "";

  useGSAP(
    () => {
      const eyebrow = eyebrowRef.current;
      const headline = headlineRef.current;
      const support = supportRef.current;
      const tunnel = tunnelRef.current;
      const spotlight = spotlightRef.current;
      const vslCard = vslCardRef.current;
      if (!eyebrow || !headline || !support || !vslCard) return;

      const headlineWords = Array.from(
        headline.querySelectorAll<HTMLElement>("[data-hero-word]"),
      );
      const cta = support.querySelector<HTMLElement>("[data-hero-cta]");
      const subheadline = support.querySelector<HTMLElement>("[data-hero-sub]");

      if (reduced) {
        gsap.set([eyebrow, cta, subheadline, vslCard, ...headlineWords], {
          opacity: 1,
          y: 0,
          yPercent: 0,
          scale: 1,
        });
        return;
      }

      const eyebrowText = eyebrow.textContent ?? "";

      gsap.set(eyebrow, { opacity: 0, y: 10 });
      gsap.set(headlineWords, { yPercent: 112, rotation: 0.5 });
      if (subheadline) gsap.set(subheadline, { opacity: 0, y: 18 });
      if (cta) gsap.set(cta, { opacity: 0, y: 14, scale: 0.95 });
      gsap.set(vslCard, { opacity: 0, y: 34, scale: 0.96 });

      gsap
        .timeline({ defaults: { ease: "venom" } })
        .to(eyebrow, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          onStart: () => scrambleText(eyebrow, eyebrowText, { duration: 0.55 }),
        }, 0.15)
        .to(
          headlineWords,
          { yPercent: 0, rotation: 0, duration: 0.78, stagger: 0.055, ease: "filmDrop" },
          0.35,
        )
        .to(subheadline, { opacity: 1, y: 0, duration: 0.72 }, 1.55)
        .to(cta, { opacity: 1, y: 0, scale: 1, duration: 0.62 }, 1.75)
        .to(vslCard, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "filmDrop" }, 1.75);

      if (tunnel) {
        gsap.to(tunnel, {
          y: "-12%",
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
        });
      }

      if (spotlight) {
        gsap.to(spotlight, {
          opacity: 0.34,
          scale: 1.35,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [reduced], revertOnUpdate: true },
  );

  const closeOverlay = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    const panel = overlayPanelRef.current;
    const card = vslCardRef.current;

    if (!reduced && panel && card) {
      const panelRect = panel.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const dx = cardRect.left + cardRect.width / 2 - (panelRect.left + panelRect.width / 2);
      const dy = cardRect.top + cardRect.height / 2 - (panelRect.top + panelRect.height / 2);
      const scale = Math.max(0.2, Math.min(cardRect.width / panelRect.width, cardRect.height / panelRect.height));

      setCollapseStyle({
        "--collapse-x": `${dx}px`,
        "--collapse-y": `${dy}px`,
        "--collapse-scale": String(scale),
      });
      setOverlayPhase("closing");

      closeTimerRef.current = window.setTimeout(() => {
        setOverlayOpen(false);
        setOverlayPhase("opening");
        setCollapseStyle({});
      }, 560);

      return;
    }

    setOverlayOpen(false);
    setOverlayPhase("opening");
    setCollapseStyle({});
  }, [reduced]);

  useEffect(() => {
    if (!HERO_MEDIA.embedSrc || reduced || overlayOpen) return;

    const mobileQuery = window.matchMedia("(max-width: 767px)");
    if (mobileQuery.matches) return;

    try {
      if (window.sessionStorage.getItem(HERO_VSL_SESSION_KEY)) return;
    } catch {
      return;
    }

    const timer = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(HERO_VSL_SESSION_KEY, "1");
      } catch {
        return;
      }

      setLaunchMode("auto");
      setOverlayPhase("opening");
      setCollapseStyle({});
      setOverlayOpen(true);
    }, 3200);

    return () => window.clearTimeout(timer);
  }, [overlayOpen, reduced]);

  useEffect(() => {
    if (!HERO_MEDIA.embedSrc || !overlayOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.dataset.heroVslOpen = "true";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeOverlay();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      delete document.body.dataset.heroVslOpen;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeOverlay, overlayOpen]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  const openManualVsl = useCallback(() => {
    if (!HERO_MEDIA.embedSrc) return;

    try {
      window.sessionStorage.setItem(HERO_VSL_SESSION_KEY, "1");
    } catch {
      // Storage can be unavailable in strict browser modes; manual playback still works.
    }

    setLaunchMode("manual");
    setOverlayPhase("opening");
    setCollapseStyle({});
    setOverlayOpen(true);
  }, []);

  const handleOverlayBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) closeOverlay();
  };

  return (
    <ScrollFilmScene
      id="system-boot"
      scene="00"
      title="ECOMVENOM"
      className="hero-cold-open min-h-[100svh]"
    >
      <span className="scene-ghost top-4 right-8">00</span>
      <div ref={sectionRef} className="absolute inset-0" />

      <div className="absolute inset-0">
        <Image src={GENERATED_STILLS.heroBg} alt="" fill sizes="100vw" quality={70} className="object-cover opacity-[0.12]" />
        <CinematicLoopVideo
          src={HIGGSFIELD_LOOPS.systemWake}
          poster={HIGGSFIELD_STILLS.systemIntro}
          preload="metadata"
          hideOnMobile
          className="opacity-35"
        />
        <div ref={tunnelRef} className="hero-tunnel-field" aria-hidden />
        <SystemOverlay className="opacity-65" />
        <div
          ref={spotlightRef}
          className="pointer-events-none absolute left-[56%] top-[38%] z-[1] -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "74rem",
            maxWidth: "96vw",
            aspectRatio: "1",
            background: "radial-gradient(circle, rgba(184,255,46,0.07) 0%, rgba(90,154,173,0.03) 30%, transparent 62%)",
            opacity: 0.18,
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-36 bg-gradient-to-b from-black via-black/72 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-44 bg-gradient-to-b from-transparent via-black/46 to-black" />
      </div>

      <div className="relative z-10 grid min-h-[100svh] px-5 pb-10 pt-20 sm:px-8 sm:pb-12 sm:pt-24 lg:px-12 lg:pb-14 lg:pt-24 xl:pt-28">
        <div className="mx-auto grid w-full max-w-[1360px] gap-7 self-start lg:grid-cols-[minmax(0,0.95fr)_minmax(18rem,27rem)] lg:items-start lg:gap-9">
          <div className="max-w-[58rem] pt-2 sm:pt-4 lg:pt-0">
            <p
              ref={eyebrowRef}
              className="max-w-2xl font-heading text-[0.68rem] uppercase leading-relaxed tracking-normal text-ash sm:text-xs"
            >
              {hero.eyebrow}
            </p>
            <h1
              ref={headlineRef}
              className="mt-4 max-w-[62rem] font-display text-[2.35rem] uppercase leading-[1.02] tracking-normal text-bone sm:text-[3.05rem] lg:text-[3.05rem] xl:text-[3.75rem] 2xl:text-[4.2rem]"
            >
              {HERO_HEADLINE_LINES.map((line, lineIndex) => (
                <span key={lineIndex} data-headline-line className="block overflow-hidden">
                  <span className="block">
                    {line.map((word, wordIndex) => (
                      <span key={`${word.text}-${wordIndex}`}>
                        <span
                          data-hero-word
                          className={`inline-block${"className" in word ? ` ${word.className}` : ""}`}
                        >
                          {word.text}
                        </span>
                        {wordIndex < line.length - 1 ? " " : null}
                      </span>
                    ))}
                  </span>
                </span>
              ))}
            </h1>
            <div ref={supportRef} className="relative z-30 mt-6 flex max-w-3xl flex-col gap-5 sm:flex-row sm:items-center">
              <span data-hero-cta className="inline-flex max-w-full">
                <CtaLink href="/apply" sub={CTA_SUB} className="cinematic-command min-w-[min(100%,16rem)]">
                  {CTA_LABEL}
                </CtaLink>
              </span>
              <p data-hero-sub className="max-w-xl text-sm leading-relaxed text-ash sm:text-[13px]">
                {hero.sub}
              </p>
            </div>

            <div className="mt-8 hidden items-center gap-3 opacity-45 sm:flex">
              <div className="relative h-9 w-px overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-venom/70 to-transparent animate-float" />
              </div>
              <p className="font-heading text-[9px] uppercase tracking-normal text-ash-2">
                {hero.scrollCue}
              </p>
            </div>
            <div className="hero-command-rail mt-7 hidden sm:grid" aria-label="Program highlights">
              <span>U.S. + Gulf operating path</span>
              <span>Free store build on completion</span>
              <span>Application before scheduling</span>
            </div>
          </div>

          <div ref={vslCardRef} className="hero-vsl-stage justify-self-center lg:justify-self-end">
            <ResponsiveMediaFrame className="hero-vsl-card aspect-video w-[min(82vw,24rem)] bg-ink-3 p-2 sm:w-[min(62vw,28rem)] lg:w-full">
              <Image
                src={HERO_MEDIA.posterSrc}
                alt="Youssef Adel founder VSL poster"
                fill
                sizes="(min-width: 1024px) 430px, 78vw"
                className="object-cover"
                priority
              />
              <div className="hero-vsl-card__depth" aria-hidden />
              <div className="absolute left-4 top-4 z-30 border border-white/10 bg-black/70 px-3 py-2 backdrop-blur-sm">
                <p className="font-heading text-[10px] uppercase tracking-normal text-venom">Founder VSL</p>
                <p className="mt-1 font-mono text-[10px] text-ash">Preview</p>
              </div>
              {HERO_MEDIA.embedSrc ? (
                <button
                  type="button"
                  onClick={openManualVsl}
                  aria-label="Play founder VSL"
                  className="hero-vsl-play absolute bottom-4 left-4 right-4 z-30"
                >
                  <span>Watch founder VSL</span>
                  <span className="hero-vsl-play__icon" aria-hidden>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M4.5 3.25L10 7L4.5 10.75V3.25Z" fill="currentColor" />
                    </svg>
                  </span>
                </button>
              ) : (
                <div className="hero-vsl-static-label absolute bottom-4 left-4 right-4 z-30">
                  <span>Founder VSL preview</span>
                  <span>Original frame</span>
                </div>
              )}
            </ResponsiveMediaFrame>
          </div>
        </div>
      </div>

      {overlayOpen && HERO_MEDIA.embedSrc && typeof document !== "undefined" && createPortal((
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Founder VSL opening"
          className="hero-vsl-overlay"
          data-phase={overlayPhase}
          style={collapseStyle}
          onClick={handleOverlayBackdropClick}
        >
          <div className="hero-vsl-overlay__ambient" aria-hidden />
          <div ref={overlayPanelRef} className="hero-vsl-overlay__panel">
            <span className="hero-vsl-bracket hero-vsl-bracket--tl" aria-hidden />
            <span className="hero-vsl-bracket hero-vsl-bracket--tr" aria-hidden />
            <span className="hero-vsl-bracket hero-vsl-bracket--bl" aria-hidden />
            <span className="hero-vsl-bracket hero-vsl-bracket--br" aria-hidden />

            <div className="hero-vsl-overlay__meta">
              <span>Founder VSL</span>
              <span>Youssef Adel</span>
              <span>{launchMode === "auto" ? "Muted autoplay" : "Opening sequence"}</span>
            </div>

            <iframe
              key={heroEmbedSrc}
              src={heroEmbedSrc}
              title="Founder VSL"
              className="hero-vsl-overlay__video"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />

            <button
              type="button"
              onClick={closeOverlay}
              aria-label="Close founder VSL"
              className="hero-vsl-overlay__close"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
                <path d="M3.5 3.5L11.5 11.5M11.5 3.5L3.5 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
            <button type="button" onClick={closeOverlay} className="hero-vsl-overlay__skip">
              Skip
            </button>
          </div>
        </div>
      ), document.body)}
    </ScrollFilmScene>
  );
}
