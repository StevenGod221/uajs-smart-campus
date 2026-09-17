import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const PORT = 8080;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// ===============================
// HEALTH CHECK DEL API GATEWAY
// ===============================
app.get("/health", (_req, res) => {
    res.json({
        status: "UP",
        service: "api-gateway",
        timestamp: new Date().toISOString()
    });
});

// ===============================
// FUNCIÓN PARA CREAR PROXIES
// ===============================
function crearProxy(target, rutaDestino) {
    return createProxyMiddleware({
        target: target,
        changeOrigin: true,

        pathRewrite: (path) => {
            const nuevaRuta = rutaDestino + path;

            // Eliminar "/" final innecesario
            if (nuevaRuta.length > rutaDestino.length && nuevaRuta.endsWith("/")) {
                return nuevaRuta.slice(0, -1);
            }

            return nuevaRuta;
        },

        on: {
            proxyReq: (proxyReq, req) => {
                if (req.headers.authorization) {
                    proxyReq.setHeader(
                        "Authorization",
                        req.headers.authorization
                    );
                }
            },

            error: (err, req, res) => {
                console.error(
                    `Error conectando con ${target}:`,
                    err.message
                );

                if (!res.headersSent) {
                    res.status(502).json({
                        status: 502,
                        message: "No se pudo conectar con el microservicio",
                        service: target
                    });
                }
            }
        }
    });
}

// ===============================
// RUTAS DEL API GATEWAY
// ===============================

// USUARIOS
app.use(
    "/api/users",
    crearProxy(
        "http://localhost:8081",
        "/api/usuarios"
    )
);

// LOGIN Y RUTAS DIRECTAS DE USUARIOS
app.use(
    "/api/usuarios",
    crearProxy(
        "http://localhost:8081",
        "/api/usuarios"
    )
);

// SOLICITUDES
app.use(
    "/api/requests",
    crearProxy(
        "http://localhost:8082",
        "/api/solicitudes"
    )
);

// RESERVAS
app.use(
    "/api/reservations",
    crearProxy(
        "http://localhost:8083",
        "/api/reservas"
    )
);

// RECURSOS
app.use(
    "/api/resources",
    crearProxy(
        "http://localhost:8084",
        "/api/recursos"
    )
);

// NOTIFICACIONES
app.use(
    "/api/notifications",
    crearProxy(
        "http://localhost:8085",
        "/api/notificaciones"
    )
);

// EVENTOS
app.use(
    "/api/events",
    crearProxy(
        "http://localhost:8086",
        "/api/eventos"
    )
);

// ===============================
// RUTA NO ENCONTRADA
// ===============================
app.use((_req, res) => {
    res.status(404).json({
        status: 404,
        message: "Ruta no encontrada en API Gateway"
    });
});

// ===============================
// INICIAR GATEWAY
// ===============================
app.listen(PORT, () => {
    console.log(
        `API Gateway ejecutándose en http://localhost:${PORT}`
    );
});