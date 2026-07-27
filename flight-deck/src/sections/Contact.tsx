import { profile } from '../data/profile';
import SectionEyebrow from '../components/SectionEyebrow';
import Footer from '../components/Footer';
import { Mail, Phone, MapPin, Link2, Link, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const { meta } = profile;

  const contacts = [
    { icon: Mail, label: 'Email', value: meta.email, href: `mailto:${meta.email}` },
    { icon: Phone, label: 'Phone', value: meta.phone, href: `tel:${meta.phone.replace(/\s/g, '')}` },
    { icon: MapPin, label: 'Location', value: meta.location, href: undefined },
    { icon: Link2, label: 'GitHub', value: 'REFLX0', href: meta.github },
    { icon: Link, label: 'LinkedIn', value: 'aziz-jlassi111', href: meta.linkedin },
  ];

  return (
    <>
      <section data-waypoint={5} aria-label="Contact">
        <div className="section-wrap" style={{ maxWidth: 680, textAlign: 'center' }}>
          <SectionEyebrow waypointIndex={5} />
          <h2 className="section-title" style={{ marginBottom: '0.75rem' }}>
            Let's Build Something Together
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto 2.5rem' }}>
            Whether it's autonomous systems, AI pipelines, or full-stack engineering —
            I'm always open to new challenges and collaborations.
          </p>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.6rem',
            marginBottom: '2rem',
          }}>
            {contacts.map((c) => {
              const Icon = c.icon;
              const inner = (
                <div className="contact-card">
                  <div className="contact-icon">
                    <Icon size={18} style={{ color: 'var(--color-trace)' }} />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div className="contact-label">{c.label}</div>
                    <div className="contact-value">{c.value}</div>
                  </div>
                  {c.href && (
                    <ArrowUpRight size={14} style={{
                      color: 'var(--color-paper)',
                      marginLeft: 'auto',
                      opacity: 0.4,
                    }} />
                  )}
                </div>
              );

              if (c.href) {
                return (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    style={{ textDecoration: 'none', width: '100%', maxWidth: 420 }}
                  >
                    {inner}
                  </a>
                );
              }
              return (
                <div key={c.label} style={{ width: '100%', maxWidth: 420 }}>
                  {inner}
                </div>
              );
            })}
          </div>

          <div className="cta-group" style={{ justifyContent: 'center' }}>
            <a href={`mailto:${meta.email}`} className="btn-primary">
              <Mail size={16} />
              Send a Message
            </a>
            <a href={meta.github} target="_blank" rel="noopener noreferrer" className="btn-outline">
              <Link2 size={16} />
              GitHub Profile
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
