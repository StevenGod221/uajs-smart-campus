# API REST

## API Gateway

Base:

http://localhost:8080

Health:

GET /health

---

# Usuarios

Ruta del Gateway:

`/api/users`

Servicio:

`usuarios-service :8081`

Funcionalidades:

- Login
- Gestión de usuarios

---

# Solicitudes

Ruta:

`/api/requests`

Servicio:

`solicitudes-service :8082`

## Crear

POST

`/api/requests`

Ejemplo:

```json
{
  "usuarioId": 1,
  "servicioId": 1,
  "tipo": "MANTENIMIENTO",
  "dependencia": "Bloque A",
  "descripcion": "Solicitud de mantenimiento",
  "prioridad": "MEDIA"
}

Consultar

GET

/api/requests

Consultar por ID

GET

/api/requests/{id}

Actualizar

PUT

/api/requests/{id}

Cambiar estado

PATCH

/api/requests/{id}/estado

Eliminar

DELETE

/api/requests/{id}

Reservas

Ruta:

/api/reservations

Servicio:

reservas-service :8083

Crear

POST

/api/reservations

Ejemplo:

{
  "usuarioId": 1,
  "recursoId": 4,
  "fechaInicio": "2026-08-29T10:00:00",
  "fechaFin": "2026-08-29T11:00:00",
  "observaciones": "Reserva de prueba"
}


Consultar

GET

/api/reservations

Consultar por ID

GET

/api/reservations/{id}

Consultar por usuario

GET

/api/reservations/usuario/{usuarioId}

Consultar por recurso

GET

/api/reservations/recurso/{recursoId}

Cambiar estado

PATCH

/api/reservations/{id}/estado?estado=APROBADA

Estados:

PENDIENTE
APROBADA
RECHAZADA
CANCELADA
FINALIZADA
Eliminar

DELETE

/api/reservations/{id}

Recursos

Ruta:

/api/resources

Servicio:

recursos-service :8084

Operaciones:

POST /api/resources
GET /api/resources
GET /api/resources/{id}
GET /api/resources/tipo/{tipo}
GET /api/resources/estado/{estado}
GET /api/resources/ubicacion/{ubicacion}
PUT /api/resources/{id}
PATCH /api/resources/{id}/estado
DELETE /api/resources/{id}
Notificaciones

Ruta:

/api/notifications

Servicio:

notificaciones-service :8085

Operaciones:

POST /api/notifications
GET /api/notifications
GET /api/notifications/{id}
GET /api/notifications/usuario/{usuarioId}
GET /api/notifications/tipo/{tipo}
GET /api/notifications/estado/{estado}
PATCH /api/notifications/{id}/leer
DELETE /api/notifications/{id}
Eventos

Ruta:

/api/events

Servicio:

eventos-service :8086

Operaciones:

POST /api/events
GET /api/events
GET /api/events/{id}
PUT /api/events/{id}
DELETE /api/events/{id}