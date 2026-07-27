import { profile } from '../data/profile';
import ScrollReveal from '../components/ScrollReveal';
import { ArrowDown, Link2, Mail } from 'lucide-react';

export default function Hero() {
  const { meta, summary, stats } = profile;

  return (
    <section className="hero-section" data-waypoint={0} aria-label="About Mohamed Aziz Jlassi">
      <div className="hero-inner">
        <ScrollReveal>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            marginBottom: '1.5rem',
          }}>
            <span className="status-dot" />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
            }}>
              {meta.focus}
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.8rem, 8vw, 6rem)',
            fontWeight: 800, lineHeight: 0.95,
            letterSpacing: '-0.04em',
            color: 'var(--color-text)', margin: 0,
          }}>
            {meta.name}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.16}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
            fontWeight: 500, color: 'var(--color-text-muted)',
            marginTop: '0.75rem', marginBottom: '1.75rem',
            letterSpacing: '-0.01em',
          }}>
            {meta.role}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.24}>
          <p style={{
            maxWidth: 560, fontSize: '0.92rem',
            color: 'var(--color-text-secondary)', lineHeight: 1.75,
            marginBottom: '2rem',
          }}>
            {summary}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.32}>
          <div className="stats-row">
            {stats.map((s) => (
              <div className="stat-card" key={s.label}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <div className="cta-group">
            <a href={meta.github} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <Link2 size={15} /> GitHub
            </a>
            <a href={`mailto:${meta.email}`} className="btn-outline">
              <Mail size={15} /> Contact
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.56}>
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: '0.5rem', marginTop: '4rem', opacity: 0.3,
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
            }}>
              Scroll
            </span>
            <ArrowDown size={12} style={{ color: 'var(--color-text-muted)', animation: 'bounce 2s infinite' }} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
