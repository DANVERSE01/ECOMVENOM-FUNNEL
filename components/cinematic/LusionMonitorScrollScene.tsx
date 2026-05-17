"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ScrollTrigger, reducedMotion } from "@/lib/gsap";

type ScrollFilmCalibration = {
  screen: {
    left: string;
    top: string;
    width: string;
    height: string;
  };
};

type ScrollFilmAssetManifest = {
  monitorFrame: string;
  poster: string;
  mobileVideo: string;
  frames: string[];
};

type Props = {
  alt: string;
  assets: ScrollFilmAssetManifest;
  calibration?: ScrollFilmCalibration;
};

const DEFAULT_CALIBRATION: ScrollFilmCalibration = {
  screen: {
    left: "9.78%",
    top: "5.46%",
    width: "80.28%",
    height: "65.62%",
  },
};

function clamp(value: number) {
  return Math.max(0, Math.min(1, value));
}

function smoothstep(value: number) {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
}

function mix(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}

function drawCover(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
) {
  const imageRatio = image.naturalWidth / image.naturalHeight;
  const canvasRatio = width / height;
  const drawWidth = imageRatio > canvasRatio ? height * imageRatio : width;
  const drawHeight = imageRatio > canvasRatio ? height : width / imageRatio;
  const dx = (width - drawWidth) / 2;
  const dy = (height - drawHeight) / 2;

  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(image, dx, dy, drawWidth, drawHeight);
}

export function LusionMonitorScrollScene({
  alt,
  assets,
  calibration = DEFAULT_CALIBRATION,
}: Props) {
  const { frames, mobileVideo, monitorFrame, poster } = assets;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const imagesRef = useRef<Array<HTMLImageElement | null>>([]);
  const currentFrameRef = useRef(0);
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const lastProgressRef = useRef(0);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!root || !canvas) return;

    const section = root.closest<HTMLElement>("#chaos-system-film") ?? root;
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const prefersReduced = reducedMotion();
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 1.65);
    let ticking = false;
    let idleCallbackId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let scrollTrigger: ReturnType<typeof ScrollTrigger.create> | null = null;

    const setNumber = (name: string, value: number) => {
      root.style.setProperty(name, value.toFixed(4));
    };

    const setLength = (name: string, value: number, unit = "px") => {
      root.style.setProperty(name, `${value.toFixed(2)}${unit}`);
    };

    const sizeCanvas = () => {
      if (!ctx) return;
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      canvasSizeRef.current = { width, height };
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const image = imagesRef.current[currentFrameRef.current];
      if (image) drawCover(ctx, image, width, height);
    };

    const drawFrame = (index: number) => {
      if (!ctx) return;
      const image = imagesRef.current[index];
      if (!image) return;
      const { width, height } = canvasSizeRef.current;
      if (!width || !height) return;
      drawCover(ctx, image, width, height);
    };

    const loadFrame = (index: number) => {
      const src = frames[index];
      if (!src || imagesRef.current[index]) return;
      const image = new window.Image();
      image.decoding = "async";
      image.src = src;
      image.onload = () => {
        imagesRef.current[index] = image;
        if (index === currentFrameRef.current) drawFrame(index);
      };
    };

    const preloadAround = (index: number) => {
      for (let offset = 0; offset <= 4; offset += 1) {
        loadFrame(Math.min(frames.length - 1, index + offset));
        if (offset > 0) loadFrame(Math.max(0, index - offset));
      }
    };

    const preloadInBatches = (startIndex = 0) => {
      const batchSize = 8;
      const end = Math.min(frames.length, startIndex + batchSize);
      for (let index = startIndex; index < end; index += 1) loadFrame(index);
      if (end >= frames.length) return;
      timeoutId = globalThis.setTimeout(() => preloadInBatches(end), 140);
    };

    const render = (progress: number) => {
      const p = clamp(progress);
      const isMobile = !desktopQuery.matches;
      const cold = smoothstep(p / 0.16);
      const tunnelIn = smoothstep((p - 0.12) / 0.56);
      const tunnelHold = smoothstep((p - 0.64) / 0.16);
      const returnHome = smoothstep((p - 0.84) / 0.16);
      const travel = tunnelIn * (1 - returnHome);

      const startScale = isMobile ? 0.82 : 0.72;
      const coldScale = isMobile ? 1.02 : 0.92;
      const tunnelScale = isMobile ? 3.35 : 2.72;
      const exitScale = isMobile ? 1.18 : 0.86;
      const monitorScale = mix(mix(startScale, coldScale, cold), tunnelScale, travel);
      const settledScale = mix(monitorScale, exitScale, returnHome);
      const startY = isMobile ? 7 : 8;
      const tunnelY = isMobile ? -1 : -2;
      const exitY = isMobile ? 16 : 5;
      const y = mix(mix(startY, 0, cold), tunnelY, travel);
      const settledY = mix(y, exitY, returnHome);
      const frameOpacity = mix(mix(1, 0.94, tunnelHold), 0.06, travel);
      const settledFrameOpacity = mix(frameOpacity, 1, returnHome);
      const screenScale = mix(1, isMobile ? 1.2 : 1.12, travel);
      const brightness = mix(mix(0.42, 0.68, cold), 1.08, tunnelIn);
      const settledBrightness = mix(brightness, 0.78, returnHome);
      const glow = mix(0.16, 0.9, tunnelIn) * (1 - returnHome * 0.5);
      const depth = mix(0, 1, travel);
      const mediaProgress = smoothstep((p - 0.04) / 0.9);

      setNumber("--film-progress", p);
      setNumber("--film-monitor-scale", settledScale);
      setNumber("--film-monitor-y", settledY);
      setLength("--film-monitor-y-length", settledY, "vh");
      setLength("--film-monitor-rotate-x", depth * -1.5, "deg");
      setNumber("--film-frame-opacity", settledFrameOpacity);
      setNumber("--film-screen-scale", screenScale);
      setNumber("--film-screen-brightness", settledBrightness);
      setNumber("--film-depth", depth);
      setNumber("--film-glow", glow);
      setNumber("--film-atmosphere-alpha", 0.08 + glow * 0.28);
      setNumber("--film-secondary-alpha", 0.05 + glow * 0.2);
      setLength("--film-atmosphere-blur", 18 + depth * 24);
      setNumber("--film-atmosphere-opacity", 0.52 + glow * 0.38);
      setNumber("--film-atmosphere-scale", 1 + depth * 0.28);
      setNumber("--film-grid-opacity", 0.18 + depth * 0.34);
      setLength("--film-grid-y", depth * -3, "vh");
      setNumber("--film-grid-scale", 1 + depth * 0.22);
      setNumber("--film-frame-saturation", 0.88 + depth * 0.18);
      setNumber("--film-frame-brightness", 0.7 + depth * 0.24);
      setLength("--film-screen-radius", 10 * (1 - depth));
      setNumber("--film-screen-ring-alpha", 0.08 + glow * 0.08);
      setLength("--film-screen-inner-blur", 18 + glow * 32);
      setNumber("--film-screen-inner-alpha", 0.1 + glow * 0.18);
      setLength("--film-screen-outer-blur", 28 + glow * 96);
      setNumber("--film-screen-outer-alpha", 0.1 + glow * 0.24);
      setNumber("--film-screen-saturation", 0.88 + depth * 0.24);
      setNumber("--film-screen-contrast", 1.04 + depth * 0.08);
      setLength("--film-screen-z", 16 + depth * 86);
      setNumber("--film-vignette-alpha", 0.25 + depth * 0.46);
      setNumber("--film-scan-opacity", 0.22 + depth * 0.18);
      setNumber("--film-glass-shine-alpha", 0.035 + settledFrameOpacity * 0.055);
      setNumber("--film-glass-shadow-alpha", depth * 0.42);
      setNumber("--film-glass-opacity", 0.42 + settledFrameOpacity * 0.38);

      if (isMobile && video && Number.isFinite(video.duration) && video.duration > 0) {
        const targetTime = Math.min(video.duration - 0.04, Math.max(0, mediaProgress * video.duration));
        if (Math.abs(video.currentTime - targetTime) > 0.045) {
          video.currentTime = targetTime;
        }
        video.pause();
      }

      if (isMobile || prefersReduced || !ctx) return;

      const nextFrame = Math.max(
        0,
        Math.min(frames.length - 1, Math.round(mediaProgress * (frames.length - 1))),
      );
      currentFrameRef.current = nextFrame;
      preloadAround(nextFrame);
      drawFrame(nextFrame);
    };

    const requestRender = (progress: number) => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        render(progress);
        lastProgressRef.current = progress;
        ticking = false;
      });
    };

    const handleResize = () => {
      sizeCanvas();
      requestRender(scrollTrigger?.progress ?? 0);
    };

    root.style.setProperty("--film-screen-left", calibration.screen.left);
    root.style.setProperty("--film-screen-top", calibration.screen.top);
    root.style.setProperty("--film-screen-width", calibration.screen.width);
    root.style.setProperty("--film-screen-height", calibration.screen.height);

    if (video) {
      video.muted = true;
      video.playsInline = true;
      video.preload = "auto";
      video.pause();
      video.currentTime = 0;
    }

    const handleLoadedMetadata = () => requestRender(lastProgressRef.current);
    video?.addEventListener("loadedmetadata", handleLoadedMetadata);

    if (desktopQuery.matches && !prefersReduced && ctx) {
      loadFrame(0);
      preloadAround(0);
      sizeCanvas();

      if (typeof window.requestIdleCallback === "function") {
        idleCallbackId = window.requestIdleCallback(() => preloadInBatches(0), { timeout: 1800 });
      } else {
        timeoutId = globalThis.setTimeout(() => preloadInBatches(0), 900);
      }
    }

    if (!prefersReduced) {
      scrollTrigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        invalidateOnRefresh: true,
        onUpdate: (self) => requestRender(self.progress),
      });
    }

    render(0);
    window.addEventListener("resize", handleResize, { passive: true });
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", handleResize);
      video?.removeEventListener("loadedmetadata", handleLoadedMetadata);
      scrollTrigger?.kill();
      if (idleCallbackId !== null && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleCallbackId);
      }
      if (timeoutId !== null) globalThis.clearTimeout(timeoutId);
    };
  }, [frames, mobileVideo, calibration.screen.height, calibration.screen.left, calibration.screen.top, calibration.screen.width]);

  return (
    <div ref={rootRef} className="lusion-monitor-scene" aria-label={alt}>
      <div className="lusion-monitor-scene__atmosphere" aria-hidden />
      <div className="lusion-monitor-scene__rig" aria-hidden="true">
        <div className="lusion-monitor-scene__monitor">
          <Image className="lusion-monitor-scene__frame" src={monitorFrame} alt="" fill sizes="100vw" priority />
          <div className="lusion-monitor-scene__screen">
            <canvas ref={canvasRef} className="lusion-monitor-scene__canvas" role="img" aria-label={alt} />
            <Image className="lusion-monitor-scene__poster" src={poster} alt="" fill sizes="100vw" />
            <video
              ref={videoRef}
              className="lusion-monitor-scene__mobile-video"
              muted
              playsInline
              preload="auto"
              poster={poster}
            >
              <source src={mobileVideo} type="video/mp4" />
            </video>
            <div className="lusion-monitor-scene__scan" />
          </div>
          <div className="lusion-monitor-scene__glass" />
        </div>
      </div>
    </div>
  );
}
