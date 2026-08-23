package com.uajs.usuarios.controller;

import com.uajs.usuarios.dto.UsuarioRequest;
import com.uajs.usuarios.dto.UsuarioResponse;
import com.uajs.usuarios.entity.Usuario;
import com.uajs.usuarios.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping("/health")
    public String health() {
        return "usuarios-service funcionando correctamente";
    }

    @GetMapping
    public ResponseEntity<List<UsuarioResponse>> listarUsuarios() {

        List<UsuarioResponse> usuarios =
                usuarioService.listarTodos()
                        .stream()
                        .map(UsuarioResponse::new)
                        .toList();

        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponse> buscarUsuario(
            @PathVariable Long id) {

        return usuarioService.buscarPorId(id)
                .map(UsuarioResponse::new)
                .map(ResponseEntity::ok)
                .orElseGet(() ->
                        ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<UsuarioResponse> crearUsuario(
            @Valid @RequestBody UsuarioRequest request) {

        Usuario usuario = new Usuario();

        usuario.setNombre(request.getNombre());
        usuario.setApellido(request.getApellido());
        usuario.setCorreo(request.getCorreo());
        usuario.setPassword(request.getPassword());
        usuario.setRol(request.getRol());
        usuario.setPrograma(request.getPrograma());
        usuario.setDependencia(request.getDependencia());
        usuario.setEstado(request.getEstado());

        Usuario nuevoUsuario =
                usuarioService.crear(usuario);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new UsuarioResponse(nuevoUsuario));
    }
}