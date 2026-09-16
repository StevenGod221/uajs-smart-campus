import { useEffect, useMemo, useState } from "react";
import { iniciarSesion } from "./services/api";
import {
    LayoutDashboard,
    Building2,
    CalendarDays,
    ClipboardList,
    Bell,
    LogOut,
    Menu,
    X,
    Edit,
    Eye,
    Plus,
    Search,
    MapPin,
    Users,
    CheckCircle2,
    Clock3,
    AlertCircle,
    ArrowRight,
    GraduationCap,
    ChevronRight,
    RefreshCw,
    Save,
    Trash2
} from "lucide-react";

import {
    cambiarEstadoRecurso,
    actualizarRecurso,
    obtenerRecursos,
    crearRecurso,
    eliminarRecurso,
    obtenerReservas,
    crearReserva,
    cambiarEstadoReserva,
    eliminarReserva,
    obtenerNotificaciones,
    marcarNotificacionLeida,
    obtenerEventos,
    obtenerSolicitudes,
    crearSolicitud,
    obtenerSolicitud,
    actualizarSolicitud,
    actualizarEstadoSolicitud,
    eliminarSolicitud,
} from "./services/api";

function App() {
    const [autenticado, setAutenticado] = useState(
        !!localStorage.getItem("token")
    );

    const [pantalla, setPantalla] = useState(
    localStorage.getItem("token")
        ? "app"
        : "principal"
);
    const [pagina, setPagina] = useState("inicio");
    const [menuAbierto, setMenuAbierto] = useState(false);

    const [recursos, setRecursos] = useState([]);
    const [reservas, setReservas] = useState([]);
    const [notificaciones, setNotificaciones] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [solicitudes, setSolicitudes] = useState([]);

    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    const [mostrarRecurso, setMostrarRecurso] = useState(false);
    const [mostrarReserva, setMostrarReserva] = useState(false);

    const usuarioGuardado = localStorage.getItem("usuario");

    const usuario = usuarioGuardado
        ? JSON.parse(usuarioGuardado)
        : null;

    const cargarDatos = async () => {
        setCargando(true);
        setError("");

        try {
            const resultados = await Promise.allSettled([
                obtenerRecursos(),
                obtenerReservas(),
                obtenerNotificaciones(),
                obtenerEventos(),
                obtenerSolicitudes(),
            ]);

            if (resultados[0].status === "fulfilled") {
                setRecursos(resultados[0].value || []);
            }

            if (resultados[1].status === "fulfilled") {
                setReservas(resultados[1].value || []);
            }

            if (resultados[2].status === "fulfilled") {
                setNotificaciones(resultados[2].value || []);
            }

            if (resultados[3].status === "fulfilled") {
                setEventos(resultados[3].value || []);
            }

            if (resultados[4].status === "fulfilled") {
                setSolicitudes(resultados[4].value || []);
            }

        } catch (e) {
            setError(e.message);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        if (autenticado) {
            cargarDatos();
        }
    }, [autenticado]);

    const recursosDisponibles = useMemo(
        () =>
            recursos.filter(
                r =>
                    String(r.estado || "").toUpperCase() === "DISPONIBLE"
            ).length,
        [recursos]
    );

    const reservasPendientes = useMemo(
        () =>
            reservas.filter(
                r =>
                    String(r.estado || "").toUpperCase() === "PENDIENTE"
            ).length,
        [reservas]
    );

    const notificacionesPendientes = useMemo(
        () =>
            notificaciones.filter(
                n =>
                    String(n.estado || "").toUpperCase() !== "LEIDA"
            ).length,
        [notificaciones]
    );

    const navegar = (destino) => {
        setPagina(destino);
        setMenuAbierto(false);
    };

    /*
     * PANTALLA PRINCIPAL
     */
    if (!autenticado && pantalla === "principal") {
        return (
            <PaginaPrincipal
                onIniciarSesion={() => setPantalla("login")}
            />
        );
    }

    /*
     * LOGIN
     */
    if (!autenticado && pantalla === "login") {
        return (
            <Login
                onLogin={() => {
                    setAutenticado(true);
                    setPantalla("app");
                    setPagina("inicio");
                }}
            />
        );
    }

    /*
     * APLICACIÓN
     */
    if (!autenticado) {
        return (
            <PaginaPrincipal
                onIniciarSesion={() => setPantalla("login")}
            />
        );
    }

    return (
        <div className="app">

            <aside className={`sidebar ${menuAbierto ? "open" : ""}`}>

                <div className="brand">

                    <div className="brand-logo">
                        <GraduationCap size={27} />
                    </div>

                    <div>
                        <strong>UAJS</strong>
                        <span>SMART CAMPUS</span>
                    </div>

                </div>


                <div className="menu-title">
                    PRINCIPAL
                </div>

                <nav>

                    <MenuItem
                        icon={<LayoutDashboard size={19} />}
                        text="Inicio"
                        active={pagina === "inicio"}
                        onClick={() => navegar("inicio")}
                    />

                    <MenuItem
                        icon={<Building2 size={19} />}
                        text="Recursos"
                        active={pagina === "recursos"}
                        onClick={() => navegar("recursos")}
                    />

                    <MenuItem
                        icon={<CalendarDays size={19} />}
                        text="Reservas"
                        active={pagina === "reservas"}
                        onClick={() => navegar("reservas")}
                    />

                    <MenuItem
                        icon={<ClipboardList size={19} />}
                        text="Solicitudes"
                        active={pagina === "solicitudes"}
                        onClick={() => navegar("solicitudes")}
                    />

                    <MenuItem
                        icon={<Bell size={19} />}
                        text="Notificaciones"
                        badge={notificacionesPendientes}
                        active={pagina === "notificaciones"}
                        onClick={() => navegar("notificaciones")}
                    />

                    <MenuItem
                        icon={<CalendarDays size={19} />}
                        text="Eventos"
                        active={pagina === "eventos"}
                        onClick={() => navegar("eventos")}
                    />

                </nav>


                <div className="sidebar-bottom">

                    <div className="user-mini">

    <div className="avatar">
        {usuario?.nombre
            ? usuario.nombre.charAt(0).toUpperCase()
            : "U"}
    </div>

    <div>
        <strong>
            {usuario?.nombre || "Usuario"}
        </strong>

        <span>
            {usuario?.rol || "Smart Campus"}
        </span>
    </div>

</div>

                    <button
    className="logout-button"
   onClick={() => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    setAutenticado(false);
    setPantalla("principal");
    setPagina("inicio");
}}
>
    <LogOut size={18} />
    Cerrar sesión
</button>

                </div>

            </aside>


            {menuAbierto && (
                <div
                    className="mobile-overlay"
                    onClick={() => setMenuAbierto(false)}
                />
            )}


            <main className="main">

                <header className="topbar">

                    <button
                        className="mobile-menu"
                        onClick={() => setMenuAbierto(!menuAbierto)}
                    >
                        {menuAbierto
                            ? <X size={23} />
                            : <Menu size={23} />
                        }
                    </button>

                    <div className="breadcrumb">
                        <span>Smart Campus</span>
                        <ChevronRight size={15} />
                        <strong>
                            {tituloPagina(pagina)}
                        </strong>
                    </div>


                    <div className="top-actions">

                        <button
                            className="refresh-button"
                            onClick={cargarDatos}
                            title="Actualizar información"
                        >
                            <RefreshCw
                                size={18}
                                className={cargando ? "spin" : ""}
                            />
                        </button>

                        <button
                            className="notification-button"
                            onClick={() => navegar("notificaciones")}
                        >
                            <Bell size={19} />

                            {notificacionesPendientes > 0 && (
                                <span className="notification-dot">
                                    {notificacionesPendientes}
                                </span>
                            )}
                        </button>

                        <div className="top-avatar">
    {usuario?.nombre
        ? usuario.nombre.charAt(0).toUpperCase()
        : "U"}
</div>

                    </div>

                </header>


                {error && (
                    <div className="error-banner">
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}


                <div className="content">

                    {pagina === "inicio" && (
                        <Dashboard
    recursos={recursos}
    reservas={reservas}
    eventos={eventos}
    solicitudes={solicitudes}
    recursosDisponibles={recursosDisponibles}
    reservasPendientes={reservasPendientes}
    notificacionesPendientes={notificacionesPendientes}
    navegar={navegar}
    abrirRecurso={() => setMostrarRecurso(true)}
/>
                    )}


                    {pagina === "recursos" && (
                        <RecursosPage
                            recursos={recursos}
                            abrirCrear={() => setMostrarRecurso(true)}
                            recargar={cargarDatos}
                        />
                    )}


                    {pagina === "reservas" && (
                        <ReservasPage
                            reservas={reservas}
                            recursos={recursos}
                            abrirCrear={() => setMostrarReserva(true)}
                            recargar={cargarDatos}
                        />
                    )}


                    {pagina === "solicitudes" && (
    <SolicitudesPage
        solicitudes={solicitudes}
        recargar={cargarDatos}
    />
)}


                    {pagina === "notificaciones" && (
                        <NotificacionesPage
                            notificaciones={notificaciones}
                            recargar={cargarDatos}
                        />
                    )}


                    {pagina === "eventos" && (
    <SimplePage
        titulo="Eventos"
        descripcion="Consulta las actividades y eventos programados dentro del campus."
        eyebrow="ACTIVIDADES UNIVERSITARIAS"
        icon={<CalendarDays size={27} />}
        datos={eventos}
        recargar={cargarDatos}
        boton="Actualizar eventos"
    />
)}

                </div>

            </main>


            {mostrarRecurso && (
                <Modal
                    titulo="Registrar recurso"
                    cerrar={() => setMostrarRecurso(false)}
                >
                    <RecursoForm
                        cerrar={() => setMostrarRecurso(false)}
                        terminado={cargarDatos}
                    />
                </Modal>
            )}


            {mostrarReserva && (
                <Modal
                    titulo="Nueva reserva"
                    cerrar={() => setMostrarReserva(false)}
                >
                    <ReservaForm
                        recursos={recursos}
                        cerrar={() => setMostrarReserva(false)}
                        terminado={cargarDatos}
                    />
                </Modal>
            )}

        </div>
    );
}


/* =====================================================
   DASHBOARD
===================================================== */

function Dashboard({
    recursos,
    reservas,
    eventos,
    solicitudes,
    recursosDisponibles,
    reservasPendientes,
    notificacionesPendientes,
    navegar,
    abrirRecurso,
}) {

    return (
        <>

            <section className="hero">

                <div className="hero-content">

                    <div className="hero-tag">
                        <span></span>
                        PLATAFORMA ACADÉMICA
                    </div>

                    <h1>
                        Tu campus,
                        <br />
                        <em>más inteligente.</em>
                    </h1>

                    <p>
                        Gestiona recursos, reservas, solicitudes y
                        actividades universitarias desde un solo lugar.
                    </p>

                    <button
                        className="hero-button"
                        onClick={() => navegar("recursos")}
                    >
                        Explorar recursos
                        <ArrowRight size={18} />
                    </button>

                </div>

                <div className="hero-decoration">

                    <div className="hero-circle circle-one"></div>
                    <div className="hero-circle circle-two"></div>

                    <GraduationCap size={120} strokeWidth={1} />

                </div>

            </section>


            <section className="welcome-row">

                <div>
                    <p className="eyebrow">
                        PANEL PRINCIPAL
                    </p>

                    <h2>
                        Bienvenido a Smart Campus
                    </h2>

                    <p className="subtitle">
                        Todo lo que necesitas para gestionar tu vida
                        universitaria.
                    </p>
                </div>

                <div className="date-card">
                    <CalendarDays size={20} />
                    <div>
                        <strong>
                            {new Date().toLocaleDateString(
                                "es-CO",
                                {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                }
                            )}
                        </strong>
                        <span>Campus Universitario</span>
                    </div>
                </div>

            </section>


            <section className="stats-grid">

                <StatCard
                    icon={<Building2 />}
                    title="Recursos"
                    value={recursos.length}
                    detail={`${recursosDisponibles} disponibles`}
                    type="blue"
                    onClick={() => navegar("recursos")}
                />

                <StatCard
                    icon={<CalendarDays />}
                    title="Reservas"
                    value={reservas.length}
                    detail={`${reservasPendientes} pendientes`}
                    type="purple"
                    onClick={() => navegar("reservas")}
                />

                <StatCard
    icon={<ClipboardList />}
    title="Solicitudes"
    value={solicitudes?.length || 0}
    detail="registradas en el sistema"
    type="orange"
    onClick={() => navegar("solicitudes")}
/>

                <StatCard
                    icon={<Bell />}
                    title="Notificaciones"
                    value={notificacionesPendientes}
                    detail="pendientes de revisar"
                    type="green"
                    onClick={() => navegar("notificaciones")}
                />

            </section>


            <section className="dashboard-grid">

                <div className="panel panel-large">

                    <div className="panel-header">

                        <div>
                            <p className="eyebrow">
                                INFRAESTRUCTURA
                            </p>

                            <h3>
                                Recursos destacados
                            </h3>
                        </div>

                        <button
                            className="text-button"
                            onClick={() => navegar("recursos")}
                        >
                            Ver todos
                            <ArrowRight size={16} />
                        </button>

                    </div>


                    <div className="resource-preview">

                        {recursos.slice(0, 3).map((recurso) => (
                            <ResourceMini
                                key={recurso.id}
                                recurso={recurso}
                            />
                        ))}

                        {recursos.length === 0 && (
                            <EmptyState
                                texto="No hay recursos registrados"
                                boton="Registrar recurso"
                                onClick={abrirRecurso}
                            />
                        )}

                    </div>

                </div>


                <div className="panel">

                    <div className="panel-header">

                        <div>
                            <p className="eyebrow">
                                PRÓXIMAMENTE
                            </p>

                            <h3>
                                Eventos
                            </h3>
                        </div>

                        <button
                            className="icon-link"
                            onClick={() => navegar("eventos")}
                        >
                            <ArrowRight size={17} />
                        </button>

                    </div>


                    <div className="event-list">

                        {eventos.slice(0, 3).map((evento, index) => (

                            <div className="event-item" key={evento.id || index}>

                                <div className="event-date">
                                    <strong>
                                        {index + 1}
                                    </strong>
                                </div>

                                <div>
                                    <strong>
                                        {evento.nombre ||
                                            evento.titulo ||
                                            evento.descripcion ||
                                            "Evento universitario"}
                                    </strong>

                                    <span>
                                        Actividad académica
                                    </span>
                                </div>

                            </div>

                        ))}

                        {eventos.length === 0 && (
                            <div className="empty-small">
                                No hay eventos registrados todavía.
                            </div>
                        )}

                    </div>

                </div>

            </section>

        </>
    );
}
function SolicitudesPage({ solicitudes, recargar }) {
    const [busqueda, setBusqueda] = useState("");
    const [mostrarForm, setMostrarForm] = useState(false);
    const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);

    const filtradas = solicitudes.filter((s) => {
        const texto = busqueda.toLowerCase();

        return (
            String(s.id ?? "").toLowerCase().includes(texto) ||
            String(s.tipo ?? s.tipoSolicitud ?? "").toLowerCase().includes(texto) ||
            String(s.descripcion ?? "").toLowerCase().includes(texto) ||
            String(s.estado ?? "").toLowerCase().includes(texto)
        );
    });

    return (
        <>
            <PageHeader
                eyebrow="GESTIÓN ACADÉMICA"
                titulo="Solicitudes"
                descripcion="Registra, consulta y realiza seguimiento a tus solicitudes universitarias."
                icon={<ClipboardList size={27} />}
                boton="Nueva solicitud"
                onClick={() => setMostrarForm(true)}
            />

            <section className="content-card">

                <div className="table-toolbar">

                    <div className="search-box">
                        <Search size={18} />

                        <input
                            type="text"
                            placeholder="Buscar solicitud..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>

                    <button
                        className="secondary-button"
                        onClick={recargar}
                    >
                        <RefreshCw size={17} />
                        Actualizar
                    </button>

                </div>

                {filtradas.length === 0 ? (
                    <div className="empty-state">
                        <ClipboardList size={42} />

                        <h3>No hay solicitudes</h3>

                        <p>
                            Todavía no existen solicitudes registradas.
                        </p>

                        <button
                            className="primary-button"
                            onClick={() => setMostrarForm(true)}
                        >
                            <Plus size={18} />
                            Crear solicitud
                        </button>
                    </div>
                ) : (

                    <div className="table-container">

                        <table className="data-table">

                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tipo</th>
                                    <th>Descripción</th>
                                    <th>Prioridad</th>
                                    <th>Estado</th>
                                    <th>Fecha</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>

                                {filtradas.map((solicitud) => (

                                    <tr key={solicitud.id}>

                                        <td>
                                            <strong>
                                                #{solicitud.id}
                                            </strong>
                                        </td>

                                        <td>
                                            {solicitud.tipo ??
                                                solicitud.tipoSolicitud ??
                                                "Solicitud"}
                                        </td>

                                        <td>
                                            <span className="table-description">
                                                {solicitud.descripcion ??
                                                    "Sin descripción"}
                                            </span>
                                        </td>

                                        <td>
                                            <span
                                                className={`priority-badge ${String(
                                                    solicitud.prioridad ?? ""
                                                ).toLowerCase()}`}
                                            >
                                                {solicitud.prioridad ??
                                                    "NORMAL"}
                                            </span>
                                        </td>

                                        <td>
                                            <EstadoSolicitud
                                                estado={solicitud.estado}
                                            />
                                        </td>

                                        <td>
                                            {formatearFecha(
                                                solicitud.fecha ??
                                                    solicitud.fechaCreacion ??
                                                    solicitud.createdAt
                                            )}
                                        </td>

                                        <td>

                                            <div className="table-actions">

                                                <button
                                                    className="icon-button"
                                                    title="Ver detalle"
                                                    onClick={() =>
                                                        setSolicitudSeleccionada(
                                                            solicitud
                                                        )
                                                    }
                                                >
                                                    <Eye size={17} />
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </section>

            {mostrarForm && (
                <Modal
                    titulo="Nueva solicitud"
                    cerrar={() => setMostrarForm(false)}
                >
                    <SolicitudForm
                        cerrar={() => setMostrarForm(false)}
                        terminado={recargar}
                    />
                </Modal>
            )}

            {solicitudSeleccionada && (
                <Modal
                    titulo={`Solicitud #${solicitudSeleccionada.id}`}
                    cerrar={() => setSolicitudSeleccionada(null)}
                >
                    <SolicitudDetalle
                        solicitud={solicitudSeleccionada}
                        cerrar={() => setSolicitudSeleccionada(null)}
                        recargar={recargar}
                    />
                </Modal>
            )}

        </>
    );
}
function EstadoSolicitud({ estado }) {

    const valor = String(estado ?? "REGISTRADA").toUpperCase();

    const clases = {
        "REGISTRADA": "registrada",
        "EN REVISIÓN": "revision",
        "EN_REVISION": "revision",
        "ASIGNADA": "asignada",
        "EN PROCESO": "proceso",
        "EN_PROCESO": "proceso",
        "RESUELTA": "resuelta",
        "CERRADA": "cerrada",
    };

    return (
        <span className={`status-badge ${clases[valor] ?? ""}`}>
            <span className="status-dot"></span>
            {valor.replaceAll("_", " ")}
        </span>
    );
}

/* =====================================================
   RECURSOS
===================================================== */

function RecursosPage({
    recursos,
    abrirCrear,
    recargar,
}) {

    const [busqueda, setBusqueda] = useState("");
    const [recursoSeleccionado, setRecursoSeleccionado] = useState(null);
    const [modo, setModo] = useState(null);

    const filtrados = recursos.filter((r) => {

        const texto =
            `${r.nombre || ""} ${r.tipo || ""} ${r.ubicacion || ""}`
                .toLowerCase();

        return texto.includes(busqueda.toLowerCase());

    });

    const verDetalle = (recurso) => {
        setRecursoSeleccionado(recurso);
        setModo("detalle");
    };

    const editarRecurso = (recurso) => {
        setRecursoSeleccionado(recurso);
        setModo("editar");
    };

    const cerrarModal = () => {
        setRecursoSeleccionado(null);
        setModo(null);
    };

    return (
        <>

            <PageHeader
                eyebrow="INFRAESTRUCTURA"
                titulo="Recursos del campus"
                descripcion="Consulta y administra los espacios y recursos disponibles."
                boton="Nuevo recurso"
                icon={<Plus size={18} />}
                onClick={abrirCrear}
            />

            <div className="toolbar">

                <div className="search-box">

                    <Search size={18} />

                    <input
                        placeholder="Buscar por nombre, tipo o ubicación..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />

                </div>

                <button
                    className="secondary-button"
                    onClick={recargar}
                >
                    <RefreshCw size={17} />
                    Actualizar
                </button>

            </div>

            <div className="resource-grid">

                {filtrados.map((recurso) => (
                    <ResourceCard
                        key={recurso.id}
                        recurso={recurso}
                        onVer={() => verDetalle(recurso)}
                        onEditar={() => editarRecurso(recurso)}
                        recargar={recargar}
                    />
                ))}

                {filtrados.length === 0 && (
                    <div className="empty-card">
                        <Building2 size={35} />
                        <h3>No encontramos recursos</h3>
                        <p>
                            Prueba con otro término de búsqueda.
                        </p>
                    </div>
                )}

            </div>

            {modo === "detalle" && recursoSeleccionado && (
                <RecursoDetalle
                    recurso={recursoSeleccionado}
                    cerrar={cerrarModal}
                />
            )}

            {modo === "editar" && recursoSeleccionado && (
    <div className="modal-overlay">

        <div className="modal-card">

            <div className="modal-header">

                <div>
                    <span className="eyebrow">
                        INFRAESTRUCTURA
                    </span>

                    <h2>
                        Editar recurso
                    </h2>
                </div>

                <button
                    className="icon-button"
                    onClick={cerrarModal}
                    type="button"
                >
                    <X size={20} />
                </button>

            </div>

            <RecursoForm
                recursoEditar={recursoSeleccionado}
                cerrar={cerrarModal}
                terminado={recargar}
            />

        </div>

    </div>
)}

        </>
    );
}


/* =====================================================
   RESERVAS
===================================================== */

function ReservasPage({
    reservas,
    recursos,
    abrirCrear,
    recargar,
}) {
    const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
    const [mostrarDetalle, setMostrarDetalle] = useState(false);
    const [mostrarEstado, setMostrarEstado] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [estadoSeleccionado, setEstadoSeleccionado] = useState("");
    const [procesando, setProcesando] = useState(false);

    const cerrarModales = () => {
        setReservaSeleccionada(null);
        setMostrarDetalle(false);
        setMostrarEstado(false);
        setEstadoSeleccionado("");
        setProcesando(false);
    };

    const obtenerRecurso = (recursoId) =>
        recursos.find((r) => Number(r.id) === Number(recursoId));

    const reservasFiltradas = reservas.filter((reserva) => {
        const recurso = obtenerRecurso(reserva.recursoId);

        const texto = `
            ${reserva.id || ""}
            ${reserva.usuarioId || ""}
            ${reserva.recursoId || ""}
            ${recurso?.nombre || ""}
            ${recurso?.tipo || ""}
            ${recurso?.ubicacion || ""}
            ${reserva.estado || ""}
            ${reserva.observaciones || ""}
            ${reserva.fechaInicio || ""}
            ${reserva.fechaFin || ""}
        `.toLowerCase();

        return texto.includes(busqueda.toLowerCase());
    });

    const abrirDetalle = (reserva) => {
        setReservaSeleccionada(reserva);
        setMostrarDetalle(true);
    };

    const abrirCambioEstado = (reserva) => {
        setReservaSeleccionada(reserva);
        setEstadoSeleccionado(
            String(reserva.estado || "PENDIENTE").toUpperCase()
        );
        setMostrarEstado(true);
    };

    const actualizarEstado = async () => {
        if (!reservaSeleccionada || !estadoSeleccionado) return;

        setProcesando(true);

        try {
            await cambiarEstadoReserva(
                reservaSeleccionada.id,
                estadoSeleccionado
            );

            await recargar();
            cerrarModales();
        } catch (error) {
            console.error("Error cambiando estado de reserva:", error);
            alert(
                error.message ||
                "No fue posible actualizar el estado de la reserva."
            );
        } finally {
            setProcesando(false);
        }
    };

    const eliminar = async (reserva) => {
        const confirmar = window.confirm(
            `¿Seguro que deseas eliminar la reserva #${reserva.id}?`
        );

        if (!confirmar) return;

        setProcesando(true);

        try {
            await eliminarReserva(reserva.id);
            await recargar();
        } catch (error) {
            console.error("Error eliminando reserva:", error);
            alert(
                error.message ||
                "No fue posible eliminar la reserva."
            );
        } finally {
            setProcesando(false);
        }
    };

    return (
        <>
            <PageHeader
                eyebrow="GESTIÓN ACADÉMICA"
                titulo="Reservas"
                descripcion="Consulta, administra y controla las reservas de los recursos del campus."
                boton="Nueva reserva"
                icon={<Plus size={18} />}
                onClick={abrirCrear}
            />

            <div className="toolbar">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Buscar por usuario, recurso, estado..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>

                <button
                    className="secondary-button"
                    onClick={recargar}
                    disabled={procesando}
                >
                    <RefreshCw size={17} />
                    Actualizar
                </button>
            </div>

            <div className="panel table-panel">
                <div className="panel-header">
                    <div>
                        <p className="eyebrow">
                            REGISTRO
                        </p>

                        <h3>
                            Reservas registradas
                        </h3>

                        <p className="subtitle">
                            {reservasFiltradas.length}{" "}
                            {reservasFiltradas.length === 1
                                ? "reserva encontrada"
                                : "reservas encontradas"}
                        </p>
                    </div>
                </div>

                <div className="table-wrapper">
                    {reservasFiltradas.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Usuario</th>
                                    <th>Recurso</th>
                                    <th>Inicio</th>
                                    <th>Fin</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {reservasFiltradas.map((reserva) => {
                                    const recurso = obtenerRecurso(
                                        reserva.recursoId
                                    );

                                    return (
                                        <tr key={reserva.id}>
                                            <td>
                                                <strong>
                                                    #{reserva.id}
                                                </strong>
                                            </td>

                                            <td>
                                                Usuario #{reserva.usuarioId}
                                            </td>

                                            <td>
                                                <strong>
                                                    {recurso?.nombre ||
                                                        `Recurso #${reserva.recursoId}`}
                                                </strong>

                                                {recurso?.ubicacion && (
                                                    <small
                                                        style={{
                                                            display: "block",
                                                            marginTop: "4px",
                                                            opacity: 0.7,
                                                        }}
                                                    >
                                                        {recurso.ubicacion}
                                                    </small>
                                                )}
                                            </td>

                                            <td>
                                                {formatearFecha(
                                                    reserva.fechaInicio
                                                )}
                                            </td>

                                            <td>
                                                {formatearFecha(
                                                    reserva.fechaFin
                                                )}
                                            </td>

                                            <td>
                                                <EstadoBadge
                                                    estado={reserva.estado}
                                                />
                                            </td>

                                            <td>
                                                <div className="table-actions">
                                                    <button
                                                        className="icon-button"
                                                        title="Ver detalle"
                                                        onClick={() =>
                                                            abrirDetalle(reserva)
                                                        }
                                                    >
                                                        <Eye size={17} />
                                                    </button>

                                                    <button
                                                        className="icon-button"
                                                        title="Cambiar estado"
                                                        onClick={() =>
                                                            abrirCambioEstado(
                                                                reserva
                                                            )
                                                        }
                                                    >
                                                        <RefreshCw size={17} />
                                                    </button>

                                                    <button
                                                        className="icon-button"
                                                        title="Eliminar reserva"
                                                        onClick={() =>
                                                            eliminar(reserva)
                                                        }
                                                        disabled={procesando}
                                                    >
                                                        <Trash2 size={17} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <div className="empty-table">
                            <CalendarDays size={34} />

                            <h3>
                                {busqueda
                                    ? "No encontramos reservas"
                                    : "No hay reservas"}
                            </h3>

                            <p>
                                {busqueda
                                    ? "Prueba con otro término de búsqueda."
                                    : "Las reservas creadas aparecerán aquí."}
                            </p>

                            {!busqueda && (
                                <button
                                    className="primary-button"
                                    onClick={abrirCrear}
                                >
                                    <Plus size={17} />
                                    Crear reserva
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {mostrarDetalle && reservaSeleccionada && (
                <ReservaDetalle
                    reserva={reservaSeleccionada}
                    recurso={obtenerRecurso(
                        reservaSeleccionada.recursoId
                    )}
                    cerrar={cerrarModales}
                    abrirEstado={() => {
                        setMostrarDetalle(false);
                        abrirCambioEstado(reservaSeleccionada);
                    }}
                />
            )}

            {mostrarEstado && reservaSeleccionada && (
                <Modal
                    titulo={`Cambiar estado · Reserva #${reservaSeleccionada.id}`}
                    cerrar={cerrarModales}
                >
                    <div className="form-group">
                        <label>
                            Estado de la reserva
                        </label>

                        <select
                            value={estadoSeleccionado}
                            onChange={(e) =>
                                setEstadoSeleccionado(e.target.value)
                            }
                        >
                            <option value="PENDIENTE">
                                Pendiente
                            </option>

                            <option value="APROBADA">
                                Aprobada
                            </option>

                            <option value="RECHAZADA">
                                Rechazada
                            </option>

                            <option value="CANCELADA">
                                Cancelada
                            </option>

                            <option value="FINALIZADA">
                                Finalizada
                            </option>
                        </select>
                    </div>

                    <div
                        style={{
                            padding: "14px 16px",
                            borderRadius: "12px",
                            background: "#f5f7fb",
                            marginTop: "14px",
                            marginBottom: "20px",
                        }}
                    >
                        <strong>
                            Estado actual:{" "}
                        </strong>
                        {reservaSeleccionada.estado || "PENDIENTE"}
                    </div>

                    <div className="modal-actions">
                        <button
                            type="button"
                            className="secondary-button"
                            onClick={cerrarModales}
                            disabled={procesando}
                        >
                            Cancelar
                        </button>

                        <button
                            type="button"
                            className="primary-button"
                            onClick={actualizarEstado}
                            disabled={procesando}
                        >
                            {procesando
                                ? "Actualizando..."
                                : "Guardar estado"}
                        </button>
                    </div>
                </Modal>
            )}
        </>
    );
}


function ReservaDetalle({
    reserva,
    recurso,
    cerrar,
    abrirEstado,
}) {
    const estado = String(
        reserva.estado || "PENDIENTE"
    ).toUpperCase();

    return (
        <div
            className="modal-overlay"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) {
                    cerrar();
                }
            }}
        >
            <div className="modal-card">
                <div className="modal-header">
                    <div>
                        <span className="eyebrow">
                            RESERVA #{reserva.id}
                        </span>

                        <h2>
                            Detalle de reserva
                        </h2>
                    </div>

                    <button
                        className="icon-button"
                        type="button"
                        onClick={cerrar}
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="detail-content">
                    <div className="detail-item">
                        <span>Estado</span>
                        <div style={{ marginTop: "7px" }}>
                            <EstadoBadge estado={estado} />
                        </div>
                    </div>

                    <div className="detail-item">
                        <span>Usuario</span>
                        <strong>
                            Usuario #{reserva.usuarioId}
                        </strong>
                    </div>

                    <div className="detail-item">
                        <span>Recurso</span>
                        <strong>
                            {recurso?.nombre ||
                                `Recurso #${reserva.recursoId}`}
                        </strong>
                    </div>

                    <div className="detail-item">
                        <span>Ubicación</span>
                        <strong>
                            {recurso?.ubicacion ||
                                "No especificada"}
                        </strong>
                    </div>

                    <div className="detail-item">
                        <span>Fecha y hora de inicio</span>
                        <strong>
                            {formatearFecha(reserva.fechaInicio)}
                        </strong>
                    </div>

                    <div className="detail-item">
                        <span>Fecha y hora de finalización</span>
                        <strong>
                            {formatearFecha(reserva.fechaFin)}
                        </strong>
                    </div>

                    <div className="detail-item">
                        <span>Observaciones</span>
                        <p>
                            {reserva.observaciones ||
                                "Sin observaciones"}
                        </p>
                    </div>
                </div>

                <div className="modal-actions">
                    <button
                        type="button"
                        className="secondary-button"
                        onClick={cerrar}
                    >
                        Cerrar
                    </button>

                    <button
                        type="button"
                        className="primary-button"
                        onClick={abrirEstado}
                    >
                        <RefreshCw size={17} />
                        Cambiar estado
                    </button>
                </div>
            </div>
        </div>
    );
}


/* =====================================================
   NOTIFICACIONES
===================================================== */

function NotificacionesPage({
    notificaciones,
    recargar,
}) {

    const marcarLeida = async (id) => {

        try {

            await marcarNotificacionLeida(id);

            await recargar();

        } catch (e) {

            console.error(e);

        }

    };


    return (
        <>

            <PageHeader
                eyebrow="COMUNICACIONES"
                titulo="Notificaciones"
                descripcion="Mantente informado sobre la actividad del campus."
                boton="Actualizar"
                icon={<RefreshCw size={18} />}
                onClick={recargar}
            />


            <div className="notification-list">

                {notificaciones.map((n) => {

                    const leida =
                        String(n.estado || "").toUpperCase() === "LEIDA";

                    return (
                        <div
                            className={`notification-card ${
                                leida ? "read" : ""
                            }`}
                            key={n.id}
                        >

                            <div className="notification-icon">
                                <Bell size={19} />
                            </div>

                            <div className="notification-body">

                                <div className="notification-title">
                                    <strong>
                                        {n.titulo}
                                    </strong>

                                    {!leida && (
                                        <span className="new-label">
                                            NUEVA
                                        </span>
                                    )}
                                </div>

                                <p>
                                    {n.mensaje}
                                </p>

                                <small>
                                    {n.tipo}
                                    {" · "}
                                    {formatearFecha(n.fechaCreacion)}
                                </small>

                            </div>

                            {!leida && (
                                <button
                                    className="read-button"
                                    onClick={() =>
                                        marcarLeida(n.id)
                                    }
                                >
                                    Marcar como leída
                                </button>
                            )}

                        </div>
                    );

                })}

                {notificaciones.length === 0 && (
                    <EmptyState
                        texto="No tienes notificaciones"
                    />
                )}

            </div>

        </>
    );
}
/* =====================================================
   FORMULARIO solicitudes
===================================================== */
function SolicitudForm({ cerrar, terminado }) {

    const [form, setForm] = useState({
        usuarioId: 1,
        servicioId: 1,
        tipo: "",
        dependencia: "",
        fecha: "",
        descripcion: "",
        prioridad: "NORMAL",
        responsable: "",
    });

    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState("");

    const cambiar = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const enviar = async (e) => {

        e.preventDefault();

        setError("");
        setGuardando(true);

        try {

            const datosSolicitud = {
                usuarioId: form.usuarioId,
                servicioId: form.servicioId,
                tipo: form.tipo,
                dependencia: form.dependencia,
                descripcion: form.descripcion,
                prioridad: form.prioridad,
            };

            console.log("Enviando solicitud:", datosSolicitud);

            await crearSolicitud(datosSolicitud);

            await terminado();

            cerrar();

        } catch (err) {

            console.error("Error creando solicitud:", err);

            setError(
                err.message || "No fue posible crear la solicitud."
            );

        } finally {

            setGuardando(false);

        }
    };
    return (
        <form className="form-grid" onSubmit={enviar}>

            {error && (
                <div className="form-error">
                    <AlertCircle size={17} />
                    {error}
                </div>
            )}

            <div className="form-group">

                <label>Tipo de solicitud</label>

                <select
                    name="tipo"
                    value={form.tipo}
                    onChange={cambiar}
                    required
                >
                    <option value="">
                        Seleccionar tipo
                    </option>

                    <option value="MANTENIMIENTO">
                        Mantenimiento
                    </option>

                    <option value="ACADEMICA">
                        Académica
                    </option>

                    <option value="TECNOLOGICA">
                        Tecnológica
                    </option>

                    <option value="ADMINISTRATIVA">
                        Administrativa
                    </option>

                    <option value="OTRA">
                        Otra
                    </option>

                </select>

            </div>

            <div className="form-group">

                <label>Dependencia</label>

                <input
                    name="dependencia"
                    value={form.dependencia}
                    onChange={cambiar}
                    placeholder="Ej. Sistemas"
                    required
                />

            </div>

            <div className="form-group">

                <label>Fecha</label>

                <input
                    type="date"
                    name="fecha"
                    value={form.fecha}
                    onChange={cambiar}
                    required
                />

            </div>

            <div className="form-group">

                <label>Prioridad</label>

                <select
                    name="prioridad"
                    value={form.prioridad}
                    onChange={cambiar}
                >
                    <option value="BAJA">Baja</option>
                    <option value="NORMAL">Normal</option>
                    <option value="ALTA">Alta</option>
                    <option value="URGENTE">Urgente</option>
                </select>

            </div>

            <div className="form-group form-group-full">

                <label>Descripción</label>

                <textarea
                    name="descripcion"
                    value={form.descripcion}
                    onChange={cambiar}
                    rows="5"
                    placeholder="Describe detalladamente tu solicitud..."
                    required
                />

            </div>

            <div className="form-group">

                <label>Responsable</label>

                <input
                    name="responsable"
                    value={form.responsable}
                    onChange={cambiar}
                    placeholder="Responsable asignado"
                />

            </div>

            <div className="form-actions">

                <button
                    type="button"
                    className="secondary-button"
                    onClick={cerrar}
                >
                    Cancelar
                </button>

                <button
                    type="submit"
                    className="primary-button"
                    disabled={guardando}
                >
                    {guardando ? (
                        <>
                            <RefreshCw
                                size={17}
                                className="spin"
                            />
                            Guardando...
                        </>
                    ) : (
                        <>
                            <Save size={17} />
                            Registrar solicitud
                        </>
                    )}
                </button>

            </div>

        </form>
    );
}
function SolicitudDetalle({
    solicitud,
    cerrar,
    recargar,
}) {

    const [cambiando, setCambiando] = useState(false);
    const [estado, setEstado] = useState(
        solicitud.estado ?? "REGISTRADA"
    );

    const cambiarEstado = async () => {

        setCambiando(true);

        try {

            await actualizarEstadoSolicitud(
                solicitud.id,
                estado
            );

            await recargar();

            cerrar();

        } catch (err) {

            alert(
                err.message ||
                "No fue posible actualizar el estado."
            );

        } finally {

            setCambiando(false);

        }
    };

    return (
        <div className="solicitud-detail">

            <div className="detail-header">

                <div>
                    <span className="eyebrow">
                        SOLICITUD
                    </span>

                    <h2>
                        #{solicitud.id}
                    </h2>
                </div>

                <EstadoSolicitud
                    estado={solicitud.estado}
                />

            </div>

            <div className="detail-grid">

                <div>
                    <span>Tipo</span>
                    <strong>
                        {solicitud.tipo ??
                            solicitud.tipoSolicitud ??
                            "No especificado"}
                    </strong>
                </div>

                <div>
                    <span>Prioridad</span>
                    <strong>
                        {solicitud.prioridad ??
                            "NORMAL"}
                    </strong>
                </div>

                <div>
                    <span>Dependencia</span>
                    <strong>
                        {solicitud.dependencia ??
                            "No especificada"}
                    </strong>
                </div>

                <div>
                    <span>Responsable</span>
                    <strong>
                        {solicitud.responsable ??
                            "Sin asignar"}
                    </strong>
                </div>

            </div>

            <div className="detail-description">

                <span>Descripción</span>

                <p>
                    {solicitud.descripcion ??
                        "Sin descripción"}
                </p>

            </div>

            <div className="tracking">

                <h3>Seguimiento</h3>

                <div className="tracking-line">

                    {[
                        "REGISTRADA",
                        "EN REVISIÓN",
                        "ASIGNADA",
                        "EN PROCESO",
                        "RESUELTA",
                        "CERRADA",
                    ].map((item) => (

                        <div
                            key={item}
                            className={
                                `tracking-step ${
                                    item === solicitud.estado
                                        ? "active"
                                        : ""
                                }`
                            }
                        >

                            <span></span>

                            <small>
                                {item}
                            </small>

                        </div>

                    ))}

                </div>

            </div>

            <div className="form-group">

                <label>
                    Actualizar estado
                </label>

                <select
                    value={estado}
                    onChange={(e) =>
                        setEstado(e.target.value)
                    }
                >

                    <option value="REGISTRADA">
                        Registrada
                    </option>

                    <option value="EN REVISIÓN">
                        En revisión
                    </option>

                    <option value="ASIGNADA">
                        Asignada
                    </option>

                    <option value="EN PROCESO">
                        En proceso
                    </option>

                    <option value="RESUELTA">
                        Resuelta
                    </option>

                    <option value="CERRADA">
                        Cerrada
                    </option>

                </select>

            </div>

            <div className="form-actions">

                <button
                    className="secondary-button"
                    onClick={cerrar}
                >
                    Cerrar
                </button>

                <button
                    className="primary-button"
                    onClick={cambiarEstado}
                    disabled={cambiando}
                >
                    {cambiando
                        ? "Actualizando..."
                        : "Actualizar estado"}
                </button>

            </div>

        </div>
    );
}
/* =====================================================
   FORMULARIO RECURSO
===================================================== */

function RecursoForm({
    cerrar,
    terminado,
    recursoEditar = null,
}) {

    const [form, setForm] = useState({
        nombre: recursoEditar?.nombre || "",
        tipo: recursoEditar?.tipo || "",
        descripcion: recursoEditar?.descripcion || "",
        ubicacion: recursoEditar?.ubicacion || "",
    });

    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState("");

    const cambiar = (campo, valor) => {

        setForm({
            ...form,
            [campo]: valor,
        });

    };

    const enviar = async (e) => {

        e.preventDefault();

        setGuardando(true);
        setError("");

        try {

            if (recursoEditar) {

                await actualizarRecurso(
                    recursoEditar.id,
                    form
                );

            } else {

                await crearRecurso(form);

            }

            await terminado();

            cerrar();

        } catch (e) {

            console.error("Error guardando recurso:", e);

            setError(
                e.message || "No fue posible guardar el recurso."
            );

        } finally {

            setGuardando(false);

        }

    };

    return (
        <form onSubmit={enviar}>

            {error && (
                <div className="form-error">
                    <AlertCircle size={17} />
                    {error}
                </div>
            )}

            <div className="form-group">

                <label>
                    Nombre
                </label>

                <input
                    required
                    value={form.nombre}
                    onChange={(e) =>
                        cambiar("nombre", e.target.value)
                    }
                    placeholder="Ej. Laboratorio de Sistemas"
                />

            </div>

            <div className="form-group">

                <label>
                    Tipo
                </label>

                <select
                    required
                    value={form.tipo}
                    onChange={(e) =>
                        cambiar("tipo", e.target.value)
                    }
                >

                    <option value="">
                        Seleccionar tipo
                    </option>

                    <option value="LABORATORIO">
                        Laboratorio
                    </option>

                    <option value="AULA">
                        Aula
                    </option>

                    <option value="AUDITORIO">
                        Auditorio
                    </option>

                    <option value="SALA">
                        Sala
                    </option>

                    <option value="CANCHA">
                        Cancha
                    </option>

                    <option value="OTRO">
                        Otro
                    </option>

                </select>

            </div>

            <div className="form-group">

                <label>
                    Ubicación
                </label>

                <input
                    value={form.ubicacion}
                    onChange={(e) =>
                        cambiar("ubicacion", e.target.value)
                    }
                    placeholder="Ej. Bloque A - Piso 3"
                />

            </div>

            <div className="form-group">

                <label>
                    Descripción
                </label>

                <textarea
                    value={form.descripcion}
                    onChange={(e) =>
                        cambiar("descripcion", e.target.value)
                    }
                    placeholder="Describe el recurso..."
                    rows="4"
                />

            </div>

            <div className="modal-actions">

                <button
                    type="button"
                    className="secondary-button"
                    onClick={cerrar}
                >
                    Cancelar
                </button>

                <button
                    className="primary-button"
                    disabled={guardando}
                >
                    {guardando
                        ? "Guardando..."
                        : recursoEditar
                            ? "Guardar cambios"
                            : "Registrar recurso"}
                </button>

            </div>

        </form>
    );
}
function RecursoDetalle({
    recurso,
    cerrar,
}) {

    return (
        <div className="modal-overlay">

            <div className="modal-card">

                <div className="modal-header">

                    <div>
                        <span className="eyebrow">
                            RECURSO #{recurso.id}
                        </span>

                        <h2>
                            {recurso.nombre}
                        </h2>
                    </div>

                    <button
                        className="icon-button"
                        onClick={cerrar}
                        type="button"
                    >
                        <X size={20} />
                    </button>

                </div>

                <div className="detail-content">

                    <div className="detail-item">
                        <span>Tipo</span>
                        <strong>
                            {recurso.tipo || "No especificado"}
                        </strong>
                    </div>

                    <div className="detail-item">
                        <span>Estado</span>
                        <strong>
                            {recurso.estado || "No especificado"}
                        </strong>
                    </div>

                    <div className="detail-item">
                        <span>Ubicación</span>
                        <strong>
                            {recurso.ubicacion || "No especificada"}
                        </strong>
                    </div>

                    <div className="detail-item">

                        <span>Descripción</span>

                        <p>
                            {recurso.descripcion ||
                                "Sin descripción"}
                        </p>

                    </div>

                </div>

                <div className="modal-actions">

                    <button
                        className="secondary-button"
                        onClick={cerrar}
                    >
                        Cerrar
                    </button>

                </div>

            </div>

        </div>
    );
}

/* =====================================================
   FORMULARIO RESERVA
===================================================== */

function ReservaForm({
    recursos,
    cerrar,
    terminado,
}) {

    const [form, setForm] = useState({
        usuarioId: "",
        recursoId: "",
        fechaInicio: "",
        fechaFin: "",
        observaciones: "",
    });

    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState("");


    const cambiar = (campo, valor) => {

        setForm({
            ...form,
            [campo]: valor,
        });

    };


    const enviar = async (e) => {

        e.preventDefault();

        setGuardando(true);
        setError("");

        try {

            await crearReserva({
                usuarioId: Number(form.usuarioId),
                recursoId: Number(form.recursoId),
                fechaInicio: form.fechaInicio,
                fechaFin: form.fechaFin,
                observaciones: form.observaciones,
            });

            await terminado();

            cerrar();

        } catch (e) {

            setError(e.message);

        } finally {

            setGuardando(false);

        }

    };


    return (
        <form onSubmit={enviar}>

            {error && (
                <div className="form-error">
                    <AlertCircle size={17} />
                    {error}
                </div>
            )}


            <div className="form-group">

                <label>
                    ID del usuario
                </label>

                <input
                    required
                    type="number"
                    min="1"
                    value={form.usuarioId}
                    onChange={(e) =>
                        cambiar("usuarioId", e.target.value)
                    }
                    placeholder="Ej. 1"
                />

            </div>


            <div className="form-group">

                <label>
                    Recurso
                </label>

                <select
                    required
                    value={form.recursoId}
                    onChange={(e) =>
                        cambiar("recursoId", e.target.value)
                    }
                >

                    <option value="">
                        Seleccionar recurso
                    </option>

                    {recursos
                        .filter(
                            r =>
                                String(r.estado || "").toUpperCase() ===
                                "DISPONIBLE"
                        )
                        .map((r) => (
                            <option
                                key={r.id}
                                value={r.id}
                            >
                                {r.nombre}
                            </option>
                        ))}

                </select>

            </div>


            <div className="form-row">

                <div className="form-group">

                    <label>
                        Fecha y hora de inicio
                    </label>

                    <input
                        required
                        type="datetime-local"
                        value={form.fechaInicio}
                        onChange={(e) =>
                            cambiar(
                                "fechaInicio",
                                e.target.value
                            )
                        }
                    />

                </div>


                <div className="form-group">

                    <label>
                        Fecha y hora de finalización
                    </label>

                    <input
                        required
                        type="datetime-local"
                        value={form.fechaFin}
                        onChange={(e) =>
                            cambiar(
                                "fechaFin",
                                e.target.value
                            )
                        }
                    />

                </div>

            </div>


            <div className="form-group">

                <label>
                    Observaciones
                </label>

                <textarea
                    value={form.observaciones}
                    onChange={(e) =>
                        cambiar(
                            "observaciones",
                            e.target.value
                        )
                    }
                    rows="3"
                    placeholder="Información adicional..."
                />

            </div>


            <div className="modal-actions">

                <button
                    type="button"
                    className="secondary-button"
                    onClick={cerrar}
                >
                    Cancelar
                </button>

                <button
                    className="primary-button"
                    disabled={guardando}
                >
                    {guardando
                        ? "Creando..."
                        : "Crear reserva"}
                </button>

            </div>

        </form>
    );
}


/* =====================================================
   COMPONENTES VISUALES
===================================================== */

function MenuItem({
    icon,
    text,
    active,
    onClick,
    badge,
}) {

    return (
        <button
            className={`menu-item ${active ? "active" : ""}`}
            onClick={onClick}
        >

            {icon}

            <span>
                {text}
            </span>

            {badge > 0 && (
                <small>
                    {badge}
                </small>
            )}

        </button>
    );
}


function StatCard({
    icon,
    title,
    value,
    detail,
    type,
    onClick,
}) {

    return (
        <button
            className={`stat-card ${type}`}
            onClick={onClick}
        >

            <div className="stat-icon">
                {icon}
            </div>

            <div className="stat-info">

                <span>
                    {title}
                </span>

                <strong>
                    {value}
                </strong>

                <small>
                    {detail}
                </small>

            </div>

            <ArrowRight className="stat-arrow" size={18} />

        </button>
    );
}


function ResourceMini({
    recurso,
}) {

    const disponible =
        String(recurso.estado || "").toUpperCase() ===
        "DISPONIBLE";

    return (
        <div className="resource-mini">

            <div className="resource-mini-icon">
                <Building2 size={21} />
            </div>

            <div className="resource-mini-info">

                <strong>
                    {recurso.nombre}
                </strong>

                <span>
                    {recurso.tipo}
                </span>

                <small>
                    <MapPin size={12} />
                    {recurso.ubicacion || "Sin ubicación"}
                </small>

            </div>

            <span
                className={`status-dot ${
                    disponible ? "available" : "busy"
                }`}
            />

        </div>
    );
}


function ResourceCard({
    recurso,
    onVer,
    onEditar,
    recargar,
}) {

    const disponible =
        String(recurso.estado || "").toUpperCase() ===
        "DISPONIBLE";

    return (
        <div className="resource-card">

            <div className="resource-image">

                <Building2 size={38} strokeWidth={1.4} />

                <span className="resource-number">
                    #{recurso.id}
                </span>

            </div>

            <div className="resource-card-body">

                <div className="resource-card-top">

                    <span className="type-label">
                        {recurso.tipo}
                    </span>

                    <span
                        className={`availability ${
                            disponible
                                ? "available"
                                : "unavailable"
                        }`}
                    >
                        {disponible
                            ? "Disponible"
                            : recurso.estado}
                    </span>

                </div>

                <h3>
                    {recurso.nombre}
                </h3>

                <p>
                    {recurso.descripcion ||
                        "Recurso universitario disponible para la comunidad."}
                </p>

                <div className="resource-location">

                    <MapPin size={15} />

                    {recurso.ubicacion ||
                        "Ubicación no especificada"}

                </div>

              <div className="resource-actions">

    <button
        className="secondary-button"
        onClick={onVer}
    >
        <Eye size={16} />
        Ver
    </button>

    <button
        className="secondary-button"
        onClick={onEditar}
    >
        <Edit size={16} />
        Editar
    </button>
    <button
    className="secondary-button"
    onClick={async () => {

        const nuevoEstado =
            disponible
                ? "NO_DISPONIBLE"
                : "DISPONIBLE";

        try {

            await cambiarEstadoRecurso(
                recurso.id,
                nuevoEstado
            );

            await recargar();

        } catch (error) {

            console.error(
                "Error cambiando estado:",
                error
            );

            alert(
                "No fue posible cambiar el estado del recurso."
            );

        }

    }}
>
    <RefreshCw size={16} />
    {disponible
        ? "Marcar no disponible"
        : "Marcar disponible"}
</button>

    <button
        className="secondary-button"
        onClick={async () => {

            const confirmar = window.confirm(
                `¿Seguro que deseas eliminar "${recurso.nombre}"?`
            );

            if (!confirmar) return;

            try {

                await eliminarRecurso(recurso.id);

                await recargar();

            } catch (error) {

                console.error(
                    "Error eliminando recurso:",
                    error
                );

                alert(
                    "No fue posible eliminar el recurso."
                );

            }

        }}
    >
        <Trash2 size={16} />
        Eliminar
    </button>

</div>

            </div>

        </div>
    );
}


function EstadoBadge({
    estado,
}) {

    const value =
        String(estado || "PENDIENTE").toUpperCase();

    return (
        <span
            className={`state-badge state-${value.toLowerCase()}`}
        >
            {value}
        </span>
    );
}


function PageHeader({
    eyebrow,
    titulo,
    descripcion,
    boton,
    icon,
    onClick,
}) {

    return (
        <section className="page-header">

            <div>

                <p className="eyebrow">
                    {eyebrow}
                </p>

                <h1>
                    {titulo}
                </h1>

                <p className="subtitle">
                    {descripcion}
                </p>

            </div>

            {boton && (
                <button
                    className="primary-button"
                    onClick={onClick}
                >
                    {icon}
                    {boton}
                </button>
            )}

        </section>
    );
}


function SimplePage({
    titulo,
    descripcion,
    eyebrow = "SMART CAMPUS",
    icon,
    datos,
    recargar,
    boton = "Actualizar",
}) {

    return (
        <>

            <PageHeader
                eyebrow={eyebrow}
                titulo={titulo}
                descripcion={descripcion}
                boton={boton}
                icon={<RefreshCw size={18} />}
                onClick={recargar}
            />

            <div className="panel">

                <div className="simple-page-top">

                    <div className="simple-page-icon">
                        {icon}
                    </div>

                    <div>
                        <p className="eyebrow">
                            INFORMACIÓN DISPONIBLE
                        </p>

                        <h3>
                            {datos.length} registros encontrados
                        </h3>

                        <p className="simple-description">
                            Información obtenida directamente desde el
                            backend de Smart Campus.
                        </p>
                    </div>

                </div>


                {datos.length > 0 ? (

                    <div className="simple-data-list">

                        {datos.slice(0, 12).map((item, index) => (

                            <div
                                className="simple-data"
                                key={item.id || index}
                            >

                                <div className="simple-data-number">
                                    #{item.id || index + 1}
                                </div>

                                <div className="simple-data-content">

                                    <strong>
                                        {
                                            item.nombre ||
                                            item.titulo ||
                                            item.asunto ||
                                            item.descripcion ||
                                            "Registro Smart Campus"
                                        }
                                    </strong>

                                    <span>
                                        {
                                            item.tipo ||
                                            item.estado ||
                                            item.categoria ||
                                            "Información registrada"
                                        }
                                    </span>

                                </div>

                                {item.estado && (
                                    <EstadoBadge
                                        estado={item.estado}
                                    />
                                )}

                                <ChevronRight size={17} />

                            </div>

                        ))}

                    </div>

                ) : (

                    <div className="empty-state">

                        {icon}

                        <h3>
                            No hay registros todavía
                        </h3>

                        <p>
                            Cuando existan nuevos registros aparecerán
                            automáticamente aquí.
                        </p>

                        <button
                            className="secondary-button"
                            onClick={recargar}
                        >
                            <RefreshCw size={16} />
                            Actualizar información
                        </button>

                    </div>

                )}

            </div>

        </>
    );
}


function EmptyState({
    texto,
    boton,
    onClick,
}) {

    return (
        <div className="empty-state">

            <Building2 size={30} />

            <p>
                {texto}
            </p>

            {boton && (
                <button
                    className="secondary-button"
                    onClick={onClick}
                >
                    <Plus size={16} />
                    {boton}
                </button>
            )}

        </div>
    );
}


function Modal({
    titulo,
    cerrar,
    children,
}) {

    return (
        <div
            className="modal-overlay"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) {
                    cerrar();
                }
            }}
        >

            <div className="modal">

                <div className="modal-header">

                    <div>
                        <p className="eyebrow">
                            SMART CAMPUS
                        </p>

                        <h2>
                            {titulo}
                        </h2>
                    </div>

                    <button
                        className="modal-close"
                        onClick={cerrar}
                    >
                        <X size={20} />
                    </button>

                </div>

                <div className="modal-content">
                    {children}
                </div>

            </div>

        </div>
    );
}


/* =====================================================
   FUNCIONES
===================================================== */

function tituloPagina(pagina) {

    const titulos = {
        inicio: "Inicio",
        recursos: "Recursos",
        reservas: "Reservas",
        solicitudes: "Solicitudes",
        notificaciones: "Notificaciones",
        eventos: "Eventos",
    };

    return titulos[pagina] || "Inicio";
}


function formatearFecha(fecha) {

    if (!fecha) {
        return "—";
    }

    try {

        return new Date(fecha).toLocaleString(
            "es-CO",
            {
                dateStyle: "short",
                timeStyle: "short",
            }
        );

    } catch {
        return fecha;
    }
}

function Login({ onLogin }) {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");

    const manejarLogin = async (e) => {
        e.preventDefault();

        setError("");
        setCargando(true);

        try {
            const respuesta = await iniciarSesion(
                correo,
                password
            );

            console.log("Respuesta del login:", respuesta);

            if (!respuesta.token) {
                throw new Error(
                    "El servidor no devolvió un token"
                );
            }

            localStorage.setItem(
                "token",
                respuesta.token
            );

            if (respuesta.usuario) {
                localStorage.setItem(
                    "usuario",
                    JSON.stringify(respuesta.usuario)
                );
            }

            onLogin();

        } catch (error) {
            console.error(
                "Error iniciando sesión:",
                error
            );

            setError(
                error.message ||
                "No se pudo iniciar sesión"
            );

        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="login-container">

            <div className="login-card">

                <div className="login-header">

                    <div className="landing-logo-icon">
                        <GraduationCap size={30} />
                    </div>

                    <h1>
                        UAJS Smart Campus
                    </h1>

                    <p>
                        Inicia sesión para continuar
                    </p>

                </div>

                <form onSubmit={manejarLogin}>

                    <div className="login-field">

                        <label>
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            value={correo}
                            onChange={(e) =>
                                setCorreo(e.target.value)
                            }
                            placeholder="Ingresa tu correo"
                            required
                        />

                    </div>

                    <div className="login-field">

                        <label>
                            Contraseña
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Ingresa tu contraseña"
                            required
                        />

                    </div>

                    {error && (
                        <div className="login-error">
                            <AlertCircle size={17} />
                            <span>{error}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="login-button"
                        disabled={cargando}
                    >
                        {cargando
                            ? "Iniciando sesión..."
                            : "Iniciar sesión"}
                    </button>

                </form>

            </div>

        </div>
    );
}


// =========================================
// PÁGINA PRINCIPAL
// =========================================

function PaginaPrincipal({ onIniciarSesion }) {
    return (
        <div className="landing-page">

            <header className="landing-header">

                <div className="landing-logo">

                    <div className="landing-logo-icon">
                        <GraduationCap size={30} />
                    </div>

                    <div>
                        <strong>UAJS</strong>
                        <span>Smart Campus</span>
                    </div>

                </div>

                <button
                    className="landing-login-button"
                    onClick={onIniciarSesion}
                >
                    Iniciar sesión
                </button>

            </header>


            <main className="landing-hero">

                <div className="landing-content">

                    <div className="landing-badge">
                        <GraduationCap size={18} />
                        Campus Universitario Inteligente
                    </div>

                    <h1>
                        Tu universidad,
                        <span> más inteligente</span>
                    </h1>

                    <p>
                        UAJS Smart Campus integra en una sola plataforma
                        la gestión de recursos, reservas, solicitudes,
                        eventos y notificaciones de nuestra comunidad
                        universitaria
                    </p>

                    <div className="landing-buttons">

                        <button
                            className="landing-primary"
                            onClick={onIniciarSesion}
                        >
                            Iniciar sesión
                            <ArrowRight size={20} />
                        </button>

                        <button
                            className="landing-secondary"
                            onClick={() => {
                                document
                                    .getElementById("funciones")
                                    ?.scrollIntoView({
                                        behavior: "smooth"
                                    });
                            }}
                        >
                            Conocer más
                        </button>

                    </div>

                </div>


                <div className="landing-visual">

                    <div className="campus-card">

                        <div className="campus-card-header">

                            <div>
                                <span>UAJS</span>
                                <strong>Smart Campus</strong>
                            </div>

                            <div className="status-online">
                                <span></span>
                                En línea
                            </div>

                        </div>


                        <div className="campus-card-body">

                            <div className="mini-stat">

                                <div className="mini-icon">
                                    <Building2 size={22} />
                                </div>

                                <div>
                                    <strong>Recursos</strong>
                                    <span>Gestión académica</span>
                                </div>

                            </div>


                            <div className="mini-stat">

                                <div className="mini-icon">
                                    <CalendarDays size={22} />
                                </div>

                                <div>
                                    <strong>Reservas</strong>
                                    <span>Espacios universitarios</span>
                                </div>

                            </div>


                            <div className="mini-stat">

                                <div className="mini-icon">
                                    <ClipboardList size={22} />
                                </div>

                                <div>
                                    <strong>Solicitudes</strong>
                                    <span>Seguimiento en tiempo real</span>
                                </div>

                            </div>


                            <div className="mini-stat">

                                <div className="mini-icon">
                                    <Bell size={22} />
                                </div>

                                <div>
                                    <strong>Notificaciones</strong>
                                    <span>Información importante</span>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </main>


            <section
                id="funciones"
                className="landing-features"
            >

                <div className="features-title">

                    <span>TODO EN UN SOLO LUGAR</span>

                    <h2>
                        Una experiencia universitaria conectada
                    </h2>

                    <p>
                        Administra las principales actividades
                        del campus desde una plataforma centralizada
                    </p>

                </div>


                <div className="features-grid">

                    <div className="feature-card">
                        <Building2 size={28} />

                        <h3>Recursos</h3>

                        <p>
                            Consulta y administra los recursos
                            disponibles dentro del campus
                        </p>
                    </div>


                    <div className="feature-card">
                        <CalendarDays size={28} />

                        <h3>Reservas</h3>

                        <p>
                            Gestiona reservas de espacios y
                            recursos universitarios
                        </p>
                    </div>


                    <div className="feature-card">
                        <ClipboardList size={28} />

                        <h3>Solicitudes</h3>

                        <p>
                            Crea y realiza seguimiento de
                            tus solicitudes
                        </p>
                    </div>


                    <div className="feature-card">
                        <Bell size={28} />

                        <h3>Notificaciones</h3>

                        <p>
                            Mantente informado sobre las
                            novedades del campus
                        </p>
                    </div>

                </div>

            </section>


            <footer className="landing-footer">

                <div>
                    <strong>UAJS Smart Campus</strong>

                    <span>
                        Sistema inteligente de gestión universitaria
                    </span>
                </div>

                <span>
                    Corporación Universitaria Antonio José de Sucre
                </span>

            </footer>

        </div>
    );
}



export default App;