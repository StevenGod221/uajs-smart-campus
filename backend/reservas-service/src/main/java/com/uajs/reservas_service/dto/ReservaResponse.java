package com.uajs.reservas_service.dto;

import java.time.LocalDateTime;

public class ReservaResponse {

    private Long id;
    private Long usuarioId;
    private Long recursoId;
    private LocalDateTime fechaInicio;
    private LocalDateTime fechaFin;
    private String estado;
    private String observaciones;

    public ReservaResponse(
            Long id,
            Long usuarioId,
            Long recursoId,
            LocalDateTime fechaInicio,
            LocalDateTime fechaFin,
            String estado,
            String observaciones) {

        this.id = id;
        this.usuarioId = usuarioId;
        this.recursoId = recursoId;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.estado = estado;
        this.observaciones = observaciones;
    }

    public Long getId() {
        return id;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public Long getRecursoId() {
        return recursoId;
    }

    public LocalDateTime getFechaInicio() {
        return fechaInicio;
    }

    public LocalDateTime getFechaFin() {
        return fechaFin;
    }

    public String getEstado() {
        return estado;
    }

    public String getObservaciones() {
        return observaciones;
    }
}
