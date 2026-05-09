"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { gsap } from "@/lib/gsap";

interface FloatingVslPlayerProps {
  src: string;
  onClose: () => void;
}

export function FloatingVslPlayer({ src, onClose }: FloatingVslPlayerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const closingRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Entrance: slide in from right
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
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 9500,
        width: "320px",
        height: "180px",
        borderRadius: "8px",
        border: "1px solid rgba(184,255,46,0.3)",
        background: "#060608",
        overflow: "hidden",
        boxShadow: "0 14px 40px rgba(0,0,0,0.72)",
        willChange: "transform, opacity",
      }}
      aria-label="Mini VSL Player"
      role="complementary"
    >
      {/* Responsive size via inline media via css class */}
      <style>{`
        @media (max-width: 767px) {
          .evfvp-wrap { width: 240px !important; height: 135px !important; }
        }
      `}</style>
      <div className="evfvp-wrap" style={{ width: "100%", height: "100%" }}>
        <iframe
          src={src}
          style={{ width: "100%", height: "100%", border: "none", display: "block" }}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="VSL Mini Player"
        />
      </div>

      {/* Close button */}
      <button
        type="button"
        onClick={handleClose}
        aria-label="Close mini player"
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          background: "rgba(0,0,0,0.72)",
          border: "1px solid rgba(255,255,255,0.18)",
          color: "#fff",
          fontSize: "14px",
          lineHeight: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 1,
        }}
      >
        ✕
      </button>
    </div>,
    document.body,
  );
}
