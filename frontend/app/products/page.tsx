import Image from "next/image";
import Link from "next/link";
import { getSiteContent } from "@/lib/api";
import { PublicShell } from "@/components/public-shell";
import { Icon } from "@/components/icons";

export const metadata = { title: "Products" };

export default async function ProductsPage() {
  const content = await getSiteContent();
  return (
    <PublicShell settings={content.settings}>
      <main>
        <header className="page-hero blueprint"><div className="container"><span className="eyebrow accent">Engineered Products</span><h1 className="display">Fabrication Products</h1><p>Made-to-order systems backed by site measurement, technical review, and installation support.</p></div></header>
        <section className="section container">
          <div className="project-grid">
            {content.products.map((product, index) => (
              <article className={`project-card tech-shadow card-hover ${index === 0 ? "featured" : ""}`} key={product.id}>
                <div className="project-image image-frame"><Image className="image-cover image-zoom" src={product.imageUrl} alt={product.name} width={900} height={650} /></div>
                <div className="project-content"><span className="tag">{product.stockStatus}</span><h3>{product.name}</h3><p>{product.summary}</p><div className="project-meta"><strong className="sub-title">{product.priceLabel}</strong><Link className="text-link" href={`/products/${product.slug}`}>View Product <Icon name="arrow" /></Link></div></div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
