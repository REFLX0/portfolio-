import { profile } from '../data/profile';
import ScrollReveal from '../components/ScrollReveal';
import { ArrowDown, Link2, Mail } from 'lucide-react';

const langLevels: Record<string, number> = {
  'Native': 100, 'C1': 85, 'B2': 72, 'B1': 58, 'A2': 42, 'A1': 25,
};

export default function Hero() {
  const { meta, summary, stats, languages } = profile;

  return (
    <section className="hero-section" data-waypoint={0} aria-label="About Mohamed Aziz Jlassi">
      <div className="floating-shapes">
        <div className="floating-shape shape-1" />
        <div className="floating-shape shape-2" />
        <div className="floating-shape shape-3" />
      </div>

      <div className="hero-inner">
        <ScrollReveal>
          <p className="section-eyebrow" style={{ marginBottom: '1.25rem' }}>
            {meta.focus}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <h1 className="gradient-text" style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            margin: 0,
          }}>
            {meta.name}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.16}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.05rem, 2.5vw, 1.4rem)',
            fontWeight: 500,
            color: 'var(--color-text-secondary)',
            marginTop: '0.5rem',
            marginBottom: '1.5rem',
          }}>
            {meta.role}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.24}>
          <p className="section-subtitle" style={{ marginBottom: 0, color: 'var(--color-text-secondary)' }}>
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
              <Link2 size={16} /> View GitHub
            </a>
            <a href={`mailto:${meta.email}`} className="btn-outline">
              <Mail size={16} /> Get in Touch
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.48} className="hidden sm:block">
          <div style={{ maxWidth: 420, marginTop: '2.5rem' }}>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--color-text-tertiary)', marginBottom: '0.75rem',
            }}>
              Languages
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {languages.map((lang) => (
                <div className="lang-row" key={lang.name}>
                  <span className="lang-name">{lang.name}</span>
                  <div className="lang-track">
                    <div className="lang-fill" style={{ width: `${langLevels[lang.level] ?? 25}%` }} />
                  </div>
                  <span className="lang-level">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.56}>
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: '0.5rem', marginTop: '3rem', opacity: 0.35,
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'var(--color-text-tertiary)',
            }}>
              Scroll to explore
            </span>
            <ArrowDown size={14} style={{ color: 'var(--color-text-tertiary)', animation: 'bounce 2s infinite' }} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
