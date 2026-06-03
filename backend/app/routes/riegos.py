from fastapi import APIRouter
from sqlalchemy import select

from app.core.database import SessionLocal
from app.models.riego import Riego

router = APIRouter()


@router.get("/")
def obtener_riegos():

    db = SessionLocal()

    try:

        riegos = db.execute(
            select(Riego)
        ).scalars().all()

        return [
            {
                "id": riego.id,
                "planta_id": riego.planta_id,
                "fecha_inicio": riego.fecha_inicio,
                "fecha_fin": riego.fecha_fin,
                "duracion_segundos": riego.duracion_segundos,
                "estado": riego.estado,
                "motivo": riego.motivo
            }
            for riego in riegos
        ]

    finally:
        db.close()