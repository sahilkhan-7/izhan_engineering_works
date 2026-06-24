"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/types";
import { ProjectCard } from "./project-card";

export function ProjectFilters({ projects }: { projects: Project[] }) {
  const categories = ["All", ...Array.from(new Set(projects.map((item) => item.category)))];
  const [active, setActive] = useState("All");
  const visible = useMemo(() => active === "All" ? projects : projects.filter((item) => item.category === active), [active, projects]);
  return (
    <>
      <div className="filters">
        {categories.map((category) => <button key={category} className={`button filter-button ${active === category ? "active" : ""}`} onClick={() => setActive(category)}>{category}</button>)}
      </div>
      <div className="project-grid" style={{ marginTop: 48 }}>
        {visible.map((project, index) => <ProjectCard key={project.id} project={project} featured={index === 0} />)}
      </div>
    </>
  );
}
