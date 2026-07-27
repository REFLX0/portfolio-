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
        display: 'flex', alignItems: 'center', gap: '2px',
        padding: '5px', borderRadius: '9999px',
        background: 'rgba(255,255,255,0.8)',
        border: '1.5px solid var(--color-border-light)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      }}
      aria-label="Page sections"
    >
      {waypoints.map((wp, i) => (
        <button
          key={wp.code}
          onClick={() => handleClick(i)}
          className="hidden sm:inline-flex"
          style={{
            padding: '7px 14px', borderRadius: '9999px',
            fontSize: '0.72rem', fontFamily: 'var(--font-mono)',
            letterSpacing: '0.03em',
            fontWeight: i === activeWaypoint ? 600 : 400,
            color: i === activeWaypoint ? '#fff' : 'var(--color-text-secondary)',
            background: i === activeWaypoint
              ? 'linear-gradient(135deg, var(--color-accent), var(--color-violet))'
              : 'transparent',
            cursor: 'pointer', border: 'none',
            transition: 'all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
          aria-label={`Go to ${labels[i]}`}
          aria-current={i === activeWaypoint ? 'true' : undefined}
        >
          {labels[i]}
        </button>
      ))}
      {waypoints.map((wp, i) => (
        <button
          key={wp.code}
          onClick={() => handleClick(i)}
          className="sm:hidden"
          style={{
            width: i === activeWaypoint ? 22 : 7, height: 7,
            borderRadius: 4,
            background: i === activeWaypoint
              ? 'linear-gradient(90deg, var(--color-accent), var(--color-violet))'
              : 'var(--color-border)',
            cursor: 'pointer', border: 'none', padding: 0,
            transition: 'all 300ms ease',
          }}
          aria-label={`Go to ${labels[i]}`}
        />
      ))}
    </nav>
  );
}
