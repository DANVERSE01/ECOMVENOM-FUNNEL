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

export function ParticleTrailCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const runningRef = useRef(false);
  const lastMoveRef = useRef(0);
  const mouseRef = useRef({ x: -100, y: -100 });
  const dotPosRef = useRef({ x: -100, y: -100 });
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    if (reducedMotion() || window.matchMedia("(pointer: coarse), (max-width: 767px)").matches) return;

    const canvas = canvasRef.current;
    const dot = dotRef.current;
    if (!canvas || !dot) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const canvasEl = canvas;
    const dotEl = dot;
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

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      lastMoveRef.current = performance.now();
      dotEl.style.opacity = "1";
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

      context.globalCompositeOperation = "screen";
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.052;
        const alpha = Math.max(0, p.life);
        context.fillStyle = `rgba(184,255,46,${alpha * 0.9})`;
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
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="particle-cursor fixed inset-0 z-[9999] pointer-events-none mix-blend-screen"
      />
      <div
        ref={dotRef}
        className="particle-cursor fixed top-0 left-0 z-[9999] pointer-events-none w-3 h-3 rounded-full bg-venom mix-blend-screen"
        style={{ boxShadow: "0 0 12px rgba(184,255,46,0.8)", opacity: 0, transform: "translate3d(-100px,-100px,0)" }}
      />
    </>
  );
}
