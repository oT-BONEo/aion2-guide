"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count: number;
}

function ParticleField({ count }: ParticleFieldProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const mouseRef = useRef(new THREE.Vector3(0, 0, 0));

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Particle state: position, velocity, phase for sine wave
  const particles = useMemo(() => {
    const data: {
      x: number;
      y: number;
      z: number;
      speed: number;
      phase: number;
      amplitude: number;
    }[] = [];
    for (let i = 0; i < count; i++) {
      data.push({
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 20,
        z: (Math.random() - 0.5) * 10,
        speed: 0.1 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
        amplitude: 0.2 + Math.random() * 0.5,
      });
    }
    return data;
  }, [count]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.set(x * 10, y * 10, 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    for (let i = 0; i < count; i++) {
      const p = particles[i];

      // Upward drift
      p.y += p.speed * delta * 0.5;

      // Sine-wave oscillation
      p.x += Math.sin(Date.now() * 0.001 + p.phase) * p.amplitude * delta;

      // Wrap around vertically
      if (p.y > 10) p.y = -10;

      // Mouse repulsion
      const dx = p.x - mouseRef.current.x;
      const dy = p.y - mouseRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 3 && dist > 0.01) {
        const force = (3 - dist) * 0.02;
        p.x += (dx / dist) * force;
        p.y += (dy / dist) * force;
      }

      dummy.position.set(p.x, p.y, p.z);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.06, 8, 8]} />
      <meshBasicMaterial color="#A88BFA" transparent opacity={0.6} />
    </instancedMesh>
  );
}

export function AetherField() {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handleChange = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handleChange);

    return () => {
      window.removeEventListener("resize", checkMobile);
      mq.removeEventListener("change", handleChange);
    };
  }, []);

  const particleCount = isMobile ? 25 : 100;

  // Fallback for reduced-motion preference
  if (prefersReducedMotion) {
    return (
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(168, 139, 250, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(91, 155, 213, 0.06) 0%, transparent 50%), var(--bg-abyss)",
        }}
      />
    );
  }

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ alpha: true, antialias: false }}
        style={{ background: "transparent" }}
      >
        <fogExp2 attach="fog" args={["#050507", 0.035]} />
        <ambientLight intensity={0.3} />
        <pointLight
          position={[-5, 2, 3]}
          color="#F0C75E"
          intensity={1.5}
          distance={15}
        />
        <pointLight
          position={[5, -2, 3]}
          color="#5B9BD5"
          intensity={1.5}
          distance={15}
        />
        <ParticleField count={particleCount} />
      </Canvas>
    </div>
  );
}
