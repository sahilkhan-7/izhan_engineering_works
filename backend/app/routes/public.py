from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..database import get_db
from ..models import Lead, Product, Project, SiteSettings, Specialization, Testimonial, WorkshopMedia
from ..schemas import LeadCreate, LeadSchema, ProductSchema, ProjectSchema, SiteContent, SpecializationSchema

router = APIRouter()


@router.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@router.get("/content", response_model=SiteContent)
def content(db: Session = Depends(get_db)):
    settings = db.scalar(select(SiteSettings).limit(1))
    if not settings:
        raise HTTPException(status_code=503, detail="Site content has not been seeded")
    return {
        "settings": settings,
        "specializations": db.scalars(select(Specialization).where(Specialization.published).order_by(Specialization.sort_order)).all(),
        "projects": db.scalars(select(Project).where(Project.published).order_by(Project.sort_order)).all(),
        "products": db.scalars(select(Product).where(Product.published).order_by(Product.sort_order)).all(),
        "testimonials": db.scalars(select(Testimonial).where(Testimonial.published).order_by(Testimonial.sort_order)).all(),
        "workshop_media": db.scalars(select(WorkshopMedia).where(WorkshopMedia.published).order_by(WorkshopMedia.sort_order)).all(),
    }


@router.get("/projects/{slug}", response_model=ProjectSchema)
def project_detail(slug: str, db: Session = Depends(get_db)):
    item = db.scalar(select(Project).where(Project.slug == slug, Project.published))
    if not item:
        raise HTTPException(status_code=404, detail="Project not found")
    return item


@router.get("/products/{slug}", response_model=ProductSchema)
def product_detail(slug: str, db: Session = Depends(get_db)):
    item = db.scalar(select(Product).where(Product.slug == slug, Product.published))
    if not item:
        raise HTTPException(status_code=404, detail="Product not found")
    return item


@router.get("/specializations", response_model=list[SpecializationSchema])
def specializations(db: Session = Depends(get_db)):
    return db.scalars(select(Specialization).where(Specialization.published).order_by(Specialization.sort_order)).all()


@router.post("/leads", response_model=LeadSchema, status_code=status.HTTP_201_CREATED)
def create_lead(payload: LeadCreate, db: Session = Depends(get_db)):
    lead = Lead(**payload.model_dump())
    db.add(lead)
    db.commit()
    db.refresh(lead)
    return lead
