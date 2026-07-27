import { profile } from '../data/profile';
import SectionEyebrow from '../components/SectionEyebrow';

export default function Skills() {
  const { skills } = profile;
  return (
    <section data-waypoint={3} aria-label="Technical Skills">
      <div className="section-wrap">
        <SectionEyebrow waypointIndex={3} />
        <h2 className="section-title">Technical Skills</h2>
        <p className="section-subtitle" style={{ marginBottom: '2rem' }}>
          Deep expertise across the full robotics and AI stack — from bare-metal firmware to cloud infrastructure.
        </p>
        <div className="skill-grid">
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
