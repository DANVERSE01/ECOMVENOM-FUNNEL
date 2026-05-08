"use client";

const CONFIRMATION_EMBED_SRC =
  "https://www.youtube.com/embed/A0cTmbQKA_A?playsinline=1&rel=0&modestbranding=1";

export function PreCallVideo() {
  return (
    <div className="relative mx-auto aspect-[9/16] max-w-md overflow-hidden border border-white/10 bg-ink-3">
      <iframe
        src={CONFIRMATION_EMBED_SRC}
        title="ECOMVENOM pre-call video"
        className="h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
