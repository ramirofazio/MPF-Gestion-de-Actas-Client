import React from "react";
//* Redux
import { useSelector } from "react-redux";
//* Style
import styled from "styled-components";
import GlobalStyles from "../../../../Styles/GlobalStyles";
import Variables from "../../../../Styles/Variables";
//* Initializations
const { redColor } = Variables;
const { enProcesoContainer, header, headerTitle, headerDescription, button } = GlobalStyles;

function AddIntegrantes() {
  const currentActa = useSelector((state) => state.currentActa);

  console.log(currentActa);

  return (
    <Container>
      <Header>
        <p>Acta Nro {currentActa.id}</p>
        <Title>Creacion de Suscriptores</Title>
        <Description>Encabezado</Description>
      </Header>

      <Button>Siguente</Button>
    </Container>
  );
}

export default AddIntegrantes;

const Container = styled.div`
  ${enProcesoContainer}
  padding-bottom: 10px;
`;

const Header = styled.header`
  ${header}
`;

const Title = styled.h1`
  ${headerTitle}
`;

const Description = styled.h1`
  ${headerDescription}
`;

const Button = styled.button`
  ${button}
  text-decoration: none;
  background: white;
  border: 2px solid ${redColor};
  pointer-events: none;
`;
