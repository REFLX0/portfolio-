import { useFlightStore } from '../store/useFlightStore.ts';
import { waypoints } from '../data/profile.ts';
import type { WaypointIndex } from '../data/profile.ts';

interface SectionEyebrowProps {
  waypointIndex: WaypointIndex;
  label?: string;
}

export default function SectionEyebrow({ waypointIndex, label }: SectionEyebrowProps) {
  const activeWaypoint = useFlightStore((s) => s.activeWaypoint);
  const wp = waypoints[waypointIndex];
  const isActive = activeWaypoint === waypointIndex;
  return (
    <div
      className="font-mono text-xs tracking-widest mb-4 transition-opacity duration-200"
      style={{
        fontFamily: 'var(--font-mono)',
        color: isActive ? 'var(--color-signal)' : 'var(--color-line)',
        opacity: isActive ? 1 : 0.6,
      }}
      aria-hidden="true"
    >
      {wp.code} // {label ?? wp.label}
    </div>
  );
}
