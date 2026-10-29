USE uajs_smart_campus;

-- USUARIOS DE PRUEBA
-- Contraseña de demostración: password
-- No utilizar esta contraseña en producción

INSERT INTO usuarios
(id, nombre, apellido, correo, password, rol, programa, dependencia, estado)
VALUES
(1, 'Administrador', 'Campus', 'admin@uajs.edu.co',
 '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
 'ADMIN', NULL, 'Administración', TRUE),
(2, 'Laura', 'Martínez', 'laura.martinez@uajs.edu.co',
 '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
 'ESTUDIANTE', 'Ingeniería de Sistemas', 'Académica', TRUE),
(3, 'Carlos', 'Pérez', 'carlos.perez@uajs.edu.co',
 '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldLJZdL17lhWy',
 'FUNCIONARIO', NULL, 'Mantenimiento', TRUE)
ON DUPLICATE KEY UPDATE correo = VALUES(correo);

-- RECURSOS
INSERT INTO recursos
(id, nombre, tipo, descripcion, ubicacion, estado)
VALUES
(1, 'Sala de informática 1', 'AULA',
 'Sala equipada con computadores', 'Bloque A', 'DISPONIBLE'),
(2, 'Auditorio principal', 'AUDITORIO',
 'Espacio para reuniones y eventos', 'Bloque B', 'DISPONIBLE'),
(3, 'Video beam 1', 'EQUIPO',
 'Equipo de proyección audiovisual', 'Almacén', 'DISPONIBLE')
ON DUPLICATE KEY UPDATE nombre = VALUES(nombre);

-- SOLICITUDES
INSERT INTO solicitudes
(id, usuario_id, servicio_id, tipo, dependencia, fecha,
 descripcion, prioridad, estado, responsable_id)
VALUES
(1, 2, 1, 'MANTENIMIENTO', 'Sistemas',
 '2026-10-20 09:00:00',
 'El computador de la sala presenta fallas al iniciar',
 'MEDIA', 'REGISTRADA', 3),
(2, 2, 2, 'SOPORTE', 'Sistemas',
 '2026-10-21 10:30:00',
 'Solicito revisión de conexión a internet',
 'ALTA', 'EN REVISIÓN', 3)
ON DUPLICATE KEY UPDATE descripcion = VALUES(descripcion);

-- RESERVAS
INSERT INTO reservas
(id, usuario_id, recurso_id, fecha_inicio, fecha_fin, estado, observaciones)
VALUES
(1, 2, 1, '2026-11-02 08:00:00', '2026-11-02 10:00:00',
 'CONFIRMADA', 'Práctica académica'),
(2, 2, 2, '2026-11-03 14:00:00', '2026-11-03 16:00:00',
 'PENDIENTE', 'Actividad estudiantil')
ON DUPLICATE KEY UPDATE observaciones = VALUES(observaciones);

-- EVENTOS
INSERT INTO eventos
(id, titulo, descripcion, fecha_inicio, fecha_fin,
 ubicacion, organizador_id, estado)
VALUES
(1, 'Jornada de innovación',
 'Presentación de proyectos tecnológicos',
 '2026-11-05 09:00:00', '2026-11-05 12:00:00',
 'Auditorio principal', 3, 'PROGRAMADO'),
(2, 'Taller de programación',
 'Actividad práctica para estudiantes',
 '2026-11-06 14:00:00', '2026-11-06 16:00:00',
 'Sala de informática 1', 3, 'PROGRAMADO')
ON DUPLICATE KEY UPDATE titulo = VALUES(titulo);

-- NOTIFICACIONES
INSERT INTO notificaciones
(id, usuario_id, titulo, mensaje, tipo, estado, fecha_creacion)
VALUES
(1, 2, 'Solicitud registrada',
 'Tu solicitud de mantenimiento fue registrada',
 'INFO', 'PENDIENTE', '2026-10-20 09:05:00'),
(2, 2, 'Nuevo evento',
 'Se ha programado una jornada de innovación',
 'EVENTO', 'PENDIENTE', '2026-10-20 11:00:00')
ON DUPLICATE KEY UPDATE titulo = VALUES(titulo);
