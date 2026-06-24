import { getSiteContent } from "@/lib/api";
import { PublicShell } from "@/components/public-shell";
import { ProjectFilters } from "@/components/project-filters";

export const metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const content = await getSiteContent();
  return (
    <PublicShell settings={content.settings}>
      <main>
        <header className="page-hero blueprint"><div className="container"><span className="eyebrow accent">Selected Work</span><h1 className="display">Featured Projects</h1><p>A selection of our most challenging engineering commissions, demonstrating our commitment to industrial craftsmanship.</p></div></header>
        <section className="section container"><ProjectFilters projects={content.projects} /></section>
      </main>
    </PublicShell>
  );
}
