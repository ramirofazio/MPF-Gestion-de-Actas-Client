import React from "react";
import styled from "styled-components";
import GlobalStyles from "../../Styles/GlobalStyles";
import { generateDocument } from "./generateDoc";

function CrearActa() {
  return (
    <Container>
      <button onClick={generateDocument}></button>
    </Container>
  );
}

export default CrearActa;

const Container = styled.div`
  ${GlobalStyles.container}
  padding-left: 20%;
`;
