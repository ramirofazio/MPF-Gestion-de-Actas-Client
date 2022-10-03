import React from "react";
import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
//* Utils
import GlobalStyles from "../../Styles/GlobalStyles";
import Variables from "../../Styles/Variables";
import { FileEarmarkPlusFill } from "@styled-icons/bootstrap/FileEarmarkPlusFill";
import { Spinner } from "@styled-icons/icomoon/Spinner";
import { Warning } from "@styled-icons/entypo/Warning";

import { generateDocument } from "./generateDoc";

const { principalColor, secondaryColor, baseTransparentColor, redColor } = Variables;

function Actas() {
  return (
    <Container>
      <Header>
        <Title>Actas</Title>
        <Description>
          En esta sección vas a poder crear Actas y actualizar los estados de cada Efecto.
        </Description>
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
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  flex: 0.2;
`;

const Title = styled.span`
  color: ${principalColor};
  font-size: 50px;
  text-decoration: underline;
  text-decoration-thickness: 2px;
`;

const Description = styled.span`
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
    max-height: 16%;
    width: 65%;
    background-color: ${baseTransparentColor};
  }

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
  }
`;
