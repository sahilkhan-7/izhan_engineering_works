"use client";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export function getToken() {
  return typeof window === "undefined" ? "" : localStorage.getItem("izhan_admin_token") ?? "";
}

export async function adminRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      ...init?.headers
    }
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `Request failed (${response.status})`);
  }
  return response.json() as Promise<T>;
}

// Upload a single image file and return its public URL. The browser sets the
// multipart boundary automatically, so no Content-Type header is provided.
export async function uploadImage(file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  const response = await fetch(`${API_URL}/admin/uploads`, {
    method: "POST",
    headers: { Authorization: `Bearer ${getToken()}` },
    body
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `Upload failed (${response.status})`);
  }
  const data = (await response.json()) as { url: string };
  return data.url;
}
