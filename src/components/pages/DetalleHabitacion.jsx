import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const DetalleHabitacion = () => {
  return (
    <Container className="my-5">
      <Row>
        {/* Columna Izquierda: Imagen y Detalles */}
        <Col md={7}>
          <div className="fixed-height-image w-100 mb-4">
            <img
              src="https://images.pexels.com/photos/34983175/pexels-photo-34983175.jpeg"
              alt="Hotel vista al mar"
              className="imgDetalle"
            />
          </div>

          <div className="mb-5">
            <h3 className="fw-bold text-center">Habtiación Número 5 Piso 2</h3>
            <p className="text-center fw-light">Para 2 personas</p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum
              est possimus sunt perspiciatis animi inventore dolorem beatae
              architecto ex quasi illo blanditiis asperiores, delectus sapiente
              iusto alias debitis? Dolorum, exercitationem! Eveniet provident
              quos nesciunt non illo rem omnis fuga molestiae ea. Reiciendis,
              inventore libero. Odio magni nulla nisi quam hic.
            </p>
            <div>
              <ListGroup>
                <ListGroup.Item>Tipo: Matrimonial</ListGroup.Item>
                <ListGroup.Item>Metros Cuadrados: 150m2</ListGroup.Item>
                <ListGroup.Item>Caracteristicas: Wifi, Balcon, Aire Acondicionado</ListGroup.Item>
              </ListGroup>
            </div>
          </div>
        </Col>

        {/* Columna Derecha: Formulario de Reserva y Resumen */}
        <Col md={5}>
          <Card className="p-3">
            <h3>Selecciona tus Fechas</h3>

            {/* Campos de Fecha */}
            <Row className="mt-3">
              <Col>
                <Form.Label>Check-in</Form.Label>
                <Form.Control type="date" defaultValue="10/22/2024" />
              </Col>
              <Col>
                <Form.Label>Check-out</Form.Label>
                <Form.Control type="date" defaultValue="10/26/2024" />
              </Col>
            </Row>

            {/* Resumen de Costos */}
            <div className="mt-4">
              <Row>
                <Col>Precio base (1 noche)</Col>
                <Col className="text-end">$1,000.00</Col>
              </Row>
              <Row>
                <Col>Impuestos y tasas</Col>
                <Col className="text-end">$120.00</Col>
              </Row>
              <hr />
              <Row className="fw-bold">
                <Col>Total Estimado</Col>
                <Col className="text-end text-primary">$1,120.00</Col>
              </Row>
            </div>
          </Card>

          {/* Alerta y Botones */}
          <Alert variant="success" className="mt-3">
            <i className="bi bi-check-circle-fill"></i> ¡Habitación disponible
            para estas fechas!
          </Alert>

          <Button variant="primary" size="lg" className="w-100 mb-2">
            Verificar Disponibilidad
          </Button>

          <Button
            variant="light"
            size="lg"
            className="w-100"
            style={{ backgroundColor: "#e9ecef" }}
          >
            Continuar con la Reserva
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default DetalleHabitacion;
