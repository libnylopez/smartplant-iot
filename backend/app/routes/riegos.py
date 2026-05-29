from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def obtener_riegos():

    return [

        {
            "fecha": "2026-05-28",
            "duracion": 15,
            "estado": "Completado"
        },

        {
            "fecha": "2026-05-29",
            "duracion": 12,
            "estado": "Completado"
        }

    ]