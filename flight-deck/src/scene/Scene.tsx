import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { useFlightStore } from '../store/useFlightStore';
import { profile } from '../data/profile';
import { waypoints } from '../data/profile';
import Lighting from './Lighting';
import Drone from './Drone';
import CameraRig from './CameraRig';
import { flightCurve, waypointPositions } from './FlightPath';

function GroundGrid() {
  const gridSize = 80;
  const gridDivisions = 40;
  const step = gridSize / gridDivisions;

  const lines = useMemo(() => {
    const pts: THREE.Vector3[][] = [];
    for (let i = -gridDivisions / 2; i <= gridDivisions / 2; i++) {
      const x = i * step;
      pts.push([new THREE.Vector3(x, -1, -gridSize / 2), new THREE.Vector3(x, -1, gridSize / 2)]);
      const z = i * step - gridSize / 4; // offset to follow the drone path
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

  // Show the portion of the path already flown
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
      {/* Accessible text alternative for the WebGL scene */}
      <div className="sr-only" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
        Interactive 3D portfolio of {profile.meta.name}. A procedural drone flies through six waypoints: {sectionSummary}.
      </div>
      <Canvas
        camera={{ fov: 50, near: 0.1, far: 200, position: [0, 2, 8] }}
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Lighting />
          <GroundGrid />
          <FlightPathLine />
          <Drone showHotspots={showHotspots} onHotspotClick={onHotspotClick} />
          <CameraRig />
          {/* Fog for depth */}
          <fog attach="fog" args={['#0A0D0F', 15, 60]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
