"use client";

import { useState } from "react";
import { Icon } from "./icons";

type QuoteFormProps = {
  whatsapp: string;
  product?: string;
  compact?: boolean;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export function QuoteForm({ whatsapp, product, compact = false }: QuoteFormProps) {
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: { preventDefault(): void; currentTarget: HTMLFormElement }) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    setSubmitting(true);
    setMessage("");
    try {
      await fetch(`${API_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, source: product ? "product" : "website", product })
      });
    } catch {
      // WhatsApp remains the primary handoff even when the local API is offline.
    }
    const wa = whatsapp.replace(/[^\d]/g, "");
    const lines = [
      "*Izhan Engineering Works – Quote Request*",
      "",
      `*Name:* ${payload.name ?? ""}`,
      payload.phone ? `*Phone:* ${payload.phone}` : "",
      payload.email ? `*Email:* ${payload.email}` : "",
      !compact && payload.service ? `*Service:* ${payload.service}` : "",
      product ? `*Product:* ${product}` : "",
      payload.location ? `*Location:* ${payload.location}${payload.pincode ? `, ${payload.pincode}` : ""}` : "",
      payload.message ? `*Details:* ${payload.message}` : "",
    ].filter(Boolean).join("\n");
    setMessage("Opening WhatsApp with your quotation details…");
    window.open(`https://wa.me/${wa}?text=${encodeURIComponent(lines)}`, "_blank", "noopener,noreferrer");
    setSubmitting(false);
  }

  return (
    <form className="form-grid" onSubmit={submit}>
      <div className="field"><label htmlFor={`${product}-name`}>Name</label><input id={`${product}-name`} name="name" placeholder="Full Name" required /></div>
      <div className="field"><label htmlFor={`${product}-phone`}>Phone</label><input id={`${product}-phone`} name="phone" type="tel" placeholder="+91 00000 00000" /></div>
      <div className={`field ${compact ? "full" : ""}`}><label htmlFor={`${product}-email`}>Email</label><input id={`${product}-email`} name="email" type="email" placeholder="name@company.com" /></div>
      {!compact && <div className="field"><label htmlFor="service">Service</label><select id="service" name="service" defaultValue=""><option value="" disabled>Select requirement</option><option>Gate Fabrication</option><option>Structural Steel</option><option>Industrial Shed</option><option>Railings &amp; Grills</option><option>Custom Fabrication</option></select></div>}
      <div className="field"><label htmlFor={`${product}-location`}>Installation Address</label><input id={`${product}-location`} name="location" placeholder="Street / City" /></div>
      <div className="field"><label htmlFor={`${product}-pincode`}>Pincode</label><input id={`${product}-pincode`} name="pincode" inputMode="numeric" placeholder="Postal code" /></div>
      <div className="field full"><label htmlFor={`${product}-message`}>Project Details</label><textarea id={`${product}-message`} name="message" placeholder="Dimensions, material, intended use, timeline…" /></div>
      <div className="field full">
        <button className="button button-dark" disabled={submitting} type="submit">{submitting ? "Preparing…" : "Continue via WhatsApp"} <Icon name="arrow" /></button>
        {message && <p className="form-message" role="status">{message}</p>}
      </div>
    </form>
  );
}
