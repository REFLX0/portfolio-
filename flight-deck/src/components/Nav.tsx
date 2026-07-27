import { useFlightStore } from '../store/useFlightStore';
import { waypoints } from '../data/profile';

export default function Nav() {
  const activeWaypoint = useFlightStore((s) => s.activeWaypoint);

  const handleClick = (index: number) => {
    const section = document.querySelector(`[data-waypoint="${index}"]`);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-0.5 px-1.5 py-1 rounded-full"
      style={{
        background: 'color-mix(in srgb, var(--color-panel) 85%, transparent)',
        border: '1px solid var(--color-line)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
      aria-label="Page sections"
    >
      {waypoints.map((wp, i) => (
        <button
          key={wp.code}
          onClick={() => handleClick(i)}
          className="px-2 py-1 rounded-full text-xs transition-colors duration-200 cursor-pointer"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: i === activeWaypoint ? 'var(--color-ink)' : 'var(--color-paper)',
            background: i === activeWaypoint ? 'var(--color-signal)' : 'transparent',
            fontWeight: i === activeWaypoint ? 600 : 400,
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
