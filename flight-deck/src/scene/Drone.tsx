import { useRef, useMemo, useState, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useFlightStore } from '../store/useFlightStore';
import { getFlightTransform } from './FlightPath';
import { profile } from '../data/profile';

/*
 * 3D Model Credit:
 * "Dji FPV by SDC - High performance drone" by SDC PERFORMANCE™
 * https://sketchfab.com/3d-models/dji-fpv-by-sdc-high-performance-drone-d471ea8c6235457b8e131842e2cf3783
 * Licensed under CC-BY-4.0
 */

const GLTF_URL = '/drone/scene.gltf';
const PROP_SPIN_SPEED = 30;

useGLTF.preload(GLTF_URL);

interface DroneProps {
  showHotspots?: boolean;
  onHotspotClick?: (part: string, label: string, blurb: string) => void;
}

function HotspotMarker({
  position,
  part,
  label,
  blurb,
  onClick,
}: {
  position: [number, number, number];
  part: string;
  label: string;
  blurb: string;
  onClick?: (part: string, label: string, blurb: string) => void;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (ref.current) {
      const pulse = 0.8 + 0.2 * Math.sin(clock.elapsedTime * 3);
      const s = hovered ? 1.5 : pulse;
      ref.current.scale.setScalar(s);
    }
  });

  return (
    <mesh
      ref={ref}
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
      onClick={(e) => { e.stopPropagation(); onClick?.(part, label, blurb); }}
    >
      <sphereGeometry args={[0.08, 12, 12]} />
      <meshStandardMaterial
        color="#F2A63D"
        emissive="#F2A63D"
        emissiveIntensity={3}
        toneMapped={false}
      />
    </mesh>
  );
}

function DroneModel({ showHotspots, onHotspotClick }: DroneProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const scrollProgress = useFlightStore((s) => s.scrollProgress);
  const reducedMotion = useFlightStore((s) => s.reducedMotion);

  const { scene } = useGLTF(GLTF_URL);

  // Collect references to propeller nodes for spinning
  const propRefs = useRef<THREE.Object3D[]>([]);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    propRefs.current = [];

    clone.traverse((child) => {
      // Collect propeller/spinning nodes by name pattern
      const name = child.name.toLowerCase();
      if (
        name.includes('spin') ||
        name.includes('spine') ||
        name.includes('pneu')
      ) {
        propRefs.current.push(child);
      }

      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat.isMeshStandardMaterial) {
          mat.envMapIntensity = 1.2;
          mat.needsUpdate = true;
        }
      }
    });
    return clone;
  }, [scene]);

  // Spin propellers + move drone along flight path
  useFrame((state, delta) => {
    // Spin propellers
    if (!reducedMotion) {
      propRefs.current.forEach((prop, i) => {
        // Alternate spin direction: even = CW, odd = CCW
        const dir = i % 2 === 0 ? 1 : -1;
        prop.rotation.y += PROP_SPIN_SPEED * dir * delta;
      });
    }

    if (!groupRef.current) return;
    const clock = state.clock;

    if (reducedMotion) {
      const t = clock.elapsedTime;
      groupRef.current.position.y = 0.3 + Math.sin(t * 0.8) * 0.1;
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.05;
      groupRef.current.rotation.x = 0;
      groupRef.current.rotation.z = 0;
      return;
    }

    if (scrollProgress < 0.02) {
      const t = clock.elapsedTime;
      groupRef.current.position.set(
        Math.sin(t * 0.4) * 0.15,
        0.3 + Math.sin(t * 0.8) * 0.1,
        Math.cos(t * 0.3) * 0.1,
      );
      groupRef.current.rotation.set(
        Math.sin(t * 0.5) * 0.02,
        Math.sin(t * 0.3) * 0.05,
        0,
      );
    } else {
      const { position, rotation } = getFlightTransform(scrollProgress);
      groupRef.current.position.copy(position);
      groupRef.current.rotation.x = rotation.x;
      groupRef.current.rotation.y = rotation.y;
      groupRef.current.rotation.z = rotation.z;

      const t = clock.elapsedTime;
      groupRef.current.position.y += Math.sin(t * 1.2) * 0.03;
    }
  });

  const hotspotData = profile.flagship.hotspots;
  const hotspotPositions: Record<string, [number, number, number]> = {
    flightController: [0, 0.1, 0],
    onboardComputer: [0.12, 0.1, -0.12],
    visionPayload: [0, -0.1, 0.25],
    motorsEscs: [0.4, 0.08, 0.4],
    groundLink: [-0.12, 0.1, 0.12],
  };

  return (
    <group ref={groupRef} scale={1.1}>
      <primitive object={clonedScene} />

      {showHotspots &&
        hotspotData.map((hs) => {
          const pos = hotspotPositions[hs.part] ?? [0, 0.3, 0];
          return (
            <HotspotMarker
              key={hs.part}
              position={pos as [number, number, number]}
              part={hs.part}
              label={hs.label}
              blurb={hs.blurb}
              onClick={onHotspotClick}
            />
          );
        })}
    </group>
  );
}

export default function Drone(props: DroneProps) {
  return (
    <Suspense fallback={null}>
      <DroneModel {...props} />
    </Suspense>
  );
}
