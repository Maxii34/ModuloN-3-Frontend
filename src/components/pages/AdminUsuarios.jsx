import { Container, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
import UserTable from "./usuarios/UserTable";

const AdminUsuarios = () => {
  const [usuarios] = useState([
    {
      id: 1,
      nombre: "Ana",
      apellido: "Torres",
      email: "ana.torres@hotel.com",
      tipo: "admin",
      avatar: "https://i.pravatar.cc/150?img=47",
    },
    {
      id: 2,
      nombre: "Carlos",
      apellido: "Gomez",
      email: "carlos.gomez@hotel.com",
      tipo: "usuario",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: 3,
      nombre: "Luisa",
      apellido: "Fernandez",
      email: "luisa.fernandez@hotel.com",
      tipo: "admin",
      avatar: "https://i.pravatar.cc/150?img=32",
    },
  ]);

  const [filtros, setFiltros] = useState({
    search: "",
    rol: "Todos",
  });

  const usuariosFiltrados = usuarios.filter((u) => {
    const matchSearch =
      `${u.nombre} ${u.apellido} ${u.email}`
        .toLowerCase()
        .includes(filtros.search.toLowerCase());

    const matchRol =
      filtros.rol === "Todos" || u.tipo === filtros.rol;

    return matchSearch && matchRol;
  });

  return (
    <Container className="p-4">
      {/* HEADER */}
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold mb-1">Administración de Usuarios</h2>
          <p className="text-muted mb-0">
            Gestiona el acceso y permisos de los usuarios del sistema.
          </p>
        </Col>
      </Row>

      {/* FILTROS */}
      <Row className="mb-4 g-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Buscar por nombre o email..."
            value={filtros.search}
            onChange={(e) =>
              setFiltros({ ...filtros, search: e.target.value })
            }
          />
        </Col>

        <Col md={3}>
          <Form.Select
            value={filtros.rol}
            onChange={(e) =>
              setFiltros({ ...filtros, rol: e.target.value })
            }
          >
            <option value="Todos">Rol: Todos</option>
            <option value="admin">Administrador</option>
            <option value="usuario">Usuario</option>
          </Form.Select>
        </Col>
      </Row>

      {/* TABLA */}
      <UserTable usuarios={usuariosFiltrados} />
    </Container>
  );
};

export default AdminUsuarios;
