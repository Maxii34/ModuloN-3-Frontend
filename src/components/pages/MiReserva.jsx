import { useEffect, useState } from "react";
import { Container, Card, Spinner } from "react-bootstrap";

const MiReserva = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerReservas = async () => {
      try {
        const token = sessionStorage.getItem("token");

        if (!token) {
          console.error("NO HAY TOKEN EN SESSION STORAGE");
          setLoading(false);
          return;
        }

        const response = await fetch(
          "http://localhost:3000/api/reservas/mias",
          {
            headers: {
              "x-token": token,
            },
          }
        );

        const data = await response.json();
        console.log("RESERVAS BACKEND:", data);

        if (response.ok) {
          setReservas(data);
        } else {
          console.error("Error backend:", data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerReservas();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (reservas.length === 0) {
    return (
      <Container className="my-5 text-center">
        <h3>No tenés reservas activas</h3>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4">Mi Reserva</h2>

      {reservas.map((reserva) => (
        <Card key={reserva._id} className="mb-3 shadow-sm">
          <Card.Body>
            <Card.Title>{reserva.habitacion?.tipo}</Card.Title>
            <Card.Text>
              <strong>Entrada:</strong>{" "}
              {new Date(reserva.fechaEntrada).toLocaleDateString()}
              <br />
              <strong>Salida:</strong>{" "}
              {new Date(reserva.fechaSalida).toLocaleDateString()}
              <br />
              <strong>Huéspedes:</strong> {reserva.cantidadHuespedes}
              <br />
              <strong>Estado:</strong> {reserva.estado}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default MiReserva;
