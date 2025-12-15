import { Card, Button, Col, Row } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

// 1. AQUI CAMBIAMOS 'handleEditar' POR 'onEditarHabitacion'
const CardsHabitaciones = ({ habitaciones, borrarHabitacion, onEditarHabitacion }) => {
  return (
    <Row className="g-4">
      {habitaciones.map((hab) => (
        <Col md={6} key={hab._id || hab.id}>
          <Card className="h-100 shadow-sm card-room">
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
                    hab.estado?.toLowerCase() === "disponible"
                      ? "text-success"
                      : hab.estado?.toLowerCase() === "ocupada"
                      ? "text-danger"
                      : "text-warning"
                  }`}
                >
                  {hab.estado}
                </span>
              </div>
              <Card.Text className="text-capitalize">{hab.tipo}</Card.Text>
              <Card.Text className="fw-bold">${hab.precio} / noche</Card.Text>
            </Card.Body>

            <Card.Footer className="d-flex justify-content-between bg-white border-top-0 pb-3">
              
              {/* 2. AQUI USAMOS EL NOMBRE CORRECTO EN EL ONCLICK */}
              <Button 
                variant="primary" 
                className="btn-room"
                onClick={() => onEditarHabitacion(hab)}
              >
                <i className="bi bi-pencil-fill"></i> Editar
              </Button>

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