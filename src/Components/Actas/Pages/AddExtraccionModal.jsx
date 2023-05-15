import React from "react";
//*Components
import AddTipoExtraccionModal from "./AddTipoExtraccionModal";
//* Style
import Modal from "react-modal";
import styled, { css } from "styled-components";
import GlobalStyles from "../../../Styles/GlobalStyles";
import Variables from "../../../Styles/Variables";
import { Close } from "@styled-icons/ionicons-outline/Close";
import { PlusSquareDotted } from "@styled-icons/bootstrap/PlusSquareDotted";
import { Delete } from "@styled-icons/fluentui-system-filled/Delete";
//* Initializations
const { button, select, input, modal40x40 } = GlobalStyles;
const { redColor, greenColor, secondaryColor, principalColor } = Variables;

function AddExtraccionModal({ extracciones, setExtracciones, setAddExtraccionModal, toast }) {
  React.useEffect(() => {
    return () => {
      localStorage.setItem("currentExtraccion", null);
    };
  });

  const [addTipoExtraccionModal, setAddTipoExtraccionModal] = React.useState(false);

  const [tiposDeExtraccion, setTiposDeExtraccion] = React.useState([]);
  const [extraccion, setExtraccion] = React.useState(
    JSON.parse(localStorage.getItem("currentExtraccion")) || {
      herramientaSoft: "",
      tipos: tiposDeExtraccion,
    }
  );

  const handleExtraccionSubmit = (e) => {
    e.preventDefault();
    setAddExtraccionModal(false);
    setExtracciones([...extracciones, extraccion]);
    setExtraccion({
      herramientaSoft: "",
      tipos: tiposDeExtraccion,
    });
    if (extraccion.edit) {
      toast.success("Extraccion Editada con Exito!");
    } else {
      toast.success("Extraccion Guardada con Exito!");
    }
  };

  React.useEffect(() => {
    setExtraccion({ ...extraccion, tipos: tiposDeExtraccion });
  }, [tiposDeExtraccion]);

  const handleTipoExtraccionSubmit = (e, tipoExtraccion) => {
    e.preventDefault();
    if (tipoExtraccion.nombre && tipoExtraccion.estado) {
      setAddTipoExtraccionModal(false);
      setTiposDeExtraccion([...tiposDeExtraccion, tipoExtraccion]);
      toast.success("¡Tipos de extraccion guardadas con exito!");
    } else {
      toast.error("¡Faltan datos para completar el tipo de extraccion!");
    }
  };

  const handleAddTipoExtraccionButtonClick = () => {
    setAddTipoExtraccionModal(!addTipoExtraccionModal);
  };

  const handleRemoveTipoExtraccion = (fakeId) => {
    const newExtracciones = tiposDeExtraccion.filter((e) => e.fakeId !== fakeId);
    setTiposDeExtraccion(newExtracciones);
    toast.success("¡Tipo de extraccion eliminada con exito!");
  };

  return (
    <>
      <CloseIcon onClick={() => setAddExtraccionModal(false)} />
      <Form onSubmit={handleExtraccionSubmit}>
        <Title>{extraccion.edit ? "Editar" : "Agregar"} Extracciones</Title>
        <InputContainer>
          <Label>Software</Label>
          <select
            className="select"
            value={extraccion.herramientaSoft}
            onChange={(e) => setExtraccion({ ...extraccion, herramientaSoft: e.target.value })}
          >
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
          </select>
        </InputContainer>
        <div className="flex-1 w-full flex flex-col items-center">
          <h1 className="text-center text-1xl mb-5">Extracciones</h1>
          {tiposDeExtraccion &&
            tiposDeExtraccion.map((e) => (
              <div key={e.fakeId} className="flex items-center justify-around w-full h-14 mb-3 rounded-md bg-base text-black">
                <div className="flex flex-col items-center">
                  <span className="underline">Tipo</span>
                  <span className="text-secondary">{e.nombre}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="underline">Estado</span>
                  <span className="text-secondary">{e.estado}</span>
                </div>
                {e.estado === "fallo" && (
                  <div className="flex flex-col items-center">
                    <span className="underline">Observacion</span>
                    <span className="text-secondary">{e.observacionFalla}</span>
                  </div>
                )}
                <Delete
                  onClick={() => handleRemoveTipoExtraccion(e.fakeId)}
                  size={20}
                  className="text-black transition duration-500 hover:cursor-pointer hover:text-secondary"
                />
              </div>
            ))}
          <PlusSquareDotted
            className="transition duration-500 hover:text-secondary hover:cursor-pointer "
            color={extraccion.herramientaSoft ? "white" : secondaryColor}
            size={35}
            onClick={() =>
              extraccion.herramientaSoft
                ? handleAddTipoExtraccionButtonClick()
                : toast.warning("¡Primero debe seleccionar una heramienta de software!")
            }
          />
        </div>
        <Button type="submit" value={extraccion.edit ? "Guardar" : "Agregar"} complete={"true"} />
      </Form>

      <Modal isOpen={addTipoExtraccionModal} style={modal40x40} ariaHideApp={false}>
        <AddTipoExtraccionModal
          setAddTipoExtraccionModal={setAddTipoExtraccionModal}
          handleTipoExtraccionSubmit={handleTipoExtraccionSubmit}
        />
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
