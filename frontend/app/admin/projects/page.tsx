"use client";
import { AdminShell } from "@/components/admin/admin-shell";
import { ResourceManager } from "@/components/admin/resource-manager";

export default function AdminProjects() {
  return <AdminShell><ResourceManager title="Projects" endpoint="projects" emptyItem={{ published: true, featured: false, sortOrder: 0, specifications: [], gallery: [] }} columns={[{ key: "imageUrl", label: "Image", image: true }, { key: "title", label: "Project" }, { key: "category", label: "Category" }, { key: "location", label: "Location" }, { key: "published", label: "Status" }]} fields={[
    { name: "title", label: "Title", required: true }, { name: "slug", label: "URL Slug", required: true }, { name: "category", label: "Category", required: true }, { name: "location", label: "Location" },
    { name: "summary", label: "Short Summary", type: "textarea" }, { name: "description", label: "Full Description", type: "textarea" }, { name: "imageUrl", label: "Cover Image", type: "image", required: true },
    { name: "client", label: "Client" }, { name: "completionDate", label: "Completion Date" }, { name: "sortOrder", label: "Sort Order", type: "number" },
    { name: "specifications", label: "Specifications", type: "specs" }, { name: "gallery", label: "Gallery (images & videos)", type: "gallery" }, { name: "featured", label: "Featured", type: "checkbox" }, { name: "published", label: "Published", type: "checkbox" }
  ]} /></AdminShell>;
}
