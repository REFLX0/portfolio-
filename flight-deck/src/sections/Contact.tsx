import { profile } from '../data/profile.ts';
import SectionEyebrow from '../components/SectionEyebrow.tsx';
import Button from '../components/Button.tsx';
import Footer from '../components/Footer.tsx';
import { Mail, Phone, MapPin, Globe, Link2 } from 'lucide-react';

export default function Contact() {
  const { meta, summary } = profile;
  const contacts = [
    { icon: Mail, label: 'Email', value: meta.email, href: `mailto:${meta.email}` },
    { icon: Phone, label: 'Phone', value: meta.phone, href: `tel:${meta.phone.replace(/\s/g, '')}` },
    { icon: MapPin, label: 'Location', value: meta.location, href: undefined },
    { icon: Globe, label: 'GitHub', value: 'REFLX0', href: meta.github },
    { icon: Link2, label: 'LinkedIn', value: 'aziz-jlassi111', href: meta.linkedin },
  ];

  return (
    <section className="waypoint-section" data-waypoint={5} aria-label="Rendezvous — Contact">
      <div className="section-content" style={{ maxWidth: 700, textAlign: 'center' }}>
        <SectionEyebrow waypointIndex={5} />
        <h2 className="mb-4" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, color: 'var(--color-paper)' }}>
          Get in Touch
        </h2>
        <p className="mb-8 text-muted mx-auto" style={{ fontSize: '0.95rem', lineHeight: 1.7, maxWidth: 540 }}>{summary}</p>
        <div className="flex flex-col items-center gap-3 mb-8">
          {contacts.map((c) => {
            const Icon = c.icon;
            const content = (
              <div className="flex items-center gap-3 px-4 py-3 rounded-md transition-colors duration-200" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-line)', width: 300, textAlign: 'left' }}>
                <Icon size={16} style={{ color: 'var(--color-trace)', flexShrink: 0 }} />
                <div>
                  <div className="text-xs text-muted" style={{ fontFamily: 'var(--font-mono)' }}>{c.label}</div>
                  <div className="text-sm" style={{ color: 'var(--color-paper)', wordBreak: 'break-all' }}>{c.value}</div>
                </div>
              </div>
            );
            if (c.href) {
              return (
                <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined} style={{ textDecoration: 'none' }}>
                  {content}
                </a>
              );
            }
            return <div key={c.label}>{content}</div>;
          })}
        </div>
        <div className="flex justify-center gap-3 mb-12">
          <Button href={`mailto:${meta.email}`}>Send message</Button>
          <Button href={meta.github} target="_blank" rel="noopener noreferrer">View GitHub</Button>
        </div>
        <Footer />
      </div>
    </section>
  );
}
