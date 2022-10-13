import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActasEnProceso, getActasEnProcesoFiltered } from "../../../../redux/actions";
//* Styles
import styled from "styled-components";
import GlobalStyles from "../../../../Styles/GlobalStyles";
import Variables from "../../../../Styles/Variables";
import { SettingsBackupRestore } from "@styled-icons/material-rounded/SettingsBackupRestore";
import { toast } from "react-toastify";
//* Utils
import ActasEnProcesoCards from "../../../Utils/ActasEnProcesoCards";
//* Initializations
const { secondaryColor } = Variables;
const {
  enProcesoContainer,
  header,
  headerTitle,
  headerDescription,
  filtersContainer,
  filtersInputContainer,
  label,
  filtersInput,
  submitBtn,
} = GlobalStyles;

function ActasEnProceso() {
  const actas = useSelector((state) => state?.actasEnProceso);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    mpf: "",
    dil: "",
    cij: "",
  });

  useEffect(() => {
    dispatch(getActasEnProceso());
  }, []);

  useEffect(() => {
    dispatch(getActasEnProcesoFiltered(state));
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
        <Title>Actas en Proceso</Title>
        <Description>
          En esta sección poder ver todas las Actas en proceso. <br /> Selecciona la que quieras para ver sus Efectos.
        </Description>
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
      <ActasEnProcesoCards actas={actas} />
    </Container>
  );
}

export default ActasEnProceso;

const Container = styled.div`
  ${enProcesoContainer}
`;

const Header = styled.header`
  ${header}
`;

const Title = styled.h1`
  ${headerTitle}
`;

const Description = styled.p`
  ${headerDescription}
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

const Submit = styled.input`
  ${submitBtn}
`;

const RestoreIcon = styled(SettingsBackupRestore)`
  width: 20%;
  color: ${secondaryColor};
`;
