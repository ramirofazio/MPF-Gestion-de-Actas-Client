import React from "react";
import styled from "styled-components";
import Variables from "../../Styles/Variables";
import { BoxArrowInUpRight } from "@styled-icons/bootstrap/BoxArrowInUpRight";
import { NavLink } from "react-router-dom";

const { principalColor, secondaryColor, baseTransparentColor } = Variables;
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
                  <strong style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}>Fecha</strong>
                  <br />
                  {formatDate(acta.created_at)}
                </Info>
                {!acta.nro_coop && (
                  <Info>
                    <strong style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}>MPF</strong>
                    <br />
                    {acta.nro_mpf}
                  </Info>
                )}
                {!acta.nro_mpf && (
                  <Info>
                    <strong style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}>COOP</strong>
                    <br />
                    {acta.nro_coop}
                  </Info>
                )}
                <Info>
                  <strong style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}>CIJ</strong>
                  <br />
                  {acta.nro_cij}
                </Info>
                <Info>
                  <strong style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}>DIL</strong>
                  <br />
                  {acta.nro_dil}
                </Info>
                <Info>
                  <strong style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}>Efectos</strong>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-height: 70%;
  min-height: 70%;
  border-top: 2px solid ${principalColor};
  overflow-y: scroll;
  padding-block: 10px;
`;

const ActaContainer = styled(NavLink)`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 90%;
  min-height: 12%;
  margin-top: 5px;
  border: 2px solid ${principalColor};
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    min-height: 14%;
    background-color: ${baseTransparentColor};
  }
`;

const Info = styled.span`
  flex: 1;
  color: ${secondaryColor};
  text-align: center;
  text-transform: capitalize;
  font-size: 15px;
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
