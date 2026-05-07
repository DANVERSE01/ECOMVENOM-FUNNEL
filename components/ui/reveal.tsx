"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/cn";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function Reveal({
  children,
  className,
  as: Tag = "div",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    (ctx) => {
      const node = ref.current;
      if (!node) return () => ctx.revert();

      if (reduced) {
        gsap.set(node, { opacity: 1, y: 0 });
        return () => ctx.revert();
      }

      gsap.fromTo(
        node,
        { opacity: 0, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          delay: delay / 1000,
          ease: "power3.out",
          scrollTrigger: {
            trigger: node,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );

      return () => ctx.revert();
    },
    { scope: ref, dependencies: [delay, reduced], revertOnUpdate: true },
  );

  const Component = Tag as any;
  return (
    <Component
      ref={ref as any}
      className={cn("reveal", className)}
    >
      {children}
    </Component>
  );
}
