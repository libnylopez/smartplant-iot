# SmartPlant IoT

## Descripción

SmartPlant IoT es un sistema de monitoreo inteligente de plantas basado en Raspberry Pi.

El proyecto tiene como objetivo monitorear la humedad del suelo, registrar lecturas históricas, generar alertas y permitir la automatización del riego mediante una interfaz web desarrollada con React y un backend construido con FastAPI.

Actualmente el proyecto se encuentra en una fase funcional de desarrollo donde la interfaz web y la API ya están implementadas, pero los datos mostrados son simulados para fines de pruebas y demostración.

---

## Arquitectura General

Sensor de Humedad

↓

Raspberry Pi

↓

MQTT / HTTP

↓

Backend FastAPI

↓

MySQL

↓

Frontend React

---

## Tecnologías Utilizadas

### Frontend

* React
* Vite
* JavaScript
* Chart.js
* CSS

### Backend

* Python
* FastAPI
* SQLAlchemy

### Base de Datos

* MySQL

### IoT

* Raspberry Pi
* Sensor de humedad capacitivo
* Relés
* Bomba de agua
* MQTT

---

## Estado Actual del Proyecto

### Implementado

* Dashboard
* Historial de lecturas
* Alertas
* Módulo de riegos
* API REST
* Estructura de base de datos
* Arquitectura backend
* Diseño UI

### Pendiente

* Conexión con Raspberry Pi real
* Integración MQTT
* Persistencia en MySQL real
* Actualización en tiempo real
* Despliegue en nube

---

## Configuración del Backend

Ingresar al directorio backend:

```bash
cd backend
```

Crear entorno virtual:

### Windows

```bash
python -m venv venv
```

Activar:

```bash
venv\Scripts\activate
```

### macOS / Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

Instalar dependencias:

```bash
pip install -r requirements.txt
```

Ejecutar servidor:

```bash
uvicorn app.main:app --reload
```

Swagger:

```text
http://localhost:8000/docs
```

---

## Configuración del Frontend

Ingresar al directorio frontend:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar:

```bash
npm run dev
```

Abrir:

```text
http://localhost:5173
```

---

## Configuración de Base de Datos

Actualmente no existe una conexión activa a una base de datos real.

La integración deberá realizarse dentro de:

backend/app/core/config.py

backend/app/core/database.py

backend/.env

Variables sugeridas:

```env
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

---

## Integración Raspberry Pi

La integración con hardware deberá desarrollarse utilizando los endpoints ya existentes del backend.

Flujo esperado:

Sensor → Raspberry Pi → MQTT/HTTP → FastAPI → MySQL → Frontend

---

## Notas para Desarrollo Futuro

Los datos mostrados actualmente en el dashboard son simulados.

La estructura de la aplicación ya está preparada para sustituir dichos datos por información proveniente de la Raspberry Pi y la base de datos real sin necesidad de rediseñar la interfaz.
