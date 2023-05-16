import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
//* Utils
import ActaCard from "./ActaCard";
import ActasFilters from "../filters/ActasFilters";

function ActasCards({ allActas, typeOfCard }) {
  const currentUser = useSelector((s) => JSON.parse(localStorage.getItem("currentUser")) || s.currentUser);
  let actasToRender = allActas.filter((a) => a.estado !== "deprecada");

  if (currentUser.username !== "admin") {
    actasToRender = allActas.filter((a) => a.Peritos[0].nombreYApellido === currentUser.nombreYApellido);
  }

  const loadLocalStorage = () => {
    localStorage.setItem("actaFlag", "");
    localStorage.setItem("currentActa", JSON.stringify([]));
    localStorage.setItem("currentIntegrantes", JSON.stringify([]));
    localStorage.setItem("currentPeritos", JSON.stringify([]));
    localStorage.setItem("currentBolsas", JSON.stringify([]));
    localStorage.setItem("currentEfectos", JSON.stringify([]));
  };
  return (
    <>
      <div className="flex h-full w-full flex-col items-center overflow-y-scroll border-t-[3px] border-t-principal">
        <ActasFilters />
        {typeOfCard === "remove"
          ? allActas && allActas.map((acta) => <ActaCard acta={acta} type={typeOfCard} key={acta.id} />)
          : actasToRender && actasToRender.map((acta) => <ActaCard acta={acta} type={typeOfCard} key={acta.id} />)}
      </div>
      {typeOfCard !== "remove" && (
        <Link className="basicBtnNoPadding absolute bottom-0  mb-5 px-6 py-2" to="/actas/crear/1" onClick={() => loadLocalStorage()}>
          Crear Acta
        </Link>
      )}
    </>
  );
}

export default ActasCards;
