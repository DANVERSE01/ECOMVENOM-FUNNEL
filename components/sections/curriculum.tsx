"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { curriculum } from "@/lib/content";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function Curriculum() {
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
          <SectionEyebrow>STEP-BY-STEP</SectionEyebrow>
          <h2 className="font-display text-3xl sm:text-5xl uppercase leading-tight tracking-tightest mt-3">
            {curriculum.heading}
          </h2>
          <p className="mt-4 text-ash text-base sm:text-lg">{curriculum.sub}</p>
        </Reveal>

        <Reveal className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {curriculum.modules.map((m) => (
            <div
              key={m.n}
              className="learn-card flex items-center gap-4 rounded-xl border border-white/8 bg-ink-3/40 p-4"
            >
              <div className="font-display text-2xl text-venom w-12 shrink-0">
                {m.n}
              </div>
              <div className="font-display uppercase text-base tracking-wide text-bone">
                {m.title}
              </div>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
