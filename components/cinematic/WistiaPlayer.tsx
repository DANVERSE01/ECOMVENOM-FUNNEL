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
        seo?: string;
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

    if (!autoplay) return;

    // Use wistiaOptions (current API) instead of deprecated _wq
    const w = window as unknown as {
      wistiaOptions?: Record<string, unknown>;
      _wq?: Array<Record<string, unknown>>;
    };
    w.wistiaOptions = w.wistiaOptions || {};

    let attempts = 0;
    const interval = window.setInterval(() => {
      attempts += 1;
      const el = document.querySelector(
        `wistia-player[media-id="${mediaId}"]`,
      ) as (HTMLElement & { play?: () => Promise<void> | void; muted?: boolean }) | null;
      if (el?.play) {
        try {
          if (muted) el.muted = true;
          const r = el.play();
          if (r && typeof (r as Promise<void>).catch === "function") {
            (r as Promise<void>).catch(() => {});
          }
        } catch {}
        window.clearInterval(interval);
      }
      if (attempts > 40) window.clearInterval(interval);
    }, 350);

    return () => {
      window.clearInterval(interval);
    };
  }, [mediaId, autoplay, muted]);

  return (
    <div className={className} style={{ position: "relative", width: "100%", aspectRatio: aspect }}>
      <wistia-player
        media-id={mediaId}
        aspect={aspect}
        autoplay={autoplay ? "true" : undefined}
        do-not-track="true"
        muted={muted ? "true" : undefined}
        playsinline="true"
        seo="false"
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  );
}
