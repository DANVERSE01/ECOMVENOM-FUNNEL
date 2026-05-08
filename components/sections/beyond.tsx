"use client";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { beyond } from "@/lib/content";

export function Beyond() {
  return (
    <section className="py-16 sm:py-28">
      <Container>
        <Reveal className="max-w-3xl">
          <SectionEyebrow>OUR STANDARD</SectionEyebrow>
          <h2 className="font-display text-3xl sm:text-5xl uppercase leading-[1.1] tracking-tightest mt-3">
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
