import { useFlightStore } from '../store/useFlightStore';
import { waypoints } from '../data/profile';

const labels = ['Home', 'Drone', 'Projects', 'Skills', 'Experience', 'Contact'];

export default function Nav() {
  const activeWaypoint = useFlightStore((s) => s.activeWaypoint);

  const handleClick = (index: number) => {
    const section = document.querySelector(`[data-waypoint="${index}"]`);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        padding: '4px',
        borderRadius: '9999px',
        background: 'color-mix(in srgb, var(--color-panel) 90%, transparent)',
        border: '1px solid var(--color-line)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
      }}
      aria-label="Page sections"
    >
      {waypoints.map((wp, i) => (
        <button
          key={wp.code}
          onClick={() => handleClick(i)}
          className="hidden sm:inline-flex"
          style={{
            padding: '6px 14px',
            borderRadius: '9999px',
            fontSize: '0.7rem',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.03em',
            fontWeight: i === activeWaypoint ? 600 : 400,
            color: i === activeWaypoint ? 'var(--color-ink)' : 'var(--color-paper)',
            background: i === activeWaypoint ? 'var(--color-signal)' : 'transparent',
            cursor: 'pointer',
            border: 'none',
            transition: 'all 200ms ease',
          }}
          aria-label={`Go to ${labels[i]}`}
          aria-current={i === activeWaypoint ? 'true' : undefined}
        >
          {labels[i]}
        </button>
      ))}
      {/* Mobile: show only dot indicators */}
      {waypoints.map((wp, i) => (
        <button
          key={wp.code}
          onClick={() => handleClick(i)}
          className="sm:hidden"
          style={{
            width: i === activeWaypoint ? 20 : 6,
            height: 6,
            borderRadius: 3,
            background: i === activeWaypoint ? 'var(--color-signal)' : 'var(--color-line-light)',
            cursor: 'pointer',
            border: 'none',
            padding: 0,
            transition: 'all 200ms ease',
          }}
          aria-label={`Go to ${labels[i]}`}
          aria-current={i === activeWaypoint ? 'true' : undefined}
        />
      ))}
    </nav>
  );
}
