import { notFound } from "next/navigation";
import { getProduct, getSiteContent } from "@/lib/api";
import { PublicShell } from "@/components/public-shell";
import { ProductGallery } from "@/components/product-gallery";
import { BuyNow } from "@/components/buy-now";
import { Icon } from "@/components/icons";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [product, content] = await Promise.all([getProduct(slug), getSiteContent()]);
  if (!product) notFound();
  const gallery = product.gallery.length ? product.gallery : [{ url: product.imageUrl, alt: product.name }];
  return (
    <PublicShell settings={content.settings}>
      <main className="section container" style={{ paddingTop: 136 }}>
        <div className="detail-layout">
          <div>
            <div className="product-heading">
              <span className="tag">{product.stockStatus}</span>
              <h1 className="display">{product.name}</h1>
            </div>
            <ProductGallery items={gallery} />
            <section className="detail-specs">
              <h2 className="sub-title">Description</h2>
              <p className="muted">{product.description}</p>
            </section>
            {product.features && product.features.length > 0 && (
              <section className="detail-specs">
                <h2 className="sub-title">Features</h2>
                <ul className="feature-list">{product.features.map((feature, i) => <li key={i}>{feature}</li>)}</ul>
              </section>
            )}
            {product.specifications.length > 0 && (
              <section className="detail-specs">
                <h2 className="sub-title">Technical Specifications</h2>
                <div className="spec-list">{product.specifications.map((item) => <div className="spec-row" key={item.label}><span className="muted">{item.label}</span><strong className="mono">{item.value}</strong></div>)}</div>
              </section>
            )}
          </div>
          <aside className="detail-aside">
            <div className="price-box">
              <div className="price">{product.priceLabel}</div>
              <p className="mono muted">Excluding taxes and installation</p>
            </div>
            {product.brochureUrl && <a className="button" href={product.brochureUrl} target="_blank" rel="noreferrer" download><Icon name="download" /> Download Brochure</a>}
            <BuyNow whatsapp={content.settings.whatsapp} product={product.name} />
          </aside>
        </div>
      </main>
    </PublicShell>
  );
}
