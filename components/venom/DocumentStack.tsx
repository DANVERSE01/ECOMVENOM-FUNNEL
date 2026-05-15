import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

export type DocumentStackItem = {
  body: string;
  label: string;
  status?: string;
  title: string;
};

type DocumentStackProps = {
  items: DocumentStackItem[];
  className?: string;
};

export function DocumentStack({ items, className }: DocumentStackProps) {
  return (
    <div className={cn("vx-doc-stack", className)} aria-label="Execution document stack">
      {items.map((item, index) => (
        <article
          key={`${item.label}-${item.title}`}
          className={cn("vx-doc", index === 0 && "vx-doc--active")}
          style={{ "--vx-i": index } as CSSProperties}
        >
          <div className="vx-doc__meta">
            <span>{item.label}</span>
            <span>{item.status ?? "CONTROLLED"}</span>
          </div>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </article>
      ))}
    </div>
  );
}
