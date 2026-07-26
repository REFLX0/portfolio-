import { Suspense, useMemo, useRef } from 'react';
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

function GroundGrid() {
  const gridSize = 80;
  const gridDivisions = 40;
  const step = gridSize / gridDivisions;

  const lines = useMemo(() => {
    const pts: THREE.Vector3[][] = [];
    for (let i = -gridDivisions / 2; i <= gridDivisions / 2; i++) {
      const x = i * step;
      pts.push([new THREE.Vector3(x, -1, -gridSize / 2), new THREE.Vector3(x, -1, gridSize / 2)]);
      const z = i * step - gridSize / 4;
      pts.push([new THREE.Vector3(-gridSize / 2, -1, z), new THREE.Vector3(gridSize / 2, -1, z)]);
    }
    return pts;
  }, []);

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
  const count = 200;
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 60;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return arr;
  }, []);

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
  const dpr = typeof window !== 'undefined'
    ? window.innerWidth < 768
      ? Math.min(window.devicePixelRatio, 1.5)
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
        camera={{ fov: 50, near: 0.1, far: 200, position: [0, 2, 8] }}
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
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

          <EffectComposer>
            <Bloom
              luminanceThreshold={0.6}
              luminanceSmoothing={0.9}
              intensity={0.8}
              mipmapBlur
            />
            <Vignette
              eskil={false}
              offset={0.1}
              darkness={0.8}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
