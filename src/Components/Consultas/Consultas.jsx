import React from "react";
import { NavLink } from "react-router-dom";
//* Styles
import styled from "styled-components";
import GlobalStyles from "../../Styles/GlobalStyles";
import Variables from "../../Styles/Variables";
import { DatabaseSearch } from "@styled-icons/fluentui-system-filled/DatabaseSearch";
//* Initializations
const { principalColor, secondaryColor } = Variables;
const { header, headerTitle, homeCard } = GlobalStyles;

function Consultas() {
  return (
    <Container>
      <Header>
        <Title>Consultas</Title>
      </Header>
      <CardsContainer>
        <Card to="/consultas/todas">
          <CardTitle>Todas las Actas</CardTitle>
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
