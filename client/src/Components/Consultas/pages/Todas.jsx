import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllActas } from "../../../redux/actions";
//Utils
import GlobalStyles from "../../../Styles/GlobalStyles";
import Variables from "../../../Styles/Variables";
import { BoxArrowInUpRight } from "@styled-icons/bootstrap/BoxArrowInUpRight";
//Initializations
const { principalColor, secondaryColor, baseTransparentColor, yellowColor, greenColor } = Variables;

function Todas() {
  const dispatch = useDispatch();
  const allActas = useSelector((state) => state.allActas);

  useEffect(() => {
    dispatch(getAllActas()); // * Pido todas las actas
  }, []);

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
          ? allActas.map((acta) => (
              <ActaContainer to="#" key={acta.id}>
                {!acta.nro_coop && (
                  <Info>
                    <strong
                      style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}
                    >
                      MPF
                    </strong>
                    <br />
                    {acta.nro_mpf}
                  </Info>
                )}
                {!acta.nro_mpf && (
                  <Info>
                    <strong
                      style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}
                    >
                      COOP
                    </strong>
                    <br />
                    {acta.nro_coop}
                  </Info>
                )}
                <Info>
                  <strong style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}>
                    CIJ
                  </strong>
                  <br />
                  {acta.nro_cij}
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
                    Estado
                  </strong>
                  <br />
                  <Estado estado={acta.estado}>{acta.estado}</Estado>
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

const ActaContainer = styled(NavLink)`
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
`;

const Estado = styled.span`
  color: ${(props) => (props.estado === "en proceso" ? yellowColor : greenColor)};
`;

const Icon = styled(BoxArrowInUpRight)`
  width: 20px;
  margin-right: 40px;
  color: ${secondaryColor};
  transition: all 0.3s ease;

  &:hover {
    color: black;
    cursor: pointer;
  }

  ${ActaContainer}:hover & {
    width: 30px;
  }
`;
