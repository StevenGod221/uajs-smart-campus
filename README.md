# UAJS Smart Campus

Sistema distribuido para la gestión de usuarios, solicitudes, reservas, recursos, eventos y notificaciones de la comunidad universitaria

## Arquitectura

```text
Usuario
   |
   v
Frontend React + Vite :5173
   |
   v
API Gateway Node.js + Express :8080
   |
   +--> Usuarios          :8081
   +--> Solicitudes       :8082
   +--> Reservas          :8083
   +--> Recursos          :8084
   +--> Notificaciones    :8085
   +--> Eventos           :8086
                |
                v
          MySQL
     uajs_smart_campus

Requisitos previos
- Java 21
- Node.js y npm
- MySQL compatible con el esquema del proyecto
- PowerShell en Windows
Estructura del proyecto
- backend/api-gateway: puerta de entrada a las API
- backend/usuarios-service: gestión de usuarios y autenticación
- backend/solicitudes-service: gestión de solicitudes
- backend/reservas-service: gestión de reservas
- backend/recursos-service: gestión de recursos
- backend/notificaciones-service: gestión de notificaciones
- backend/eventos-service: gestión de eventos
- frontend: interfaz web
- database/scripts: scripts SQL
- docs: documentación técnica y evidencias
- postman: colección y entorno de pruebas de API
Base de datos
El esquema se encuentra en database/scripts/schema.sql y los datos de demostración en database/scripts/seed.sql

Antes de ejecutar estos scripts en una instalación nueva, revisa la configuración de MySQL y realiza la operación únicamente sobre una base de datos de desarrollo preparada para ello. No ejecutes el script de datos sobre una base que contenga información que quieras conservar
Puertos
ComponentePuerto
Frontend5173
API Gateway8080
Usuarios8081
Solicitudes8082
Reservas8083
Recursos8084
Notificaciones8085
Eventos8086
MySQL3306, valor habitual

Instalación y ejecución
Frontend
Set-Location .\frontend
npm install
npm run dev


API Gateway
Set-Location .\backend\api-gateway
npm install
npm start


Consulta package.json si el comando de inicio no está definido como start
Microservicios Java
Cada microservicio dispone de su propio pom.xml. Desde la carpeta correspondiente, ejecuta:
.\mvnw.cmd spring-boot:run


Si no existe mvnw.cmd en esa carpeta, utiliza Maven instalado o el mecanismo de ejecución configurado en el proyecto
Configuración
Consulta los archivos application.properties de cada microservicio para verificar las propiedades de conexión a MySQL y los puertos. .env.example contiene valores ilustrativos; no significa que todos los componentes carguen automáticamente ese archivo

No publiques contraseñas reales, secretos JWT, tokens ni datos personales
Pruebas de API
Las rutas protegidas requieren un token de autenticación válido. La documentación de endpoints y la colección de Postman deben mantenerse alineadas con las rutas reales del Gateway y los microservicios
Documentación
La carpeta docs contiene la arquitectura, decisiones técnicas, requerimientos, planificación y resultados de pruebas. Las evidencias de ejecución deben incorporarse en sus carpetas correspondientes
Limitaciones y trabajo futuro
Documentar aquí las limitaciones verificadas durante las pruebas y los cambios previstos para el siguiente entregable. No se consideran implementadas las funcionalidades que todavía no hayan sido verificadas
Estado del proyecto
Proyecto académico en desarrollo. La configuración y los procedimientos deben contrastarse con los archivos y comandos reales del repositorio antes de desplegarlo en otro equipo
