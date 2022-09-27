import React from "react";
import styled from "styled-components";
import GlobalStyles from "../../../Styles/GlobalStyles";

function Todas() {
  return (
    <Container>
      <h1>Get all Consultas</h1>
    </Container>
  );
}

export default Todas;

const Container = styled.div`
  ${GlobalStyles.container}
  padding-left: 20%;
`;
