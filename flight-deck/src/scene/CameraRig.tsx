import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useFlightStore } from '../store/useFlightStore';
import { waypointPositions } from './FlightPath';

/**
 * Camera keyframes — one per waypoint boundary.
 * Wider at WP00, closer/dynamic at WP01, pulling back by WP05.
 */
interface CamKeyframe {
  position: THREE.Vector3;
  target: THREE.Vector3;
}

const cameraKeyframes: CamKeyframe[] = [
  // WP00 ORIGIN — wide establishing
  {
    position: new THREE.Vector3(0, 2, 8),
    target: new THREE.Vector3(0, 0, 0),
  },
  // WP01 PRIMARY MISSION — closer, slightly above
  {
    position: new THREE.Vector3(2, 3.5, -2),
    target: new THREE.Vector3(2, 3, -8),
  },
  // WP02 PAYLOAD BAY — pull back, wider
  {
    position: new THREE.Vector3(-5, 6, -10),
    target: new THREE.Vector3(-3, 5, -16),
  },
  // WP03 SYSTEMS CHECK — side angle
  {
    position: new THREE.Vector3(8, 6, -20),
    target: new THREE.Vector3(4, 4, -24),
  },
  // WP04 FLIGHT LOG — pull back
  {
    position: new THREE.Vector3(-4, 4, -24),
    target: new THREE.Vector3(-1, 2, -30),
  },
  // WP05 RENDEZVOUS — final wide
  {
    position: new THREE.Vector3(0, 2, -28),
    target: new THREE.Vector3(0, 0.5, -36),
  },
];

const tmpPos = new THREE.Vector3();
const tmpTarget = new THREE.Vector3();
const tmpVec = new THREE.Vector3();

export default function CameraRig() {
  const { camera } = useThree();
  const scrollProgress = useFlightStore((s) => s.scrollProgress);
  const reducedMotion = useFlightStore((s) => s.reducedMotion);
  const currentPos = useRef(new THREE.Vector3(0, 2, 8));
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    if (reducedMotion) {
      // Static comfortable position
      tmpPos.set(0, 2.5, 8);
      tmpTarget.set(0, 0, -4);
      currentPos.current.lerp(tmpPos, 0.05);
      currentTarget.current.lerp(tmpTarget, 0.05);
      camera.position.copy(currentPos.current);
      camera.lookAt(currentTarget.current);
      return;
    }

    const p = Math.max(0, Math.min(1, scrollProgress));
    const segmentCount = cameraKeyframes.length - 1;
    const scaledP = p * segmentCount;
    const segmentIndex = Math.min(Math.floor(scaledP), segmentCount - 1);
    const localT = scaledP - segmentIndex;

    const from = cameraKeyframes[segmentIndex];
    const to = cameraKeyframes[segmentIndex + 1];

    // Smooth step for easing (power2.inOut approximation)
    const easeT = localT < 0.5
      ? 2 * localT * localT
      : 1 - Math.pow(-2 * localT + 2, 2) / 2;

    tmpVec.lerpVectors(from.position, to.position, easeT);
    tmpPos.copy(tmpVec);
    tmpVec.lerpVectors(from.target, to.target, easeT);
    tmpTarget.copy(tmpVec);

    // Smooth interpolation to avoid jitter
    currentPos.current.lerp(tmpPos, 0.1);
    currentTarget.current.lerp(tmpTarget, 0.1);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentTarget.current);
  });

  return null;
}
