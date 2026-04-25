import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  ListGroup,
  Spinner,
  Alert,
  Row,
  Col
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";

function ReservaHabitacion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [habitacion, setHabitacion] = useState(null);
  const [cargando, setCargando] = useState(true);

  const [fechaEntrada, setFechaEntrada] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");

  const { user } = useAuth();
  const usuarioStorage = JSON.parse(sessionStorage.getItem("usuarioKey"))?.usuario || {};
  const usuarioActual = user || usuarioStorage;

  // Usamos solo la API de habitaciones que ya está en el deploy
  const habitacionesBack = import.meta.env.VITE_API_HABITACIONES;

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const respuesta = await fetch(`${habitacionesBack}/${id}`);
        if (respuesta.ok) {
          const dato = await respuesta.json();
          setHabitacion(dato);
        }
      } catch (error) {
        console.error("Error al cargar habitación:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, [id, habitacionesBack]);

  const handleConfirmar = async () => {
    if (!fechaEntrada || !fechaSalida) {
      Swal.fire("Atención", "Debes seleccionar las fechas de entrada y salida", "warning");
      return;
    }

    try {
      const session = JSON.parse(sessionStorage.getItem("usuarioKey"));
      if (!session || !session.token) {
        Swal.fire("Inicia Sesión", "Debes estar logueado para reservar.", "warning");
        return;
      }

      const result = await Swal.fire({
        title: "Confirmar Reserva",
        text: `¿Deseas reservar la habitación ${habitacion?.numero} desde el ${fechaEntrada} al ${fechaSalida}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, reservar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        Swal.fire({
          title: 'Verificando disponibilidad...',
          didOpen: () => Swal.showLoading()
        });

        // ESTRATEGIA: Mandamos un "reservaNueva" dentro del PUT de la habitación
        const reservaBody = {
          reservaNueva: {
            fechaEntrada,
            fechaSalida,
            usuario: usuarioActual.id || usuarioActual._id
          }
        };

        const respuesta = await fetch(`${habitacionesBack}/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-token": session.token,
          },
          body: JSON.stringify(reservaBody),
        });

        const data = await respuesta.json();

        if (respuesta.ok) {
          await Swal.fire({
            icon: "success",
            title: "¡Reserva Exitosa!",
            text: "Tu estancia ha sido programada correctamente.",
          });
          navigate("/"); // O la ruta que prefieras
        } else {
          // Captura el mensaje de "La habitación ya está ocupada" del backend
          throw new Error(data.mensaje || "Error al procesar la reserva");
        }
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  if (cargando) return <Container className="py-5 text-center"><Spinner animation="border" /></Container>;

  const precioBase = habitacion?.precio || 0;
  const impuestos = precioBase * 0.02;
  const total = precioBase + impuestos;

  return (
    <Container className="py-5" style={{ maxWidth: "650px" }}>
      <h1 className="mb-1 fw-bold text-center">Finalizar Reserva</h1>
      
      <div className="p-4 mb-4 bg-white border rounded shadow-sm">
        <h3 className="mb-3 border-bottom pb-2">1. Fechas de Estancia</h3>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Check-in</Form.Label>
              <Form.Control 
                type="date" 
                value={fechaEntrada} 
                min={new Date().toISOString().split("T")[0]} // No dejar elegir fechas pasadas
                onChange={(e) => setFechaEntrada(e.target.value)} 
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Check-out</Form.Label>
              <Form.Control 
                type="date" 
                value={fechaSalida} 
                min={fechaEntrada || new Date().toISOString().split("T")[0]}
                onChange={(e) => setFechaSalida(e.target.value)} 
              />
            </Form.Group>
          </Col>
        </Row>
      </div>

      <div className="p-4 mb-4 bg-light rounded shadow-sm">
        <h3 className="mb-3 border-bottom pb-2">2. Datos del Huésped</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="text-muted">Nombre</Form.Label>
            <Form.Control type="text" defaultValue={usuarioActual.nombre} readOnly />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="text-muted">Email</Form.Label>
            <Form.Control type="email" defaultValue={usuarioActual.email} readOnly />
          </Form.Group>
        </Form>
      </div>

      <div className="p-4 rounded bg-white border shadow-sm">
        <h4 className="mb-3">Resumen del Pago</h4>
        <ListGroup variant="flush" className="mb-4">
          <ListGroup.Item className="d-flex justify-content-between">
            <span>Habitación {habitacion.numero} ({habitacion.tipo})</span>
            <span>${precioBase.toLocaleString()}</span>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between">
            <span>Tasa de servicio (2%)</span>
            <span>${impuestos.toFixed(2)}</span>
          </ListGroup.Item>
          <ListGroup.Item className="d-flex justify-content-between fw-bold">
            <span>TOTAL:</span>
            <span className="text-primary">${total.toLocaleString()}</span>
          </ListGroup.Item>
        </ListGroup>

        <Button variant="primary" size="lg" className="w-100 fw-bold" onClick={handleConfirmar}>
          CONFIRMAR Y PAGAR
        </Button>
      </div>
    </Container>
  );
}

export default ReservaHabitacion;