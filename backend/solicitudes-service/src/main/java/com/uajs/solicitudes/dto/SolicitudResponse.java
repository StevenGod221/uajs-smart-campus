package com.uajs.solicitudes.dto;

import java.time.LocalDateTime;

public class SolicitudResponse {

    private Long id;
    private Long usuarioId;
    private Long servicioId;
    private String tipo;
    private String dependencia;
    private LocalDateTime fecha;
    private String descripcion;
    private String prioridad;
    private String estado;
    private Long responsableId;

    public SolicitudResponse() {
    }

    public SolicitudResponse(
            Long id,
            Long usuarioId,
            Long servicioId,
            String tipo,
            String dependencia,
            LocalDateTime fecha,
            String descripcion,
            String prioridad,
            String estado,
            Long responsableId) {

        this.id = id;
        this.usuarioId = usuarioId;
        this.servicioId = servicioId;
        this.tipo = tipo;
        this.dependencia = dependencia;
        this.fecha = fecha;
        this.descripcion = descripcion;
        this.prioridad = prioridad;
        this.estado = estado;
        this.responsableId = responsableId;
    }

    public Long getId() {
        return id;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public Long getServicioId() {
        return servicioId;
    }

    public String getTipo() {
        return tipo;
    }

    public String getDependencia() {
        return dependencia;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public String getPrioridad() {
        return prioridad;
    }

    public String getEstado() {
        return estado;
    }

    public Long getResponsableId() {
        return responsableId;
    }
}