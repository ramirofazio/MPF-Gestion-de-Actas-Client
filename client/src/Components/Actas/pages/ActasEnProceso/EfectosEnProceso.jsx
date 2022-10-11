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
