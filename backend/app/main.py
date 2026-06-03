from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

from app.routes.lecturas import router as lecturas_router
from app.routes.riegos import router as riegos_router
from app.routes.dashboard import router as dashboard_router
from app.routes.test_db import router as test_db_router

from app.core.database import engine
from app.core.base import Base

from app.models.planta import Planta
from app.models.lectura import Lectura
from app.models.riego import Riego

app = FastAPI(
    title="SmartPlant IoT API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dashboard
app.include_router(
    dashboard_router,
    prefix="/dashboard",
    tags=["Dashboard"]
)

# Lecturas
app.include_router(
    lecturas_router,
    prefix="/lecturas",
    tags=["Lecturas"]
)

# Riegos
app.include_router(
    riegos_router,
    prefix="/riegos",
    tags=["Riegos"]
)

app.include_router(
    test_db_router,
    prefix="/test-db",
    tags=["Test DB"]
)

Base.metadata.create_all(bind=engine)

@app.get("/")
def home():

    return {
        "proyecto": "SmartPlant IoT",
        "estado": "Activo"
    }