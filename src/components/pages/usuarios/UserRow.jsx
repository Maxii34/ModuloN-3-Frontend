import { Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";

const UserRow = ({ usuario }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <tr>
        <td>
          <Form.Check />
        </td>

        <td>
          <div className="d-flex align-items-center gap-3">
            <img
              src={usuario.avatar}
              alt={usuario.nombre}
              width={40}
              height={40}
              className="rounded-circle"
            />
            <span className="fw-semibold">
              {usuario.nombre} {usuario.apellido}
            </span>
          </div>
        </td>

        <td className="text-muted">{usuario.email}</td>

        <td className="text-capitalize">
          {usuario.tipo === "admin" ? "Administrador" : "Usuario"}
        </td>

        {/* ACCIONES */}
        <td className="text-end">
          <div className="d-flex justify-content-end gap-2">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => setShowModal(true)}
            >
              <i className="bi bi-eye"></i>
            </Button>

            <Button variant="outline-danger" size="sm">
              <i className="bi bi-trash"></i>
            </Button>
          </div>
        </td>
      </tr>

      {/* MODAL INFO USUARIO */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Información del Usuario</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="text-center mb-3">
            <img
              src={usuario.avatar}
              alt={usuario.nombre}
              width={80}
              height={80}
              className="rounded-circle mb-2"
            />
            <h5 className="mb-0">
              {usuario.nombre} {usuario.apellido}
            </h5>
            <small className="text-muted">{usuario.email}</small>
          </div>

          <hr />

          <p>
            <strong>Rol:</strong>{" "}
            {usuario.tipo === "admin" ? "Administrador" : "Usuario"}
          </p>

          {/* A futuro */}
          <p>
            <strong>ID:</strong> {usuario.id}
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserRow;
