# UAJS Smart Campus

Primera versión funcional y arquitectónica de UAJS Smart Campus para el Entregable 1 de Sistemas Distribuidos

## Descripción

UAJS Smart Campus centraliza recursos universitarios, reservas, solicitudes, eventos, notificaciones y servicios de atención en una plataforma web desarrollada con React

## Arquitectura

Usuario → Frontend React → API Gateway :8080 → Usuarios :8081 | Solicitudes :8082 | Reservas :8083 | Recursos :8084 | Notificaciones :8085 | Eventos :8086

La comunicación utiliza HTTP y JSON

## Tecnologías

- React + Vite
- JavaScript
- React Router
- CSS3 y metodología BEM
- Node.js + Express para API Gateway
- Spring Boot / Java 21 para microservicios
- MySQL
- GitHub
- ClickUp

## Frontend

Vistas: Landing, Login, Dashboard, Servicios, Recursos, Reservas, Solicitudes, Detalle de solicitud, Eventos, Notificaciones, Perfil y PQRS

Se utilizan `useState`, `useEffect`, `useMemo` y el custom hook `useCampusData`

## API Gateway

Puerto 8080

Rutas: `/api/users`, `/api/requests`, `/api/reservations`, `/api/resources`, `/api/events`, `/api/notifications`

## Integraciones

1. React → API Gateway → Requests Service
2. React → API Gateway → Reservations Service

## Ejecución frontend

Desde `frontend`:

```powershell
npm.cmd install
npm.cmd run dev
```

## Ejecución Gateway

Desde `backend/api-gateway`:

```powershell
npm.cmd install
npm.cmd start
```

## Seguridad del repositorio

No subir `node_modules`, `.env`, contraseñas, tokens ni datos personales

## Equipo

Steven Tovar Merlano, Moisés, Juan José, Carlos y Juan David

## Nota del Entregable 1

La persistencia completa, comunicación avanzada y mecanismos distribuidos se profundizarán en los siguientes entregables. Antes del cierre definitivo deben verificarse todos los health checks y evidencias solicitadas por la guía
