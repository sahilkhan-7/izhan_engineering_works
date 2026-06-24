import Image from "next/image";
import { getSiteContent } from "@/lib/api";
import { PublicShell } from "@/components/public-shell";
import { Icon } from "@/components/icons";

export const metadata = { title: "Specializations" };

export default async function SpecializationsPage() {
  const content = await getSiteContent();
  return (
    <PublicShell settings={content.settings}>
      <main>
        <header className="page-hero blueprint"><div className="container"><span className="eyebrow accent">Engineering Capabilities</span><h1 className="display">Our Specializations</h1><p>Focused expertise across structural, industrial, security, and architectural fabrication.</p></div></header>
        <section className="section container specialization-list">
          {content.specializations.map((item) => (
            <article className="specialization-row" id={item.slug} key={item.id}>
              <div className="specialization-image image-frame tech-shadow"><Image className="image-cover image-zoom" src={item.imageUrl} alt={item.title} width={800} height={900} /></div>
              <div className="specialization-info">
                <span className="eyebrow accent">Precision Fabrication</span><h2>{item.title}</h2><p className="muted">{item.description}</p>
                <div className="spec-grid">
                  <div><h3 className="eyebrow">Technical Specifications</h3><div className="spec-list">{item.specifications.map((spec) => <div className="spec-row" key={spec.label}><span>{spec.label}</span><strong className="mono">{spec.value}</strong></div>)}</div></div>
                  <div><h3 className="eyebrow">Primary Materials</h3><div className="material-list">{item.materials.map((material) => <span className="tag" key={material}>{material}</span>)}</div></div>
                </div>
              </div>
            </article>
          ))}
        </section>
        <section className="section blueprint section-border"><div className="container" style={{ textAlign: "center" }}><h2 className="section-title">Have a custom engineering challenge?</h2><p className="muted">Bring us the site conditions, duty requirements, and design intent.</p><a className="button button-dark tech-shadow" href="/#quote">Request a Consultation <Icon name="arrow" /></a></div></section>
      </main>
    </PublicShell>
  );
}
