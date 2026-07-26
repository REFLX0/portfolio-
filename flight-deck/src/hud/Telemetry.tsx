import { useFlightStore } from '../store/useFlightStore';
import { waypoints } from '../data/profile';

/**
 * Cosmetic telemetry values derived from scroll progress.
 * Altitude climbs, speed varies, battery ticks down.
 * GPS coords drift slightly to feel alive.
 */
export default function Telemetry() {
  const scrollProgress = useFlightStore((s) => s.scrollProgress);
  const activeWaypoint = useFlightStore((s) => s.activeWaypoint);
  const bootComplete = useFlightStore((s) => s.bootComplete);

  if (!bootComplete) return null;

  const p = scrollProgress;

  // Altitude: 20m → 120m across the flight
  const alt = (20 + p * 100).toFixed(0);

  // Speed: varies with a sine curve, 8–22 m/s
  const speed = (12 + Math.sin(p * Math.PI * 3) * 6).toFixed(1);

  // Heading: drifts with the path curvature
  const heading = ((p * 270 + 45) % 360).toFixed(0).padStart(3, '0');

  // Battery: 98% → 72% (linear drain)
  const batt = (98 - p * 26).toFixed(0);

  // GPS-style coords: slowly drifting
  const lat = (35.647 + p * 0.003 + Math.sin(p * 7) * 0.0001).toFixed(4);
  const lon = (10.846 + p * 0.005 + Math.cos(p * 5) * 0.0001).toFixed(4);

  const wp = waypoints[activeWaypoint];

  const rows: [string, string][] = [
    ['ALT', `${alt}m`],
    ['SPD', `${speed}m/s`],
    ['HDG', `${heading}°`],
    ['BATT', `${batt}%`],
    ['GPS', `${lat}N  ${lon}E`],
    ['WP', `${wp.code} // ${wp.label}`],
  ];

  return (
    <div
      className="fixed bottom-4 left-4 z-50 font-mono text-[11px] leading-relaxed select-none"
      style={{ color: 'var(--color-trace)', fontFamily: 'var(--font-mono)' }}
      aria-hidden="true"
    >
      {rows.map(([key, val]) => (
        <div key={key} className="flex gap-2">
          <span style={{ color: 'var(--color-line)', minWidth: '2.5rem' }}>{key}</span>
          <span>{val}</span>
        </div>
      ))}
    </div>
  );
}