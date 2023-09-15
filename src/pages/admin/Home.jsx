import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllActas } from "../../redux/actions";
import { Icons as I } from "assets";

export function Home() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllActas());
  }, []);

  return (
    <div className="paddingLeftContainer">
      <header data-aos="fade-down" className="header">
        <span className="headerTitle">Panel de Administrador</span>
      </header>
      <div className="flex h-[85vh] w-full flex-col items-center justify-center overflow-x-hidden overflow-y-scroll border-t-[3px] border-t-principal">
        <NavLink data-aos="zoom-in" className="adminCards group" to="/admin/eliminarActa">
          <span className="text-xl text-secondary group-hover:text-principal">Eliminar un Acta</span>
          <I.fileRemove className="icons w-8 group-hover:text-principal" />
        </NavLink>
      </div>
    </div>
  );
}
