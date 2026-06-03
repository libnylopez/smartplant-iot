# Verdant

### Intelligent Plant Monitoring Platform

Verdant es una plataforma inteligente de monitoreo de plantas diseñada para visualizar, analizar y gestionar información proveniente de sensores de humedad mediante una interfaz web moderna y una arquitectura IoT escalable.

El sistema integra tecnologías de desarrollo web, bases de datos relacionales y dispositivos IoT para proporcionar monitoreo en tiempo real, alertas automáticas y control de eventos de riego.

Actualmente Verdant cuenta con integración funcional entre React, FastAPI y MySQL para desarrollo local, permitiendo almacenar y visualizar datos desde una base de datos relacional.

---

# Arquitectura General

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

Frontend React (Verdant)

---

# Tecnologías Utilizadas

## Frontend

* React
* Vite
* Axios
* Chart.js
* CSS

## Backend

* Python
* FastAPI
* SQLAlchemy
* PyMySQL

## Base de Datos

* MySQL

## IoT

* Raspberry Pi
* Sensor de humedad capacitivo
* MQTT
* Relés
* Sistema de riego automático

---

# Estado Actual del Proyecto

## Integración Completada

* Frontend React funcional
* Backend FastAPI funcional
* Base de datos MySQL local configurada
* Integración SQLAlchemy con MySQL
* Dashboard conectado a base de datos
* Historial conectado a base de datos
* Alertas conectadas a base de datos
* Módulo de Riego conectado a base de datos
* Visualización gráfica de humedad conectada a base de datos
* API REST funcional
* Arquitectura backend organizada
* Integración local completa (React → FastAPI → MySQL)

## Pendiente

* Integración de Raspberry Pi con datos reales
* Comunicación MQTT en tiempo real
* Integración con infraestructura en la nube
* Automatización completa del flujo IoT
* Despliegue de producción

---

# Características Principales

## Resumen

Visualización general del estado de la planta, humedad actual, tendencias históricas y métricas principales del sistema.

## Historial

Consulta de lecturas almacenadas en la base de datos con visualización estructurada y filtrado.

## Alertas

Generación automática de alertas según niveles de humedad detectados.

## Riego

Registro histórico de activaciones del sistema de riego y monitoreo de eventos.

## Visualización Inteligente

Representación visual del estado general de la planta basada en los niveles de humedad registrados.

---

# Estructura de Base de Datos

Base de datos utilizada:

```text
riego_iot
```

Tablas implementadas:

## plantas

Información general de las plantas registradas.

## lecturas_humedad

Historial de lecturas del sensor de humedad.

## riegos

Historial de activaciones del sistema de riego.

---

# Configuración del Backend

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

Documentación Swagger:

```text
http://localhost:8000/docs
```

---

# Configuración del Frontend

Ingresar al directorio frontend:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar aplicación:

```bash
npm run dev
```

Abrir en navegador:

```text
http://localhost:5173
```

---

# Variables de Entorno

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

# Endpoints Disponibles

## Dashboard

```text
/dashboard
```

## Lecturas

```text
/lecturas
```

## Riegos

```text
/riegos
```

## Prueba de Conexión

```text
/test-db
```

---

# Integración de Hardware

Actualmente el frontend y backend se encuentran conectados a MySQL local para pruebas y desarrollo.

La siguiente fase del proyecto consiste en sustituir los datos de prueba por información proveniente directamente de la Raspberry Pi y del sensor de humedad mediante MQTT o HTTP.

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

Verdant

---

# Próxima Fase

* Integración con Raspberry Pi.
* Integración con MQTT.
* Integración con base de datos en la nube.
* Recepción de lecturas reales desde sensores.
* Automatización completa del sistema de riego.
* Despliegue del sistema en entorno productivo.

---

# Estado de Desarrollo

Actualmente Verdant dispone de una arquitectura funcional completa para desarrollo local.

La plataforma ya permite almacenar, consultar y visualizar datos desde MySQL mediante React y FastAPI. La integración pendiente corresponde principalmente a la capa IoT (Raspberry Pi, MQTT y nube), la cual permitirá sustituir los datos de prueba por lecturas reales provenientes del sensor de humedad.

