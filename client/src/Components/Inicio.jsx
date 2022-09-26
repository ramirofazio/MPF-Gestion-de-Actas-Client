import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllActas } from "../redux/actions";
import styled from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";

function Inicio() {
  const dispatch = useDispatch();

  const actas = useSelector((state) => state?.allActas);

  useEffect(() => {
    dispatch(getAllActas());
  }, []);
  console.log(actas);
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
