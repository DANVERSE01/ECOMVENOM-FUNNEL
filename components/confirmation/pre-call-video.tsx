"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const VIDEO_SRC = "/media/confirmation-embed.mp4";

export function PreCallVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [failed, setFailed] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reduced) {
      video.pause();
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.preload = "metadata";
  }, [reduced]);

  return (
    <div className="relative mx-auto aspect-[9/16] max-w-md overflow-hidden border border-white/10 bg-ink-3">
      <video
        ref={videoRef}
        controls
        muted
        playsInline
        preload="metadata"
        poster="/posters/confirmation-poster.jpg"
        className="h-full w-full object-cover"
        aria-label="ECOMVENOM pre-call video"
        onError={() => setFailed(true)}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
        Your browser cannot play this video. Please refresh, or check your
        WhatsApp for the call details.
      </video>
      {failed && (
        <a
          href={VIDEO_SRC}
          className="absolute inset-x-4 bottom-4 z-20 inline-flex min-h-11 items-center justify-center border border-venom/40 bg-black/80 px-4 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-venom backdrop-blur transition-colors hover:bg-venom hover:text-ink"
        >
          Open video file
        </a>
      )}
    </div>
  );
}
