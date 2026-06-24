export type MediaItem = {
  id?: number;
  url: string;
  alt: string;
  mediaType?: "image" | "video";
  sortOrder?: number;
};

export type Specialization = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  description: string;
  imageUrl: string;
  specifications: { label: string; value: string }[];
  materials: string[];
  published: boolean;
  sortOrder: number;
};

export type Project = {
  id: number;
  slug: string;
  title: string;
  category: string;
  location: string;
  summary: string;
  description: string;
  imageUrl: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  completionDate?: string;
  client?: string;
  specifications: { label: string; value: string }[];
  gallery: MediaItem[];
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  summary: string;
  description: string;
  priceLabel: string;
  price?: number;
  currency: string;
  stockStatus: string;
  imageUrl: string;
  published: boolean;
  sortOrder: number;
  features?: string[];
  specifications: { label: string; value: string }[];
  gallery: MediaItem[];
  brochureUrl?: string;
};

export type Testimonial = {
  id: number;
  name: string;
  company: string;
  quote: string;
  rating: number;
};

export type SiteSettings = {
  businessName: string;
  shortName: string;
  tagline: string;
  heroTitle: string;
  heroDescription: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  mapEmbedUrl: string;
  yearsExperience: string;
  toleranceAccuracy: string;
  certifiedWelders: string;
  certification: string;
  aboutTitle: string;
  aboutDescription: string;
  aboutNote: string;
  heroImageUrl: string;
  socialLinks: { label: string; url: string }[];
};

export type SiteContent = {
  settings: SiteSettings;
  specializations: Specialization[];
  projects: Project[];
  products: Product[];
  testimonials: Testimonial[];
  workshopMedia: MediaItem[];
};
