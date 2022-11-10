import React, { useState } from "react";
import { useEffect } from "react";
//* Redux
import { useDispatch, useSelector } from "react-redux";
import { getAllActas } from "../../../../redux/actions";
//* Style
import styled, { css } from "styled-components";
import GlobalStyles from "../../../../Styles/GlobalStyles";
import Variables from "../../../../Styles/Variables";
//* Doc
//import generateDoc from "../../generateDoc";
//* Initializations
const { button, input, select } = GlobalStyles;
const { redColor, greenColor, secondaryColor } = Variables;

function CloseBolsa() {
  const dispatch = useDispatch();
  const [bolsasToClose, setBolsasToClose] = useState([]);
  const [state, setState] = useState({
    nroprecinto: "",
    nroPrecintoBlanco: "",
  });

  const allActasSave = useSelector((state) => state?.allActasSave);
  const currentActa = useSelector((state) => state?.currentActa);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(getAllActas());
  }, []);

  useEffect(() => {
    if (allActasSave) {
      allActasSave.map((acta) => {
        if (acta.id === currentActa.id) {
          const bolsasCompletas = acta.Bolsas.filter((bolsa) => {
            return bolsa.Efectos.find((ef) => (ef.estado === "completo" ? bolsa.nroPrecinto : null));
          });
          setBolsasToClose(bolsasCompletas);
        }
      });
    }
  }, [allActasSave, currentActa]);

  return (
    <>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Title>Cerrar Bolsas</Title>
        <InputContainer>
          <Label>Nro Bolsa</Label>
          <Select
            value={state.nroprecinto}
            onChange={(e) => setState({ ...state, nroprecinto: Number(e.target.value) })}
          >
            <SelectOpt value="">Nro Bolsa</SelectOpt>
            {bolsasToClose.length > 0 &&
              bolsasToClose.map(({ nroPrecinto, id, colorPrecinto }) => (
                <SelectOpt
                  value={nroPrecinto}
                  key={id}
                  style={colorPrecinto === "rojo" ? { color: redColor } : { color: greenColor }}
                >
                  {nroPrecinto}
                </SelectOpt>
              ))}
          </Select>
        </InputContainer>
        <InputContainer>
          <Label>Nro Precinto Blanco</Label>
          <Input
            type="text"
            name="nroPrecintoBlanco"
            value={state.nroPrecintoBlanco}
            placeholder="Nro Precinto Blanco"
            onChange={(e) => setState({ ...state, nroPrecintoBlanco: Number(e.target.value) })}
          />
        </InputContainer>
        <Button
          type="submit"
          value="Cerrar Bolsa"
          complete={state.nroPrecintoBlanco !== "" && state.nroprecinto !== "" ? "true" : "false"}
        />
      </Form>
    </>
  );
}

export default CloseBolsa;

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
  width: 100%;
  height: 100%;
  padding: 5%;
  color: white;
`;

const InputContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid ${secondaryColor};
`;

const Label = styled.label`
  flex: 1;
`;

const Input = styled.input`
  ${input}
  font-size: small;
  flex: 1;
  height: 35%;
  text-align: center;
`;

const Select = styled.select`
  ${select}
  font-size: small;
  flex: 1;
  height: 35%;
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
  margin-top: 20px;

  ${(props) =>
    props.complete === "true" &&
    css`
      pointer-events: all;
      border: 2px solid ${greenColor};
    `}
`;
