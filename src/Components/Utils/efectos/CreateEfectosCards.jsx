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
// import { DeviceHddFill } from "@styled-icons/bootstrap/DeviceHddFill";
// import { SimFill } from "@styled-icons/bootstrap/SimFill";
// import { SdCardMini } from "@styled-icons/remix-fill/SdCardMini";
//* Initializations
const { redColor, greenColor, yellowColor, principalColor, secondaryColor } = Variables;
const { cardTitle, cardInfo } = GlobalStyles;

function CreateEfectosCards({ efecto, currentBolsas }) {
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
        {efecto.marca}
      </Info>
      <Info>
        <CardTitle>Modelo</CardTitle>
        <br />
        {efecto.modelo}
      </Info>
      <Info>
        <CardTitle>{efecto.tipoDeElemento === "pendrive" ? "Extraccion" : "Tipo de Extraccion"}</CardTitle>
        <br />
        {efecto.tipoDeElemento === "pendrive" ? efecto.extraccion : efecto.tipoExtraccion}
      </Info>
      <Info>
        <CardTitle>Estado</CardTitle>
        <br />
        {efecto.estado}
      </Info>
      {/* <Info style={{ flex: 0.5, marginRight: "10px" }}>
        {efecto.Sims.length > 0 && <SimIcon />}
        {efecto.Discos.length > 0 && <DiscoIcon />}
        {efecto.Sds.length > 0 && <SdIcon />}
      </Info> */}
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

// const SdIcon = styled(SdCardMini)`
//   width: 25px;
//   color: ${secondaryColor};
// `;
// const DiscoIcon = styled(DeviceHddFill)`
//   width: 25px;
//   color: ${secondaryColor};
// `;

// const SimIcon = styled(SimFill)`
//   width: 25px;
//   color: ${secondaryColor};
// `;
