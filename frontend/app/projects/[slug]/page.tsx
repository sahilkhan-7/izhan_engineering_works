import { notFound } from "next/navigation";
import { getProject, getSiteContent } from "@/lib/api";
import { PublicShell } from "@/components/public-shell";
import { ProductGallery } from "@/components/product-gallery";
import { QuoteForm } from "@/components/quote-form";

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [project, content] = await Promise.all([getProject(slug), getSiteContent()]);
  if (!project) notFound();
  const gallery = [{ url: project.imageUrl, alt: project.title }, ...project.gallery];
  return (
    <PublicShell settings={content.settings}>
      <main>
        <header className="page-hero blueprint"><div className="container"><span className="tag">{project.category}</span><h1 className="display">{project.title}</h1><p>{project.summary}</p></div></header>
        <section className="section container">
          <div className="detail-layout">
            <div>
              <ProductGallery items={gallery} />
              <div className="detail-specs"><h2 className="sub-title">Technical Gallery & Specifications</h2><div className="spec-list">{project.specifications.map((item) => <div className="spec-row" key={item.label}><span className="muted">{item.label}</span><strong className="mono">{item.value}</strong></div>)}</div></div>
            </div>
            <aside className="detail-aside">
              <div><span className="eyebrow accent">{project.location}</span><h2 className="section-title">Project Overview</h2><p className="muted">{project.description}</p>{project.client && <p><strong>Client:</strong> {project.client}</p>}{project.completionDate && <p><strong>Completed:</strong> {project.completionDate}</p>}</div>
              <div className="form-card tech-shadow"><h3 className="sub-title">Discuss a Similar Project</h3><QuoteForm whatsapp={content.settings.whatsapp} product={project.title} compact /></div>
            </aside>
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
