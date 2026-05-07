"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { beyond } from "@/lib/content";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function Beyond() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    (ctx) => {
      const section = sectionRef.current;
      if (!section) return () => ctx.revert();

      const cards = gsap.utils.toArray<HTMLElement>(".learn-card", section);

      if (reduced) {
        gsap.set(cards, { opacity: 1, y: 0 });
        return () => ctx.revert();
      }

      ScrollTrigger.batch(cards, {
        onEnter: (elements) => {
          gsap.from(elements, {
            opacity: 0,
            y: 24,
            duration: 0.6,
            stagger: 0.06,
            ease: "power3.out",
          });
        },
        start: "top 88%",
        once: true,
      });

      return () => ctx.revert();
    },
    { scope: sectionRef, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section ref={sectionRef} className="py-20 sm:py-28">
      <Container>
        <Reveal className="max-w-3xl">
          <SectionEyebrow>OUR STANDARD</SectionEyebrow>
          <h2 className="font-display text-3xl sm:text-5xl uppercase leading-tight tracking-tightest mt-3">
            {beyond.heading}
          </h2>
          <p className="mt-4 text-ash text-base sm:text-lg">{beyond.sub}</p>
        </Reveal>

        <Reveal className="mt-12 grid gap-4 sm:grid-cols-2">
          {beyond.pillars.map((p) => (
            <article
              key={p.title}
              className="learn-card rounded-xl border border-white/8 bg-ink-3/60 p-6"
            >
              <h3 className="font-display uppercase text-lg tracking-wide text-venom">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-bone">{p.body}</p>
            </article>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
