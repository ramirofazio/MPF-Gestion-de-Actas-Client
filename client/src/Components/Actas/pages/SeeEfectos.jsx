import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllEfectos, updateEfecto } from "../../../redux/actions";
//Utils
import GlobalStyles from "../../../Styles/GlobalStyles";
import Variables from "../../../Styles/Variables";
import { Check2Circle } from "@styled-icons/bootstrap/Check2Circle";
//Initializations
const { principalColor, secondaryColor, baseTransparentColor, yellowColor, greenColor } = Variables;

function SeeEfectos() {
  const dispatch = useDispatch();
  const allEfectos = useSelector((state) => state.efectosEnProceso);

  useEffect(() => {
    dispatch(getAllEfectos()); // * Pido todos los efectos
  }, []);

  return (
    <Container>
      <Header>
        <Title>Efectos en Proceso</Title>
        <Description>
          En esta sección poder ver todos los Efectos en proceso. <br /> Elegi uno para completarlo.
        </Description>
      </Header>
      <CardsContainer>
        {allEfectos
          ? allEfectos.map((efecto) => (
              <ActaContainer to="#" key={efecto.id}>
                <Info>
                  <strong style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}>
                    Nro Precinto
                  </strong>
                  <br />
                  {efecto.Bolsa.nro_precinto}
                </Info>
                <Info>
                  <strong style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}>
                    Tipo
                  </strong>
                  <br />
                  {efecto.tipo}
                </Info>
                <Info>
                  <strong style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}>
                    Marca
                  </strong>
                  <br />
                  {efecto.marca}
                </Info>
                <Info>
                  <strong style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}>
                    Modelo
                  </strong>
                  <br />
                  {efecto.modelo}
                </Info>
                <CheckIcon onClick={() => dispatch(updateEfecto(efecto))} />
              </ActaContainer>
            ))
          : null}
      </CardsContainer>
    </Container>
  );
}

export default SeeEfectos;

const Container = styled.div`
  ${GlobalStyles.container}
  flex-direction: column;
`;

const Header = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  flex: 0.2;
`;

const Title = styled.h1`
  color: ${principalColor};
  font-size: 50px;
  text-decoration: underline;
  text-decoration-thickness: 2px;
`;

const Description = styled.p`
  color: ${secondaryColor};
  text-align: center;
  font-size: 18px;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  flex: 1;
  max-height: 70%;
`;

const ActaContainer = styled.div`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  flex: 1;
  min-height: 8%;
  max-height: 10%;
  margin-top: 5px;
  border: 2px solid ${principalColor};
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    max-height: 15%;
    background-color: ${baseTransparentColor};
  }
`;

const Info = styled.span`
  flex: 1;
  color: ${secondaryColor};
  text-align: center;
  text-transform: capitalize;
`;

const CheckIcon = styled(Check2Circle)`
  width: 25px;
  margin-right: 40px;
  color: ${yellowColor};
  transition: all 0.5s ease;

  &:hover {
    color: ${greenColor};
    cursor: pointer;
  }

  ${ActaContainer}:hover & {
    width: 35px;
  }
`;
