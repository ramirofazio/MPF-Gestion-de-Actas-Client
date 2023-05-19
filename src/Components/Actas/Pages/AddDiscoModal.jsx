import React from "react";
//* Style
import styled, { css } from "styled-components";
import GlobalStyles from "../../../Styles/GlobalStyles";
import Variables from "../../../Styles/Variables";
import { Close } from "@styled-icons/ionicons-outline/Close";
//* Initializations
const { button, select, input } = GlobalStyles;
const { redColor, greenColor, secondaryColor, principalColor } = Variables;

function AddDiscoModal({ discos, setDiscos, setAddDiscoModal, toast }) {
  React.useEffect(() => {
    return () => {
      localStorage.setItem("currentDisco", null);
    };
  });

  const [disco, setDisco] = React.useState(
    JSON.parse(localStorage.getItem("currentDisco")) || {
      tipoDeDisco: "",
      marca: "",
      modelo: "",
      almacenamiento: "",
      serialNumber: "",
      adquisicion: "",
      herramientaSoftDisco: "",
      estadoDisco: "",
      discoFallado: "",
      observacionFallaDisco: "",
    }
  );

  const handleDiscoSubmit = (e) => {
    e.preventDefault();
    setAddDiscoModal(false);
    setDiscos([...discos, disco]);
    setDisco({
      tipoDeDisco: "",
      marca: "",
      modelo: "",
      almacenamiento: "",
      serialNumber: "",
      adquisicion: "",
      herramientaSoftDisco: "",
      estadoDisco: "",
      discoFallado: "",
      observacionFallaDisco: "",
    });
    if (disco.edit) {
      toast.success("¡Disco Editado con Exito!");
    } else {
      toast.success("¡Disco Guardado con Exito!");
    }
  };

  return (
    <>
      <CloseIcon onClick={() => setAddDiscoModal(false)} />
      <Form onSubmit={handleDiscoSubmit}>
        <Title>{disco.edit ? "Editar" : "Agregar"} Disco</Title>
        <InputContainer>
          <Label>*Tipo de Disco</Label>
          <Select disabled={disco.edit} value={disco.tipoDeDisco} onChange={(e) => setDisco({ ...disco, tipoDeDisco: e.target.value })}>
            <SelectOpt value="">Rigido / Solido</SelectOpt>
            <SelectOpt value="Disco Rigido">Disco Rigido</SelectOpt>
            <SelectOpt value="Disco Solido">Disco Solido</SelectOpt>
            <SelectOpt value="Disco Solido en Formato M.2">Disco Solido M.2</SelectOpt>
            <SelectOpt value="Disco Solido en Formato NVMe">Disco Solido NVMe</SelectOpt>
          </Select>
        </InputContainer>
        <InputContainer>
          <Label>*Marca</Label>
          <Input
            type="text"
            name="marca"
            value={disco.marca}
            placeholder="Marca"
            onChange={(e) => setDisco({ ...disco, marca: e.target.value.toUpperCase() })}
          />
        </InputContainer>
        <InputContainer>
          <Label>Modelo</Label>
          <Input
            type="text"
            name="modelo"
            value={disco.modelo}
            placeholder="Modelo"
            onChange={(e) => setDisco({ ...disco, modelo: e.target.value.toUpperCase() })}
          />
        </InputContainer>
        <InputContainer>
          <Label>Serial Nº</Label>
          <Input
            type="text"
            name="serialNumber"
            value={disco.serialNumber}
            placeholder="Serial Nº"
            onChange={(e) => setDisco({ ...disco, serialNumber: e.target.value.toUpperCase() })}
          />
        </InputContainer>
        <InputContainer>
          <Label>*almacenamiento</Label>
          <Input
            type="text"
            name="almacenamiento"
            value={disco.almacenamiento}
            placeholder="500 GB / 1 TB"
            onChange={(e) => setDisco({ ...disco, almacenamiento: e.target.value.toUpperCase() })}
          />
        </InputContainer>

        <InputContainer>
          <Label>Herramienta Software</Label>
          <Select value={disco.herramientaSoftDisco} onChange={(e) => setDisco({ ...disco, herramientaSoftDisco: e.target.value })}>
            <SelectOpt value="">Herramienta Software</SelectOpt>
            <SelectOpt value="Cellebrite, UFED 4PC V7.60">UFED 4PC</SelectOpt>
            <SelectOpt value="Cellebrite, UFED PREMIUM V7.60.702">UFED PREMIUM</SelectOpt>
            <SelectOpt value="Magnet, AXIOM V6.10.0">AXIOM</SelectOpt>
            <SelectOpt value="Opentext, ENCASE V8.11">ENCASE</SelectOpt>
            <SelectOpt value="Grayshift, GREYKEY">GREYKEY</SelectOpt>
            <SelectOpt value="Magnet, DVR EXAMINER V3.50">DVR EXAMINER</SelectOpt>
            <SelectOpt value="TABLEAU TX1 V 22.3.0.3">TABLEAU TX1 V 22.3.0.3</SelectOpt>
            <SelectOpt value="TABLEAU TD3">TABLEAU TD3</SelectOpt>
            <SelectOpt value="TABLEAU FORENSIC BRIDGE (bloqueador de escritura)">
              TABLEAU FORENSIC BRIDGE (bloqueador de escritura)
            </SelectOpt>
          </Select>
        </InputContainer>

        <InputContainer>
          <Label>*¿El Disco Falla?</Label>
          <Select value={disco.discoFallado} onChange={(e) => setDisco({ ...disco, discoFallado: e.target.value })}>
            <SelectOpt value="">Si / No</SelectOpt>
            <SelectOpt value="si">Si</SelectOpt>
            <SelectOpt value="no">No</SelectOpt>
          </Select>
        </InputContainer>

        {disco.discoFallado === "si" && (
          <InputContainer>
            <Label>Observacion Falla</Label>
            <Input
              type="text"
              name="observacionFalla"
              value={disco.observacionFallaDisco}
              placeholder="¿Por que Falla?"
              onChange={(e) => setDisco({ ...disco, observacionFallaDisco: e.target.value })}
            />
          </InputContainer>
        )}

        {disco.herramientaSoftDisco !== "" && disco.discoFallado === "no" && (
          <InputContainer>
            <Label>Adquisición</Label>
            <Select value={disco.adquisicion} onChange={(e) => setDisco({ ...disco, adquisicion: e.target.value })}>
              <SelectOpt value="">Con Exito / Fallo</SelectOpt>
              <SelectOpt value="con exito">Con Exito</SelectOpt>
              <SelectOpt value="fallo">Fallo</SelectOpt>
            </Select>
          </InputContainer>
        )}
        <InputContainer>
          <Label>*Estado</Label>
          <Select value={disco.estadoDisco} onChange={(e) => setDisco({ ...disco, estadoDisco: e.target.value })}>
            <SelectOpt value="">Estado</SelectOpt>
            <SelectOpt value="completo">Completo</SelectOpt>
            <SelectOpt value="en proceso">En Proceso</SelectOpt>
          </Select>
        </InputContainer>
        <Button
          type="submit"
          value="Guardar"
          complete={disco.tipoDeDisco && disco.estadoDisco && disco.marca && disco.almacenamiento ? "true" : "false"}
        />
      </Form>
    </>
  );
}

export default AddDiscoModal;

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
