import secrets
from typing import TypeVar

import httpx
from fastapi import APIRouter, Depends, File, HTTPException, Request, Response, UploadFile, status
from sqlalchemy import func, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from ..auth import create_token, require_admin
from ..config import get_settings
from ..database import get_db
from ..models import Lead, Product, Project, SiteSettings, Specialization
from ..schemas import (
    LeadSchema,
    LeadUpdate,
    LoginRequest,
    ProductSchema,
    ProjectSchema,
    SettingsSchema,
    SpecializationSchema,
)

router = APIRouter()
ModelT = TypeVar("ModelT")

MAX_UPLOAD_BYTES = 8 * 1024 * 1024
IMAGE_EXTENSIONS = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
    "image/avif": ".avif",
}


async def _upload_to_supabase(name: str, data: bytes, content_type: str | None) -> str:
    settings = get_settings()
    base = settings.supabase_url.rstrip("/")
    bucket = settings.supabase_bucket
    headers = {
        "Authorization": f"Bearer {settings.supabase_service_key}",
        "Content-Type": content_type or "application/octet-stream",
        "x-upsert": "true",
    }
    async with httpx.AsyncClient(timeout=30) as client:
        response = await client.post(f"{base}/storage/v1/object/{bucket}/{name}", content=data, headers=headers)
    if response.status_code not in (200, 201):
        raise HTTPException(status_code=502, detail=f"Storage upload failed: {response.text}")
    return f"{base}/storage/v1/object/public/{bucket}/{name}"


@router.post("/admin/uploads", dependencies=[Depends(require_admin)])
async def upload_image(request: Request, file: UploadFile = File(...)):
    extension = IMAGE_EXTENSIONS.get(file.content_type or "")
    if not extension:
        raise HTTPException(status_code=400, detail="Only JPEG, PNG, WEBP, GIF, or AVIF images are allowed")
    data = await file.read()
    if len(data) > MAX_UPLOAD_BYTES:
        raise HTTPException(status_code=413, detail="Image must be 8 MB or smaller")
    name = f"{secrets.token_hex(16)}{extension}"
    settings = get_settings()
    if settings.supabase_url and settings.supabase_service_key:
        return {"url": await _upload_to_supabase(name, data, file.content_type)}
    # Local-disk fallback for development (Vercel/Render disks are ephemeral).
    upload_dir = settings.upload_dir
    upload_dir.mkdir(parents=True, exist_ok=True)
    (upload_dir / name).write_bytes(data)
    base = str(request.base_url).rstrip("/")
    return {"url": f"{base}/uploads/{name}"}


@router.post("/auth/login")
def login(payload: LoginRequest):
    settings = get_settings()
    if payload.email.lower() != settings.admin_email.lower() or payload.password != settings.admin_password:
        raise HTTPException(status_code=401, detail="Invalid admin credentials")
    return {"access_token": create_token(settings.admin_email), "token_type": "bearer"}


@router.get("/admin/dashboard", dependencies=[Depends(require_admin)])
def dashboard(db: Session = Depends(get_db)):
    recent = db.scalars(select(Lead).order_by(Lead.created_at.desc()).limit(8)).all()
    return {
        "projects": db.scalar(select(func.count(Project.id))) or 0,
        "products": db.scalar(select(func.count(Product.id))) or 0,
        "specializations": db.scalar(select(func.count(Specialization.id))) or 0,
        "newLeads": db.scalar(select(func.count(Lead.id)).where(Lead.status == "NEW")) or 0,
        "recentLeads": [LeadSchema.model_validate(item).model_dump(by_alias=True) for item in recent],
    }


def _list(model, db: Session):
    order = getattr(model, "sort_order", getattr(model, "created_at"))
    return db.scalars(select(model).order_by(order)).all()


def _create(model, payload, db: Session):
    item = model(**payload.model_dump(exclude={"id"}))
    db.add(item)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="The URL slug must be unique") from None
    db.refresh(item)
    return item


def _update(model, item_id: int, payload, db: Session):
    item = db.get(model, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Record not found")
    for key, value in payload.model_dump(exclude={"id"}).items():
        setattr(item, key, value)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=409, detail="The URL slug must be unique") from None
    db.refresh(item)
    return item


def _delete(model, item_id: int, db: Session):
    item = db.get(model, item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Record not found")
    db.delete(item)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get("/admin/projects", response_model=list[ProjectSchema], dependencies=[Depends(require_admin)])
def list_projects(db: Session = Depends(get_db)): return _list(Project, db)


@router.post("/admin/projects", response_model=ProjectSchema, status_code=201, dependencies=[Depends(require_admin)])
def create_project(payload: ProjectSchema, db: Session = Depends(get_db)): return _create(Project, payload, db)


@router.put("/admin/projects/{item_id}", response_model=ProjectSchema, dependencies=[Depends(require_admin)])
def update_project(item_id: int, payload: ProjectSchema, db: Session = Depends(get_db)): return _update(Project, item_id, payload, db)


@router.delete("/admin/projects/{item_id}", status_code=204, dependencies=[Depends(require_admin)])
def delete_project(item_id: int, db: Session = Depends(get_db)): return _delete(Project, item_id, db)


@router.get("/admin/products", response_model=list[ProductSchema], dependencies=[Depends(require_admin)])
def list_products(db: Session = Depends(get_db)): return _list(Product, db)


@router.post("/admin/products", response_model=ProductSchema, status_code=201, dependencies=[Depends(require_admin)])
def create_product(payload: ProductSchema, db: Session = Depends(get_db)): return _create(Product, payload, db)


@router.put("/admin/products/{item_id}", response_model=ProductSchema, dependencies=[Depends(require_admin)])
def update_product(item_id: int, payload: ProductSchema, db: Session = Depends(get_db)): return _update(Product, item_id, payload, db)


@router.delete("/admin/products/{item_id}", status_code=204, dependencies=[Depends(require_admin)])
def delete_product(item_id: int, db: Session = Depends(get_db)): return _delete(Product, item_id, db)


@router.get("/admin/specializations", response_model=list[SpecializationSchema], dependencies=[Depends(require_admin)])
def list_specializations(db: Session = Depends(get_db)): return _list(Specialization, db)


@router.post("/admin/specializations", response_model=SpecializationSchema, status_code=201, dependencies=[Depends(require_admin)])
def create_specialization(payload: SpecializationSchema, db: Session = Depends(get_db)): return _create(Specialization, payload, db)


@router.put("/admin/specializations/{item_id}", response_model=SpecializationSchema, dependencies=[Depends(require_admin)])
def update_specialization(item_id: int, payload: SpecializationSchema, db: Session = Depends(get_db)): return _update(Specialization, item_id, payload, db)


@router.delete("/admin/specializations/{item_id}", status_code=204, dependencies=[Depends(require_admin)])
def delete_specialization(item_id: int, db: Session = Depends(get_db)): return _delete(Specialization, item_id, db)


@router.get("/admin/leads", response_model=list[LeadSchema], dependencies=[Depends(require_admin)])
def leads(db: Session = Depends(get_db)):
    return db.scalars(select(Lead).order_by(Lead.created_at.desc())).all()


@router.put("/admin/leads/{item_id}", response_model=LeadSchema, dependencies=[Depends(require_admin)])
def update_lead(item_id: int, payload: LeadUpdate, db: Session = Depends(get_db)):
    lead = db.get(Lead, item_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    lead.status = payload.status
    db.commit()
    db.refresh(lead)
    return lead


@router.get("/admin/settings", response_model=SettingsSchema, dependencies=[Depends(require_admin)])
def settings(db: Session = Depends(get_db)):
    item = db.scalar(select(SiteSettings).limit(1))
    if not item:
        raise HTTPException(status_code=404, detail="Settings not found")
    return item


@router.put("/admin/settings", response_model=SettingsSchema, dependencies=[Depends(require_admin)])
def update_settings(payload: SettingsSchema, db: Session = Depends(get_db)):
    item = db.scalar(select(SiteSettings).limit(1))
    if not item:
        item = SiteSettings(id=1, **payload.model_dump())
        db.add(item)
    else:
        for key, value in payload.model_dump().items():
            setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return item
