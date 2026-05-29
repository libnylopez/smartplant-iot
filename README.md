## Guía de Integración para Hardware y Datos Reales

### Estado Actual de la Aplicación

Actualmente el sistema se encuentra completamente funcional a nivel de interfaz y estructura de software.

Sin embargo, los datos mostrados en el frontend son datos simulados utilizados para pruebas de desarrollo.

La arquitectura ya se encuentra preparada para recibir datos reales provenientes de una Raspberry Pi y almacenarlos en una base de datos MySQL.

---

### Componentes que Actualmente Utilizan Datos Simulados

Frontend:

```text
frontend/src/pages/Dashboard.jsx
frontend/src/pages/Historial.jsx
frontend/src/pages/Alertas.jsx
frontend/src/pages/Riegos.jsx
```

Backend:

```text
backend/app/services/dashboard_service.py
```

Estos archivos pueden contener datos de ejemplo utilizados para pruebas visuales y demostración del funcionamiento del sistema.

---

### Configuración de Base de Datos Real

La configuración de conexión debe realizarse en:

```text
backend/app/core/config.py
backend/app/core/database.py
backend/.env
```

Variables recomendadas:

```env
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

Una vez configuradas las credenciales reales, los modelos existentes pueden utilizarse para conectarse a MySQL.

Modelos disponibles:

```text
backend/app/models/planta.py
backend/app/models/lectura.py
backend/app/models/riego.py
```

---

### Integración de la Raspberry Pi

La Raspberry Pi deberá encargarse de:

1. Leer datos del sensor de humedad.
2. Procesar los valores obtenidos.
3. Enviar la información al backend mediante HTTP o MQTT.

Flujo esperado:

Sensor de Humedad
↓
Raspberry Pi
↓
HTTP / MQTT
↓
FastAPI
↓
MySQL
↓
Frontend

---

### Endpoints Disponibles

Las rutas del backend se encuentran organizadas en:

```text
backend/app/routes/
```

Módulos implementados:

```text
dashboard.py
lecturas.py
plantas.py
riegos.py
```

Estas rutas pueden utilizarse para recibir datos provenientes de la Raspberry Pi y posteriormente exponerlos al frontend.

---

### Integración del Frontend con la API

La configuración centralizada de peticiones se encuentra en:

```text
frontend/src/services/api.js
```

Se recomienda utilizar este archivo para realizar todas las llamadas al backend y evitar URLs distribuidas en múltiples componentes.

---

### Próximos Pasos Recomendados

1. Configurar MySQL real.
2. Completar variables de entorno.
3. Conectar Raspberry Pi mediante HTTP o MQTT.
4. Sustituir datos simulados por respuestas reales de la API.
5. Validar inserción de lecturas en la tabla lecturas_humedad.
6. Validar inserción de eventos en la tabla riegos.
7. Actualizar Dashboard, Historial, Alertas y Riegos para consumir datos reales.
8. Implementar actualización en tiempo real mediante MQTT o polling periódico.

---

### Observación

La estructura general del proyecto ya fue diseñada para soportar la integración completa del sistema IoT sin necesidad de modificar la arquitectura principal del frontend ni del backend.
