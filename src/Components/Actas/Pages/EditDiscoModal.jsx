import React from "react";
//* Style
import styled, { css } from "styled-components";
import GlobalStyles from "../../../Styles/GlobalStyles";
import Variables from "../../../Styles/Variables";
import { Close } from "@styled-icons/ionicons-outline/Close";
import { DeviceHddFill, DeviceSsdFill } from "styled-icons/bootstrap";
import { DocumentEdit } from "@styled-icons/fluentui-system-regular/DocumentEdit";
import { AppsAddIn } from "@styled-icons/fluentui-system-regular/AppsAddIn";
//* Initializations
const { cardTitle, cardInfo, button } = GlobalStyles;
const { redColor, greenColor, yellowColor, secondaryColor, principalColor } = Variables;

function EditDiscoModal({ setEditDiscosModal, setAddDiscosModal, discos, renderAddDiscoModal }) {
  const handleAddAnotherDisk = (e) => {
    e.preventDefault();
    setEditDiscosModal(false);
    setAddDiscosModal(true);
    renderAddDiscoModal();
  };

  const handleEditDisco = (disco) => {
    setEditDiscosModal(false);
    localStorage.setItem("currentDisco", JSON.stringify({ ...disco, edit: true }));
    setAddDiscosModal(true);
    renderAddDiscoModal();
  };

  return (
    <>
      <CloseIcon onClick={() => setEditDiscosModal(false)} />
      <Title>Agregar o Editar Discos</Title>
      <DiscosContainer>
        {discos.map((d) => (
          <DiscoContainer estado={d.estadoDisco}>
            <Info>{d.tipoDeDisco === "Disco Rigido" ? <HddIcon /> : <SsdIcon />}</Info>
            <Info>
              <CardTitle>Marca</CardTitle>
              <br />
              {d.marca}
            </Info>
            <Info>
              <CardTitle>S/N</CardTitle>
              <br />
              {d.serialNumber || "Ninguno"}
            </Info>
            <Info>
              <CardTitle>Alm.</CardTitle>
              <br />
              {d.almacenamiento}
            </Info>
            <Info>
              <CardTitle>Adquisicion</CardTitle>
              <br />
              {d.adquisicion}
            </Info>
            <EditIcon onClick={() => handleEditDisco(d)} />
          </DiscoContainer>
        ))}
        {discos.length === 0 && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", height: "100%", width: "50%" }}>
            <h3 style={{ color: "white" }}>¡No hay Discos, agrega una!</h3>
            <AppsAddInIcon />
          </div>
        )}
      </DiscosContainer>
      <OptButton onClick={(e) => handleAddAnotherDisk(e)}>Agregar Nuevo Disco</OptButton>
    </>
  );
}

export default EditDiscoModal;

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
const DiscosContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 50%;
  height: 250px;
  overflow-y: scroll;
`;

const DiscoContainer = styled.div`
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

const HddIcon = styled(DeviceHddFill)`
  width: 25px;
  color: ${secondaryColor};
`;

const SsdIcon = styled(DeviceSsdFill)`
  width: 25px;
  color: ${secondaryColor};
`;

const AppsAddInIcon = styled(AppsAddIn)`
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
