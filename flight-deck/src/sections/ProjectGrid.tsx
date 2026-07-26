import { profile } from '../data/profile.ts';
import SectionEyebrow from '../components/SectionEyebrow.tsx';
import ProjectCard from './ProjectCard.tsx';

export default function ProjectGrid() {
  const { projects } = profile;
  return (
    <section className="waypoint-section" data-waypoint={2} aria-label="Payload Bay — Other Projects">
      <div className="section-content">
        <SectionEyebrow waypointIndex={2} />
        <h2 className="mb-8" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, color: 'var(--color-paper)' }}>
          Other Projects
        </h2>
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))' }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
