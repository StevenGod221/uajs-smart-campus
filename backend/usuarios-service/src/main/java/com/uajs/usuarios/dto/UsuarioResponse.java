package com.uajs.usuarios.dto;

import com.uajs.usuarios.entity.Usuario;

public class UsuarioResponse {

    private Long id;
    private String nombre;
    private String apellido;
    private String correo;
    private String rol;
    private String programa;
    private String dependencia;
    private Boolean estado;

    public UsuarioResponse(Usuario usuario) {
        this.id = usuario.getId();
        this.nombre = usuario.getNombre();
        this.apellido = usuario.getApellido();
        this.correo = usuario.getCorreo();
        this.rol = usuario.getRol();
        this.programa = usuario.getPrograma();
        this.dependencia = usuario.getDependencia();
        this.estado = usuario.getEstado();
    }

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public String getCorreo() {
        return correo;
    }

    public String getRol() {
        return rol;
    }

    public String getPrograma() {
        return programa;
    }

    public String getDependencia() {
        return dependencia;
    }

    public Boolean getEstado() {
        return estado;
    }
}