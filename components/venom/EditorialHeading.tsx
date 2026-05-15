import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { StatusPill } from "./StatusPill";

type EditorialHeadingProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  className?: string;
  wide?: boolean;
  tone?: "muted" | "signal" | "danger";
};

export function EditorialHeading({ eyebrow, title, body, className, wide, tone = "signal" }: EditorialHeadingProps) {
  return (
    <div className={cn("vx-copy", className)} data-vx-reveal>
      <StatusPill tone={tone}>{eyebrow}</StatusPill>
      <h2 className={cn("vx-headline vx-headline--section", wide && "vx-headline--wide")}>{title}</h2>
      {body ? <p className="vx-muted">{body}</p> : null}
    </div>
  );
}
