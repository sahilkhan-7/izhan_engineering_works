"use client";
import { AdminShell } from "@/components/admin/admin-shell";
import { ResourceManager } from "@/components/admin/resource-manager";

export default function AdminSpecializations() {
  return <AdminShell><ResourceManager title="Specializations" endpoint="specializations" emptyItem={{ published: true, sortOrder: 0, specifications: [], materials: [] }} columns={[{ key: "imageUrl", label: "Image", image: true }, { key: "title", label: "Specialization" }, { key: "sortOrder", label: "Order" }, { key: "published", label: "Status" }]} fields={[
    { name: "title", label: "Title", required: true }, { name: "slug", label: "URL Slug", required: true }, { name: "summary", label: "Short Summary", type: "textarea" }, { name: "description", label: "Full Description", type: "textarea" },
    { name: "imageUrl", label: "Cover Image", type: "image", required: true }, { name: "sortOrder", label: "Sort Order", type: "number" }, { name: "specifications", label: "Specifications", type: "specs" },
    { name: "materials", label: "Materials", type: "list" }, { name: "published", label: "Published", type: "checkbox" }
  ]} /></AdminShell>;
}
