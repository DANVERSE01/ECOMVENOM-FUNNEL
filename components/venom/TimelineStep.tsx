import type { ReactNode } from "react";
import { GlassPanel } from "./GlassPanel";

type TimelineStepProps = {
  body: ReactNode;
  index: string;
  title: ReactNode;
};

export function TimelineStep({ body, index, title }: TimelineStepProps) {
  return (
    <GlassPanel className="vx-timeline">
      <span className="vx-timeline__index">{index}</span>
      <div>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    </GlassPanel>
  );
}
