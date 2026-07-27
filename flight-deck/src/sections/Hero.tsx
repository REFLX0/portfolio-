import { profile } from '../data/profile';
import ScrollReveal from '../components/ScrollReveal';
import { ArrowDown, Github, Mail } from 'lucide-react';

const langLevels: Record<string, number> = {
  'Native': 100,
  'C1': 85,
  'B2': 72,
  'B1': 58,
  'A2': 42,
  'A1': 25,
};

export default function Hero() {
  const { meta, summary, stats, languages } = profile;

  return (
    <section className="hero-section" data-waypoint={0} aria-label="About Mohamed Aziz Jlassi">
      {/* Animated Circuit SVG Background */}
      <svg className="circuit-svg" viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Robot arm structure */}
        <path className="circuit-line" d="M200 20 L200 80" />
        <path className="circuit-line" d="M200 80 L120 160" />
        <path className="circuit-line" d="M200 80 L280 140" />
        <path className="circuit-line" d="M120 160 L80 280" />
        <path className="circuit-line" d="M280 140 L320 260" />
        <path className="circuit-line" d="M80 280 L100 380" />
        <path className="circuit-line" d="M320 260 L300 370" />
        <path className="circuit-line" d="M100 380 L200 460" />
        <path className="circuit-line" d="M300 370 L200 460" />
        {/* Horizontal connectors */}
        <path className="circuit-line" d="M120 160 L280 160" style={{ animationDelay: '-3s' }} />
        <path className="circuit-line" d="M80 280 L320 280" style={{ animationDelay: '-7s' }} />
        <path className="circuit-line" d="M100 380 L300 380" style={{ animationDelay: '-11s' }} />
        {/* Extra detail lines */}
        <path className="circuit-line" d="M200 80 L200 160" style={{ animationDelay: '-5s' }} />
        <path className="circuit-line" d="M200 160 L200 280" style={{ animationDelay: '-9s' }} />
        <path className="circuit-line" d="M200 280 L200 380" style={{ animationDelay: '-13s' }} />
        {/* Joints / nodes */}
        <circle className="circuit-node" cx="200" cy="20" r="3" />
        <circle className="circuit-node-pulse" cx="200" cy="80" r="3" style={{ animationDelay: '0s' }} />
        <circle className="circuit-node-pulse" cx="120" cy="160" r="3" style={{ animationDelay: '0.5s' }} />
        <circle className="circuit-node-pulse" cx="280" cy="140" r="3" style={{ animationDelay: '1s' }} />
        <circle className="circuit-node-pulse" cx="80" cy="280" r="3" style={{ animationDelay: '1.5s' }} />
        <circle className="circuit-node-pulse" cx="320" cy="260" r="3" style={{ animationDelay: '2s' }} />
        <circle className="circuit-node" cx="200" cy="460" r="3" />
        {/* Small detail nodes */}
        <circle className="circuit-node" cx="200" cy="160" r="2" />
        <circle className="circuit-node" cx="200" cy="280" r="2" />
        <circle className="circuit-node" cx="200" cy="380" r="2" />
      </svg>

      <div className="hero-inner">
        <ScrollReveal>
          <p className="section-eyebrow" style={{ marginBottom: '1.25rem' }}>
            {meta.focus}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: 800,
            color: 'var(--color-paper-bright)',
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
            fontSize: 'clamp(1.05rem, 2.5vw, 1.5rem)',
            fontWeight: 500,
            color: 'var(--color-signal)',
            marginTop: '0.5rem',
            marginBottom: '1.5rem',
          }}>
            {meta.role}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.24}>
          <p className="section-subtitle" style={{ marginBottom: 0 }}>
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
              <Github size={16} />
              View GitHub
            </a>
            <a href={`mailto:${meta.email}`} className="btn-outline">
              <Mail size={16} />
              Get in Touch
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.48} className="hidden sm:block">
          <div style={{ maxWidth: 420, marginTop: '2.5rem' }}>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              color: 'var(--color-paper)',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}>
              Languages
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {languages.map((lang) => (
                <div className="lang-row" key={lang.name}>
                  <span className="lang-name">{lang.name}</span>
                  <div className="lang-track">
                    <div
                      className="lang-fill"
                      style={{ width: `${langLevels[lang.level] ?? 25}%` }}
                    />
                  </div>
                  <span className="lang-level">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Scroll indicator */}
        <ScrollReveal delay={0.6}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            marginTop: '3rem',
            opacity: 0.4,
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-paper)',
            }}>
              Scroll to explore
            </span>
            <ArrowDown size={14} style={{ color: 'var(--color-paper)', animation: 'bounce 2s infinite' }} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
