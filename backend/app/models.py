from datetime import datetime

from sqlalchemy import Boolean, DateTime, Float, Integer, JSON, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from .database import Base


class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())


class SiteSettings(Base, TimestampMixin):
    __tablename__ = "site_settings"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, default=1)
    business_name: Mapped[str] = mapped_column(String(160))
    short_name: Mapped[str] = mapped_column(String(100))
    tagline: Mapped[str] = mapped_column(String(160))
    hero_title: Mapped[str] = mapped_column(String(240))
    hero_description: Mapped[str] = mapped_column(Text)
    phone: Mapped[str] = mapped_column(String(40))
    whatsapp: Mapped[str] = mapped_column(String(30))
    email: Mapped[str] = mapped_column(String(160))
    address: Mapped[str] = mapped_column(Text)
    map_embed_url: Mapped[str] = mapped_column(Text)
    years_experience: Mapped[str] = mapped_column(String(40))
    tolerance_accuracy: Mapped[str] = mapped_column(String(40))
    certified_welders: Mapped[str] = mapped_column(String(40))
    certification: Mapped[str] = mapped_column(String(80))
    about_title: Mapped[str] = mapped_column(String(200))
    about_description: Mapped[str] = mapped_column(Text)
    about_note: Mapped[str] = mapped_column(Text)
    hero_image_url: Mapped[str] = mapped_column(Text)
    social_links: Mapped[list] = mapped_column(JSON, default=list)


class Specialization(Base, TimestampMixin):
    __tablename__ = "specializations"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    slug: Mapped[str] = mapped_column(String(160), unique=True, index=True)
    title: Mapped[str] = mapped_column(String(200))
    summary: Mapped[str] = mapped_column(Text, default="")
    description: Mapped[str] = mapped_column(Text, default="")
    image_url: Mapped[str] = mapped_column(Text)
    specifications: Mapped[list] = mapped_column(JSON, default=list)
    materials: Mapped[list] = mapped_column(JSON, default=list)
    published: Mapped[bool] = mapped_column(Boolean, default=True, index=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0, index=True)


class Project(Base, TimestampMixin):
    __tablename__ = "projects"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    slug: Mapped[str] = mapped_column(String(160), unique=True, index=True)
    title: Mapped[str] = mapped_column(String(220))
    category: Mapped[str] = mapped_column(String(100), index=True)
    location: Mapped[str] = mapped_column(String(180), default="")
    summary: Mapped[str] = mapped_column(Text, default="")
    description: Mapped[str] = mapped_column(Text, default="")
    image_url: Mapped[str] = mapped_column(Text)
    featured: Mapped[bool] = mapped_column(Boolean, default=False, index=True)
    published: Mapped[bool] = mapped_column(Boolean, default=True, index=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0, index=True)
    completion_date: Mapped[str | None] = mapped_column(String(80), nullable=True)
    client: Mapped[str | None] = mapped_column(String(180), nullable=True)
    specifications: Mapped[list] = mapped_column(JSON, default=list)
    gallery: Mapped[list] = mapped_column(JSON, default=list)


class Product(Base, TimestampMixin):
    __tablename__ = "products"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    slug: Mapped[str] = mapped_column(String(160), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(220))
    summary: Mapped[str] = mapped_column(Text, default="")
    description: Mapped[str] = mapped_column(Text, default="")
    price_label: Mapped[str] = mapped_column(String(100), default="")
    price: Mapped[float | None] = mapped_column(Float, nullable=True)
    currency: Mapped[str] = mapped_column(String(10), default="INR")
    stock_status: Mapped[str] = mapped_column(String(60), default="MADE TO ORDER")
    image_url: Mapped[str] = mapped_column(Text)
    brochure_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    published: Mapped[bool] = mapped_column(Boolean, default=True, index=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0, index=True)
    features: Mapped[list] = mapped_column(JSON, default=list)
    specifications: Mapped[list] = mapped_column(JSON, default=list)
    gallery: Mapped[list] = mapped_column(JSON, default=list)


class Testimonial(Base, TimestampMixin):
    __tablename__ = "testimonials"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(160))
    company: Mapped[str] = mapped_column(String(160), default="")
    quote: Mapped[str] = mapped_column(Text)
    rating: Mapped[int] = mapped_column(Integer, default=5)
    published: Mapped[bool] = mapped_column(Boolean, default=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)


class WorkshopMedia(Base, TimestampMixin):
    __tablename__ = "workshop_media"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    url: Mapped[str] = mapped_column(Text)
    alt: Mapped[str] = mapped_column(String(240))
    media_type: Mapped[str] = mapped_column(String(20), default="image")
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
    published: Mapped[bool] = mapped_column(Boolean, default=True)


class Lead(Base, TimestampMixin):
    __tablename__ = "leads"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(160))
    phone: Mapped[str] = mapped_column(String(50), index=True)
    email: Mapped[str | None] = mapped_column(String(160), nullable=True)
    service: Mapped[str | None] = mapped_column(String(160), nullable=True)
    product: Mapped[str | None] = mapped_column(String(220), nullable=True)
    location: Mapped[str | None] = mapped_column(Text, nullable=True)
    pincode: Mapped[str | None] = mapped_column(String(20), nullable=True)
    message: Mapped[str | None] = mapped_column(Text, nullable=True)
    source: Mapped[str] = mapped_column(String(60), default="website")
    status: Mapped[str] = mapped_column(String(30), default="NEW", index=True)
