from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict, Field


def to_camel(value: str) -> str:
    parts = value.split("_")
    return parts[0] + "".join(word.title() for word in parts[1:])


class ApiModel(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True, alias_generator=to_camel)


class SettingsSchema(ApiModel):
    business_name: str
    short_name: str
    tagline: str
    hero_title: str
    hero_description: str
    phone: str
    whatsapp: str
    email: str
    address: str
    map_embed_url: str
    years_experience: str
    tolerance_accuracy: str
    certified_welders: str
    certification: str
    about_title: str
    about_description: str
    about_note: str
    hero_image_url: str
    social_links: list[dict[str, Any]] = Field(default_factory=list)


class SpecializationSchema(ApiModel):
    id: int | None = None
    slug: str
    title: str
    summary: str = ""
    description: str = ""
    image_url: str
    specifications: list[dict[str, Any]] = Field(default_factory=list)
    materials: list[str] = Field(default_factory=list)
    published: bool = True
    sort_order: int = 0


class ProjectSchema(ApiModel):
    id: int | None = None
    slug: str
    title: str
    category: str
    location: str = ""
    summary: str = ""
    description: str = ""
    image_url: str
    featured: bool = False
    published: bool = True
    sort_order: int = 0
    completion_date: str | None = None
    client: str | None = None
    specifications: list[dict[str, Any]] = Field(default_factory=list)
    gallery: list[dict[str, Any]] = Field(default_factory=list)


class ProductSchema(ApiModel):
    id: int | None = None
    slug: str
    name: str
    summary: str = ""
    description: str = ""
    price_label: str = ""
    price: float | None = None
    currency: str = "INR"
    stock_status: str = "MADE TO ORDER"
    image_url: str
    brochure_url: str | None = None
    published: bool = True
    sort_order: int = 0
    features: list[str] = Field(default_factory=list)
    specifications: list[dict[str, Any]] = Field(default_factory=list)
    gallery: list[dict[str, Any]] = Field(default_factory=list)


class TestimonialSchema(ApiModel):
    id: int
    name: str
    company: str
    quote: str
    rating: int


class MediaSchema(ApiModel):
    id: int | None = None
    url: str
    alt: str
    media_type: str = "image"
    sort_order: int = 0


class LeadCreate(ApiModel):
    name: str
    phone: str
    email: str | None = None
    service: str | None = None
    product: str | None = None
    location: str | None = None
    pincode: str | None = None
    message: str | None = None
    source: str = "website"


class LeadSchema(LeadCreate):
    id: int
    status: str
    created_at: datetime


class LeadUpdate(ApiModel):
    status: str


class LoginRequest(BaseModel):
    email: str
    password: str


class SiteContent(ApiModel):
    settings: SettingsSchema
    specializations: list[SpecializationSchema]
    projects: list[ProjectSchema]
    products: list[ProductSchema]
    testimonials: list[TestimonialSchema]
    workshop_media: list[MediaSchema]
