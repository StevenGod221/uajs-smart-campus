package com.uajs.reservas_service.repository;

import com.uajs.reservas_service.entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {

    List<Reserva> findByUsuarioId(Long usuarioId);

    List<Reserva> findByRecursoId(Long recursoId);

    List<Reserva> findByEstado(String estado);

    boolean existsByRecursoIdAndFechaInicioLessThanAndFechaFinGreaterThan(
            Long recursoId,
            LocalDateTime fechaFin,
            LocalDateTime fechaInicio
    );
}
