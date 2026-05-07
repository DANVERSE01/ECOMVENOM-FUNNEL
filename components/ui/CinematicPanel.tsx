import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type PanelElement = "div" | "article" | "li" | "section";

type CinematicPanelProps = HTMLAttributes<HTMLElement> & {
  as?: PanelElement;
  children: ReactNode;
};

export function CinematicPanel({
  as: Component = "div",
  className,
  children,
  ...props
}: CinematicPanelProps) {
  return (
    <Component className={cn("scene-panel", className)} {...props}>
      {children}
    </Component>
  );
}
