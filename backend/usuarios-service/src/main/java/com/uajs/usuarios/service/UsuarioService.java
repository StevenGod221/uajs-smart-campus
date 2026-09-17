package com.uajs.usuarios.service;

import com.uajs.usuarios.entity.Usuario;
import com.uajs.usuarios.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

   private final PasswordEncoder passwordEncoder;

public UsuarioService(
        UsuarioRepository usuarioRepository,
        PasswordEncoder passwordEncoder) {

    this.usuarioRepository = usuarioRepository;
    this.passwordEncoder = passwordEncoder;
}

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }
public Optional<Usuario> login(String correo, String password) {

    Optional<Usuario> usuario = usuarioRepository.findByCorreo(correo);

    if (usuario.isPresent()) {

        Usuario encontrado = usuario.get();

        if (passwordEncoder.matches(
                password,
                encontrado.getPassword())) {

            return Optional.of(encontrado);
        }
    }

    return Optional.empty();
}
    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }

   public Usuario crear(Usuario usuario) {

    usuario.setPassword(
            passwordEncoder.encode(usuario.getPassword())
    );

    return usuarioRepository.save(usuario);
}

    public Optional<Usuario> actualizar(Long id, Usuario datos) {

        return usuarioRepository.findById(id)
                .map(usuario -> {

                    usuario.setNombre(datos.getNombre());
                    usuario.setApellido(datos.getApellido());
                    usuario.setCorreo(datos.getCorreo());
                    usuario.setPassword(datos.getPassword());
                    usuario.setRol(datos.getRol());
                    usuario.setPrograma(datos.getPrograma());
                    usuario.setDependencia(datos.getDependencia());
                    usuario.setEstado(datos.getEstado());

                    return usuarioRepository.save(usuario);
                });
    }

    public boolean eliminar(Long id) {

    if (!usuarioRepository.existsById(id)) {
        return false;
    }

    usuarioRepository.deleteById(id);

    return true;
}

}