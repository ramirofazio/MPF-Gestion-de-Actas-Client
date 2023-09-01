import React from "react";
import { Link } from "react-router-dom";
//* Redux
import { useDispatch, useSelector } from "react-redux";
import { clearStates } from "../../../redux/actions";
//* Styles
import { toast } from "react-toastify";
import logo from "../../../Assets/logo.png";

function NavBar({ setFlag }) {
  const dispatch = useDispatch();

  const adminState = useSelector((s) => s.admin);
  const currentUser = useSelector((s) => JSON.parse(localStorage.getItem("currentUser")) || s.currentUser);

  const handleCloseSession = () => {
    const users = localStorage.getItem("users");
    setFlag(false);
    localStorage.clear();
    dispatch(clearStates());
    toast.success("¡Sesion cerrada con exito!");
    localStorage.setItem("users", users);
  };

  return (
    <div className="fixed flex h-full w-[20%] items-center justify-center  bg-principal">
      <div className="flex h-full w-full flex-col items-center justify-start px-2 pt-10">
        {process.env.REACT_APP_ENV && <p className="text-white underline">STAGING</p>}
        <img data-aos="fade-right" className="mb-10 w-[60%]" src={logo} alt="logo" />
        <Link data-aos="fade-right" className="navButton" to="/">
          Volver a Inicio
        </Link>
        {adminState && (
          <Link data-aos="fade-right" className="navButton" to="/admin">
            Panel de Administrador
          </Link>
        )}
        {currentUser && (
          <Link data-aos="fade-right" className="navButton" to="/" onClick={() => handleCloseSession()}>
            Cerrar sesion
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavBar;
