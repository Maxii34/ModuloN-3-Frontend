import { Card, Button, Col, Row } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const CardsHabitacionesPublic = ({ habitaciones }) => {
  return (
    <Row className="g-4">
      {habitaciones.map((hab) => (
        <Col lg={4} md={6} key={hab.id}>
          <Card className="h-100 shadow-sm rounded-4 overflow-hidden">

            {/* Imagen */}
            <Card.Img
              variant="top"
              src={hab.img}
              style={{ height: "210px", objectFit: "cover" }}
            />

            {/* Contenido */}
            <Card.Body>
              <h5 className="fw-bold">{hab.tipo}</h5>

              <p className="text-muted small mb-2">
                <i className="bi bi-person-fill me-1"></i>
                {hab.huespedes ?? 2} Huéspedes ·
                <i className="bi bi-house-door-fill ms-2 me-1"></i>
                {hab.numero}
              </p>

              <p className="fw-bold fs-4 text-primary mb-0">
                ${hab.precio} <span className="fs-6 text-muted">/ noche</span>
              </p>
            </Card.Body>

            {/* Botón */}
            <Card.Footer className="bg-white border-0">
              <Button variant="dark" className="w-100 py-2 rounded-3">
                Reservar Ahora
              </Button>
            </Card.Footer>

          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CardsHabitacionesPublic;
