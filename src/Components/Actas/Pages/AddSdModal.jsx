import React from "react";
//* Style
import styled, { css } from "styled-components";
import GlobalStyles from "../../../Styles/GlobalStyles";
import Variables from "../../../Styles/Variables";
import { Close } from "@styled-icons/ionicons-outline/Close";
//* Initializations
const { button, select, input } = GlobalStyles;
const { redColor, greenColor, secondaryColor, principalColor } = Variables;

function AddSdModal({ sds, setSds, setAddSdsModal, toast }) {
  React.useEffect(() => {
    return () => {
      localStorage.setItem("currentSd", null);
    };
  });

  const [sd, setSd] = React.useState(
    JSON.parse(localStorage.getItem("currentSd")) || {
      marca: "",
      serialNumber: "",
      almacenamiento: "",
      tipoExtraccionSd: "",
    }
  );

  const handleSdSubmit = (e) => {
    e.preventDefault();
    setAddSdsModal(false);
    setSds([...sds, sd]);
    setSd({
      marca: "",
      serialNumber: "",
      almacenamiento: "",
      tipoExtraccionSd: "",
    });
    if (sd.edit) {
      toast.success("¡Sd Editada con Exito!");
    } else {
      toast.success("¡Sd Guardada con Exito!");
    }
  };

  return (
    <>
      <CloseIcon onClick={() => setAddSdsModal(false)} />
      <Form onSubmit={handleSdSubmit}>
        <Title>{sd.edit ? "Editar" : "Agregar"} SD</Title>
        <InputContainer>
          <Label>Marca</Label>
          <Input
            type="text"
            name="marca"
            value={sd.marca}
            placeholder="Marca"
            onChange={(e) => setSd({ ...sd, marca: e.target.value.toUpperCase() })}
          />
        </InputContainer>
        <InputContainer>
          <Label>Serial N°</Label>
          <Input
            type="text"
            name="serialNumber"
            value={sd.serialNumber}
            placeholder="Serial N°"
            onChange={(e) => setSd({ ...sd, serialNumber: e.target.value.toUpperCase() })}
          />
        </InputContainer>
        <InputContainer>
          <Label>*Almacenamiento</Label>
          <Input
            type="text"
            name="almacenamiento"
            value={sd.almacenamiento}
            placeholder="500 GB / 1 TB"
            onChange={(e) => setSd({ ...sd, almacenamiento: e.target.value.toUpperCase() })}
          />
        </InputContainer>
        <InputContainer>
          <Label>*Extracción</Label>
          <Select value={sd.tipoExtraccionSd} onChange={(e) => setSd({ ...sd, tipoExtraccionSd: e.target.value })}>
            <SelectOpt value="">Tipo de Extracción</SelectOpt>
            <SelectOpt value="ninguna">Ninguna</SelectOpt>
            <SelectOpt value="no interes">No Interes</SelectOpt>
            <SelectOpt value="fisica">Fisica</SelectOpt>
            <SelectOpt value="logica">Logica</SelectOpt>
            <SelectOpt value="sistema de archivos">Sitema de Archivos</SelectOpt>
            <SelectOpt value="logica avanzada">Logica Avanzada</SelectOpt>
          </Select>
        </InputContainer>
        <Button type="submit" value={sd.edit ? "Guardar" : "Agregar"} complete={sd.almacenamiento && sd.tipoExtraccionSd ? "true" : "false"} />
      </Form>
    </>
  );
}

export default AddSdModal;

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
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: max-content;
  border-bottom: 1px solid ${secondaryColor};
  padding-bottom: 10px;
  margin-block: 5px;
`;

const Label = styled.label`
  flex: 1;
`;

const Input = styled.input`
  ${input}
  font-size: medium;
  flex: 1;
  height: 30px;
  text-align: center;
`;

const Select = styled.select`
  ${select}
  font-size: medium;
  flex: 1;
  height: 30px;
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

const CloseIcon = styled(Close)`
  position: absolute;
  right: 0;
  top: 0;
  width: 8%;
  margin-top: 1%;
  color: white;
  transition: all 0.5s ease;

  &:hover {
    color: ${secondaryColor};
    cursor: pointer;
  }
`;
