from pydantic import BaseModel
from datetime import datetime


class LecturaResponse(BaseModel):

    id: int

    planta_id: int

    humedad_porcentaje: int

    estado_sensor: str

    fecha_registro: datetime

    class Config:
        from_attributes = True