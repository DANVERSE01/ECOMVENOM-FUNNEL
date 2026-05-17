"use client";

import { useEffect, useRef, useState } from "react";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

type WistiaState = "beforeplay" | "playing" | "paused" | "ended";

type WistiaPlayerElement = HTMLElement & {
  muted?: boolean;
  paused?: boolean;
  state?: WistiaState;
  pause?: () => void;
  play?: () => Promise<void> | void;
  requestControls?: (requesterName: string) => void;
};

type WistiaPlayerProps = {
  mediaId: string;
  aspect: number;
  autoplay?: boolean;
  muted?: boolean;
  className?: string;
  controls?: boolean;
  playLabel?: string;
  pauseLabel?: string;
  soundLabel?: string;
  mutedLabel?: string;
  blockedLabel?: string;
  controlsLabel?: string;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "wistia-player": DetailedHTMLProps<HTMLAttributes<WistiaPlayerElement>, WistiaPlayerElement> & {
        "media-id": string;
        aspect: number;
        autoplay?: string;
        "do-not-track"?: string;
        muted?: string;
        playsinline?: string;
        preload?: string;
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

function readPlayerState(player: WistiaPlayerElement): WistiaState {
  if (player.state) return player.state;
  if (typeof player.paused === "boolean") return player.paused ? "paused" : "playing";
  return "beforeplay";
}

function clickNativeWistiaButton(player: WistiaPlayerElement, labels: string[]) {
  const root = player.shadowRoot;
  if (!root) return false;

  const normalizedLabels = labels.map((label) => label.toLowerCase());
  const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>("button"));
  const matches = buttons.filter((button) => {
    const candidates = [
      button.getAttribute("aria-label"),
      button.getAttribute("title"),
      button.textContent,
    ]
      .filter(Boolean)
      .map((value) => value!.toLowerCase());

    return normalizedLabels.some((label) => candidates.some((value) => value.includes(label)));
  });
  const visibleMatch =
    matches.find((button) => {
      const rect = button.getBoundingClientRect();
      const style = getComputedStyle(button);
      return rect.width > 4 && rect.height > 4 && style.display !== "none" && style.visibility !== "hidden";
    }) ?? matches[0];

  if (!visibleMatch) return false;

  const view = visibleMatch.ownerDocument.defaultView;
  if (!view) {
    visibleMatch.click();
    return true;
  }

  try {
    visibleMatch.dispatchEvent(new view.PointerEvent("pointerdown", { bubbles: true, composed: true }));
    visibleMatch.dispatchEvent(new view.PointerEvent("pointerup", { bubbles: true, composed: true }));
  } catch {}

  visibleMatch.dispatchEvent(new view.MouseEvent("click", { bubbles: true, cancelable: true, composed: true }));
  return true;
}

export function WistiaPlayer({
  mediaId,
  aspect,
  autoplay = true,
  muted = true,
  className,
  controls = false,
  playLabel = "Play",
  pauseLabel = "Pause",
  soundLabel = "Sound on",
  mutedLabel = "Mute",
  blockedLabel = "Tap to play with sound",
  controlsLabel = "Video controls",
}: WistiaPlayerProps) {
  const playerRef = useRef<WistiaPlayerElement | null>(null);
  const [playerState, setPlayerState] = useState<WistiaState>("beforeplay");
  const [isMuted, setIsMuted] = useState(muted);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    loadWistiaScripts();
    loadMediaScript(mediaId);

    const player = playerRef.current;
    if (!player) return;

    let cancelled = false;

    const syncState = () => {
      if (cancelled) return;
      const nextState = readPlayerState(player);
      const nextMuted = Boolean(player.muted);
      setPlayerState(nextState);
      setIsMuted(nextMuted);
      setAutoplayBlocked(Boolean(autoplay && !muted && nextMuted && nextState === "playing"));
    };

    const syncSoon = () => {
      window.requestAnimationFrame(syncState);
    };

    const onReady = () => {
      try {
        player.requestControls?.("ecomvenom-custom-vsl");
      } catch {}
      syncState();
    };

    player.muted = muted;
    syncState();
    player.addEventListener("api-ready", onReady);
    player.addEventListener("play", syncSoon);
    player.addEventListener("pause", syncSoon);
    player.addEventListener("ended", syncSoon);
    player.addEventListener("mute-change", syncSoon);
    player.addEventListener("volume-change", syncSoon);

    return () => {
      cancelled = true;
      player.removeEventListener("api-ready", onReady);
      player.removeEventListener("play", syncSoon);
      player.removeEventListener("pause", syncSoon);
      player.removeEventListener("ended", syncSoon);
      player.removeEventListener("mute-change", syncSoon);
      player.removeEventListener("volume-change", syncSoon);
    };
  }, [mediaId, autoplay, muted]);

  async function playWithSound() {
    const player = playerRef.current;
    if (!player) return;

    player.muted = false;
    setIsMuted(false);

    try {
      if (player.play) {
        const result = player.play();
        if (result && typeof result.then === "function") await result;
      } else if (player.paused !== false) {
        clickNativeWistiaButton(player, ["play"]);
      }
      setAutoplayBlocked(false);
      window.requestAnimationFrame(() => {
        setPlayerState(readPlayerState(player));
        setIsMuted(Boolean(player.muted));
      });
    } catch {
      setAutoplayBlocked(true);
      setPlayerState(readPlayerState(player));
    }
  }

  async function togglePlay() {
    const player = playerRef.current;
    if (!player) return;

    if (readPlayerState(player) === "playing") {
      if (player.pause) {
        player.pause();
      } else {
        clickNativeWistiaButton(player, ["pause"]);
      }
      setPlayerState("paused");
      return;
    }

    await playWithSound();
  }

  function toggleMute() {
    const player = playerRef.current;
    if (!player) return;

    const nextMuted = !Boolean(player.muted);

    if (nextMuted) {
      clickNativeWistiaButton(player, ["mute"]);
      player.muted = true;
    } else {
      clickNativeWistiaButton(player, ["unmute", "sound"]);
      player.muted = false;
    }

    if (!nextMuted && readPlayerState(player) !== "playing") {
      void playWithSound();
      return;
    }

    window.requestAnimationFrame(() => {
      setIsMuted(Boolean(player.muted));
      setPlayerState(readPlayerState(player));
    });
  }

  const isPlaying = playerState === "playing";
  const statusLabel = autoplayBlocked && isMuted ? blockedLabel : isPlaying ? pauseLabel : playLabel;

  return (
    <div
      className={className}
      data-wistia-state={playerState}
      data-autoplay-blocked={autoplayBlocked ? "true" : "false"}
      data-muted={isMuted ? "true" : "false"}
      style={{ position: "relative", width: "100%", aspectRatio: aspect }}
    >
      <wistia-player
        ref={playerRef}
        media-id={mediaId}
        aspect={aspect}
        autoplay={autoplay ? "true" : undefined}
        do-not-track="true"
        muted={muted ? "true" : undefined}
        playsinline="true"
        preload="auto"
        seo="false"
        style={{ display: "block", width: "100%", height: "100%" }}
      />

      {controls ? (
        <div className="wistia-custom-controls" aria-label={controlsLabel}>
          <span className="wistia-custom-controls__status" aria-live="polite">
            {statusLabel}
          </span>
          <div className="wistia-custom-controls__actions">
            <button
              type="button"
              className="wistia-custom-controls__button wistia-custom-controls__button--primary"
              onClick={togglePlay}
              aria-pressed={isPlaying}
            >
              {isPlaying ? pauseLabel : playLabel}
            </button>
            <button
              type="button"
              className="wistia-custom-controls__button"
              onClick={toggleMute}
              aria-pressed={!isMuted}
            >
              {isMuted ? soundLabel : mutedLabel}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
