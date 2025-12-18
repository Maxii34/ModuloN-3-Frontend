import { useState } from "react";
import { Button, Modal, Badge, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import { eliminarUsuario } from "../../../services/usuariosAPI";

const UserRow = ({ usuario, onUsuarioEliminado }) => {
  const [showModal, setShowModal] = useState(false);

  const handleEliminar = async () => {
    const confirmacion = await Swal.fire({
      title: "¿Eliminar usuario?",
      text: `Se eliminará a ${usuario.nombre} ${usuario.apellido}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!confirmacion.isConfirmed) return;

    try {
      const usuarioKey = JSON.parse(
        sessionStorage.getItem("usuarioKey")
      );

      await eliminarUsuario(usuario._id, usuarioKey.token);

      Swal.fire({
        icon: "success",
        title: "Usuario eliminado",
        text: "El usuario fue eliminado correctamente",
        timer: 2000,
        showConfirmButton: false,
      });

      onUsuarioEliminado(usuario._id);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "No se pudo eliminar el usuario",
      });
    }
  };

  return (
    <>
      <tr>
        <td className="d-flex align-items-center gap-2">
          <div
            className={`rounded-circle d-flex align-items-center justify-content-center
            bg-${usuario.tipo === "admin" ? "primary" : "secondary"} text-white`}
            style={{ width: 40, height: 40 }}
          >
            <i className="bi bi-person-fill"></i>
          </div>
          <span className="fw-semibold">
            {usuario.nombre} {usuario.apellido}
          </span>
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
            disabled={usuario.tipo === "admin"}
            onClick={handleEliminar}
            title={
              usuario.tipo === "admin"
                ? "No se puede eliminar un administrador"
                : "Eliminar usuario"
            }
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
          {/* INFO PRINCIPAL */}
          <div className="d-flex gap-4 align-items-start mb-4">
            <div
              className={`rounded-circle d-flex align-items-center justify-content-center
                bg-${usuario.tipo === "admin" ? "primary" : "secondary"}
                text-white`}
              style={{ width: 60, height: 60 }}
            >
              <i className="bi bi-person-fill fs-3"></i>
            </div>

            <div className="flex-grow-1">
              <h5 className="fw-bold mb-1">
                {usuario.nombre} {usuario.apellido}
              </h5>

              <p className="text-muted mb-2">{usuario.email}</p>

              <Badge bg={usuario.tipo === "admin" ? "primary" : "secondary"}>
                {usuario.tipo}
              </Badge>

              <div className="row small mt-3">
                <div className="col-md-6 mb-2">
                  <strong>ID:</strong> {usuario._id}
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
              <h6 className="fw-bold mb-3">Habitación Reservada</h6>

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
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserRow;
