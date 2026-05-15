"use client";

import Image from "next/image";
import { useState } from "react";
import { FloatingVslPlayer } from "@/components/cinematic/FloatingVslPlayer";
import { StatusPill } from "./StatusPill";

const VSL_EMBED_SRC = "https://player.vimeo.com/video/1190366994?badge=0&autopause=0&player_id=0&app_id=58479&dnt=1&autoplay=1";

type VslStageProps = {
  label: string;
  playLabel: string;
  title: string;
};

export function VslStage({ label, playLabel, title }: VslStageProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="vx-stage" data-vx-reveal>
      <StatusPill>{label}</StatusPill>
      <div className="vx-vsl">
        <Image
          src="/media/hero-vsl-poster.webp"
          alt={title}
          fill
          priority
          sizes="(min-width: 960px) 520px, 92vw"
        />
        <button type="button" className="vx-icon-button" onClick={() => setOpen(true)} aria-label={playLabel}>
          <span>{title}</span>
          <span className="vx-play" aria-hidden />
        </button>
      </div>
      {open ? <FloatingVslPlayer src={VSL_EMBED_SRC} onClose={() => setOpen(false)} /> : null}
    </div>
  );
}
