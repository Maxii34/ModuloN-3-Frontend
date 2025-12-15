import { Card, Button, Col, Row } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const CardsHabitaciones = ({ habitaciones, borrarHabitacion }) => {
  return (
    <Row className="g-4">
      {habitaciones.map((hab) => (
        // Usamos _id (mongo) o id (fallback)
        <Col md={6} key={hab._id || hab.id}>
          <Card className="h-100 shadow-sm card-room">
            
            {/* CORRECCIÓN: Aceptamos 'imagen' o 'img' y fijamos altura */}
            <Card.Img
              variant="top"
              src={hab.imagen || hab.img}
              style={{ height: "200px", objectFit: "cover" }}
            />

            <Card.Body>
              <div className="d-flex justify-content-between">
                <Card.Title>Habitación {hab.numero}</Card.Title>
                <span
                  className={`fw-bold ${
                    hab.estado === "disponible"
                      ? "text-success"
                      : hab.estado === "ocupada"
                      ? "text-danger"
                      : "text-warning"
                  }`}
                >
                  {hab.estado}
                </span>
              </div>

              <Card.Text className="text-muted small mt-2">
                {hab.tipo}
              </Card.Text>
              
              <Card.Text className="fw-bold fs-5">
                ${hab.precio} <span className="fs-6 fw-normal">/ noche</span>
              </Card.Text>
            </Card.Body>

            <Card.Footer className="d-flex justify-content-between bg-white border-top-0 pb-3">
              <Button variant="outline-primary" className="btn-room">
                <i className="bi bi-pencil-fill"></i> Editar
              </Button>

              {/* CONEXIÓN DEL BOTÓN BORRAR */}
              <Button
                variant="danger"
                className="btn-room"
                onClick={() => borrarHabitacion(hab._id || hab.id)}
              >
                <i className="bi bi-trash-fill"></i> Eliminar
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CardsHabitaciones;