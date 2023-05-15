import React from "react";
import { useDispatch } from "react-redux";
import { getActasFiltered } from "../../../redux/actions";
//* Styles
import styled from "styled-components";
import GlobalStyles from "../../../Styles/GlobalStyles";
import Variables from "../../../Styles/Variables";
import { SettingsBackupRestore } from "@styled-icons/material-rounded/SettingsBackupRestore";
import { toast } from "react-toastify";
//*
const { secondaryColor } = Variables;
const { filtersContainer, filtersInputContainer, label, filtersInput, submitBtn } = GlobalStyles;

function ActasFilters() {
  const dispatch = useDispatch();

  const [filters, setFilters] = React.useState({
    //* Estado inicial de los filtros
    nroMpf: "",
    nroDil: "",
    nroCij: "",
    estado: "",
  });

  React.useEffect(() => {
    dispatch(getActasFiltered(filters)); //* Pido las actas filtradas cuando cambia el estado de filter
  }, [filters]);

  const handleReset = (e) => {
    e.preventDefault();
    setFilters({
      //* Limpio los campos
      mpf: "",
      dil: "",
      cij: "",
    });
    toast.success("Actas actualizados");
  };

  return (
    <>
      <form className="ml-5 flex w-[50%] justify-around self-start">
        <div className="filterInputContainer">
          <label className="basicLabel">Nro MPF</label>
          <input
            className="filterInput"
            type="number"
            value={filters.mpf}
            onChange={(e) => setFilters({ ...filters, mpf: e.target.value })}
            maxLength={12}
          />
        </div>
        <div className="filterInputContainer">
          <label className="basicLabel">Nro CIJ</label>
          <input
            className="filterInput"
            type="number"
            value={filters.cij}
            onChange={(e) => setFilters({ ...filters, cij: e.target.value })}
            maxLength={12}
          />
        </div>
        <div className="filterInputContainer">
          <label className="basicLabel">Nro DIL</label>
          <input
            className="filterInput"
            type="number"
            value={filters.dil}
            onChange={(e) => setFilters({ ...filters, dil: e.target.value })}
            maxLength={12}
          />
        </div>
        <div className="filterInputContainer">
          <label className="basicLabel">Estado</label>
          <select className="filterInput" value={filters.estado} onChange={(e) => setFilters({ ...filters, estado: e.target.value })}>
            <option value="">Todas</option>
            <option value="en proceso">En Proceso</option>
            <option value="completa">Completas</option>
            <option value="en creacion">En Creacion</option>
            <option value="para completar">Para completar</option>
          </select>
        </div>
        <div className="flex w-24 items-center">
          <SettingsBackupRestore className="transition hover:cursor-pointer hover:text-secondary" size={25} onClick={handleReset} />
        </div>
      </form>
    </>
  );
}

export default ActasFilters;
