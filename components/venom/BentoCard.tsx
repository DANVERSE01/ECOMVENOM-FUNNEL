import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { GlassPanel } from "./GlassPanel";

type BentoCardProps = {
  body: ReactNode;
  className?: string;
  index: string;
  meta?: ReactNode;
  title: ReactNode;
  variant?: "default" | "strong" | "signal" | "danger";
};

export function BentoCard({ body, className, index, meta, title, variant = "default" }: BentoCardProps) {
  return (
    <GlassPanel className={cn("vx-bento-card", className)} variant={variant}>
      <div className="vx-bento-card__top">
        <span>{index}</span>
        {meta ? <span>{meta}</span> : null}
      </div>
      <div>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    </GlassPanel>
  );
}
