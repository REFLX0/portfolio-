import { useFlightStore } from '../store/useFlightStore.ts';
import { waypoints } from '../data/profile.ts';

export default function Nav() {
  const bootComplete = useFlightStore((s) => s.bootComplete);
  const activeWaypoint = useFlightStore((s) => s.activeWaypoint);

  if (!bootComplete) return null;

  const handleClick = (index: number) => {
    const section = document.querySelector(`[data-waypoint="${index}"]`);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-2 py-1.5 rounded-full"
      style={{
        background: 'color-mix(in srgb, var(--color-panel) 85%, transparent)',
        border: '1px solid var(--color-line)',
        backdropFilter: 'blur(8px)',
      }}
      aria-label="Page sections"
    >
      {waypoints.map((wp, i) => (
        <button
          key={wp.code}
          onClick={() => handleClick(i)}
          className="px-2 py-1 rounded text-[10px] font-mono transition-colors duration-200 cursor-pointer"
          style={{
            fontFamily: 'var(--font-mono)',
            color: i === activeWaypoint ? 'var(--color-signal)' : 'var(--color-line)',
            background: i === activeWaypoint ? 'color-mix(in srgb, var(--color-signal) 12%, transparent)' : 'transparent',
          }}
          aria-label={`Go to ${wp.label}`}
          aria-current={i === activeWaypoint ? 'true' : undefined}
        >
          {wp.code.replace('WP', '')}
        </button>
      ))}
    </nav>
  );
}
