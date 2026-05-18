"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ScrollTrigger } from "@/lib/gsap";

const ACID = 0xd5d904;
const HEAT = 0xc74208;
const SIGNAL_COUNT = 100;

/**
 * HeroScene — "Decision Convergence" scene.
 *
 * Encodes the ECOMVENOM brand metaphor: ambient signals drifting from
 * peripheral chaos converge into a single decision point as the user scrolls.
 *
 * - 100 acid-lime signal points distributed in a hemisphere behind the
 *   headline anchor. Each has a noise-driven jitter that fades out as
 *   convergence increases, so the lock-in feels organic.
 * - One additive-blended acid glow plane at the convergence point.
 * - One small heat accent plane near the convergence point at low opacity.
 * - Convergence amplitude is driven by GSAP ScrollTrigger (scrub).
 * - Under prefers-reduced-motion: render one static frame at half-convergence
 *   and never start the requestAnimationFrame loop.
 *
 * Mobile gating is handled at the call site (HeroSection.tsx) via
 * useMediaQuery("(min-width: 769px)") + next/dynamic — this component is
 * never mounted below 769 px.
 */
export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // --- Scene + camera ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      48,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 6);

    // --- Signal field ---
    // Hemisphere behind the headline anchor (negative z, slightly offset).
    // Each signal stores its origin position (peripheral chaos) and lerps
    // toward (0, 0, 0) — the convergence point — based on progress.
    const origins = new Float32Array(SIGNAL_COUNT * 3);
    const positions = new Float32Array(SIGNAL_COUNT * 3);
    const jitterPhases = new Float32Array(SIGNAL_COUNT);
    const jitterSeeds = new Float32Array(SIGNAL_COUNT * 3);

    for (let i = 0; i < SIGNAL_COUNT; i++) {
      // Hemisphere distribution: r in [3.6, 6.4], theta full 2π, phi in upper hemisphere
      const r = 3.6 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const ox = r * Math.sin(phi) * Math.cos(theta);
      const oy = r * Math.sin(phi) * Math.sin(theta) * 0.7; // flatten y for editorial composition
      const oz = -1.5 - Math.random() * 3.5; // pushed behind the convergence plane

      origins[i * 3] = ox;
      origins[i * 3 + 1] = oy;
      origins[i * 3 + 2] = oz;

      positions[i * 3] = ox;
      positions[i * 3 + 1] = oy;
      positions[i * 3 + 2] = oz;

      jitterPhases[i] = Math.random() * Math.PI * 2;
      jitterSeeds[i * 3] = (Math.random() - 0.5) * 2;
      jitterSeeds[i * 3 + 1] = (Math.random() - 0.5) * 2;
      jitterSeeds[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }

    const signalGeometry = new THREE.BufferGeometry();
    signalGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const signalMaterial = new THREE.PointsMaterial({
      color: ACID,
      size: 0.06,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const signals = new THREE.Points(signalGeometry, signalMaterial);
    scene.add(signals);

    // --- Convergence glow plane (acid lime, additive) ---
    const glowGeometry = new THREE.PlaneGeometry(1.2, 1.2);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: ACID,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.set(0, 0, 0);
    scene.add(glow);

    // --- Heat accent (single small plane, capped per directive) ---
    const heatGeometry = new THREE.PlaneGeometry(0.5, 0.5);
    const heatMaterial = new THREE.MeshBasicMaterial({
      color: HEAT,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const heat = new THREE.Mesh(heatGeometry, heatMaterial);
    heat.position.set(0.45, -0.18, 0.0);
    scene.add(heat);

    // --- Mouse parallax (subtle camera drift; disabled under reduced motion) ---
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(event.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!reducedMotion) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }

    // --- Resize ---
    const ro = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
    ro.observe(container);

    // --- Scroll progress (driven by GSAP ScrollTrigger) ---
    let progress = reducedMotion ? 0.5 : 0;
    const heroSection =
      (container.closest(".v2-hero") as HTMLElement | null) ??
      (document.querySelector(".v2-hero") as HTMLElement | null);

    let scrollTrigger: ScrollTrigger | null = null;
    if (!reducedMotion && heroSection) {
      scrollTrigger = ScrollTrigger.create({
        trigger: heroSection,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          progress = self.progress;
        },
      });
    }

    // --- Per-frame update ---
    const positionsAttr = signalGeometry.getAttribute("position") as THREE.BufferAttribute;

    const updateSignals = (time: number) => {
      // Smooth-step the raw scroll progress so convergence eases in
      const eased = progress * progress * (3 - 2 * progress);
      // Jitter dies away as convergence locks in
      const jitterAmp = 0.18 * (1 - eased);

      for (let i = 0; i < SIGNAL_COUNT; i++) {
        const ox = origins[i * 3];
        const oy = origins[i * 3 + 1];
        const oz = origins[i * 3 + 2];
        const phase = jitterPhases[i];
        const sx = jitterSeeds[i * 3];
        const sy = jitterSeeds[i * 3 + 1];
        const sz = jitterSeeds[i * 3 + 2];

        // Lerp from origin toward convergence (0,0,0) by eased progress
        const baseX = ox * (1 - eased);
        const baseY = oy * (1 - eased);
        const baseZ = oz * (1 - eased);

        // Organic noise jitter (sinusoidal, phase-offset per signal)
        const t = time * 0.0006;
        const jx = Math.sin(t + phase) * sx * jitterAmp;
        const jy = Math.cos(t + phase * 1.3) * sy * jitterAmp;
        const jz = Math.sin(t * 0.7 + phase * 0.6) * sz * jitterAmp * 0.5;

        positions[i * 3] = baseX + jx;
        positions[i * 3 + 1] = baseY + jy;
        positions[i * 3 + 2] = baseZ + jz;
      }
      positionsAttr.needsUpdate = true;

      // Convergence glow ramps up with progress, with a small idle baseline
      const glowOpacity = 0.05 + eased * 0.55;
      glowMaterial.opacity = glowOpacity;
      const glowScale = 0.6 + eased * 0.9;
      glow.scale.setScalar(glowScale);

      // Heat accent only emerges in the last third of the journey
      const heatProgress = Math.max(0, eased - 0.55) / 0.45;
      heatMaterial.opacity = heatProgress * 0.35;
      heat.scale.setScalar(0.55 + heatProgress * 0.6);

      // Subtle signal opacity rise as they tighten
      signalMaterial.opacity = 0.45 + eased * 0.2;

      // Camera parallax (skip in reduced-motion since mouse listener is off)
      if (!reducedMotion) {
        camera.position.x += (mouse.x * 0.55 - camera.position.x) * 0.025;
        camera.position.y += (mouse.y * 0.35 - camera.position.y) * 0.025;
        camera.lookAt(0, 0, 0);
      }
    };

    // --- Animation loop ---
    let frameId = 0;

    if (reducedMotion) {
      // Single static render at half-convergence; no RAF loop.
      updateSignals(0);
      renderer.render(scene, camera);
    } else {
      const animate = (time: number) => {
        frameId = requestAnimationFrame(animate);
        updateSignals(time);
        renderer.render(scene, camera);
      };
      frameId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      ro.disconnect();
      scrollTrigger?.kill();

      signalGeometry.dispose();
      signalMaterial.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
      heatGeometry.dispose();
      heatMaterial.dispose();
      renderer.dispose();

      // React unmount-race guard (preserved from commit 7efe97a)
      try {
        container.removeChild(renderer.domElement);
      } catch {
        /* noop */
      }
    };
  }, []);

  return <div ref={containerRef} className="v2-hero__scene-inner" />;
}
