import { Form, Dropdown } from "react-bootstrap";

const UserRow = ({ usuario }) => {
  return (
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

      <td>
        <span
          className={`badge rounded-pill px-3 py-2 ${
            usuario.estado === "Activo"
              ? "bg-success-subtle text-success"
              : "bg-warning-subtle text-warning"
          }`}
        >
          ● {usuario.estado}
        </span>
      </td>

      <td className="text-end">
        <Dropdown align="end" container="body">
            <Dropdown.Toggle
                variant="light"
                className="border-0"
            >
                <i className="bi bi-three-dots"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item>Editar</Dropdown.Item>
                <Dropdown.Item>Suspender</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="text-danger">Eliminar
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>

      </td>
    </tr>
  );
};

export default UserRow;
