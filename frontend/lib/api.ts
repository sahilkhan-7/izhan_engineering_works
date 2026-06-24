import { seedContent } from "./seed-content";
import type { Product, Project, SiteContent, Specialization } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
    next: { revalidate: 60 }
  });
  if (!response.ok) throw new Error(`API ${response.status}`);
  return response.json() as Promise<T>;
}

export async function getSiteContent(): Promise<SiteContent> {
  try {
    return await request<SiteContent>("/content");
  } catch {
    return seedContent;
  }
}

export async function getProject(slug: string): Promise<Project | undefined> {
  try {
    return await request<Project>(`/projects/${slug}`);
  } catch {
    return seedContent.projects.find((item) => item.slug === slug);
  }
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  try {
    return await request<Product>(`/products/${slug}`);
  } catch {
    return seedContent.products.find((item) => item.slug === slug);
  }
}

export async function getSpecializations(): Promise<Specialization[]> {
  return (await getSiteContent()).specializations;
}
