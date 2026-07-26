import { profile } from '../data/profile.ts';
import SectionEyebrow from '../components/SectionEyebrow.tsx';
import Badge from '../components/Badge.tsx';

export default function Timeline() {
  const { education, internship, attributes } = profile;
  const timelineEntries = [
    { title: education.degree, org: education.school, detail: education.honor, stack: [] as string[] },
    { title: internship.title, org: internship.org, detail: internship.label, stack: internship.stack },
  ];

  return (
    <section className="waypoint-section" data-waypoint={4} aria-label="Flight Log — Education and Internship">
      <div className="section-content">
        <SectionEyebrow waypointIndex={4} />
        <h2 className="mb-8" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, color: 'var(--color-paper)' }}>
          Flight Log
        </h2>
        <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))' }}>
          <div>
            <div className="relative pl-6" style={{ borderLeft: '1px solid var(--color-line)' }}>
              {timelineEntries.map((entry, i) => (
                <div key={i} className="relative mb-8 last:mb-0">
                  <div className="absolute -left-[25px] top-1" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-signal)', boxShadow: '0 0 8px var(--color-signal)' }} />
                  <h3 className="mb-1" style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-paper)' }}>{entry.title}</h3>
                  <p className="text-sm text-muted mb-1" style={{ fontFamily: 'var(--font-body)' }}>{entry.org}</p>
                  <p className="text-xs font-mono mb-2" style={{ color: 'var(--color-signal)', fontFamily: 'var(--font-mono)' }}>{entry.detail}</p>
                  {entry.stack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {entry.stack.map((tech) => (<Badge key={tech}>{tech}</Badge>))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-mono tracking-widest text-muted" style={{ fontFamily: 'var(--font-mono)' }}>KEY ATTRIBUTES</h3>
            <ul className="flex flex-col gap-2" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {attributes.map((attr) => (
                <li key={attr} className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-paper)', fontFamily: 'var(--font-body)' }}>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--color-trace)', flexShrink: 0 }} />
                  {attr}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
