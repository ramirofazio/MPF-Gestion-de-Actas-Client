import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import GlobalStyles from "../../Styles/GlobalStyles";
import Variables from "../../Styles/Variables";

const { principalColor, secondaryColor, baseTransparentColor } = Variables;

function Consultas() {
  return (
    <Container>
      <Header>
        <Title>Consultas</Title>
        <Description>
          En esta sección vas a poder consultar el historial de Actas. <br /> Elegi una opcion para
          buscar!
        </Description>
      </Header>
      <CardsContainer>
        <Card to="/consultas/todas">
          <CardTitle>Todas</CardTitle>
        </Card>
        <Card to="/consultas/nro_mpf">
          <CardTitle>Numero MPF</CardTitle>
        </Card>
        <Card to="/consultas/nro_Cij">
          <CardTitle>Numero CIJ</CardTitle>
        </Card>
      </CardsContainer>
    </Container>
  );
}

export default Consultas;

const Container = styled.div`
  ${GlobalStyles.container}
  flex-direction: column;
  padding-left: 20%;
`;

const Header = styled.div`
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
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 80%;
  flex: 1;
  max-height: 70%;
`;

const Card = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-width: 40%;
  max-width: 50%;
  height: 25%;
  margin-inline: 20px;
  border-radius: 15px;
  text-decoration: none;
  border: 2px solid ${principalColor};
  transition: all 0.5s ease;
  box-shadow: 1px 2px 15px ${secondaryColor};

  &:hover {
    background-color: ${baseTransparentColor};
    border: 2px solid ${secondaryColor};
    box-shadow: none;
  }
`;

const CardTitle = styled.h4`
  color: ${secondaryColor};
  font-size: 20px;
  transition: all 1s ease;
`;
