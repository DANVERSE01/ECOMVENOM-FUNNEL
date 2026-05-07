"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";

export function CinematicLoopVideo({
  src,
  poster,
  className,
  preload = "metadata",
  hideOnMobile = false,
}: {
  src: string;
  poster: string;
  className?: string;
  preload?: "none" | "metadata" | "auto";
  hideOnMobile?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const reduced = useReducedMotion();
  const [canRenderVideo, setCanRenderVideo] = useState(!hideOnMobile);

  useEffect(() => {
    if (!hideOnMobile) return;

    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setCanRenderVideo(!media.matches);
    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, [hideOnMobile]);

  useGSAP(
    () => {
      const video = videoRef.current;
      if (!video) return;

      if (reduced) {
        video.pause();
        return;
      }

      video.muted = true;
      video.playsInline = true;
      video.preload = preload;
      void video.play().catch(() => {});

      const trigger = ScrollTrigger.create({
        trigger: video,
        start: "top 95%",
        end: "bottom 5%",
        onEnter: () => void video.play().catch(() => {}),
        onEnterBack: () => void video.play().catch(() => {}),
        onLeave: () => video.pause(),
        onLeaveBack: () => video.pause(),
      });

      return () => {
        trigger.kill();
        video.pause();
      };
    },
    { scope: videoRef, dependencies: [preload, reduced, canRenderVideo], revertOnUpdate: true },
  );

  if (reduced || !canRenderVideo) return null;

  return (
    <video
      ref={videoRef}
      className={cn("h-full w-full object-cover", hideOnMobile && "hidden md:block", className)}
      src={src}
      poster={poster}
      autoPlay={!reduced}
      muted
      loop
      playsInline
      preload={preload}
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
