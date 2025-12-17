import { Table } from "react-bootstrap";
import UserRow from "./UserRow";

const UserTable = ({ usuarios }) => {
  return (
    <Table hover responsive className="align-middle">
      <thead>
        <tr>
          <th>Usuario</th>
          <th>Email</th>
          <th>Rol</th>
          <th className="text-center">Acciones</th>
        </tr>
      </thead>

      <tbody>
        {usuarios.map((u) => (
          <UserRow key={u.id} usuario={u} />
        ))}
      </tbody>
    </Table>
  );
};

export default UserTable;

