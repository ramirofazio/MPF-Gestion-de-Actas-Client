import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import GlobalStyles from "../../Styles/GlobalStyles";
import Variables from "../../Styles/Variables";
import { DatabaseSearch } from "@styled-icons/fluentui-system-filled/DatabaseSearch";
import { CalendarSearch } from "@styled-icons/fluentui-system-filled/CalendarSearch";

const { principalColor, secondaryColor } = Variables;
const { header, headerTitle, headerDescription, homeCard } = GlobalStyles;

function Consultas() {
  return (
    <Container>
      <Header>
        <Title>Consultas</Title>
        <Description>
          En esta sección vas a poder consultar el historial de Actas. <br /> Elegi una opcion para buscar!
        </Description>
      </Header>
      <CardsContainer>
        <Card to="/consultas/todas">
          <CardTitle>Todas las Actas</CardTitle>
          <DbIcon />
        </Card>
        <Card to="/consultas/fecha">
          <CardTitle>Por Fecha</CardTitle>
          <CalendarIcon />
        </Card>
        <Card to="/consultas/nro_mpf">
          <CardTitle>Por Nro MPF</CardTitle>
          <DbIcon />
        </Card>
        <Card to="/consultas/nro_Cij">
          <CardTitle>Por Nro CIJ</CardTitle>
          <DbIcon />
        </Card>
      </CardsContainer>
    </Container>
  );
}

export default Consultas;

const Container = styled.div`
  ${GlobalStyles.container}
  flex-direction: column;
`;

const Header = styled.div`
  ${header}
`;

const Title = styled.span`
  ${headerTitle}
`;

const Description = styled.span`
  ${headerDescription}
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
  ${homeCard}
`;

const CardTitle = styled.span`
  color: ${secondaryColor};
  font-size: 20px;
  transition: all 0.3s ease;

  ${Card}:hover & {
    font-size: 25px;
  }
`;

const DbIcon = styled(DatabaseSearch)`
  width: 30px;
  margin-right: 40px;
  color: ${secondaryColor};
  transition: all 0.3s ease;

  &:hover {
    color: black;
    cursor: pointer;
  }

  ${Card}:hover & {
    width: 40px;
    color: ${principalColor};
  }
`;

const CalendarIcon = styled(CalendarSearch)`
  width: 30px;
  margin-right: 40px;
  color: ${secondaryColor};
  transition: all 0.3s ease;

  &:hover {
    color: black;
    cursor: pointer;
  }

  ${Card}:hover & {
    width: 40px;
    color: ${principalColor};
  }
`;
