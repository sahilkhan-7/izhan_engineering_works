"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Icon } from "./icons";

// react-leaflet must load client-side only (it needs window), so disable SSR.
const MapPicker = dynamic(() => import("./map-picker"), { ssr: false, loading: () => <div className="order-map" /> });

type Form = { name: string; phone: string; email: string; address: string; pincode: string };
const EMPTY: Form = { name: "", phone: "", email: "", address: "", pincode: "" };

export function BuyNow({ whatsapp, product }: { whatsapp: string; product: string }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Form>(EMPTY);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [showMap, setShowMap] = useState(false);

  function set<K extends keyof Form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function close() {
    setOpen(false);
    setShowMap(false);
  }

  async function reverseGeocode(lat: number, lng: number) {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`, { headers: { "Accept-Language": "en" } });
      const data = await res.json();
      const a = data.address ?? {};
      setForm((f) => ({ ...f, address: data.display_name ?? f.address, pincode: a.postcode ?? f.pincode }));
    } catch {
      // Manual entry stays available if reverse geocoding fails or is rate-limited.
    }
  }

  function onLocationSelect(lat: number, lng: number) {
    setCoords({ lat, lng });
    void reverseGeocode(lat, lng);
  }

  function submit(event: { preventDefault(): void }) {
    event.preventDefault();
    if (!form.name.trim() || !form.address.trim()) return;
    const wa = whatsapp.replace(/[^\d]/g, "");
    const mapLink = coords ? `https://www.google.com/maps?q=${coords.lat},${coords.lng}` : "";
    const lines = [
      "*Izhan Engineering Works – Buy Now*",
      "",
      `*Product:* ${product}`,
      `*Name:* ${form.name}`,
      form.phone ? `*Phone:* ${form.phone}` : "",
      form.email ? `*Email:* ${form.email}` : "",
      `*Delivery Address:* ${form.address}`,
      form.pincode ? `*Pincode:* ${form.pincode}` : "",
      mapLink ? `*Map location:* ${mapLink}` : "",
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/${wa}?text=${encodeURIComponent(lines)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <button className="button button-dark" type="button" onClick={() => setOpen(true)}>Buy Now <Icon name="arrow" /></button>
      {open && (
        <div className="modal-overlay" role="dialog" aria-modal="true" onClick={close}>
          <div className="order-modal" onClick={(e) => e.stopPropagation()}>
            <div className="order-modal-head">
              <div><span className="eyebrow accent">Buy Now</span><h2 className="sub-title">{product}</h2></div>
              <button className="button" type="button" onClick={close} aria-label="Close"><Icon name="close" /></button>
            </div>
            <form className="order-form" onSubmit={submit}>
              <div className="field"><label>Name *</label><input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Full name" required /></div>
              <div className="form-grid">
                <div className="field"><label>Phone</label><input value={form.phone} onChange={(e) => set("phone", e.target.value)} type="tel" placeholder="+91 00000 00000" /></div>
                <div className="field"><label>Email (optional)</label><input value={form.email} onChange={(e) => set("email", e.target.value)} type="email" placeholder="name@email.com" /></div>
              </div>
              <div className="field">
                <div className="label-row">
                  <label>Delivery Address *</label>
                  <button type="button" className="pin-link" onClick={() => setShowMap((v) => !v)}><Icon name="pin" /> {showMap ? "Hide map" : "Pin on map (optional)"}</button>
                </div>
                <textarea value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="House / street / area / city" required />
                {showMap && (
                  <>
                    <MapPicker onLocationSelect={onLocationSelect} />
                    {coords && <span className="field-hint">Pinned: {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)} — tap the map to adjust.</span>}
                  </>
                )}
              </div>
              <div className="field"><label>Pincode</label><input value={form.pincode} onChange={(e) => set("pincode", e.target.value)} inputMode="numeric" placeholder="Postal code" /></div>
              <button className="button button-dark" type="submit">Checkout via WhatsApp <Icon name="chat" /></button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
