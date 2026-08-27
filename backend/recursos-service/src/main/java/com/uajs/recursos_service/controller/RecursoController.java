package com.uajs.recursos_service.controller;

import com.uajs.recursos_service.dto.RecursoRequest;
import com.uajs.recursos_service.dto.RecursoResponse;
import com.uajs.recursos_service.service.RecursoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recursos")
public class RecursoController {

    private final RecursoService service;

    public RecursoController(RecursoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<RecursoResponse> crear(
            @Valid @RequestBody RecursoRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(service.crear(request));
    }

    @GetMapping
    public ResponseEntity<List<RecursoResponse>> listar() {

        return ResponseEntity.ok(service.listar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecursoResponse> buscarPorId(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                service.buscarPorId(id)
        );
    }

    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<RecursoResponse>> buscarPorTipo(
            @PathVariable String tipo) {

        return ResponseEntity.ok(
                service.buscarPorTipo(tipo)
        );
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<RecursoResponse>> buscarPorEstado(
            @PathVariable String estado) {

        return ResponseEntity.ok(
                service.buscarPorEstado(estado)
        );
    }

    @GetMapping("/ubicacion/{ubicacion}")
    public ResponseEntity<List<RecursoResponse>> buscarPorUbicacion(
            @PathVariable String ubicacion) {

        return ResponseEntity.ok(
                service.buscarPorUbicacion(ubicacion)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecursoResponse> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody RecursoRequest request) {

        return ResponseEntity.ok(
                service.actualizar(id, request)
        );
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<RecursoResponse> actualizarEstado(
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