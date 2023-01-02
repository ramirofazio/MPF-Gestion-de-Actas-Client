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
  const actasToRender = allActas.filter((actas) => actas.estado !== "deprecado");

  return (
    <>
      <CardsContainer>
        {actasToRender && actasToRender.map((acta) => <ActaCard acta={acta} type={typeOfCard} key={acta.id} />)}
      </CardsContainer>
      <Button to="/actas/crear/1">Crear Acta</Button>
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
