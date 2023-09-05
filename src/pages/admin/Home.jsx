import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllActas } from "../../redux/actions";
//* Styles
import { StatsChart } from "@styled-icons/ionicons-sharp/StatsChart";
import { FileRemove } from "@styled-icons/evaicons-solid/FileRemove";
//*
import * as XLSX from "xlsx";

function flatten(obj, prefix = "") {
  if (!obj || typeof obj !== "object") {
    return {};
  }
  return Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? prefix + "_" : "";
    if (Array.isArray(obj[k])) {
      obj[k].forEach((item, index) => {
        Object.assign(acc, flatten(item, `${pre}${k}_${index}`));
      });
    } else if (typeof obj[k] === "object") {
      Object.assign(acc, flatten(obj[k], pre + k));
    } else {
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {});
}

const convertirJSONaExcel = (allActas) => {
  if (!Array.isArray(allActas)) {
    return;
  }
  const flatData = allActas.map((a) => flatten(a));
  const worksheet = XLSX.utils.json_to_sheet(flatData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja 1");
  XLSX.writeFile(workbook, "Gestion_de_actas_DB.xlsx");
};

export function Home() {
  const dispatch = useDispatch();

  const allActas = useSelector((s) => s.allActas);

  React.useEffect(() => {
    dispatch(getAllActas());
  }, []);

  return (
    <div className="paddingLeftContainer">
      <header data-aos="fade-down" className="header">
        <span className="headerTitle">Panel de Administrador</span>
      </header>
      <div className="flex h-[85vh] w-full flex-col items-center justify-center overflow-x-hidden overflow-y-scroll border-t-[3px] border-t-principal">
        <NavLink data-aos="zoom-in" className="adminCards group" to="#" onClick={() => convertirJSONaExcel(allActas)}>
          <span className="text-xl text-secondary group-hover:text-principal">Exportar DB</span>
          <StatsChart className="icons w-8 group-hover:text-principal" />
        </NavLink>
        <NavLink data-aos="zoom-in" className="adminCards group" to="/admin/eliminarActa">
          <span className="text-xl text-secondary group-hover:text-principal">Eliminar un Acta</span>
          <FileRemove className="icons w-8 group-hover:text-principal" />
        </NavLink>
      </div>
    </div>
  );
}
