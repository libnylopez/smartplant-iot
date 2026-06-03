from fastapi import APIRouter
from sqlalchemy import select

from app.core.database import SessionLocal
from app.models.lectura import Lectura

router = APIRouter()


@router.get("/")
def obtener_lecturas():

    db = SessionLocal()

    try:

        lecturas = db.execute(
            select(Lectura)
        ).scalars().all()

        return [
            {
                "id": lectura.id,
                "planta_id": lectura.planta_id,
                "humedad_porcentaje": lectura.humedad_porcentaje,
                "estado_sensor": lectura.estado_sensor,
                "fecha_registro": lectura.fecha_registro
            }
            for lectura in lecturas
        ]

    finally:
        db.close()