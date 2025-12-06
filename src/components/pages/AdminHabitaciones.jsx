import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css"
import "../../index.css"

const AdminHabitaciones = () => {
  return (
    <Container className="my-5">
      <Row className="gap-4">
        {/* --- Columna Izquierda: Nueva Habitación --- */}
        <Col md={4} className="p-4 border rounded bg-light">
          <h3 className="mb-4 fw-bold">Agregar Nueva Habitación</h3>

          <Form>
            {/* Número de Habitación */}
            <Form.Group className="mb-3">
              <Form.Label>Número de Habitación</Form.Label>
              <Form.Control type="text" placeholder="Ej: 101" />
            </Form.Group>

            {/* Tipo de Habitacion */}
            <Form.Group className="mb-3">
              <Form.Label>Tipo de Habitación</Form.Label>
              <Form.Select>
                <option>Seleccionar tipo</option>
                <option>Simple</option>
                <option>Doble</option>
                <option>Matrimonial</option>
                <option>Suite</option>
              </Form.Select>
            </Form.Group>

            {/* Precio */}
            <Form.Group className="mb-3">
              <Form.Label>Precio por Noche</Form.Label>
              <Form.Control type="number" placeholder="$ 150.00" />
            </Form.Group>

            {/* Disponibilidad */}
            <Form.Group className="mb-3">
              <Form.Label>Disponibilidad</Form.Label>
              <div className="d-flex gap-3 mt-2">
                <Form.Check type="radio" label="Disponible" name="estado" />
                <Form.Check type="radio" label="Ocupada" name="estado" />
                <Form.Check type="radio" label="Mantenimiento" name="estado" />
              </div>
            </Form.Group>

            {/* Cargar imagen */}
            <Form.Group className="mb-4">
              <Form.Label>Foto de la Habitación</Form.Label>
              <div
                className="border rounded d-flex justify-content-center align-items-center text-center p-4"
                style={{ borderStyle: "dashed", cursor: "pointer" }}
              >
                <div>
                  <p className="mb-0 fw-semibold">Click para subir o arrastrar</p>
                  <small>SVG, PNG, JPG (MAX. 800×400px)</small>
                </div>
              </div>
            </Form.Group>

            <Button variant="primary" className="w-100">
              Guardar Habitación
            </Button>
          </Form>
        </Col>

        {/* --- Columna Derecha: Habitaciones Existentes --- */}
        <Col md={7} className="p-4 border rounded bg-white">
          <h3 className="mb-4 fw-bold">Habitaciones Existentes</h3>

          <Row className="g-4">
            {/* Habitación ejemplo 1 */}
            <Col md={6}>
              <Card className="h-100 shadow-sm card-room">
                <Card.Img
                  variant="top"
                  src="https://images.pexels.com/photos/34983175/pexels-photo-34983175.jpeg"
                />
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <Card.Title>Habitación 101</Card.Title>
                    <span className="text-success fw-bold">Disponible</span>
                  </div>
                  <Card.Text>Simple</Card.Text>
                  <Card.Text className="fw-bold">$150 / noche</Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                  <Button variant="primary" className="btn-room"><i className="bi bi-pencil-fill"></i> Editar</Button>
                  <Button variant="danger" className="btn-room"><i className="bi bi-trash-fill"></i> Eliminar</Button>
                </Card.Footer>
              </Card>
            </Col>

            {/* Habitación ejemplo 2 */}
            <Col md={6}>
              <Card className="h-100 shadow-sm card-room">
                <Card.Img
                  variant="top"
                  src="https://images.pexels.com/photos/276224/pexels-photo-276224.jpeg"
                />
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <Card.Title>Habitación 204</Card.Title>
                    <span className="text-danger fw-bold">Ocupada</span>
                  </div>
                  <Card.Text>Doble</Card.Text>
                  <Card.Text className="fw-bold">$220 / noche</Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                  <Button variant="primary" className="btn-room"><i className="bi bi-pencil-fill"></i> Editar</Button>
                  <Button variant="danger" className="btn-room"><i className="bi bi-trash-fill"></i> Eliminar</Button>
                </Card.Footer>
              </Card>
            </Col>

            {/* Habitación ejemplo 3 */}
            <Col md={6}>
              <Card className="h-100 shadow-sm card-room">
                <Card.Img
                  variant="top"
                  src="https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg"
                />
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <Card.Title>Habitación 301</Card.Title>
                    <span className="text-warning fw-bold">Mantenimiento</span>
                  </div>
                  <Card.Text>Suite</Card.Text>
                  <Card.Text className="fw-bold">$350 / noche</Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                  <Button variant="primary" className="btn-room"><i className="bi bi-pencil-fill"></i> Editar</Button>
                  <Button variant="danger" className="btn-room"><i className="bi bi-trash-fill"></i> Eliminar</Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminHabitaciones;