import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import CardsHabitacionesPublic from "./habitaciones/CardsHabitacionesPublic";


const Habitaciones = () => {
  const [fechaEntrada, setFechaEntrada] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");
  const [huespedes, setHuespedes] = useState(1);
  const [numHabitaciones, setNumHabitaciones] = useState(1);

  // Estado para ordenar
  const [orden, setOrden] = useState("precio-asc");

   const habitacionesEjemplo = [
    {
      id: 1,
      numero: "101",
      tipo: "Simple",
      precio: 150,
      estado: "Disponible",
      img: "https://images.pexels.com/photos/34983175/pexels-photo-34983175.jpeg",
    },
    {
      id: 2,
      numero: "204",
      tipo: "Doble",
      precio: 220,
      estado: "Ocupada",
      img: "https://images.pexels.com/photos/276224/pexels-photo-276224.jpeg",
    },
    {
      id: 3,
      numero: "301",
      tipo: "Suite",
      precio: 350,
      estado: "Mantenimiento",
      img: "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg",
    },
  ];

  // Ordenador
  const ordenarHabitaciones = (data) => {
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
        Utiliza los filtros para encontrar la habitación ideal para tus fechas y necesidades.
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

      {/* Cards */}
      <CardsHabitacionesPublic
        habitaciones={ordenarHabitaciones(habitacionesEjemplo)}
      />
    </Container>
  );
};

export default Habitaciones;
