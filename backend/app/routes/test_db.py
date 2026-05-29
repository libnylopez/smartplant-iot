from fastapi import APIRouter
from sqlalchemy import text

from app.core.database import engine

router = APIRouter()

@router.get("/")
def test_db():

    try:

        with engine.connect() as connection:

            connection.execute(
                text("SELECT 1")
            )

            return {
                "conexion": "exitosa"
            }

    except Exception as e:

        return {
            "conexion": "fallida",
            "error": str(e)
        }