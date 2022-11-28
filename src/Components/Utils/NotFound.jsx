import React from "react";
import styled from "styled-components";
import GlobalStyles from "../../Styles/GlobalStyles";

const { container } = GlobalStyles;

function NotFound() {
  return (
    <Container>
      ¡Ruta no encontrada! <br /> :(
    </Container>
  );
}

export default NotFound;

const Container = styled.div`
  ${container}
  justify-content: center;
  font-size: x-large;
  text-align: center;
`;
