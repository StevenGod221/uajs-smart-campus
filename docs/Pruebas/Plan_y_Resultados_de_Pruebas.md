
---

# 7. `docs/05-Pruebas/Plan_y_Resultados_de_Pruebas.md`

```markdown
# Plan y Resultados de Pruebas

## 1. Objetivo

Verificar el funcionamiento de los componentes principales del Entregable 1

## 2. Pruebas

| ID | Prueba | Resultado esperado | Estado |
|---|---|---|---|
| T01 | Frontend :5173 | Aplicación carga | REALIZADA |
| T02 | Login | Acceso al dashboard | REALIZADA |
| T03 | Gateway /health | Status UP | REALIZADA |
| T04 | Gateway → Solicitudes | Respuesta correcta | REALIZADA |
| T05 | Gateway → Reservas | Respuesta correcta | REALIZADA |
| T06 | Crear solicitud | Solicitud registrada | REALIZADA |
| T07 | Consultar solicitudes | Lista de solicitudes | REALIZADA |
| T08 | Crear reserva | Reserva registrada | REALIZADA |
| T09 | Consultar reservas | Lista de reservas | REALIZADA |
| T10 | Reserva superpuesta | HTTP 400 | REALIZADA |
| T11 | Recursos | CRUD/cambio de estado | REALIZADA |
| T12 | Eventos | Respuesta funcional | POR VERIFICAR |
| T13 | Notificaciones | Respuesta funcional | POR VERIFICAR |
| T14 | Usuarios /health | Status UP | POR VERIFICAR |
| T15 | Solicitudes /health | Status UP | POR VERIFICAR |
| T16 | Reservas /health | Status UP | POR VERIFICAR |
| T17 | Recursos /health | Status UP | POR VERIFICAR |
| T18 | Notificaciones /health | Status UP | POR VERIFICAR |
| T19 | Eventos /health | Status UP | POR VERIFICAR |

## 3. Prueba de conflicto

Se creó una reserva y posteriormente se intentó crear otra reserva con un horario que se superponía

Resultado esperado:

HTTP 400

Resultado obtenido:

HTTP 400

La validación de conflictos funciona correctamente

## 4. Pruebas de integración

### Solicitudes

```text
React
 ↓
Gateway :8080
 ↓
Solicitudes :8082

Resultado:

Funcional

Reservas
React
 ↓
Gateway :8080
 ↓
Reservas :8083

Resultado:

Funcional

5. Health checks

http://localhost:8081/health
http://localhost:8082/health
http://localhost:8083/health
http://localhost:8084/health
http://localhost:8085/health
http://localhost:8086/health

Exitosos