package com.uajs.notificaciones_service.controller;

import com.uajs.notificaciones_service.dto.NotificacionRequest;
import com.uajs.notificaciones_service.dto.NotificacionResponse;
import com.uajs.notificaciones_service.service.NotificacionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notificaciones")
public class NotificacionController {

    private final NotificacionService service;

    public NotificacionController(
            NotificacionService service) {

        this.service = service;
    }

    @PostMapping
    public ResponseEntity<NotificacionResponse> crear(
            @Valid @RequestBody NotificacionRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.crear(request));
    }

    @GetMapping
    public ResponseEntity<List<NotificacionResponse>> listar() {

        return ResponseEntity.ok(service.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<NotificacionResponse> buscarPorId(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                service.buscarPorId(id));
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<NotificacionResponse>>
    buscarPorUsuario(@PathVariable Long usuarioId) {

        return ResponseEntity.ok(
                service.buscarPorUsuario(usuarioId));
    }

    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<NotificacionResponse>>
    buscarPorTipo(@PathVariable String tipo) {

        return ResponseEntity.ok(
                service.buscarPorTipo(tipo));
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<NotificacionResponse>>
    buscarPorEstado(@PathVariable String estado) {

        return ResponseEntity.ok(
                service.buscarPorEstado(estado));
    }

    @PatchMapping("/{id}/leer")
    public ResponseEntity<NotificacionResponse> marcarLeida(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                service.marcarLeida(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Long id) {

        service.eliminar(id);

        return ResponseEntity.noContent().build();
    }
}