import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllActas } from "../redux/actions";
import styled from "styled-components";

function Show() {
  const dispatch = useDispatch();

  const actas = useSelector((state) => state?.allActas);

  useEffect(() => {
    dispatch(getAllActas());
  }, []);
  console.log(actas);
  return <Container></Container>;
}

export default Show;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 15vh;
`;
