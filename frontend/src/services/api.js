const API = "http://localhost:8080";

const getToken = () => localStorage.getItem("token");
export const iniciarSesion = async (correo, password) => {
    const response = await fetch(`${API}/api/usuarios/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            correo,
            password,
        }),
    });

    if (!response.ok) {
        let message = `Error HTTP ${response.status}`;

        try {
            const data = await response.json();
            message =
                data.message ||
                data.error ||
                data.mensaje ||
                message;
        } catch {
            try {
                const text = await response.text();
                if (text) {
                    message = text;
                }
            } catch {
                // No se pudo leer la respuesta
            }
        }

        throw new Error(message);
    }

    return response.json();
};
async function request(url, options = {}) {

    const token = getToken();

    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API}${url}`, {
        ...options,
        headers,
    });

    if (!response.ok) {

        let message = `Error HTTP ${response.status}`;

        try {
            const data = await response.json();

            message =
                data.message ||
                data.error ||
                data.mensaje ||
                message;

        } catch {
            // La respuesta no tenía JSON
        }

        throw new Error(message);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}


// ==========================================
// USUARIOS
// ==========================================

export const usuariosApi = {

    listar: () =>
        request("/api/users"),

    obtener: (id) =>
        request(`/api/users/${id}`),

    crear: (data) =>
        request("/api/users", {
            method: "POST",
            body: JSON.stringify(data),
        }),

    actualizar: (id, data) =>
        request(`/api/users/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
        }),

    eliminar: (id) =>
        request(`/api/users/${id}`, {
            method: "DELETE",
        }),
};


// ==========================================
// SOLICITUDES
// ==========================================

export const solicitudesApi = {

    listar: () =>
        request("/api/requests"),

    obtener: (id) =>
        request(`/api/requests/${id}`),

    crear: (data) =>
        request("/api/requests", {
            method: "POST",
            body: JSON.stringify(data),
        }),

    actualizar: (id, data) =>
        request(`/api/requests/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
        }),

    eliminar: (id) =>
        request(`/api/requests/${id}`, {
            method: "DELETE",
        }),

    cambiarEstado: (id, estado) =>
        request(
            `/api/requests/${id}/estado?estado=${encodeURIComponent(estado)}`,
            {
                method: "PATCH",
            }
        ),
};


// ==========================================
// RESERVAS
// ==========================================

export const reservasApi = {
  listar: () =>
    request("/api/reservations"),

  obtener: (id) =>
    request(`/api/reservations/${id}`),

  crear: (data) =>
    request("/api/reservations", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  porUsuario: (usuarioId) =>
    request(`/api/reservations/usuario/${usuarioId}`),

  porRecurso: (recursoId) =>
    request(`/api/reservations/recurso/${recursoId}`),

  cambiarEstado: (id, estado) =>
    request(
      `/api/reservations/${id}/estado?estado=${encodeURIComponent(estado)}`,
      {
        method: "PATCH",
      }
    ),

  eliminar: (id) =>
    request(`/api/reservations/${id}`, {
      method: "DELETE",
    }),
};



// ==========================================
// RECURSOS
// ==========================================

export const recursosApi = {

    listar: () =>
        request("/api/resources"),

    obtener: (id) =>
        request(`/api/resources/${id}`),

    porTipo: (tipo) =>
        request(`/api/resources/type/${encodeURIComponent(tipo)}`),

    porEstado: (estado) =>
        request(`/api/resources/status/${encodeURIComponent(estado)}`),

    porUbicacion: (ubicacion) =>
        request(
            `/api/resources/location/${encodeURIComponent(ubicacion)}`
        ),

    crear: (data) =>
        request("/api/resources", {
            method: "POST",
            body: JSON.stringify(data),
        }),

    actualizar: (id, data) =>
        request(`/api/resources/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
        }),

   cambiarEstado: (id, estado) =>
  request(`/api/resources/${id}/estado?estado=${encodeURIComponent(estado)}`, {
    method: "PATCH",
  }),

    eliminar: (id) =>
        request(`/api/resources/${id}`, {
            method: "DELETE",
        }),
};


// ==========================================
// NOTIFICACIONES
// ==========================================

export const notificacionesApi = {

    listar: () =>
        request("/api/notifications"),

    obtener: (id) =>
        request(`/api/notifications/${id}`),

    porUsuario: (usuarioId) =>
        request(`/api/notifications/user/${usuarioId}`),

    crear: (data) =>
        request("/api/notifications", {
            method: "POST",
            body: JSON.stringify(data),
        }),

    marcarLeida: (id) =>
        request(`/api/notifications/${id}/read`, {
            method: "PATCH",
        }),

    eliminar: (id) =>
        request(`/api/notifications/${id}`, {
            method: "DELETE",
        }),
};


// ==========================================
// EVENTOS
// ==========================================

export const eventosApi = {

    listar: () =>
        request("/api/events"),

    obtener: (id) =>
        request(`/api/events/${id}`),

    crear: (data) =>
        request("/api/events", {
            method: "POST",
            body: JSON.stringify(data),
        }),

    actualizar: (id, data) =>
        request(`/api/events/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
        }),

    eliminar: (id) =>
        request(`/api/events/${id}`, {
            method: "DELETE",
        }),
};
// ==========================================
// COMPATIBILIDAD CON APP.JSX
// ==========================================

export const crearReserva = (data) =>
    reservasApi.crear(data);

export const obtenerReservas = () =>
    reservasApi.listar();

export const obtenerReserva = (id) =>
    reservasApi.obtener(id);

export const eliminarReserva = (id) =>
    reservasApi.eliminar(id);

export const cambiarEstadoReserva = (id, estado) =>
    reservasApi.cambiarEstado(id, estado);

export const actualizarEstadoReserva = (id, estado) =>
    reservasApi.cambiarEstado(id, estado);
// ==========================================
// SOLICITUDES
// ==========================================

export const crearSolicitud = (data) =>
    solicitudesApi.crear(data);

export const obtenerSolicitudes = () =>
    solicitudesApi.listar();

export const obtenerSolicitud = (id) =>
    solicitudesApi.obtener(id);

export const actualizarSolicitud = (id, data) =>
    solicitudesApi.actualizar(id, data);

export const eliminarSolicitud = (id) =>
    solicitudesApi.eliminar(id);

export const cambiarEstadoSolicitud = (id, estado) =>
    solicitudesApi.cambiarEstado(id, estado);
export const actualizarEstadoSolicitud = (id, estado) =>
    solicitudesApi.cambiarEstado(id, estado);

// ==========================================
// RECURSOS
// ==========================================

export const obtenerRecursos = () => recursosApi.listar();
export const obtenerRecurso = (id) => recursosApi.obtener(id);
export const crearRecurso = (data) => recursosApi.crear(data);
export const actualizarRecurso = (id, data) =>
    recursosApi.actualizar(id, data);
export const cambiarEstadoRecurso = (id, estado) =>
  recursosApi.cambiarEstado(id, estado);
export const eliminarRecurso = (id) => recursosApi.eliminar(id);


// ==========================================
// NOTIFICACIONES
// ==========================================

export const obtenerNotificaciones = () =>
    notificacionesApi.listar();

export const crearNotificacion = (data) =>
    notificacionesApi.crear(data);

export const marcarNotificacionLeida = (id) =>
    notificacionesApi.marcarLeida(id);


// ==========================================
// EVENTOS
// ==========================================

export const obtenerEventos = () =>
    eventosApi.listar();

export const crearEvento = (data) =>
    eventosApi.crear(data);

export const actualizarEvento = (id, data) =>
    eventosApi.actualizar(id, data);

export const eliminarEvento = (id) =>
    eventosApi.eliminar(id);


