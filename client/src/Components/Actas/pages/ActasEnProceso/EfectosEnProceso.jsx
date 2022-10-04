import React, { useEffect } from "react";
//* Utils
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getEfectosFromActa, sendEfectosIdsAndActaId } from "../../../../redux/actions";
//* Styles
import styled from "styled-components";
import GlobalStyles from "../../../../Styles/GlobalStyles";
import Variables from "../../../../Styles/Variables";
import { Check } from "@styled-icons/boxicons-regular/Check";
//* Initializations
const { principalColor, secondaryColor, baseTransparentColor, yellowColor, greenColor, redColor } =
  Variables;

function EfectosEnProceso() {
  const dispatch = useDispatch();
  const efectosParaCompletar = [];
  const efectosFromActa = useSelector((state) => state.efectosFromActa);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getEfectosFromActa(id));
  }, []);

  const handleSubmit = () => {
    sendEfectosIdsAndActaId({ actaId: id, efectosIds: efectosParaCompletar }); //* despacho datos
  };

  return (
    <Container>
      <Header>
        <Title>Efectos</Title>
        <Description>
          En esta sección poder ver todos los Efectos del Acta. <br /> Selecciona los que quieras
          completar.
        </Description>
      </Header>
      <CardsContainer>
        {efectosFromActa
          ? efectosFromActa.map((efecto) => (
              <ActaContainer key={efecto.id} estado={efecto.estado}>
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
                <Info>
                  <strong style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}>
                    Estado
                  </strong>
                  <br />
                  <Estado estado={efecto.estado}>{efecto.estado}</Estado>
                </Info>
                <CheckBoxContainer>
                  {efecto.estado === "completo" ? (
                    <CheckIcon />
                  ) : (
                    <CheckBox
                      type="checkbox"
                      onClick={() => efectosParaCompletar.push(efecto.id)}
                    />
                  )}
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
  justify-content: space-between;
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
  font-size: 16px;
`;
const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 95%;
  flex: 1;
  max-height: 60%;
`;

const ActaContainer = styled.div`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 95%;
  height: 10%;
  margin-top: 5px;
  border: ${(props) =>
    props.estado === "en proceso"
      ? `2px solid ${principalColor}`
      : props.estado === "completo"
      ? `2px solid ${greenColor}`
      : `2px solid ${redColor}`};
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    height: 12%;
    background-color: ${baseTransparentColor};
    cursor: default;
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
  margin-bottom: 20px;
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

const Estado = styled.span`
  color: ${(props) =>
    props.estado === "en proceso"
      ? yellowColor
      : props.estado === "completo"
      ? greenColor
      : redColor};
`;

const CheckIcon = styled(Check)`
  width: 30%;
  color: ${greenColor};
`;
