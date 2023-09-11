import React from "react";
import Modal from "react-modal";
import { createEfecto, EditEfecto } from "redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { modal40x40 } from "utils/index";
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
import {
  Input,
  Select,
  HerramientasSoft,
  TipoElemento,
  TipoDisco,
  DetalleUnidad,
  Colors,
  YesOrNo,
  TipoSeguridad,
  TipoExtracciones,
  SuccessOrFail,
  States,
} from "components/index";
import { Icons as I } from "assets/index";

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
        <I.close className="closeModalIcon" onClick={() => setAddDiscosModal(false)} />
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
        <I.close className="closeModalIcon" onClick={() => setAddSimsModal(false)} />
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
        <I.close className="closeModalIcon" onClick={() => setAddSdsModal(false)} />
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
        <I.close className="closeModalIcon" onClick={() => setAddExtraccionModal(false)} />
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
      <header className="modalHeader" data-aos="fade-down">
        {efecto.edit ? "Editar Elemento" : "Agregar Elemento"}
      </header>
      <form data-aos="zoom-in" className="flex w-full flex-col justify-center p-5 pt-0" onSubmit={handleSubmit}>
        <Select label={"*Bolsa"} disabled={true} value={efecto.bolsa_id} options={<option>{selectedBag.nroPrecinto}</option>} />
        <Select
          label={"*Elemento"}
          disabled={efecto.edit ? true : false}
          value={efecto.tipoDeElemento}
          onChange={(e) => setEfecto({ ...efecto, tipoDeElemento: e.target.value })}
          options={<TipoElemento />}
        />
        {efecto.tipoDeElemento === "disco" && (
          <Select
            label={"*Tipo de Disco"}
            value={efecto.tipoDeDisco}
            onChange={(e) => setEfecto({ ...efecto, tipoDeDisco: e.target.value })}
            options={<TipoDisco />}
          />
        )}
        {efecto.tipoDeElemento === "unidad de almacenamiento" && (
          <Select
            label={"Detalle de Almacenamiento"}
            value={efecto.unidadAlmacenamientoDetalle}
            onChange={(e) =>
              setEfecto({
                ...efecto,
                unidadAlmacenamientoDetalle: e.target.value,
              })
            }
            options={<DetalleUnidad />}
          />
        )}
        {efecto.tipoDeElemento === "sim" && (
          <Input
            label={"*Empresa"}
            value={efecto.empresa}
            placeholder="Empresa"
            onChange={(e) => setEfecto({ ...efecto, empresa: e.target.value.toUpperCase() })}
          />
        )}
        {efecto.tipoDeElemento !== "sim" && (
          <>
            {efecto.tipoDeElemento !== "no peritable" && (
              <>
                <Input
                  label={"Marca"}
                  value={efecto.marca}
                  placeholder="Marca"
                  onChange={(e) => setEfecto({ ...efecto, marca: e.target.value.toUpperCase() })}
                />
                <Input
                  label={"Modelo"}
                  value={efecto.modelo}
                  placeholder="Modelo"
                  onChange={(e) => setEfecto({ ...efecto, modelo: e.target.value.toUpperCase() })}
                />
              </>
            )}
            <Input
              label={"Descripción"}
              value={efecto.descripcion}
              placeholder="Descripción del elemento"
              onChange={(e) => setEfecto({ ...efecto, descripcion: e.target.value })}
            />
          </>
        )}
        {efecto.tipoDeElemento === "celular" && (
          <Input label={"IMEI"} value={efecto.imei} placeholder="Imei" onChange={(e) => setEfecto({ ...efecto, imei: e.target.value })} />
        )}
        {efecto.tipoDeElemento !== "sim" &&
          efecto.tipoDeElemento !== "dvr" &&
          efecto.tipoDeElemento !== "disco" &&
          efecto.tipoDeElemento !== "no peritable" && (
            <Select
              label={"*Color"}
              value={efecto.color}
              onChange={(e) => setEfecto({ ...efecto, color: e.target.value })}
              options={<Colors />}
            />
          )}
        {(efecto.tipoDeElemento === "notebook" ||
          efecto.tipoDeElemento === "unidad de almacenamiento" ||
          efecto.tipoDeElemento === "tablet" ||
          efecto.tipoDeElemento === "gabinete" ||
          efecto.tipoDeElemento === "dvr" ||
          efecto.tipoDeElemento === "disco" ||
          efecto.tipoDeElemento === "sim") && (
          <Input
            label={"Serial N°"}
            value={efecto.serialNumber}
            placeholder="123456789"
            onChange={(e) => setEfecto({ ...efecto, serialNumber: e.target.value.toUpperCase() })}
          />
        )}
        {(efecto.tipoDeElemento === "disco" || efecto.tipoDeElemento === "unidad de almacenamiento") && (
          <Input
            label={"Almacenamiento"}
            value={efecto.almacenamiento}
            placeholder="500 GB / 1 TB"
            onChange={(e) => setEfecto({ ...efecto, almacenamiento: e.target.value.toUpperCase() })}
          />
        )}
        {(efecto.tipoDeElemento === "celular" || efecto.tipoDeElemento === "tablet") && (
          <Select
            label={"*¿Enciende?"}
            value={efecto.encendido}
            onChange={(e) => setEfecto({ ...efecto, encendido: e.target.value })}
            options={<YesOrNo />}
          />
        )}
        {(efecto.tipoDeElemento === "unidad de almacenamiento" || efecto.tipoDeElemento === "disco") && (
          <Select
            label={"¿Falla?"}
            value={efecto.elementoFallado}
            onChange={(e) => setEfecto({ ...efecto, elementoFallado: e.target.value })}
            options={<YesOrNo />}
          />
        )}
        {efecto.encendido === "si" && (
          <Select
            label={"¿Falla?"}
            value={efecto.elementoFallado}
            onChange={(e) => setEfecto({ ...efecto, elementoFallado: e.target.value })}
            options={<YesOrNo />}
          />
        )}
        {efecto.elementoFallado === "si" && (
          <Input
            label={"Observacion"}
            value={efecto.observacionFalla}
            placeholder="¿Por que Falla?"
            onChange={(e) => setEfecto({ ...efecto, observacionFalla: e.target.value })}
          />
        )}
        {efecto.tipoDeElemento !== "unidad de almacenamiento" &&
          efecto.tipoDeElemento !== "notebook" &&
          efecto.tipoDeElemento !== "disco" &&
          efecto.tipoDeElemento !== "gabinete" &&
          efecto.encendido === "si" &&
          efecto.elementoFallado === "no" && (
            <Select
              label={"Seguridad"}
              value={efecto.tipoSeguridad}
              onChange={(e) => setEfecto({ ...efecto, tipoSeguridad: e.target.value })}
              options={<TipoSeguridad />}
            />
          )}
        {efecto.tipoDeElemento === ""
          ? null
          : efecto.tipoDeElemento !== "unidad de almacenamiento" &&
            efecto.tipoSeguridad !== "ninguna" &&
            efecto.tipoSeguridad !== "" && (
              <Select
                label={"¿Forma Desbloqueo?"}
                value={efecto.desbloqueo}
                onChange={(e) => setEfecto({ ...efecto, desbloqueo: e.target.value })}
                options={
                  <>
                    <option value="">¿Como se Desbloqueo?</option>
                    <option value="uso de software">Uso de Software</option>
                    <option value="prueba aleatoria">Prueba Aleatoria</option>
                  </>
                }
              />
            )}
        {efecto.encendido === "no" && (
          <Input
            label={"Observación"}
            value={efecto.observacionEncendido}
            placeholder="¿Por que no enciende?"
            onChange={(e) => setEfecto({ ...efecto, observacionEncendido: e.target.value })}
          />
        )}
        {(efecto.tipoDeElemento === "disco" || efecto.tipoDeElemento === "unidad de almacenamiento") && efecto.elementoFallado === "no" && (
          <Select
            label={"Software"}
            value={efecto.herramientaSoft}
            onChange={(e) => setEfecto({ ...efecto, herramientaSoft: e.target.value })}
            options={<HerramientasSoft />}
          />
        )}
        {efecto.tipoDeElemento === "sim" && (
          <>
            <Select
              label={"Software"}
              value={efecto.herramientaSoft}
              onChange={(e) => setEfecto({ ...efecto, herramientaSoft: e.target.value })}
              options={<HerramientasSoft />}
            />
            <Select
              label={"Extracción"}
              value={efecto.tipoExtraccion}
              onChange={(e) => setEfecto({ ...efecto, tipoExtraccion: e.target.value })}
              options={<TipoExtracciones />}
            />
          </>
        )}
        {(efecto.tipoDeElemento === "disco" || efecto.tipoDeElemento === "unidad de almacenamiento") && efecto.herramientaSoft !== "" && (
          <Select
            label={"Adquisición"}
            value={efecto.adquisicion}
            onChange={(e) => setEfecto({ ...efecto, adquisicion: e.target.value })}
            options={<SuccessOrFail />}
          />
        )}
        {efecto.tipoDeElemento !== "notebook" && efecto.tipoDeElemento !== "gabinete" && efecto.tipoDeElemento !== "no peritable" && (
          <Select
            label={"*Estado"}
            disabled={efecto.edit && currentActa.estado === "en proceso" ? true : false}
            value={efecto.estado}
            onChange={(e) => setEfecto({ ...efecto, estado: e.target.value })}
            options={<States />}
          />
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
        <I.close className="closeModalIcon" onClick={() => setEditDiscosModal(false)} />
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
        <I.close className="closeModalIcon" onClick={() => setEditSimsModal(false)} />
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
        <I.close className="closeModalIcon" onClick={() => setEditSdsModal(false)} />
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
        <I.close className="closeModalIcon" onClick={() => setEditExtraccionesModal(false)} />
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
