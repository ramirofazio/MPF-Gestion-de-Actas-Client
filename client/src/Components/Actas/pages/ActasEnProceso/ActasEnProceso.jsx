import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
//Utils
import GlobalStyles from "../../../../Styles/GlobalStyles";
import Variables from "../../../../Styles/Variables";
//Initializations
const { principalColor, secondaryColor, baseTransparentColor } = Variables;

function ActasEnProceso() {
  return (
    <Container>
      <Header>
        <Title>Actas en Proceso</Title>
        <Description>
          En esta sección poder ver todos las Actas en proceso. <br /> Selecciona la que quieras
          para ver sus Efectos.
        </Description>
      </Header>
      <CardsContainer>
        <ActaContainer to="/actas/efectos">
          <Info>
            <strong style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}>
              Nro Precinto
            </strong>
            <br />
          </Info>
        </ActaContainer>
      </CardsContainer>
    </Container>
  );
}

export default ActasEnProceso;

const Container = styled.div`
  ${GlobalStyles.container}
  flex-direction: column;
  justify-content: space-around;
`;

const Header = styled.header`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  flex: 0.2;
`;

const Title = styled.h1`
  color: ${principalColor};
  font-size: 50px;
  text-decoration: underline;
  text-decoration-thickness: 2px;
`;

const Description = styled.p`
  color: ${secondaryColor};
  text-align: center;
  font-size: 18px;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;
  max-height: 70%;
`;

const ActaContainer = styled(NavLink)`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 95%;
  flex: 1;
  min-height: 5%;
  max-height: 8%;
  margin-top: 5px;
  border: 2px solid ${principalColor};
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    max-height: 12%;
    background-color: ${baseTransparentColor};
  }
`;

const Info = styled.span`
  flex: 1;
  color: ${secondaryColor};
  text-align: center;
  text-transform: capitalize;
`;
