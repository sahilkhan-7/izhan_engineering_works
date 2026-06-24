"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch(`${API_URL}/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.get("email"), password: form.get("password") }) });
      if (!response.ok) throw new Error("Invalid admin credentials");
      const data = await response.json();
      localStorage.setItem("izhan_admin_token", data.access_token);
      router.push("/admin");
    } catch (err) { setError(err instanceof Error ? err.message : "Could not sign in"); }
  }
  return (
    <main className="login-shell blueprint">
      <section className="form-card tech-shadow login-card">
        <span className="eyebrow accent">Secure Administration</span><h1 className="section-title">Admin CMS</h1><p className="muted">Manage business details, services, projects, products, and quotation leads.</p>
        <form className="admin-form" style={{ padding: 0 }} onSubmit={login}>
          <div className="field"><label>Email</label><input name="email" type="email" defaultValue="admin@izhanengineering.com" required /></div>
          <div className="field"><label>Password</label><input name="password" type="password" required /></div>
          {error && <p style={{ color: "var(--danger)" }}>{error}</p>}
          <button className="button button-dark" type="submit">Sign In</button>
        </form>
      </section>
    </main>
  );
}
