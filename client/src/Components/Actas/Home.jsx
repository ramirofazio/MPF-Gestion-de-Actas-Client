import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllActas, getActasFiltered } from "../../redux/actions";
//* Styles
import styled from "styled-components";
import GlobalStyles from "../../Styles/GlobalStyles";
import Variables from "../../Styles/Variables";
import { toast } from "react-toastify";
import { SettingsBackupRestore } from "@styled-icons/material-rounded/SettingsBackupRestore";
//* Utils
import CreateActasCards from "../Utils/CreateActasCards";
//* Initializations
const { secondaryColor } = Variables;
const {
  enProcesoContainer,
  header,
  headerTitle,
  filtersContainer,
  filtersInputContainer,
  label,
  filtersInput,
  submitBtn,
} = GlobalStyles;

function Home() {
  const dispatch = useDispatch();

  const allActas = useSelector((s) => s?.allActas); //* Me todas las actas

  const [filter, setFilter] = React.useState({
    //* Estado inicial de los filtros
    nroMpf: "",
    nroDil: "",
    nroCij: "",
    estado: "",
  });

  React.useEffect(() => {
    dispatch(getAllActas()); // * Pido todas las actas
    localStorage.clear(); // * Limpio el localStorage
  }, []);

  React.useEffect(() => {
    dispatch(getActasFiltered(filter)); //* Pido las actas filtradas cuando cambia el estado de filter
  }, [filter]);

  const handleReset = (e) => {
    e.preventDefault();
    setFilter({
      //* Limpio los campos
      mpf: "",
      dil: "",
      cij: "",
    });
    toast.success("Actas actualizados");
  };

  return (
    <Container>
      <Header>
        <Title>Creación de Actas</Title>
      </Header>
      <FilterContainer>
        <Form onSubmit={handleReset}>
          <InputContainer>
            <Label>Nro MPF</Label>
            <Input
              type="text"
              value={filter.mpf}
              onChange={(e) => setFilter({ ...filter, mpf: e.target.value })}
              maxLength={12}
            />
          </InputContainer>
          <InputContainer>
            <Label>Nro CIJ</Label>
            <Input
              type="text"
              value={filter.cij}
              onChange={(e) => setFilter({ ...filter, cij: e.target.value })}
              maxLength={12}
            />
          </InputContainer>
          <InputContainer>
            <Label>Nro DIL</Label>
            <Input
              type="text"
              value={filter.dil}
              onChange={(e) => setFilter({ ...filter, dil: e.target.value })}
              maxLength={12}
            />
          </InputContainer>
          <InputContainer>
            <Label>Estado</Label>
            <Select value={filter.estado} onChange={(e) => setFilter({ ...filter, estado: e.target.value })}>
              <option value="">Todas</option>
              <option value="en proceso">En Proceso</option>
              <option value="completo">Completas</option>
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
      <CreateActasCards allActas={allActas} />
    </Container>
  );
}

export default Home;

const Container = styled.div`
  ${enProcesoContainer}
`;

const Header = styled.header`
  ${header}
`;

const Title = styled.h1`
  ${headerTitle}
`;

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
