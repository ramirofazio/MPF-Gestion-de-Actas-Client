import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllActas, getActasFiltered } from "../../../../redux/actions";
//* Styles
import styled from "styled-components";
import GlobalStyles from "../../../../Styles/GlobalStyles";
import Variables from "../../../../Styles/Variables";
import { SettingsBackupRestore } from "@styled-icons/material-rounded/SettingsBackupRestore";
import { toast } from "react-toastify";
//* Utlis
import CreateActasCards from "../../../Utils/CreateActasCards";
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
  const allActas = useSelector((state) => state?.allActas);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    nroMpf: "",
    nroDil: "",
    nroCij: "",
    estado: "",
  });

  useEffect(() => {
    dispatch(getAllActas()); // * Pido todas las actas
  }, []);

  useEffect(() => {
    dispatch(getActasFiltered(state));
  }, [state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setState({
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
        <Form onSubmit={handleSubmit}>
          <InputContainer>
            <Label>Nro MPF</Label>
            <Input
              type="text"
              value={state.mpf}
              onChange={(e) => setState({ ...state, mpf: e.target.value })}
              maxLength={12}
            />
          </InputContainer>
          <InputContainer>
            <Label>Nro CIJ</Label>
            <Input
              type="text"
              value={state.cij}
              onChange={(e) => setState({ ...state, cij: e.target.value })}
              maxLength={12}
            />
          </InputContainer>
          <InputContainer>
            <Label>Nro DIL</Label>
            <Input
              type="text"
              value={state.dil}
              onChange={(e) => setState({ ...state, dil: e.target.value })}
              maxLength={12}
            />
          </InputContainer>
          <InputContainer>
            <Label>Estado</Label>
            <Select value={state.estado} onChange={(e) => setState({ ...state, estado: e.target.value })}>
              <Option value="">Todas</Option>
              <Option value="en proceso">En Proceso</Option>
              <Option value="completo">Completas</Option>
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

const Option = styled.option``;

const Submit = styled.input`
  ${submitBtn}
`;

const RestoreIcon = styled(SettingsBackupRestore)`
  width: 20%;
  color: ${secondaryColor};
`;
