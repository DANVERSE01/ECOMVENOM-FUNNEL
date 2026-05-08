"use client";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { learn } from "@/lib/content";

export function Learn() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal className="max-w-3xl">
          <SectionEyebrow>WHAT YOU GET</SectionEyebrow>
          <h2 className="font-display text-3xl sm:text-5xl uppercase leading-[1.1] tracking-tightest mt-3">
            {learn.heading}
          </h2>
          <p className="mt-4 text-ash text-base sm:text-lg">{learn.sub}</p>
        </Reveal>

        <Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {learn.cards.map((c) => (
            <article
              key={c.title}
              className="learn-card rounded-xl border border-white/8 bg-ink-3/60 p-5 hover:border-venom/40 transition-colors"
            >
              <h3 className="font-display uppercase text-lg tracking-wide text-bone">
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ash">{c.body}</p>
            </article>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
