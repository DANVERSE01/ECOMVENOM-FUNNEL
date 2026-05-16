"use client";

import { WistiaPlayer } from "@/components/cinematic/WistiaPlayer";
import { useLang } from "@/lib/lang-context";

const CONFIRMATION_MEDIA_ID = "bg446wfhed";
const CONFIRMATION_ASPECT = 0.5625;

export function PreCallVideo() {
  const { lang } = useLang();

  return (
    <div className="relative mx-auto w-full max-w-[360px] overflow-hidden border border-white/10 bg-ink-3">
      <WistiaPlayer
        mediaId={CONFIRMATION_MEDIA_ID}
        aspect={CONFIRMATION_ASPECT}
        autoplay
        muted
        className="confirmation-wistia"
      />
      <span className="sr-only">
        {lang === "ar" ? "فيديو ما قبل المكالمة من ECOMVENOM" : "ECOMVENOM pre-call video"}
      </span>
    </div>
  );
}
