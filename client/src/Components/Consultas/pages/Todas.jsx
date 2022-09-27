import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
//Utils
import GlobalStyles from "../../../Styles/GlobalStyles";
import Variables from "../../../Styles/Variables";
import { BoxArrowInUpRight } from "@styled-icons/bootstrap/BoxArrowInUpRight";
//Initializations
const { principalColor, secondaryColor } = Variables;

function Todas() {
  const allActas = useSelector((state) => state.allActas);

  return (
    <Container>
      <Header>
        <Title>Actas</Title>
        <Description>
          En esta sección poder ver todas las Actas guardadas. <br /> Elegi una para ver su detalle!
        </Description>
      </Header>
      <CardsContainer>
        {allActas
          ? allActas.map((acta, index) => (
              <ActaContainer key={acta.id}>
                <Info>
                  <strong style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}>
                    MPF
                  </strong>
                  <br />
                  {acta.nro_mpf}
                </Info>
                <Info>
                  <strong style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}>
                    CIJ
                  </strong>
                  <br />
                  {acta.nro_cij}
                </Info>
                <Info>
                  <strong style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}>
                    COOP
                  </strong>
                  <br />
                  {acta.nro_coop}
                </Info>
                <Info>
                  <strong style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}>
                    DIL
                  </strong>
                  <br />
                  {acta.nro_dil}
                </Info>
                <Info>
                  <strong style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}>
                    Bolsas
                  </strong>
                  <br />
                  {acta.Bolsas.length}
                </Info>
                <Icon />
              </ActaContainer>
            ))
          : null}
      </CardsContainer>
    </Container>
  );
}

export default Todas;

const Container = styled.div`
  ${GlobalStyles.container}
  flex-direction: column;
  padding-left: 20%;
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
`;

const Info = styled.span`
  color: ${secondaryColor};
  text-align: center;
`;

const Icon = styled(BoxArrowInUpRight)`
  width: 20px;
  color: ${secondaryColor};
  transition: all 0.5s ease;

  &:hover {
    color: black;
    cursor: pointer;
  }
`;
