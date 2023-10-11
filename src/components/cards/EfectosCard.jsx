import React from "react";
import { Icons as I } from "assets";
import { toast } from "react-toastify";
import { CardElement } from ".";

export function EfectosCard({ efecto, currentBolsas, handleRemoveEfecto, estadoActa, renderAddEfectosModal, setAddEfectosModal }) {
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
        return <I.deviceUnknown data-tooltip-id="my-tooltip" data-tooltip-content={tipoDeElemento} size={25} className="text-secondary" />;
      }
      case "celular": {
        return <I.smartphone data-tooltip-id="my-tooltip" data-tooltip-content={tipoDeElemento} size={25} className="text-secondary" />;
      }
      case "tablet": {
        return <I.tablet data-tooltip-id="my-tooltip" data-tooltip-content={tipoDeElemento} size={25} className="text-secondary" />;
      }
      case "unidad de almacenamiento": {
        return <I.uDisk data-tooltip-id="my-tooltip" data-tooltip-content={tipoDeElemento} size={25} className="text-secondary" />;
      }
      case "gabinete": {
        return <I.pcDisplay data-tooltip-id="my-tooltip" data-tooltip-content={tipoDeElemento} size={25} className="text-secondary" />;
      }
      case "notebook": {
        return <I.computer data-tooltip-id="my-tooltip" data-tooltip-content={tipoDeElemento} size={25} className="text-secondary" />;
      }
      case "disco": {
        if (efecto.tipoDeDisco === "Disco Rigido") {
          return <I.hdd data-tooltip-id="my-tooltip" data-tooltip-content={tipoDeElemento} size={25} className="text-secondary" />;
        } else {
          return <I.ssd data-tooltip-id="my-tooltip" data-tooltip-content={tipoDeElemento} size={25} className="text-secondary" />;
        }
      }
      case "dvr": {
        return <I.pcHorizontal data-tooltip-id="my-tooltip" data-tooltip-content={tipoDeElemento} size={25} className="text-secondary" />;
      }
      case "sim": {
        return <I.simCard data-tooltip-id="my-tooltip" data-tooltip-content={tipoDeElemento} size={25} className="text-seconadary" />;
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
      {efecto.unidadAlmacenamientoDetalle !== "disco optico" && efecto.unidadAlmacenamientoDetalle !== "disquete" ? (
        <>
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
        </>
      ) : (
        <>
          <CardElement title={"Cantidad Total"} value={efecto.cantidadTotal} />
          <CardElement title={"Interes"} value={efecto.interes} />
          {efecto.interes === "si" && <CardElement title={"Cantidad Interes"} value={efecto.cantidadInteres} />}
        </>
      )}
      <div className="cardInfoContainer" style={{ flex: 0.5, marginRight: "10px" }}>
        {efecto.Sims.length !== 0 && (
          <I.simCard
            size={25}
            className={`${efecto.Sims.some((s) => s.tipoExtraccionSim === "en proceso") ? "text-process" : "text-secondary"}`}
          />
        )}
        {efecto.Discos.length !== 0 && (
          <I.hdd
            size={25}
            className={`${efecto.Discos.some((s) => s.tipoExtraccionDisco === "en proceso") ? "text-process" : "text-secondary"}`}
          />
        )}
        {efecto.Sds.length !== 0 && (
          <I.sdCard
            size={25}
            className={`${efecto.Sds.some((s) => s.tipoExtraccionSd === "en proceso") ? "text-process" : "text-secondary"}`}
          />
        )}
      </div>
      {estadoBolsa !== "cerrada" && (
        <I.documentEdit
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Editar"
          size={25}
          className="mr-4 text-secondary transition hover:cursor-pointer hover:text-black"
          onClick={() => LoadEfecto()}
        />
      )}
      {estadoActa === "en creacion" && (
        <I.trashCan
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
