"use client";

import { useLang } from "@/lib/lang-context";

const CONFIRMATION_EMBED_SRC =
  "https://player.vimeo.com/video/1190367488?badge=0&autopause=0&player_id=0&app_id=58479&dnt=1";

export function PreCallVideo() {
  const { lang } = useLang();

  return (
    <div className="relative mx-auto aspect-[9/16] max-w-md overflow-hidden border border-white/10 bg-ink-3">
      <iframe
        src={CONFIRMATION_EMBED_SRC}
        title={lang === "ar" ? "فيديو ما قبل المكالمة من ECOMVENOM" : "ECOMVENOM pre-call video"}
        className="h-full w-full border-0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
