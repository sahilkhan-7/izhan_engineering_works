"use client";

import { useState, useEffect } from "react";
import NavbarClient from "../products/NavbarClient";
import Footer from "@/components/Footer";

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  features: string;
  media: string;
  youtubeUrl: string | null;
}

interface Project {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
  media: string;
  youtubeUrl: string | null;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [aboutContent, setAboutContent] = useState({ mainDescription: "", stats: [], features: [] });
  const [contactSettings, setContactSettings] = useState({
    email: "", phone1: "", phone2: "", address: "", mapUrl: "", whatsapp: "", instagram: "", facebook: ""
  });
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    features: "",
    media: "",
    youtubeUrl: ""
  });
  const [projectFormData, setProjectFormData] = useState({
    title: "",
    location: "",
    type: "",
    description: "",
    media: "",
    youtubeUrl: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === "products") fetchProducts();
    if (activeTab === "projects") fetchProjects();
    if (activeTab === "about") fetchAbout();
    if (activeTab === "contact") fetchContact();
  }, [activeTab]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleDelete = async (id: string, type: 'product' | 'project') => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;
    try {
      const res = await fetch(`/api/${type}s/${id}`, { method: "DELETE" });
      if (res.ok) {
        type === 'product' ? fetchProducts() : fetchProjects();
      }
    } catch (error) {
      console.error(`Failed to delete ${type}:`, error);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  const fetchAbout = async () => {
    try {
      const res = await fetch("/api/about");
      if (res.ok) {
        const data = await res.json();
        setAboutContent({
          mainDescription: data.mainDescription || "",
          stats: typeof data.stats === 'string' ? JSON.parse(data.stats) : data.stats || [],
          features: typeof data.features === 'string' ? JSON.parse(data.features) : data.features || []
        });
      }
    } catch (error) {
      console.error("Failed to fetch about:", error);
    }
  };

  const fetchContact = async () => {
    try {
      const res = await fetch("/api/contact");
      if (res.ok) {
        const data = await res.json();
        setContactSettings({
          email: data.email || "",
          phone1: data.phone1 || "",
          phone2: data.phone2 || "",
          address: data.address || "",
          mapUrl: data.mapUrl || "",
          whatsapp: data.whatsapp || "",
          instagram: data.instagram || "",
          facebook: data.facebook || ""
        });
      }
    } catch (error) {
      console.error("Failed to fetch contact:", error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isProject: boolean) => {
    const files = e.target.files;
    if (!files) return;
    
    setLoading(true);
    const uploadedUrls: string[] = [];
    
    try {
      for (let i = 0; i < files.length; i++) {
        const formData = new FormData();
        formData.append("file", files[i]);
        
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData
        });
        
        if (res.ok) {
          const data = await res.json();
          uploadedUrls.push(data.url);
        } else {
          console.error("Upload failed for file", files[i].name);
        }
      }
      
      const newMedia = uploadedUrls.join(", ");
      if (isProject) {
        setProjectFormData(prev => ({ 
          ...prev, 
          media: prev.media ? `${prev.media}, ${newMedia}` : newMedia 
        }));
      } else {
        setFormData(prev => ({ 
          ...prev, 
          media: prev.media ? `${prev.media}, ${newMedia}` : newMedia 
        }));
      }
    } catch (error) {
      console.error("Upload process failed:", error);
      alert("Failed to upload images. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/[^0-9.]/g, ''); // Remove all non-numeric characters except dot
    if (val) {
      // Add INR symbol if there is a value
      val = "₹" + val;
    }
    setFormData({...formData, price: val});
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        features: formData.features.split(",").map(f => f.trim()).filter(f => f),
        media: formData.media.split(",").map(m => m.trim()).filter(m => m)
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsAdding(false);
        setFormData({ name: "", price: "", category: "", description: "", features: "", media: "", youtubeUrl: "" });
        fetchProducts();
      }
    } catch (error) {
      console.error("Failed to add product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...projectFormData,
        media: projectFormData.media.split(",").map(m => m.trim()).filter(m => m)
      };

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsAdding(false);
        setProjectFormData({ title: "", location: "", type: "", description: "", media: "", youtubeUrl: "" });
        fetchProjects();
      }
    } catch (error) {
      console.error("Failed to add project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aboutContent)
      });
      if (res.ok) alert("About Section Updated!");
    } catch (error) {
      console.error("Failed to update about:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactSettings)
      });
      if (res.ok) alert("Contact Settings Updated!");
    } catch (error) {
      console.error("Failed to update contact:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/login", { method: "DELETE" });
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-500 flex flex-col">
      <NavbarClient />
      
      <main className="flex-1 px-6 md:px-12 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full md:w-64 shrink-0">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sticky top-32">
                <h2 className="font-bold text-xl mb-6 px-4">Admin Panel</h2>
                <nav className="space-y-2">
                  {[
                    { id: "products", label: "Products" },
                    { id: "projects", label: "Featured Projects" },
                    { id: "about", label: "About Content" },
                    { id: "contact", label: "Contact Settings" },
                    { id: "team", label: "Team Members" },
                    { id: "settings", label: "Settings" }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => { setActiveTab(tab.id); setIsAdding(false); }}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                        activeTab === tab.id 
                          ? "bg-orange-500 text-white font-medium shadow-md shadow-orange-500/20" 
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 rounded-xl transition-colors text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 mt-8"
                  >
                    Logout
                  </button>
                </nav>
              </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8 overflow-hidden">
              <div className="flex justify-between items-center mb-8 border-b border-gray-100 dark:border-gray-700 pb-4">
                <h1 className="text-2xl font-bold capitalize">{activeTab} Management</h1>
                {!isAdding && (activeTab === "products" || activeTab === "projects") && (
                  <button 
                    onClick={() => setIsAdding(true)}
                    className="px-4 py-2 bg-orange-500 text-white font-medium rounded-lg text-sm hover:opacity-90 transition-opacity"
                  >
                    + Add {activeTab === "products" ? "Product" : "Project"}
                  </button>
                )}
              </div>

              {activeTab === "products" ? (
                isAdding ? (
                  <form onSubmit={handleSubmitProduct} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Product Name</label>
                        <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Price</label>
                        <input required type="text" value={formData.price} onChange={handlePriceChange} placeholder="₹0" className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">YouTube Video URL (Optional)</label>
                        <input type="url" value={formData.youtubeUrl} onChange={e => setFormData({...formData, youtubeUrl: e.target.value})} placeholder="https://youtube.com/watch?v=..." className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700" rows={3}></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Features (Comma separated)</label>
                      <input type="text" value={formData.features} onChange={e => setFormData({...formData, features: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700" placeholder="Motorized, Anti-rust, Custom size" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Upload Images</label>
                      <input type="file" multiple accept="image/*" onChange={(e) => handleFileUpload(e, false)} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />
                      {loading && <p className="text-sm text-orange-500 mt-2">Uploading...</p>}
                      <p className="text-xs text-gray-500 mt-1">Uploaded URLs will be added to the field below automatically.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Image URLs (Comma separated)</label>
                      <input required type="text" value={formData.media} onChange={e => setFormData({...formData, media: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700" placeholder="https://example.com/image.jpg" />
                    </div>
                    <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Cancel</button>
                      <button type="submit" disabled={loading} className="px-4 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors">{loading ? "Saving..." : "Save Product"}</button>
                    </div>
                  </form>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="pb-3 font-medium">Name</th>
                          <th className="pb-3 font-medium">Category</th>
                          <th className="pb-3 font-medium">Price</th>
                          <th className="pb-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.length === 0 ? (
                          <tr><td colSpan={4} className="py-6 text-center text-gray-500">No products found. Add your first product!</td></tr>
                        ) : (
                          products.map(p => (
                            <tr key={p.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                              <td className="py-3">{p.name}</td>
                              <td className="py-3"><span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 px-2 py-1 rounded-full text-xs">{p.category}</span></td>
                              <td className="py-3 font-medium">{p.price}</td>
                              <td className="py-3">
                                <button onClick={() => handleDelete(p.id, 'product')} className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors">Delete</button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )
              ) : activeTab === "projects" ? (
                isAdding ? (
                  <form onSubmit={handleSubmitProject} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Project Title</label>
                        <input required type="text" value={projectFormData.title} onChange={e => setProjectFormData({...projectFormData, title: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Location</label>
                        <input required type="text" value={projectFormData.location} onChange={e => setProjectFormData({...projectFormData, location: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Type (e.g. Commercial)</label>
                        <input required type="text" value={projectFormData.type} onChange={e => setProjectFormData({...projectFormData, type: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">YouTube Video URL (Optional)</label>
                        <input type="url" value={projectFormData.youtubeUrl} onChange={e => setProjectFormData({...projectFormData, youtubeUrl: e.target.value})} placeholder="https://youtube.com/watch?v=..." className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <textarea required value={projectFormData.description} onChange={e => setProjectFormData({...projectFormData, description: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700" rows={3}></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Upload Images</label>
                      <input type="file" multiple accept="image/*,video/mp4,video/webm" onChange={(e) => handleFileUpload(e, true)} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />
                      {loading && <p className="text-sm text-orange-500 mt-2">Uploading...</p>}
                      <p className="text-xs text-gray-500 mt-1">Uploaded URLs will be added to the field below automatically.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Image/Video URLs (Comma separated)</label>
                      <input required type="text" value={projectFormData.media} onChange={e => setProjectFormData({...projectFormData, media: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700" placeholder="https://example.com/image.jpg" />
                    </div>
                    <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">Cancel</button>
                      <button type="submit" disabled={loading} className="px-4 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors">{loading ? "Saving..." : "Save Project"}</button>
                    </div>
                  </form>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                          <th className="pb-3 font-medium">Title</th>
                          <th className="pb-3 font-medium">Type</th>
                          <th className="pb-3 font-medium">Location</th>
                          <th className="pb-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projects.length === 0 ? (
                          <tr><td colSpan={4} className="py-6 text-center text-gray-500">No projects found.</td></tr>
                        ) : (
                          projects.map(p => (
                            <tr key={p.id} className="border-b border-gray-100 dark:border-gray-800 last:border-0">
                              <td className="py-3">{p.title}</td>
                              <td className="py-3"><span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 px-2 py-1 rounded-full text-xs">{p.type}</span></td>
                              <td className="py-3 font-medium">{p.location}</td>
                              <td className="py-3">
                                <button onClick={() => handleDelete(p.id, 'project')} className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors">Delete</button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )
              ) : activeTab === "about" ? (
                <form onSubmit={handleSaveAbout} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Main Description</label>
                    <textarea 
                      required 
                      value={aboutContent.mainDescription} 
                      onChange={e => setAboutContent({...aboutContent, mainDescription: e.target.value})} 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700" 
                      rows={5}
                      placeholder="Izhan Engineering Works is a trusted name..."
                    ></textarea>
                  </div>
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/10 rounded-xl border border-orange-100 dark:border-orange-800/30">
                    <p className="text-sm text-orange-600 dark:text-orange-400 font-medium mb-2">Note: Advanced Stats & Features editing UI is currently in development. Main description changes will apply immediately.</p>
                  </div>
                  <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button type="submit" disabled={loading} className="px-4 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors">{loading ? "Saving..." : "Save About Content"}</button>
                  </div>
                </form>
              ) : activeTab === "contact" ? (
                <form onSubmit={handleSaveContact} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Email Address</label>
                      <input required type="email" value={contactSettings.email} onChange={e => setContactSettings({...contactSettings, email: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Primary Phone</label>
                      <input required type="text" value={contactSettings.phone1} onChange={e => setContactSettings({...contactSettings, phone1: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Secondary Phone</label>
                      <input type="text" value={contactSettings.phone2} onChange={e => setContactSettings({...contactSettings, phone2: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">WhatsApp Number</label>
                      <input type="text" value={contactSettings.whatsapp} onChange={e => setContactSettings({...contactSettings, whatsapp: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700" placeholder="e.g. 919887260947" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Instagram URL</label>
                      <input type="url" value={contactSettings.instagram} onChange={e => setContactSettings({...contactSettings, instagram: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Facebook URL</label>
                      <input type="url" value={contactSettings.facebook} onChange={e => setContactSettings({...contactSettings, facebook: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <textarea required value={contactSettings.address} onChange={e => setContactSettings({...contactSettings, address: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700" rows={2}></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Google Maps URL</label>
                    <input type="url" value={contactSettings.mapUrl} onChange={e => setContactSettings({...contactSettings, mapUrl: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700" />
                  </div>
                  <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button type="submit" disabled={loading} className="px-4 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition-colors">{loading ? "Saving..." : "Save Contact Settings"}</button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">🚧</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">Under Construction</h3>
                  <p className="text-gray-500 dark:text-gray-400 max-w-md">
                    This section will be available soon. Please use the Products tab for now.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer isDark={false} />
    </div>
  );
}
