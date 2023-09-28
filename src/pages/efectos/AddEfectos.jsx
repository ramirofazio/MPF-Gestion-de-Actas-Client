import { useState, useEffect } from "react";
import { createEfecto, EditEfecto } from "redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { validateEfecto } from "utils/index";
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
  BaseModal,
  FormaDesbloqueo,
} from "components/index";

export function AddEfectos({ alternModal, selectedBag }) {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      localStorage.setItem("currentEfecto", null);
    };
  }, []);

  const currentActa = useSelector((s) => JSON.parse(localStorage.getItem("currentActa")) || s?.currentActa);

  const [addDiscosModal, setAddDiscosModal] = useState(false);
  const [editDiscosModal, setEditDiscosModal] = useState(false);
  const [discos, setDiscos] = useState([]);

  const [addSimsModal, setAddSimsModal] = useState(false);
  const [editSimsModal, setEditSimsModal] = useState(false);
  const [sims, setSims] = useState([]);

  const [addSdsModal, setAddSdsModal] = useState(false);
  const [editSdsModal, setEditSdsModal] = useState(false);
  const [sds, setSds] = useState([]);

  const [addExtraccionesModal, setAddExtraccionesModal] = useState(false);
  const [editExtraccionesModal, setEditExtraccionesModal] = useState(false);
  const [extracciones, setExtracciones] = useState([]);

  const [efecto, setEfecto] = useState(
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
    if (validateEfecto(efecto)) {
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

  const renderAddDiscoModal = () => {
    return (
      <BaseModal
        isOpen={addDiscosModal}
        close={setAddDiscosModal}
        content={<AddDiscoModal discos={discos} setDiscos={setDiscos} setAddDiscoModal={setAddDiscosModal} toast={toast} />}
      />
    );
  };

  const renderAddSimModal = () => {
    return (
      <BaseModal
        isOpen={addSimsModal}
        close={setAddSimsModal}
        content={<AddSimModal sims={sims} setSims={setSims} toast={toast} setAddSimsModal={setAddSimsModal} />}
      />
    );
  };

  const renderAddSdModal = () => {
    return (
      <BaseModal
        isOpen={addSdsModal}
        close={setAddSdsModal}
        content={<AddSdModal sds={sds} setSds={setSds} setAddSdModal={setAddSdsModal} toast={toast} />}
      />
    );
  };

  const renderAddExtraccionModal = () => {
    return (
      <BaseModal
        isOpen={addExtraccionesModal}
        close={setAddExtraccionesModal}
        content={
          <AddExtraccionModal
            extracciones={extracciones}
            setExtracciones={setExtracciones}
            setAddExtraccionModal={setAddExtraccionesModal}
            toast={toast}
          />
        }
      />
    );
  };

  return (
    <>
      <header className="modalHeader">{efecto.edit ? "Editar Elemento" : "Agregar Elemento"}</header>
      <form className="flex w-full flex-col justify-center p-5 pt-0" onSubmit={handleSubmit}>
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

            <div className="modalInputContainer">
              <label className="basicLabel !text-white">Descripción</label>
              <textarea
                className="formModalInput !h-14 px-4"
                type="text"
                value={efecto.descripcionElemento}
                placeholder="Descripción del elemento"
                onChange={(e) => setEfecto({ ...efecto, descripcionElemento: e.target.value })}
              />
            </div>
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
                options={<FormaDesbloqueo />}
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
            value={efecto.estado}
            onChange={(e) => setEfecto({ ...efecto, estado: e.target.value })}
            options={<States />}
          />
        )}
        <div className="mt-2 flex w-full items-center justify-around">
          {(efecto.tipoDeElemento === "celular" || efecto.tipoDeElemento === "tablet") && (
            <>
              <button
                type="button"
                className="submitBtn !px-3"
                onClick={() => (efecto.edit ? setEditSimsModal(true) : setAddSimsModal(true))}
                value="sim"
              >
                {efecto.edit ? "Editar" : "Agregar"} SIM
              </button>
              <button
                type="button"
                className="submitBtn !px-3"
                onClick={() => (efecto.edit ? setEditSdsModal(true) : setAddSdsModal(true))}
                value="sd"
              >
                {efecto.edit ? "Editar" : "Agregar"} SD
              </button>
            </>
          )}

          {(efecto.tipoDeElemento === "notebook" || efecto.tipoDeElemento === "gabinete" || efecto.tipoDeElemento === "dvr") && (
            <button
              type="button"
              className="submitBtn !px-3"
              onClick={() => (efecto.edit ? setEditDiscosModal(true) : setAddDiscosModal(true))}
              value="discos"
            >
              {efecto.edit ? "Editar" : "Agregar"} Discos
            </button>
          )}

          {(efecto.tipoDeElemento === "celular" || efecto.tipoDeElemento === "tablet") && (
            <button
              type="button"
              className="submitBtn !px-3"
              onClick={() => (efecto.edit ? setEditExtraccionesModal(true) : setAddExtraccionesModal(true))}
              value="add extraccion"
            >
              {efecto.edit ? "Editar" : "Agregar"} Extracciones
            </button>
          )}
          <input className="submitBtn !px-3" type="submit" value="Guardar" />
        </div>
      </form>

      {renderAddDiscoModal()}
      {renderAddSimModal()}
      {renderAddSdModal()}
      {renderAddExtraccionModal()}

      <BaseModal
        isOpen={editDiscosModal}
        close={setEditDiscosModal}
        content={
          <EditDiscoModal
            setEditDiscosModal={setEditDiscosModal}
            setAddDiscosModal={setAddDiscosModal}
            discos={efecto.Discos}
            renderAddDiscoModal={renderAddDiscoModal}
          />
        }
      />
      <BaseModal
        isOpen={editSimsModal}
        close={setEditSimsModal}
        content={
          <EditSimModal
            setEditSimsModal={setEditSimsModal}
            setAddSimsModal={setAddSimsModal}
            sims={efecto.Sims}
            renderAddSimModal={renderAddSimModal}
          />
        }
      />
      <BaseModal
        isOpen={editSdsModal}
        close={setEditSdsModal}
        content={
          <EditSdsModal
            setEditSdsModal={setEditSdsModal}
            setAddSdsModal={setAddSdsModal}
            sds={efecto.Sds}
            renderAddSdModal={renderAddSdModal}
          />
        }
      />
      <BaseModal
        isOpen={editExtraccionesModal}
        close={setEditExtraccionesModal}
        content={
          <EditExtraccionModal
            setEditExtraccionesModal={setEditExtraccionesModal}
            setAddExtraccionModal={setAddExtraccionesModal}
            extracciones={efecto.Extraccions}
            renderAddExtraccionModal={renderAddExtraccionModal}
          />
        }
      />
    </>
  );
}
