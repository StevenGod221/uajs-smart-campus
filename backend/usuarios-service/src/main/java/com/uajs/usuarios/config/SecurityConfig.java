package com.uajs.usuarios.config;

import com.uajs.usuarios.security.JwtAuthenticationFilter;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter) {

        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    // ==========================================
    // PASSWORD ENCODER
    // ==========================================

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // ==========================================
    // SECURITY FILTER CHAIN
    // ==========================================

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http

            // ------------------------------------------
            // CSRF
            // ------------------------------------------

            .csrf(csrf -> csrf.disable())

            // ------------------------------------------
            // SESSION
            // ------------------------------------------

            .sessionManagement(session ->
                    session.sessionCreationPolicy(
                            SessionCreationPolicy.STATELESS
                    )
            )

            // ------------------------------------------
            // AUTORIZACIÓN
            // ------------------------------------------

            .authorizeHttpRequests(auth -> auth

                    // Rutas públicas
                    .requestMatchers(
                            "/api/usuarios/login",
                            "/api/usuarios/health"
                    ).permitAll()

                    // Crear usuarios → ADMIN
                    .requestMatchers(
                            org.springframework.http.HttpMethod.POST,
                            "/api/usuarios"
                    ).hasRole("ADMIN")

                    // Eliminar usuarios → ADMIN
                    .requestMatchers(
                            org.springframework.http.HttpMethod.DELETE,
                            "/api/usuarios/**"
                    ).hasRole("ADMIN")

                    // Actualizar usuarios → ADMIN o FUNCIONARIO
                    .requestMatchers(
                            org.springframework.http.HttpMethod.PUT,
                            "/api/usuarios/**"
                    ).hasAnyRole(
                            "ADMIN",
                            "FUNCIONARIO"
                    )

                    // Consultar usuarios
                    .requestMatchers(
                            org.springframework.http.HttpMethod.GET,
                            "/api/usuarios/**"
                    ).hasAnyRole(
                            "ADMIN",
                            "ESTUDIANTE",
                            "DOCENTE",
                            "FUNCIONARIO"
                    )

                    // Cualquier otra ruta requiere autenticación
                    .anyRequest().authenticated()
            )

            // ------------------------------------------
            // MANEJO DE ERRORES
            // ------------------------------------------

            .exceptionHandling(exception ->

                    exception

                            // 401 - No autenticado
                            .authenticationEntryPoint(
                                    (request, response, authException) -> {

                                        response.setStatus(
                                                HttpServletResponse.SC_UNAUTHORIZED
                                        );

                                        response.setContentType(
                                                "application/json"
                                        );

                                        response.getWriter().write(
                                                "{\"error\":\"No autenticado\"}"
                                        );
                                    }
                            )

                            // 403 - Sin permisos
                            .accessDeniedHandler(
                                    (request, response, accessDeniedException) -> {

                                        response.setStatus(
                                                HttpServletResponse.SC_FORBIDDEN
                                        );

                                        response.setContentType(
                                                "application/json"
                                        );

                                        response.getWriter().write(
                                                "{\"error\":\"No tienes permisos para realizar esta operación\"}"
                                        );
                                    }
                            )
            )

            // ------------------------------------------
            // JWT FILTER
            // ------------------------------------------

            .addFilterBefore(
                    jwtAuthenticationFilter,
                    UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}