import { useState, useEffect } from 'react';
import { useFlightStore } from '../store/useFlightStore.ts';
import { useReducedMotion } from '../hooks/useReducedMotion.ts';

const BOOT_LINES = [
  'Initializing flight computer...',
  'Loading navigation waypoints...',
  'Calibrating sensors...',
  'GPS lock acquired',
  'Systems nominal',
];

export default function BootSequence() {
  const reducedMotion = useReducedMotion();
  const bootComplete = useFlightStore((s) => s.bootComplete);
  const setBootComplete = useFlightStore((s) => s.setBootComplete);
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (reducedMotion) { setBootComplete(true); return; }
  }, [reducedMotion, setBootComplete]);

  useEffect(() => {
    if (bootComplete || reducedMotion) return;
    const interval = setInterval(() => {
      setCurrentLine((prev) => {
        if (prev >= BOOT_LINES.length) {
          clearInterval(interval);
          setBootComplete(true);
          return prev;
        }
        return prev + 1;
      });
    }, 350);
    return () => clearInterval(interval);
  }, [bootComplete, reducedMotion, setBootComplete]);

  if (bootComplete) return null;

  return (
    <div
      className="boot-overlay"
      onClick={() => setBootComplete(true)}
      role="button"
      tabIndex={0}
      aria-label="Skip boot sequence"
    >
      <div className="mb-6" style={{ fontSize: '11px', textAlign: 'left', width: 280 }}>
        {BOOT_LINES.map((line, i) => (
          <div
            key={i}
            style={{
              opacity: i < currentLine ? 0.7 : 0.15,
              transition: 'opacity 200ms ease',
              marginBottom: 4,
            }}
          >
            {line}
          </div>
        ))}
      </div>
      <div style={{ width: 280, height: 2, background: 'var(--color-line)', borderRadius: 1 }}>
        <div
          style={{
            width: `${(currentLine / BOOT_LINES.length) * 100}%`,
            height: '100%',
            background: 'var(--color-trace)',
            borderRadius: 1,
            transition: 'width 300ms ease',
          }}
        />
      </div>
      <div style={{ fontSize: '10px', color: 'var(--color-line)', marginTop: 12 }}>
        Click anywhere to skip
      </div>
    </div>
  );
}
