"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { CtaLink } from "@/components/ui/button";
import { ScrollFilmScene } from "@/components/cinematic/ScrollFilmScene";
import { SceneEyebrow } from "@/components/cinematic/SceneEyebrow";
import { SystemOverlay } from "@/components/cinematic/SystemOverlay";
import { GENERATED_STILLS } from "@/lib/frameManifest";
import { BorderBeam } from "@/components/effects/BorderBeam";
import { cn } from "@/lib/cn";
import { gsap } from "@/lib/gsap";
import { splitText, getStrokeLength } from "@/lib/motion";
import { useLang } from "@/lib/lang-context";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useContent } from "@/lib/useContent";

export function Scene08FinalCTA() {
  const { lang } = useLang();
  const { CTA_LABEL, CTA_SUB, finalScene } = useContent();
  const isArabic = lang === "ar";
  const finalStatusItems = isArabic
    ? ["خارطة 45 يوماً", "متجر يُجهّز لك", "أمريكا + الخليج"]
    : ["45-DAY ROADMAP", "STORE BUILD INCLUDED", "U.S. + GULF"];
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const statusRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const applySpanRef = useRef<HTMLSpanElement | null>(null);
  const ctaWrapRef = useRef<HTMLDivElement | null>(null);
  const subtextRef = useRef<HTMLParagraphElement | null>(null);
  const hairlinePathRef = useRef<SVGLineElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const section = sectionRef.current;
      const status = statusRef.current;
      const headline = headlineRef.current;
      const subtext = subtextRef.current;
      const ctaWrap = ctaWrapRef.current;
      if (!section) return;

      if (reduced) {
        if (status) gsap.set(status, { opacity: 1, x: 0, y: 0 });
        if (headline) gsap.set(headline, { opacity: 1, yPercent: 0 });
        gsap.set([subtext, ctaWrap], { opacity: 1, y: 0 });
        return;
      }

      if (status) {
        gsap.from(status.children, {
          opacity: 0,
          y: 16,
          duration: 0.5,
          stagger: 0.08,
          ease: "venom",
          scrollTrigger: { trigger: status, start: "top 82%", once: true },
        });
      }

      // Headline SplitText — lines with yPercent + rotation
      if (headline) {
        const { elements: headlineLines } = splitText(headline, "lines", { mask: true });
        gsap.set(headlineLines, { yPercent: 120, rotation: 3 });
        if (applySpanRef.current) gsap.set(applySpanRef.current, { scale: 0.9 });
        gsap.set([subtext, ctaWrap], { opacity: 0, y: 22 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: headline, start: "top 72%", once: true },
        });
        tl.to(headlineLines, {
          yPercent: 0,
          rotation: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "filmDrop",
        });
        if (applySpanRef.current) {
          tl.to(applySpanRef.current, { scale: 1, duration: 0.6, ease: "venom" }, "<0.2");
        }
        tl.to([subtext, ctaWrap], {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: "venom",
        }, "-=0.2");

      }

      // Subtext word split
      if (subtext) {
        const { elements: words } = splitText(subtext, "words");
        gsap.from(words, {
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: "venom",
          scrollTrigger: { trigger: subtext, start: "top 80%", once: true },
        });
      }

      // Venom hairline — stroke-dashoffset (replaces DrawSVG)
      if (hairlinePathRef.current) {
        const line = hairlinePathRef.current;
        const length = getStrokeLength(line);
        line.style.strokeDasharray = `${length}`;
        line.style.strokeDashoffset = `${length}`;
        gsap.to(line, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "venom",
          scrollTrigger: { trigger: line, start: "top 90%", once: true },
        });
      }

      return undefined;
    },
    { scope: sectionRef, dependencies: [isArabic, reduced], revertOnUpdate: true },
  );

  return (
    <ScrollFilmScene id="book-the-call" scene="08" title={finalScene.sceneTitle} className="min-h-screen">
      <div className="absolute inset-0">
        <Image src={GENERATED_STILLS.ctaBg} alt="" fill sizes="100vw" className="object-cover opacity-[0.16]" />
        <div className="clean-system-bg absolute inset-0" aria-hidden />
        <SystemOverlay />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(184,255,46,0.08),transparent_34%,rgba(0,0,0,0.88)_74%)]" />
        <div className="scene-material-wash" data-tone="action" aria-hidden />
        {/* Top gradient from previous scene */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[3] h-32 bg-gradient-to-b from-black to-transparent" />
      </div>

      <div ref={sectionRef} className="relative z-10 grid min-h-screen place-items-center px-5 py-16 text-center sm:px-8 sm:py-28 lg:px-12">
        {/* Scene ghost */}
        <span
          className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-bone/0 select-none"
          style={{ fontSize: "30vw", opacity: 0.025, WebkitTextStroke: "1px rgba(184,255,46,0.15)" }}
          aria-hidden
        >
          08
        </span>

        <div className="max-w-5xl">
          <SceneEyebrow label={finalScene.eyebrow} />
          <div ref={statusRef} className="final-scene__status mt-5" aria-label={isArabic ? "ملخص العرض النهائي" : "Final offer summary"}>
            <span className="final-scene__status-dot" aria-hidden />
            {finalStatusItems.map((item, index) => (
              <span key={item} className="final-scene__status-chip">
                {index > 0 ? <span className="final-scene__status-divider" aria-hidden /> : null}
                <span>{item}</span>
              </span>
            ))}
          </div>
          <h2
            ref={headlineRef}
            className={cn("mt-6 font-display leading-[1.02]", isArabic ? "text-[clamp(2.8rem,10vw,5.9rem)] tracking-[-0.03em]" : "text-[clamp(3.4rem,8vw,8rem)] uppercase tracking-tightest")}
          >
            {finalScene.headlineLead}{" "}
            <span ref={applySpanRef} data-text={finalScene.headlineAccent} className="final-scene__accent inline-block text-gradient">{finalScene.headlineAccent}</span>
          </h2>
          <p
            ref={subtextRef}
            className={cn("mx-auto mt-5 max-w-2xl leading-relaxed text-ash", isArabic ? "text-base sm:text-xl" : "text-lg")}
          >
            {finalScene.body}
          </p>
          <div ref={ctaWrapRef} className="final-scene__cta-wrap relative z-30 mt-9 flex justify-center rounded-xl">
            <BorderBeam size={160} duration={5} color="rgba(255,23,68,0.5)" />
            <CtaLink href="/apply" sub={CTA_SUB} className="cinematic-command">
              {CTA_LABEL}
            </CtaLink>
          </div>
        </div>

        {/* Venom hairline */}
        <div className="absolute bottom-16 left-0 right-0 px-5 sm:px-8 lg:px-12">
          <svg className="w-full" height="2" viewBox="0 0 1000 2" preserveAspectRatio="none">
            <line
              ref={hairlinePathRef}
              x1="0"
              y1="1"
              x2="1000"
              y2="1"
              stroke="url(#venomGrad)"
              strokeWidth="1"
            />
            <defs>
              <linearGradient id="venomGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--c-venom)" stopOpacity="0" />
                <stop offset="50%" stopColor="var(--c-venom)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="var(--c-venom)" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </ScrollFilmScene>
  );
}
