import { ArrowUpRight } from 'lucide-react';
import Badge from '../components/Badge';

interface Project {
  title: string;
  category: string;
  points: string[];
  stack: string[];
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <div className="project-card-category">{project.category}</div>
        <ArrowUpRight size={14} style={{ color: 'var(--color-text-muted)', opacity: 0, transition: 'opacity 200ms' }} className="group-hover:opacity-100" />
      </div>
      <h3 className="project-card-title">{project.title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', marginTop: '0.75rem' }}>
        {project.points.slice(0, 2).map((point, i) => (
          <div className="project-card-point" key={i}>{point}</div>
        ))}
      </div>
      <div className="project-card-stack">
        {project.stack.slice(0, 5).map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
        {project.stack.length > 5 && (
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
            color: 'var(--color-text-muted)', padding: '0.2rem 0.5rem',
          }}>
            +{project.stack.length - 5}
          </span>
        )}
      </div>
    </article>
  );
}
