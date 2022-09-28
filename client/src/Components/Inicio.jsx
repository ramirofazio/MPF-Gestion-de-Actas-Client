import React from "react";
import styled from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";

function Inicio() {
  return (
    <Container>
      <h1>Inicio</h1>
    </Container>
  );
}

export default Inicio;

const Container = styled.div`
  ${GlobalStyles.container}
`;
