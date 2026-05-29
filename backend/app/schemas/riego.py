from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import DATETIME
from sqlalchemy import ForeignKey

from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Riego(Base):

    __tablename__ = "riegos"

    id = Column(Integer, primary_key=True)

    planta_id = Column(
        Integer,
        ForeignKey("plantas.id")
    )

    fecha_inicio = Column(DATETIME)

    fecha_fin = Column(DATETIME)

    duracion_segundos = Column(Integer)

    estado = Column(String(30))

    motivo = Column(String(150))