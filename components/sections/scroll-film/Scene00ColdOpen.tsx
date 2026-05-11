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
import { cn } from "@/lib/cn";
import { gsap } from "@/lib/gsap";
import { scrambleText } from "@/lib/motion";
import type React from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useVslScrollExpansion } from "@/hooks/useVslScrollExpansion";
import { useSplitReveal } from "@/hooks/useSplitReveal";
import { useScrollChoreography } from "@/hooks/useScrollChoreography";
import { getCurrentLenis } from "@/lib/lenis";
import { FloatingVslPlayer } from "@/components/cinematic/FloatingVslPlayer";
import { PlasmaAtmosphere } from "@/components/effects/PlasmaAtmosphere";
import { HeroCursorSpotlight } from "@/components/effects/HeroCursorSpotlight";
import { BorderBeam } from "@/components/effects/BorderBeam";
import { useContent } from "@/lib/useContent";
import { useLang } from "@/lib/lang-context";

const HERO_MEDIA = {
  embedSrc: "https://player.vimeo.com/video/1190366994",
  posterSrc: "/media/hero-vsl-poster.jpg",
  orientation: "landscape",
  purpose: "homepage-hero-vsl",
} as const;
const HERO_VSL_SESSION_KEY = "ecomvenom.heroVslIntro.seen";
type OverlayPhase = "opening" | "closing";
type LaunchMode = "auto" | "manual";
type CollapseVars = CSSProperties & {
  "--collapse-x"?: string;
  "--collapse-y"?: string;
  "--collapse-scale"?: string;
};

export function Scene00ColdOpen() {
  const { lang, t } = useLang();
  const { hero, heroHeadline, CTA_LABEL, CTA_SUB } = useContent();
  const isArabic = lang === "ar";
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const supportRef = useRef<HTMLDivElement | null>(null);
  const tunnelRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const vslCardRef = useRef<HTMLDivElement | null>(null);
  const overlayPanelRef = useRef<HTMLDivElement | null>(null);
  const scrollOverlayRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const reduced = useReducedMotion();

  // Enhanced reveal hooks
  const headlineRevealRef = useSplitReveal<HTMLHeadingElement>({
    animation: "clip-up",
    stagger: 0.055,
    duration: 0.8,
    delay: 0.35,
    ease: "power4.out"
  });

  const choreographyRef = useScrollChoreography({
    stagger: 0.08,
    distance: 60,
    blur: 12,
    once: true
  });

  const [overlayOpen, setOverlayOpen] = useState(false);
  const [overlayPhase, setOverlayPhase] = useState<OverlayPhase>("opening");
  const [launchMode, setLaunchMode] = useState<LaunchMode>("auto");
  const [collapseStyle, setCollapseStyle] = useState<CollapseVars>({});
  const [scrollVideoActive, setScrollVideoActive] = useState(false);
  const [floatSrc, setFloatSrc] = useState<string | null>(null);

  const heroEmbedSrc = overlayOpen
    ? `${HERO_MEDIA.embedSrc}?badge=0&autopause=0&player_id=0&app_id=58479&dnt=1&autoplay=1${launchMode === "auto" ? "&muted=1" : ""}`
    : "";
  const scrollEmbedSrc = `${HERO_MEDIA.embedSrc}?badge=0&autopause=0&player_id=0&app_id=58479&dnt=1&autoplay=1`;
  const vslCopy = lang === "ar"
    ? {
        badge: "VSL المؤسس",
        preview: "معاينة",
        previewStatic: "معاينة VSL المؤسس",
        originalFrame: "الإطار الأصلي",
        openingLabel: "افتتاح VSL المؤسس",
        founderName: "يوسف عادل",
        muted: "تشغيل صامت تلقائي",
        openingSequence: "تسلسل الافتتاح",
        skip: "تخطي",
      }
    : {
        badge: "Founder VSL",
        preview: "Preview",
        previewStatic: "Founder VSL preview",
        originalFrame: "Original frame",
        openingLabel: "Founder VSL opening",
        founderName: "Youssef Adel",
        muted: "Muted autoplay",
        openingSequence: "Opening sequence",
        skip: "Skip",
      };
  const heroCommandRail = lang === "ar"
    ? ["منهج واضح للسوق الأمريكي والخليجي", "نجهّز متجرك بعد إتمام البرنامج", "الطلب يُراجع أولاً ثم تُفتح الاستشارة"]
    : ["U.S. + Gulf operating path", "Free store build on completion", "Application before scheduling"];

  useVslScrollExpansion(
    sectionRef as React.RefObject<HTMLElement>,
    vslCardRef as React.RefObject<HTMLElement>,
    scrollOverlayRef as React.RefObject<HTMLElement>,
    setScrollVideoActive,
  );

  useGSAP(
    () => {
      const eyebrow = eyebrowRef.current;
      const headline = headlineRef.current;
      const support = supportRef.current;
      const tunnel = tunnelRef.current;
      const spotlight = spotlightRef.current;
      const vslCard = vslCardRef.current;
      if (!eyebrow || !headline || !support || !vslCard) return;

      const compactMotion = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;

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

      gsap.set(eyebrow, { opacity: 0, x: isArabic ? 26 : -26, y: 10 });
      gsap.set(headlineWords, {
        opacity: 0,
        yPercent: 112,
        x: isArabic ? 18 : 0,
        rotation: isArabic ? 0 : 0.5,
        filter: isArabic ? "blur(10px)" : "none",
      });
      if (subheadline) gsap.set(subheadline, { opacity: 0, y: compactMotion ? 14 : 18, x: isArabic ? 12 : 0 });
      if (cta) gsap.set(cta, { opacity: 0, y: compactMotion ? 10 : 14, x: isArabic ? 10 : 0, scale: compactMotion ? 1 : 0.95 });
      gsap.set(vslCard, { opacity: 0, y: compactMotion ? 22 : 34, scale: compactMotion ? 1 : 0.96 });

      gsap
        .timeline({ defaults: { ease: "venom" } })
        .to(eyebrow, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.55,
          onStart: () => {
            if (!isArabic) {
              scrambleText(eyebrow, eyebrowText, { duration: 0.55 });
            }
          },
        }, 0.15)
        .to(
          headlineWords,
          {
            opacity: 1,
            yPercent: 0,
            x: 0,
            rotation: 0,
            filter: "blur(0px)",
            duration: compactMotion ? 0.68 : 0.78,
            stagger: compactMotion ? 0.04 : 0.055,
            ease: "filmDrop",
            ...(isArabic ? { clearProps: "filter" } : {}),
          },
          0.35,
        )
        .to(subheadline, { opacity: 1, x: 0, y: 0, duration: 0.72 }, compactMotion ? 1.08 : 1.55)
        .to(cta, { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.62 }, compactMotion ? 1.18 : 1.75)
        .to(vslCard, { opacity: 1, y: 0, scale: 1, duration: compactMotion ? 0.62 : 0.8, ease: "filmDrop" }, compactMotion ? 1.18 : 1.75);

      if (!compactMotion && tunnel) {
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

      if (!compactMotion && spotlight) {
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

  const floatToMini = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    const src = `${HERO_MEDIA.embedSrc}?badge=0&autopause=0&player_id=0&app_id=58479&dnt=1&autoplay=1`;
    setFloatSrc(src);
    setOverlayOpen(false);
    setOverlayPhase("opening");
    setCollapseStyle({});
  }, []);

  useEffect(() => {
    if (!overlayOpen) return;
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    if (mq.matches) return;
    const lenis = getCurrentLenis();
    if (!lenis) return;

    const onScroll = ({ scroll }: { scroll: number }) => {
      if (scroll > 100) floatToMini();
    };
    lenis.on("scroll", onScroll);
    return () => { lenis.off("scroll", onScroll); };
  }, [overlayOpen, floatToMini]);

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

      <div className="absolute inset-0" data-background>
        <Image src={GENERATED_STILLS.heroBg} alt="" fill sizes="100vw" quality={70} className="object-cover opacity-[0.12]" />
        <PlasmaAtmosphere
          className="opacity-60"
          intensity={0.28}
          speed={0.4}
          mouseDistortion={0.15}
          colorStops={["#B8FF2E", "#5A9AAD", "#0A0A0B"]}
        />
        <CinematicLoopVideo
          src={HIGGSFIELD_LOOPS.systemWake}
          poster={HIGGSFIELD_STILLS.systemIntro}
          preload="metadata"
          hideOnMobile
          className="opacity-35"
        />
        <HeroCursorSpotlight />
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

      <div ref={choreographyRef} className="relative z-10 grid min-h-[100svh] px-5 pb-10 pt-20 sm:px-8 sm:pb-12 sm:pt-24 lg:px-12 lg:pb-14 lg:pt-24 xl:pt-28">
        <div className="mx-auto grid w-full max-w-[1360px] gap-7 self-start lg:grid-cols-[minmax(0,0.95fr)_minmax(18rem,27rem)] lg:items-start lg:gap-9">
          <div className="max-w-[58rem] pt-2 sm:pt-4 lg:pt-0">
            <p
              ref={eyebrowRef}
              data-choreography
              className={cn(
                "max-w-2xl font-heading leading-relaxed text-ash",
                isArabic ? "text-[0.78rem] tracking-[0.015em] sm:text-[0.92rem]" : "text-[0.68rem] uppercase tracking-normal sm:text-xs",
              )}
            >
              {hero.eyebrow}
            </p>
            <h1
              ref={headlineRevealRef}
              data-choreography
              className={cn(
                "mt-4 font-display text-bone [text-wrap:balance]",
                isArabic
                  ? "max-w-[15ch] text-[2.55rem] leading-[1.12] tracking-[-0.03em] sm:text-[3.35rem] lg:text-[4.75rem]"
                  : "max-w-[62rem] text-[2.35rem] uppercase leading-[1.02] tracking-normal sm:text-[3.05rem] lg:text-[3.05rem] xl:text-[3.75rem] 2xl:text-[4.2rem]",
              )}
            >
              {heroHeadline.map((line, lineIndex) => (
                <span key={lineIndex} data-headline-line className="block overflow-hidden">
                  <span className="block">
                    {line.map((word, wordIndex) => (
                      <span key={`${word.text}-${wordIndex}`}>
                        <span
                          data-hero-word
                          className={`inline-block${word.className ? ` ${word.className}` : ""}`}
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
            <div ref={supportRef} className={cn("relative z-30 mt-6 flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-center", isArabic && "sm:items-start")}>
              <span data-hero-cta data-choreography className="inline-flex max-w-full">
                <CtaLink href="/apply" sub={CTA_SUB} className="cinematic-command min-w-[min(100%,16rem)]">
                  {CTA_LABEL}
                </CtaLink>
              </span>
              <p data-hero-sub data-choreography className={cn("max-w-xl leading-relaxed text-ash", isArabic ? "text-[0.95rem] sm:text-[1.02rem]" : "text-sm sm:text-[13px]")}>
                {hero.sub}
              </p>
            </div>

            <div className="hero-command-rail hero-command-rail--mobile mt-6 sm:hidden" aria-label={lang === "ar" ? "أبرز مميزات البرنامج" : "Program highlights"}>
              {heroCommandRail.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <div className="mt-8 hidden items-center gap-3 opacity-45 sm:flex">
              <div className="relative h-9 w-px overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-venom/70 to-transparent animate-float" />
              </div>
              <p className="font-heading text-[9px] uppercase tracking-normal text-ash-2">
                {hero.scrollCue}
              </p>
            </div>
            <div className="hero-command-rail mt-7 hidden sm:grid" aria-label={lang === "ar" ? "أبرز مميزات البرنامج" : "Program highlights"}>
              {heroCommandRail.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div ref={vslCardRef} data-choreography className="hero-vsl-stage vsl-scroll-card justify-self-center lg:justify-self-end">
            <ResponsiveMediaFrame className="hero-vsl-card glass-enhanced aspect-video w-[min(82vw,24rem)] bg-ink-3 p-2 sm:w-[min(62vw,28rem)] lg:w-full">
              <BorderBeam size={140} duration={8} delay={2} />
              <Image
                src={HERO_MEDIA.posterSrc}
                alt={lang === "ar" ? "بوستر VSL المؤسس يوسف عادل" : "Youssef Adel founder VSL poster"}
                fill
                sizes="(min-width: 1024px) 430px, 78vw"
                className="object-cover"
                priority
              />
              <div className="hero-vsl-card__depth" aria-hidden />
              <div className="absolute left-4 top-4 z-30 border border-white/10 bg-black/70 px-3 py-2 backdrop-blur-sm">
                <p className="font-heading text-[10px] uppercase tracking-normal text-venom">{vslCopy.badge}</p>
                <p className="mt-1 font-mono text-[10px] text-ash">{vslCopy.preview}</p>
              </div>
              {scrollVideoActive && (
                <iframe
                  key={scrollEmbedSrc}
                  src={scrollEmbedSrc}
                  title={isArabic ? "فيديو المؤسس" : "Founder VSL"}
                  className="absolute inset-0 h-full w-full border-0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              )}
              {!scrollVideoActive && HERO_MEDIA.embedSrc ? (
                <button
                  type="button"
                  onClick={openManualVsl}
                  aria-label={t("playVsl")}
                  className="hero-vsl-play absolute bottom-4 left-4 right-4 z-30"
                >
                  <span>{t("playVsl")}</span>
                  <span className="hero-vsl-play__icon" aria-hidden>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M4.5 3.25L10 7L4.5 10.75V3.25Z" fill="currentColor" />
                    </svg>
                  </span>
                </button>
              ) : (
                <div className="hero-vsl-static-label absolute bottom-4 left-4 right-4 z-30">
                  <span>{vslCopy.previewStatic}</span>
                  <span>{vslCopy.originalFrame}</span>
                </div>
              )}
            </ResponsiveMediaFrame>
          </div>
        </div>
      </div>

      <div ref={scrollOverlayRef} className="vsl-scroll-overlay" aria-hidden />

      {overlayOpen && HERO_MEDIA.embedSrc && typeof document !== "undefined" && createPortal((
        <div
          role="dialog"
          aria-modal="true"
          aria-label={vslCopy.openingLabel}
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
              <span>{vslCopy.badge}</span>
              <span>{vslCopy.founderName}</span>
              <span>{launchMode === "auto" ? vslCopy.muted : vslCopy.openingSequence}</span>
            </div>

            <iframe
              key={heroEmbedSrc}
              src={heroEmbedSrc}
              title={isArabic ? "فيديو تعريف المؤسس" : vslCopy.badge}
              className="hero-vsl-overlay__video"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />

            <button
              type="button"
              onClick={closeOverlay}
              aria-label={t("closePlayer")}
              className="hero-vsl-overlay__close"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
                <path d="M3.5 3.5L11.5 11.5M11.5 3.5L3.5 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
            <button type="button" onClick={closeOverlay} className="hero-vsl-overlay__skip">
              {vslCopy.skip}
            </button>
          </div>
        </div>
      ), document.body)}

      {floatSrc && (
        <FloatingVslPlayer src={floatSrc} onClose={() => setFloatSrc(null)} />
      )}
    </ScrollFilmScene>
  );
}
