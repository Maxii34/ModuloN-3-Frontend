import { Container, Row, Col, Form, Badge } from "react-bootstrap";
import { useEffect, useState } from "react";
import UserTable from "./usuarios/UserTable";
import { listarUsuarios } from "../../services/usuariosAPI";

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [filtros, setFiltros] = useState({
    search: "",
    rol: "Todos",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      const data = await listarUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUsuarioEliminado = (id) => {
    setUsuarios((prev) => prev.filter((u) => (u._id || u.id) !== id));
  };

  const usuariosFiltrados = usuarios.filter((u) => {
    const nombreCompleto = `${u.nombre || ""} ${u.apellido || ""} ${u.email || ""}`.toLowerCase();
    const matchSearch = nombreCompleto.includes(filtros.search.toLowerCase());

    const matchRol =
      filtros.rol === "Todos" || u.tipo?.toLowerCase() === filtros.rol.toLowerCase();

    return matchSearch && matchRol;
  });

  return (
    <Container className="py-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h2 className="fw-bold mb-1">Administración de Usuarios</h2>
          <p className="text-muted mb-0">
            Gestioná los accesos y roles de la plataforma
          </p>
        </Col>
        <Col xs="auto">
          <Badge bg="dark" className="px-3 py-2">
            {usuariosFiltrados.length} Usuarios encontrados
          </Badge>
        </Col>
      </Row>

      <Row className="mb-4 g-3 bg-light p-3 rounded shadow-sm">
        <Col md={8}>
          <Form.Group className="position-relative">
            <Form.Control
              placeholder="Buscar por nombre, apellido o email..."
              value={filtros.search}
              onChange={(e) =>
                setFiltros({ ...filtros, search: e.target.value })
              }
              className="py-2"
            />
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Select
            value={filtros.rol}
            onChange={(e) =>
              setFiltros({ ...filtros, rol: e.target.value })
            }
            className="py-2"
          >
            <option value="Todos">Todos los roles</option>
            <option value="admin">Administrador</option>
            <option value="usuario">Usuario</option>
          </Form.Select>
        </Col>
      </Row>

      <div className="bg-white rounded shadow-sm overflow-hidden">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-2 text-muted">Cargando base de datos...</p>
          </div>
        ) : (
          <UserTable
            usuarios={usuariosFiltrados}
            onUsuarioEliminado={handleUsuarioEliminado}
          />
        )}
      </div>
    </Container>
  );
};

export default AdminUsuarios;