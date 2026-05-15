import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type BentoGridProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function BentoGrid({ children, className, ...props }: BentoGridProps) {
  return <div className={cn("vx-bento-grid", className)} {...props}>{children}</div>;
}
