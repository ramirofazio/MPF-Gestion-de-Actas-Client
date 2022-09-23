import React from "react";
import styled from "styled-components";
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
`;

const Title = styled.h2`
  color: black;
`;
