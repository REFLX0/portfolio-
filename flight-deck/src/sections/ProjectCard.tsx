import Badge from '../components/Badge.tsx';

interface Project {
  title: string;
  category: string;
  points: string[];
  stack: string[];
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className="project-card" style={{ animationDelay: `${index * 50}ms` }}>
      <div className="mb-2 text-xs font-mono tracking-wider" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-trace)', fontSize: '0.65rem' }}>
        {project.category}
      </div>
      <h3 className="mb-3" style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-paper)', lineHeight: 1.3 }}>
        {project.title}
      </h3>
      <ul className="mb-4 flex flex-col gap-2" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {project.points.map((point, i) => (
          <li key={i} className="text-sm text-muted" style={{ lineHeight: 1.55, paddingLeft: 10, borderLeft: '2px solid var(--color-line)' }}>
            {point}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>
    </article>
  );
}
