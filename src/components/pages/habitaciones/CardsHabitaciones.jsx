import { Card, Button, Col, Row } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const CardsHabitaciones = ({ habitaciones }) => {
  return (
    <Row className="g-4">
      {habitaciones.map((hab) => (
        <Col md={6} key={hab.id}>
          <Card className="h-100 shadow-sm card-room">
            <Card.Img variant="top" src={hab.img} />

            <Card.Body>
              <div className="d-flex justify-content-between">
                <Card.Title>Habitación {hab.numero}</Card.Title>
                <span
                  className={`fw-bold ${
                    hab.estado === "Disponible"
                      ? "text-success"
                      : hab.estado === "Ocupada"
                      ? "text-danger"
                      : "text-warning"
                  }`}
                >
                  {hab.estado}
                </span>
              </div>

              <Card.Text>{hab.tipo}</Card.Text>
              <Card.Text className="fw-bold">
                ${hab.precio} / noche
              </Card.Text>
            </Card.Body>

            <Card.Footer className="d-flex justify-content-between">
              <Button variant="primary" className="btn-room">
                <i className="bi bi-pencil-fill"></i> Editar
              </Button>
              <Button variant="danger" className="btn-room">
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