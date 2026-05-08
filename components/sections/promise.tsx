import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { promise } from "@/lib/content";

export function Promise() {
  return (
    <section className="py-16 sm:py-28 border-y border-white/5 bg-ink-2/40">
      <Container>
        <Reveal className="max-w-4xl">
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl uppercase leading-[1.05] tracking-tightest">
            {promise.headline}
          </h2>
          <p className="mt-5 text-ash text-base sm:text-lg max-w-2xl">
            {promise.sub}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
