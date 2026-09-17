import { useCallback, useEffect, useMemo, useState } from "react";
import {
  obtenerRecursos,
  obtenerReservas,
  obtenerNotificaciones,
  obtenerEventos,
  obtenerSolicitudes,
} from "../services/api";

export default function useCampusData() {
  const [recursos, setRecursos] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [notificaciones, setNotificaciones] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const cargarDatos = useCallback(async () => {
    setCargando(true);
    setError("");
    const resultados = await Promise.allSettled([
      obtenerRecursos(),
      obtenerReservas(),
      obtenerNotificaciones(),
      obtenerEventos(),
      obtenerSolicitudes(),
    ]);

    const setters = [setRecursos, setReservas, setNotificaciones, setEventos, setSolicitudes];
    const nombres = ["recursos", "reservas", "notificaciones", "eventos", "solicitudes"];
    const errores = [];

    resultados.forEach((resultado, index) => {
      if (resultado.status === "fulfilled") {
        setters[index](Array.isArray(resultado.value) ? resultado.value : []);
      } else {
        errores.push(`${nombres[index]}: ${resultado.reason?.message || "sin respuesta"}`);
      }
    });

    if (errores.length) setError(`Algunos módulos no están disponibles: ${errores.join(" | ")}`);
    setCargando(false);
  }, []);

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  const recursosDisponibles = useMemo(
    () => recursos.filter(r => String(r.estado || "").toUpperCase() === "DISPONIBLE").length,
    [recursos]
  );
  const reservasPendientes = useMemo(
    () => reservas.filter(r => String(r.estado || "").toUpperCase() === "PENDIENTE").length,
    [reservas]
  );
  const notificacionesPendientes = useMemo(
    () => notificaciones.filter(n => String(n.estado || "").toUpperCase() !== "LEIDA").length,
    [notificaciones]
  );

  return {
    recursos,
    reservas,
    notificaciones,
    eventos,
    solicitudes,
    cargando,
    error,
    cargarDatos,
    recursosDisponibles,
    reservasPendientes,
    notificacionesPendientes,
  };
}
