CREATE DATABASE IF NOT EXISTS uajs_smart_campus
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_0900_ai_ci;

USE uajs_smart_campus;

CREATE TABLE IF NOT EXISTS usuarios (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    apellido VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(255) NOT NULL,
    programa VARCHAR(255) NULL,
    dependencia VARCHAR(255) NULL,
    estado BOOLEAN NOT NULL DEFAULT TRUE,
    PRIMARY KEY (id),
    CONSTRAINT uk_usuarios_correo UNIQUE (correo)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS recursos (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    tipo VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NULL,
    ubicacion VARCHAR(255) NULL,
    estado VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS solicitudes (
    id BIGINT NOT NULL AUTO_INCREMENT,
    usuario_id BIGINT NOT NULL,
    servicio_id BIGINT NOT NULL,
    tipo VARCHAR(255) NOT NULL,
    dependencia VARCHAR(255) NOT NULL,
    fecha DATETIME(6) NOT NULL,
    descripcion VARCHAR(1000) NOT NULL,
    prioridad VARCHAR(255) NOT NULL,
    estado VARCHAR(255) NOT NULL,
    responsable_id BIGINT NULL,
    PRIMARY KEY (id),
    INDEX idx_solicitudes_usuario (usuario_id),
    INDEX idx_solicitudes_responsable (responsable_id),
    CONSTRAINT fk_solicitudes_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    CONSTRAINT fk_solicitudes_responsable
        FOREIGN KEY (responsable_id) REFERENCES usuarios(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS reservas (
    id BIGINT NOT NULL AUTO_INCREMENT,
    usuario_id BIGINT NOT NULL,
    recurso_id BIGINT NOT NULL,
    fecha_inicio DATETIME(6) NOT NULL,
    fecha_fin DATETIME(6) NOT NULL,
    estado VARCHAR(255) NOT NULL,
    observaciones VARCHAR(1000) NULL,
    PRIMARY KEY (id),
    INDEX idx_reservas_usuario (usuario_id),
    INDEX idx_reservas_recurso_fechas (recurso_id, fecha_inicio, fecha_fin),
    CONSTRAINT fk_reservas_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    CONSTRAINT fk_reservas_recurso
        FOREIGN KEY (recurso_id) REFERENCES recursos(id),
    CONSTRAINT chk_reservas_fechas CHECK (fecha_fin > fecha_inicio)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS eventos (
    id BIGINT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    descripcion VARCHAR(1000) NULL,
    fecha_inicio DATETIME(6) NOT NULL,
    fecha_fin DATETIME(6) NOT NULL,
    ubicacion VARCHAR(255) NOT NULL,
    organizador_id BIGINT NULL,
    estado VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    INDEX idx_eventos_organizador (organizador_id),
    CONSTRAINT fk_eventos_organizador
        FOREIGN KEY (organizador_id) REFERENCES usuarios(id),
    CONSTRAINT chk_eventos_fechas CHECK (fecha_fin > fecha_inicio)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS notificaciones (
    id BIGINT NOT NULL AUTO_INCREMENT,
    usuario_id BIGINT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    mensaje VARCHAR(1000) NOT NULL,
    tipo VARCHAR(255) NOT NULL,
    estado VARCHAR(255) NOT NULL,
    fecha_creacion DATETIME(6) NOT NULL,
    PRIMARY KEY (id),
    INDEX idx_notificaciones_usuario (usuario_id),
    CONSTRAINT fk_notificaciones_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
) ENGINE=InnoDB;
