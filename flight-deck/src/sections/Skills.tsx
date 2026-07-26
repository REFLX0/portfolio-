import { profile } from '../data/profile.ts';
import SectionEyebrow from '../components/SectionEyebrow.tsx';

export default function Skills() {
  const { skills } = profile;
  return (
    <section className="waypoint-section" data-waypoint={3} aria-label="Systems Check — Technical Skills">
      <div className="section-content">
        <SectionEyebrow waypointIndex={3} />
        <h2 className="mb-8" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, color: 'var(--color-paper)' }}>
          Technical Skills
        </h2>
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))' }}>
          {skills.map((group) => (
            <div key={group.category} className="skill-category">
              <h3 className="mb-3 text-sm font-medium" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-paper)', fontWeight: 600 }}>
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span key={item} className="tech-badge">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
