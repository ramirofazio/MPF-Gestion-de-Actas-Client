import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ActasFilters, ActaCard } from "components/index";
import { getOfStorage } from "utils";
import { Icons as I } from "assets";

export function ActasCards({ allActas, typeOfCard }) {
  const { username, nombreYApellido } = useSelector((s) => getOfStorage("currentUser") || s.currentUser);
  const [actasToRender, setActasToRender] = useState([]);

  useEffect(() => {
    let actas = [];
    if (username !== "admin") {
      actas = allActas.filter(({ Peritos }) => {
        return Peritos.some((p) => p.nombreYApellido === nombreYApellido);
      });
    } else {
      actas = allActas.filter((a) => a.estado !== "deprecada");
    }
    setActasToRender(actas);
  }, [allActas]);

  return (
    <>
      <div
        data-aos="fade-down"
        className="flex w-full items-center justify-between border-b-[3px] border-t-[3px] border-principal bg-white/50 px-14"
      >
        <ActasFilters />
        {typeOfCard !== "remove" && (
          <Link className="basicBtnNoPadding group flex px-4 py-2" to="/actas/crear/1">
            Crear Acta
            <I.plusDotted className="icons ml-4 w-[25px] group-hover:text-black" />
          </Link>
        )}
      </div>
      <div data-aos="zoom-in" className="flex max-h-[75vh] w-full flex-col items-center justify-start overflow-y-scroll px-5 pb-2">
        {typeOfCard === "remove"
          ? allActas.map((acta) => <ActaCard acta={acta} type={typeOfCard} key={acta.id} />)
          : actasToRender.map((acta) => <ActaCard acta={acta} type={typeOfCard} key={acta.id} />)}
      </div>
    </>
  );
}
