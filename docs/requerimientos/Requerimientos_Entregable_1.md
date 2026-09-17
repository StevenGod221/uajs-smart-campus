# Requerimientos – Entregable 1

## 1. Objetivo

Construir un prototipo funcional de UAJS Smart Campus basado en una arquitectura distribuida con frontend React, API Gateway y seis microservicios independientes

## 2. Arquitectura exigida

El flujo principal del sistema es:

Usuario → React → API Gateway → Microservicios

Los microservicios contemplados son:

- Usuarios
- Solicitudes
- Reservas
- Recursos
- Notificaciones
- Eventos

## 3. Requisitos funcionales

1. Frontend funcional desarrollado en React
2. Navegación mediante React Router
3. Uso de componentes funcionales
4. Uso de useState
5. Uso de useEffect
6. Implementación y uso de al menos un custom hook
7. Mínimo cuatro rutas funcionales mediante React Router
8. Backend organizado mediante microservicios
9. API Gateway funcional
10. Existencia de seis microservicios
11. Endpoint de salud para cada microservicio
12. Endpoints REST iniciales
13. Integración React → Gateway → Solicitudes
14. Integración React → Gateway → Reservas
15. Datos de prueba
16. Repositorio GitHub organizado
17. Contribuciones verificables de los integrantes
18. Organización del trabajo mediante ClickUp

## 4. Funcionalidades del prototipo

El frontend contempla:

- Landing
- Inicio de sesión
- Dashboard
- Solicitudes
- Reservas
- Recursos
- Eventos
- Notificaciones
- Perfil
- PQRS

## 5. Integraciones principales

### Solicitudes

React realiza las peticiones al API Gateway utilizando:

`/api/requests`

El Gateway redirige las peticiones hacia:

`solicitudes-service :8082`

### Reservas

React realiza las peticiones al API Gateway utilizando:

`/api/reservations`

El Gateway redirige las peticiones hacia:

`reservas-service :8083`

## 6. Puertos

| Componente | Puerto |
|---|---:|
| Frontend React | 5173 |
| API Gateway | 8080 |
| Usuarios | 8081 |
| Solicitudes | 8082 |
| Reservas | 8083 |
| Recursos | 8084 |
| Notificaciones | 8085 |
| Eventos | 8086 |

## 7. Criterio de cierre

El proyecto se considera preparado para la demostración cuando:

- El frontend inicia correctamente
- El Gateway inicia correctamente
- Los seis microservicios existen
- Los servicios pueden iniciar
- Los endpoints iniciales responden
- Se puede demostrar React → Gateway → Solicitudes
- Se puede demostrar React → Gateway → Reservas
- La documentación está organizada
- GitHub contiene el proyecto
- ClickUp contiene la planificación y evidencias

Los resultados de pruebas deben corresponder a comprobaciones reales