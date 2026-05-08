"use client";

import {
  Children,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function Reveal({
  children,
  className,
  as: Tag = "div",
  delay = 0,
  stagger = 100,
  distance = 30,
}: {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  stagger?: number;
  distance?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const visible = useInViewOnce(ref, { rootMargin: "0px 0px -18% 0px", threshold: 0.2 });

  const animatedChildren = Children.map(children, (child, index) => {
    const childDelay = reduced ? 0 : delay + index * stagger;
    const itemStyle: CSSProperties = {
      opacity: visible || reduced ? 1 : 0,
      transform: visible || reduced ? "translate3d(0,0,0)" : `translate3d(0,${distance}px,0)`,
      transition:
        "opacity 760ms cubic-bezier(0.16,1,0.3,1), transform 760ms cubic-bezier(0.16,1,0.3,1)",
      transitionDelay: `${childDelay}ms`,
    };

    return (
      <div style={itemStyle}>
        {child}
      </div>
    );
  });

  const Component = Tag as any;

  return (
    <Component ref={ref as any} className={cn("reveal", className)}>
      {animatedChildren}
    </Component>
  );
}
