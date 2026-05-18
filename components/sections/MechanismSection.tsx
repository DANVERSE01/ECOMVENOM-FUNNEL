"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { GlassPanel } from "@/components/venom/GlassPanel";
import { SectionWrapper } from "@/components/venom/SectionWrapper";
import { recoveryCopy } from "@/lib/cinematicRecoveryContent";
import { useLang } from "@/lib/lang-context";

export function MechanismSection() {
  const { lang } = useLang();
  const c = recoveryCopy[lang].mechanism;
  const gridRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useGSAP(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const steps = grid.querySelectorAll<HTMLElement>(".v2-mechanism__step");
    if (!steps.length) return;

    gsap.set(steps, { opacity: 0, x: -36, filter: "blur(4px)" });

    const enterTrigger = ScrollTrigger.create({
      trigger: grid,
      start: "top 78%",
      onEnter: () => {
        gsap.to(steps, {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.75,
          ease: "expo.out",
          stagger: { amount: 0.45, from: "start" },
        });

        if (lineRef.current) {
          const length = lineRef.current.getTotalLength?.() ?? 0;
          gsap.fromTo(
            lineRef.current,
            { strokeDashoffset: length, strokeDasharray: length },
            { strokeDashoffset: 0, duration: 1.2, ease: "power3.out", delay: 0.2 },
          );
        }
      },
    });

    // Active-step indicator driven by scroll progress through the section.
    // Maps progress in [0, 1] to active index in [0, steps.length - 1].
    let lastActive = -1;
    const progressTrigger = ScrollTrigger.create({
      trigger: "#mechanism",
      start: "top 70%",
      end: "bottom 30%",
      scrub: true,
      onUpdate: (self) => {
        const idx = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
        if (idx === lastActive) return;
        lastActive = idx;
        steps.forEach((el, i) => {
          if (i === idx) el.setAttribute("data-active", "true");
          else el.removeAttribute("data-active");
        });
      },
    });

    return () => {
      enterTrigger.kill();
      progressTrigger.kill();
    };
  }, { scope: gridRef });

  return (
    <SectionWrapper id="mechanism" className="vx-section--compact" sceneTitle={c.eyebrow}>
      <div className="vx-shell v2-mechanism">
        <div className="v2-section-copy" data-vx-reveal>
          <span className="v2-label">{c.eyebrow}</span>
          <h2>{c.title}</h2>
          <p>{c.body}</p>
        </div>

        <GlassPanel ref={gridRef} className="vx-command-board v2-mechanism__grid" variant="strong">
          <div className="vx-console__top">
            <span>{lang === "ar" ? "خريطة التشغيل" : "OPERATING MAP"}</span>
            <span>{lang === "ar" ? "حلقة قرار واحدة" : "ONE DECISION LOOP"}</span>
          </div>

          {/* Animated connector line */}
          <svg
            className="v2-mechanism__connector"
            aria-hidden="true"
            style={{ position: "absolute", left: "clamp(1rem,2vw,1.5rem)", top: "3.5rem", width: 2, pointerEvents: "none", overflow: "visible" }}
          >
            <line
              ref={lineRef}
              x1="1" y1="0" x2="1" y2="200"
              stroke="rgba(213,217,4,0.4)"
              strokeWidth="1.5"
              strokeDasharray="200"
              strokeDashoffset="200"
            />
          </svg>

          {c.steps.map((step) => (
            <article className="v2-mechanism__step" key={step.n}>
              <span>{step.n}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </article>
          ))}
        </GlassPanel>
      </div>
    </SectionWrapper>
  );
}
