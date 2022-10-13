import React from "react";
import { NavLink } from "react-router-dom";
//* Style
import styled from "styled-components";
import Variables from "../../Styles/Variables";
import GlobalStyles from "../../Styles/GlobalStyles";
import { BoxArrowInUpRight } from "@styled-icons/bootstrap/BoxArrowInUpRight";
//* Initialization
const { secondaryColor } = Variables;
const { cardsContainer, cardContainer, cardInfo, cardTitle } = GlobalStyles;

function ActasCards({ actas }) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es", options);
  };

  return (
    <CardsContainer>
      {actas
        ? actas.map((acta) => {
            let cantEfectosCompletos = 0;
            let cantEfectos = 0;
            acta.Bolsas.map((bolsa) => (cantEfectos += bolsa.Efectos.length));
            acta.Bolsas.map((bolsa) =>
              bolsa.Efectos.map((efecto) => (cantEfectosCompletos += efecto.estado === "completo"))
            );

            return (
              <ActaContainer to={`/efectos/en_proceso/${acta.id}`} key={acta.id}>
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
                  <CardTitle>Efectos</CardTitle>
                  <br />
                  {`${cantEfectosCompletos}/${cantEfectos}`}
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
