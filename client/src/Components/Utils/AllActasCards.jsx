import React from "react";
import { NavLink } from "react-router-dom";
//* Style
import styled from "styled-components";
import Variables from "../../Styles/Variables";
import GlobalStyles from "../../Styles/GlobalStyles";
import { BoxArrowInUpRight } from "@styled-icons/bootstrap/BoxArrowInUpRight";
//* Initialization
const { principalColor, secondaryColor, yellowColor, redColor, greenColor } = Variables;
const { cardsContainer, cardContainer, cardInfo, cardTitle } = GlobalStyles;

function ActasCards({ allActas }) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es", options);
  };

  return (
    <CardsContainer>
      {allActas
        ? allActas.map((acta) => {
            let cantBolsasCompletas = 0;
            let cantBolsas = 0;
            let cantEfectosCompletos = 0;
            let cantEfectos = 0;
            acta.Bolsas.map((bolsa) => {
              cantBolsas++;
              cantEfectos += bolsa.Efectos.length;
            });
            acta.Bolsas.map((bolsa) => {
              bolsa.estado === "completo" ? cantBolsasCompletas++ : null;
              bolsa.Efectos.map((efecto) => (cantEfectosCompletos += efecto.estado === "completo"));
            });

            return (
              <ActaContainer to={`/consultas/todas/${acta.id}`} key={acta.id} estado={acta.estado}>
                <Info>
                  <CardTitle>Fecha</CardTitle>
                  <br />
                  {formatDate(acta.created_at)}
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
                  {`${cantBolsasCompletas}/${cantBolsas}`}
                </Info>
                <Info>
                  <CardTitle>Efectos</CardTitle>
                  <br />
                  {`${cantEfectosCompletos}/${cantEfectos}`}
                </Info>
                <Info>
                  <CardTitle>Estado</CardTitle>
                  <br />
                  <Estado estado={acta.estado}>{acta.estado}</Estado>
                </Info>
                <Icon />
              </ActaContainer>
            );
          })
        : null}
    </CardsContainer>
  );
}

export default ActasCards;

const CardsContainer = styled.div`
  ${cardsContainer}
`;

const ActaContainer = styled(NavLink)`
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

const Icon = styled(BoxArrowInUpRight)`
  width: 20px;
  margin-right: 40px;
  color: ${secondaryColor};
  transition: all 0.3s ease;

  &:hover {
    color: black;
    cursor: pointer;
  }
`;

const Estado = styled.span`
  color: ${(props) =>
    props.estado === "en proceso" ? yellowColor : props.estado === "completo" ? greenColor : redColor};
`;
