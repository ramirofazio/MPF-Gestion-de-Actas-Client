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
import { DeviceUnknown } from "@styled-icons/material-outlined/DeviceUnknown";
import { toast } from "react-toastify";

function CreateEfectosCards({ efecto, currentBolsas, handleRemoveEfecto, estadoActa, renderAddEfectosModal, setAddEfectosModal }) {
  const [nroPrecintoBolsa, setNroPrecintoBolsa] = React.useState();
  const [colorPrecintoBolsa, setColorPrecintoBolsa] = React.useState();
  const [estadoBolsa, setestadoBolsa] = React.useState();

  React.useEffect(() => {
    currentBolsas.map((b) => {
      if (b.id === efecto.bolsa_id) {
        setNroPrecintoBolsa(b.nroPrecinto);
        setColorPrecintoBolsa(b.colorPrecinto);
        setestadoBolsa(b.estado);
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
      case "no peritable": {
        return <DeviceUnknown data-tooltip-id="my-tooltip" data-tooltip-content={tipoDeElemento} size={25} className="text-secondary" />;
      }
      case "celular": {
        return <Smartphone data-tooltip-id="my-tooltip" data-tooltip-content={tipoDeElemento} size={25} className="text-secondary" />;
      }
      case "tablet": {
        return <Tablet data-tooltip-id="my-tooltip" data-tooltip-content={tipoDeElemento} size={25} className="text-secondary" />;
      }
      case "unidad de almacenamiento": {
        return <UDisk data-tooltip-id="my-tooltip" data-tooltip-content={tipoDeElemento} size={25} className="text-secondary" />;
      }
      case "gabinete": {
        return <PcDisplay data-tooltip-id="my-tooltip" data-tooltip-content={tipoDeElemento} size={25} className="text-secondary" />;
      }
      case "notebook": {
        return <Computer data-tooltip-id="my-tooltip" data-tooltip-content={tipoDeElemento} size={25} className="text-secondary" />;
      }
      case "disco": {
        if (efecto.tipoDeDisco === "Disco Rigido") {
          return <DeviceHddFill data-tooltip-id="my-tooltip" data-tooltip-content={tipoDeElemento} size={25} className="text-secondary" />;
        } else {
          return <DeviceSsdFill data-tooltip-id="my-tooltip" data-tooltip-content={tipoDeElemento} size={25} className="text-secondary" />;
        }
      }
      case "dvr": {
        return <PcHorizontal data-tooltip-id="my-tooltip" data-tooltip-content={tipoDeElemento} size={25} className="text-secondary" />;
      }
      case "sim": {
        return <SimFill data-tooltip-id="my-tooltip" data-tooltip-content={tipoDeElemento} size={25} className="text-seconadary" />;
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
      className={`mb-2 flex max-h-[12vh] min-h-[12vh] w-[90%] items-center rounded-md border-2 border-principal shadow-md transition ${
        efecto.estado === "en proceso"
          ? "border-r-[15px] border-r-process"
          : efecto.estado === "completo"
          ? "border-r-[15px] border-r-success"
          : "border-r-[15px] border-r-principal"
      }`}
    >
      <div className="ml-5 flex">{selectIcon(efecto.tipoDeElemento)}</div>
      <div className={`cardInfoContainer`}>
        <span className="cardTitle capitalize">Precinto {colorPrecintoBolsa}</span>
        <br />
        {nroPrecintoBolsa}
      </div>
      {efecto.tipoDeElemento === "sim" && (
        <>
          <div className="cardInfoContainer">
            <span className="cardTitle">Empresa</span>
            <br />
            {efecto.empresa || "No Visible"}
          </div>
          <div className="cardInfoContainer">
            <span className="cardTitle">Software</span>
            <br />
            {efecto.herramientaSoft || "No Visible"}
          </div>
          <div className="cardInfoContainer">
            <span className="cardTitle">Extraccion</span>
            <br />
            {efecto.tipoExtraccion || "En Proceso"}
          </div>
        </>
      )}
      {efecto.tipoDeElemento === "no peritable" && (
        <div className="cardInfoContainer">
          <span className="cardTitle">Descripcion</span>
          <br />
          {efecto.descripcionElemento}
        </div>
      )}
      {efecto.tipoDeElemento !== "sim" && efecto.tipoDeElemento !== "no peritable" && (
        <>
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
        </>
      )}
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
            {truncateText(efecto.observacionEncendido || "", 30)}
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

      {(efecto.tipoDeElemento === "notebook" ||
        efecto.tipoDeElemento === "pc" ||
        efecto.tipoDeElemento === "dvr" ||
        efecto.tipoDeElemento === "sim") && (
        <>
          <div className="cardInfoContainer">
            <span className="cardTitle">S/N</span>
            <br />
            {efecto.serialNumber || "No Visible"}
          </div>
          {efecto.tipoDeElemento !== "sim" && (
            <div className="cardInfoContainer">
              <span className="cardTitle">Discos</span>
              <br />
              {efecto.Discos.length}
            </div>
          )}
        </>
      )}

      <div className="cardInfoContainer" style={{ flex: 0.5, marginRight: "10px" }}>
        {efecto.Sims.length !== 0 && <SimFill size={25} className="text-secondary" />}
        {efecto.Discos.length !== 0 && <DeviceHdd size={25} className="text-secondary" />}
        {efecto.Sds.length !== 0 && <SdCardMini size={25} className="text-secondary" />}
      </div>
      {(estadoActa === "en creacion" || estadoActa === "en proceso") && estadoBolsa !== "abierta en proceso con elementos completos" && (
        <DocumentEdit
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Editar"
          size={25}
          className="mr-4 text-secondary transition hover:cursor-pointer hover:text-black"
          onClick={() => LoadEfecto()}
        />
      )}
      {estadoActa === "en creacion" && (
        <Delete
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Eliminar"
          size={25}
          className="mr-6 text-secondary transition hover:cursor-pointer hover:text-black"
          onClick={() => handleRemoveEfecto(efecto.id)}
        />
      )}
    </div>
  );
}

export default CreateEfectosCards;
