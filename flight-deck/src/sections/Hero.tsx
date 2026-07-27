import { profile } from '../data/profile';
import Button from '../components/Button.tsx';
import ScrollReveal from '../components/ScrollReveal.tsx';

export default function Hero() {
  const { meta, summary, stats, languages } = profile;

  return (
    <section className="hero-section" data-waypoint={0} aria-label="About Mohamed Aziz Jlassi">
      <div className="section-content">
        <ScrollReveal>
          <p
            className="mb-3"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: 'var(--color-trace)',
              letterSpacing: '0.05em',
            }}
          >
            {meta.focus}
          </p>

          <h1
            className="mb-3"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 6vw, 4.5rem)',
              fontWeight: 700,
              color: 'var(--color-paper-bright)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            {meta.name}
          </h1>

          <p
            className="mb-6"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
              fontWeight: 500,
              color: 'var(--color-signal)',
            }}
          >
            {meta.role}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p
            className="mb-8 text-muted"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
              maxWidth: 680,
              lineHeight: 1.75,
            }}
          >
            {summary}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="stats-row">
            {stats.map((s) => (
              <div className="stat-card" key={s.label}>
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.35}>
          <div className="flex flex-wrap gap-3 mb-12">
            <Button href={meta.github} target="_blank" rel="noopener noreferrer">
              View GitHub
            </Button>
            <Button href={`mailto:${meta.email}`}>Send message</Button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.4} className="hidden sm:block">
          <div style={{ maxWidth: 400 }}>
            <h3
              className="mb-4 text-xs font-mono tracking-widest text-muted"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              LANGUAGES
            </h3>
            <div className="flex flex-col gap-3">
              {languages.map((lang) => {
                const scale = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native'];
                const activeIndex = scale.indexOf(lang.level);
                return (
                  <div key={lang.name} className="flex items-center gap-3">
                    <span
                      className="text-sm"
                      style={{ minWidth: 70, color: 'var(--color-paper)', fontFamily: 'var(--font-body)' }}
                    >
                      {lang.name}
                    </span>
                    <div className="lang-scale">
                      {scale.map((step, i) => (
                        <div
                          key={step}
                          className={`lang-step ${i <= activeIndex ? (step === 'Native' ? 'native' : 'active') : ''}`}
                        />
                      ))}
                    </div>
                    <span
                      className="text-xs font-mono"
                      style={{
                        color: activeIndex === scale.length - 1 ? 'var(--color-trace)' : 'var(--color-paper)',
                        fontFamily: 'var(--font-mono)',
                        minWidth: 40,
                      }}
                    >
                      {lang.level}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
