import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import GlobalStyles from "../../Styles/GlobalStyles";
import Variables from "../../Styles/Variables";
import { DatabaseSearch } from "@styled-icons/fluentui-system-filled/DatabaseSearch";

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
          <Icon />
        </Card>
        <Card to="/consultas/nro_mpf">
          <CardTitle>Numero MPF</CardTitle>
          <Icon />
        </Card>
        <Card to="/consultas/nro_Cij">
          <CardTitle>Numero CIJ</CardTitle>
          <Icon />
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  flex: 1;
  max-height: 70%;
`;

const Card = styled(NavLink)`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60%;
  flex: 1;
  padding-left: 20px;
  min-height: 10%;
  max-height: 15%;
  margin-top: 5px;
  border: 2px solid ${principalColor};
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    max-height: 18%;
    width: 70%;
    background-color: ${baseTransparentColor};
  }
`;

const CardTitle = styled.h4`
  color: ${secondaryColor};
  font-size: 20px;
  transition: all 0.5s ease;

  ${Card}:hover & {
    font-size: 25px;
  }
`;

const Icon = styled(DatabaseSearch)`
  width: 30px;
  margin-right: 40px;
  color: ${secondaryColor};
  transition: all 0.5s ease;

  &:hover {
    color: black;
    cursor: pointer;
  }

  ${Card}:hover & {
    width: 40px;
  }
`;
