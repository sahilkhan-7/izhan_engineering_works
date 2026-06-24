"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "./icons";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/specializations", label: "Specialization" },
  { href: "/products", label: "Products" },
  { href: "/#contact", label: "Contact" }
];

export function SiteHeader({ phone, whatsapp }: { phone: string; whatsapp: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const phoneHref = `tel:${phone.replace(/[^\d+]/g, "")}`;
  const whatsappHref = `https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`;
  return (
    <>
      <header className="site-header">
        <div className="container site-header-inner">
          <Link className="brand" href="/">IZHAN ENGINEERING</Link>
          <nav className="main-nav" aria-label="Main navigation">
            {links.map((link) => (
              <Link key={link.href} className={`nav-link mono ${pathname.startsWith(link.href.replace("/#contact", "/contact")) || (link.href !== "/" && pathname.startsWith(link.href)) ? "active" : ""}`} href={link.href}>{link.label}</Link>
            ))}
          </nav>
          <div className="header-actions">
            <a className="button" href={phoneHref}><Icon name="call" /> Call</a>
            <a className="button button-dark" href={whatsappHref} target="_blank" rel="noreferrer"><Icon name="chat" /> WhatsApp</a>
          </div>
          <button className="menu-button" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}><Icon name={open ? "close" : "menu"} /></button>
        </div>
      </header>
      {open && (
        <nav className="mobile-menu" aria-label="Mobile navigation">
          {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}
        </nav>
      )}
      <div className="mobile-actions">
        <a className="button" href={phoneHref}><Icon name="call" /> Call</a>
        <a className="button button-dark" href={whatsappHref} target="_blank" rel="noreferrer"><Icon name="chat" /> WhatsApp</a>
      </div>
    </>
  );
}
