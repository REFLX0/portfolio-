import { useRef, useMemo, useState, useEffect, Suspense } from 'react';
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
const PROP_SPIN_SPEED = 25;

// Preload the model
useGLTF.preload(GLTF_URL);

interface DroneProps {
  showHotspots?: boolean;
  onHotspotClick?: (part: string, label: string, blurb: string) => void;
}

// Spinning propeller disc — replaces static prop meshes
function PropellerDisc({ position }: { position: THREE.Vector3 }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += PROP_SPIN_SPEED * delta;
    }
  });

  return (
    <mesh ref={ref} position={position} rotation={[0, 0, 0]}>
      <cylinderGeometry args={[0.55, 0.55, 0.01, 32]} />
      <meshStandardMaterial
        color="#0a0a0a"
        transparent
        opacity={0.25}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

// Propeller blur disc — semi-transparent spinning effect
function PropBlur({ position }: { position: THREE.Vector3 }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.z += PROP_SPIN_SPEED * 0.5 * delta;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <circleGeometry args={[0.5, 32]} />
      <meshStandardMaterial
        color="#6FC7D4"
        transparent
        opacity={0.06}
        side={THREE.DoubleSide}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

// LED navigation lights
function NavLights() {
  const frontLeftRef = useRef<THREE.PointLight>(null!);
  const frontRightRef = useRef<THREE.PointLight>(null!);
  const rearRef = useRef<THREE.PointLight>(null!);

  useFrame(({ clock }) => {
    const pulse = 0.5 + 0.5 * Math.sin(clock.elapsedTime * 4);
    if (frontLeftRef.current) frontLeftRef.current.intensity = 2 + pulse * 3;
    if (frontRightRef.current) frontRightRef.current.intensity = 2 + pulse * 3;
    if (rearRef.current) rearRef.current.intensity = 1 + pulse * 2;
  });

  return (
    <>
      {/* Front-left — green (port) */}
      <pointLight ref={frontLeftRef} position={[0.6, 0.1, 0.6]} color="#00ff44" distance={3} decay={2} />
      <mesh position={[0.6, 0.1, 0.6]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#00ff44" emissive="#00ff44" emissiveIntensity={4} toneMapped={false} />
      </mesh>

      {/* Front-right — red (starboard) */}
      <pointLight ref={frontRightRef} position={[-0.6, 0.1, 0.6]} color="#ff2200" distance={3} decay={2} />
      <mesh position={[-0.6, 0.1, 0.6]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#ff2200" emissive="#ff2200" emissiveIntensity={4} toneMapped={false} />
      </mesh>

      {/* Rear — white strobe */}
      <pointLight ref={rearRef} position={[0, 0.1, -0.7]} color="#ffffff" distance={4} decay={2} />
      <mesh position={[0, 0.1, -0.7]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={6} toneMapped={false} />
      </mesh>
    </>
  );
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

  // Load the GLTF model
  const { scene } = useGLTF(GLTF_URL);

  // Clone the scene so we can modify materials safely
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        // Enhance materials with better metalness/roughness for our dark scene
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat.isMeshStandardMaterial) {
          mat.envMapIntensity = 1.5;
          mat.needsUpdate = true;
        }
      }
    });
    return clone;
  }, [scene]);

  // Propeller positions on the DJI FPV (approximate)
  const propPositions = useMemo(() => [
    new THREE.Vector3(0.55, 0.12, 0.55),   // front-left
    new THREE.Vector3(-0.55, 0.12, 0.55),  // front-right
    new THREE.Vector3(0.55, 0.12, -0.55),  // rear-left
    new THREE.Vector3(-0.55, 0.12, -0.55), // rear-right
  ], []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

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

      // Subtle breathing overlay
      const t = clock.elapsedTime;
      groupRef.current.position.y += Math.sin(t * 1.2) * 0.03;
    }
  });

  const hotspotData = profile.flagship.hotspots;
  const hotspotPositions: Record<string, [number, number, number]> = {
    flightController: [0, 0.15, 0],
    onboardComputer: [0.15, 0.15, -0.15],
    visionPayload: [0, -0.15, 0.35],
    motorsEscs: [0.55, 0.12, 0.55],
    groundLink: [-0.15, 0.15, 0.15],
  };

  return (
    <group ref={groupRef} scale={1.8}>
      {/* Real DJI FPV model */}
      <primitive object={clonedScene} />

      {/* Spinning propeller discs overlaid on the model */}
      {propPositions.map((pos, i) => (
        <group key={i}>
          <PropellerDisc position={pos} />
          <PropBlur position={pos} />
        </group>
      ))}

      {/* Navigation LED lights */}
      <NavLights />

      {/* Hotspots (WP01 only) */}
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
