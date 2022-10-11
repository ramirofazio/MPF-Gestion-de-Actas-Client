import React, { useEffect, useState } from "react";
//* Utils
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getEfectosEnProcesoFiltered, getEfectosFromActa } from "../../../../redux/actions";
//* Styles
import styled from "styled-components";
import GlobalStyles from "../../../../Styles/GlobalStyles";
import Variables from "../../../../Styles/Variables";
import { Search } from "@styled-icons/ionicons-sharp/Search";
import { toast } from "react-toastify";
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
  const { id } = useParams();
  const [state, setState] = useState({
    nroPrecinto: "",
    marca: "",
    actaId: id,
  });
  const dispatch = useDispatch();
  const efectos = useSelector((state) => state.efectosFromActa);

  useEffect(() => {
    dispatch(getEfectosFromActa(id));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.nroPrecinto === "" && state.marca === "") {
      toast.error("Ningun filtro aplicado!");
    } else {
      dispatch(getEfectosEnProcesoFiltered(state)); //* Mando al backend el pedido con filtros
    }
    setState({
      //* Limpio los campos
      nroPrecinto: "",
      marca: "",
    });
  };

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
            <Label>Nro Precinto</Label>
            <Input
              type="text"
              value={state.nroPrecinto}
              onChange={(e) => setState({ ...state, nroPrecinto: e.target.value })}
              maxLength={12}
            />
          </InputContainer>
          <InputContainer>
            <Label>Marca</Label>
            <Input
              type="text"
              value={state.marca}
              onChange={(e) => setState({ ...state, marca: e.target.value })}
              maxLength={15}
            />
          </InputContainer>
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
