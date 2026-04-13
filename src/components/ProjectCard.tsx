import { Link } from 'react-router-dom';
import type { Project } from '../types';
import { StatusTag } from './StatusTag';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <div className="project-card__head">
        <div className="project-card__identity">
          {project.logoSrc ? (
            <img src={project.logoSrc} alt={`Logo ${project.name}`} className="project-card__logo" />
          ) : null}
          <div>
            <h3>{project.name}</h3>
            <p>{project.shortDescription}</p>
          </div>
        </div>
        <StatusTag status={project.status} />
      </div>

      <div className="project-card__action">
        <Link to={`/proyectos/${project.slug}`} className="text-link">
          Ver proyecto
        </Link>
      </div>
    </article>
  );
}
