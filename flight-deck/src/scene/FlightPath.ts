import * as THREE from 'three';

/**
 * Flight path through 6 waypoints in 3D space.
 * The path is interesting — not a straight line — with lateral movement,
 * altitude changes, and depth progression.
 */
export const waypointPositions: THREE.Vector3[] = [
  new THREE.Vector3(0, 0, 0),       // WP00 ORIGIN
  new THREE.Vector3(2, 3, -8),      // WP01 PRIMARY MISSION
  new THREE.Vector3(-3, 5, -16),    // WP02 PAYLOAD BAY
  new THREE.Vector3(4, 4, -24),     // WP03 SYSTEMS CHECK
  new THREE.Vector3(-1, 2, -30),    // WP04 FLIGHT LOG
  new THREE.Vector3(0, 0.5, -36),   // WP05 RENDEZVOUS
];

export const flightCurve = new THREE.CatmullRomCurve3(waypointPositions, false, 'catmullrom', 0.5);

/**
 * Returns the drone's position and a lookAt-derived rotation at parameter t (0→1).
 */
export function getFlightTransform(t: number): {
  position: THREE.Vector3;
  rotation: THREE.Euler;
} {
  const clamped = Math.max(0, Math.min(1, t));
  const position = flightCurve.getPointAt(clamped);

  // Look slightly ahead on the curve for a natural heading
  const lookAhead = flightCurve.getPointAt(Math.min(1, clamped + 0.02));

  // Create a temporary object to compute the lookAt rotation
  const obj = new THREE.Object3D();
  obj.position.copy(position);
  obj.lookAt(lookAhead);

  return {
    position,
    rotation: obj.rotation.clone(),
  };
}
