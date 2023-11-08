import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BaseModal, CardElement } from "components/index";
import { Icons as I } from "assets/index";
import EditUser from "./EditUser";
import { toast } from "react-toastify";

export function UserDashboard() {
  const users = useSelector((s) => s.users || JSON.parse(localStorage.getItem("users")));

  const [modal, setModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const handleUserClick = (user) => {
    setModal(true);
    setSelectedUser(user);
    toast.warning("¡CUIDADO, ESTA INFORMACION SE ACTUALIZA EN EL MOMENTO!", { position: "top-center" });
  };
  return (
    <div className="paddingLeftContainer">
      <header className="header headerTitle border-b-2  border-principal" data-aos="fade-down">
        Gestionar Usuarios
      </header>
      <section className="grid w-full gap-4 p-4">
        {users?.map((u) => (
          <>
            <div className="flex h-20 w-full items-center rounded-md  border-2 border-principal bg-white p-4 text-black">
              <CardElement title={"Nombre Completo"} value={u.nombreYApellido || "-"} />
              <CardElement title={"Legajo"} value={u.legajo || "-"} />
              <CardElement title={"nombre de usuario"} value={u.username} />
              <CardElement title={"Contraseña"} value={"*************"} />
              <I.documentEdit className="icons w-6" onClick={() => handleUserClick(u)} />
            </div>
          </>
        ))}
      </section>
      <BaseModal
        close={() => setModal(false)}
        isOpen={modal}
        content={<EditUser selectedUser={selectedUser} close={() => setModal(false)} />}
      />
    </div>
  );
}
