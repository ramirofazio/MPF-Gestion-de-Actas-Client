import React from "react";
import { Link } from "react-router-dom";
//* Style
import styled from "styled-components";
import Variables from "../../Styles/Variables";
import GlobalStyles from "../../Styles/GlobalStyles";
//* Initialization
const { principalColor, yellowColor, redColor, greenColor } = Variables;
const { cardsContainer, cardContainer, cardInfo, cardTitle } = GlobalStyles;

function CreateActasCards({ allActas }) {
  return (
    <>
      <CardsContainer>
        {allActas
          ? allActas.map((acta) => {
              let totalEfectos = 0;
              acta.Bolsas.map((bolsa) => {
                totalEfectos += bolsa.Efectos.length;
              });

              return (
                <ActaContainer to={`/consultas/todas/${acta.id}`} key={acta.id} estado={acta.estado}>
                  <Info>
                    <CardTitle>Fecha</CardTitle>
                    <br />
                    {acta.fecha.slice(0, 10)}
                  </Info>
                  {!acta.nro_coop && (
                    <Info>
                      <CardTitle>MPF</CardTitle>
                      <br />
                      {acta.nro_mpf}
                    </Info>
                  )}
                  {!acta.nro_mpf && (
                    <Info>
                      <CardTitle>COOP</CardTitle>
                      <br />
                      {acta.nro_coop}
                    </Info>
                  )}
                  <Info>
                    <CardTitle>CIJ</CardTitle>
                    <br />
                    {acta.nro_cij}
                  </Info>
                  <Info>
                    <CardTitle>DIL</CardTitle>
                    <br />
                    {acta.nro_dil}
                  </Info>
                  <Info>
                    <CardTitle>Bolsas</CardTitle>
                    <br />
                    {acta.Bolsas.length}
                  </Info>
                  <Info>
                    <CardTitle>Efectos</CardTitle>
                    <br />
                    {totalEfectos}
                  </Info>
                  <Info>
                    <CardTitle>Estado</CardTitle>
                    <br />
                    <Estado estado={acta.estado}>{acta.estado}</Estado>
                  </Info>
                </ActaContainer>
              );
            })
          : null}
      </CardsContainer>
    </>
  );
}

export default CreateActasCards;

const CardsContainer = styled.div`
  ${cardsContainer}
  padding-bottom: 5%;
`;

const ActaContainer = styled(Link)`
  ${cardContainer}
  border: ${(props) =>
    props.estado === "en proceso"
      ? `2px solid ${principalColor}`
      : props.estado === "completo"
      ? `2px solid ${greenColor}`
      : `2px solid ${redColor}`};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.estado === "en proceso" ? "#00647335" : props.estado === "completo" ? "#6aa84f35" : "#a84f4f35"};
  }
`;

const Info = styled.span`
  ${cardInfo}
`;

const CardTitle = styled.strong`
  ${cardTitle}
`;

const Estado = styled.span`
  color: ${(props) =>
    props.estado === "en proceso" ? yellowColor : props.estado === "completo" ? greenColor : redColor};
`;
