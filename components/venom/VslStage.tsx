"use client";

import { WistiaPlayer } from "@/components/cinematic/WistiaPlayer";

const HERO_VSL_MEDIA_ID = "0z2r9j4jnz";
const HERO_VSL_ASPECT = 1.7777777777777777;

type VslStageProps = {
  playLabel: string;
  pauseLabel: string;
  soundLabel: string;
  mutedLabel: string;
  blockedLabel: string;
  controlsLabel: string;
  title: string;
};

export function VslStage({
  playLabel,
  pauseLabel,
  soundLabel,
  mutedLabel,
  blockedLabel,
  controlsLabel,
  title,
}: VslStageProps) {
  return (
    <div className="vx-stage">
      <div className="vx-vsl">
        <WistiaPlayer
          mediaId={HERO_VSL_MEDIA_ID}
          aspect={HERO_VSL_ASPECT}
          autoplay
          muted={true}
          posterSrc="/media/hero-vsl-poster.webp"
          posterAlt="ECOMVENOM founder VSL"
          playLabel={playLabel}
          pauseLabel={pauseLabel}
          soundLabel={soundLabel}
          mutedLabel={mutedLabel}
          blockedLabel={blockedLabel}
          controlsLabel={controlsLabel}
        />
        <span className="sr-only">{title}</span>
      </div>
    </div>
  );
}
