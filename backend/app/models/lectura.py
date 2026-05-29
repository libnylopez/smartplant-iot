from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import TIMESTAMP
from sqlalchemy import ForeignKey

from app.core.base import Base


class Lectura(Base):

    __tablename__ = "lecturas_humedad"

    id = Column(Integer, primary_key=True)

    planta_id = Column(
        Integer,
        ForeignKey("plantas.id")
    )

    humedad_porcentaje = Column(Integer)

    estado_sensor = Column(String(50))

    fecha_registro = Column(TIMESTAMP)