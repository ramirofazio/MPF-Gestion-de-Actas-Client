import React from "react";
//* Styles
import styled from "styled-components";
import GlobalStyles from "../../../Styles/GlobalStyles";
import Variables from "../../../Styles/Variables";
import { Smartphone } from "@styled-icons/material-outlined/Smartphone";
import { UDisk } from "@styled-icons/remix-line/UDisk";
import { PcDisplay } from "@styled-icons/bootstrap/PcDisplay";
import { Tablet } from "@styled-icons/entypo/Tablet";
import { Computer } from "@styled-icons/material-outlined/Computer";
import { DeviceHddFill } from "@styled-icons/bootstrap/DeviceHddFill";
import { SimFill } from "@styled-icons/bootstrap/SimFill";
import { SdCardMini } from "@styled-icons/remix-fill/SdCardMini";
import { Delete } from "@styled-icons/fluentui-system-filled/Delete";
//* Initializations
const { redColor, greenColor, yellowColor, principalColor, secondaryColor } = Variables;
const { cardTitle, cardInfo } = GlobalStyles;

function CreateEfectosCards({ efecto, currentBolsas, handleRemoveEfecto, estadoActa }) {
  const [nroPrecintoBolsa, setNroPrecintoBolsa] = React.useState();
  const [colorPrecintoBolsa, setColorPrecintoBolsa] = React.useState();

  React.useEffect(() => {
    currentBolsas.map((b) => {
      if (b.id === efecto.bolsa_id) {
        setNroPrecintoBolsa(b.nroPrecinto);
        setColorPrecintoBolsa(b.colorPrecinto);
      }
    });
  }, []);

  const selectIcon = (tipoDeElemento) => {
    switch (tipoDeElemento) {
      case "celular": {
        return <SmartphoneIcon />;
      }
      case "tablet": {
        return <TabletIcon />;
      }
      case "pendrive": {
        return <PendriveIcon />;
      }
      case "pc": {
        return <PcIcon />;
      }
      case "notebook": {
        return <NotebookIcon />;
      }
      default: {
        return;
      }
    }
  };

  return (
    <EfectoContainer estado={efecto.estado}>
      <Info style={{ flex: 0, marginLeft: "10px" }}>{selectIcon(efecto.tipoDeElemento)}</Info>
      <Info style={colorPrecintoBolsa === "rojo" ? { color: redColor } : { color: greenColor }}>
        <CardTitle>Bolsa Nro</CardTitle>
        <br />
        {nroPrecintoBolsa}
      </Info>
      <Info>
        <CardTitle>Marca</CardTitle>
        <br />
        {efecto.marca || "Ninguna"}
      </Info>
      <Info>
        <CardTitle>Modelo</CardTitle>
        <br />
        {efecto.modelo || "Ninguna"}
      </Info>
      {efecto.encendido === "no" && (
        <>
          <Info>
            <CardTitle>Encendido</CardTitle>
            <br />
            {efecto.encendido}
          </Info>
          <Info>
            <CardTitle>Observacion</CardTitle>
            <br />
            {efecto.observacionEncendido}
          </Info>
        </>
      )}
      {(efecto.encendido === "si" || efecto.tipoDeElemento === "pendrive") && (
        <>
          {efecto.elementoFallado === "si" ? (
            <>
              <Info>
                <CardTitle>Fallado</CardTitle>
                <br />
                {efecto.elementoFallado}
              </Info>
              <Info>
                <CardTitle>Observacion</CardTitle>
                <br />
                {efecto.observacionFalla}
              </Info>
            </>
          ) : (
            <>
              <Info>
                <CardTitle>{efecto.tipoDeElemento === "pendrive" ? "Almacenamiento" : "Tipo de Seguridad"}</CardTitle>
                <br />
                {efecto.tipoDeElemento === "pendrive" ? `${efecto.almacenamiento} GB` : efecto.tipoSeguridad || "Ninguna"}
              </Info>
              {(efecto.desbloqueo === "si" || efecto.extraccion) && (
                <Info>
                  <CardTitle>{efecto.tipoDeElemento === "pendrive" ? "Extraccion" : "Tipo de Extraccion"}</CardTitle>
                  <br />
                  {efecto.tipoDeElemento === "pendrive" ? efecto.extraccion : efecto.tipoExtraccion || "Ninguna"}
                </Info>
              )}
              {efecto.desbloqueo === "no" && (
                <Info>
                  <CardTitle>Desbloqueo</CardTitle>
                  <br />
                  {efecto.desbloqueo}
                </Info>
              )}
            </>
          )}
        </>
      )}
      {(efecto.tipoDeElemento === "notebook" || efecto.tipoDeElemento === "pc") && (
        <Info>
          <CardTitle>Cant. Discos</CardTitle>
          <br />
          {efecto.Discos.length}
        </Info>
      )}
      <Info style={{ flex: 0.5, marginRight: "10px" }}>
        {efecto.Sims.length !== 0 && <SimIcon />}
        {efecto.Discos.length !== 0 && <DiscoIcon />}
        {efecto.Sds.length !== 0 && <SdIcon />}
      </Info>
      {estadoActa === "en creacion" && <DeleteIcon onClick={() => handleRemoveEfecto(efecto.id)} />}
    </EfectoContainer>
  );
}

export default CreateEfectosCards;

const EfectoContainer = styled.div`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 90%;
  min-height: 60px;
  margin-top: 5px;
  border: 2px solid ${principalColor};
  border-radius: 5px;
  transition: all 0.3s ease;

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

const SmartphoneIcon = styled(Smartphone)`
  width: 25px;
  color: ${secondaryColor};
`;

const NotebookIcon = styled(Computer)`
  width: 25px;
  color: ${secondaryColor};
`;
const PcIcon = styled(PcDisplay)`
  width: 25px;
  color: ${secondaryColor};
`;
const TabletIcon = styled(Tablet)`
  width: 25px;
  color: ${secondaryColor};
`;
const PendriveIcon = styled(UDisk)`
  width: 25px;
  color: ${secondaryColor};
`;

const SdIcon = styled(SdCardMini)`
  width: 25px;
  color: ${secondaryColor};
`;
const DiscoIcon = styled(DeviceHddFill)`
  width: 25px;
  color: ${secondaryColor};
`;

const SimIcon = styled(SimFill)`
  width: 25px;
  color: ${secondaryColor};
`;

const DeleteIcon = styled(Delete)`
  width: 25px;
  color: ${secondaryColor};
  transition: all 0.5s ease;
  margin-right: 20px;

  &:hover {
    color: black;
    cursor: pointer;
  }
`;
