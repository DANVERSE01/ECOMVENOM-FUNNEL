"use client";

import { useEffect, useRef } from "react";
import { reducedMotion } from "@/lib/gsap";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
}

const ACID = "213,217,4";

export function ParticleTrailCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const runningRef = useRef(false);
  const lastMoveRef = useRef(0);
  const mouseRef = useRef({ x: -100, y: -100 });
  const dotPosRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    if (reducedMotion() || window.matchMedia("(pointer: coarse), (max-width: 767px)").matches) return;

    const canvas = canvasRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!canvas || !dot || !ring) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const canvasEl = canvas;
    const dotEl = dot;
    const ringEl = ring;
    const context = ctx;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvasEl.width = Math.floor(window.innerWidth * dpr);
      canvasEl.height = Math.floor(window.innerHeight * dpr);
      canvasEl.style.width = `${window.innerWidth}px`;
      canvasEl.style.height = `${window.innerHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const startLoop = () => {
      if (runningRef.current) return;
      runningRef.current = true;
      rafRef.current = requestAnimationFrame(loop);
    };

    // hover targets
    const handleHoverIn = (e: MouseEvent) => {
      const t = e.target as Element;
      if (!t || !ringEl) return;
      if (t.closest("a, button")) {
        ringEl.style.width = "36px";
        ringEl.style.height = "36px";
        ringEl.style.borderColor = `rgba(${ACID},0.7)`;
      } else if (t.closest("h1, h2, h3")) {
        ringEl.style.width = "48px";
        ringEl.style.height = "28px";
        ringEl.style.borderColor = "rgba(255,255,255,0.3)";
      }
    };
    const handleHoverOut = () => {
      ringEl.style.width = "24px";
      ringEl.style.height = "24px";
      ringEl.style.borderColor = "rgba(255,255,255,0.25)";
    };
    document.addEventListener("mouseover", handleHoverIn, { passive: true });
    document.addEventListener("mouseout", handleHoverOut, { passive: true });

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      lastMoveRef.current = performance.now();
      dotEl.style.opacity = "1";
      ringEl.style.opacity = "1";
      if (particlesRef.current.length < 34) {
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 0.85,
          vy: (Math.random() - 0.5) * 0.85,
          life: 1,
          size: 1.2 + Math.random() * 1.6,
        });
      }
      startLoop();
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    function loop() {
      context.clearRect(0, 0, canvasEl.width, canvasEl.height);

      dotPosRef.current.x += (mouseRef.current.x - dotPosRef.current.x) * 0.18;
      dotPosRef.current.y += (mouseRef.current.y - dotPosRef.current.y) * 0.18;
      dotEl.style.transform = `translate3d(${dotPosRef.current.x - 6}px, ${dotPosRef.current.y - 6}px, 0)`;

      // ring follows at slower lerp
      const rw = parseInt(ringEl.style.width || "24") / 2;
      const rh = parseInt(ringEl.style.height || "24") / 2;
      ringPosRef.current.x += (mouseRef.current.x - ringPosRef.current.x) * 0.12;
      ringPosRef.current.y += (mouseRef.current.y - ringPosRef.current.y) * 0.12;
      ringEl.style.transform = `translate3d(${ringPosRef.current.x - rw}px, ${ringPosRef.current.y - rh}px, 0)`;

      context.globalCompositeOperation = "screen";
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.052;
        const alpha = Math.max(0, p.life);
        context.fillStyle = `rgba(${ACID},${alpha * 0.9})`;
        context.beginPath();
        context.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        context.fill();
      }

      const cursorSettled =
        Math.abs(mouseRef.current.x - dotPosRef.current.x) < 0.5 &&
        Math.abs(mouseRef.current.y - dotPosRef.current.y) < 0.5;
      const idle = performance.now() - lastMoveRef.current > 180 && particlesRef.current.length === 0 && cursorSettled;

      if (idle) {
        runningRef.current = false;
        return;
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleHoverIn);
      document.removeEventListener("mouseout", handleHoverOut);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{ position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none", mixBlendMode: "screen", display: "block" }}
      />
      <div
        ref={dotRef}
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 9999, pointerEvents: "none",
          width: 12, height: 12, borderRadius: "50%",
          background: `rgb(${ACID})`, mixBlendMode: "screen",
          boxShadow: `0 0 14px rgba(${ACID},0.9)`,
          opacity: 0, transform: "translate3d(-100px,-100px,0)",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed", top: 0, left: 0, zIndex: 9998, pointerEvents: "none",
          width: "24px", height: "24px", borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.25)",
          opacity: 0, transform: "translate3d(-100px,-100px,0)",
          transition: "width 0.25s ease, height 0.25s ease, border-color 0.25s ease",
        }}
      />
    </>
  );
}

