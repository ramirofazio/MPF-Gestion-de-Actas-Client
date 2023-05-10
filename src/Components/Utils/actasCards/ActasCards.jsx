import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
//* Style
import styled from "styled-components";
import GlobalStyles from "../../../Styles/GlobalStyles";
//* Utils
import ActaCard from "./ActaCard";
//* Initialization
const { cardsContainer, button } = GlobalStyles;

function ActasCards({ allActas, typeOfCard }) {
  const currentUser = useSelector((s) => JSON.parse(localStorage.getItem("currentUser")) || s.currentUser);
  let actasToRender = allActas.filter((a) => a.estado !== "deprecada");

  if (currentUser.username !== "admin") {
    actasToRender = allActas.filter((a) => a.Peritos[0].nombreYApellido === currentUser.nombreYApellido);
  }

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
        {typeOfCard === "remove"
          ? allActas && allActas.map((acta) => <ActaCard acta={acta} type={typeOfCard} key={acta.id} />)
          : actasToRender && actasToRender.map((acta) => <ActaCard acta={acta} type={typeOfCard} key={acta.id} />)}
      </CardsContainer>
      {typeOfCard !== "remove" && (
        <Button to="/actas/crear/1" onClick={() => loadLocalStorage()}>
          Crear Acta
        </Button>
      )}
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
