"use client";

import { useEffect } from "react";

// Maps scene element IDs to data-scene attribute values for ambient CSS
const SCENE_MAP: Record<string, string> = {
  "chaos-input": "problem",
  operator: "founder",
  "book-the-call": "final",
  "proof-gate": "proof",
  offer: "offer",
};

export function SceneObserver() {
  useEffect(() => {
    const els = Object.keys(SCENE_MAP)
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).id;
            document.documentElement.dataset.scene = SCENE_MAP[id] ?? "";
          }
        }
      },
      { threshold: 0.3 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
