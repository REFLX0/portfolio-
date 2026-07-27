import { profile } from '../data/profile';
import SectionEyebrow from '../components/SectionEyebrow';
import Badge from '../components/Badge';

export default function Timeline() {
  const { education, experience, internship, attributes } = profile;

  const entries = [
    {
      title: internship.title,
      org: internship.org,
      detail: internship.label,
      points: internship.points,
      stack: internship.stack,
    },
    {
      title: experience.title,
      org: experience.org,
      detail: experience.label,
      points: experience.points,
      stack: experience.stack,
    },
    {
      title: education.degree,
      org: education.school,
      detail: education.honor,
      points: [],
      stack: [] as string[],
    },
  ];

  return (
    <section data-waypoint={4} aria-label="Experience and Education">
      <div className="section-wrap">
        <SectionEyebrow waypointIndex={4} />
        <h2 className="section-title">Experience</h2>
        <p className="section-subtitle" style={{ marginBottom: '2.5rem' }}>
          From a 6-month full-stack role at OIT Mahdia to embedded IoT internships and academic distinction.
        </p>

        <div className="flagship-grid">
          <div className="timeline-track">
            {entries.map((entry, i) => (
              <div className="timeline-entry" key={i}>
                <div className="timeline-dot" />
                <h3 className="timeline-title">{entry.title}</h3>
                <p className="timeline-org">{entry.org}</p>
                <p className="timeline-detail">{entry.detail}</p>
                {entry.points.length > 0 && (
                  <div className="timeline-points" style={{ marginTop: '0.75rem' }}>
                    {entry.points.map((pt, j) => (
                      <div className="timeline-point" key={j}>{pt}</div>
                    ))}
                  </div>
                )}
                {entry.stack.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.75rem' }}>
                    {entry.stack.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--color-text-muted)', marginBottom: '0.75rem',
            }}>
              Key Attributes
            </p>
            <div className="attributes-grid">
              {attributes.map((attr) => (
                <span key={attr} className="attribute-chip">{attr}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}