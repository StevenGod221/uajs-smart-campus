# Guía de trabajo — UAJS Smart Campus

## Equipo

- Steven — Scrum Master + Developer
- Moisés — Developer
- Juan José — Developer
- Carlos — Developer
- Juan David — Developer

## Regla principal

Nadie trabaja directamente sobre `main`.

Todo cambio debe realizarse mediante una rama propia y un Pull Request.

## Flujo de trabajo

1. Actualizar la rama `main`.
2. Crear una rama para la tarea.
3. Desarrollar únicamente en esa rama.
4. Realizar commits.
5. Subir la rama a GitHub.
6. Crear Pull Request hacia `main`.
7. Otro integrante revisa el código.
8. Corregir observaciones si existen.
9. Aprobar el Pull Request.
10. Hacer merge a `main`.

## Nombres de ramas

### Funcionalidades

feature/nombre-de-la-tarea

### Correcciones

fix/nombre-del-error

### Documentación

docs/nombre-del-documento

## Commits

Usaremos:

feat: nueva funcionalidad
fix: corrección de error
docs: documentación
refactor: modificación de código sin cambiar funcionalidad
test: pruebas
chore: configuración o mantenimiento

## Pull Requests

El título debe indicar claramente qué se realizó.

Ejemplo:

feat: implementar login de usuarios

Cada Pull Request debe explicar:

- Qué se hizo.
- Qué tarea de ClickUp corresponde.
- Qué se debe revisar.

## Revisión

El desarrollador que crea el Pull Request no debe aprobar su propio cambio.

Se requiere al menos una revisión antes del merge.

## main

La rama `main` contiene únicamente código integrado y revisado.


## Flujo de trabajo

El desarrollo del proyecto se organiza mediante ramas relacionadas con cada integrante y funcionalidad

## Ramas

- main
- feature/steven-integracion
- feature/moises-usuarios
- feature/juan-jose-solicitudes
- feature/carlos-reservas
- feature/juan-david-recursos

## Flujo

1. Actualizar la rama
2. Crear o utilizar una rama feature
3. Realizar cambios
4. Probar localmente
5. Hacer commit
6. Subir la rama
7. Crear Pull Request cuando corresponda
8. Revisar
9. Integrar a main

## Commits

Se recomienda utilizar mensajes claros

Ejemplos:

```text
feat: agrega endpoint de solicitudes
feat: implementa login con JWT
feat: agrega validacion de reservas
feat: implementa CRUD de recursos
fix: corrige ruta del API Gateway
docs: actualiza documentacion tecnica
