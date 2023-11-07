import { Input } from "components/fields";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "redux/actions";

const FIELDS = [
  { label: "Nombre y Apellido", value: "nombreYApellido" },
  { label: "Nombre De Usuario", value: "username" },
  { label: "Cargo", value: "cargo" },
  { label: "Contraseña", value: "password" },
];

export default function EditUser({ selectedUser, close }) {
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    ...selectedUser,
  });

  const handleSubmit = (e) => {
    const res = confirm("¿Seguro que quieres aplicar estos cambios?");

    if (res) {
      e.preventDefault();
      dispatch(updateUser(user));
      close();
    }
  };

  return (
    <main className="">
      <header className="modalHeader">{selectedUser.username}</header>
      <form className="flex flex-col items-center p-4" onSubmit={handleSubmit}>
        {FIELDS.map(({ label, value }) => (
          <Input label={label} value={user[value]} onChange={(e) => setUser({ ...user, [value]: e.target.value })} />
        ))}
        <input type="submit" className="submitBtn mt-4" value="Guardar" />
      </form>
    </main>
  );
}
