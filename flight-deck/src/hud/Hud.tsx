import Telemetry from './Telemetry.tsx';
import CornerBrackets from './CornerBrackets.tsx';
import BootSequence from './BootSequence.tsx';
import { useFlightStore } from '../store/useFlightStore.ts';
import { waypoints } from '../data/profile.ts';

export default function Hud() {
  const activeWaypoint = useFlightStore((s) => s.activeWaypoint);
  const scrollProgress = useFlightStore((s) => s.scrollProgress);
  const bootComplete = useFlightStore((s) => s.bootComplete);
  const wp = waypoints[activeWaypoint];

  return (
    <>
      <BootSequence />
      {bootComplete && (
        <>
          <CornerBrackets />
          <Telemetry />
          <div
            className="fixed top-4 left-4 z-50 font-mono text-xs select-none"
            style={{ color: 'var(--color-signal)', fontFamily: 'var(--font-mono)' }}
            aria-hidden="true"
          >
            <span style={{ color: 'var(--color-line)' }}>{wp.code}</span>
            {' // '}
            {wp.label}
          </div>
          <div
            className="fixed top-4 right-4 z-50 flex items-center gap-2 select-none"
            style={{ fontFamily: 'var(--font-mono)' }}
            aria-hidden="true"
          >
            <div style={{ width: 80, height: 2, background: 'var(--color-line)', borderRadius: 1 }}>
              <div
                style={{
                  width: `${scrollProgress * 100}%`,
                  height: '100%',
                  background: 'var(--color-signal)',
                  borderRadius: 1,
                  transition: 'width 100ms linear',
                }}
              />
            </div>
            <span style={{ fontSize: '10px', color: 'var(--color-trace)' }}>
              {(scrollProgress * 100).toFixed(0)}%
            </span>
          </div>
          <div
            className="fixed inset-0 z-40 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 50%, rgba(10,13,15,0.5) 100%)',
            }}
            aria-hidden="true"
          />
        </>
      )}
    </>
  );
}
