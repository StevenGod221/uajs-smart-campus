package com.uajs.solicitudes.repository;

import com.uajs.solicitudes.entity.Solicitud;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SolicitudRepository extends JpaRepository<Solicitud, Long> {

    List<Solicitud> findByUsuarioId(Long usuarioId);

    List<Solicitud> findByEstado(String estado);

    List<Solicitud> findByPrioridad(String prioridad);
}