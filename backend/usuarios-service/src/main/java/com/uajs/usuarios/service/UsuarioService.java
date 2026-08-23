package com.uajs.usuarios.service;

import com.uajs.usuarios.entity.Usuario;
import com.uajs.usuarios.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public Usuario crear(Usuario usuario) {
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