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
import Swal from "sweetalert2";
import { asignarHabitacionUsuario } from "../../services/usuariosAPI";

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

  const handleConfirmar = async () => {
    try {
      const session = JSON.parse(sessionStorage.getItem("usuarioKey"));

      if (!session) {
        throw new Error("Debes iniciar sesión");
      }

      await asignarHabitacionUsuario(
        session.usuario.id,
        habitacion._id,
        session.token
      );

      Swal.fire({
        icon: "success",
        title: "Reserva confirmada",
        text: "La habitación fue asignada correctamente",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  if (cargando) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
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

  const precioBase = habitacion.precio;
  const impuestos = precioBase * 0.02;
  const total = precioBase + impuestos;

  return (
    <Container className="py-5" style={{ maxWidth: "650px" }}>
      <h1 className="fw-bold text-center mb-4">Checkout de Reserva</h1>

      <div className="p-4 rounded border shadow-sm">
        <h5 className="fw-bold">
          {habitacion.tipo} – Habitación {habitacion.numero}
        </h5>

        <ListGroup className="my-3">
          <ListGroup.Item className="d-flex justify-content-between">
            <span>Alojamiento</span>
            <span>${precioBase}</span>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between">
            <span>Impuestos (2%)</span>
            <span>${impuestos.toFixed(2)}</span>
          </ListGroup.Item>
        </ListGroup>

        <div className="d-flex justify-content-between fw-bold mb-3">
          <span>TOTAL</span>
          <span>${total}</span>
        </div>

        <Button className="w-100 fw-bold" onClick={handleConfirmar}>
          CONFIRMAR PAGO
        </Button>
      </div>
    </Container>
  );
}

export default ReservaHabitacion;
