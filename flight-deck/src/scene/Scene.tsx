import { Suspense, useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useFlightStore } from '../store/useFlightStore';
import { profile } from '../data/profile';
import { waypoints } from '../data/profile';
import Lighting from './Lighting';
import Drone from './Drone';
import CameraRig from './CameraRig';
import { flightCurve } from './FlightPath';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return isMobile;
}

function GroundGrid() {
  const gridSize = 80;
  const gridDivisions = 40;
  const step = gridSize / gridDivisions;
  const isMobile = useIsMobile();

  const lines = useMemo(() => {
    const pts: THREE.Vector3[][] = [];
    const divs = isMobile ? 20 : gridDivisions;
    const size = isMobile ? 40 : gridSize;
    const s = size / divs;
    for (let i = -divs / 2; i <= divs / 2; i++) {
      const x = i * s;
      pts.push([new THREE.Vector3(x, -1, -size / 2), new THREE.Vector3(x, -1, size / 2)]);
      const z = i * s - size / 4;
      pts.push([new THREE.Vector3(-size / 2, -1, z), new THREE.Vector3(size / 2, -1, z)]);
    }
    return pts;
  }, [isMobile]);

  return (
    <group>
      {lines.map((pts, i) => (
        <Line
          key={i}
          points={pts}
          color="#243139"
          lineWidth={0.5}
          transparent
          opacity={0.15}
        />
      ))}
    </group>
  );
}

function FlightPathLine() {
  const scrollProgress = useFlightStore((s) => s.scrollProgress);
  const reducedMotion = useFlightStore((s) => s.reducedMotion);

  if (reducedMotion) return null;

  const points = flightCurve.getPoints(100);
  const visibleCount = Math.floor(points.length * scrollProgress);
  if (visibleCount < 2) return null;

  const visiblePoints = points.slice(0, Math.max(visibleCount, 2));

  return (
    <Line
      points={visiblePoints}
      color="#F2A63D"
      lineWidth={1}
      transparent
      opacity={0.2}
    />
  );
}

function Particles() {
  const isMobile = useIsMobile();
  const count = isMobile ? 60 : 200;
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const spread = isMobile ? 30 : 60;
    const height = isMobile ? 10 : 20;
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * spread;
      arr[i * 3 + 1] = (Math.random() - 0.5) * height;
      arr[i * 3 + 2] = (Math.random() - 0.5) * spread;
    }
    return arr;
  }, [count, isMobile]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#6FC7D4"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

interface SceneProps {
  showHotspots: boolean;
  onHotspotClick?: (part: string, label: string, blurb: string) => void;
}

export default function Scene({ showHotspots, onHotspotClick }: SceneProps) {
  const isMobile = useIsMobile();
  const dpr = typeof window !== 'undefined'
    ? isMobile
      ? 1
      : Math.min(window.devicePixelRatio, 2)
    : 1;

  const sectionSummary = waypoints
    .map((wp) => `${wp.code}: ${wp.label}`)
    .join(', ');

  return (
    <div className="canvas-layer">
      <div className="sr-only" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
        Interactive 3D portfolio of {profile.meta.name}. A drone flies through six waypoints: {sectionSummary}.
      </div>
      <Canvas
        camera={{ fov: isMobile ? 60 : 50, near: 0.1, far: 200, position: [0, 2, 8] }}
        dpr={dpr}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Environment files="/env.hdr" background={false} />
          <Lighting />
          <GroundGrid />
          <FlightPathLine />
          <Particles />
          <Drone showHotspots={showHotspots} onHotspotClick={onHotspotClick} />
          <CameraRig />
          <fog attach="fog" args={['#0A0D0F', 15, 60]} />

          {/* Only bloom on desktop — skip on mobile for performance */}
          <EffectComposer>
            <Bloom
              luminanceThreshold={0.6}
              luminanceSmoothing={0.9}
              intensity={isMobile ? 0.3 : 0.8}
              mipmapBlur
            />
            <Vignette
              eskil={false}
              offset={0.1}
              darkness={isMobile ? 0.5 : 0.8}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}