import type { SiteContent } from "./types";

const images = {
  hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQShKJeY6yhYgh_wjGitjq-3XhiqCNpLmQf-h3Zc7TVqiIjSGlkGqGruapRC3ff71XQxJBPHxAtvKzsl47vSlcTFK-bn3PJCz8TvwVHFSHxSIeIBNW92-G3_vKgWWbmMI44v_hdbsgPgW0Y4rHmwvL77LqiefzR5k8UtyUxZiDbdLlQW87hs7FjupHijATnyL-FjcsQp47zz2ipd-xXF5UtTdytY-EKLhGKw57C8MH0JpMAb-6-Dt2xts6CayqQuY62vT-BEnEGt_Z",
  steel: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdpWJ4Em_42lcVj7TZa452M4SEIEr2AydUUkfwNEDgyqorFdnBi3R-zE18QWn6vyWbLlU9Be7B6uAiVyy70UGqnChC3NzvK9xvpJtlK0Rdzu_MyBxseZ5XgbcfJ-Y0b2psKhCPUrqJiV3f69IX_7m1aYh9NfpJduIKeVUii3M6TgtjXdNTOncqgJbd65lq7ch8DBXNnFYeaZo1wTkiJBt2IniTAI8BGRMuc0WvDzEt7RGBXOwBtSZOReQ9JMqSmbFiUyPb4hL5R2wn",
  shed: "https://lh3.googleusercontent.com/aida-public/AB6AXuDflKOmeIF-nD0EwjL4dLvhkEiWpg9HlDdMG75xy63PJdXtLZ1DryPyOLBHg3I9T-3nBAeJ57xTKn_lUHIcUbB_Qmiar6jZtEgHBIlRwJSs9D8_GsRfVT_9Ja_Sl2RD3msl-Din7TB_-kmH9wNx3Fadj3RqzV9t0DBNuwnrqx0BvABQjtKGEPP7y34MeiBXKhkFkuhPSfv0Dh7OBwggnZ49wbq-cVaQ3lhZQ4GjytRo0sVhqopQyH3OhZTubY2WUkZbiLnPMl4kor37",
  gate: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuDWONK_ncizpZPAxPqPwDCTMVJ9uuUlUoHkPjTZNqzStIcJX47ZpY_NIkIGRUEo1E60J4oVQakRizDoAbtMR20g3oxhNPin-naTHzM59wGh9afL3Ls5tTS8S7nyBV5C74Mt8MfqAljMd4-0w0Rju_hkrOWIwhbF1c0wA5eb-QUwZbUh1Iwp38nnvRhs6mJ_wD4SyAvLPOJg0h3zoITtao6zRrN9VZa_-ExppLUXssOPwo9kDQeAbqnl-pMzvee8kelXfYvsGBzTI5",
  railing: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuOHJr-XVUoGj8tFve6HYF20hbYQS4J-7KPCanDxXaU9F19giM6Gz6tnWRuTlA1COxODr34z5Dnr_PPRhkwh_dmsH7zrd7ZNtSHnxPWXAVhse5OHATR-0zsJ6GptRHB2Rr6kPA5NmlH8bpqkud7QlFjgZE0BA82HmJROAxwYauIwVYNqM0iJpTfuvoj9Dm7cS6r7cntGylFFVE75kj-IhBrPHe7vsZu7lQ8ryCnMNbisdZLJGUiS4vuyeTmYTsT7MCwijAGGT-akbD",
  project1: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTCsFDlFO3ltgzU8CG7kMQm8781pMiUMyj0RMeY_oiWyxPwnc8qtIewkGl8rz2HAFbSjsDEEeCf_f6u66aehgdiGOxH_icmyftt1p4khRrSO7LNb1fnHZFReYheWgaZb67SK5uPA8OXLZaz5HiMuk7Q5sbRE1HyWlqgRGxq0GfrFBOv86fFKKnqvRJ1AIezOcf7F7sgL6daFGHS1h-wHeQdOlc_z6_1lZITIDHgQHcjO1w3PfC3XfNXEg1BUbFP_0iGFPLwYAXCr6l",
  project2: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCxfnsSa4YpZkZqFYXynL8O5WfolVcF2I1lSAqPyEc_v8KSyWtcN647xGSraXHWFi1BEOcX8_Zsgmgz6MWjX1IXsoLddCGQvAtsJTasvZdapK7rSXL47e0G9SO-HOyZmX2pvPaZKRDQlJtlaZ4rYt0IjqvQWxeucRsKbRpH1KOsXHqVGHdcjq2CLlqo47_HD-T5i5VzjWwIJCh4AeutvCaT7c99h5PiwIGMzVkznMdNGSt9suAXydnNUjNvdWLXe3f1m9Ml_amf6MC",
  project3: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOtyld3DDke9y4Gk_Xxmd7dPYEKHeALaF-YWJGMFXMd8KAGxRgUdWcq1lsHClqlA_0FMPS9ySzppfy4rxWb9Dyx8knJVtw8rjaf1QwprjzOcfUfca8sJpohrGoToAvc6GcynyVV8AnQ2ihUqR3nuj4wQJqFkCiXoxiVy-BRbWWxcjIlZ75w4bePeSm76IxaTTecfMsUmsDJ410EDHMS6mHrv9uEicMgvn27XSKFKdDt6sz4SL5C8_xSMunBXDHFqUJu-V1rObshu2H",
  project4: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPiPG9Dti1yE6uKRZC95Cca1B264aQaEUd-Z7FL-YZy1vep1-vIH-8wSlbGIl24_ymTKTo_o8LRgqarBFEe5N0AcE88otvI_o5cEHxqJjQlwA6NQ8k3Qda25sQQPiVzIGvqWBWkBM2DmZ1qwqqsyFYERZBM1hPTeDppy3MVsbQknVLcyd24OCDW1ibueoqmYipLVfWwk66OxdOTz_oy9fojQsu1HHcfUXCm9f8Cx2hE-u_HU1DRaqD8I4xRD-AfEwcDoQrjBOOqTPi",
  product: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQNHTsjpk2Puqqq2zmS0JaaZ4_a47qmwu2E9qS6fTwqwebn3iyaXukTfXq84O6gkHMrIR24-QukNVHRfVfvHkKE7dre0Qaq9a3UIyTuJaZoEcQ1vVsnAKCBTvIFJiLTh0rKblLokI9LzCi2VxI9AWF3UmQF8G1hVXzDn06DmxTYSmjhzbo_3WjAsoz_eVpB-oaesO8nX_bHSGcfOrQPlTZaH9uiPRjZgPF8m6sr6IWw38Gu3iFqfqlJMUn7CJBvFN-SJ_LEANUDkcG",
  product2: "https://lh3.googleusercontent.com/aida-public/AB6AXuAw5iAB1KCQ7VZCSfM8lKIQhyFqqSUctxTWQ0imiOU1EGIe54ODSjG09rUIaxJV4J0Zh7ZiqvdfWXIqo005ghXA6tE_wWXWkhevEMnZ12eBtDhe9V0rkihDn-2gekue2HEhctyxC5JaBAim8L7z2s7D5q4gPf1Lri_-aJs6bXkqezf83xxRFy36KA5Ic-FW1MYr1aK6vM2vB_7fmVR7Fj4xdJ_LE5ii5RgJ2UXBKUFHXKUm9O4b6bVcZrj6qT9jpwDLqIOtBjBcEUXL",
  workshop1: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5NOCt5hqpUwUgPmLphMcFGJcxlYfUjcCUW-Jo2sZoE3UO8Ni6F5xifn8VEkThI6Oloyx3ORtuxl7UCXdCEK9m_fle5tAM0sF3TiV_gg8UlSEE5WI05wwrP-fJUhvHX-HWcJfVIfYxzlbXvalx-YyxTTO5I1uJPWYQs0EY0T9q6_Qgv5hYPIFEnlYgRK0nbArNFok6UtdUHGc1K3lD3xmDBw2ATC6O7riWQSbcjLzjgUBBCMXsdojkI151jZZ1mOI6IEE1PWHJe-Qq",
  workshop2: "https://lh3.googleusercontent.com/aida-public/AB6AXuBf1x-nQAYWgdcNbSobrvtahVPR1oJ2NWkgqsm1L4HtEy_o4nRPa5VRezTyW_c0PdyfGwUj0hjSUG3Dd43jw62NhoCsik91mNkzl0gwumhR0z5ldUP7OFvDFbsbJ9hq40c8iXO4UrmSH6MDlz1ymmHVbNq6O2GfdXkBF_MHZr7Yi7b7iw_Je9zDr2mEcbFnp6ddYYHVIUHQwwY4QxEY1p5zqD2JUvavr1xe5EI7TkkaIVfRqdeepY9wMOAkv-yNvnpzrhimIP7vUYL",
  workshop3: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrfc4QRbagYCnyY_AMwscIzEw1vi1IDs4hY4jl7nB3lz_yE2q9oBwzbN5wXFBzOG3ATnkrkEfgsyq0pIS_kjDMPaLLDg-6d6Inx6GTdiK4LHfArtdjONHDY7wbnRm1vdMkHGjKuduWl9knEa615x4-IRhZ4V4bCvampmh0lOMQ8jJ03oD2F7wq0vciq7XPDDkNmpVUBu1ds2CJP2wV8hqevAn9BOEToQz_VQ5K4dU91zRbuCi3gt-rI2Q45hPcPQaDGx1N38E9T0-u"
};

export const seedContent: SiteContent = {
  settings: {
    businessName: "Izhan Engineering Works",
    shortName: "IZHAN ENGINEERING",
    tagline: "Industrial Excellence",
    heroTitle: "Precision Engineering. Crafted Excellence.",
    heroDescription: "Specialists in Premium Gate Fabrication, Industrial Sheds, and Structural Steel Works. We deliver robust solutions built to endure.",
    phone: "+91 98765 43210",
    whatsapp: "919876543210",
    email: "ops@izhanengineering.com",
    address: "Industrial Area, New Delhi, India",
    mapEmbedUrl: "https://www.google.com/maps?q=New%20Delhi%20India&output=embed",
    yearsExperience: "15+",
    toleranceAccuracy: "±0.05mm",
    certifiedWelders: "50+",
    certification: "ISO 9001",
    aboutTitle: "Industrial Precision Standards",
    aboutDescription: "Izhan Engineering Works has been at the forefront of precision fabrication for over 15 years, delivering robust solutions that stand the test of time. Our mission is to combine cutting-edge technology with unparalleled craftsmanship.",
    aboutNote: "Our workshop operates under strict Quality Assurance Protocols, ensuring every component meets international safety benchmarks.",
    heroImageUrl: images.hero,
    socialLinks: [
      { label: "Instagram", url: "https://instagram.com" },
      { label: "Facebook", url: "https://facebook.com" },
      { label: "LinkedIn", url: "https://linkedin.com" }
    ]
  },
  specializations: [
    {
      id: 1, slug: "structural-steel-frameworks", title: "Structural Steel Frameworks",
      summary: "Heavy-duty frameworks engineered for industrial loads and long-term structural integrity.",
      description: "Design, fabrication, and erection of custom structural steel systems for factories, warehouses, and commercial developments.",
      imageUrl: images.steel, specifications: [{ label: "Load capacity", value: "Project specific" }, { label: "Tolerance", value: "±0.05mm" }, { label: "Finish", value: "Epoxy / Galvanized" }],
      materials: ["Mild Steel", "Stainless Steel", "Structural Sections"], published: true, sortOrder: 1
    },
    {
      id: 2, slug: "industrial-tin-sheds", title: "Industrial Tin Sheds",
      summary: "Weather-resistant factory and warehouse sheds planned for usable clear spans.",
      description: "Complete industrial shed solutions spanning steel framing, roofing, cladding, drainage, and on-site installation.",
      imageUrl: images.shed, specifications: [{ label: "Span", value: "Up to 40m" }, { label: "Roofing", value: "PPGI sheets" }, { label: "Wind design", value: "Site specific" }],
      materials: ["PPGI", "Mild Steel", "Insulated Panels"], published: true, sortOrder: 2
    },
    {
      id: 3, slug: "automated-gate-systems", title: "Automated Gate Systems",
      summary: "Secure sliding and swing gates with quiet, dependable automation.",
      description: "Premium access-control gates built around robust frames, reliable motors, safety sensors, and refined architectural finishes.",
      imageUrl: images.gate, specifications: [{ label: "Capacity", value: "Up to 1500kg" }, { label: "Opening", value: "Up to 12m" }, { label: "Controls", value: "Remote / RFID" }],
      materials: ["AISI 304", "Mild Steel", "Aluminium"], published: true, sortOrder: 3
    },
    {
      id: 4, slug: "architectural-railings", title: "Architectural Railings",
      summary: "Crisp stainless steel and glass railing systems made to architectural tolerances.",
      description: "Custom balustrades, staircase railings, grills, and facade elements with careful joint finishing and site-fit accuracy.",
      imageUrl: images.railing, specifications: [{ label: "Glass", value: "12–17.5mm" }, { label: "Finish", value: "Mirror / Satin" }, { label: "Grade", value: "AISI 304 / 316" }],
      materials: ["Stainless Steel", "Toughened Glass", "Brass"], published: true, sortOrder: 4
    }
  ],
  projects: [
    {
      id: 1, slug: "titanium-alloy-support-structure", title: "Titanium Alloy Support Structure", category: "Structural", location: "Facility Alpha",
      summary: "High-stress load-bearing frameworks designed for extreme environmental conditions.",
      description: "A technically demanding support structure delivered with tight dimensional control, traceable fabrication, and staged quality inspections.",
      imageUrl: images.project1, featured: true, published: true, sortOrder: 1, client: "Industrial Systems Group", completionDate: "2024",
      specifications: [{ label: "Tolerance", value: "±0.05mm" }, { label: "Material", value: "Grade 5 Ti" }, { label: "Delivery", value: "18 weeks" }],
      gallery: [{ url: images.project1, alt: "Support structure fabrication" }, { url: images.steel, alt: "Steel assembly detail" }, { url: images.workshop1, alt: "Workshop production" }]
    },
    {
      id: 2, slug: "commercial-glass-balustrade", title: "Commercial Glass Balustrade", category: "Railings", location: "Corporate District",
      summary: "Minimalist stainless steel fixtures designed for a corporate headquarters.",
      description: "A seamless stainless and glass balustrade package balancing safety, durability, and clean architectural sightlines.",
      imageUrl: images.project2, featured: true, published: true, sortOrder: 2,
      specifications: [{ label: "Finish", value: "Satin" }, { label: "Glass", value: "15mm toughened" }], gallery: [{ url: images.project2, alt: "Balustrade detail" }, { url: images.railing, alt: "Railing installation" }]
    },
    {
      id: 3, slug: "automated-perimeter-security", title: "Automated Perimeter Security", category: "Gates", location: "Logistics Hub",
      summary: "Heavy-duty motorized sliding gates with integrated sensor arrays.",
      description: "A complete high-security perimeter access package including fabrication, automation, safety loops, and commissioning.",
      imageUrl: images.project3, featured: false, published: true, sortOrder: 3,
      specifications: [{ label: "Gate weight", value: "1400kg" }, { label: "Opening", value: "10m" }], gallery: [{ url: images.project3, alt: "Automated industrial gate" }]
    },
    {
      id: 4, slug: "architectural-facade-grills", title: "Architectural Facade Grills", category: "Grills", location: "Civic Center",
      summary: "Custom geometric steel enclosures providing security and architectural value.",
      description: "Precision-cut modular screens engineered to align across a large facade while remaining serviceable.",
      imageUrl: images.project4, featured: false, published: true, sortOrder: 4,
      specifications: [{ label: "Modules", value: "84" }, { label: "Finish", value: "Powder coated" }], gallery: [{ url: images.project4, alt: "Geometric facade grills" }]
    }
  ],
  products: [
    {
      id: 1, slug: "premium-sliding-gate-system", name: "Premium Sliding Gate System",
      summary: "High-durability automated security gate with our silent rail system.",
      description: "A made-to-measure sliding gate package with structural steel reinforcement, precision track hardware, safety sensors, and installation support.",
      priceLabel: "Starting at ₹3,75,000", price: 375000, currency: "INR", stockStatus: "IN STOCK", imageUrl: images.product,
      published: true, sortOrder: 1, specifications: [{ label: "Material", value: "AISI 304 Stainless" }, { label: "Max Dimensions", value: "12m × 3m" }, { label: "Motor Rating", value: "1500kg Capacity" }, { label: "Operating Temp", value: "-20°C to +55°C" }],
      gallery: [{ url: images.product, alt: "Premium sliding gate motor housing" }, { url: images.product2, alt: "Silent rail system" }, { url: images.project3, alt: "Installed sliding gate" }]
    },
    {
      id: 2, slug: "stainless-glass-railing", name: "Stainless Glass Railing",
      summary: "Architectural stainless steel railing with toughened glass infill.",
      description: "Built to site measurements with satin or mirror finished posts and premium glass hardware.",
      priceLabel: "From ₹4,500 / running ft", currency: "INR", stockStatus: "MADE TO ORDER", imageUrl: images.project2,
      published: true, sortOrder: 2, specifications: [{ label: "Steel", value: "AISI 304 / 316" }, { label: "Glass", value: "12mm toughened" }], gallery: [{ url: images.project2, alt: "Glass railing" }]
    }
  ],
  testimonials: [
    { id: 1, name: "Rajiv Mehta", company: "Mehta Logistics", quote: "The gate installation was precise, clean, and delivered on schedule. The automation has been completely dependable.", rating: 5 },
    { id: 2, name: "Anita Sharma", company: "Apex Developers", quote: "Their fabrication quality is visible in every joint. Izhan handled a difficult site with genuine engineering discipline.", rating: 5 },
    { id: 3, name: "Vikram Singh", company: "Northline Industries", quote: "A responsive team, accurate drawings, and excellent execution. They understood our operational constraints immediately.", rating: 5 }
  ],
  workshopMedia: [
    { url: images.workshop1, alt: "Main fabrication workshop", mediaType: "image", sortOrder: 1 },
    { url: images.workshop2, alt: "Precision welding bay", mediaType: "image", sortOrder: 2 },
    { url: images.workshop3, alt: "Steel cutting equipment", mediaType: "image", sortOrder: 3 },
    { url: images.hero, alt: "Fabrication in progress", mediaType: "video", sortOrder: 4 }
  ]
};
