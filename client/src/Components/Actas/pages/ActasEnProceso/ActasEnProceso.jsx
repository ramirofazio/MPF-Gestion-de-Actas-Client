import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActasEnProceso, getActasEnProcesoFiltered } from "../../../../redux/actions";
//* Styles
import styled from "styled-components";
import GlobalStyles from "../../../../Styles/GlobalStyles";
import Variables from "../../../../Styles/Variables";
import { Search } from "@styled-icons/ionicons-sharp/Search";
import { toast } from "react-toastify";
//* Utils
import ActasCards from "../../../Utils/ActasCards";
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
  const actas = useSelector((state) => state.actasEnProceso);

  const [state, setState] = useState({
    nroMpf: "",
    nroDil: "",
    nroCij: "",
    //date: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActasEnProceso());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.nroMpf === "" && state.nroCij === "" && state.nroDil === "") {
      toast.error("Ningun filtro aplicado!");
    } else {
      dispatch(getActasEnProcesoFiltered(state)); //* Mando al backend el pedido con filtros
    }
    setState({
      //* Limpio los campos
      nroMpf: "",
      nroDil: "",
      nroCij: "",
      //date: "",
    });
  };

  return (
    <Container>
      <Header>
        <Title>Actas en Proceso</Title>
        <Description>
          En esta sección poder ver todos las Actas en proceso. <br /> Selecciona la que quieras para ver sus Efectos.
        </Description>
      </Header>
      <FilterContainer>
        <Form onSubmit={handleSubmit}>
          <InputContainer>
            <Label>Nro MPF</Label>
            <Input
              type="text"
              value={state.nroMpf}
              onChange={(e) => setState({ ...state, nroMpf: e.target.value })}
              maxLength={12}
            />
          </InputContainer>
          <InputContainer>
            <Label>Nro CIJ</Label>
            <Input
              type="text"
              value={state.nroCij}
              onChange={(e) => setState({ ...state, nroCij: e.target.value })}
              maxLength={12}
            />
          </InputContainer>
          <InputContainer>
            <Label>Nro DIL</Label>
            <Input
              type="text"
              value={state.nroDil}
              onChange={(e) => setState({ ...state, nroDil: e.target.value })}
              maxLength={12}
            />
          </InputContainer>
          {/* <InputContainer>
            <InputDate
              type="date"
              value={state.date}
              onChange={(e) => setState({ ...state, date: e.target.value })}
            />
          </InputContainer> */}
          <InputContainer
            style={{
              justifyContent: "flex-end",
              alignItems: "flex-start",
            }}
          >
            <Submit type="submit" />
            <SearchIcon />
          </InputContainer>
        </Form>
      </FilterContainer>
      <ActasCards actas={actas} />
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

const SearchIcon = styled(Search)`
  width: 20%;
  color: ${secondaryColor};
`;
