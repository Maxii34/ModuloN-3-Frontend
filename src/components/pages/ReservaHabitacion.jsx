import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  ListGroup,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useParams } from "react-router-dom";

function ReservaHabitacion() {
  const { id } = useParams();
  const [habitacion, setHabitacion] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const respuesta = await fetch(
          `http://localhost:3000/api/habitaciones/${id}`
        );
        if (respuesta.ok) {
          const dato = await respuesta.json();
          setHabitacion(dato);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, [id]);

  if (cargando) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p>Cargando datos de la reserva...</p>
      </Container>
    );
  }

  if (!habitacion) {
    return (
      <Container className="py-5">
        <Alert variant="danger">Habitación no encontrada</Alert>
      </Container>
    );
  }

  // (2% Impuesto)
  const precioBase = habitacion.precio;
  const impuestos = precioBase * 0.02;
  const total = precioBase + impuestos;

  return (
    <Container className="py-5" style={{ maxWidth: "650px" }}>
      <h1 className="mb-1 fw-bold text-center">Checkout de Reserva</h1>
      <p className="text-secondary text-center mb-5">
        Completa tu información para asegurar tu habitación.
      </p>

      {/* === SECCIÓN 1: Formulario === */}
      <div className="p-4 mb-4 bg-light rounded shadow-sm">
        <h3 className="mb-3 border-bottom pb-2">1. Tu Contacto</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="fw-normal text-muted">
              Nombre Completo
            </Form.Label>
            <Form.Control type="text" placeholder="Tu Nombre" className="p-2" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-normal text-muted">
              Correo Electrónico
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="ejemplo@correo.com"
              className="p-2"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="fw-normal text-muted">Teléfono</Form.Label>
            <Form.Control
              type="tel"
              placeholder="+XX XXX XXX XXXX"
              className="p-2"
            />
          </Form.Group>
        </Form>

        <h3 className="mb-4 border-bottom pb-2 mt-5">2. Información de Pago</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="fw-normal text-muted">
              Número de Tarjeta
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="XXXX XXXX XXXX XXXX"
              className="p-2"
            />
          </Form.Group>
          <div className="d-flex justify-content-between gap-3">
            <Form.Group className="flex-grow-1">
              <Form.Label className="fw-normal text-muted">
                Vencimiento
              </Form.Label>
              <Form.Control type="text" placeholder="MM/AA" className="p-2" />
            </Form.Group>
            <Form.Group className="flex-grow-1">
              <Form.Label className="fw-normal text-muted">CVC</Form.Label>
              <Form.Control type="text" placeholder="123" className="p-2" />
            </Form.Group>
          </div>
        </Form>
      </div>

      <hr className="my-5" />

      <div className="p-4 rounded bg-white border shadow-sm">
        <div className="mb-4 border-bottom pb-3">
          <div
            className="w-100 mb-2 rounded overflow-hidden"
            style={{ maxHeight: "150px" }}
          >
            <img
              src={
                habitacion.imagenes ||
                habitacion.imagen ||
                "https://via.placeholder.com/800x400"
              }
              alt={habitacion.tipo}
              className="w-100 h-100"
              style={{ objectFit: "cover" }}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/800x400?text=Sin+Imagen";
              }}
            />
          </div>
          <h5 className="fw-bold mt-2 text-capitalize">
            {habitacion.tipo} - Habitación {habitacion.numero}
          </h5>
        </div>

        <h4 className="mb-3">Desglose de Costos</h4>

        <ListGroup variant="flush" className="mb-4">
          <ListGroup.Item className="d-flex justify-content-between bg-white border-0 py-2">
            <span className="text-secondary">Alojamiento (1 Noche)</span>
            <span>${precioBase.toLocaleString()}</span>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between bg-white border-0 py-2">
            <span className="text-secondary">Impuestos y Tasas (2%)</span>
            <span>${impuestos.toFixed(2)}</span>
          </ListGroup.Item>
        </ListGroup>

        <div className="pt-3 border-top mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="h5 fw-bold text-dark">TOTAL FINAL:</span>
            <span className="h4 fw-bold text-primary">
              ${total.toLocaleString()}
            </span>
          </div>

          <Button variant="primary" size="lg" className="w-100 fw-bold">
            CONFIRMAR PAGO
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default ReservaHabitacion;
