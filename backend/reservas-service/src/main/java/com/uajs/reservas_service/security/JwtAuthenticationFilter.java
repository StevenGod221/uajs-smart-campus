package com.uajs.reservas_service.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import jakarta.servlet.http.HttpServletRequest;
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final SecretKey key;

    public JwtAuthenticationFilter(
            @Value("${jwt.secret}") String secret) {

        this.key = Keys.hmacShaKeyFor(
                secret.getBytes(StandardCharsets.UTF_8)
        );
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String authorizationHeader =
                request.getHeader("Authorization");

        if (authorizationHeader == null ||
                !authorizationHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);
            return;
        }

        String token = authorizationHeader.substring(7);

        try {
            Claims claims = Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            String correo = claims.getSubject();
            String rol = claims.get("rol", String.class);
            Number usuarioIdClaim =
                    claims.get("usuarioId", Number.class);

            if (correo == null ||
                    rol == null ||
                    usuarioIdClaim == null) {
                responderNoAutorizado(response);
                return;
            }

            Long usuarioId = usuarioIdClaim.longValue();

            var authorities = List.of(
                    new SimpleGrantedAuthority("ROLE_" + rol)
            );

            var authentication =
                    new UsernamePasswordAuthenticationToken(
                            correo,
                            null,
                            authorities
                    );

            authentication.setDetails(usuarioId);

            SecurityContextHolder.getContext()
                    .setAuthentication(authentication);

        } catch (Exception e) {
            SecurityContextHolder.clearContext();
            responderNoAutorizado(response);
            return;
        }

        filterChain.doFilter(request, response);
    }

    private void responderNoAutorizado(
            HttpServletResponse response) throws IOException {

        response.setStatus(
                HttpServletResponse.SC_UNAUTHORIZED
        );

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        response.getWriter().write(
                "{\"error\":\"Token inválido o expirado\"}"
        );
    }
}
