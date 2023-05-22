import React from "react";
//* Styles
import { PcHorizontal, PcDisplay, DeviceHddFill, SimFill, DeviceSsdFill, DeviceHdd } from "styled-icons/bootstrap";
import { Smartphone } from "@styled-icons/material-outlined/Smartphone";
import { UDisk } from "@styled-icons/remix-line/UDisk";
import { Tablet } from "@styled-icons/entypo/Tablet";
import { Computer } from "@styled-icons/material-outlined/Computer";
import { SdCardMini } from "@styled-icons/remix-fill/SdCardMini";
import { Delete } from "@styled-icons/fluentui-system-filled/Delete";
import { DocumentEdit } from "@styled-icons/fluentui-system-regular/DocumentEdit";
import { toast } from "react-toastify";

function CreateEfectosCards({ efecto, currentBolsas, handleRemoveEfecto, estadoActa, renderAddEfectosModal, setAddEfectosModal }) {
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

  const LoadEfecto = () => {
    toast.warning("¡Para ver reflejados los cambios hay que guardar el elemento!", {
      position: "top-center",
      autoClose: 5000,
    });
    localStorage.setItem("currentEfecto", JSON.stringify({ ...efecto, edit: true }));
    setAddEfectosModal(true);
    renderAddEfectosModal();
  };

  const selectIcon = (tipoDeElemento) => {
    switch (tipoDeElemento) {
      case "celular": {
        return <Smartphone size={25} className="text-secondary" />;
      }
      case "tablet": {
        return <Tablet size={25} className="text-secondary" />;
      }
      case "unidad de almacenamiento": {
        return <UDisk size={25} className="text-secondary" />;
      }
      case "gabinete": {
        return <PcDisplay size={25} className="text-secondary" />;
      }
      case "notebook": {
        return <Computer size={25} className="text-secondary" />;
      }
      case "disco": {
        if (efecto.tipoDeDisco === "Disco Rigido") {
          return <DeviceHddFill size={25} className="text-secondary" />;
        } else {
          return <DeviceSsdFill size={25} className="text-secondary" />;
        }
      }
      case "dvr": {
        return <PcHorizontal size={25} className="text-secondary" />;
      }
      default: {
        return;
      }
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div
      className={`mb-2 flex min-h-[10vh] w-[90%] items-center justify-evenly rounded-md border-2 border-principal ${
        efecto.estado === "en proceso"
          ? "border-r-[15px] border-r-process"
          : efecto.estado === "completo"
          ? "border-r-[15px] border-r-success"
          : "border-r-[15px] border-r-principal"
      }`}
    >
      <div className="ml-5 flex">{selectIcon(efecto.tipoDeElemento)}</div>
      <div className={`cardInfoContainer ${colorPrecintoBolsa === "rojo" ? "text-error" : "text-success"}`}>
        <span className="cardTitle">Precinto</span>
        <br />
        {nroPrecintoBolsa}
      </div>
      <div className="cardInfoContainer">
        <span className="cardTitle">Marca</span>
        <br />
        {efecto.marca || "No Visible"}
      </div>
      <div className="cardInfoContainer">
        <span className="cardTitle">Modelo</span>
        <br />
        {efecto.modelo || "No Visible"}
      </div>
      {efecto.encendido === "no" && (
        <>
          <div className="cardInfoContainer">
            <span className="cardTitle">Encendido</span>
            <br />
            {efecto.encendido}
          </div>
          <div className="cardInfoContainer">
            <span className="cardTitle">Observacion</span>
            <br />
            {truncateText(efecto.observacionEncendido || "", 40)}
          </div>
        </>
      )}
      {(efecto.encendido === "si" || efecto.tipoDeElemento === "unidad de almacenamiento") && (
        <>
          {efecto.elementoFallado === "si" ? (
            <>
              <div className="cardInfoContainer">
                <span className="cardTitle">Falla</span>
                <br />
                {efecto.elementoFallado}
              </div>
              <div className="cardInfoContainer">
                <span className="cardTitle">Observacion</span>
                <br />
                {truncateText(efecto.observacionFalla || "", 40)}
              </div>
            </>
          ) : (
            <>
              {(efecto.tipoDeElemento === "unidad de almacenamiento" || efecto.tipoDeElemento === "disco") && (
                <>
                  <div className="cardInfoContainer">
                    <span className="cardTitle">S/N</span>
                    <br />
                    {efecto.serialNumber || "No Visible"}
                  </div>
                  <div className="cardInfoContainer">
                    <span className="cardTitle">Almacenamiento</span>
                    <br />
                    {efecto.almacenamiento || "No visible"}
                  </div>
                  <div className="cardInfoContainer capitalize">
                    <span className="cardTitle">Adquisicion</span>
                    <br />
                    {efecto.adquisicion}
                  </div>
                </>
              )}

              {(efecto.desbloqueo || efecto.extraccion) && (
                <>
                  {efecto.tipoDeElemento !== "unidad de almacenamiento" && (
                    <div className="cardInfoContainer">
                      <span className="cardTitle">Seguridad</span>
                      <br />
                      {efecto.tipoSeguridad}
                    </div>
                  )}
                  <div className="cardInfoContainer">
                    <span className="cardTitle">Extracciones</span>
                    <br />
                    {efecto.Extraccions.length}
                  </div>
                  {efecto.desbloqueo === "no" && (
                    <div className="cardInfoContainer">
                      <span className="cardTitle">Desbloqueo</span>
                      <br />
                      {efecto.desbloqueo}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}

      {(efecto.tipoDeElemento === "notebook" || efecto.tipoDeElemento === "pc" || efecto.tipoDeElemento === "dvr") && (
        <>
          <div className="cardInfoContainer">
            <span className="cardTitle">S/N</span>
            <br />
            {efecto.serialNumber || "No Visible"}
          </div>
          <div className="cardInfoContainer">
            <span className="cardTitle">Cant. Discos</span>
            <br />
            {efecto.Discos.length}
          </div>
        </>
      )}

      <div className="cardInfoContainer" style={{ flex: 0.5, marginRight: "10px" }}>
        {efecto.Sims.length !== 0 && <SimFill size={25} className="text-secondary" />}
        {efecto.Discos.length !== 0 && <DeviceHdd size={25} className="text-secondary" />}
        {efecto.Sds.length !== 0 && <SdCardMini size={25} className="text-secondary" />}
      </div>
      {(estadoActa === "en creacion" || estadoActa === "en proceso") && (
        <DocumentEdit
          size={25}
          className="mr-4 text-secondary transition hover:cursor-pointer hover:text-black"
          onClick={() => LoadEfecto()}
        />
      )}
      {estadoActa === "en creacion" && (
        <Delete
          size={25}
          className="mr-6 text-secondary transition hover:cursor-pointer hover:text-black"
          onClick={() => handleRemoveEfecto(efecto.id)}
        />
      )}
    </div>
  );
}

export default CreateEfectosCards;
