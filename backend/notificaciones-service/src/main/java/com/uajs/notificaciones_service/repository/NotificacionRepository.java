package com.uajs.notificaciones_service.repository;

import com.uajs.notificaciones_service.entity.Notificacion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificacionRepository
        extends JpaRepository<Notificacion, Long> {

    List<Notificacion> findByUsuarioId(Long usuarioId);

    List<Notificacion> findByTipo(String tipo);

    List<Notificacion> findByEstado(String estado);
}