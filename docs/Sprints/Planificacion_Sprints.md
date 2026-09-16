
---

# 8. `docs/06-Sprints/Planificacion_Sprints.md`

Este es importante para **hacer que ClickUp se vea organizado por sprints**.

```markdown
# Planificación de Sprints

# Equipo

| Integrante | Responsabilidad |
|---|---|
| Steven Tovar Merlano | Líder técnico, arquitectura, Gateway, integración y frontend |
| Moisés | Usuarios, autenticación JWT y seguridad |
| Juan José | Solicitudes y eventos |
| Carlos | Reservas y disponibilidad |
| Juan David | Recursos, pruebas y evidencias |

---

# Sprint 0 – Análisis y Diseño

## Objetivo

Definir la solución, arquitectura y organización inicial del proyecto

## Tareas

### Steven Tovar Merlano
- Definición de arquitectura
- Organización técnica del proyecto
- Creación y organización del repositorio

### Moisés
- Requerimientos funcionales
- Identificación de actores
- Requerimientos de autenticación

### Juan José
- Modelo inicial de datos
- Análisis del módulo de solicitudes

### Carlos
- Diseño de wireframes
- Análisis del módulo de reservas

### Juan David
- Organización del repositorio
- Organización del trabajo
- Apoyo en documentación

---

# Sprint 1 – Base Técnica

## Objetivo

Construir la infraestructura inicial del sistema

### Steven Tovar Merlano

- API Gateway
- Configuración inicial frontend
- Integración inicial

### Moisés

- Usuarios Service
- Login
- JWT
- Seguridad

### Juan José

- Solicitudes Service
- Endpoints REST

### Carlos

- Reservas Service
- Validación de reservas

### Juan David

- Recursos Service
- Endpoints de recursos

### Trabajo complementario

- Notificaciones Service
- Eventos Service
- Dashboard inicial

---

# Sprint 2 – Funcionalidades

## Objetivo

Construir las funcionalidades visibles del prototipo

### Steven Tovar Merlano

- Login frontend
- React Router
- Dashboard
- Integración frontend
- Custom hook `useCampusData`

### Moisés

- Autenticación
- Notificaciones
- Pruebas de seguridad

### Juan José

- Solicitudes
- Eventos

### Carlos

- Reservas
- Estados
- Validación de disponibilidad

### Juan David

- Recursos
- Estados
- Pruebas

---

# Sprint 3 – Integración y Entrega

## Objetivo

Preparar el proyecto para la presentación

### Steven Tovar Merlano

- React → Gateway
- Integración Solicitudes
- Integración Reservas
- Revisión frontend
- Documentación técnica

### Moisés

- Pruebas de autenticación
- Revisión de seguridad

### Juan José

- Revisión de Solicitudes
- Revisión de Eventos
- Documentación funcional

### Carlos

- Pruebas de Reservas
- Validación de conflictos

### Juan David

- Pruebas de Recursos
- Evidencias
- Apoyo en DevOps

## Entregables

- Frontend funcional
- Gateway
- Seis microservicios
- Integraciones
- Pruebas
- Documentación
- Evidencias