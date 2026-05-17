"use client";

import { useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const ACID = new THREE.Color("#D5D904");
const HEAT = new THREE.Color("#C74208");

function TorusKnot({
  position,
  scale,
  speed,
  p = 2,
  q = 3,
}: {
  position: [number, number, number];
  scale: number;
  speed: [number, number, number];
  p?: number;
  q?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x += dt * speed[0];
    ref.current.rotation.y += dt * speed[1];
    ref.current.rotation.z += dt * speed[2];
  });

  return (
    <Float speed={1.4} rotationIntensity={0.2} floatIntensity={1.0}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusKnotGeometry args={[1, 0.26, 140, 18, p, q]} />
        <meshStandardMaterial
          color="#050505"
          emissive={ACID}
          emissiveIntensity={1.2}
          wireframe
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
}

function SmallRing({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.x += dt * 0.18;
    ref.current.rotation.y -= dt * 0.12;
  });
  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.4}>
      <mesh ref={ref} position={position} scale={0.28}>
        <torusGeometry args={[1, 0.06, 16, 60]} />
        <meshStandardMaterial
          color="#050505"
          emissive={HEAT}
          emissiveIntensity={1.4}
          wireframe
          transparent
          opacity={0.75}
        />
      </mesh>
    </Float>
  );
}

function ParticleCloud() {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const count = 140;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3.5 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, []);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.035;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        color={ACID}
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
}

function MouseCamera() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, dt) => {
    const target = new THREE.Vector3(mouse.current.x * 1.0, mouse.current.y * 0.6, 6);
    camera.position.lerp(target, dt * 1.2);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export function HeroScene() {
  return (
    <Canvas
      dpr={[1, Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 1.5)]}
      camera={{ position: [0, 0, 6], fov: 52 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <ambientLight intensity={0.15} />
      <pointLight position={[4, 6, 4]} intensity={3} color={ACID} />
      <pointLight position={[-5, -4, -2]} intensity={1.5} color={HEAT} />
      <pointLight position={[0, 0, 3]} intensity={0.8} color="#ffffff" />

      <MouseCamera />
      <ParticleCloud />

      <TorusKnot position={[2.4, 0.7, -1.5]} scale={0.72} speed={[0.10, 0.07, 0.04]} p={2} q={3} />
      <TorusKnot position={[-2.0, -0.4, -2.5]} scale={0.50} speed={[-0.06, 0.13, 0.05]} p={3} q={5} />
      <TorusKnot position={[0.3, -1.8, -0.8]} scale={0.38} speed={[0.09, -0.10, 0.08]} p={2} q={7} />
      <SmallRing position={[-1.2, 1.8, -1]} />
      <SmallRing position={[3.2, -1.2, -2]} />
    </Canvas>
  );
}
