package com.uajs.reservas_service.config;

import com.uajs.reservas_service.security.JwtAuthenticationFilter;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/health", "/api/reservas/health").permitAll()

                // Consultar reservas
                .requestMatchers(HttpMethod.GET, "/api/reservas/**")
                    .hasAnyRole("ADMIN", "FUNCIONARIO", "DOCENTE", "ESTUDIANTE")

                // Crear una reserva
                .requestMatchers(HttpMethod.POST, "/api/reservas/**")
                    .hasAnyRole("ADMIN", "DOCENTE", "ESTUDIANTE")

                // Actualizar una reserva
                .requestMatchers(HttpMethod.PUT, "/api/reservas/**")
                    .hasAnyRole("ADMIN", "FUNCIONARIO")

                // Cambiar el estado de una reserva
                .requestMatchers(HttpMethod.PATCH, "/api/reservas/**")
                    .hasAnyRole("ADMIN", "FUNCIONARIO")

                // Eliminar reservas
                .requestMatchers(HttpMethod.DELETE, "/api/reservas/**")
                    .hasRole("ADMIN")

                .anyRequest().authenticated()
            )
            .exceptionHandling(exception -> exception
                .authenticationEntryPoint((request, response, ex) -> {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.setContentType("application/json");
                    response.setCharacterEncoding("UTF-8");
                    response.getWriter().write(
                        "{\"error\":\"No autenticado\"}"
                    );
                })
                .accessDeniedHandler((request, response, ex) -> {
                    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    response.setContentType("application/json");
                    response.setCharacterEncoding("UTF-8");
                    response.getWriter().write(
                        "{\"error\":\"No tienes permisos para realizar esta operación\"}"
                    );
                })
            )
            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(
            List.of("http://localhost:5173")
        );

        configuration.setAllowedMethods(
            List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
        );

        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}