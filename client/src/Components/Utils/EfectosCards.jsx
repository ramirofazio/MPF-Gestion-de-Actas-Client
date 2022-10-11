import React from "react";
//* Styles
import styled from "styled-components";
import Variables from "../../Styles/Variables";
import { Check } from "@styled-icons/boxicons-regular/Check";
import { toast } from "react-toastify";
import GlobalStyles from "../../Styles/GlobalStyles";
//* Redux
import { sendEfectosIdsAndActaId } from "../../redux/actions";

const { principalColor, yellowColor, greenColor, redColor } = Variables;
const { cardsContainer, cardContainer, cardInfo, cardTitle, button } = GlobalStyles;

function EfectosCards({ efectos, actaId }) {
  const efectosParaCompletar = [];

  const handleSubmit = () => {
    if (efectosParaCompletar.length === 0) {
      toast.warning("selecciona un efecto!");
    } else {
      sendEfectosIdsAndActaId({ actaId: actaId, efectosIds: efectosParaCompletar }); //* despacho datos
      toast.success("Acta completada con Exito");
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
                  <CardTitle>Nro Precinto</CardTitle>
                  <br />
                  {efecto.Bolsa.nro_precinto}
                </Info>
                <Info>
                  <CardTitle>Tipo</CardTitle>
                  <br />
                  {efecto.tipo}
                </Info>
                <Info>
                  <CardTitle>Marca</CardTitle>
                  <br />
                  {efecto.marca}
                </Info>
                <Info>
                  <CardTitle>Modelo</CardTitle>
                  <br />
                  {efecto.modelo}
                </Info>
                <Info>
                  <CardTitle>Estado</CardTitle>
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
      <Button onClick={handleSubmit}>Completar</Button>
    </>
  );
}

export default EfectosCards;

const CardsContainer = styled.div`
  ${cardsContainer}
  padding-bottom: 5%;
`;

const EfectoContainer = styled.div`
  ${cardContainer}
  border: ${(props) =>
    props.estado === "en proceso"
      ? `2px solid ${principalColor}`
      : props.estado === "completo"
      ? `2px solid ${greenColor}`
      : `2px solid ${redColor}`};
`;

const Info = styled.span`
  ${cardInfo}
`;

const CardTitle = styled.strong`
  ${cardTitle}
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

const Button = styled.button`
  ${button}
  position: absolute;
  bottom: 0;
  margin-bottom: 10px;
`;
