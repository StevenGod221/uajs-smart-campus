package com.uajs.recursos_service.dto;

public class RecursoResponse {

    private Long id;
    private String nombre;
    private String tipo;
    private String descripcion;
    private String ubicacion;
    private String estado;

    public RecursoResponse(
            Long id,
            String nombre,
            String tipo,
            String descripcion,
            String ubicacion,
            String estado) {

        this.id = id;
        this.nombre = nombre;
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.ubicacion = ubicacion;
        this.estado = estado;
    }

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getTipo() {
        return tipo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public String getEstado() {
        return estado;
    }
}