"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";
import { MaterialField } from "@/components/cinematic/MaterialField";
import { useInViewOnce } from "@/hooks/useInViewOnce";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function ScrollFilmScene({
  id,
  scene,
  title,
  className,
  children,
}: {
  id?: string;
  scene: string;
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const visible = useInViewOnce(ref, { rootMargin: "0px 0px -12% 0px", threshold: 0.15 });

  return (
    <section
      ref={ref}
      id={id}
      data-scene-title={title}
      className={cn("relative isolate overflow-hidden bg-black text-bone", className)}
      style={{
        opacity: visible || reduced ? 1 : 0,
        transform: visible || reduced ? "translate3d(0,0,0)" : "translate3d(0,20px,0)",
        transition:
          "opacity 400ms cubic-bezier(0.16,1,0.3,1), transform 400ms cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <MaterialField scene={scene} />
      {children}
    </section>
  );
}
