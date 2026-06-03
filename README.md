# SmartPlant IoT

## Descripción

SmartPlant IoT es un sistema de monitoreo inteligente de plantas basado en Raspberry Pi, FastAPI, React y MySQL.

El proyecto permite monitorear la humedad del suelo, visualizar información histórica, generar alertas automáticas y administrar eventos de riego mediante una interfaz web moderna.

Actualmente el sistema cuenta con integración funcional entre React, FastAPI y MySQL para desarrollo local.

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
* Axios
* Chart.js
* CSS

### Backend

* Python
* FastAPI
* SQLAlchemy
* PyMySQL

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

### Integración Completada

* MySQL local funcional
* FastAPI conectado a MySQL
* SQLAlchemy configurado
* Dashboard conectado a base de datos
* Historial conectado a base de datos
* Alertas conectadas a base de datos
* Riegos conectados a base de datos
* Gráfica de humedad conectada a base de datos
* API REST funcional
* Arquitectura backend organizada

### Pendiente

* Integración de Raspberry Pi con datos reales
* Comunicación MQTT en tiempo real
* Base de datos en la nube
* Despliegue del sistema
* Automatización completa del flujo IoT

---

## Estructura de Base de Datos

Base de datos utilizada:

```text
riego_iot
```

Tablas implementadas:

### plantas

Información general de las plantas registradas.

### lecturas_humedad

Historial de lecturas del sensor de humedad.

### riegos

Historial de activaciones del sistema de riego.

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

Activar entorno:

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

## Variables de Entorno

Archivo:

```text
backend/.env
```

Configuración local:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=riego_iot
DB_USER=root
DB_PASSWORD=TU_CONTRASEÑA
```

---

## Endpoints Disponibles

### Dashboard

```text
/dashboard
```

### Lecturas

```text
/lecturas
```

### Riegos

```text
/riegos
```

### Prueba de Conexión

```text
/test-db
```

---

## Integración de Hardware

La integración con Raspberry Pi se encuentra pendiente de conexión definitiva.

Flujo esperado:

Sensor de Humedad

↓

Raspberry Pi

↓

MQTT / HTTP

↓

FastAPI

↓

MySQL

↓

Dashboard Web

---

## Estado de Desarrollo

Actualmente el sistema ya utiliza datos almacenados en MySQL para:

* Dashboard
* Historial
* Alertas
* Riegos

La siguiente fase del proyecto consiste en sustituir los datos de prueba por información proveniente directamente de la Raspberry Pi y del sensor de humedad en tiempo real.
