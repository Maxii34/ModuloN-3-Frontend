import { Card, Button, Col, Row } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const CardsHabitaciones = ({ habitaciones, onEditarHabitacion, onEliminarHabitacion }) => {
  
  return (
    <Row className="g-4">
      {habitaciones.map((hab) => (
        <Col md={6} key={hab._id || hab.id}>
          <Card className="h-100 shadow-sm card-room">
            <Card.Img variant="top" src={hab.imagen || hab.img} />
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
                    hab.estado === "disponible" || hab.estado === "Disponible"
                      ? "text-success"
                      : hab.estado === "ocupada" || hab.estado === "Ocupada"
                      ? "text-danger"
                      : "text-warning"
                  }`}
                >
                  {hab.estado ? hab.estado.charAt(0).toUpperCase() + hab.estado.slice(1).toLowerCase() : hab.estado}
                </span>
              </div>

              <Card.Text className="text-capitalize">{hab.tipo}</Card.Text>
              <Card.Text className="fw-bold">
                ${hab.precio} / noche
              </Card.Text>
            </Card.Body>

            <Card.Footer className="d-flex justify-content-between">
              <Button 
                variant="primary" 
                className="btn-room"
                onClick={() => onEditarHabitacion && onEditarHabitacion(hab)}
              >
                <i className="bi bi-pencil-fill"></i> Editar
              </Button>
              <Button 
                variant="danger" 
                className="btn-room"
                onClick={() => onEliminarHabitacion && onEliminarHabitacion(hab)}
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