"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollFilmScene } from "@/components/cinematic/ScrollFilmScene";
import { SceneEyebrow } from "@/components/cinematic/SceneEyebrow";
import { ResponsiveMediaFrame } from "@/components/cinematic/ResponsiveMediaFrame";
import { SystemOverlay } from "@/components/cinematic/SystemOverlay";
import { HIGGSFIELD_STILLS } from "@/lib/frameManifest";
import { founder } from "@/lib/content";
import { gsap, SplitText } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function Scene05Founder() {
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

      // Trait cards
      gsap.from(traits, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.08,
        ease: "venom",
        scrollTrigger: { trigger: section, start: "top 58%", once: true },
      });

      // Paragraphs word split
      paragraphs.forEach((para) => {
        const split = SplitText.create(para, { type: "words" });
        gsap.from(split.words, {
          opacity: 0,
          duration: 0.35,
          stagger: 0.04,
          ease: "venom",
          scrollTrigger: { trigger: para, start: "top 82%", once: true },
        });
      });

      // Quote chars with blur
      const split = SplitText.create(quote, { type: "chars" });
      gsap.from(split.chars, {
        opacity: 0,
        filter: "blur(4px)",
        x: 4,
        duration: 0.35,
        stagger: 0.014,
        ease: "venom",
        scrollTrigger: { trigger: quote, start: "top 84%", once: true },
      });

      return () => {
        split.revert();
      };
    },
    { scope: sectionRef, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <ScrollFilmScene id="operator" scene="05" title="FOUNDER" className="py-28">
      <span className="scene-ghost top-8 left-8">05</span>
      <div className="absolute inset-0">
        <Image src={HIGGSFIELD_STILLS.productWireframe} alt="" fill sizes="100vw" className="object-cover opacity-[0.18]" />
        <SystemOverlay />
      </div>
      <div ref={sectionRef} className="relative z-10 mx-auto grid max-w-[1220px] gap-10 px-5 sm:px-8 lg:grid-cols-[0.86fr_1.14fr] lg:px-12">
        {/* Portrait with cinematic frame */}
        <ResponsiveMediaFrame ref={portraitRef} className="aspect-[4/5]">
          <div ref={portraitImgRef} className="absolute inset-0">
            <Image
              src="/founder/youssef-adel.jpg"
              alt="Youssef Adel, founder and lead instructor of ECOMVENOM"
              fill
              sizes="(min-width: 1024px) 440px, 90vw"
              className="object-cover"
            />
          </div>
        </ResponsiveMediaFrame>

        <div className="self-center">
          <SceneEyebrow label="FOUNDER" />
          <h2 className="mt-5 font-display text-[clamp(3rem,6vw,6rem)] uppercase leading-[0.88] tracking-tightest">
            {founder.heading}
          </h2>
          {founder.paragraphs.map((paragraph) => (
            <p key={paragraph} className="founder-para mt-5 max-w-3xl text-base leading-relaxed text-ash sm:text-lg">
              {paragraph}
            </p>
          ))}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {founder.traits.map((trait) => (
              <div key={trait.title} className="operator-trait group border border-white/10 bg-black/55 p-4 transition-all duration-[250ms] hover:translate-y-[-3px] hover:border-gold/35">
                <div className="mb-3 h-px w-8 bg-gold/70" />
                <h3 className="font-display text-lg uppercase text-bone">{trait.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ash">{trait.body}</p>
              </div>
            ))}
          </div>
          <blockquote className="mt-8 border-l border-steel pl-5">
            <p ref={quoteRef} className="font-display text-2xl uppercase leading-tight text-bone">
              {founder.pullquote}
              <span className="founder-cursor ml-1 font-mono text-venom">|</span>
            </p>
            <footer className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ash">
              {founder.signature} / {founder.signatureRole}
            </footer>
          </blockquote>
        </div>
      </div>
    </ScrollFilmScene>
  );
}
