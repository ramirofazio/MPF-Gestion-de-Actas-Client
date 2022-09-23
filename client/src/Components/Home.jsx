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
  return (
    <Container>
      {actas.map((acta) => (
        <div key={acta.nro_mpf}>
          <h1>Nro MPF: {acta.nro_mpf}</h1>
          <h1>Nro DIL: {acta.nro_dil}</h1>
          <h1>Nro Coop: {acta.nro_coop}</h1>
          <h1>Nro CIJ: {acta.nro_cij}</h1>
          <h2>Efectos</h2>
          {acta.Efectos.map((efecto) => (
            <div key={efecto.id}>
              <h1>{efecto.tipo}</h1>
              <h1>{efecto.nro_precinto}</h1>
            </div>
          ))}
        </div>
      ))}
    </Container>
  );
}

export default Show;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 15vh;
`;
