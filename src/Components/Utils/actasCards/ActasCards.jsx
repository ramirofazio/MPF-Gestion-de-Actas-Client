import React from "react";
import { Link } from "react-router-dom";
//* Style
import styled from "styled-components";
import GlobalStyles from "../../../Styles/GlobalStyles";
//* Utils
import ActaCard from "./ActaCard";
//* Initialization
const { cardsContainer, button } = GlobalStyles;

function ActasCards({ allActas, typeOfCard }) {
  const actasToRender = allActas.filter((actas) => actas.estado !== "deprecada");

  const loadLocalStorage = () => {
    localStorage.setItem("actaFlag", "");
    localStorage.setItem("currentActa", JSON.stringify([]));
    localStorage.setItem("currentIntegrantes", JSON.stringify([]));
    localStorage.setItem("currentPeritos", JSON.stringify([]));
    localStorage.setItem("currentBolsas", JSON.stringify([]));
    localStorage.setItem("currentEfectos", JSON.stringify([]));
  };
  return (
    <>
      <CardsContainer>
        {actasToRender && actasToRender.map((acta) => <ActaCard acta={acta} type={typeOfCard} key={acta.id} />)}
      </CardsContainer>
      <Button to="/actas/crear/1" onClick={() => loadLocalStorage()}>
        Crear Acta
      </Button>
    </>
  );
}

export default ActasCards;

const CardsContainer = styled.div`
  ${cardsContainer}
  padding-bottom: 5%;
`;

const Button = styled(Link)`
  ${button}
  position: absolute;
  bottom: 0;
  margin-bottom: 10px;
  background-color: white;
  text-decoration: none;
`;
