from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey

from app.core.base import Base


class Riego(Base):

    __tablename__ = "riegos"

    id = Column(Integer, primary_key=True)

    planta_id = Column(
        Integer,
        ForeignKey("plantas.id")
    )

    fecha_inicio = Column(DateTime)

    fecha_fin = Column(DateTime)

    duracion_segundos = Column(Integer)

    estado = Column(String(30))

    motivo = Column(String(150))