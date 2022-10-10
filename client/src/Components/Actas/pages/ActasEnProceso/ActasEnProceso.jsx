import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActasEnProceso, getActasEnProcesoFiltered } from "../../../../redux/actions";
//* Styles
import styled from "styled-components";
import GlobalStyles from "../../../../Styles/GlobalStyles";
import Variables from "../../../../Styles/Variables";
import { Search } from "@styled-icons/ionicons-sharp/Search";
import { toast } from "react-toastify";
//*
import ActasCards from "../../../Utils/ActasCards";
//* Initializations
const { principalColor, secondaryColor } = Variables;

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
  ${GlobalStyles.container}
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.header`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  flex: 0.2;
`;

const Title = styled.h1`
  color: ${principalColor};
  font-size: 50px;
  text-decoration: underline;
  text-decoration-thickness: 2px;
`;

const Description = styled.p`
  color: ${secondaryColor};
  text-align: center;
  font-size: 16px;
`;

const FilterContainer = styled.div`
  width: 95%;
  margin-bottom: -30px;
`;

const Form = styled.form`
  display: flex;
`;

const InputContainer = styled.div`
  display: flex;
  width: 10%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const Label = styled.label`
  font-size: 13px;
  margin-bottom: 2px;
  color: ${secondaryColor};
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  text-align: center;
  border: 1px solid ${principalColor};
  border-radius: 5px;

  &:focus {
    outline: none;
  }
`;

const Submit = styled.input`
  position: absolute;
  width: 2%;
  opacity: 0;

  &:hover {
    cursor: pointer;
  }
`;

const SearchIcon = styled(Search)`
  width: 20%;
  color: ${secondaryColor};
`;

