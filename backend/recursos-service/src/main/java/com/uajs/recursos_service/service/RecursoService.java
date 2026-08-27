package com.uajs.recursos_service.service;

import com.uajs.recursos_service.dto.RecursoRequest;
import com.uajs.recursos_service.dto.RecursoResponse;
import com.uajs.recursos_service.entity.Recurso;
import com.uajs.recursos_service.repository.RecursoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecursoService {

    private final RecursoRepository repository;

    public RecursoService(RecursoRepository repository) {
        this.repository = repository;
    }

    public RecursoResponse crear(RecursoRequest request) {

        Recurso recurso = new Recurso();

        recurso.setNombre(request.getNombre());
        recurso.setTipo(request.getTipo());
        recurso.setDescripcion(request.getDescripcion());
        recurso.setUbicacion(request.getUbicacion());
        recurso.setEstado("DISPONIBLE");

        return convertir(repository.save(recurso));
    }

    public List<RecursoResponse> listar() {

        return repository.findAll()
                .stream()
                .map(this::convertir)
                .toList();
    }

    public RecursoResponse buscarPorId(Long id) {

        Recurso recurso = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Recurso no encontrado"));

        return convertir(recurso);
    }

    public List<RecursoResponse> buscarPorTipo(String tipo) {

        return repository.findByTipo(tipo)
                .stream()
                .map(this::convertir)
                .toList();
    }

    public List<RecursoResponse> buscarPorEstado(String estado) {

        return repository.findByEstado(estado.toUpperCase())
                .stream()
                .map(this::convertir)
                .toList();
    }

    public List<RecursoResponse> buscarPorUbicacion(String ubicacion) {

        return repository.findByUbicacion(ubicacion)
                .stream()
                .map(this::convertir)
                .toList();
    }

    public RecursoResponse actualizar(
            Long id,
            RecursoRequest request) {

        Recurso recurso = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Recurso no encontrado"));

        recurso.setNombre(request.getNombre());
        recurso.setTipo(request.getTipo());
        recurso.setDescripcion(request.getDescripcion());
        recurso.setUbicacion(request.getUbicacion());

        return convertir(repository.save(recurso));
    }

    public RecursoResponse actualizarEstado(
            Long id,
            String estado) {

        Recurso recurso = repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Recurso no encontrado"));

        estado = estado.toUpperCase();

        if (!estadoValido(estado)) {
            throw new IllegalArgumentException(
                    "Estado de recurso no valido");
        }

        recurso.setEstado(estado);

        return convertir(repository.save(recurso));
    }

    public void eliminar(Long id) {

        if (!repository.existsById(id)) {
            throw new RuntimeException("Recurso no encontrado");
        }

        repository.deleteById(id);
    }

    private boolean estadoValido(String estado) {

        return estado.equals("DISPONIBLE")
                || estado.equals("NO_DISPONIBLE")
                || estado.equals("MANTENIMIENTO");
    }

    private RecursoResponse convertir(Recurso recurso) {

        return new RecursoResponse(
                recurso.getId(),
                recurso.getNombre(),
                recurso.getTipo(),
                recurso.getDescripcion(),
                recurso.getUbicacion(),
                recurso.getEstado()
        );
    }
}