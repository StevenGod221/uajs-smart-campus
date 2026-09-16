# API Gateway - UAJS Smart Campus

Puerto: 8080

Flujo requerido:
React (5173) -> API Gateway (8080) -> Microservicios (8081-8086)

Rutas principales:
- /api/users -> usuarios-service
- /api/requests -> solicitudes-service
- /api/reservations -> reservas-service
- /api/resources -> recursos-service
- /api/notifications -> notificaciones-service
- /api/events -> eventos-service

Instalación:
1. Abrir PowerShell en backend/api-gateway
2. npm.cmd install
3. npm.cmd start

Health:
GET http://localhost:8080/health
