package com.uajs.recursos_service.repository;

import com.uajs.recursos_service.entity.Recurso;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecursoRepository extends JpaRepository<Recurso, Long> {

    List<Recurso> findByTipo(String tipo);

    List<Recurso> findByEstado(String estado);

    List<Recurso> findByUbicacion(String ubicacion);
}