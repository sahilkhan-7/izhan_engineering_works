"use client";
import { AdminShell } from "@/components/admin/admin-shell";
import { ResourceManager } from "@/components/admin/resource-manager";

export default function AdminProducts() {
  return <AdminShell><ResourceManager title="Products" endpoint="products" emptyItem={{ published: true, sortOrder: 0, currency: "INR", features: [], specifications: [], gallery: [] }} columns={[{ key: "imageUrl", label: "Image", image: true }, { key: "name", label: "Product" }, { key: "priceLabel", label: "Price" }, { key: "stockStatus", label: "Stock" }, { key: "published", label: "Status" }]} fields={[
    { name: "name", label: "Name", required: true }, { name: "slug", label: "URL Slug", required: true }, { name: "summary", label: "Short Summary", type: "textarea" }, { name: "description", label: "Full Description", type: "textarea" },
    { name: "features", label: "Features (bullet points)", type: "list" },
    { name: "priceLabel", label: "Displayed Price" }, { name: "price", label: "Numeric Price", type: "number" }, { name: "currency", label: "Currency" }, { name: "stockStatus", label: "Stock Status" },
    { name: "imageUrl", label: "Cover Image", type: "image", required: true }, { name: "brochureUrl", label: "Brochure PDF Link", hint: "Paste a link to the product brochure PDF" }, { name: "sortOrder", label: "Sort Order", type: "number" },
    { name: "specifications", label: "Specifications", type: "specs" }, { name: "gallery", label: "Gallery (images & videos)", type: "gallery" }, { name: "published", label: "Published", type: "checkbox" }
  ]} /></AdminShell>;
}
