import { useFlightStore } from '../store/useFlightStore';
import { waypoints } from '../data/profile';
import { profile } from '../data/profile';

const labels = ['Home', 'Drone', 'Projects', 'Skills', 'Experience', 'Contact'];

export default function Nav() {
  const activeWaypoint = useFlightStore((s) => s.activeWaypoint);

  const handleClick = (index: number) => {
    const section = document.querySelector(`[data-waypoint="${index}"]`);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.25rem 1.5rem',
      }}
      aria-label="Page sections"
    >
      <a
        href="#"
        onClick={(e) => { e.preventDefault(); handleClick(0); }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.9rem', fontWeight: 700,
          color: 'var(--color-text)',
          textDecoration: 'none', letterSpacing: '-0.01em',
          display: 'flex', alignItems: 'center', gap: '0.5rem',
        }}
      >
        <span style={{
          display: 'inline-block', width: 8, height: 8,
          borderRadius: '50%', background: 'var(--color-emerald)',
        }} />
        {profile.meta.name.split(' ').pop()}
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }} className="hidden sm:flex">
        {waypoints.map((wp, i) => (
          <button
            key={wp.code}
            onClick={() => handleClick(i)}
            style={{
              padding: '6px 12px', borderRadius: 8,
              fontSize: '0.68rem', fontFamily: 'var(--font-mono)',
              letterSpacing: '0.06em',
              fontWeight: i === activeWaypoint ? 600 : 400,
              color: i === activeWaypoint ? '#fff' : 'var(--color-text-muted)',
              background: i === activeWaypoint ? 'rgba(255,255,255,0.08)' : 'transparent',
              cursor: 'pointer', border: 'none',
              transition: 'all 200ms ease',
              textTransform: 'uppercase' as const,
            }}
            aria-label={`Go to ${labels[i]}`}
          >
            {labels[i]}
          </button>
        ))}
      </div>

      {/* Mobile dots */}
      <div style={{ display: 'flex', gap: 4 }} className="sm:hidden">
        {waypoints.map((wp, i) => (
          <button
            key={wp.code}
            onClick={() => handleClick(i)}
            style={{
              width: i === activeWaypoint ? 18 : 6, height: 6,
              borderRadius: 3,
              background: i === activeWaypoint ? 'var(--color-text)' : 'var(--color-border)',
              cursor: 'pointer', border: 'none', padding: 0,
              transition: 'all 200ms ease',
            }}
            aria-label={`Go to ${labels[i]}`}
          />
        ))}
      </div>
    </nav>
  );
}
