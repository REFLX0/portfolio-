import { profile } from '../data/profile';
import SectionEyebrow from '../components/SectionEyebrow';
import ProjectCard from './ProjectCard';

export default function ProjectGrid() {
  const { projects } = profile;
  return (
    <section data-waypoint={2} aria-label="Other Projects">
      <div className="section-wrap">
        <SectionEyebrow waypointIndex={2} />
        <h2 className="section-title">Other Projects</h2>
        <p className="section-subtitle" style={{ marginBottom: '2rem' }}>
          A selection of engineering work spanning AI, IoT, full-stack, DevOps, and computer vision.
        </p>
        <div className="bento-grid" style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
        }}>
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
