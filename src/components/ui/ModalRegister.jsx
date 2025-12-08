import { Button, Modal } from "react-bootstrap";

export const ModalRegister = ({ showRegister, registerClose }) => {
  return (
    <>
      <Modal show={showRegister} onHide={registerClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer className="m-0 p-0">
          <Button variant="secondary" onClick={registerClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
