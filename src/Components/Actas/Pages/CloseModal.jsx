import React from "react";
import { useNavigate } from "react-router-dom";
//* Redux
import { useDispatch, useSelector } from "react-redux";
import { updateBolsa, updateActa } from "../../../redux/actions";
//* Style
import styled, { css } from "styled-components";
import GlobalStyles from "../../../Styles/GlobalStyles";
import Variables from "../../../Styles/Variables";
//* Utils
import editSavedActa from "../../Utils/template/editSavedActa";
//* Initializations
const { button, input, select } = GlobalStyles;
const { redColor, greenColor, secondaryColor } = Variables;

function CloseModal({ closeModal }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentActa = useSelector((s) => JSON.parse(localStorage.getItem("currentActa")) || s.currentActa);
  const currentBolsas = useSelector((s) => JSON.parse(localStorage.getItem("currentBolsas")) || s?.currentBolsas);

  const [bagsInProcess, setBagsInProcess] = React.useState([]);
  const [bagsToClose, setBagsToClose] = React.useState([]);
  const [state, setState] = React.useState({
    nroPrecinto: "",
    nroPrecintoBlanco: "",
  });
  const [inProcessState, setInProcessState] = React.useState({
    nroPrecinto: "",
    leyenda: "se dejaron los elementos en proceso de copiado en el laboratorio",
  });
  const [observaciones, setObservaciones] = React.useState("");

  React.useEffect(() => {
    return () => {
      setBagsToClose([]);
      setBagsInProcess([]);
    };
  }, []);

  const getPrecintos = () => {
    //* Bolsas completas
    const bagsCompleted = currentBolsas.filter((b) => {
      if (b.estado === "abierta con efectos completos") return b.nroPrecinto;
    });
    setBagsToClose(bagsCompleted);
    //* Bolsas en proceso
    const bagsInProcess = currentBolsas.filter((b) => {
      if (b.estado === "abierta con efectos en proceso") return b.nroPrecinto;
    });
    setBagsInProcess(bagsInProcess);
  };

  React.useEffect(() => {
    getPrecintos();
  }, [bagsToClose.length === 0 && bagsInProcess.length === 0]);

  const handleCompleteSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBolsa(state));
    editSavedActa(currentActa.id); //!
    closeModal();
  };

  const handleInProcessSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBolsa(inProcessState));
    editSavedActa(currentActa.id); //!
    closeModal();
  };

  const handleFinish = (e) => {
    e.preventDefault();
    dispatch(updateActa(observaciones, currentActa.id, navigate));
  };

  //! Modularizame esto Rameeeee x favor, 3 componentes distintos, con sus estados y demas...

  if (bagsToClose.length !== 0) {
    return (
      <>
        <Form onSubmit={(e) => handleCompleteSubmit(e)}>
          <Title>Cerrar Bolsas</Title>
          <InputContainer>
            <Label>Nro Precinto Bolsa</Label>
            <Select
              value={state.nroPrecinto}
              onChange={(e) => setState({ ...state, nroPrecinto: Number(e.target.value) })}
            >
              <SelectOpt value="">Nro Precinto Bolsa</SelectOpt>
              {bagsToClose.length > 0 &&
                bagsToClose.map(({ nroPrecinto, id, colorPrecinto }) => (
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
              type="number"
              name="nroPrecintoBlanco"
              value={state.nroPrecintoBlanco}
              placeholder="Nro Precinto Blanco"
              onChange={(e) => setState({ ...state, nroPrecintoBlanco: Number(e.target.value) })}
            />
          </InputContainer>
          <Button
            type="submit"
            value="Cerrar Bolsa"
            complete={state.nroPrecintoBlanco !== "" && state.nroPrecinto !== "" ? "true" : "false"}
          />
        </Form>
      </>
    );
  } else if (bagsInProcess.length === 0 && bagsToClose.length === 0) {
    return (
      <>
        <Form onSubmit={(e) => handleFinish(e)}>
          <Title>Cerrar Acta</Title>
          <InputContainer closeActa={true}>
            <Label>Observaciones del Acta</Label>
            <TextArea
              closeActa={true}
              name="observaciones"
              value={observaciones}
              placeholder="Observaciones"
              onChange={(e) => setObservaciones(e.target.value)}
            />
          </InputContainer>
          <Button type="submit" value="Cerrar Acta" complete={"true"} />
        </Form>
      </>
    );
  } else if (bagsInProcess.length !== 0) {
    return (
      <>
        <Form onSubmit={(e) => handleInProcessSubmit(e)}>
          <Title>Cerrar Bolsa en Proceso</Title>
          <InputContainer>
            <Label>Nro Precinto Bolsa</Label>
            <Select
              value={inProcessState.nroPrecinto}
              onChange={(e) => setInProcessState({ ...inProcessState, nroPrecinto: Number(e.target.value) })}
            >
              <SelectOpt value="">Nro Precinto Bolsa</SelectOpt>
              {bagsInProcess.length > 0 &&
                bagsInProcess.map(({ nroPrecinto, id, colorPrecinto }) => (
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
          <InputContainer
            style={{ flexDirection: "column", marginBottom: "2%", paddingTop: "10px", borderBottom: "none" }}
          >
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
            style={{ marginBottom: "-4%" }}
            type="submit"
            value="Cerrar Bolsa en Proceso"
            complete={inProcessState.nroPrecinto !== "" && inProcessState.leyenda !== "" ? "true" : "false"}
          />
        </Form>
      </>
    );
  }
}

export default CloseModal;

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

const TextArea = styled.textarea`
  ${input}
  flex: 1;
  min-height: 90%;
  max-height: 0px;
  max-width: 100%;
  min-width: 100%;
  text-align: center;
  font-size: medium;

  &:focus {
    border: none;
    outline: none;
    all: none;
  }

  ${(props) =>
    props.leyenda &&
    css`
      margin-top: 2%;
      min-width: 75%;
    `}

  ${(props) =>
    props.closeActa &&
    css`
      min-height: 70%;
      margin-bottom: 3%;
    `}
`;
