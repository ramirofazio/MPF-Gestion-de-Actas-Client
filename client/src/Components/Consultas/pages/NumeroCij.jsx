import React from "react";
import styled from "styled-components";
import GlobalStyles from "../../../Styles/GlobalStyles";

function NumeroCij() {

  return (
    <Container>
    <h1>Actas CIJ</h1>
    </Container>
  );
}

export default NumeroCij;

const Container = styled.div`
  ${GlobalStyles.container}
  padding-left: 20%;
`;

