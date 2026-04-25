import { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from "sweetalert2";
import CardsHabitacionesPublic from "./habitaciones/CardsHabitacionesPublic";
import "./BusquedaDisponibilidad.css";

const Habitaciones = () => {
  const [fechaEntrada, setFechaEntrada] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");
  const [huespedes, setHuespedes] = useState(2);
  const [numHabitaciones, setNumHabitaciones] = useState(1);
  const [orden, setOrden] = useState("precio-asc");
  const [habitaciones, setHabitaciones] = useState([]);
  const [habitacionesFiltradas, setHabitacionesFiltradas] = useState([]);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const habitacionesBack = import.meta.env.VITE_API_HABITACIONES;

  const getMinCheckOutDate = () => {
    if (!fechaEntrada) return today;
    const checkIn = new Date(fechaEntrada);
    checkIn.setDate(checkIn.getDate() + 1);
    return checkIn.toISOString().split('T')[0];
  };

  const handleFechaEntradaChange = (e) => {
    const newFechaEntrada = e.target.value;
    setFechaEntrada(newFechaEntrada);
    if (fechaSalida && new Date(fechaSalida) <= new Date(newFechaEntrada)) {
      setFechaSalida('');
    }
  };

  const obtenerHabitaciones = async () => {
    try {
      const respuesta = await fetch(habitacionesBack);
      if (respuesta.ok) {
        const datos = await respuesta.json();
        setHabitaciones(datos);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  useEffect(() => {
    obtenerHabitaciones();
  }, []);

  // === LÓGICA REFACTORIZADA PARA DISPONIBILIDAD REAL ===
  const filtrarHabitaciones = () => {
    if (!fechaEntrada || !fechaSalida) {
      Swal.fire({
        icon: "warning",
        title: "Fechas requeridas",
        text: "Por favor, selecciona las fechas para verificar disponibilidad real.",
      });
      return;
    }

    const inicioBusqueda = new Date(fechaEntrada).getTime();
    const finBusqueda = new Date(fechaSalida).getTime();

    const resultados = habitaciones.filter((hab) => {
      // 1. Filtro por capacidad (se mantiene)
      const cumpleCapacidad = hab.capacidad >= huespedes;

      // 2. Filtro por "Mantenimiento" o "Limpieza" (bloqueo absoluto)
      const estadoBloqueado = ["mantenimiento", "limpieza"].includes(hab.estado?.toLowerCase());

      // 3. NUEVO: Validación de disponibilidad por fechas ocupadas
      // Si la habitación NO tiene choques de fechas en su array de reservas, está libre
      const tieneChoqueDeFechas = hab.fechasOcupadas?.some((reserva) => {
        const entradaExistente = new Date(reserva.fechaEntrada).getTime();
        const salidaExistente = new Date(reserva.fechaSalida).getTime();
        return inicioBusqueda < salidaExistente && finBusqueda > entradaExistente;
      });

      return cumpleCapacidad && !estadoBloqueado && !tieneChoqueDeFechas;
    });

    setHabitacionesFiltradas(resultados);
    setBusquedaRealizada(true);

    if (resultados.length === 0) {
      Swal.fire({
        icon: "info",
        title: "Sin disponibilidad",
        text: "No hay habitaciones libres para esas fechas. Intenta con otro rango.",
      });
    }
  };

  const ordenarHabitaciones = (data) => {
    const copia = [...data];
    switch (orden) {
      case "precio-asc": return copia.sort((a, b) => a.precio - b.precio);
      case "precio-desc": return copia.sort((a, b) => b.precio - a.precio);
      case "nombre-asc": return copia.sort((a, b) => a.tipo.localeCompare(b.tipo));
      case "nombre-desc": return copia.sort((a, b) => b.tipo.localeCompare(a.tipo));
      default: return copia;
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <h1 className="text-center fw-bold">Encuentra tu estancia perfecta</h1>
      <p className="text-center text-muted mb-4">
        Ahora buscamos disponibilidad real comparando las fechas de reserva.
      </p>

      <div className="busqueda-disponibilidad-form">
        <div className="busqueda-form-group">
          <label htmlFor="llegada">Llegada</label>
          <div className="busqueda-input-wrapper">
            <input
              type="date"
              id="llegada"
              value={fechaEntrada}
              onChange={handleFechaEntradaChange}
              min={today}
              className="busqueda-form-input busqueda-date-input"
            />
            <i className="bi bi-calendar3 busqueda-input-icon"></i>
          </div>
        </div>

        <div className="busqueda-form-group">
          <label htmlFor="salida">Salida</label>
          <div className="busqueda-input-wrapper">
            <input
              type="date"
              id="salida"
              value={fechaSalida}
              onChange={(e) => setFechaSalida(e.target.value)}
              min={getMinCheckOutDate()}
              disabled={!fechaEntrada}
              className="busqueda-form-input busqueda-date-input"
            />
            <i className="bi bi-calendar3 busqueda-input-icon"></i>
          </div>
        </div>

        <div className="busqueda-form-group">
          <label htmlFor="huespedes">Huéspedes</label>
          <div className="busqueda-input-wrapper">
            <select
              id="huespedes"
              value={huespedes}
              onChange={(e) => setHuespedes(Number(e.target.value))}
              className="busqueda-form-input"
            >
              {[1, 2, 3, 4, 5].map(n => (
                <option key={n} value={n}>{n} {n === 1 ? 'Huésped' : 'Huéspedes'}</option>
              ))}
            </select>
            <i className="bi bi-chevron-down busqueda-input-icon"></i>
          </div>
        </div>

        <button className="busqueda-button" onClick={filtrarHabitaciones}>
          Ver Disponibilidad
        </button>
      </div>

      <Row className="mb-4 align-items-center">
        <Col><h3 className="fw-bold">Resultados</h3></Col>
        <Col xs="12" md="4" lg="3" className="text-md-end mt-3 mt-md-0">
          <Form.Select value={orden} onChange={(e) => setOrden(e.target.value)} className="shadow-sm">
            <option value="precio-asc">Precio: más bajo</option>
            <option value="precio-desc">Precio: más alto</option>
            <option value="nombre-asc">Nombre: A–Z</option>
          </Form.Select>
        </Col>
      </Row>

      {habitaciones.length > 0 ? (
        <CardsHabitacionesPublic
          habitaciones={ordenarHabitaciones(busquedaRealizada ? habitacionesFiltradas : habitaciones)}
        />
      ) : (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Cargando habitaciones...</p>
        </div>
      )}
    </Container>
  );
};

export default Habitaciones;