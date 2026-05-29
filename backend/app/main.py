from fastapi import FastAPI

from app.routes.lecturas import router as lecturas_router
from app.routes.riegos import router as riegos_router
from app.routes.dashboard import router as dashboard_router

app = FastAPI(
    title="SmartPlant IoT API",
    version="1.0.0"
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

@app.get("/")
def home():

    return {
        "proyecto": "SmartPlant IoT",
        "estado": "Activo"
    }