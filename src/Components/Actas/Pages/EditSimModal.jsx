import React from "react";
//* Style
import styled from "styled-components";
import GlobalStyles from "../../../Styles/GlobalStyles";
import Variables from "../../../Styles/Variables";
import { Close } from "@styled-icons/ionicons-outline/Close";
import { SimFill } from "styled-icons/bootstrap";
import { DocumentEdit } from "@styled-icons/fluentui-system-regular/DocumentEdit";
//* Initializations
const { cardTitle, cardInfo, button } = GlobalStyles;
const { redColor, greenColor, yellowColor, secondaryColor, principalColor } = Variables;

function EditSimModal({ setEditSimsModal, setAddSimsModal, sims, renderAddSimModal }) {
  const handleAnotherSim = (e) => {
    e.preventDefault();
    setEditSimsModal(false);
    setAddSimsModal(true);
    renderAddSimModal();
  };

  const handleEditSim = (sim) => {
    setEditSimsModal(false);
    localStorage.setItem("currentSim", JSON.stringify({ ...sim, edit: true }));
    setAddSimsModal(true);
    renderAddSimModal();
  };

  return (
    <>
      <CloseIcon onClick={() => setEditSimsModal(false)} />
      <Title>Agregar o Editar Sims</Title>
      <SimsContainer>
        {sims.map((s) => (
          <SimContainer estado={"completo"}>
            <Info>
              <SimIcon />
            </Info>
            <Info>
              <CardTitle>Empresa</CardTitle>
              <br />
              {s.empresaSim}
            </Info>
            <Info>
              <CardTitle>S/N</CardTitle>
              <br />
              {s.serialSim || "Ninguno"}
            </Info>

            <Info>
              <CardTitle>Extraccion</CardTitle>
              <br />
              {s.tipoExtraccionSim || "Ninguna"}
            </Info>
            <EditIcon onClick={() => handleEditSim(s)} />
          </SimContainer>
        ))}
      </SimsContainer>
      <OptButton onClick={(e) => handleAnotherSim(e)}>Agregar Nuevo Sim</OptButton>
    </>
  );
}

export default EditSimModal;

const Title = styled.h4`
  border-bottom: 2px solid white;
  width: 120%;
  text-align: center;
  margin-bottom: 2%;
  margin-top: 3%;
  padding-bottom: 10px;
  color: white;
`;

const CloseIcon = styled(Close)`
  position: absolute;
  right: 0;
  top: 0;
  width: 5%;
  margin-top: 1%;
  color: white;
  transition: all 0.5s ease;

  &:hover {
    color: ${secondaryColor};
    cursor: pointer;
  }
`;
const SimsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 50%;
  height: 250px;
  overflow-y: scroll;
`;

const SimContainer = styled.div`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 90%;
  min-height: 70px;
  margin-top: 5px;
  border: 2px solid ${principalColor};
  border-radius: 5px;
  transition: all 0.3s ease;
  background-color: white;

  border-right: ${(props) =>
    props.estado === "en proceso"
      ? `15px solid ${yellowColor}`
      : props.estado === "completo"
      ? `15px solid ${greenColor}`
      : `15px solid ${redColor}`};
`;

const Info = styled.span`
  ${cardInfo}
`;

const CardTitle = styled.strong`
  ${cardTitle}
`;

const SimIcon = styled(SimFill)`
  width: 25px;
  color: ${secondaryColor};
`;

const EditIcon = styled(DocumentEdit)`
  width: 25px;
  margin-right: 40px;
  color: ${secondaryColor};
  transition: all 0.3s ease;

  &:hover {
    color: black;
    cursor: pointer;
  }
`;

const OptButton = styled.button`
  ${button}
  padding: 5px;
  padding-inline: 15px;
  text-decoration: none;
  background: white;
  border: 2px solid ${greenColor};
  margin-top: 1%;
  margin-bottom: 1%;

  &:hover {
    cursor: pointer;
    background-color: white;
    color: ${principalColor};
    border: 2px solid transparent;
  }
`;
