import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function HoverGrid({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div className={cn("hover-grid grid gap-3", className)} {...props}>
      {children}
    </div>
  );
}

export function HoverGridItem({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div className={cn("hover-grid-item group", className)} {...props}>
      {children}
    </div>
  );
}
