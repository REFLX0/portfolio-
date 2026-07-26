import { useState } from 'react';
import { profile } from '../data/profile.ts';
import SectionEyebrow from '../components/SectionEyebrow.tsx';
import Badge from '../components/Badge.tsx';

interface FlagshipProps {
  onHotspotClick?: (part: string, label: string, blurb: string) => void;
}

export default function Flagship({ onHotspotClick }: FlagshipProps) {
  const { flagship } = profile;
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const handleHotspotClick = (part: string, label: string, blurb: string) => {
    setActiveHotspot(activeHotspot === part ? null : part);
    onHotspotClick?.(part, label, blurb);
  };

  return (
    <section className="waypoint-section" data-waypoint={1} aria-label="Primary Mission — Autonomous Drone Project">
      <div className="section-content">
        <SectionEyebrow waypointIndex={1} />
        <h2
          className="mb-1"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
            fontWeight: 700,
            color: 'var(--color-paper)',
          }}
        >
          {flagship.title}
        </h2>
        <p className="mb-6 text-muted text-sm">{flagship.subtitle}</p>
        <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))' }}>
          <div>
            <ul className="mb-6 flex flex-col gap-3" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {flagship.points.map((point, i) => (
                <li key={i} className="flex gap-3 text-sm" style={{ lineHeight: 1.6, color: 'var(--color-paper)' }}>
                  <span
                    className="mt-1 shrink-0"
                    style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-signal)' }}
                  />
                  {point}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {flagship.stack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 text-xs font-mono tracking-widest text-muted" style={{ fontFamily: 'var(--font-mono)' }}>
              SUBSYSTEM OVERVIEW — click to inspect
            </h3>
            <div className="flex flex-col gap-2">
              {flagship.hotspots.map((hs) => (
                <button
                  key={hs.part}
                  onClick={() => handleHotspotClick(hs.part, hs.label, hs.blurb)}
                  className="text-left px-3 py-2 rounded transition-colors duration-200 cursor-pointer"
                  style={{
                    background: activeHotspot === hs.part
                      ? 'color-mix(in srgb, var(--color-signal) 10%, transparent)'
                      : 'var(--color-panel)',
                    border: `1px solid ${activeHotspot === hs.part ? 'var(--color-signal)' : 'var(--color-line)'}`,
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-paper)',
                  }}
                  aria-expanded={activeHotspot === hs.part}
                >
                  <div className="text-sm font-medium" style={{ color: activeHotspot === hs.part ? 'var(--color-signal)' : 'var(--color-paper)' }}>
                    {hs.label}
                  </div>
                  {activeHotspot === hs.part && (
                    <div className="mt-1 text-xs text-muted" style={{ lineHeight: 1.5 }}>{hs.blurb}</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
