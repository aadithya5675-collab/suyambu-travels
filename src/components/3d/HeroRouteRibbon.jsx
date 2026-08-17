import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function RibbonCurve({ mouse }) {
  const meshRef = useRef(null);
  const elapsedRef = useRef(0);

  // Generate a smooth 3D road/ribbon spline
  const geometry = useMemo(() => {
    const points = [
      new THREE.Vector3(-4, -2, -2),
      new THREE.Vector3(-2, -0.5, 0),
      new THREE.Vector3(0.5, 0.8, -0.5),
      new THREE.Vector3(2.5, -0.2, 1),
      new THREE.Vector3(4.5, 1.5, -1)
    ];

    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 64, 0.04, 8, false);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    elapsedRef.current += delta;
    
    // Gentle continuous floating drift
    meshRef.current.rotation.y += delta * 0.05;
    meshRef.current.rotation.x = Math.sin(elapsedRef.current * 0.3) * 0.04;

    // Subtle pointer parallax response
    if (mouse.current) {
      meshRef.current.position.x += (mouse.current.x * 0.4 - meshRef.current.position.x) * 0.03;
      meshRef.current.position.y += (-mouse.current.y * 0.3 - meshRef.current.position.y) * 0.03;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[1.5, 0, 0]}>
      <meshBasicMaterial
        color="#8FA893"
        transparent
        opacity={0.32}
        wireframe={false}
      />
    </mesh>
  );
}

function FloatingMarker({ position, delay = 0 }) {
  const ref = useRef(null);
  const elapsedRef = useRef(0);

  useFrame((_, delta) => {
    if (!ref.current) return;
    elapsedRef.current += delta;
    ref.current.position.y = position[1] + Math.sin(elapsedRef.current * 1.2 + delay) * 0.08;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.06, 12, 12]} />
      <meshBasicMaterial color="#E8E2D2" transparent opacity={0.6} />
    </mesh>
  );
}

export default function HeroRouteRibbon({ isVisible = true, dpr = 1.5 }) {
  const containerRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const shouldRender = isVisible;

  return (
    <div
      ref={containerRef}
      className="hero-3d-ribbon-canvas"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden'
      }}
      aria-hidden="true"
    >
      {shouldRender && (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, Math.min(dpr, 1.5)]}
          gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
          frameloop="always"
        >
          <ambientLight intensity={0.5} />
          <RibbonCurve mouse={mouse} />
          <FloatingMarker position={[0.5, 0.8, -0.5]} delay={0} />
          <FloatingMarker position={[2.5, -0.2, 1]} delay={1.5} />
        </Canvas>
      )}
    </div>
  );
}
