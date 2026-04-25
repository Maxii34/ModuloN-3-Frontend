import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // Importamos SweetAlert para la confirmación

const MiReserva = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_HABITACIONES;

  useEffect(() => {
    obtenerMisReservas();
  }, []);

  const obtenerMisReservas = async () => {
    try {
      const session = JSON.parse(sessionStorage.getItem("usuarioKey"));
      const miId = String(session?.usuario?._id || session?.usuario?.id || "");

      if (!miId) {
        setLoading(false);
        return;
      }

      const response = await fetch(API_URL);
      const data = await response.json();

      if (response.ok) {
        const misReservasPlanificadas = [];

        data.forEach((habitacion) => {
          habitacion.fechasOcupadas?.forEach((res) => {
            const idEnReserva = String(res.usuario?._id || res.usuario || "");

            if (idEnReserva === miId && miId !== "") {
              misReservasPlanificadas.push({
                ...habitacion, // Copiamos los datos de la habitación (imagen, numero)
                reservaId: res._id, // EL ID ESPECÍFICO DE ESTA RESERVA (Para poder borrarla)
                fechaEntrada: res.fechaEntrada,
                fechaSalida: res.fechaSalida
              });
            }
          });
        });
        setReservas(misReservasPlanificadas);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // --- NUEVA FUNCIÓN PARA CANCELAR ---
  const handleCancelar = async (idHabitacion, reservaId) => {
    const session = JSON.parse(sessionStorage.getItem("usuarioKey"));
    const token = session?.token || sessionStorage.getItem("token");

    // 1. Pedimos confirmación al usuario
    const confirmacion = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Se cancelará tu reserva y la habitación quedará libre.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, cancelar estancia",
      cancelButtonText: "Volver"
    });

    // 2. Si dice que sí, mandamos la petición al backend
    if (confirmacion.isConfirmed) {
      try {
        const respuesta = await fetch(`${API_URL}/${idHabitacion}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-token": token // Mandamos el token de seguridad
          },
          // Mandamos el ID de la reserva específica que queremos borrar
          body: JSON.stringify({ cancelarReservaId: reservaId }) 
        });

        if (respuesta.ok) {
          Swal.fire("Cancelada", "Tu reserva ha sido cancelada con éxito.", "success");
          
          // 3. Actualizamos la pantalla (borramos la tarjeta sin tener que recargar la página)
          setReservas((reservasAnteriores) => 
            reservasAnteriores.filter((res) => res.reservaId !== reservaId)
          );
        } else {
          Swal.fire("Error", "No se pudo cancelar la reserva", "error");
        }
      } catch (error) {
        console.error("Error al cancelar:", error);
        Swal.fire("Error", "Fallo de conexión con el servidor", "error");
      }
    }
  };

  if (loading) return <Container className="text-center py-5"><Spinner animation="border" variant="primary" /></Container>;

  return (
    <Container className="py-5">
      <h2 className="text-center mb-4 fw-bold">Mis Próximas Estancias</h2>
      {reservas.length === 0 ? (
        <div className="text-center p-5 border rounded bg-light">
          <p className="text-muted fs-5">No tienes habitaciones reservadas actualmente.</p>
          <Link to="/habitaciones"><Button variant="dark" className="px-4">Buscar Habitaciones</Button></Link>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {reservas.map((res, i) => (
            <Col key={i}>
              <Card className="h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                <Card.Img src={res.imagen} style={{ height: "200px", objectFit: "cover" }} />
                <Card.Body>
                  <Card.Title className="fw-bold">Habitación {res.numero}</Card.Title>
                  <Card.Text className="text-muted text-capitalize">{res.tipo}</Card.Text>
                  <div className="p-3 bg-light rounded border mb-3 small text-dark">
                    <strong>Check-in:</strong> {res.fechaEntrada}<br/>
                    <strong>Check-out:</strong> {res.fechaSalida}
                  </div>
                  
                  {/* --- BOTÓN CONECTADO A LA FUNCIÓN --- */}
                  <Button 
                    variant="outline-danger" 
                    className="w-100 fw-bold"
                    onClick={() => handleCancelar(res._id, res.reservaId)}
                  >
                    <i className="bi bi-x-circle me-2"></i>Cancelar Reserva
                  </Button>

                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MiReserva;