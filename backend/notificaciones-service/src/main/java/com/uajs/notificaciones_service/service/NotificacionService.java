package com.uajs.notificaciones_service.service;

import com.uajs.notificaciones_service.dto.NotificacionRequest;
import com.uajs.notificaciones_service.dto.NotificacionResponse;
import com.uajs.notificaciones_service.entity.Notificacion;
import com.uajs.notificaciones_service.repository.NotificacionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificacionService {

    private final NotificacionRepository repository;

    public NotificacionService(
            NotificacionRepository repository) {

        this.repository = repository;
    }

    public NotificacionResponse crear(
            NotificacionRequest request) {

        Notificacion notificacion = new Notificacion();

        notificacion.setUsuarioId(request.getUsuarioId());
        notificacion.setTitulo(request.getTitulo());
        notificacion.setMensaje(request.getMensaje());
        notificacion.setTipo(request.getTipo());
        notificacion.setEstado("NO_LEIDA");
        notificacion.setFechaCreacion(LocalDateTime.now());

        return convertir(repository.save(notificacion));
    }

    public List<NotificacionResponse> listar() {

        return repository.findAll()
                .stream()
                .map(this::convertir)
                .toList();
    }

    public NotificacionResponse buscarPorId(Long id) {

        Notificacion notificacion =
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Notificacion no encontrada"));

        return convertir(notificacion);
    }

    public List<NotificacionResponse> buscarPorUsuario(
            Long usuarioId) {

        return repository.findByUsuarioId(usuarioId)
                .stream()
                .map(this::convertir)
                .toList();
    }

    public List<NotificacionResponse> buscarPorTipo(
            String tipo) {

        return repository.findByTipo(tipo)
                .stream()
                .map(this::convertir)
                .toList();
    }

    public List<NotificacionResponse> buscarPorEstado(
            String estado) {

        return repository.findByEstado(
                        estado.toUpperCase())
                .stream()
                .map(this::convertir)
                .toList();
    }

    public NotificacionResponse marcarLeida(Long id) {

        Notificacion notificacion =
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Notificacion no encontrada"));

        notificacion.setEstado("LEIDA");

        return convertir(repository.save(notificacion));
    }

    public void eliminar(Long id) {

        if (!repository.existsById(id)) {
            throw new RuntimeException(
                    "Notificacion no encontrada");
        }

        repository.deleteById(id);
    }

    private NotificacionResponse convertir(
            Notificacion notificacion) {

        return new NotificacionResponse(
                notificacion.getId(),
                notificacion.getUsuarioId(),
                notificacion.getTitulo(),
                notificacion.getMensaje(),
                notificacion.getTipo(),
                notificacion.getEstado(),
                notificacion.getFechaCreacion()
        );
    }
}