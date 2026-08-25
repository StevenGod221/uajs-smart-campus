package com.uajs.usuarios.controller;

import com.uajs.usuarios.dto.LoginRequest;
import com.uajs.usuarios.dto.LoginResponse;
import com.uajs.usuarios.dto.UsuarioRequest;
import com.uajs.usuarios.dto.UsuarioResponse;
import com.uajs.usuarios.entity.Usuario;
import com.uajs.usuarios.service.JwtService;
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
    private final JwtService jwtService;

    public UsuarioController(
            UsuarioService usuarioService,
            JwtService jwtService) {

        this.usuarioService = usuarioService;
        this.jwtService = jwtService;
    }

    // =========================
    // HEALTH CHECK
    // =========================

    @GetMapping("/health")
    public String health() {
        return "usuarios-service funcionando correctamente";
    }

    // =========================
    // LOGIN
    // =========================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @Valid @RequestBody LoginRequest request) {

        var resultado = usuarioService.login(
                request.getCorreo(),
                request.getPassword()
        );

        if (resultado.isEmpty()) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Correo o contraseña incorrectos");
        }

        Usuario usuario = resultado.get();

        String token = jwtService.generarToken(
                usuario.getCorreo(),
                usuario.getRol()
        );

        LoginResponse respuesta = new LoginResponse(
                "Login exitoso",
                token,
                new UsuarioResponse(usuario)
        );

        return ResponseEntity.ok(respuesta);
    }

    // =========================
    // LISTAR USUARIOS
    // =========================

    @GetMapping
    public ResponseEntity<List<UsuarioResponse>> listarUsuarios() {

        List<UsuarioResponse> usuarios =
                usuarioService.listarTodos()
                        .stream()
                        .map(UsuarioResponse::new)
                        .toList();

        return ResponseEntity.ok(usuarios);
    }

    // =========================
    // BUSCAR USUARIO
    // =========================

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponse> buscarUsuario(
            @PathVariable Long id) {

        return usuarioService.buscarPorId(id)
                .map(UsuarioResponse::new)
                .map(ResponseEntity::ok)
                .orElseGet(() ->
                        ResponseEntity.notFound().build());
    }

    // =========================
    // CREAR USUARIO
    // =========================

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
    @PutMapping("/{id}")
public ResponseEntity<UsuarioResponse> actualizarUsuario(
        @PathVariable Long id,
        @Valid @RequestBody UsuarioRequest request) {

    Usuario datos = new Usuario();

    datos.setNombre(request.getNombre());
    datos.setApellido(request.getApellido());
    datos.setPrograma(request.getPrograma());
    datos.setDependencia(request.getDependencia());
    datos.setEstado(request.getEstado());

    return usuarioService
            .actualizar(id, datos)
            .map(UsuarioResponse::new)
            .map(ResponseEntity::ok)
            .orElseGet(() ->
                    ResponseEntity.notFound().build());
}
@DeleteMapping("/{id}")
public ResponseEntity<?> eliminarUsuario(
        @PathVariable Long id) {

    if (!usuarioService.eliminar(id)) {
        return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(
            "Usuario eliminado correctamente"
    );
}
}