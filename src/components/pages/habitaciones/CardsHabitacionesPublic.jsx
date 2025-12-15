import { Card, Button, Col, Row } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const CardsHabitacionesPublic = ({ habitaciones }) => {
  return (
    <Row className="g-4">
      {habitaciones.map((hab) => (
        <Col lg={4} md={6} key={hab._id || hab.id}>
          <Card className="h-100 shadow-sm rounded-4 overflow-hidden">
            <Card.Img
              variant="top"
              src={hab.imagenes || hab.imagen || hab.img}
              style={{ height: "210px", objectFit: "cover" }}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300x200?text=Sin+Imagen";
              }}
            />
            <Card.Body>
              <h5 className="fw-bold text-capitalize">{hab.tipo}</h5>

              <p className="text-muted small mb-2">
                <i className="bi bi-person-fill me-1"></i>
                {hab.capacidad || 2} Huéspedes · 
                <i className="bi bi-house-door-fill ms-2 me-1"></i>
                Hab. {hab.numero}
                {hab.metrosCuadrados && (
                   <> · <i className="bi bi-aspect-ratio ms-2 me-1"></i> {hab.metrosCuadrados}m²</>
                )}
              </p>
              <p className="fw-bold fs-4 text-primary mb-0">
                ${hab.precio} <span className="fs-6 text-muted">/ noche</span>
              </p>
            </Card.Body>
            <Card.Footer className="bg-white border-0 pb-3">
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