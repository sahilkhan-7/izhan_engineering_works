"use client";

import { FormEvent, useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { adminRequest } from "@/lib/admin-api";
import type { SiteSettings } from "@/lib/types";

const fields: { key: keyof SiteSettings; label: string; textarea?: boolean; json?: boolean }[] = [
  { key: "businessName", label: "Business Name" }, { key: "shortName", label: "Header Name" }, { key: "tagline", label: "Tagline" },
  { key: "heroTitle", label: "Hero Title" }, { key: "heroDescription", label: "Hero Description", textarea: true }, { key: "heroImageUrl", label: "Hero Image URL" },
  { key: "aboutTitle", label: "About Section Title" }, { key: "aboutDescription", label: "About Description", textarea: true }, { key: "aboutNote", label: "Quality Note", textarea: true },
  { key: "phone", label: "Phone" }, { key: "whatsapp", label: "WhatsApp Number" }, { key: "email", label: "Email" }, { key: "address", label: "Address", textarea: true }, { key: "mapEmbedUrl", label: "Google Map Embed URL" },
  { key: "yearsExperience", label: "Years Experience" }, { key: "toleranceAccuracy", label: "Tolerance Accuracy" }, { key: "certifiedWelders", label: "Certified Welders" }, { key: "certification", label: "Certification" },
  { key: "socialLinks", label: "Social Links JSON", textarea: true, json: true }
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [message, setMessage] = useState("");
  useEffect(() => { adminRequest<SiteSettings>("/admin/settings").then(setSettings).catch((err) => setMessage(String(err))); }, []);
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload: Record<string, unknown> = {};
    fields.forEach((field) => { const raw = String(form.get(field.key) || ""); payload[field.key] = field.json ? JSON.parse(raw) : raw; });
    try { setSettings(await adminRequest<SiteSettings>("/admin/settings", { method: "PUT", body: JSON.stringify(payload) })); setMessage("Business details updated."); }
    catch (err) { setMessage(err instanceof Error ? err.message : "Could not save settings"); }
  }
  return (
    <AdminShell>
      <div className="admin-top"><div><span className="eyebrow accent">Global Website Content</span><h1>Business Details</h1></div></div>
      {!settings ? <p className="mono">Loading settings…</p> : <section className="admin-panel"><div className="admin-panel-head"><h2 className="sub-title">Site Settings</h2></div><form className="admin-form" onSubmit={save}><div className="admin-grid">
        {fields.map((field) => <div className={`field ${field.textarea ? "full" : ""}`} key={field.key}><label>{field.label}</label>{field.textarea ? <textarea name={field.key} defaultValue={field.json ? JSON.stringify(settings[field.key], null, 2) : String(settings[field.key] ?? "")} /> : <input name={field.key} defaultValue={String(settings[field.key] ?? "")} />}</div>)}
      </div><button className="button button-dark" type="submit">Save Business Details</button>{message && <p className="form-message">{message}</p>}</form></section>}
    </AdminShell>
  );
}
