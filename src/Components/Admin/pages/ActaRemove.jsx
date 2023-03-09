import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllActas, clearStates, admin } from "../../../redux/actions";
//* Styles
import styled from "styled-components";
import GlobalStyles from "../../../Styles/GlobalStyles";
//* Utils
import ActasCards from "../../Utils/actasCards/ActasCards";
import ActasFilters from "../../Utils/filters/ActasFilters";
//* Initializations
const { enProcesoContainer, header, headerTitle } = GlobalStyles;

function ActaRemoev() {
  const dispatch = useDispatch();

  const allActas = useSelector((s) => s.allActas); //* Me traigo todas las actas
  const adminState = useSelector((s) => s.admin);

  React.useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const users = JSON.parse(localStorage.getItem("users"));
    if (currentUser) {
      if (adminState) {
        localStorage.clear();
        dispatch(clearStates());
        dispatch(getAllActas());
        dispatch(admin());
      } else {
        localStorage.clear();
        dispatch(clearStates());
        dispatch(getAllActas());
      }
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, []);

  return (
    <Container>
      <Header>
        <Title>Eliminar un Acta</Title>
      </Header>
      <ActasFilters />
      <ActasCards allActas={allActas} typeOfCard={"remove"} />
    </Container>
  );
}

export default ActaRemoev;

const Container = styled.div`
  ${enProcesoContainer}
`;

const Header = styled.header`
  ${header}
`;

const Title = styled.h1`
  ${headerTitle}
`;
