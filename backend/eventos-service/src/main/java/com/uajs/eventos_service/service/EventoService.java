package com.uajs.eventos_service.service;

import com.uajs.eventos_service.dto.EventoRequest;
import com.uajs.eventos_service.dto.EventoResponse;
import com.uajs.eventos_service.entity.Evento;
import com.uajs.eventos_service.repository.EventoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventoService {

    private final EventoRepository repository;

    public EventoService(EventoRepository repository) {
        this.repository = repository;
    }

    public EventoResponse crear(EventoRequest request) {

        if (!request.getFechaFin().isAfter(request.getFechaInicio())) {
            throw new IllegalArgumentException(
                    "La fecha final debe ser posterior a la fecha inicial"
            );
        }

        Evento evento = new Evento();

        evento.setTitulo(request.getTitulo());
        evento.setDescripcion(request.getDescripcion());
        evento.setFechaInicio(request.getFechaInicio());
        evento.setFechaFin(request.getFechaFin());
        evento.setUbicacion(request.getUbicacion());
        evento.setOrganizadorId(request.getOrganizadorId());
        evento.setEstado("PROGRAMADO");

        return convertir(repository.save(evento));
    }

    public List<EventoResponse> listar() {

        return repository.findAll()
                .stream()
                .map(this::convertir)
                .toList();
    }

    public EventoResponse buscarPorId(Long id) {

        Evento evento = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Evento no encontrado"));

        return convertir(evento);
    }

    public List<EventoResponse> buscarPorOrganizador(Long organizadorId) {

        return repository.findByOrganizadorId(organizadorId)
                .stream()
                .map(this::convertir)
                .toList();
    }

    public List<EventoResponse> buscarPorEstado(String estado) {

        return repository.findByEstado(estado.toUpperCase())
                .stream()
                .map(this::convertir)
                .toList();
    }

    public EventoResponse actualizarEstado(Long id, String estado) {

        Evento evento = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Evento no encontrado"));

        estado = estado.toUpperCase();

        if (!estadoValido(estado)) {
            throw new IllegalArgumentException(
                    "Estado de evento no válido"
            );
        }

        evento.setEstado(estado);

        return convertir(repository.save(evento));
    }

    public void eliminar(Long id) {

        if (!repository.existsById(id)) {
            throw new RuntimeException("Evento no encontrado");
        }

        repository.deleteById(id);
    }

    private boolean estadoValido(String estado) {

        return estado.equals("PROGRAMADO")
                || estado.equals("EN_CURSO")
                || estado.equals("FINALIZADO")
                || estado.equals("CANCELADO");
    }

    private EventoResponse convertir(Evento evento) {

        return new EventoResponse(
                evento.getId(),
                evento.getTitulo(),
                evento.getDescripcion(),
                evento.getFechaInicio(),
                evento.getFechaFin(),
                evento.getUbicacion(),
                evento.getOrganizadorId(),
                evento.getEstado()
        );
    }
}