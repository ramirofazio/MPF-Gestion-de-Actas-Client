import React, { useEffect, useState } from "react";
//* Utils
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getEfectosFromActa } from "../../../../redux/actions";
//* Styles
import styled from "styled-components";
import GlobalStyles from "../../../../Styles/GlobalStyles";
import Variables from "../../../../Styles/Variables";
import { Search } from "@styled-icons/ionicons-sharp/Search";
//* Components
import EfectosCards from "../../../Utils/EfectosCards";
//* Initializations
const { principalColor, secondaryColor } = Variables;

function EfectosEnProceso() {
  const [state, setState] = useState({
    nroMpf: "",
    nroDil: "",
    nroCij: "",
    //date: "",
  });
  const dispatch = useDispatch();
  const efectos = useSelector((state) => state.efectosFromActa);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getEfectosFromActa(id));
  }, []);

  const handleSubmit = () => {};

  return (
    <Container>
      <Header>
        <Title>Efectos</Title>
        <Description>
          En esta sección poder ver todos los Efectos del Acta. <br /> Selecciona los que quieras completar.
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
      <EfectosCards efectos={efectos} actaId={id} />
    </Container>
  );
}

export default EfectosEnProceso;

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
