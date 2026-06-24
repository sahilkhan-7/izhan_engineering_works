"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { adminRequest } from "@/lib/admin-api";

type Dashboard = { projects: number; products: number; specializations: number; newLeads: number; recentLeads: { id: number; name: string; phone: string; service: string; status: string; createdAt: string }[] };

export default function AdminDashboard() {
  const [data, setData] = useState<Dashboard>({ projects: 0, products: 0, specializations: 0, newLeads: 0, recentLeads: [] });
  useEffect(() => { adminRequest<Dashboard>("/admin/dashboard").then(setData).catch(() => undefined); }, []);
  return (
    <AdminShell>
      <div className="admin-top"><div><span className="eyebrow accent">Overview</span><h1>Dashboard</h1></div><span className="mono muted">IZHAN ENGINEERING CMS</span></div>
      <div className="metrics"><div className="metric"><span className="eyebrow muted">Projects</span><strong>{data.projects}</strong></div><div className="metric"><span className="eyebrow muted">Products</span><strong>{data.products}</strong></div><div className="metric"><span className="eyebrow muted">Specializations</span><strong>{data.specializations}</strong></div><div className="metric"><span className="eyebrow muted">New Leads</span><strong>{data.newLeads}</strong></div></div>
      <section className="admin-panel"><div className="admin-panel-head"><h2 className="sub-title">Recent Quote Leads</h2></div><div className="table-wrap"><table className="admin-table"><thead><tr><th>Name</th><th>Phone</th><th>Requirement</th><th>Status</th><th>Received</th></tr></thead><tbody>{data.recentLeads.map((lead) => <tr key={lead.id}><td>{lead.name}</td><td>{lead.phone}</td><td>{lead.service}</td><td><span className={`status ${lead.status === "NEW" ? "pending" : ""}`}>{lead.status}</span></td><td>{new Date(lead.createdAt).toLocaleDateString()}</td></tr>)}</tbody></table></div></section>
    </AdminShell>
  );
}
