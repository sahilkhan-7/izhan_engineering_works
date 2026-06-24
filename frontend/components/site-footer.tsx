import Link from "next/link";
import type { SiteSettings } from "@/lib/types";
import { SocialIcon } from "@/components/icons";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  const waNumber = settings.whatsapp.replace(/[^\d]/g, "");
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h3 className="sub-title">{settings.shortName}</h3>
            <p>Precision fabrication engineered for demanding industrial and architectural applications.</p>
            <div className="socials">
              {settings.socialLinks.map((item) => (
                <a key={item.label} href={item.url} target="_blank" rel="noreferrer" aria-label={item.label} title={item.label}>
                  <SocialIcon platform={item.label} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="eyebrow">Quick Links</h3>
            <div className="footer-links">
              <Link href="/projects">Projects</Link>
              <Link href="/specializations">Expertise</Link>
              <Link href="/products">Products</Link>
              <Link href="/#workshop">Workshop</Link>
            </div>
          </div>
          <div>
            <h3 className="eyebrow">Company</h3>
            <div className="footer-links">
              <Link href="/#about">About</Link>
              <Link href="/#contact">Contact</Link>
              <a href="#">Privacy Policy</a>
            </div>
          </div>
          <div>
            <h3 className="eyebrow">Contact</h3>
            <div className="footer-links">
              <a href="tel:+917014945318">+91-7014945318</a>
              <a href="tel:+919887260947">+91-9887260947</a>
              <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noreferrer">WhatsApp: +91-9887260947</a>
              <a href={`mailto:${settings.email}`}>{settings.email}</a>
              <p>{settings.address}</p>
            </div>
          </div>
        </div>
        <div className="copyright">
          <span>© {new Date().getFullYear()} {settings.businessName}. All rights reserved.</span>
          <span className="mono">PRECISION IN FABRICATION</span>
        </div>
      </div>
    </footer>
  );
}
