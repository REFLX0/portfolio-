import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { useFlightStore } from '../store/useFlightStore';
import { getFlightTransform } from './FlightPath';
import { profile } from '../data/profile';

interface DroneProps {
  showHotspots?: boolean;
  onHotspotClick?: (part: string, label: string, blurb: string) => void;
}

const ARM_LENGTH = 1.8;
const ARM_ANGLE_OFFSET = Math.PI / 4; // 45° — diagonal arms
const BODY_SIZE: [number, number, number] = [0.8, 0.22, 0.8];
const PROP_SPIN_SPEED = 12;

function MotorPod({ position, isFront }: { position: THREE.Vector3; isFront: boolean }) {
  const propRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (propRef.current) {
      propRef.current.rotation.y += PROP_SPIN_SPEED * delta;
    }
  });

  const lightColor = isFront ? '#6FC7D4' : '#ff3344';

  return (
    <group position={position}>
      {/* Motor housing */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.16, 0.22, 8]} />
        <meshStandardMaterial color="#2a2d32" roughness={0.5} metalness={0.7} />
      </mesh>

      {/* Spinning propeller — two blades */}
      <mesh ref={propRef} position={[0, 0.3, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[1.2, 0.02, 0.1]} />
        <meshStandardMaterial color="#1a1d22" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Navigation light */}
      <mesh position={[0, -0.05, isFront ? 0.2 : -0.2]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial
          color={lightColor}
          emissive={lightColor}
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
    </group>
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

export default function Drone({ showHotspots = false, onHotspotClick }: DroneProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const scrollProgress = useFlightStore((s) => s.scrollProgress);
  const reducedMotion = useFlightStore((s) => s.reducedMotion);

  // Compute arm positions (4 diagonal arms)
  const armPositions = useMemo(() => {
    const positions: { pos: THREE.Vector3; isFront: boolean }[] = [];
    for (let i = 0; i < 4; i++) {
      const angle = ARM_ANGLE_OFFSET + (i * Math.PI) / 2;
      const x = Math.cos(angle) * ARM_LENGTH;
      const z = Math.sin(angle) * ARM_LENGTH;
      // Front arms are those with positive Z
      positions.push({
        pos: new THREE.Vector3(x, 0, z),
        isFront: z > 0,
      });
    }
    return positions;
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    if (reducedMotion) {
      // Gentle idle hover only
      const t = clock.elapsedTime;
      groupRef.current.position.y = 0.3 + Math.sin(t * 0.8) * 0.1;
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.05;
      groupRef.current.rotation.x = 0;
      groupRef.current.rotation.z = 0;
      return;
    }

    if (scrollProgress < 0.02) {
      // Idle state — gentle hover and sway before scroll engages
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
      // In-flight — driven by scroll
      const { position, rotation } = getFlightTransform(scrollProgress);
      groupRef.current.position.copy(position);
      groupRef.current.rotation.x = rotation.x;
      groupRef.current.rotation.y = rotation.y;
      groupRef.current.rotation.z = rotation.z;

      // Subtle idle overlay (breathing)
      const t = clock.elapsedTime;
      groupRef.current.position.y += Math.sin(t * 1.2) * 0.03;
    }
  });

  const hotspotData = profile.flagship.hotspots;
  // Map hotspot parts to 3D positions on the drone
  const hotspotPositions: Record<string, [number, number, number]> = {
    flightController: [0, 0.15, 0],
    onboardComputer: [0.15, 0.15, -0.15],
    visionPayload: [0, -0.25, 0.25],
    motorsEscs: [ARM_LENGTH * 0.7, 0, ARM_LENGTH * 0.7],
    groundLink: [-0.15, 0.15, 0.15],
  };

  return (
    <group ref={groupRef}>
      {/* ── Body ── */}
      <RoundedBox args={BODY_SIZE} radius={0.06} smoothness={4} castShadow>
        <meshStandardMaterial
          color="#1a1d22"
          roughness={0.4}
          metalness={0.6}
        />
      </RoundedBox>

      {/* Centerline emissive seam — trace color */}
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.02, 0.02, 0.75]} />
        <meshStandardMaterial
          color="#6FC7D4"
          emissive="#6FC7D4"
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>

      {/* ── Arms ── */}
      {armPositions.map(({ pos, isFront }, i) => (
        <group key={i}>
          {/* Arm tube */}
          <mesh
            position={[pos.x * 0.5, 0, pos.z * 0.5]}
            rotation={[0, -Math.atan2(pos.z, pos.x), 0]}
          >
            <boxGeometry args={[ARM_LENGTH, 0.06, 0.06]} />
            <meshStandardMaterial color="#22252a" roughness={0.5} metalness={0.6} />
          </mesh>
          {/* Motor pod + prop + nav light */}
          <MotorPod position={pos} isFront={isFront} />
        </group>
      ))}

      {/* ── Landing skids ── */}
      {[-0.25, 0.25].map((xOff) => (
        <group key={`skid-${xOff}`}>
          {/* Vertical leg */}
          <mesh position={[xOff, -0.25, 0]}>
            <boxGeometry args={[0.03, 0.2, 0.03]} />
            <meshStandardMaterial color="#22252a" roughness={0.5} metalness={0.5} />
          </mesh>
          {/* Horizontal skid bar */}
          <mesh position={[xOff, -0.35, 0]}>
            <boxGeometry args={[0.6, 0.02, 0.03]} />
            <meshStandardMaterial color="#22252a" roughness={0.5} metalness={0.5} />
          </mesh>
          {/* Connecting rod to opposite side */}
          <mesh position={[0, -0.35, 0]}>
            <boxGeometry args={[Math.abs(xOff) * 2, 0.02, 0.02]} />
            <meshStandardMaterial color="#1a1d22" roughness={0.5} metalness={0.5} />
          </mesh>
        </group>
      ))}

      {/* Camera gimbal — a nod to the real YOLO perception pipeline from the CV */}
      <group position={[0, -0.18, 0.2]}>
        <mesh>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#2a2d32" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Lens — rotated cylinder for the camera lens nodule */}
        <mesh position={[0, 0, 0.07]}>
          <cylinderGeometry args={[0.03, 0.03, 0.04, 12]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#111" roughness={0.2} metalness={0.8} />
        </mesh>
      </group>

      {/* ── Hotspots (WP01 only) ── */}
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