import React from "react";
import Modal from "react-modal";
import { createEfecto, EditEfecto } from "redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { modal40x40 } from "utils/index";
import { toast } from "react-toastify";
import {
  AddDiscoModal,
  AddSimModal,
  AddSdModal,
  AddExtraccionModal,
  EditDiscoModal,
  EditSimModal,
  EditSdsModal,
  EditExtraccionModal,
} from "pages/index";

const modal40x30 = {
  content: {
    ...modal40x40.content,
    width: "30%",
    height: "max-content",
    minHeight: "30%",
  },
};

export function AddEfectos({ alternModal, selectedBag }) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    return () => {
      localStorage.setItem("currentEfecto", null);
    };
  }, []);

  const currentActa = useSelector((s) => JSON.parse(localStorage.getItem("currentActa")) || s?.currentActa);

  const [addDiscosModal, setAddDiscosModal] = React.useState(false);
  const [editDiscosModal, setEditDiscosModal] = React.useState(false);
  const [discos, setDiscos] = React.useState([]);

  const [addSimsModal, setAddSimsModal] = React.useState(false);
  const [editSimsModal, setEditSimsModal] = React.useState(false);
  const [sims, setSims] = React.useState([]);

  const [addSdsModal, setAddSdsModal] = React.useState(false);
  const [editSdsModal, setEditSdsModal] = React.useState(false);
  const [sds, setSds] = React.useState([]);

  const [addExtraccionesModal, setAddExtraccionModal] = React.useState(false);
  const [editExtraccionesModal, setEditExtraccionesModal] = React.useState(false);
  const [extracciones, setExtracciones] = React.useState([]);

  const [efecto, setEfecto] = React.useState(
    JSON.parse(localStorage.getItem("currentEfecto")) || {
      bolsa_id: Number(selectedBag.id),
      tipoDeElemento: "",
      tipoDeDisco: "",
      marca: "",
      modelo: "",
      descripcionElemento: "",
      imei: "",
      empresa: "",
      estado: "completo",
      tipoSeguridad: "",
      desbloqueo: "",
      herramientaSoft: "",
      tipoExtraccion: "",
      extraccion: "",
      almacenamiento: "",
      serialNumber: "",
      encendido: "",
      observacionEncendido: "",
      elementoFallado: "",
      observacionFalla: "",
      color: "",
      unidadAlmacenamientoDetalle: "",
      adquisicion: "",
      herramientaSoft: "",
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleComplete()) {
      if (efecto.edit) {
        dispatch(EditEfecto(efecto, discos, sims, sds, extracciones, currentActa.id));
      } else {
        dispatch(createEfecto(efecto, discos, sims, sds, extracciones, currentActa.id));
      }
      alternModal();
    } else {
      toast.warning("¡Faltan datos necesarios para el Elemento!");
    }
  };

  const handleComplete = () => {
    const { bolsa_id, tipoDeDisco, tipoDeElemento, estado, encendido, color, empresa, herramientaSoft, descripcionElemento } = efecto;

    switch (tipoDeElemento) {
      case "no peritable": {
        if (bolsa_id && descripcionElemento) {
          return true;
        }
        break;
      }
      case "sim": {
        if (bolsa_id && estado && empresa && herramientaSoft) {
          return true;
        }
        break;
      }
      case "celular": {
        if (bolsa_id && estado && encendido && color) {
          return true;
        }
        break;
      }
      case "tablet": {
        if (bolsa_id && estado && encendido && color) {
          return true;
        }
        break;
      }
      case "notebook": {
        if (bolsa_id && color) {
          return true;
        }
        break;
      }
      case "gabinete": {
        if (bolsa_id && color) {
          return true;
        }
        break;
      }
      case "unidad de almacenamiento": {
        if (bolsa_id && estado && color) {
          return true;
        }
        break;
      }
      case "dvr": {
        if (bolsa_id && estado) {
          return true;
        }
        break;
      }
      case "disco": {
        if (bolsa_id && tipoDeDisco && estado) {
          return true;
        }
        break;
      }
      default:
        return false;
    }
  };

  const handleOptButtonClick = (e) => {
    e.preventDefault();
    switch (e.target.value) {
      case "sim": {
        setAddSimsModal(true);
        break;
      }
      case "discos": {
        setAddDiscosModal(true);
        break;
      }
      case "sd": {
        setAddSdsModal(true);
        break;
      }
      case "add extraccion": {
        setAddExtraccionModal(true);
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleEditDiscoButtonClick = (e) => {
    e.preventDefault();
    setEditDiscosModal(true);
  };

  const renderAddDiscoModal = () => {
    return (
      <Modal isOpen={addDiscosModal} style={modal40x30} ariaHideApp={false}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="closeModalIcon"
          onClick={() => setAddDiscosModal(false)}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <AddDiscoModal discos={discos} setDiscos={setDiscos} setAddDiscoModal={setAddDiscosModal} toast={toast} />
      </Modal>
    );
  };

  const handleEditSimButtonClick = (e) => {
    e.preventDefault();
    setEditSimsModal(true);
  };

  const renderAddSimModal = () => {
    return (
      <Modal isOpen={addSimsModal} style={modal40x30} ariaHideApp={false}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="closeModalIcon"
          onClick={() => setAddSimsModal(false)}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <AddSimModal sims={sims} setSims={setSims} toast={toast} setAddSimsModal={setAddSimsModal} />
      </Modal>
    );
  };

  const handleEditSdButtonClick = (e) => {
    e.preventDefault();
    setEditSdsModal(true);
  };

  const renderAddSdModal = () => {
    return (
      <Modal isOpen={addSdsModal} style={modal40x30} ariaHideApp={false}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="closeModalIcon"
          onClick={() => setAddSdsModal(false)}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <AddSdModal sds={sds} setSds={setSds} setAddSdModal={setAddSdsModal} toast={toast} />
      </Modal>
    );
  };

  const handleEditExtraccionButtonClick = (e) => {
    e.preventDefault();
    setEditExtraccionesModal(true);
  };

  const renderAddExtraccionModal = () => {
    return (
      <Modal
        isOpen={addExtraccionesModal}
        style={{
          content: { ...modal40x30.content, height: "80%", justifyContent: "flex-start" },
        }}
        ariaHideApp={false}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="closeModalIcon"
          onClick={() => setAddExtraccionModal(false)}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <AddExtraccionModal
          extracciones={extracciones}
          setExtracciones={setExtracciones}
          setAddExtraccionModal={setAddExtraccionModal}
          toast={toast}
        />
      </Modal>
    );
  };

  return (
    <>
      <header className="modalHeader">
        <span data-aos="fade-down">{efecto.edit ? "Editar Elemento" : "Agregar Elemento"}</span>
      </header>
      <form data-aos="zoom-in" className="flex w-full flex-col justify-center p-5 pt-0" onSubmit={handleSubmit}>
        <div className="modalInputContainer">
          <label className="basicLabel !text-white">*Bolsa</label>
          <select className="formModalSelect" disabled={true} value={efecto.bolsa_id}>
            <option>{selectedBag.nroPrecinto}</option>
          </select>
        </div>
        <div className="modalInputContainer">
          <label className="basicLabel !text-white">*Elemento</label>
          <select
            className="formModalSelect"
            disabled={efecto.edit ? true : false}
            value={efecto.tipoDeElemento}
            onChange={(e) => setEfecto({ ...efecto, tipoDeElemento: e.target.value })}
          >
            <option value="">Tipo de Elemento</option>
            <option value="celular">Celular</option>
            <option value="tablet">Tablet</option>
            <option value="notebook">Notebook</option>
            <option value="gabinete">Gabinete</option>
            <option value="unidad de almacenamiento">Unidad de Almacenamiento</option>
            <option value="dvr">DVR</option>
            <option value="disco">Disco</option>
            <option value="sim">Sim</option>
            <option value="no peritable">No Peritable</option>
          </select>
        </div>
        {efecto.tipoDeElemento === "disco" && (
          <div className="modalInputContainer">
            <label className="basicLabel !text-white">*Tipo de Disco</label>
            <select
              className="formModalSelect"
              value={efecto.tipoDeDisco}
              onChange={(e) => setEfecto({ ...efecto, tipoDeDisco: e.target.value })}
            >
              <option value="">Rígido / Solido</option>
              <option value="Disco Rígido">Disco Rígido</option>
              <option value="Disco Solido">Disco Solido</option>
              <option value="Disco Solido en Formato M.2">Disco Solido M.2</option>
              <option value="Disco Solido en Formato NVMe">Disco Solido NVMe</option>
            </select>
          </div>
        )}

        {efecto.tipoDeElemento === "unidad de almacenamiento" && (
          <div className="modalInputContainer">
            <label className="basicLabel !text-white">Detalle de la unidad</label>
            <select
              className="formModalSelect"
              value={efecto.unidadAlmacenamientoDetalle}
              onChange={(e) =>
                setEfecto({
                  ...efecto,
                  unidadAlmacenamientoDetalle: e.target.value,
                })
              }
            >
              <option value="">Seleccione</option>
              <option value="Pendrive">Pendrive</option>
              <option value="DVD">Disco DVD</option>
              <option value="CD">Disco CD</option>
            </select>
          </div>
        )}

        {efecto.tipoDeElemento === "sim" && (
          <div className="modalInputContainer">
            <label className="basicLabel !text-white">*Empresa</label>
            <input
              className="formModalInput"
              type="text"
              name="empresa"
              value={efecto.empresa}
              placeholder="Empresa"
              onChange={(e) => setEfecto({ ...efecto, empresa: e.target.value.toUpperCase() })}
            />
          </div>
        )}

        {efecto.tipoDeElemento !== "sim" && (
          <>
            {efecto.tipoDeElemento !== "no peritable" && (
              <>
                <div className="modalInputContainer">
                  <label className="basicLabel !text-white">Marca</label>
                  <input
                    className="formModalInput"
                    type="text"
                    name="marca"
                    value={efecto.marca}
                    placeholder="Marca"
                    onChange={(e) => setEfecto({ ...efecto, marca: e.target.value.toUpperCase() })}
                  />
                </div>
                <div className="modalInputContainer">
                  <label className="basicLabel !text-white">Modelo</label>
                  <input
                    className="formModalInput"
                    type="text"
                    name="modelo"
                    value={efecto.modelo}
                    placeholder="Modelo"
                    onChange={(e) => setEfecto({ ...efecto, modelo: e.target.value.toUpperCase() })}
                  />
                </div>
              </>
            )}
            <div className="modalInputContainer">
              <label className="basicLabel !text-white">Descripcion</label>
              <input
                className="formModalInput"
                type="text"
                name="descripcion"
                value={efecto.descripcionElemento}
                placeholder="Descripcion del elemento"
                onChange={(e) => setEfecto({ ...efecto, descripcionElemento: e.target.value })}
              />
            </div>
          </>
        )}

        {efecto.tipoDeElemento === "celular" && (
          <div className="modalInputContainer">
            <label className="basicLabel !text-white">IMEI</label>
            <input
              className="formModalInput"
              type="number"
              name="imei"
              value={efecto.imei}
              placeholder="Imei"
              onChange={(e) => setEfecto({ ...efecto, imei: e.target.value })}
            />
          </div>
        )}

        {efecto.tipoDeElemento !== "sim" &&
          efecto.tipoDeElemento !== "dvr" &&
          efecto.tipoDeElemento !== "disco" &&
          efecto.tipoDeElemento !== "no peritable" && (
            <div className="modalInputContainer">
              <label className="basicLabel !text-white">*Color</label>
              <select className="formModalSelect" value={efecto.color} onChange={(e) => setEfecto({ ...efecto, color: e.target.value })}>
                <option value="">Seleccione un Color</option>
                <option value="negro">Negro</option>
                <option value="blanco">Blanco</option>
                <option value="gris">Gris</option>
                <option value="rojo">Rojo</option>
                <option value="azul">Azul</option>
                <option value="celeste">Celeste</option>
                <option value="verde">Verde</option>
                <option value="amarillo">Amarillo</option>
                <option value="naranja">Naranja</option>
                <option value="morado">Morado</option>
                <option value="lila">Lila</option>
                <option value="rosado">Rosado</option>
                <option value="marrón">Marrón</option>
                <option value="turquesa">Turquesa</option>
                <option value="plateado">Plateado</option>
                <option value="dorado">Dorado</option>
              </select>
            </div>
          )}

        {(efecto.tipoDeElemento === "notebook" ||
          efecto.tipoDeElemento === "unidad de almacenamiento" ||
          efecto.tipoDeElemento === "tablet" ||
          efecto.tipoDeElemento === "gabinete" ||
          efecto.tipoDeElemento === "dvr" ||
          efecto.tipoDeElemento === "disco" ||
          efecto.tipoDeElemento === "sim") && (
          <div className="modalInputContainer">
            <label className="basicLabel !text-white">Serial Nº</label>
            <input
              className="formModalInput"
              type="text"
              name="serialNumber"
              value={efecto.serialNumber}
              placeholder="123456789"
              onChange={(e) => setEfecto({ ...efecto, serialNumber: e.target.value.toUpperCase() })}
            />
          </div>
        )}

        {(efecto.tipoDeElemento === "disco" || efecto.tipoDeElemento === "unidad de almacenamiento") && (
          <div className="modalInputContainer">
            <label className="basicLabel !text-white">Almacenamiento</label>
            <input
              className="formModalInput"
              type="text"
              name="almacenamiento"
              value={efecto.almacenamiento}
              placeholder="500 GB / 1 TB"
              onChange={(e) => setEfecto({ ...efecto, almacenamiento: e.target.value.toUpperCase() })}
            />
          </div>
        )}

        {(efecto.tipoDeElemento === "celular" || efecto.tipoDeElemento === "tablet") && (
          <div className="modalInputContainer">
            <label className="basicLabel !text-white">*¿Enciende?</label>
            <select
              className="formModalSelect"
              value={efecto.encendido}
              onChange={(e) => setEfecto({ ...efecto, encendido: e.target.value })}
            >
              <option value="">Si / No</option>
              <option value="si">Si</option>
              <option value="no">No</option>
            </select>
          </div>
        )}

        {(efecto.tipoDeElemento === "unidad de almacenamiento" || efecto.tipoDeElemento === "disco") && (
          <div className="modalInputContainer">
            <label className="basicLabel !text-white">¿Falla?</label>
            <select
              className="formModalSelect"
              value={efecto.elementoFallado}
              onChange={(e) => setEfecto({ ...efecto, elementoFallado: e.target.value })}
            >
              <option value="">Si / No</option>
              <option value="si">Si</option>
              <option value="no">No</option>
            </select>
          </div>
        )}

        {efecto.encendido === "si" && (
          <div className="modalInputContainer">
            <label className="basicLabel !text-white">¿Falla?</label>
            <select
              className="formModalSelect"
              value={efecto.elementoFallado}
              onChange={(e) => setEfecto({ ...efecto, elementoFallado: e.target.value })}
            >
              <option value="">Si / No</option>
              <option value="si">Si</option>
              <option value="no">No</option>
            </select>
          </div>
        )}

        {efecto.elementoFallado === "si" && (
          <div className="modalInputContainer">
            <label className="basicLabel !text-white">Observacion</label>
            <input
              className="formModalInput"
              type="text"
              name="observacionFalla"
              value={efecto.observacionFalla}
              placeholder="¿Por que Falla?"
              onChange={(e) => setEfecto({ ...efecto, observacionFalla: e.target.value })}
            />
          </div>
        )}

        {efecto.tipoDeElemento !== "unidad de almacenamiento" &&
          efecto.tipoDeElemento !== "notebook" &&
          efecto.tipoDeElemento !== "disco" &&
          efecto.tipoDeElemento !== "gabinete" &&
          efecto.encendido === "si" &&
          efecto.elementoFallado === "no" && (
            <div className="modalInputContainer">
              <label className="basicLabel !text-white">Seguridad</label>
              <select
                className="formModalSelect"
                value={efecto.tipoSeguridad}
                onChange={(e) => setEfecto({ ...efecto, tipoSeguridad: e.target.value })}
              >
                <option value="">Tipo de Seguridad</option>
                <option value="ninguna">Ninguna</option>
                <option value="patron">Patron</option>
                <option value="contraseña">Contraseña</option>
                <option value="PIN (Numérico)">Pin (Numérico)</option>
                <option value="PIN (Alfanumérico)">Pin (Alfanumérico)</option>
                <option value="huella">Huella</option>
              </select>
            </div>
          )}
        {efecto.tipoDeElemento === ""
          ? null
          : efecto.tipoDeElemento !== "unidad de almacenamiento" &&
            efecto.tipoSeguridad !== "ninguna" &&
            efecto.tipoSeguridad !== "" && (
              <div className="modalInputContainer">
                <label className="basicLabel !text-white">¿Forma Desbloqueo?</label>
                <select
                  className="formModalSelect"
                  value={efecto.desbloqueo}
                  onChange={(e) => setEfecto({ ...efecto, desbloqueo: e.target.value })}
                >
                  <option value="">¿Como se Desbloqueo?</option>
                  <option value="uso de software">Uso de Software</option>
                  <option value="prueba aleatoria">Prueba Aleatoria</option>
                </select>
              </div>
            )}

        {efecto.encendido === "no" && (
          <div className="modalInputContainer">
            <label className="basicLabel !text-white">Observacion</label>
            <input
              className="formModalInput"
              type="text"
              name="observacionEncendido"
              value={efecto.observacionEncendido}
              placeholder="¿Por que no enciende?"
              onChange={(e) => setEfecto({ ...efecto, observacionEncendido: e.target.value })}
            />
          </div>
        )}

        {(efecto.tipoDeElemento === "disco" || efecto.tipoDeElemento === "unidad de almacenamiento") && efecto.elementoFallado === "no" && (
          <div className="modalInputContainer">
            <label className="basicLabel !text-white">Software</label>
            <select
              className="formModalSelect"
              value={efecto.herramientaSoft}
              onChange={(e) => setEfecto({ ...efecto, herramientaSoft: e.target.value })}
            >
              <option value="">Seleccione Herramienta</option>
              <option value="Cellebrite, UFED 4PC V7.60">UFED 4PC</option>
              <option value="Cellebrite, UFED PREMIUM V7.60.702">UFED PREMIUM</option>
              <option value="Magnet, AXIOM V6.10.0">AXIOM</option>
              <option value="Opentext, ENCASE V8.11">ENCASE</option>
              <option value="Grayshift, GREYKEY">GREYKEY</option>
              <option value="Magnet, DVR EXAMINER V3.50">DVR EXAMINER</option>
              <option value="TABLEAU TX1 V 22.3.0.3">TABLEAU TX1 V 22.3.0.3</option>
              <option value="TABLEAU TD3">TABLEAU TD3</option>
              <option value="TABLEAU FORENSIC BRIDGE (bloqueador de escritura)">TABLEAU FORENSIC BRIDGE (bloqueador de escritura)</option>
              <option value="FTK-Imager">FTK-Imager</option>
            </select>
          </div>
        )}

        {efecto.tipoDeElemento === "sim" && (
          <>
            <div className="modalInputContainer">
              <label className="basicLabel !text-white">*Software</label>
              <select
                className="formModalSelect"
                value={efecto.herramientaSoft}
                onChange={(e) => setEfecto({ ...efecto, herramientaSoft: e.target.value })}
              >
                <option value="">Seleccione Herramienta</option>
                <option value="Cellebrite, UFED 4PC V7.60">UFED 4PC</option>
                <option value="Cellebrite, UFED PREMIUM V7.60.702">UFED PREMIUM</option>
                <option value="Magnet, AXIOM V6.10.0">AXIOM</option>
                <option value="Opentext, ENCASE V8.11">ENCASE</option>
                <option value="Grayshift, GREYKEY">GREYKEY</option>
                <option value="Magnet, DVR EXAMINER V3.50">DVR EXAMINER</option>
                <option value="TABLEAU TX1 V 22.3.0.3">TABLEAU TX1 V 22.3.0.3</option>
                <option value="TABLEAU TD3">TABLEAU TD3</option>
                <option value="TABLEAU FORENSIC BRIDGE (bloqueador de escritura)">TABLEAU FORENSIC BRIDGE (bloqueador de escritura)</option>
              </select>
            </div>
            <div className="modalInputContainer">
              <label className="basicLabel !text-white">Extracción</label>
              <select
                className="formModalSelect"
                value={efecto.tipoExtraccion}
                onChange={(e) => setEfecto({ ...efecto, tipoExtraccion: e.target.value })}
              >
                <option value="">Tipo de Extracción</option>
                <option value="ninguna">Ninguna</option>
                <option value="física">Física</option>
                <option value="lógica">Lógica</option>
                <option value="sistema de archivos">Sitema de Archivos</option>
                <option value="lógica  avanzada">Logica Avanzada</option>
              </select>
            </div>
          </>
        )}

        {(efecto.tipoDeElemento === "disco" || efecto.tipoDeElemento === "unidad de almacenamiento") && efecto.herramientaSoft !== "" && (
          <div className="modalInputContainer">
            <label className="basicLabel !text-white">Adquisición</label>
            <select
              className="formModalSelect"
              value={efecto.adquisicion}
              onChange={(e) => setEfecto({ ...efecto, adquisicion: e.target.value })}
            >
              <option value="">Con Exito / Fallo</option>
              <option value="con exito">Con Exito</option>
              <option value="fallo">Fallo</option>
            </select>
          </div>
        )}

        {efecto.tipoDeElemento !== "notebook" && efecto.tipoDeElemento !== "gabinete" && efecto.tipoDeElemento !== "no peritable" && (
          <div className="modalInputContainer">
            <label className="basicLabel !text-white">*Estado</label>
            <select
              className="formModalSelect"
              disabled={efecto.edit && currentActa.estado === "en proceso" ? true : false}
              value={efecto.estado}
              onChange={(e) => setEfecto({ ...efecto, estado: e.target.value })}
            >
              <option value="">Seleccione el Estado</option>
              <option value="completo">Completo</option>
              <option value="en proceso">En Proceso</option>
              <option value="peritado">Peritado</option>
            </select>
          </div>
        )}

        <div className="mt-2 flex w-full items-center justify-around">
          {(efecto.tipoDeElemento === "celular" || efecto.tipoDeElemento === "tablet") && (
            <>
              <button
                className="submitBtn !px-3"
                onClick={(e) => (efecto.edit ? handleEditSimButtonClick(e) : handleOptButtonClick(e))}
                value="sim"
              >
                {efecto.edit ? "Editar Sim" : "Agregar Sim"}
              </button>
              <button
                className="submitBtn !px-3"
                onClick={(e) => (efecto.edit ? handleEditSdButtonClick(e) : handleOptButtonClick(e))}
                value="sd"
              >
                {efecto.edit ? "Editar Sd" : "Agregar Sd"}
              </button>
            </>
          )}

          {(efecto.tipoDeElemento === "notebook" || efecto.tipoDeElemento === "gabinete" || efecto.tipoDeElemento === "dvr") && (
            <button
              className="submitBtn !px-3"
              onClick={(e) => (efecto.edit ? handleEditDiscoButtonClick(e) : handleOptButtonClick(e))}
              value="discos"
            >
              {efecto.edit ? "Editar Discos" : "Agregar Discos"}
            </button>
          )}

          {efecto.elementoFallado !== "si" &&
            efecto.tipoDeElemento &&
            (efecto.tipoDeElemento === "celular" || efecto.tipoDeElemento === "tablet") && (
              <button
                className="submitBtn !px-3"
                onClick={(e) => (efecto.edit ? handleEditExtraccionButtonClick(e) : handleOptButtonClick(e))}
                value="add extraccion"
              >
                {efecto.edit ? "Editar Extracciones" : "Agregar Extracciones"}
              </button>
            )}
          <input className="submitBtn !px-3" type="submit" value="Guardar" />
        </div>
      </form>

      {renderAddDiscoModal()}
      {renderAddSimModal()}
      {renderAddSdModal()}
      {renderAddExtraccionModal()}

      <Modal
        isOpen={editDiscosModal}
        style={{
          content: { ...modal40x30.content, width: "50%", justifyContent: "flex-start" },
        }}
        ariaHideApp={false}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="closeModalIcon"
          onClick={() => setEditDiscosModal(false)}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <EditDiscoModal
          setEditDiscosModal={setEditDiscosModal}
          setAddDiscosModal={setAddDiscosModal}
          discos={efecto.Discos}
          renderAddDiscoModal={renderAddDiscoModal}
        />
      </Modal>

      <Modal
        isOpen={editSimsModal}
        style={{
          content: { ...modal40x30.content, width: "50%", justifyContent: "flex-start" },
        }}
        ariaHideApp={false}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="closeModalIcon"
          onClick={() => setEditSimsModal(false)}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <EditSimModal
          setEditSimsModal={setEditSimsModal}
          setAddSimsModal={setAddSimsModal}
          sims={efecto.Sims}
          renderAddSimModal={renderAddSimModal}
        />
      </Modal>

      <Modal
        isOpen={editSdsModal}
        style={{
          content: { ...modal40x30.content, width: "50%", justifyContent: "flex-start" },
        }}
        ariaHideApp={false}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="closeModalIcon"
          onClick={() => setEditSdsModal(false)}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <EditSdsModal
          setEditSdsModal={setEditSdsModal}
          setAddSdsModal={setAddSdsModal}
          sds={efecto.Sds}
          renderAddSdModal={renderAddSdModal}
        />
      </Modal>

      <Modal
        isOpen={editExtraccionesModal}
        style={{
          content: { ...modal40x30.content, width: "50%", justifyContent: "flex-start" },
        }}
        ariaHideApp={false}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="closeModalIcon"
          onClick={() => setEditExtraccionesModal(false)}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <EditExtraccionModal
          setEditExtraccionesModal={setEditExtraccionesModal}
          setAddExtraccionModal={setAddExtraccionModal}
          extracciones={efecto.Extraccions}
          renderAddExtraccionModal={renderAddExtraccionModal}
        />
      </Modal>
    </>
  );
}
