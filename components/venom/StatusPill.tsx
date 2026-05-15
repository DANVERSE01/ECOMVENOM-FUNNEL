import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type StatusPillProps = {
  children: ReactNode;
  className?: string;
  tone?: "muted" | "signal" | "danger";
};

export function StatusPill({ children, className, tone = "muted" }: StatusPillProps) {
  return <span className={cn("vx-pill", `vx-pill--${tone}`, className)}>{children}</span>;
}
