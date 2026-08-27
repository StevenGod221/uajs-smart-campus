package com.uajs.eventos_service.repository;

import com.uajs.eventos_service.entity.Evento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventoRepository extends JpaRepository<Evento, Long> {

    List<Evento> findByOrganizadorId(Long organizadorId);

    List<Evento> findByEstado(String estado);
}