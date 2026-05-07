"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { Container } from "@/components/ui/container";
import { CtaLink } from "@/components/ui/button";
import { CTA_LABEL, CTA_SUB } from "@/lib/content";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function FinalCta() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const supportRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<gsap.core.Tween | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    (ctx) => {
      const section = sectionRef.current;
      const headline = headlineRef.current;
      const support = supportRef.current;
      const btn = ctaRef.current?.querySelector<HTMLElement>(".btn-primary");

      if (!section || !headline || !support || !btn) {
        return () => ctx.revert();
      }

      const stopGlow = () => {
        glowRef.current?.kill();
        glowRef.current = null;
        gsap.set(btn, { boxShadow: "0 8px 32px rgba(184, 255, 46, 0.22)" });
      };

      if (reduced) {
        gsap.set([headline, support, btn], {
          opacity: 1,
          y: 0,
          yPercent: 0,
        });
        stopGlow();
        return () => {
          stopGlow();
          ctx.revert();
        };
      }

      const headlineSplit = SplitText.create(headline, {
        type: "lines",
        linesClass: "split-line",
        mask: "lines",
      });

      gsap.set(headlineSplit.lines, { yPercent: 110 });
      gsap.set(support, { opacity: 0, y: 18 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            toggleActions: "play none none none",
            once: true,
          },
        })
        .to(headlineSplit.lines, {
          yPercent: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power4.out",
        })
        .to(
          support,
          { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
          "-=0.15",
        );

      const startGlow = () => {
        if (glowRef.current) return;
        glowRef.current = gsap.to(btn, {
          boxShadow: "0 0 40px rgba(184,255,46,0.35)",
          duration: 2.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      };

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onEnter: startGlow,
        onEnterBack: startGlow,
        onLeave: stopGlow,
        onLeaveBack: stopGlow,
      });

      return () => {
        stopGlow();
        headlineSplit.revert();
        ctx.revert();
      };
    },
    { scope: sectionRef, dependencies: [reduced], revertOnUpdate: true },
  );

  return (
    <section ref={sectionRef} className="py-20 sm:py-28">
      <Container>
        <div className="rounded-2xl border border-venom/30 bg-gradient-to-b from-ink-3 to-ink-2 p-10 sm:p-14 text-center">
          <h2
            ref={headlineRef}
            className="font-display text-3xl sm:text-5xl uppercase leading-tight tracking-tightest"
          >
            Ready to start? <span className="text-venom">Apply now.</span>
          </h2>
          <div ref={supportRef}>
            <p className="mt-4 text-ash text-base sm:text-lg max-w-xl mx-auto">
              Spots are limited. We only accept students we believe will put in the work.
            </p>
            <div ref={ctaRef} className="mt-8 flex justify-center">
              <CtaLink href="/apply" sub={CTA_SUB}>
                {CTA_LABEL}
              </CtaLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
