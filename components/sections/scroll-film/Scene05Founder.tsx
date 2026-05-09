"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollFilmScene } from "@/components/cinematic/ScrollFilmScene";
import { SceneEyebrow } from "@/components/cinematic/SceneEyebrow";
import { ResponsiveMediaFrame } from "@/components/cinematic/ResponsiveMediaFrame";
import { SystemOverlay } from "@/components/cinematic/SystemOverlay";
import { HIGGSFIELD_STILLS } from "@/lib/frameManifest";
import { cn } from "@/lib/cn";
import { gsap } from "@/lib/gsap";
import { splitText } from "@/lib/motion";
import { useLang } from "@/lib/lang-context";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useContent } from "@/lib/useContent";

export function Scene05Founder() {
  const { lang } = useLang();
  const { founder, sceneLabels } = useContent();
  const isArabic = lang === "ar";
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const quoteRef = useRef<HTMLParagraphElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const portraitImgRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const section = sectionRef.current;
      const quote = quoteRef.current;
      if (!section || !quote) return;

      const traits = gsap.utils.toArray<HTMLElement>(".operator-trait", section);
      const paragraphs = gsap.utils.toArray<HTMLElement>(".founder-para", section);

      if (reduced) {
        gsap.set(traits, { opacity: 1, y: 0 });
        return;
      }

      // Portrait parallax
      if (portraitImgRef.current) {
        gsap.fromTo(
          portraitImgRef.current,
          { y: "-20px" },
          {
            y: "20px",
            ease: "none",
            scrollTrigger: {
              trigger: portraitRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      }

      // Portrait clip-path reveal
      if (portraitRef.current) {
        gsap.fromTo(
          portraitRef.current,
          { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
          {
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            duration: 0.9,
            ease: "filmDrop",
            scrollTrigger: { trigger: portraitRef.current, start: "top 72%", once: true },
          },
        );
      }

      // Trait cards — staggered entrance with slight scale
      gsap.from(traits, {
        opacity: 0,
        y: 24,
        scale: 0.97,
        duration: 0.6,
        stagger: 0.08,
        ease: "venom",
        scrollTrigger: { trigger: section, start: "top 58%", once: true },
      });

      // Paragraphs word split
      paragraphs.forEach((para) => {
        const { elements } = splitText(para, "words");
        gsap.from(elements, {
          opacity: 0,
          duration: 0.35,
          stagger: 0.04,
          ease: "venom",
          scrollTrigger: { trigger: para, start: "top 82%", once: true },
        });
      });

      const { elements: quoteElements } = splitText(quote, isArabic ? "words" : "chars");
      gsap.from(quoteElements, {
        opacity: 0,
        x: isArabic ? -10 : 4,
        y: isArabic ? 8 : 0,
        filter: isArabic ? "blur(8px)" : "none",
        duration: isArabic ? 0.42 : 0.35,
        stagger: isArabic ? 0.05 : 0.014,
        ease: "venom",
        ...(isArabic ? { clearProps: "filter" } : {}),
        scrollTrigger: { trigger: quote, start: "top 84%", once: true },
      });
    },
    { scope: sectionRef, dependencies: [isArabic, reduced], revertOnUpdate: true },
  );

  return (
    <ScrollFilmScene id="operator" scene="05" title={sceneLabels.coach} className="py-16 sm:py-28">
      <span className="scene-ghost top-8 left-8">05</span>
      {/* Decorative background number */}
      <span
        aria-hidden
        className="text-outline pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[clamp(14rem,30vw,26rem)] uppercase leading-none"
        style={{ opacity: 0.03 }}
      >
        05
      </span>
      <div className="absolute inset-0">
        <Image src={HIGGSFIELD_STILLS.productWireframe} alt="" fill sizes="100vw" className="object-cover opacity-[0.14]" />
        <SystemOverlay />
      </div>
      <div ref={sectionRef} className="relative z-10 mx-auto grid max-w-measure gap-10 px-5 sm:px-8 lg:grid-cols-[0.86fr_1.14fr] lg:px-12">
        {/* Portrait with cinematic frame */}
        <ResponsiveMediaFrame ref={portraitRef} className="aspect-[4/5]">
          <div ref={portraitImgRef} className="absolute inset-0">
            <Image
              src="/founder/youssef-adel.jpg"
              alt={isArabic ? "يوسف عادل، مؤسس ومدرّب إيكوم فينوم" : "Youssef Adel, founder and lead instructor of ECOMVENOM"}
              fill
              sizes="(min-width: 1024px) 440px, 90vw"
              className="object-cover"
            />
          </div>
        </ResponsiveMediaFrame>

        <div className="self-center">
          <SceneEyebrow label={sceneLabels.coach} />
          <h2 className={cn("mt-5 font-display leading-[1.02]", isArabic ? "text-[clamp(2.7rem,7vw,5.4rem)] tracking-[-0.03em]" : "text-[clamp(3rem,6vw,6rem)] uppercase tracking-tightest")}>
            {founder.heading}
          </h2>
          {founder.paragraphs.map((paragraph) => (
            <p key={paragraph} className="founder-para mt-5 max-w-3xl text-base leading-relaxed text-ash sm:text-lg">
              {paragraph}
            </p>
          ))}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {founder.traits.map((trait) => (
              <div key={trait.title} className="operator-trait group border border-white/6 bg-ink-3/50 p-4 transition-all duration-[250ms] hover:translate-y-[-3px] hover:border-gold/30">
                <div className="mb-3 h-px w-8 bg-gold/60 transition-all duration-300 group-hover:w-12" />
                <h3 className="font-display text-lg uppercase text-bone">{trait.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ash">{trait.body}</p>
              </div>
            ))}
          </div>
          <blockquote className={cn("mt-8", isArabic ? "border-r-2 border-steel pr-5" : "border-l-2 border-steel pl-5")}>
            <p ref={quoteRef} className={cn("font-display text-2xl leading-tight text-bone", isArabic ? "tracking-[-0.025em]" : "uppercase")}>
              {founder.pullquote}
              <span className={cn("founder-cursor font-heading text-venom", isArabic ? "mr-1" : "ml-1")}>|</span>
            </p>
            <footer className={cn("mt-3 font-heading text-ash", isArabic ? "text-[0.72rem] tracking-[0.02em]" : "text-[10px] uppercase tracking-caps")}>
              {founder.signature} / {founder.signatureRole}
            </footer>
          </blockquote>
        </div>
      </div>
      {/* Inter-scene divider */}
      <div className="scene-divider" aria-hidden />
    </ScrollFilmScene>
  );
}
