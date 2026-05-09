"use client";

import { useRef, useCallback } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { useContent } from "@/lib/useContent";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { useSplitHeading } from "@/hooks/useSplitHeading";
import { useCardTilt } from "@/hooks/useCardTilt";

function TiltCard({ c, idx }: { c: { title: string; body: string }; idx: number }) {
  const { ref, glassRef, onMouseMove, onMouseEnter, onMouseLeave } =
    useCardTilt<HTMLElement>({ maxAngle: 8, scale: 1.025, glassGradient: true });

  return (
    <article
      ref={ref}
      data-stagger-item
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
      className="learn-card relative overflow-hidden rounded-[var(--global-radius)] border border-white/8 bg-ink-3/60 p-5 backdrop-blur-[14px] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
    >
      {/* glass gradient overlay */}
      <div
        ref={glassRef}
        className="absolute inset-0 pointer-events-none rounded-[var(--global-radius)]"
        aria-hidden
      />
      {/* sequential number badge */}
      <span className="absolute top-3 end-3 font-mono text-[10px] text-venom/60 tracking-widest">
        {String(idx + 1).padStart(2, "0")}
      </span>
      <h3 className="font-display uppercase text-lg tracking-wide text-bone">
        {c.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ash">{c.body}</p>
    </article>
  );
}

export function Learn() {
  const { learn } = useContent();
  const staggerRef = useStaggerReveal<HTMLDivElement>("[data-stagger-item]");
  const headingRef = useSplitHeading<HTMLHeadingElement>();
  return (
    <section className="py-16 sm:py-28">
      <Container>
        <Reveal className="max-w-3xl">
          <SectionEyebrow>WHAT YOU GET</SectionEyebrow>
          <h2 ref={headingRef} className="font-display text-3xl sm:text-5xl uppercase leading-[1.1] tracking-tightest mt-3">
            {learn.heading}
          </h2>
          <p className="mt-4 text-ash text-base sm:text-lg">{learn.sub}</p>
        </Reveal>

        <div ref={staggerRef} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {learn.cards.map((c, idx) => (
            <TiltCard key={c.title} c={c} idx={idx} />
          ))}
        </div>
      </Container>
    </section>
  );
}

