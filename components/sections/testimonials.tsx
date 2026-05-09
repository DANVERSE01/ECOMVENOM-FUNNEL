"use client";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { useContent } from "@/lib/useContent";
import { useSplitHeading } from "@/hooks/useSplitHeading";

export function Testimonials() {
  const { testimonials } = useContent();
  const headingRef = useSplitHeading<HTMLHeadingElement>();
  return (
    <section className="py-16 sm:py-28 bg-ink-2/40 border-y border-white/5">
      <Container>
        <Reveal className="max-w-3xl">
          <h2 ref={headingRef} className="font-display text-3xl sm:text-5xl uppercase leading-[1.1] tracking-tightest">
            {testimonials.heading}
          </h2>
          <div className="mt-8 rounded-xl border border-dashed border-white/15 bg-ink-3/40 p-8">
            <p className="text-sm text-ash">{testimonials.honestNote}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
