package com.uajs.solicitudes.service;

import com.uajs.solicitudes.dto.SolicitudRequest;
import com.uajs.solicitudes.dto.SolicitudResponse;
import com.uajs.solicitudes.entity.Solicitud;
import com.uajs.solicitudes.repository.SolicitudRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SolicitudService {

    private final SolicitudRepository repository;

    public SolicitudService(SolicitudRepository repository) {
        this.repository = repository;
    }

    public SolicitudResponse crear(SolicitudRequest request) {

        Solicitud solicitud = new Solicitud();

        solicitud.setUsuarioId(request.getUsuarioId());
        solicitud.setServicioId(request.getServicioId());
        solicitud.setTipo(request.getTipo());
        solicitud.setDependencia(request.getDependencia());
        solicitud.setDescripcion(request.getDescripcion());
        solicitud.setPrioridad(request.getPrioridad());

        solicitud.setFecha(LocalDateTime.now());

        solicitud.setEstado("REGISTRADA");

        Solicitud guardada = repository.save(solicitud);

        return convertir(guardada);
    }

    public List<SolicitudResponse> listar() {
        return repository.findAll()
                .stream()
                .map(this::convertir)
                .toList();
    }

    public SolicitudResponse buscarPorId(Long id) {

        Solicitud solicitud = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Solicitud no encontrada"));

        return convertir(solicitud);
    }

    public List<SolicitudResponse> buscarPorUsuario(Long usuarioId) {

        return repository.findByUsuarioId(usuarioId)
                .stream()
                .map(this::convertir)
                .toList();
    }

   public SolicitudResponse actualizarEstado(Long id, String nuevoEstado) {

    Solicitud solicitud = repository.findById(id)
            .orElseThrow(() ->
                    new RuntimeException("Solicitud no encontrada"));

    nuevoEstado = nuevoEstado.toUpperCase();

    if (!esEstadoValido(nuevoEstado)) {
        throw new IllegalArgumentException(
                "Estado no válido: " + nuevoEstado
        );
    }

    solicitud.setEstado(nuevoEstado);

    return convertir(repository.save(solicitud));
}

private boolean esEstadoValido(String estado) {

    return estado.equals("REGISTRADA")
            || estado.equals("EN REVISION")
            || estado.equals("ASIGNADA")
            || estado.equals("EN PROCESO")
            || estado.equals("RESUELTA")
            || estado.equals("CERRADA");
}

    public void eliminar(Long id) {

        if (!repository.existsById(id)) {
            throw new RuntimeException("Solicitud no encontrada");
        }

        repository.deleteById(id);
    }

    private SolicitudResponse convertir(Solicitud solicitud) {

        return new SolicitudResponse(
                solicitud.getId(),
                solicitud.getUsuarioId(),
                solicitud.getServicioId(),
                solicitud.getTipo(),
                solicitud.getDependencia(),
                solicitud.getFecha(),
                solicitud.getDescripcion(),
                solicitud.getPrioridad(),
                solicitud.getEstado(),
                solicitud.getResponsableId()
        );
    }
}