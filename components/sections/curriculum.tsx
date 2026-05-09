"use client";

import { Container } from "@/components/ui/container";
import { CountUpNumber } from "@/components/ui/count-up";
import { Reveal } from "@/components/ui/reveal";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { curriculum } from "@/lib/content";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { useSplitHeading } from "@/hooks/useSplitHeading";

export function Curriculum() {
  const staggerRef = useStaggerReveal<HTMLDivElement>("[data-stagger-item]");
  const headingRef = useSplitHeading<HTMLHeadingElement>();
  return (
    <section className="py-16 sm:py-28">
      <Container>
        <Reveal className="max-w-3xl">
          <SectionEyebrow>STEP-BY-STEP</SectionEyebrow>
          <h2 ref={headingRef} className="font-display text-3xl sm:text-5xl uppercase leading-[1.1] tracking-tightest mt-3">
            {curriculum.heading}
          </h2>
          <p className="mt-4 text-ash text-base sm:text-lg">{curriculum.sub}</p>
        </Reveal>

        <div ref={staggerRef} className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {curriculum.modules.map((m) => (
            <div
              key={m.n}
              data-stagger-item
              className="learn-card flex items-center gap-4 rounded-xl border border-white/8 bg-ink-3/40 p-4"
            >
              <div className="font-display text-2xl text-venom w-12 shrink-0">
                <CountUpNumber value={Number(m.n)} pad={2} />
              </div>
              <div className="font-display uppercase text-base tracking-wide text-bone">
                {m.title}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
