import { useState, useEffect } from "react"; // 1. Importamos useEffect
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import CardsHabitacionesPublic from "./habitaciones/CardsHabitacionesPublic";

const Habitaciones = () => {
  // Estados de filtros visuales
  const [fechaEntrada, setFechaEntrada] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");
  const [huespedes, setHuespedes] = useState(1);
  const [numHabitaciones, setNumHabitaciones] = useState(1);

  // Estado para ordenar
  const [orden, setOrden] = useState("precio-asc");

  // 2. ESTADO PARA LOS DATOS REALES (Empieza vacío)
  const [habitaciones, setHabitaciones] = useState([]);

  // 3. FUNCIÓN PARA TRAER DATOS DEL BACKEND
  const obtenerHabitaciones = async () => {
    try {
      const respuesta = await fetch("https://modulo-n-3-backend.vercel.app/api/habitaciones");
      if (respuesta.ok) {
        const datos = await respuesta.json();
        setHabitaciones(datos); // Guardamos los datos de MongoDB
      } else {
        console.error("Error al obtener habitaciones del servidor");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  // 4. USEEFFECT: Carga los datos al iniciar la página
  useEffect(() => {
    obtenerHabitaciones();
  }, []);

  // Ordenador (Funciona igual, pero ahora con datos reales)
  const ordenarHabitaciones = (data) => {
    // Creamos una copia para no mutar el estado original
    const copia = [...data];

    switch (orden) {
      case "precio-asc":
        return copia.sort((a, b) => a.precio - b.precio);
      case "precio-desc":
        return copia.sort((a, b) => b.precio - a.precio);
      case "nombre-asc":
        return copia.sort((a, b) => a.tipo.localeCompare(b.tipo));
      case "nombre-desc":
        return copia.sort((a, b) => b.tipo.localeCompare(a.tipo));
      default:
        return copia;
    }
  };

  return (
    <Container className="mt-5 mb-5">
      <h1 className="text-center fw-bold">Encuentra tu estancia perfecta</h1>
      <p className="text-center text-muted mb-4">
        Utiliza los filtros para encontrar la habitación ideal para tus fechas y
        necesidades.
      </p>

      {/* Filtros superiores */}
      <Row className="bg-white p-4 rounded shadow-sm align-items-end g-3 mb-5">
        <Col md={3}>
          <Form.Group>
            <Form.Label>Fecha de entrada</Form.Label>
            <Form.Control
              type="date"
              value={fechaEntrada}
              onChange={(e) => setFechaEntrada(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group>
            <Form.Label>Fecha de salida</Form.Label>
            <Form.Control
              type="date"
              value={fechaSalida}
              onChange={(e) => setFechaSalida(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group>
            <Form.Label>Huéspedes</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={huespedes}
              onChange={(e) => setHuespedes(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={2}>
          <Form.Group>
            <Form.Label>Habitaciones</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={numHabitaciones}
              onChange={(e) => setNumHabitaciones(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col md={2} className="text-center">
          <Button variant="dark" className="w-100">
            <i className="bi bi-search"></i> Buscar
          </Button>
        </Col>
      </Row>

      {/* Título + Ordenar */}
      <Row className="mb-4 align-items-center">
        <Col>
          <h3 className="fw-bold">Resultados para tu búsqueda</h3>
        </Col>

        <Col xs="12" md="4" lg="3" className="text-md-end mt-3 mt-md-0">
          <Form.Select
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
            className="shadow-sm"
          >
            <option value="precio-asc">Precio: más bajo</option>
            <option value="precio-desc">Precio: más alto</option>
            <option value="nombre-asc">Nombre: A–Z</option>
            <option value="nombre-desc">Nombre: Z–A</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Cards - Le pasamos el estado 'habitaciones' ordenado */}
      {habitaciones.length > 0 ? (
        <CardsHabitacionesPublic
          habitaciones={ordenarHabitaciones(habitaciones)}
        />
      ) : (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2 text-muted">Cargando habitaciones...</p>
        </div>
      )}
    </Container>
  );
};

export default Habitaciones;