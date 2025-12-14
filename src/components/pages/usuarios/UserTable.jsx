import { Table, Form } from "react-bootstrap";
import UserRow from "./UserRow";

const UserTable = ({ usuarios }) => {
  return (
    <Table hover responsive className="align-middle border rounded">
      <thead className="table-light">
        <tr>
          <th>
            <Form.Check />
          </th>
          <th>Nombre de Usuario</th>
          <th>Email</th>
          <th>Rol</th>
          <th className="text-end">Acciones</th>
        </tr>
      </thead>

      <tbody>
        {usuarios.length > 0 ? (
          usuarios.map((u) => <UserRow key={u.id} usuario={u} />)
        ) : (
          <tr>
            <td colSpan="5" className="text-center text-muted py-4">
              No hay usuarios para mostrar
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default UserTable;
