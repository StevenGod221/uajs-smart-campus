package com.uajs.eventos_service.dto;

import java.time.LocalDateTime;

public class EventoResponse {

    private Long id;
    private String titulo;
    private String descripcion;
    private LocalDateTime fechaInicio;
    private LocalDateTime fechaFin;
    private String ubicacion;
    private Long organizadorId;
    private String estado;

    public EventoResponse(
            Long id,
            String titulo,
            String descripcion,
            LocalDateTime fechaInicio,
            LocalDateTime fechaFin,
            String ubicacion,
            Long organizadorId,
            String estado) {

        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.ubicacion = ubicacion;
        this.organizadorId = organizadorId;
        this.estado = estado;
    }

    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public LocalDateTime getFechaInicio() {
        return fechaInicio;
    }

    public LocalDateTime getFechaFin() {
        return fechaFin;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public Long getOrganizadorId() {
        return organizadorId;
    }

    public String getEstado() {
        return estado;
    }
}