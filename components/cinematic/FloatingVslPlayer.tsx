"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap, reducedMotion } from "@/lib/gsap";

interface FloatingVslPlayerProps {
  src: string;
  onClose: () => void;
}

export function FloatingVslPlayer({ src, onClose }: FloatingVslPlayerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const closingRef = useRef(false);

  useEffect(() => {
    document.body.dataset.heroVslOpen = "true";

    return () => {
      delete document.body.dataset.heroVslOpen;
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (reducedMotion()) return;

    gsap.fromTo(
      el,
      { x: "120%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 0.4, ease: "power3.out" },
    );
  }, []);

  function handleClose() {
    if (closingRef.current) return;
    closingRef.current = true;
    const el = containerRef.current;
    if (!el) { onClose(); return; }
    if (reducedMotion()) { onClose(); return; }

    gsap.to(el, {
      x: "120%",
      opacity: 0,
      duration: 0.32,
      ease: "power3.in",
      onComplete: onClose,
    });
  }

  return createPortal(
    <div
      ref={containerRef}
      className="vx-floating-vsl"
      style={{ willChange: "transform, opacity" }}
      aria-label="Mini VSL Player"
      role="complementary"
    >
      <div style={{ width: "100%", height: "100%" }}>
        <iframe
          src={src}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="VSL Mini Player"
        />
      </div>

      <button
        type="button"
        onClick={handleClose}
        aria-label="Close mini player"
        className="vx-floating-vsl__close"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="M3.25 3.25L10.75 10.75M10.75 3.25L3.25 10.75" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>
    </div>,
    document.body,
  );
}
