from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import TIMESTAMP
from sqlalchemy import Boolean

from app.core.base import Base


class Planta(Base):

    __tablename__ = "plantas"

    id = Column(Integer, primary_key=True)

    nombre = Column(String(100))

    ubicacion = Column(String(150))

    humedad_objetivo = Column(Integer)

    activa = Column(Boolean)

    humedad_minima = Column(Integer)

    fecha_creacion = Column(TIMESTAMP)