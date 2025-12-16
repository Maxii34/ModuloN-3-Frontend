import { useState } from "react";
import { Button, Modal, Badge, Card } from "react-bootstrap";

const UserRow = ({ usuario }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* FILA */}
      <tr>
        <td className="d-flex align-items-center gap-2">
          <div
          className={`rounded-circle d-flex align-items-center justify-content-center
            bg-${usuario.tipo === "admin" ? "primary" : "secondary"}
            text-white`}
          style={{ width: 40, height: 40 }}
        >
          <i className="bi bi-person-fill"></i>
        </div>

          <div>
            <div className="fw-semibold">
              {usuario.nombre} {usuario.apellido}
            </div>
          </div>
        </td>

        <td>{usuario.email}</td>

        <td>
          <Badge bg={usuario.tipo === "admin" ? "primary" : "secondary"}>
            {usuario.tipo}
          </Badge>
        </td>

        <td className="text-center">
          <Button
            variant="outline-primary"
            size="sm"
            className="me-2"
            onClick={() => setShowModal(true)}
          >
            <i className="bi bi-eye"></i>
          </Button>

          <Button
            variant="outline-danger"
            size="sm"
          >
            <i className="bi bi-trash"></i>
          </Button>
        </td>
      </tr>

      {/* MODAL */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">
            Información del Usuario
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* INFO USUARIO */}
          <div className="d-flex gap-4 align-items-start mb-4">
            <div
              className={`rounded-circle d-flex align-items-center justify-content-center
                bg-${usuario.tipo === "admin" ? "primary" : "secondary"}
                text-white`}
              style={{ width: 40, height: 40 }}
            >
              <i className="bi bi-person-fill"></i>
            </div>


            <div className="flex-grow-1">
              <h5 className="fw-bold mb-1">
                {usuario.nombre} {usuario.apellido}
              </h5>

              <p className="text-muted mb-2">{usuario.email}</p>

              <Badge
                bg={usuario.tipo === "admin" ? "primary" : "secondary"}
              >
                {usuario.tipo}
              </Badge>

              <div className="row small mt-3">
                <div className="col-md-6 mb-2">
                  <strong>Teléfono:</strong>{" "}
                  {usuario.telefono || "—"}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>Registrado:</strong>{" "}
                  {usuario.createdAt
                    ? new Date(usuario.createdAt).toLocaleDateString()
                    : "—"}
                </div>
              </div>
            </div>
          </div>

          {/* HABITACIÓN EJEMPLO SOLO USUARIO */}
          {usuario.tipo === "usuario" && (
            <>
              <hr />
              <h6 className="fw-bold mb-3">
                Habitación Reservada
              </h6>

              <Card className="shadow-sm">
                <Card.Body>
                  <div className="d-flex justify-content-between mb-2">
                    <strong>Habitación 204</strong>
                    <Badge bg="primary">Doble</Badge>
                  </div>

                  <div className="small text-muted">
                    <div>Precio por noche: $220</div>
                    <div>Estado: Disponible</div>
                  </div>
                </Card.Body>
              </Card>
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserRow;
