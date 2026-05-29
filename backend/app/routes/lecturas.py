from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def obtener_lecturas():

    return [

        {
            "fecha": "2026-05-25",
            "humedad": 42,
            "estado": "Optimo"
        },

        {
            "fecha": "2026-05-26",
            "humedad": 38,
            "estado": "Optimo"
        },

        {
            "fecha": "2026-05-27",
            "humedad": 31,
            "estado": "Optimo"
        },

        {
            "fecha": "2026-05-28",
            "humedad": 24,
            "estado": "Seco"
        }

    ]