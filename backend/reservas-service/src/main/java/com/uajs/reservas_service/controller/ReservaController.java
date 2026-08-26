package com.uajs.reservas_service.controller;

import com.uajs.reservas_service.dto.ReservaRequest;
import com.uajs.reservas_service.dto.ReservaResponse;
import com.uajs.reservas_service.service.ReservaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservas")
public class ReservaController {

    private final ReservaService service;

    public ReservaController(ReservaService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<ReservaResponse> crear(
            @Valid @RequestBody ReservaRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.crear(request));
    }

    @GetMapping
    public ResponseEntity<List<ReservaResponse>> listar() {

        return ResponseEntity.ok(service.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservaResponse> buscarPorId(
            @PathVariable Long id) {

        return ResponseEntity.ok(service.buscarPorId(id));
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<ReservaResponse>> buscarPorUsuario(
            @PathVariable Long usuarioId) {

        return ResponseEntity.ok(
                service.buscarPorUsuario(usuarioId)
        );
    }

    @GetMapping("/recurso/{recursoId}")
    public ResponseEntity<List<ReservaResponse>> buscarPorRecurso(
            @PathVariable Long recursoId) {

        return ResponseEntity.ok(
                service.buscarPorRecurso(recursoId)
        );
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<ReservaResponse> actualizarEstado(
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
    
    @PutMapping("/{id}")
public ResponseEntity<ReservaResponse> actualizar(
        @PathVariable Long id,
        @Valid @RequestBody ReservaRequest request) {

    return ResponseEntity.ok(
            service.actualizar(id, request)
    );
}

}
