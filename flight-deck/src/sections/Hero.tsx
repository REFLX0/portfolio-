import { profile } from '../data/profile.ts';
import SectionEyebrow from '../components/SectionEyebrow.tsx';
import Button from '../components/Button.tsx';

export default function Hero() {
  const { meta, summary, stats, languages } = profile;

  return (
    <section className="waypoint-section" data-waypoint={0} aria-label="Origin — About Mohamed Aziz Jlassi">
      <div className="section-content">
        <SectionEyebrow waypointIndex={0} />

        <h1
          className="mb-2"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
            fontWeight: 700,
            color: 'var(--color-paper)',
            lineHeight: 1.1,
          }}
        >
          {meta.name}
        </h1>
        <p
          className="mb-1"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
            fontWeight: 500,
            color: 'var(--color-signal)',
          }}
        >
          {meta.role}
        </p>
        <p
          className="mb-6 text-muted"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            maxWidth: 640,
            lineHeight: 1.6,
          }}
        >
          {meta.focus}
        </p>

        <p
          className="mb-8"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.95rem',
            lineHeight: 1.7,
            maxWidth: 700,
            color: 'var(--color-paper)',
          }}
        >
          {summary}
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          {stats.map((s) => (
            <div
              key={s.label}
              className="px-4 py-2 rounded-md"
              style={{
                background: 'var(--color-panel)',
                border: '1px solid var(--color-line)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  color: 'var(--color-signal)',
                }}
              >
                {s.value}
              </div>
              <div
                className="text-muted"
                style={{ fontSize: '0.7rem', marginTop: 2 }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          <Button href={meta.github} target="_blank" rel="noopener noreferrer">
            View GitHub
          </Button>
          <Button href={`mailto:${meta.email}`}>Send message</Button>
        </div>

        <div style={{ maxWidth: 400 }}>
          <h3
            className="mb-3 text-xs font-mono tracking-widest text-muted"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            LANGUAGES
          </h3>
          <div className="flex flex-col gap-2">
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
      </div>
    </section>
  );
}
