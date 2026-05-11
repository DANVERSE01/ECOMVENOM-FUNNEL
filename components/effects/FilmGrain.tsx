"use client";

import { useEffect, useRef } from "react";
import { reducedMotion } from "@/lib/gsap";

export function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reducedMotion()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let lastFrame = 0;
    const FPS = 14;

    let seed = (Math.random() * 0xffffffff) | 0;
    function rand() {
      seed ^= seed << 13;
      seed ^= seed >> 17;
      seed ^= seed << 5;
      return (seed >>> 0) / 0xffffffff;
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = (now: number) => {
      rafId = requestAnimationFrame(draw);
      if (now - lastFrame < 1000 / FPS) return;
      lastFrame = now;

      const w = canvas.width;
      const h = canvas.height;
      if (!w || !h) return;

      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;
      const total = w * h;
      const grainCount = (total * 0.032) | 0;

      for (let i = 0; i < grainCount; i++) {
        const px = (rand() * total) | 0;
        const base = px * 4;
        const brightness = (rand() * 160 + 60) | 0;
        data[base] = brightness;
        data[base + 1] = brightness;
        data[base + 2] = brightness;
        data[base + 3] = (rand() * 18 + 4) | 0;
      }

      ctx.putImageData(imageData, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9990] h-full w-full mix-blend-soft-light"
      style={{ opacity: 0.028, imageRendering: "pixelated" }}
    />
  );
}
