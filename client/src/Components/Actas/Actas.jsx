import React from "react";
import { NavLink } from "react-router-dom";
//* Styles
import styled, { css } from "styled-components";
import GlobalStyles from "../../Styles/GlobalStyles";
import Variables from "../../Styles/Variables";
import { FileEarmarkPlusFill } from "@styled-icons/bootstrap/FileEarmarkPlusFill";
import { Spinner } from "@styled-icons/icomoon/Spinner";
import { Warning } from "@styled-icons/entypo/Warning";
//* Initialization
const { principalColor, secondaryColor, redColor } = Variables;
const { header, headerTitle, headerDescription, homeCard } = GlobalStyles;

function Actas() {
  return (
    <Container>
      <Header>
        <Title>Actas</Title>
        <Description>En esta sección vas a poder crear Actas y actualizar los estados de cada Efecto.</Description>
      </Header>
      <CardsContainer>
        <Card to="/actas/crear">
          <CardTitle>Crear Nueva Acta</CardTitle>
          <CreateIcon />
        </Card>
        <Card to="/actas/en_proceso">
          <CardTitle>Ver Actas en proceso</CardTitle>
          <SpinnerIcon />
        </Card>
        <Card to="/actas/modificar" warning={true}>
          <CardTitle>Modificar un Acta</CardTitle>
          <WarningIcon />
        </Card>
      </CardsContainer>
    </Container>
  );
}

export default Actas;

const Container = styled.div`
  ${GlobalStyles.container}
  flex-direction: column;
`;

const Header = styled.header`
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
  ${(props) =>
    props.warning &&
    css`
      &:hover {
        border: 2px solid ${redColor};
      }
    `}
`;

const CardTitle = styled.span`
  color: ${secondaryColor};
  font-size: 20px;
  transition: all 0.3s ease;

  ${Card}:hover & {
    font-size: 25px;
  }
`;

const CreateIcon = styled(FileEarmarkPlusFill)`
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
    color: ${principalColor};
  }
`;

const SpinnerIcon = styled(Spinner)`
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
    color: ${principalColor};
    transform: rotate(1turn);
  }
`;

const WarningIcon = styled(Warning)`
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
    color: ${redColor};
  }
`;
