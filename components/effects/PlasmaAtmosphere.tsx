"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/useReducedMotion";

type PlasmaAtmosphereProps = {
  className?: string;
  intensity?: number;
  speed?: number;
  mouseDistortion?: number;
  colorStops?: string[];
};

export function PlasmaAtmosphere({
  className,
  intensity = 0.3,
  speed = 0.5,
  mouseDistortion = 0.1,
  colorStops = ["#B8FF2E", "#0A0A0B"],
}: PlasmaAtmosphereProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let t = 0;
    let mx = 0.5;
    let my = 0.5;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width;
      my = (e.clientY - r.top) / r.height;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    const c1 = colorStops[0] ?? "#B8FF2E";
    const c2 = colorStops[colorStops.length - 1] ?? "#0A0A0B";

    const draw = () => {
      t += speed * 0.004;
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);

      const cx = (0.5 + (mx - 0.5) * mouseDistortion) * w;
      const cy = (0.5 + (my - 0.5) * mouseDistortion) * h;
      const r = Math.max(w, h) * (0.6 + Math.sin(t) * 0.08 * intensity);

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0, `${c1}${Math.round(intensity * 0.55 * 255).toString(16).padStart(2, "0")}`);
      grad.addColorStop(0.5, `${c2}08`);
      grad.addColorStop(1, "transparent");

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouse);
    };
  }, [reduced, intensity, speed, mouseDistortion, colorStops]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      aria-hidden
    />
  );
}
