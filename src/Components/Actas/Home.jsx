import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllActas, clearStates } from "../../redux/actions";
//* Styles
import styled from "styled-components";
import GlobalStyles from "../../Styles/GlobalStyles";
//* Utils
import CreateActasCards from "../Utils/CreateActasCards";
import ActasFilters from "../Utils/filters/ActasFilters";
//* Initializations
const { enProcesoContainer, header, headerTitle } = GlobalStyles;

function Home() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(clearStates()); //* Limpio redux
    dispatch(getAllActas()); // * Pido todas las actas
    localStorage.clear(); // * Limpio el localStorage
  }, []);

  const allActas = useSelector((s) => s?.allActas); //* Me traigo todas las actas

  return (
    <Container>
      <Header>
        <Title>Creación de Actas</Title>
      </Header>
      <ActasFilters />
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
