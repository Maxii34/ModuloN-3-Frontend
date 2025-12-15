import { Card, Button, Col, Row } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const CardsHabitacionesPublic = ({ habitaciones }) => {
  return (
    <Row className="g-4">
      {habitaciones.map((hab) => (
        // 1. CORRECCIÓN: Key con _id (Mongo) o id (Mock)
        <Col lg={4} md={6} key={hab._id || hab.id}>
          <Card className="h-100 shadow-sm rounded-4 overflow-hidden">

            {/* 2. CORRECCIÓN: Acepta 'imagen' (Backend) o 'img' (Mock) */}
            <Card.Img
              variant="top"
              src={hab.imagen || hab.img}
              style={{ height: "210px", objectFit: "cover" }}
            />

            {/* Contenido */}
            <Card.Body>
              {/* text-capitalize pone la primera letra en mayúscula (ej: matrimonial -> Matrimonial) */}
              <h5 className="fw-bold text-capitalize">{hab.tipo}</h5>

              <p className="text-muted small mb-2">
                <i className="bi bi-person-fill me-1"></i>
                {/* 3. CORRECCIÓN: Busca 'capacidad' primero, que es el nombre en tu Admin */}
                {hab.capacidad || hab.huespedes || 2} Huéspedes ·
                <i className="bi bi-house-door-fill ms-2 me-1"></i>
                Hab. {hab.numero}
              </p>

              <p className="fw-bold fs-4 text-primary mb-0">
                ${hab.precio} <span className="fs-6 text-muted">/ noche</span>
              </p>
            </Card.Body>

            {/* Botón */}
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