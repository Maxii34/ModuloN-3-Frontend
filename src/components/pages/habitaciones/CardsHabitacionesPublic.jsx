import { Card, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
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
                e.target.src =
                  "https://via.placeholder.com/300x200?text=Sin+Imagen";
              }}
            />
            <Card.Body>
              <h5 className="fw-bold text-capitalize">{hab.tipo}</h5>
              <p className="text-muted small mb-2">
                Hab. {hab.numero} - {hab.capacidad} Huéspedes
              </p>
              <p className="fw-bold fs-4 text-primary mb-0">${hab.precio}</p>
            </Card.Body>

            <Card.Footer className="bg-white border-0 pb-3">
              <Link
                to={`/detalle/${hab._id || hab.id}`}
                className="w-100 btn btn-dark py-2 rounded-3"
              >
                Reservar Ahora
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default CardsHabitacionesPublic;
