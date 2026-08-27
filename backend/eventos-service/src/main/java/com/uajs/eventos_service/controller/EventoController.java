package com.uajs.eventos_service.controller;

import com.uajs.eventos_service.dto.EventoRequest;
import com.uajs.eventos_service.dto.EventoResponse;
import com.uajs.eventos_service.service.EventoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/eventos")
public class EventoController {

    private final EventoService service;

    public EventoController(EventoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<EventoResponse> crear(
            @Valid @RequestBody EventoRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.crear(request));
    }

    @GetMapping
    public ResponseEntity<List<EventoResponse>> listar() {

        return ResponseEntity.ok(service.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventoResponse> buscarPorId(
            @PathVariable Long id) {

        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @GetMapping("/organizador/{organizadorId}")
    public ResponseEntity<List<EventoResponse>> buscarPorOrganizador(
            @PathVariable Long organizadorId) {

        return ResponseEntity.ok(
                service.buscarPorOrganizador(organizadorId)
        );
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<EventoResponse>> buscarPorEstado(
            @PathVariable String estado) {

        return ResponseEntity.ok(
                service.buscarPorEstado(estado)
        );
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<EventoResponse> actualizarEstado(
            @PathVariable Long id,
            @RequestParam String estado) {

        return ResponseEntity.ok(
                service.actualizarEstado(id, estado)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Long id) {

        service.eliminar(id);

        return ResponseEntity.noContent().build();
    }
}