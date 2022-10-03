import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getAllActas, getAllEfectos, updateEfecto } from "../../../../redux/actions";
//Utils
import GlobalStyles from "../../../../Styles/GlobalStyles";
import Variables from "../../../../Styles/Variables";
//Initializations
const { principalColor, secondaryColor, baseTransparentColor } = Variables;

function EfectosEnProceso() {
  const efectosParaCompletar = [];
  const dispatch = useDispatch();
  const efectosEnProceso = useSelector((state) => state.efectosEnProceso);
  const allActas = useSelector((state) => state.allActas);

  useEffect(() => {
    dispatch(getAllEfectos());
    dispatch(getAllActas());
  }, []);

  const handleSubmit = () => {
    efectosParaCompletar.map((efId) => {
      allActas.map((acta) => {
        acta.Bolsas.map((bolsa) => {
          bolsa.Efectos.map((ef) => {
            if (ef.id === efId) {
              dispatch(updateEfecto(acta));
            }
          });
        });
      });
    });
  };

  return (
    <Container>
      <Header>
        <Title>Efectos en Proceso</Title>
        <Description>
          En esta sección poder ver todos los Efectos en proceso. <br /> Selecciona los que quieras
          completar.
        </Description>
      </Header>
      <CardsContainer>
        {efectosEnProceso
          ? efectosEnProceso.map((efecto) => (
              <ActaContainer key={efecto.id}>
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
                <CheckBoxContainer>
                  <CheckBox type="checkbox" onClick={() => efectosParaCompletar.push(efecto.id)} />
                </CheckBoxContainer>
              </ActaContainer>
            ))
          : null}
      </CardsContainer>
      <Button onClick={handleSubmit}>Completar</Button>
    </Container>
  );
}

export default EfectosEnProceso;

const Container = styled.div`
  ${GlobalStyles.container}
  flex-direction: column;
`;

const Header = styled.header`
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
    max-height: 12%;
    width: 102%;
    background-color: ${baseTransparentColor};
  }
`;

const Info = styled.span`
  flex: 1;
  color: ${secondaryColor};
  text-align: center;
  text-transform: capitalize;
`;

const CheckBoxContainer = styled.div`
  flex: 0.4;
  text-align: center;
`;

const CheckBox = styled.input`
  &:hover {
    cursor: pointer;
  }
`;

const Button = styled.button`
  width: auto;
  height: auto;
  padding: 10px;
  padding-inline: 20px;
  margin-right: 40px;

  border-radius: 10px;
  border: 2px solid ${principalColor};
  color: ${secondaryColor};
  font-size: 15px;
  transition: all 0.3s ease-in;

  &:hover {
    cursor: pointer;
    background-color: ${principalColor};
    color: #fff;
  }
`;
