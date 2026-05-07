"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { founder } from "@/lib/content";
import { gsap, SplitText } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function Founder() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const traitsRef = useRef<HTMLUListElement | null>(null);
  const quoteRef = useRef<HTMLParagraphElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    (ctx) => {
      const section = sectionRef.current;
      const image = imageRef.current;
      const traits = traitsRef.current;
      const quote = quoteRef.current;

      if (!section || !image || !traits || !quote) {
        return () => ctx.revert();
      }

      const traitItems = gsap.utils.toArray<HTMLElement>(".founder-pillar", traits);

      if (reduced) {
        gsap.set([image, quote, ...traitItems], {
          opacity: 1,
          scale: 1,
          y: 0,
        });
        return () => ctx.revert();
      }

      gsap.to(image, {
        scale: 1.04,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          scrub: 2,
          start: "top bottom",
          end: "bottom top",
        },
      });

      gsap.from(traitItems, {
        opacity: 0,
        y: 20,
        duration: 0.55,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: traits,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      const quoteSplit = SplitText.create(quote, {
        type: "chars",
        charsClass: "split-char",
      });

      gsap.from(quoteSplit.chars, {
        opacity: 0,
        duration: 0.35,
        stagger: 0.018,
        ease: "power2.out",
        scrollTrigger: {
          trigger: quote,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      return () => {
        quoteSplit.revert();
        ctx.revert();
      };
    },
    { scope: sectionRef, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section ref={sectionRef} className="py-20 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal className="order-2 lg:order-1 relative">
            <div className="relative aspect-[4/5] max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-white/10 bg-ink-3">
              <div ref={imageRef} className="absolute inset-0">
                <Image
                  src="/founder/youssef-adel.jpg"
                  alt="Youssef Adel, founder and lead instructor of ECOMVENOM"
                  fill
                  sizes="(min-width: 1024px) 480px, 80vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal className="order-1 lg:order-2">
            <SectionEyebrow>{founder.eyebrow}</SectionEyebrow>
            <h2 className="font-display text-3xl sm:text-5xl uppercase tracking-tightest leading-tight mt-3">
              {founder.heading}
            </h2>
            {founder.paragraphs.map((p, i) => (
              <p
                key={i}
                className="mt-4 text-ash text-base sm:text-lg leading-relaxed"
              >
                {p}
              </p>
            ))}

            <ul ref={traitsRef} className="mt-8 grid gap-4 sm:grid-cols-2">
              {founder.traits.map((t) => (
                <li
                  key={t.title}
                  className="founder-pillar rounded-xl border border-white/8 bg-ink-3/60 p-4"
                >
                  <p className="font-display uppercase text-sm tracking-wide text-venom">
                    {t.title}
                  </p>
                  <p className="mt-1 text-sm text-bone leading-relaxed">
                    {t.body}
                  </p>
                </li>
              ))}
            </ul>

            <blockquote className="mt-8 border-l-2 border-venom pl-4">
              <p ref={quoteRef} className="font-display text-xl sm:text-2xl text-bone">
                {founder.pullquote}
                <span aria-hidden className="founder-cursor ml-1 font-mono text-venom">
                  |
                </span>
              </p>
              <footer className="mt-2 text-xs tracking-[0.2em] text-ash">
                {founder.signature} — {founder.signatureRole}
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
