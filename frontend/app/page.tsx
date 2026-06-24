import Image from "next/image";
import Link from "next/link";
import { getSiteContent } from "@/lib/api";
import { PublicShell } from "@/components/public-shell";
import { Icon } from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import { QuoteForm } from "@/components/quote-form";

export default async function HomePage() {
  const content = await getSiteContent();
  const { settings } = content;
  const testimonials = [...content.testimonials, ...content.testimonials];
  return (
    <PublicShell settings={settings}>
      <main>
        <section className="hero blueprint">
          <div className="container grid-12">
            <div className="hero-copy">
              <div className="status-chip"><span className="status-dot" /><span className="eyebrow">{settings.tagline}</span></div>
              <h1 className="display">{settings.heroTitle}</h1>
              <p className="hero-description">{settings.heroDescription}</p>
              <div className="hero-buttons">
                <a className="button button-dark tech-shadow" href="#quote">Get Free Quote <Icon name="arrow" /></a>
                <Link className="button" href="/projects">View Projects</Link>
              </div>
            </div>
            <div className="hero-media">
              <div className="image-frame tech-shadow hero-photo"><Image className="image-cover image-zoom" src={settings.heroImageUrl} alt="Industrial welding and precision fabrication" width={720} height={900} priority /></div>
              <div className="production-card tech-shadow"><div className="eyebrow accent">Status</div><strong className="sub-title">In Production</strong></div>
            </div>
          </div>
        </section>

        <section className="section container" id="about">
          <div className="about-grid">
            <div className="about-copy">
              <h2 className="section-title">{settings.aboutTitle}</h2>
              <p className="muted">{settings.aboutDescription}</p>
              <div className="notice">{settings.aboutNote}</div>
            </div>
            <div className="stats">
              <div className="stat"><strong>{settings.yearsExperience}</strong><span className="eyebrow muted">Years Experience</span></div>
              <div className="stat"><strong>{settings.toleranceAccuracy}</strong><span className="eyebrow muted">Tolerance Accuracy</span></div>
              <div className="stat"><strong>{settings.certifiedWelders}</strong><span className="eyebrow muted">Certified Welders</span></div>
              <div className="stat"><strong>{settings.certification}</strong><span className="eyebrow muted">Quality Standard</span></div>
            </div>
          </div>
        </section>

        <section className="section section-border blueprint">
          <div className="container">
            <div className="section-head">
              <div><h2 className="section-title">Core Specializations</h2><p className="muted">From structural frameworks to refined architectural metalwork, every system is engineered for its site and duty cycle.</p></div>
              <Link className="button section-head-action" href="/specializations">Explore Expertise <Icon name="arrow" /></Link>
            </div>
            <div className="specialization-grid">
              {content.specializations.slice(0, 4).map((item, index) => (
                <article className="specialization-card" key={item.id}>
                  <span className="index mono">0{index + 1}</span><h3>{item.title}</h3><p>{item.summary}</p>
                  <Link className="text-link" href={`/specializations#${item.slug}`}>Explore <Icon name="arrow" /></Link>
                </article>
              ))}
            </div>
            <div className="section-foot-action"><Link className="button" href="/specializations">Explore Expertise <Icon name="arrow" /></Link></div>
          </div>
        </section>

        <section className="section container">
          <div className="section-head">
            <div><h2 className="section-title">Featured Projects</h2><p className="muted">Selected commissions demonstrating our approach to fabrication accuracy, build quality, and site execution.</p></div>
            <Link className="button section-head-action" href="/projects">View More Projects <Icon name="arrow" /></Link>
          </div>
          <div className="project-grid">{content.projects.slice(0, 3).map((project, index) => <ProjectCard key={project.id} project={project} featured={index === 0} />)}</div>
          <div className="section-foot-action"><Link className="button" href="/projects">View More Projects <Icon name="arrow" /></Link></div>
        </section>

        <section className="section container" id="workshop">
          <div className="section-head"><div><h2 className="section-title">Our Workshop Facility</h2><p className="muted">A production environment built around accurate cutting, controlled welding, clean assembly, and reliable inspection.</p></div></div>
          <div className="workshop-grid">
            {content.workshopMedia.map((item) => <div className="workshop-item" key={item.url}><Image className="image-cover image-zoom" src={item.url} alt={item.alt} width={900} height={600} />{item.mediaType === "video" && <span className="play"><Icon name="play" /></span>}</div>)}
          </div>
        </section>

        <section className="testimonials">
          <div className="container"><h2 className="section-title" style={{ textAlign: "center", marginBottom: 46 }}>Client Testimonials</h2></div>
          <div className="testimonial-track">
            {testimonials.map((item, index) => <article className="testimonial-card tech-shadow" key={`${item.id}-${index}`}><div className="stars">★★★★★</div><p>“{item.quote}”</p><strong>{item.name}</strong><div className="mono muted">{item.company}</div></article>)}
          </div>
        </section>

        <section className="section container" id="quote">
          <div className="quote-grid">
            <div><span className="eyebrow accent">Start a Project</span><h2 className="section-title">Request a Free Quote</h2><p className="muted">Tell us what you are planning. Your details are saved as a lead, then passed into WhatsApp so the conversation can continue immediately.</p></div>
            <div className="form-card tech-shadow"><QuoteForm whatsapp={settings.whatsapp} /></div>
          </div>
        </section>

        <section className="section container" id="contact">
          <div className="location-grid tech-shadow">
            <div className="location-copy"><span className="eyebrow accent">Visit the Workshop</span><h2 className="section-title">Our Location</h2><p className="muted">{settings.address}</p><a className="button button-dark" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address)}`} target="_blank" rel="noreferrer"><Icon name="pin" /> Get Directions</a></div>
            <iframe className="location-map" src={settings.mapEmbedUrl} loading="lazy" title="Izhan Engineering location map" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </section>
      </main>
    </PublicShell>
  );
}
