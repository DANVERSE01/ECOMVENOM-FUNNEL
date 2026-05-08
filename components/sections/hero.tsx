"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Container } from "@/components/ui/container";
import { CtaLink } from "@/components/ui/button";
import { hero, CTA_LABEL, CTA_SUB } from "@/lib/content";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { splitText } from "@/lib/motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const eyebrowRef = useRef<HTMLParagraphElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const supportRef = useRef<HTMLDivElement | null>(null);
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    (ctx) => {
      const section = sectionRef.current;
      const inner = innerRef.current;
      const logo = logoRef.current;
      const eyebrow = eyebrowRef.current;
      const headline = headlineRef.current;
      const support = supportRef.current;
      const media = mediaRef.current;

      if (!section || !inner || !logo || !eyebrow || !headline || !support) {
        return () => ctx.revert();
      }

      if (reduced) {
        gsap.set([logo, eyebrow, headline, support, media], {
          opacity: 1,
          y: 0,
          yPercent: 0,
        });
        return () => ctx.revert();
      }

      const { elements: eyebrowChars, revert: revertEyebrow } = splitText(eyebrow, "chars");
      const { elements: headlineLines, revert: revertHeadline } = splitText(headline, "lines", { mask: true });

      gsap.set([logo, media], { opacity: 0 });
      gsap.set(eyebrowChars, { opacity: 0, y: 16 });
      gsap.set(headlineLines, { yPercent: 110 });
      gsap.set(support, { opacity: 0, y: 18 });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .to(logo, { opacity: 1, duration: 0.6 })
        .to(
          eyebrowChars,
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.015,
          },
          0.25,
        )
        .to(
          headlineLines,
          {
            yPercent: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power4.out",
          },
          0.65,
        )
        .to(
          [support, media],
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
          },
          ">-0.05",
        );

      gsap.to(inner, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          scrub: 1.5,
          start: "top top",
          end: "bottom top",
        },
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=60vh",
        pin: true,
        pinSpacing: true,
      });

      return () => {
        revertEyebrow();
        revertHeadline();
        ctx.revert();
      };
    },
    { scope: sectionRef, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden grain pt-12 sm:pt-20 pb-16 sm:pb-24"
    >
      <Container>
        <div
          ref={innerRef}
          className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
        >
          <div>
            <div
              ref={logoRef}
              aria-label="ECOMVENOM"
              className="relative mb-6 h-14 w-56 overflow-hidden sm:w-72"
            >
                <Image
                src="/brand/ecomvenom-logo-final.png"
                alt=""
                fill
                priority
                sizes="288px"
                className="object-contain scale-[2.55]"
              />
            </div>
            <p
              ref={eyebrowRef}
              className="text-[11px] sm:text-xs uppercase tracking-[0.12em] text-ash mb-5"
            >
              {hero.eyebrow}
            </p>
            <h1
              ref={headlineRef}
              className="font-display text-4xl uppercase leading-[1.02] tracking-tightest text-bone sm:text-6xl lg:text-7xl"
            >
              {hero.headlineLead}{" "}
              <span className="text-venom">{hero.headlineHighlight}</span>{" "}
              {hero.headlineTail}{" "}
              <span className="text-venom">{hero.headlineHighlight2}</span>
            </h1>
            <div ref={supportRef}>
              <p className="mt-6 text-base sm:text-lg text-ash max-w-xl">
                {hero.sub}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <CtaLink href="/apply" sub={CTA_SUB}>
                  {CTA_LABEL}
                </CtaLink>
                <span className="text-xs text-ash">
                  Application takes ~2 minutes
                </span>
              </div>
            </div>
          </div>

          <div ref={mediaRef} className="relative">
            <div className="relative aspect-[9/16] sm:aspect-[3/4] lg:aspect-[9/16] max-w-sm mx-auto lg:max-w-none rounded-xl overflow-hidden border border-white/10 bg-ink-3">
              <Image
                src="/posters/wistia-poster.jpg"
                alt="Youssef Adel — ECOMVENOM founder, intro video poster"
                fill
                priority
                sizes="(min-width: 1024px) 480px, 80vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs text-ash flex items-center justify-between">
                <span className="rounded-full bg-black/50 px-3 py-1 backdrop-blur">
                  Watch the 2-min intro
                </span>
                <span aria-hidden className="rounded-full bg-venom text-ink h-10 w-10 grid place-items-center">
                  ▶
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
