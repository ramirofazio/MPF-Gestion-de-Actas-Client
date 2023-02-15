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
    <FilterContainer>
      <Form onSubmit={handleReset}>
        <InputContainer>
          <Label>Nro MPF</Label>
          <Input type="text" value={filters.mpf} onChange={(e) => setFilters({ ...filters, mpf: e.target.value })} maxLength={12} />
        </InputContainer>
        <InputContainer>
          <Label>Nro CIJ</Label>
          <Input type="text" value={filters.cij} onChange={(e) => setFilters({ ...filters, cij: e.target.value })} maxLength={12} />
        </InputContainer>
        <InputContainer>
          <Label>Nro DIL</Label>
          <Input type="text" value={filters.dil} onChange={(e) => setFilters({ ...filters, dil: e.target.value })} maxLength={12} />
        </InputContainer>
        <InputContainer>
          <Label>Estado</Label>
          <Select value={filters.estado} onChange={(e) => setFilters({ ...filters, estado: e.target.value })}>
            <option value="">Todas</option>
            <option value="en proceso">En Proceso</option>
            <option value="completa">Completas</option>
            <option value="en creacion">En Creacion</option>
            <option value="para cerrar">Para Cerrar</option>
          </Select>
        </InputContainer>
        <InputContainer
          style={{
            justifyContent: "flex-end",
            alignItems: "flex-start",
          }}
        >
          <Submit type="submit" />
          <RestoreIcon />
        </InputContainer>
      </Form>
    </FilterContainer>
  );
}

export default ActasFilters;

const FilterContainer = styled.div`
  ${filtersContainer}
`;

const Form = styled.form`
  display: flex;
`;

const InputContainer = styled.div`
  ${filtersInputContainer}
`;

const Label = styled.label`
  ${label}
`;

const Input = styled.input`
  ${filtersInput}
`;

const Select = styled.select`
  ${filtersInput}
`;

const Submit = styled.input`
  ${submitBtn}
`;

const RestoreIcon = styled(SettingsBackupRestore)`
  width: 20%;
  color: ${secondaryColor};
`;
