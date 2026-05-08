"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { faq } from "@/lib/content";
import { cn } from "@/lib/cn";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function Faq() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const answerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const openIndexRef = useRef<number | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduced = useReducedMotion();

  const { contextSafe } = useGSAP(
    (ctx) => {
      answerRefs.current.forEach((answer) => {
        if (!answer) return;
        gsap.set(answer, { height: 0, opacity: 0, overflow: "hidden" });
      });

      return () => ctx.revert();
    },
    { scope: sectionRef, dependencies: [reduced], revertOnUpdate: true },
  );

  const toggleItem = contextSafe((index: number) => {
    const current = openIndexRef.current;
    const nextAnswer = answerRefs.current[index];
    const currentAnswer = current === null ? null : answerRefs.current[current];

    if (currentAnswer) {
      gsap.to(currentAnswer, {
        height: 0,
        opacity: 0,
        duration: reduced ? 0 : 0.25,
        ease: "power2.in",
      });
    }

    if (current === index) {
      openIndexRef.current = null;
      setOpenIndex(null);
      return;
    }

    if (nextAnswer) {
      gsap.to(nextAnswer, {
        height: "auto",
        opacity: 1,
        duration: reduced ? 0 : 0.35,
        ease: "power2.out",
      });
    }

    openIndexRef.current = index;
    setOpenIndex(index);
  });

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-28 bg-ink-2/40 border-y border-white/5"
    >
      <Container>
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-3xl sm:text-5xl uppercase leading-[1.1] tracking-tightest">
            {faq.heading}
          </h2>
          <p className="mt-4 text-ash text-base sm:text-lg">{faq.sub}</p>
        </Reveal>

        <Reveal className="mt-10 max-w-3xl divide-y divide-white/8 rounded-xl border border-white/8 bg-ink-3/40">
          {faq.items.map((item, i) => (
            <div key={i} className="p-5">
              <button
                type="button"
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
                className="flex w-full cursor-pointer list-none items-center justify-between gap-4 text-left"
                onClick={() => toggleItem(i)}
              >
                <span className="font-display uppercase text-base sm:text-lg tracking-wide text-bone">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "text-venom text-xl transition-transform",
                    openIndex === i && "rotate-45",
                  )}
                >
                  +
                </span>
              </button>
              <div
                id={`faq-answer-${i}`}
                ref={(node) => {
                  answerRefs.current[i] = node;
                }}
                aria-hidden={openIndex !== i}
              >
                <p className="pt-3 text-sm sm:text-base text-ash leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal className="max-w-3xl mt-8">
          <p className="text-sm text-ash leading-relaxed">{faq.closing}</p>
        </Reveal>
      </Container>
    </section>
  );
}
