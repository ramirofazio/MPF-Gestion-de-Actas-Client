import React from "react";
import { useNavigate } from "react-router-dom";
//* Redux
import { useDispatch, useSelector } from "react-redux";
import { getAllActas, updateBolsa, updateActa } from "../../../redux/actions";
//* Style
import styled, { css } from "styled-components";
import GlobalStyles from "../../../Styles/GlobalStyles";
import Variables from "../../../Styles/Variables";
//* Initializations
const { button, input, select } = GlobalStyles;
const { redColor, greenColor, secondaryColor } = Variables;

function CloseModal({ closeModal }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allActasSave = useSelector((s) => s.allActasSave);
  const currentActa = useSelector((s) => s.currentActa);

  const [inProcess, setInProcess] = React.useState(false);
  const [thisDbActa, setThisDbActa] = React.useState([]);
  const [bagsInProcess, setBagsInProcess] = React.useState([]);
  const [bagsToClose, setBagsToClose] = React.useState([]);
  const [state, setState] = React.useState({
    nroPrecinto: "",
    nroPrecintoBlanco: "",
  });
  const [inProcessState, setInProcessState] = React.useState({
    nroPrecinto: "",
    leyenda: "Se dejaron los elementos en el laboratorio",
  });
  const [observaciones, setObservaciones] = React.useState("");

  React.useEffect(() => {
    dispatch(getAllActas());
  }, []);

  React.useEffect(() => {
    //! Esto no se puede hacer sin tanto bucle??
    allActasSave.map((acta) => {
      if (acta.id === currentActa.id) {
        const bagsCompleted = acta.Bolsas.filter((b) => {
          //* Filtro los efectos de las bolsas para saber cual esta completa, retorno si no tiene efectos o si ya esta completa y tiene precinto blanco
          if (b.nroPrecintoBlanco !== null) return;
          if (b.Efectos.length === 0) return;
          let sum = 0;
          b.Efectos.find((ef) => ef.estado === "completo" && sum++);
          if (sum === b.Efectos.length) return b.nroPrecinto;
        });
        setBagsToClose(bagsCompleted);
        setThisDbActa(acta);
      }
    });
  }, [allActasSave, currentActa]);

  React.useEffect(() => {
    if (thisDbActa.Bolsas && bagsToClose.length === 0) {
      //* Si el acta tiene bolsas pero no hay ninguna para cerrar...
      setInProcess(true);
      const bagsInProcess = thisDbActa.Bolsas.filter((b) => {
        //* Filtro las bolsas en proceso, (las que no tienen todos los efectos completos)
        if (b.leyenda) return;
        if (b.Efectos.length === 0) return;
        if (b.estado === "en proceso") return b;
      });
      setBagsInProcess(bagsInProcess);
    }
  }, [thisDbActa]);

  const handleSubmit = (e) => {
    e.preventDefault();
    inProcess ? dispatch(updateBolsa(inProcessState)) : dispatch(updateBolsa(state));
    closeModal();
  };

  const handleFinish = (e) => {
    e.preventDefault();
    dispatch(updateActa(observaciones, currentActa.id, navigate));
  };

  //! Modularizame esto Rameeeee x favor, 3 componentes distintos, con sus estados y demas...

  if (!inProcess) {
    return (
      <>
        <Form onSubmit={(e) => handleSubmit(e)}>
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
  } else {
    return (
      <>
        <Form onSubmit={(e) => handleSubmit(e)}>
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
