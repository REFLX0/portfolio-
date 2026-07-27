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
      <div className="project-card-category">{project.category}</div>
      <h3 className="project-card-title">{project.title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
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
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--color-paper)',
            padding: '0.2rem 0.5rem',
          }}>
            +{project.stack.length - 5}
          </span>
        )}
      </div>
    </article>
  );
}
