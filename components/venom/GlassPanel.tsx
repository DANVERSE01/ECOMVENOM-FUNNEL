import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type GlassPanelProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  variant?: "default" | "strong" | "signal" | "danger";
};

export function GlassPanel({ children, className, variant = "default", ...props }: GlassPanelProps) {
  return (
    <div className={cn("vx-glass", variant !== "default" && `vx-glass--${variant}`, className)} {...props}>
      {children}
    </div>
  );
}
