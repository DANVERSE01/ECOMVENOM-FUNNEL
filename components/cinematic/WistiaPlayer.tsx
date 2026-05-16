"use client";

import { useEffect } from "react";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

type WistiaPlayerProps = {
  mediaId: string;
  aspect: number;
  autoplay?: boolean;
  muted?: boolean;
  className?: string;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "wistia-player": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        "media-id": string;
        aspect: number;
        autoplay?: string;
        "do-not-track"?: string;
        muted?: string;
        playsinline?: string;
      };
    }
  }
}

let scriptsLoaded = false;

function loadWistiaScripts() {
  if (scriptsLoaded || typeof window === "undefined") return;
  scriptsLoaded = true;

  const playerScript = document.createElement("script");
  playerScript.src = "https://fast.wistia.com/player.js";
  playerScript.async = true;
  document.head.appendChild(playerScript);
}

function loadMediaScript(mediaId: string) {
  if (typeof window === "undefined") return;
  if (document.querySelector(`script[src*="${mediaId}.js"]`)) return;

  const mediaScript = document.createElement("script");
  mediaScript.src = `https://fast.wistia.com/embed/${mediaId}.js`;
  mediaScript.async = true;
  mediaScript.type = "module";
  document.head.appendChild(mediaScript);
}

export function WistiaPlayer({
  mediaId,
  aspect,
  autoplay = true,
  muted = true,
  className,
}: WistiaPlayerProps) {
  useEffect(() => {
    loadWistiaScripts();
    loadMediaScript(mediaId);
  }, [mediaId]);

  return (
    <div className={className} style={{ position: "relative", width: "100%", aspectRatio: aspect }}>
      <wistia-player
        media-id={mediaId}
        aspect={aspect}
        autoplay={autoplay ? "true" : undefined}
        do-not-track="true"
        muted={muted ? "true" : undefined}
        playsinline="true"
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}
