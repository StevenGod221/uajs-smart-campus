package com.uajs.usuarios.dto;

public class LoginResponse {

    private String mensaje;
    private String token;
    private UsuarioResponse usuario;

    public LoginResponse(
            String mensaje,
            String token,
            UsuarioResponse usuario) {

        this.mensaje = mensaje;
        this.token = token;
        this.usuario = usuario;
    }

    public String getMensaje() {
        return mensaje;
    }

    public String getToken() {
        return token;
    }

    public UsuarioResponse getUsuario() {
        return usuario;
    }
}