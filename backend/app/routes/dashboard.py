from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def dashboard():

    return {

        "planta": "Planta Principal",

        "humedad_actual": 42,

        "estado": "Optimo",

        "promedio": 46,

        "maximo": 62,

        "minimo": 28,

        "ultimo_riego": 15,

        "mqtt": "Conectado"
    }