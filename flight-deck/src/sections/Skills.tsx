import { profile } from '../data/profile';
import SectionEyebrow from '../components/SectionEyebrow';

// Flatten all skills into a single array for marquee
const allSkills = profile.skills.flatMap(g => g.items);
const marqueeItems = [...allSkills, ...allSkills]; // duplicate for seamless loop

export default function Skills() {
  const { skills } = profile;
  return (
    <section data-waypoint={3} aria-label="Technical Skills">
      <div className="section-wrap">
        <SectionEyebrow waypointIndex={3} />
        <h2 className="section-title">Tech Stack</h2>
        <p className="section-subtitle" style={{ marginBottom: '1.5rem' }}>
          A curated toolkit focused on performance, autonomy, and scale.
        </p>
      </div>

      {/* Marquee */}
      <div className="marquee-container">
        <div className="marquee-track">
          {marqueeItems.map((item, i) => (
            <span key={i} className="marquee-item">{item}</span>
          ))}
        </div>
      </div>

      {/* Detailed grid */}
      <div className="section-wrap" style={{ paddingTop: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {skills.map((group) => (
            <div key={group.category} className="skill-category">
              <h3 className="skill-category-title">{group.category}</h3>
              <div className="skill-items">
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
