import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
//* Utils
import ActaCard from "./ActaCard";
import ActasFilters from "../filters/ActasFilters";
import { PlusSquareDotted } from "@styled-icons/bootstrap/PlusSquareDotted";

function ActasCards({ allActas, typeOfCard }) {
  const currentUser = useSelector((s) => JSON.parse(localStorage.getItem("currentUser")) || s.currentUser);
  let actasToRender = allActas.filter((a) => a.estado !== "deprecada");

  if (currentUser.username !== "admin") {
    actasToRender = allActas.filter((a) => {
      return a.Peritos.some((perito) => perito.nombreYApellido === currentUser.nombreYApellido);
    });
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
      <div data-aos="fade-down" className="flex w-full items-center justify-between border-b-[3px] border-t-[3px] border-principal px-14">
        <ActasFilters />
        {typeOfCard !== "remove" && (
          <Link className="basicBtnNoPadding group flex px-4 py-2" to="/actas/crear/1" onClick={() => loadLocalStorage()}>
            Crear Acta
            <PlusSquareDotted className="icons ml-4 w-[25px] group-hover:text-black" />
          </Link>
        )}
      </div>
      <div data-aos="zoom-in" className="flex max-h-[75vh] w-full flex-col items-center justify-start overflow-y-scroll px-5 pb-2">
        {typeOfCard === "remove"
          ? allActas && allActas.map((acta) => <ActaCard acta={acta} type={typeOfCard} key={acta.id} />)
          : actasToRender && actasToRender.map((acta) => <ActaCard acta={acta} type={typeOfCard} key={acta.id} />)}
      </div>
    </>
  );
}

export default ActasCards;
