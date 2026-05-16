"use client";

import { WistiaPlayer } from "@/components/cinematic/WistiaPlayer";
import { StatusPill } from "./StatusPill";

const HERO_VSL_MEDIA_ID = "0z2r9j4jnz";
const HERO_VSL_ASPECT = 1.7777777777777777;

type VslStageProps = {
  label: string;
  playLabel: string;
  title: string;
};

export function VslStage({ label, title }: VslStageProps) {
  return (
    <div className="vx-stage" data-vx-reveal>
      <StatusPill>{label}</StatusPill>
      <div className="vx-vsl">
        <WistiaPlayer mediaId={HERO_VSL_MEDIA_ID} aspect={HERO_VSL_ASPECT} autoplay={false} muted={false} />
        <span className="sr-only">{title}</span>
      </div>
    </div>
  );
}
