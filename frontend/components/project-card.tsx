import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";
import { Icon } from "./icons";

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article className={`project-card tech-shadow card-hover ${featured ? "featured" : ""}`}>
      <div className="project-image image-frame">
        <Image className="image-cover image-zoom" src={project.imageUrl} alt={project.title} width={900} height={600} />
      </div>
      <div className="project-content">
        <span className="tag">{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="project-meta">
          <span className="mono muted">{project.location}</span>
          <Link className="text-link" href={`/projects/${project.slug}`}>View Details <Icon name="arrow" /></Link>
        </div>
      </div>
    </article>
  );
}
