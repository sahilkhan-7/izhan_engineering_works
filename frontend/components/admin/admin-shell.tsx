"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SiteHeader } from "../site-header";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/specializations", label: "Specializations" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/settings", label: "Business Details" }
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("izhan_admin_token")) router.replace("/admin/login");
    else setReady(true);
  }, [router]);
  if (!ready) return <div className="login-shell"><span className="mono">Loading CMS…</span></div>;
  return (
    <>
      <SiteHeader phone="+91 98765 43210" whatsapp="919876543210" />
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <strong className="sub-title">Admin CMS</strong>
          <nav className="admin-nav">{links.map((item) => <Link key={item.href} className={`admin-link ${path === item.href ? "active" : ""}`} href={item.href}>{item.label}</Link>)}</nav>
          <button className="button" style={{ marginTop: "auto" }} onClick={() => { localStorage.removeItem("izhan_admin_token"); router.push("/admin/login"); }}>Sign Out</button>
        </aside>
        <main className="admin-main">{children}</main>
      </div>
    </>
  );
}
