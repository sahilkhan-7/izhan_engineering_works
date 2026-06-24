"use client";

import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { adminRequest } from "@/lib/admin-api";

type Lead = { id: number; name: string; phone: string; email?: string; service?: string; product?: string; location?: string; message?: string; source: string; status: string; createdAt: string };

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState("");
  async function load() { try { setLeads(await adminRequest<Lead[]>("/admin/leads")); } catch (err) { setError(err instanceof Error ? err.message : "Could not load leads"); } }
  useEffect(() => { void load(); }, []);
  async function update(id: number, status: string) { await adminRequest(`/admin/leads/${id}`, { method: "PUT", body: JSON.stringify({ status }) }); await load(); }
  return (
    <AdminShell>
      <div className="admin-top"><div><span className="eyebrow accent">Sales Inbox</span><h1>Quote Leads</h1></div></div>
      {error && <div className="notice">{error}</div>}
      <section className="admin-panel"><div className="admin-panel-head"><h2 className="sub-title">All Enquiries</h2><span className="mono muted">{leads.length} leads</span></div><div className="table-wrap"><table className="admin-table"><thead><tr><th>Customer</th><th>Requirement</th><th>Contact</th><th>Message</th><th>Status</th><th>Received</th></tr></thead><tbody>
        {leads.map((lead) => <tr key={lead.id}><td><strong>{lead.name}</strong><br /><span className="mono muted">{lead.location}</span></td><td>{lead.product || lead.service || "General fabrication"}</td><td><a href={`tel:${lead.phone}`}>{lead.phone}</a><br /><a href={`mailto:${lead.email}`}>{lead.email}</a></td><td>{lead.message}</td><td><select value={lead.status} onChange={(event) => update(lead.id, event.target.value)}><option>NEW</option><option>CONTACTED</option><option>QUOTED</option><option>WON</option><option>LOST</option></select></td><td>{new Date(lead.createdAt).toLocaleString()}</td></tr>)}
      </tbody></table></div></section>
    </AdminShell>
  );
}
