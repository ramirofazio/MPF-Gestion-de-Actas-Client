import React from "react";
import styled from "styled-components";
import GlobalStyles from "../../Styles/GlobalStyles";
import ClipLoader from "react-spinners/ClipLoader";

function Fallback() {
  return (
    <Container>
      <Title>Cargando</Title>
      <ClipLoader color={"black"} size={60} loading={true} />
    </Container>
  );
}

export default Fallback;

const Container = styled.div`
  ${GlobalStyles.container}
  flex-direction: column;
`;

const Title = styled.h2`
  color: black;
`;
