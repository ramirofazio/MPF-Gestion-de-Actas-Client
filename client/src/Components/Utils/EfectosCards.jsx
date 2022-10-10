import React from "react";
import styled from "styled-components";
import Variables from "../../Styles/Variables";
import { Check } from "@styled-icons/boxicons-regular/Check";
import { toast } from "react-toastify";
import { sendEfectosIdsAndActaId } from "../../redux/actions";

const { principalColor, secondaryColor, baseTransparentColor, yellowColor, greenColor, redColor } = Variables;

function EfectosCards({ efectos, actaId }) {
  const efectosParaCompletar = [];

  const handleSubmit = () => {
    if (efectosParaCompletar.length === 0) {
      toast.warning("selecciona un efecto!", { position: toast.POSITION.BOTTOM_LEFT });
    } else {
      sendEfectosIdsAndActaId({ actaId: actaId, efectosIds: efectosParaCompletar }); //* despacho datos
      toast.success("Acta completada con Exito", { position: toast.POSITION.BOTTOM_LEFT });
      setTimeout(() => {
        window.location.replace("/actas/en_proceso"); //* Vuelve a la pagina de actas una vez despachada
      }, 2500);
    }
  };

  return (
    <>
      <CardsContainer>
        {efectos
          ? efectos.map((efecto) => (
              <EfectoContainer key={efecto.id} estado={efecto.estado}>
                <Info>
                  <strong style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}>Nro Precinto</strong>
                  <br />
                  {efecto.Bolsa.nro_precinto}
                </Info>
                <Info>
                  <strong style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}>Tipo</strong>
                  <br />
                  {efecto.tipo}
                </Info>
                <Info>
                  <strong style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}>Marca</strong>
                  <br />
                  {efecto.marca}
                </Info>
                <Info>
                  <strong style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}>Modelo</strong>
                  <br />
                  {efecto.modelo}
                </Info>
                <Info>
                  <strong style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}>Estado</strong>
                  <br />
                  <Estado estado={efecto.estado}>{efecto.estado}</Estado>
                </Info>
                <CheckBoxContainer>
                  {efecto.estado === "completo" ? (
                    <CheckIcon />
                  ) : (
                    <CheckBox type="checkbox" onClick={() => efectosParaCompletar.push(efecto.id)} />
                  )}
                </CheckBoxContainer>
              </EfectoContainer>
            ))
          : null}
      </CardsContainer>
      <ButtonContainer>
        <Button onClick={handleSubmit}>Completar</Button>
      </ButtonContainer>
    </>
  );
}

export default EfectosCards;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-height: 70%;
  min-height: 70%;
  border-top: 2px solid ${principalColor};
  overflow-y: scroll;
  padding-block: 10px;
  padding-bottom: 6%;
  margin-bottom: -100px;
`;

const EfectoContainer = styled.div`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 90%;
  min-height: 12%;
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
    min-height: 14%;
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

const Estado = styled.span`
  color: ${(props) =>
    props.estado === "en proceso" ? yellowColor : props.estado === "completo" ? greenColor : redColor};
`;

const CheckIcon = styled(Check)`
  width: 30%;
  color: ${greenColor};
`;

const ButtonContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  width: 94%;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
`;

const Button = styled.button`
  width: auto;
  height: auto;
  padding: 10px;
  padding-inline: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
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
