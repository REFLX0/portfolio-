import { useState } from 'react';
import { profile } from '../data/profile';
import SectionEyebrow from '../components/SectionEyebrow';
import Badge from '../components/Badge';

export default function Flagship() {
  const { flagship } = profile;
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  return (
    <section data-waypoint={1} aria-label="Primary Mission">
      <div className="section-wrap">
        <SectionEyebrow waypointIndex={1} />
        <h2 className="section-title">{flagship.title}</h2>
        <p className="section-subtitle" style={{ marginBottom: '2.5rem' }}>
          {flagship.subtitle}
        </p>

        <div className="flagship-grid">
          <div>
            <div className="timeline-points" style={{ marginBottom: '1.5rem' }}>
              {flagship.points.map((point, i) => (
                <div className="timeline-point" key={i}>{point}</div>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {flagship.stack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </div>

          <div>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--color-text-tertiary)', marginBottom: '0.75rem',
            }}>
              Subsystem Overview
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {flagship.hotspots.map((hs) => (
                <button
                  key={hs.part}
                  onClick={() => setActiveHotspot(activeHotspot === hs.part ? null : hs.part)}
                  className={`hotspot-btn ${activeHotspot === hs.part ? 'active' : ''}`}
                  aria-expanded={activeHotspot === hs.part}
                >
                  <div className="hotspot-btn-label">{hs.label}</div>
                  {activeHotspot === hs.part && (
                    <div className="hotspot-btn-blurb">{hs.blurb}</div>
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
