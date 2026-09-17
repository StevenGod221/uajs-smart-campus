package com.uajs.reservas_service.service;

import com.uajs.reservas_service.dto.ReservaRequest;
import com.uajs.reservas_service.dto.ReservaResponse;
import com.uajs.reservas_service.entity.Reserva;
import com.uajs.reservas_service.repository.ReservaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservaService {

    private final ReservaRepository repository;

    public ReservaService(ReservaRepository repository) {
        this.repository = repository;
    }

    public ReservaResponse crear(ReservaRequest request) {

        if (!request.getFechaFin().isAfter(request.getFechaInicio())) {
            throw new IllegalArgumentException(
                    "La fecha final debe ser posterior a la fecha inicial"
            );
        }

        boolean existeCruce =
                repository.existsByRecursoIdAndFechaInicioLessThanAndFechaFinGreaterThan(
                        request.getRecursoId(),
                        request.getFechaFin(),
                        request.getFechaInicio()
                );

        if (existeCruce) {
            throw new IllegalArgumentException(
                    "El recurso ya está reservado en ese horario"
            );
        }

        Reserva reserva = new Reserva();

        reserva.setUsuarioId(request.getUsuarioId());
        reserva.setRecursoId(request.getRecursoId());
        reserva.setFechaInicio(request.getFechaInicio());
        reserva.setFechaFin(request.getFechaFin());
        reserva.setObservaciones(request.getObservaciones());
        reserva.setEstado("PENDIENTE");

        return convertir(repository.save(reserva));
    }

    public List<ReservaResponse> listar() {

        return repository.findAll()
                .stream()
                .map(this::convertir)
                .toList();
    }

    public ReservaResponse buscarPorId(Long id) {

        Reserva reserva = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Reserva no encontrada"));

        return convertir(reserva);
    }

    public List<ReservaResponse> buscarPorUsuario(Long usuarioId) {

        return repository.findByUsuarioId(usuarioId)
                .stream()
                .map(this::convertir)
                .toList();
    }

    public List<ReservaResponse> buscarPorRecurso(Long recursoId) {

        return repository.findByRecursoId(recursoId)
                .stream()
                .map(this::convertir)
                .toList();
    }

    public ReservaResponse actualizarEstado(Long id, String estado) {

        Reserva reserva = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Reserva no encontrada"));

        estado = estado.toUpperCase();

        if (!estadoValido(estado)) {
            throw new IllegalArgumentException(
                    "Estado de reserva no válido"
            );
        }

        reserva.setEstado(estado);

        return convertir(repository.save(reserva));
    }

    public void eliminar(Long id) {

        if (!repository.existsById(id)) {
            throw new RuntimeException("Reserva no encontrada");
        }

        repository.deleteById(id);
    }

    private boolean estadoValido(String estado) {

        return estado.equals("PENDIENTE")
                || estado.equals("APROBADA")
                || estado.equals("RECHAZADA")
                || estado.equals("CANCELADA")
                || estado.equals("FINALIZADA");
    }

    private ReservaResponse convertir(Reserva reserva) {

        return new ReservaResponse(
                reserva.getId(),
                reserva.getUsuarioId(),
                reserva.getRecursoId(),
                reserva.getFechaInicio(),
                reserva.getFechaFin(),
                reserva.getEstado(),
                reserva.getObservaciones()
        );
    }
    public ReservaResponse actualizar(Long id, ReservaRequest request) {

    Reserva reserva = repository.findById(id)
            .orElseThrow(() ->
                    new RuntimeException("Reserva no encontrada"));

    if (!request.getFechaFin().isAfter(request.getFechaInicio())) {
        throw new IllegalArgumentException(
                "La fecha final debe ser posterior a la fecha inicial"
        );
    }

    reserva.setUsuarioId(request.getUsuarioId());
    reserva.setRecursoId(request.getRecursoId());
    reserva.setFechaInicio(request.getFechaInicio());
    reserva.setFechaFin(request.getFechaFin());
    reserva.setObservaciones(request.getObservaciones());

    return convertir(repository.save(reserva));
}
}
