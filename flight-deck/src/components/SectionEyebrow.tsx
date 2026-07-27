import { useFlightStore } from '../store/useFlightStore';
import { waypoints } from '../data/profile';
import type { WaypointIndex } from '../data/profile';

interface SectionEyebrowProps {
  waypointIndex: WaypointIndex;
}

export default function SectionEyebrow({ waypointIndex }: SectionEyebrowProps) {
  const activeWaypoint = useFlightStore((s) => s.activeWaypoint);
  const wp = waypoints[waypointIndex];
  return (
    <div
      className="section-eyebrow"
      style={{ opacity: activeWaypoint === waypointIndex ? 1 : 0.5 }}
      aria-hidden="true"
    >
      {wp.code} &mdash; {wp.label}
    </div>
  );
}