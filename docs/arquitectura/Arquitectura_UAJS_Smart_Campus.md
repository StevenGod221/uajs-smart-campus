# Arquitectura UAJS Smart Campus

## 1. Descripción general

UAJS Smart Campus utiliza una arquitectura distribuida basada en microservicios

El sistema está compuesto por un frontend desarrollado en React, un API Gateway y seis microservicios independientes

## 2. Arquitectura general

El flujo principal es:

Usuario
↓
Frontend React
↓
API Gateway
↓
Microservicios

## 3. Componentes

### Frontend

Tecnología:

- React
- Vite
- React Router
- JavaScript
- CSS

Puerto:

`5173`

El frontend permite al usuario interactuar con las funcionalidades del sistema

### API Gateway

Puerto:

`8080`

Su función principal es recibir las solicitudes provenientes del frontend y dirigirlas al microservicio correspondiente

### Usuarios Service

Puerto:

`8081`

Responsabilidades:

- Gestión de usuarios
- Inicio de sesión
- Autenticación
- JWT

### Solicitudes Service

Puerto:

`8082`

Responsabilidades:

- Crear solicitudes
- Consultar solicitudes
- Gestionar estados
- Gestionar información de solicitudes

### Reservas Service

Puerto:

`8083`

Responsabilidades:

- Crear reservas
- Consultar reservas
- Gestionar estados
- Validar disponibilidad
- Detectar conflictos de horario

### Recursos Service

Puerto:

`8084`

Responsabilidades:

- Gestionar recursos
- Consultar recursos
- Actualizar recursos
- Gestionar estados

### Notificaciones Service

Puerto:

`8085`

Responsabilidades:

- Crear notificaciones
- Consultar notificaciones
- Gestionar notificaciones leídas

### Eventos Service

Puerto:

`8086`

Responsabilidades:

- Crear eventos
- Consultar eventos
- Actualizar eventos
- Eliminar eventos

## 4. Comunicación

La comunicación inicial utiliza:

- HTTP
- REST
- JSON

## 5. Flujo de solicitudes

Ejemplo:

```text
Usuario
   ↓
React :5173
   ↓
GET /api/requests
   ↓
Gateway :8080
   ↓
Solicitudes Service :8082
   ↓
JSON
   ↓
Gateway
   ↓
React

## 6. Flujo de Reservas


Usuario
   ↓
React :5173
   ↓
POST /api/reservations
   ↓
Gateway :8080
   ↓
Reservas Service :8083
   ↓
JSON
   ↓
Gateway
   ↓
React

7. Ventajas de la arquitectura

La separación por microservicios permite:

Separar responsabilidades
Facilitar el mantenimiento
Permitir desarrollo independiente
Facilitar pruebas
Permitir evolución independiente de cada módulo
8. Estado del proyecto

La arquitectura base se encuentra implementada con:

Frontend
API Gateway
Seis microservicios
Endpoints REST iniciales
Integraciones frontend mediante Gateway

Los health checks de todos los servicios deben verificarse antes de marcar el requisito como completamente cerrado


---

# 4. `docs/02-Arquitectura/Diagrama_Arquitectura.txt`

```text
                         USUARIO
                            |
                            v
                  +-------------------+
                  |   REACT FRONTEND  |
                  |       :5173       |
                  +-------------------+
                            |
                            | HTTP / JSON
                            v
                  +-------------------+
                  |    API GATEWAY    |
                  |       :8080       |
                  +-------------------+
                     /    /   |   \    \
                    /    /    |    \    \
                   v    v     v     v    v
                :8081 :8082  :8083 :8084 :8085
                  |     |      |     |     |
                  v     v      v     v     v
              Usuarios Solicitudes Reservas Recursos Notificaciones

                            |
                            v
                         :8086
                            |
                            v
                         Eventos