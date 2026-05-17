"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const ACID = 0xd5d904;
const HEAT = 0xc74208;

export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      52,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 6);

    // --- Torus Knots (wireframe, acid green) ---
    const knotGeo = new THREE.TorusKnotGeometry(0.8, 0.25, 128, 16, 2, 3);
    const knotMat = new THREE.MeshBasicMaterial({
      color: ACID,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });

    const knot1 = new THREE.Mesh(knotGeo, knotMat);
    knot1.position.set(2.4, 0.7, -1.5);
    knot1.scale.setScalar(0.72);

    const knot2 = new THREE.Mesh(knotGeo, knotMat.clone());
    knot2.position.set(-2.0, -0.4, -2.5);
    knot2.scale.setScalar(0.5);

    const knotGeo3 = new THREE.TorusKnotGeometry(0.8, 0.25, 128, 16, 3, 5);
    const knot3 = new THREE.Mesh(knotGeo3, knotMat.clone());
    knot3.position.set(0.3, -1.8, -0.8);
    knot3.scale.setScalar(0.38);

    scene.add(knot1, knot2, knot3);

    // --- Small Rings (wireframe, heat orange) ---
    const ringGeo = new THREE.TorusGeometry(0.3, 0.08, 16, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: HEAT,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });

    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.position.set(-1.2, 1.8, -1);
    ring1.scale.setScalar(0.9);

    const ring2 = new THREE.Mesh(ringGeo, ringMat.clone());
    ring2.position.set(3.2, -1.2, -2);
    ring2.scale.setScalar(0.7);

    scene.add(ring1, ring2);

    // --- Particles (spherical distribution) ---
    const particleCount = 140;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 3.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: ACID,
      size: 0.04,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Lights ---
    const light1 = new THREE.PointLight(ACID, 2, 10);
    light1.position.set(4, 6, 4);
    const light2 = new THREE.PointLight(HEAT, 1.5, 8);
    light2.position.set(-5, -4, -2);
    const light3 = new THREE.PointLight(0xffffff, 0.5, 12);
    light3.position.set(0, 0, 5);
    const ambient = new THREE.AmbientLight(0x111111, 0.3);
    scene.add(light1, light2, light3, ambient);

    // --- Mouse tracking ---
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // --- Resize ---
    const ro = new ResizeObserver(() => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
    ro.observe(container);

    // --- Animation loop ---
    let frameId = 0;

    if (reducedMotion) {
      renderer.render(scene, camera);
    } else {
      const animate = () => {
        frameId = requestAnimationFrame(animate);

        knot1.rotation.x += 0.003;
        knot1.rotation.y += 0.005;
        knot2.rotation.x -= 0.004;
        knot2.rotation.y += 0.006;
        knot3.rotation.x += 0.005;
        knot3.rotation.z += 0.003;

        ring1.rotation.x += 0.01;
        ring1.rotation.y -= 0.007;
        ring2.rotation.x -= 0.008;
        ring2.rotation.y += 0.01;

        particles.rotation.y += 0.0008;

        camera.position.x += (mouse.x * 0.8 - camera.position.x) * 0.02;
        camera.position.y += (mouse.y * 0.5 - camera.position.y) * 0.02;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      };
      animate();
    }

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      ro.disconnect();

      knotGeo.dispose();
      knotGeo3.dispose();
      ringGeo.dispose();
      particleGeo.dispose();
      knotMat.dispose();
      ringMat.dispose();
      particleMat.dispose();
      knot2.material instanceof THREE.Material && knot2.material.dispose();
      knot3.material instanceof THREE.Material && knot3.material.dispose();
      ring2.material instanceof THREE.Material && ring2.material.dispose();

      renderer.dispose();
      try { container.removeChild(renderer.domElement); } catch {}
    };
  }, []);

  return <div ref={containerRef} className="v2-hero__scene-inner" />;
}
