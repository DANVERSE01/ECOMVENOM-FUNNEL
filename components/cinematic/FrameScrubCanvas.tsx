"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/cn";
import { ReducedMotionFallback } from "./ReducedMotionFallback";

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

export function FrameScrubCanvas({
  frames,
  poster,
  alt,
  triggerSelector,
  className,
}: {
  frames: string[];
  poster: string;
  alt: string;
  triggerSelector: string;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<Array<HTMLImageElement | null>>([]);
  const currentFrameRef = useRef(0);
  const canvasSizeRef = useRef({ width: 0, height: 0 });
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const canvas = canvasRef.current;
      if (!canvas || reduced || window.matchMedia("(max-width: 767px)").matches) {
        return;
      }

      const context = canvas.getContext("2d");
      const trigger = document.querySelector<HTMLElement>(triggerSelector);
      if (!context || !trigger) return;

      let idleCallbackId: number | null = null;
      let timeoutId: ReturnType<typeof setTimeout> | null = null;
      let ticking = false;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      const sizeCanvas = () => {
        const rect = canvas.getBoundingClientRect();
        const width = Math.max(1, Math.floor(rect.width));
        const height = Math.max(1, Math.floor(rect.height));
        canvasSizeRef.current = { width, height };
        canvas.width = Math.max(1, Math.floor(width * dpr));
        canvas.height = Math.max(1, Math.floor(height * dpr));
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
        const image = imagesRef.current[currentFrameRef.current];
        if (image) drawCover(context, image, width, height);
      };

      const drawFrame = (index: number) => {
        const image = imagesRef.current[index];
        if (!image) return;
        const { width, height } = canvasSizeRef.current;
        if (!width || !height) return;
        drawCover(context, image, width, height);
      };

      const updateByScroll = () => {
        const rect = trigger.getBoundingClientRect();
        const scrollable = Math.max(1, rect.height - window.innerHeight);
        const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
        const nextFrame = Math.max(0, Math.min(frames.length - 1, Math.round(progress * (frames.length - 1))));
        currentFrameRef.current = nextFrame;
        preloadAround(nextFrame);
        drawFrame(nextFrame);
      };

      const requestUpdate = () => {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(() => {
          updateByScroll();
          ticking = false;
        });
      };

      const loadFrame = (index: number) => {
        if (imagesRef.current[index] || !frames[index]) return;
        const image = new window.Image();
        image.decoding = "async";
        image.src = frames[index];
        image.onload = () => {
          imagesRef.current[index] = image;
          if (index === currentFrameRef.current) drawFrame(index);
        };
      };

      const preloadAround = (index: number) => {
        for (let offset = 0; offset <= 3; offset += 1) {
          loadFrame(Math.min(frames.length - 1, index + offset));
          if (offset > 0) loadFrame(Math.max(0, index - offset));
        }
      };

      const preloadInBatches = (startIndex = 0) => {
        const batchSize = 8;
        const end = Math.min(frames.length, startIndex + batchSize);
        for (let index = startIndex; index < end; index += 1) loadFrame(index);
        if (end >= frames.length) return;

        timeoutId = globalThis.setTimeout(() => preloadInBatches(end), 120);
      };

      loadFrame(0);
      preloadAround(0);
      sizeCanvas();
      updateByScroll();
      window.addEventListener("resize", sizeCanvas);
      window.addEventListener("resize", requestUpdate);
      window.addEventListener("scroll", requestUpdate, { passive: true });

      if (typeof window.requestIdleCallback === "function") {
        idleCallbackId = window.requestIdleCallback(() => preloadInBatches(0), { timeout: 1600 });
      } else {
        timeoutId = globalThis.setTimeout(() => preloadInBatches(0), 900);
      }

      return () => {
        window.removeEventListener("resize", sizeCanvas);
        window.removeEventListener("resize", requestUpdate);
        window.removeEventListener("scroll", requestUpdate);
        if (idleCallbackId !== null && typeof window.cancelIdleCallback === "function") {
          window.cancelIdleCallback(idleCallbackId);
        }
        if (timeoutId !== null) {
          globalThis.clearTimeout(timeoutId);
        }
      };
    },
    { scope: canvasRef, dependencies: [frames, triggerSelector, reduced], revertOnUpdate: true },
  );

  return (
    <>
      <canvas
        ref={canvasRef}
        className={cn("hidden h-full w-full bg-black object-cover md:block motion-reduce:!hidden", className)}
        aria-label={alt}
      />
      <ReducedMotionFallback src={poster} alt={alt} className={cn("md:hidden motion-reduce:!block", className)} />
    </>
  );
}
