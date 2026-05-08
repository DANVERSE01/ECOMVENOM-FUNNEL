import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { graduationGift } from "@/lib/content";

export function GraduationGift() {
  return (
    <section className="py-20 sm:py-28 bg-ink-2/40 border-y border-white/5">
      <Container>
        <Reveal className="max-w-4xl mx-auto text-center">
          <p className="text-xs sm:text-sm tracking-[0.12em] text-venom font-semibold">
            {graduationGift.ribbon}
          </p>
          <h2 className="font-display text-3xl sm:text-5xl uppercase mt-3 tracking-tightest leading-[1.1]">
            {graduationGift.title}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-bone">
            {graduationGift.sub}
          </p>
          <p className="mt-5 text-ash text-sm sm:text-base max-w-2xl mx-auto">
            {graduationGift.body}
          </p>
        </Reveal>

        <Reveal className="mt-10 grid gap-4 sm:grid-cols-2 max-w-3xl mx-auto">
          {graduationGift.options.map((o) => (
            <div
              key={o.label}
              className="rounded-2xl border border-white/8 bg-ink-3/60 p-6 text-center"
            >
              <div className="text-3xl">{o.flag}</div>
              <p className="mt-2 text-xs tracking-[0.12em] text-venom font-semibold">
                {o.label}
              </p>
              <p className="mt-1 font-display uppercase text-xl tracking-wide text-bone">
                {o.market}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-10 text-center">
          <p className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-bone">
            {graduationGift.outro}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
