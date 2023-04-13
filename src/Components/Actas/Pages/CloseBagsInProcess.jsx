import React from "react";
//* Style
import styled, { css } from "styled-components";
import GlobalStyles from "../../../Styles/GlobalStyles";
import Variables from "../../../Styles/Variables";
//* Initializations
const { button, input, select } = GlobalStyles;
const { redColor, greenColor, secondaryColor, principalColor } = Variables;

function CloseBagsInProcess({ closeModal, dispatch, bagsInProcess, updateBolsa, acta_id }) {
  const [inProcessState, setInProcessState] = React.useState({
    id: "",
    leyenda: "Finalizadas las tareas técnicas pertinentes, se dejaron los elementos en proceso de copiado en el laboratorio",
  });

  const handleInProcessSubmit = (e) => {
    e.preventDefault();
    const res = prompt(
      "¡Bolsa en proceso! \n\n Este Acta quedara bloqueada en proceso. \n\n ¡puede imprimirla y luego volver a cerrar los elementos pendientes! \n\n Escriba 'cerrar' para continuar o aprete cancelar"
    );
    if (res === "cerrar") {
      dispatch(updateBolsa(inProcessState, acta_id));
      closeModal();
    }
  };
  return (
    <Form onSubmit={(e) => handleInProcessSubmit(e)}>
      <Title>Cerrar Bolsa en Proceso</Title>
      <InputContainer>
        <Label>Bolsa</Label>
        <Select value={inProcessState.id} onChange={(e) => setInProcessState({ ...inProcessState, id: Number(e.target.value) })}>
          <SelectOpt value="">Seleccione Precinto</SelectOpt>
          {bagsInProcess.length > 0 &&
            bagsInProcess.map(({ nroPrecinto, id, colorPrecinto }) => (
              <SelectOpt value={id} key={id} style={colorPrecinto === "rojo" ? { color: redColor } : { color: greenColor }}>
                {nroPrecinto}
              </SelectOpt>
            ))}
        </Select>
      </InputContainer>
      <InputContainer style={{ height: "100px" }}>
        <Label>Leyenda</Label>
        <TextArea
          leyenda={true}
          name="leyenda"
          value={inProcessState.leyenda}
          placeholder="Leyenda"
          onChange={(e) => setInProcessState({ ...inProcessState, leyenda: e.target.value })}
        />
      </InputContainer>
      <Button
        type="submit"
        value="Guardar"
        complete={inProcessState.id !== "" && inProcessState.leyenda !== "" ? "true" : "false"}
      />
    </Form>
  );
}

export default CloseBagsInProcess;

const Title = styled.h4`
  border-bottom: 2px solid white;
  width: 120%;
  text-align: center;
  margin-bottom: 2%;
  padding-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 5%;
  color: white;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid ${secondaryColor};
  padding-bottom: 10px;
  margin-block: 5px;

  ${(props) =>
    props.closeActa &&
    css`
      flex-direction: column;
      margin-top: 2%;
    `}
`;

const Label = styled.label`
  flex: 1;
`;

const Input = styled.input`
  ${input}
  font-size: medium;
  flex: 1;
  height: 100%;
  text-align: center;
`;

const Select = styled.select`
  ${select}
  font-size: medium;
  flex: 1;
  height: 100%;
  text-align: center;
`;

const SelectOpt = styled.option``;

const Button = styled.input`
  ${button}
  padding: 5px;
  padding-inline: 15px;
  text-decoration: none;
  background: white;
  border: 2px solid ${redColor};
  pointer-events: none;
  margin-bottom: -2.5%;
  margin-top: 1%;

  &:hover {
    cursor: pointer;
    background-color: white;
    color: ${principalColor};
    border: 2px solid transparent;
  }

  ${(props) =>
    props.complete === "true" &&
    css`
      pointer-events: all;
      border: 2px solid ${greenColor};
    `}
`;

const TextArea = styled.textarea`
  ${input}
  font-size: medium;
  flex: 1;
  min-height: 100%;
  max-height: 100%;

  text-align: center;

  &:focus {
    all: none;
  }
`;
