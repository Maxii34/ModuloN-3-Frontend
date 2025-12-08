import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import "./Modales.css";

export const ModalRegister = ({ showRegister, registerClose }) => {
  return (
    <>
      <Modal show={showRegister} onHide={registerClose} size="lg">
        <Modal.Body>
          <div className="text-center mb-4">
            <h1 className="mb-2">Regístrate</h1>
            <span className="text-muted d-block">
              Completa tus datos para crear una cuenta
            </span>
          </div>

          <Form className="css-modal-register">
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text" placeholder="Ingresa tu nombre" />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control type="text" placeholder="Ingresa tu apellido" />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="ejemplo@Email.com" />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control type="tel" placeholder="Ingresa tu teléfono" />
                </Form.Group>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={10}>
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ingresa tu contraseña"
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <div className=" d-flex justify-content-center align-content-center">
            <Button variant="primary" type="submit" className="w-50">
              Registrarse
            </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer className="m-0 p-0">
          <Button variant="secondary" onClick={registerClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
