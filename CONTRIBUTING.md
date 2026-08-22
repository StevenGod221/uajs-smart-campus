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
