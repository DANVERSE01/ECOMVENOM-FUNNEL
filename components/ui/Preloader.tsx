"use client";

import { useRef, useEffect, useState } from "react";
import { gsap, reducedMotion } from "@/lib/gsap";

function CrossMark({ className }: { className: string }) {
  return (
    <span
      className={`absolute ${className} block`}
      style={{
        width: 16,
        height: 16,
        background: [
          "linear-gradient(to right, transparent calc(50% - 0.5px), var(--c-venom) calc(50% - 0.5px), var(--c-venom) calc(50% + 0.5px), transparent calc(50% + 0.5px))",
          "linear-gradient(to bottom, transparent calc(50% - 0.5px), var(--c-venom) calc(50% - 0.5px), var(--c-venom) calc(50% + 0.5px), transparent calc(50% + 0.5px))",
        ].join(", "),
      }}
    />
  );
}

export function Preloader() {
  const [done, setDone] = useState(false);
  const elRef = useRef<HTMLDivElement>(null);
  const d0Ref = useRef<HTMLSpanElement>(null);
  const d1Ref = useRef<HTMLSpanElement>(null);
  const d2Ref = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    if (reducedMotion()) {
      document.body.style.overflow = "";
      setDone(true);
      return;
    }

    const el = elRef.current;
    if (!el) return;

    const obj = { val: 0 };

    gsap.to(obj, {
      val: 100,
      duration: 0.8,
      ease: "power2.inOut",
      onUpdate() {
        const n = Math.floor(obj.val);
        const str = String(n).padStart(3, "0");
        if (d0Ref.current) d0Ref.current.textContent = str[0];
        if (d1Ref.current) d1Ref.current.textContent = str[1];
        if (d2Ref.current) d2Ref.current.textContent = str[2];
        if (barRef.current) barRef.current.style.transform = `scaleX(${obj.val / 100})`;
      },
      onComplete() {
        gsap.to(el, {
          yPercent: -100,
          duration: 0.42,
          ease: "power4.inOut",
          onComplete() {
            document.body.style.overflow = "";
            setDone(true);
          },
        });
      },
    });

    gsap.to(logoRef.current, {
      opacity: 1,
      delay: 0.2,
      duration: 0.4,
      ease: "power2.out",
    });

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={elRef}
      className="fixed inset-0 z-[10000] bg-ink flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="preloader-scanline" aria-hidden />
      <div className="preloader-vignette" aria-hidden />
      <CrossMark className="top-4 left-4" />
      <CrossMark className="top-4 right-4" />
      <CrossMark className="bottom-4 left-4" />
      <CrossMark className="bottom-4 right-4" />

      <div
        className="flex items-baseline font-display text-[5rem] leading-none text-bone sm:text-[9rem] lg:text-[14rem]"
      >
        <span ref={d0Ref}>0</span>
        <span ref={d1Ref}>0</span>
        <span ref={d2Ref}>0</span>
      </div>

      <div className="mt-8 w-48 h-px bg-white/10 relative">
        <div
          ref={barRef}
          className="absolute inset-0 bg-venom origin-left"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      <span
        ref={logoRef}
        className="mt-6 font-mono text-[10px] tracking-[0.3em] uppercase text-ash opacity-0"
      >
        ECOMVENOM — SYSTEM BOOT
      </span>
    </div>
  );
}
