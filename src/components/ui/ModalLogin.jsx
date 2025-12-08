import { Button, Modal, Form } from "react-bootstrap";
import "./Modales.css";

export const ModalLogin = ({ showLogin, loginClose }) => {
  return (
    <>
      <Modal show={showLogin} onHide={loginClose}>
        <Modal.Body>
          <Form className=" css-modal-login">
            <div className="text-center mb-2">
              <h1 className="mb-2">Bienvenido</h1>
              <div>
                <span className="text-muted">
                  Inicie sesión con su cuenta para continuar
                </span>
              </div>
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="ejemplo@Email.com" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Iniciar Sesión
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="m-0 p-0">
          <Button variant="secondary" onClick={loginClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
