package com.uajs.reservas_service.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public class ReservaRequest {

    @NotNull(message = "El ID del usuario es obligatorio")
    @Positive(message = "El ID del usuario debe ser positivo")
    private Long usuarioId;

    @NotNull(message = "El ID del recurso es obligatorio")
    @Positive(message = "El ID del recurso debe ser positivo")
    private Long recursoId;

    @NotNull(message = "La fecha de inicio es obligatoria")
    private LocalDateTime fechaInicio;

    @NotNull(message = "La fecha de finalización es obligatoria")
    private LocalDateTime fechaFin;

    @Size(max = 500, message = "Las observaciones no pueden superar 500 caracteres")
    private String observaciones;

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Long getRecursoId() {
        return recursoId;
    }

    public void setRecursoId(Long recursoId) {
        this.recursoId = recursoId;
    }

    public LocalDateTime getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(LocalDateTime fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDateTime getFechaFin() {
        return fechaFin;
    }

    public void setFechaFin(LocalDateTime fechaFin) {
        this.fechaFin = fechaFin;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }
}