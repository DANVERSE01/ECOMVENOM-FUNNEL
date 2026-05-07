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

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      for (let i = 0; i < 2; i++) {
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          life: 1,
          size: 1.5 + Math.random() * 2,
        });
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    const loop = () => {
      rafRef.current = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      dotPosRef.current.x += (mouseRef.current.x - dotPosRef.current.x) * 0.18;
      dotPosRef.current.y += (mouseRef.current.y - dotPosRef.current.y) * 0.18;
      dot.style.transform = `translate(${dotPosRef.current.x - 6}px, ${dotPosRef.current.y - 6}px)`;

      ctx.globalCompositeOperation = "screen";
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.035;
        const alpha = Math.max(0, p.life);
        ctx.fillStyle = `rgba(184,255,46,${alpha})`;
        ctx.shadowColor = "#B8FF2E";
        ctx.shadowBlur = p.size * 3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    };
    loop();

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
        style={{ boxShadow: "0 0 12px rgba(184,255,46,0.8)" }}
      />
    </>
  );
}
