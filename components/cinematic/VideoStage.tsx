"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ResponsiveMediaFrame } from "@/components/cinematic/ResponsiveMediaFrame";
import { cn } from "@/lib/cn";

type VideoStageProps = {
  src: string;
  poster: string;
  title: string;
  eyebrow?: string;
  className?: string;
  posterSizes?: string;
};

export function VideoStage({
  src,
  poster,
  title,
  eyebrow = "Founder VSL",
  className,
  posterSizes = "(min-width: 1024px) 520px, 100vw",
}: VideoStageProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <ResponsiveMediaFrame className={cn("aspect-video bg-ink-3 p-2", className)}>
        <Image
          src={poster}
          alt={`${title} poster`}
          fill
          sizes={posterSizes}
          className="object-cover opacity-95"
        />
        <div className="absolute inset-2 border border-white/10" />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Play ${title}`}
          className="absolute bottom-4 left-4 right-4 z-30 flex min-h-12 items-center justify-between border border-white/10 bg-black/78 px-4 font-mono text-[10px] uppercase tracking-[0.12em] text-bone backdrop-blur-sm transition-colors hover:border-venom/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-venom"
        >
          <span>{eyebrow}</span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-venom text-ink" aria-hidden>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M4.5 3.25L10 7L4.5 10.75V3.25Z" fill="currentColor" />
            </svg>
          </span>
        </button>
      </ResponsiveMediaFrame>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/92 p-4"
          onClick={() => setOpen(false)}
        >
          <div className="relative w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <video
              controls
              autoPlay
              muted
              playsInline
              preload="metadata"
              poster={poster}
              className="aspect-video h-auto w-full bg-black object-contain"
            >
              <source src={src} type="video/mp4" />
            </video>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close video"
              className="absolute -top-10 right-0 grid h-9 w-9 place-items-center text-ash transition-colors hover:text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-venom"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3.75 3.75L12.25 12.25M12.25 3.75L3.75 12.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
