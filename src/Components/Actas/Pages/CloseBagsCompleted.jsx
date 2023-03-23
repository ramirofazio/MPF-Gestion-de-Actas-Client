import React from "react";
//* Style
import styled, { css } from "styled-components";
import GlobalStyles from "../../../Styles/GlobalStyles";
import Variables from "../../../Styles/Variables";
//* Initializations
const { button, input, select } = GlobalStyles;
const { redColor, greenColor, secondaryColor, principalColor } = Variables;

function CloseBagsCompleted({ closeModal, dispatch, bagsToClose, updateBolsa, acta_id }) {
  const [state, setState] = React.useState({
    id: "",
    nroPrecintoBlanco: "",
  });

  const handleCompleteSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBolsa(state, acta_id));
    closeModal();
  };

  return (
    <Form onSubmit={(e) => handleCompleteSubmit(e)}>
      <Title>Cerrar Bolsas</Title>
      <InputContainer>
        <Label>Bolsa</Label>
        <Select value={state.id} onChange={(e) => setState({ ...state, id: Number(e.target.value) })}>
          <SelectOpt value="">Precinto</SelectOpt>
          {bagsToClose.length > 0 &&
            bagsToClose.map(({ nroPrecinto, id, colorPrecinto }) => (
              <SelectOpt value={id} key={id} style={colorPrecinto === "rojo" ? { color: redColor } : { color: greenColor }}>
                {nroPrecinto}
              </SelectOpt>
            ))}
        </Select>
      </InputContainer>
      <InputContainer>
        <Label>Precinto Blanco</Label>
        <Input
          type="number"
          name="nroPrecintoBlanco"
          value={state.nroPrecintoBlanco}
          placeholder="Nro Precinto Blanco"
          onChange={(e) => setState({ ...state, nroPrecintoBlanco: e.target.value })}
        />
      </InputContainer>
      <Button type="submit" value="Cerrar Bolsa" complete={state.nroPrecintoBlanco !== "" && state.nroPrecinto !== "" ? "true" : "false"} />
    </Form>
  );
}

export default CloseBagsCompleted;

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
