import React from "react";
//* Style
import Modal from "react-modal";
import styled, { css } from "styled-components";
import GlobalStyles from "../../../Styles/GlobalStyles";
import Variables from "../../../Styles/Variables";
import { Close } from "@styled-icons/ionicons-outline/Close";
import { PlusSquareDotted } from "@styled-icons/bootstrap/PlusSquareDotted";
//* Initializations
const { button, select, input, modal40x40 } = GlobalStyles;
const { redColor, greenColor, secondaryColor, principalColor } = Variables;

const modal30Width = {
  content: {
    ...modal40x40.content,
    width: "35%",
    height: "min-content",
  },
};

function AddExtraccionModal({ extracciones, setExtracciones, setAddExtraccionModal, toast }) {
  React.useEffect(() => {
    return () => {
      localStorage.setItem("currentExtraccion", null);
    };
  });

  const [addTipoExtraccionModal, setAddTipoExtraccionModal] = React.useState(false);

  const [tiposExtraccion, setTiposExtraccion] = React.useState([]);
  const [extraccion, setExtraccion] = React.useState(
    JSON.parse(localStorage.getItem("currentExtraccion")) || {
      herramientaSoft: "",
      tipos: tiposExtraccion,
    }
  );

  const handleExtraccionSubmit = (e) => {
    e.preventDefault();
    setAddExtraccionModal(false);
    setExtracciones([...extracciones, extraccion]);
    setExtraccion({
      herramientaSoft: "",
      tipos: tiposExtraccion,
    });
    if (extraccion.edit) {
      toast.success("Extraccion Editada con Exito!");
    } else {
      toast.success("Extraccion Guardada con Exito!");
    }
  };

  const HandleTipoExtraccionSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setTiposExtraccion([...tiposExtraccion, e.target.value]);
  };

  const HandleAddTipoExtraccion = () => {
    setAddTipoExtraccionModal(!addTipoExtraccionModal);
  };

  return (
    <>
      <CloseIcon onClick={() => setAddExtraccionModal(false)} />
      <Form onSubmit={handleExtraccionSubmit}>
        <Title>{extraccion.edit ? "Editar" : "Agregar"} Extracciones</Title>
        <InputContainer>
          <Label>Software</Label>
          <Select value={extraccion.herramientaSoft} onChange={(e) => setExtraccion({ ...extraccion, herramientaSoft: e.target.value })}>
            <SelectOpt value="">Seleccione Herramienta</SelectOpt>
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
        <div class="flex-1 w-full flex flex-col items-center">
          <h1 class="text-center text-1xl">Extracciones</h1>
          <PlusSquareDotted color={secondaryColor} size={35} onClick={(e) => HandleAddTipoExtraccion()} />
        </div>
        <Button type="submit" value={extraccion.edit ? "Guardar" : "Agregar"} complete={"true"} />
      </Form>

      <Modal isOpen={addTipoExtraccionModal} style={modal40x40} ariaHideApp={false}>
        <div class="w-full h-full bg-slate-200">
          <h1>Hola soy un modal</h1>
        </div>
      </Modal>
    </>
  );
}

export default AddExtraccionModal;

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
