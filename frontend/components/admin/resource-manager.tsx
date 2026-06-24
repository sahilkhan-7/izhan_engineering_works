"use client";

import { useCallback, useEffect, useState } from "react";
import { adminRequest, uploadImage } from "@/lib/admin-api";

export type FieldConfig = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "checkbox" | "image" | "gallery" | "specs" | "list";
  required?: boolean;
  hint?: string;
};

type ResourceManagerProps = {
  title: string;
  endpoint: string;
  fields: FieldConfig[];
  columns: { key: string; label: string; image?: boolean }[];
  emptyItem: Record<string, unknown>;
};

type MediaValue = { url: string; alt?: string; mediaType?: "image" | "video" };
type SpecValue = { label: string; value: string };

export function ResourceManager({ title, endpoint, fields, columns, emptyItem }: ResourceManagerProps) {
  const [items, setItems] = useState<Record<string, any>[]>([]);
  const [editing, setEditing] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");

  const load = useCallback(async () => {
    try { setItems(await adminRequest<Record<string, any>[]>(`/admin/${endpoint}`)); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not load records"); }
  }, [endpoint]);
  useEffect(() => { void load(); }, [load]);

  function setField(name: string, value: unknown) {
    setEditing((prev) => (prev ? { ...prev, [name]: value } : prev));
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing || saving) return;
    const missing = fields.find((f) => f.required && !String(editing[f.name] ?? "").trim());
    if (missing) { setError(`${missing.label} is required.`); return; }
    setSaving(true);
    setError("");
    try {
      const id = editing.id;
      // The heavy lifting (base64 conversion) already happened on selection, so this
      // request simply persists the prepared payload while the UI shows a working state.
      await adminRequest(`/admin/${endpoint}${id ? `/${id}` : ""}`, { method: id ? "PUT" : "POST", body: JSON.stringify(editing) });
      setEditing(null);
      setSuccess(`${title.replace(/s$/, "")} ${id ? "updated" : "added"} successfully.`);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save record");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: number) {
    if (!window.confirm("Delete this record? This cannot be undone.")) return;
    try { await adminRequest(`/admin/${endpoint}/${id}`, { method: "DELETE" }); await load(); }
    catch (err) { setError(err instanceof Error ? err.message : "Could not delete record"); }
  }

  return (
    <>
      <div className="admin-top"><div><span className="eyebrow accent">Content Management</span><h1>{title}</h1></div><button className="button button-dark" onClick={() => setEditing({ ...emptyItem })}>Add New</button></div>
      {error && <div className="notice" role="alert">{error}</div>}
      <section className="admin-panel">
        <div className="admin-panel-head"><h2 className="sub-title">Published Content</h2><span className="mono muted">{items.length} records</span></div>
        <div className="table-wrap"><table className="admin-table"><thead><tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}<th>Actions</th></tr></thead>
          <tbody>{items.map((item) => <tr key={item.id}>{columns.map((column) => <td key={column.key}>{column.image ? <img src={item[column.key]} alt="" /> : column.key === "published" ? <span className={`status ${item[column.key] ? "" : "pending"}`}>{item[column.key] ? "Published" : "Draft"}</span> : String(item[column.key] ?? "")}</td>)}<td><button className="button" onClick={() => setEditing(item)}>Edit</button> <button className="button" onClick={() => remove(item.id)}>Delete</button></td></tr>)}</tbody>
        </table></div>
      </section>
      {editing && (
        <section className="admin-panel" style={{ marginTop: 28 }}>
          <div className="admin-panel-head"><h2 className="sub-title">{editing.id ? "Edit" : "Add"} {title}</h2><button className="button" onClick={() => setEditing(null)} disabled={saving}>Close</button></div>
          <form className="admin-form" onSubmit={save}>
            <div className="admin-grid">
              {fields.map((field) => (
                <FieldEditor key={field.name} field={field} value={editing[field.name]} onChange={(v) => setField(field.name, v)} />
              ))}
            </div>
            <button className="button button-dark" type="submit" disabled={saving}>{saving ? "Saving…" : "Save Changes"}</button>
          </form>
        </section>
      )}
      {success && (
        <div className="modal-overlay" role="dialog" aria-modal="true" onClick={() => setSuccess("")}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-check">✓</div>
            <h3 className="sub-title">Saved</h3>
            <p className="muted">{success}</p>
            <button className="button button-dark" onClick={() => setSuccess("")}>Done</button>
          </div>
        </div>
      )}
    </>
  );
}

function FieldEditor({ field, value, onChange }: { field: FieldConfig; value: any; onChange: (value: unknown) => void }) {
  const wide = field.type === "textarea" || field.type === "gallery" || field.type === "specs" || field.type === "list";
  return (
    <div className={`field ${wide ? "full" : ""}`}>
      <label htmlFor={field.name}>{field.label}</label>
      {field.type === "textarea" ? (
        <textarea id={field.name} required={field.required} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
      ) : field.type === "checkbox" ? (
        <input id={field.name} type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
      ) : field.type === "number" ? (
        <input id={field.name} type="number" required={field.required} value={value ?? 0} onChange={(e) => onChange(Number(e.target.value || 0))} />
      ) : field.type === "image" ? (
        <ImageField id={field.name} value={value ?? ""} onChange={onChange} />
      ) : field.type === "gallery" ? (
        <GalleryField value={Array.isArray(value) ? value : []} onChange={onChange} />
      ) : field.type === "specs" ? (
        <SpecsField value={Array.isArray(value) ? value : []} onChange={onChange} />
      ) : field.type === "list" ? (
        <ListField value={Array.isArray(value) ? value : []} onChange={onChange} />
      ) : (
        <input id={field.name} type="text" required={field.required} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
      )}
      {field.hint && <span className="field-hint">{field.hint}</span>}
    </div>
  );
}

function ImageField({ id, value, onChange }: { id: string; value: string; onChange: (value: unknown) => void }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  async function pick(file?: File) {
    if (!file) return;
    setBusy(true); setErr("");
    try { onChange(await uploadImage(file)); }
    catch (e) { setErr(e instanceof Error ? e.message : "Upload failed"); }
    finally { setBusy(false); }
  }
  return (
    <div className="upload-field">
      <input id={id} type="file" accept="image/*" disabled={busy} onChange={(e) => void pick(e.target.files?.[0])} />
      {busy && <span className="field-hint">Uploading…</span>}
      {err && <span className="field-hint" style={{ color: "var(--danger)" }}>{err}</span>}
      {value ? (
        <div className="upload-preview">
          <img src={value} alt="" />
          <button type="button" className="button" onClick={() => onChange("")}>Remove</button>
        </div>
      ) : !busy && <span className="field-hint">No image selected. Upload an image file.</span>}
    </div>
  );
}

function GalleryField({ value, onChange }: { value: MediaValue[]; onChange: (value: unknown) => void }) {
  const [videoUrl, setVideoUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const images = value.filter((m) => m.mediaType !== "video");
  const videos = value.filter((m) => m.mediaType === "video");

  async function addImages(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true); setErr("");
    try {
      // Upload all selected images in parallel, then append the returned URLs.
      const added = await Promise.all(Array.from(files).map(async (file) => ({ url: await uploadImage(file), alt: file.name, mediaType: "image" as const })));
      onChange([...value, ...added]);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }
  function addVideo() {
    const url = videoUrl.trim();
    if (!url) return;
    onChange([...value, { url, alt: "Video", mediaType: "video" as const }]);
    setVideoUrl("");
  }
  function removeAt(item: MediaValue) {
    onChange(value.filter((m) => m !== item));
  }

  return (
    <div className="gallery-editor">
      <div className="upload-field">
        <span className="field-hint">Images — upload one or more</span>
        <input type="file" accept="image/*" multiple disabled={busy} onChange={(e) => void addImages(e.target.files)} />
        {busy && <span className="field-hint">Uploading…</span>}
        {err && <span className="field-hint" style={{ color: "var(--danger)" }}>{err}</span>}
        {images.length > 0 && (
          <div className="upload-grid">
            {images.map((item, i) => (
              <div className="upload-preview" key={`img-${i}`}>
                <img src={item.url} alt="" />
                <button type="button" className="button" onClick={() => removeAt(item)}>Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="upload-field">
        <span className="field-hint">YouTube videos — paste a link and add</span>
        <div className="inline-add">
          <input type="url" placeholder="https://youtube.com/watch?v=…" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
          <button type="button" className="button" onClick={addVideo}>Add</button>
        </div>
        {videos.length > 0 && (
          <div className="chip-list">
            {videos.map((item, i) => (
              <span className="chip" key={`vid-${i}`}>{item.url}<button type="button" onClick={() => removeAt(item)} aria-label="Remove">×</button></span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SpecsField({ value, onChange }: { value: SpecValue[]; onChange: (value: unknown) => void }) {
  function update(index: number, key: keyof SpecValue, v: string) {
    onChange(value.map((row, i) => (i === index ? { ...row, [key]: v } : row)));
  }
  return (
    <div className="rows-editor">
      {value.map((row, i) => (
        <div className="row-pair" key={i}>
          <input placeholder="Label (e.g. Material)" value={row.label ?? ""} onChange={(e) => update(i, "label", e.target.value)} />
          <input placeholder="Value (e.g. Mild Steel)" value={row.value ?? ""} onChange={(e) => update(i, "value", e.target.value)} />
          <button type="button" className="button" onClick={() => onChange(value.filter((_, j) => j !== i))} aria-label="Remove">×</button>
        </div>
      ))}
      <button type="button" className="button" onClick={() => onChange([...value, { label: "", value: "" }])}>Add specification</button>
    </div>
  );
}

function ListField({ value, onChange }: { value: string[]; onChange: (value: unknown) => void }) {
  return (
    <div className="rows-editor">
      {value.map((row, i) => (
        <div className="row-pair single" key={i}>
          <input placeholder="Item" value={row ?? ""} onChange={(e) => onChange(value.map((r, j) => (j === i ? e.target.value : r)))} />
          <button type="button" className="button" onClick={() => onChange(value.filter((_, j) => j !== i))} aria-label="Remove">×</button>
        </div>
      ))}
      <button type="button" className="button" onClick={() => onChange([...value, ""])}>Add item</button>
    </div>
  );
}
