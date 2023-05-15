import React from "react";
//* Redux
import { createEfecto, EditEfecto } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
//* Style
import styled, { css } from "styled-components";
import GlobalStyles from "../../../Styles/GlobalStyles";
import Variables from "../../../Styles/Variables";
import { toast } from "react-toastify";
//* Modal
import Modal from "react-modal";
//* Components
import AddDiscoModal from "./AddDiscoModal";
import AddSimModal from "./AddSimModal";
import AddSdModal from "./AddSdModal";
import AddExtraccionModal from "./AddExtraccionModal";
import EditDiscoModal from "./EditDiscoModal";
import EditSimModal from "./EditSimModal";
import EditSdsModal from "./EditSdModal";

//* Initializations
const { button, select, input, modal40x40 } = GlobalStyles;
const { redColor, greenColor, secondaryColor, principalColor } = Variables;

const modal40x30 = {
  content: {
    ...modal40x40.content,
    width: "30%",
    height: "max-content",
    minHeight: "30%",
  },
};

function AddEfectos({ alternModal }) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    return () => {
      localStorage.setItem("currentEfecto", null);
    };
  });

  const currentActa = useSelector((s) => JSON.parse(localStorage.getItem("currentActa")) || s?.currentActa);
  const currentBolsas = useSelector((s) => JSON.parse(localStorage.getItem("currentBolsas")) || s?.currentBolsas);

  const [addDiscosModal, setAddDiscosModal] = React.useState(false);
  const [editDiscosModal, setEditDiscosModal] = React.useState(false);
  const [discos, setDiscos] = React.useState([]);

  const [addSimsModal, setAddSimsModal] = React.useState(false);
  const [editSimsModal, setEditSimsModal] = React.useState(false);
  const [sims, setSims] = React.useState([]);

  const [addSdsModal, setAddSdModal] = React.useState(false);
  const [editSdsModal, setEditSdsModal] = React.useState(false);
  const [sds, setSds] = React.useState([]);

  const [addExtraccionesModal, setAddExtraccionModal] = React.useState(false);
  const [extracciones, setExtracciones] = React.useState([]);

  const [efecto, setEfecto] = React.useState(
    JSON.parse(localStorage.getItem("currentEfecto")) || {
      bolsa_id: "",
      tipoDeElemento: "",
      tipoDeDisco: "",
      marca: "",
      modelo: "",
      imei: "",
      estado: "",
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
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (efecto.bolsa_id && efecto.tipoDeElemento) {
      if (efecto.edit) {
        dispatch(EditEfecto(efecto, discos, sims, sds, currentActa.id));
      } else {
        dispatch(createEfecto(efecto, discos, sims, sds, extracciones, currentActa.id));
      }
      alternModal();
    } else {
      toast.error("¡Faltan datos necesarios para el Elemento!");
    }
  };

  const handleComplete = () => {
    const { bolsa_id, tipoDeDisco, tipoDeElemento, estado, encendido, color } = efecto;

    switch (tipoDeElemento) {
      case "celular": {
        if (bolsa_id && estado && encendido && color) {
          return "true";
        }
        break;
      }
      case "tablet": {
        if (bolsa_id && estado && encendido && color) {
          return "true";
        }
        break;
      }
      case "notebook": {
        if (bolsa_id && color) {
          return "true";
        }
        break;
      }
      case "gabinete": {
        if (bolsa_id && color) {
          return "true";
        }
        break;
      }
      case "unidad de almacenamiento": {
        if (bolsa_id && estado && color) {
          return "true";
        }
        break;
      }
      case "dvr": {
        if (bolsa_id && estado && color) {
          return "true";
        }
        break;
      }
      case "disco": {
        if (bolsa_id && tipoDeDisco && estado && color) {
          return "true";
        }
        break;
      }
      default:
        return "false";
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
        setAddSdModal(true);
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
        <AddSimModal sims={sims} setSims={setSims} setAddSimModal={setAddSimsModal} toast={toast} />
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
        <AddSdModal sds={sds} setSds={setSds} setAddSdModal={setAddSdModal} toast={toast} />
      </Modal>
    );
  };

  const renderAddExtraccionModal = () => {
    return (
      <Modal
        isOpen={addExtraccionesModal}
        style={{ content: { ...modal40x30.content, height: "80%", justifyContent: "flex-start" } }}
        ariaHideApp={false}
      >
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
      <Form onSubmit={handleSubmit}>
        <Title>{efecto.edit ? "Editar Elemento" : "Agregar Elemento"}</Title>
        <InputContainer>
          <Label>*Bolsa</Label>
          <Select
            disabled={efecto.edit ? true : false}
            value={efecto.bolsa_id}
            onChange={(e) => setEfecto({ ...efecto, bolsa_id: Number(e.target.value) })}
          >
            <SelectOpt value="">Seleccione Precinto</SelectOpt>
            {currentBolsas.map((b) => {
              if (b.estado !== "cerrada" && b.estado !== "cerrada en proceso") {
                return (
                  <SelectOpt
                    value={b.id}
                    key={b.id}
                    style={b.colorPrecinto === "rojo" ? { color: redColor } : b.colorPrecinto === "verde" ? { color: greenColor } : null}
                  >
                    {b.nroPrecinto}
                  </SelectOpt>
                );
              }
            })}
          </Select>
        </InputContainer>
        <InputContainer>
          <Label>*Elemento</Label>
          <Select
            disabled={efecto.edit ? true : false}
            value={efecto.tipoDeElemento}
            onChange={(e) => setEfecto({ ...efecto, tipoDeElemento: e.target.value })}
          >
            <SelectOpt value="">Tipo de Elemento</SelectOpt>
            <SelectOpt value="celular">Celular</SelectOpt>
            <SelectOpt value="tablet">Tablet</SelectOpt>
            <SelectOpt value="notebook">Notebook</SelectOpt>
            <SelectOpt value="gabinete">Gabinete</SelectOpt>
            <SelectOpt value="unidad de almacenamiento">Unidad de Almacenamiento</SelectOpt>
            <SelectOpt value="dvr">DVR</SelectOpt>
            <SelectOpt value="disco">Disco</SelectOpt>
          </Select>
        </InputContainer>
        {efecto.tipoDeElemento === "disco" && (
          <InputContainer>
            <Label>*Tipo de Disco</Label>
            <Select value={efecto.tipoDeDisco} onChange={(e) => setEfecto({ ...efecto, tipoDeDisco: e.target.value })}>
              <SelectOpt value="">Rigido / Solido</SelectOpt>
              <SelectOpt value="Disco Rigido">Disco Rigido</SelectOpt>
              <SelectOpt value="Disco Solido">Disco Solido</SelectOpt>
              <SelectOpt value="Disco Solido en Formato M.2">Disco Solido M.2</SelectOpt>
              <SelectOpt value="Disco Solido en Formato NVMe">Disco Solido NVMe</SelectOpt>
            </Select>
          </InputContainer>
        )}

        {efecto.tipoDeElemento === "unidad de almacenamiento" && (
          <InputContainer>
            <Label>Detalle de la unidad</Label>
            <Select
              value={efecto.unidadAlmacenamientoDetalle}
              onChange={(e) =>
                setEfecto({
                  ...efecto,
                  unidadAlmacenamientoDetalle: e.target.value,
                })
              }
            >
              <SelectOpt value="">Seleccione</SelectOpt>
              <SelectOpt value="Pendrive">Pendrive</SelectOpt>
              <SelectOpt value="DVD">Disco DVD</SelectOpt>
              <SelectOpt value="CD">Disco CD</SelectOpt>
            </Select>
          </InputContainer>
        )}

        <InputContainer>
          <Label>Marca</Label>
          <Input
            type="text"
            name="marca"
            value={efecto.marca}
            placeholder="Marca"
            onChange={(e) => setEfecto({ ...efecto, marca: e.target.value.toUpperCase() })}
          />
        </InputContainer>
        <InputContainer>
          <Label>Modelo</Label>
          <Input
            type="text"
            name="modelo"
            value={efecto.modelo}
            placeholder="Modelo"
            onChange={(e) => setEfecto({ ...efecto, modelo: e.target.value.toUpperCase() })}
          />
        </InputContainer>

        {efecto.tipoDeElemento === "celular" && (
          <InputContainer>
            <Label>IMEI</Label>
            <Input
              type="number"
              name="imei"
              value={efecto.imei}
              placeholder="Imei"
              onChange={(e) => setEfecto({ ...efecto, imei: e.target.value })}
            />
          </InputContainer>
        )}

        {(efecto.tipoDeElemento !== "disco" || efecto.tipoDeElemento !== "dvr") && (
          <InputContainer>
            <Label>*Color</Label>
            <Select value={efecto.color} onChange={(e) => setEfecto({ ...efecto, color: e.target.value })}>
              <SelectOpt value="">Seleccione un Color</SelectOpt>
              <SelectOpt value="negro">Negro</SelectOpt>
              <SelectOpt value="blanco">Blanco</SelectOpt>
              <SelectOpt value="gris">Gris</SelectOpt>
              <SelectOpt value="rojo">Rojo</SelectOpt>
              <SelectOpt value="azul">Azul</SelectOpt>
              <SelectOpt value="verde">Verde</SelectOpt>
              <SelectOpt value="amarillo">Amarillo</SelectOpt>
              <SelectOpt value="naranja">Naranja</SelectOpt>
              <SelectOpt value="morado">Morado</SelectOpt>
              <SelectOpt value="rosado">Rosado</SelectOpt>
              <SelectOpt value="marrón">Marrón</SelectOpt>
              <SelectOpt value="turquesa">Turquesa</SelectOpt>
              <SelectOpt value="plateado">Plateado</SelectOpt>
              <SelectOpt value="dorado">Dorado</SelectOpt>
            </Select>
          </InputContainer>
        )}

        {(efecto.tipoDeElemento === "notebook" ||
          efecto.tipoDeElemento === "unidad de almacenamiento" ||
          efecto.tipoDeElemento === "tablet" ||
          efecto.tipoDeElemento === "gabinete" ||
          efecto.tipoDeElemento === "dvr" ||
          efecto.tipoDeElemento === "disco") && (
          <InputContainer>
            <Label>Serial Nº</Label>
            <Input
              type="text"
              name="serialNumber"
              value={efecto.serialNumber}
              placeholder="123456789"
              onChange={(e) => setEfecto({ ...efecto, serialNumber: e.target.value.toUpperCase() })}
            />
          </InputContainer>
        )}

        {(efecto.tipoDeElemento === "disco" || efecto.tipoDeElemento === "unidad de almacenamiento") && (
          <InputContainer>
            <Label>Almacenamiento</Label>
            <Input
              type="text"
              name="almacenamiento"
              value={efecto.almacenamiento}
              placeholder="500 GB / 1 TB"
              onChange={(e) => setEfecto({ ...efecto, almacenamiento: e.target.value.toUpperCase() })}
            />
          </InputContainer>
        )}

        {efecto.tipoDeElemento !== "gabinete" &&
          efecto.tipoDeElemento !== "unidad de almacenamiento" &&
          efecto.tipoDeElemento !== "notebook" &&
          efecto.tipoDeElemento !== "dvr" &&
          efecto.tipoDeElemento !== "disco" && (
            <InputContainer>
              <Label>*¿Enciende?</Label>
              <Select value={efecto.encendido} onChange={(e) => setEfecto({ ...efecto, encendido: e.target.value })}>
                <SelectOpt value="">Si / No</SelectOpt>
                <SelectOpt value="si">Si</SelectOpt>
                <SelectOpt value="no">No</SelectOpt>
              </Select>
            </InputContainer>
          )}

        {(efecto.tipoDeElemento === "unidad de almacenamiento" || efecto.tipoDeElemento === "disco") && (
          <InputContainer>
            <Label>¿Falla?</Label>
            <Select value={efecto.elementoFallado} onChange={(e) => setEfecto({ ...efecto, elementoFallado: e.target.value })}>
              <SelectOpt value="">Si / No</SelectOpt>
              <SelectOpt value="si">Si</SelectOpt>
              <SelectOpt value="no">No</SelectOpt>
            </Select>
          </InputContainer>
        )}

        {efecto.encendido === "si" && (
          <InputContainer>
            <Label>¿Falla?</Label>
            <Select value={efecto.elementoFallado} onChange={(e) => setEfecto({ ...efecto, elementoFallado: e.target.value })}>
              <SelectOpt value="">Si / No</SelectOpt>
              <SelectOpt value="si">Si</SelectOpt>
              <SelectOpt value="no">No</SelectOpt>
            </Select>
          </InputContainer>
        )}

        {efecto.elementoFallado === "si" && (
          <InputContainer>
            <Label>Observacion</Label>
            <Input
              type="text"
              name="observacionFalla"
              value={efecto.observacionFalla}
              placeholder="¿Por que Falla?"
              onChange={(e) => setEfecto({ ...efecto, observacionFalla: e.target.value })}
            />
          </InputContainer>
        )}

        {efecto.tipoDeElemento !== "unidad de almacenamiento" &&
          efecto.tipoDeElemento !== "notebook" &&
          efecto.tipoDeElemento !== "disco" &&
          efecto.tipoDeElemento !== "gabinete" &&
          efecto.encendido === "si" &&
          efecto.elementoFallado === "no" && (
            <InputContainer>
              <Label>Seguridad</Label>
              <Select value={efecto.tipoSeguridad} onChange={(e) => setEfecto({ ...efecto, tipoSeguridad: e.target.value })}>
                <SelectOpt value="">Tipo de Seguridad</SelectOpt>
                <SelectOpt value="ninguna">Ninguna</SelectOpt>
                <SelectOpt value="patron">Patron</SelectOpt>
                <SelectOpt value="contraseña">Contraseña</SelectOpt>
                <SelectOpt value="PIN de inicio">Pin</SelectOpt>
                <SelectOpt value="huella">Huella</SelectOpt>
              </Select>
            </InputContainer>
          )}
        {efecto.tipoDeElemento === ""
          ? null
          : efecto.tipoDeElemento !== "unidad de almacenamiento" &&
            efecto.tipoSeguridad !== "ninguna" &&
            efecto.tipoSeguridad !== "" && (
              <InputContainer>
                <Label>¿Se pudo desbloquear?</Label>
                <Select value={efecto.desbloqueo} onChange={(e) => setEfecto({ ...efecto, desbloqueo: e.target.value })}>
                  <SelectOpt value="">Si / No</SelectOpt>
                  <SelectOpt value="si">Si</SelectOpt>
                  <SelectOpt value="no">No</SelectOpt>
                </Select>
              </InputContainer>
            )}

        {efecto.encendido === "no" && (
          <InputContainer>
            <Label>Observacion</Label>
            <Input
              type="text"
              name="observacionEncendido"
              value={efecto.observacionEncendido}
              placeholder="¿Por que no enciende?"
              onChange={(e) => setEfecto({ ...efecto, observacionEncendido: e.target.value })}
            />
          </InputContainer>
        )}

        {efecto.tipoDeElemento === "disco" && (
          <InputContainer>
            <Label>Adquisición</Label>
            <Select value={efecto.adquisicion} onChange={(e) => setEfecto({ ...efecto, adquisicion: e.target.value })}>
              <SelectOpt value="">Con Exito / Fallo</SelectOpt>
              <SelectOpt value="con exito">Con Exito</SelectOpt>
              <SelectOpt value="fallo">Fallo</SelectOpt>
            </Select>
          </InputContainer>
        )}

        {efecto.tipoDeElemento !== "notebook" && efecto.tipoDeElemento !== "gabinete" && (
          <InputContainer>
            <Label>*Estado</Label>
            <Select
              disabled={efecto.edit && currentActa.estado === "en proceso" ? true : false}
              value={efecto.estado}
              onChange={(e) => setEfecto({ ...efecto, estado: e.target.value })}
            >
              <SelectOpt value="">Seleccione el Estado</SelectOpt>
              <SelectOpt value="completo">Completo</SelectOpt>
              <SelectOpt value="en proceso">En Proceso</SelectOpt>
            </Select>
          </InputContainer>
        )}

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", width: "100%" }}>
          {(efecto.tipoDeElemento === "celular" || efecto.tipoDeElemento === "tablet") && (
            <>
              <OptButton onClick={(e) => (efecto.edit ? handleEditSimButtonClick(e) : handleOptButtonClick(e))} value="sim">
                {efecto.edit ? "Agregar/Editar Sim" : "Agregar Sim"}
              </OptButton>
              <OptButton onClick={(e) => (efecto.edit ? handleEditSdButtonClick(e) : handleOptButtonClick(e))} value="sd">
                {efecto.edit ? "Agregar/Editar Sd" : "Agregar Sd"}
              </OptButton>
            </>
          )}

          {(efecto.tipoDeElemento === "notebook" || efecto.tipoDeElemento === "gabinete" || efecto.tipoDeElemento === "dvr") && (
            <OptButton onClick={(e) => (efecto.edit ? handleEditDiscoButtonClick(e) : handleOptButtonClick(e))} value="discos">
              {efecto.edit ? "Agregar/Editar Discos" : "Agregar Discos"}
            </OptButton>
          )}

          {!efecto.edit && (
            <OptButton onClick={(e) => handleOptButtonClick(e)} value="add extraccion">
              Agregar Extracciones
            </OptButton>
          )}
          <Button type="submit" value="Guardar" complete={handleComplete()} />
        </div>
      </Form>

      {renderAddDiscoModal()}
      {renderAddSimModal()}
      {renderAddSdModal()}
      {renderAddExtraccionModal()}

      <Modal
        isOpen={editDiscosModal}
        style={{ content: { ...modal40x30.content, width: "50%", justifyContent: "flex-start" } }}
        ariaHideApp={false}
      >
        <EditDiscoModal
          setEditDiscosModal={setEditDiscosModal}
          setAddDiscosModal={setAddDiscosModal}
          discos={efecto.Discos}
          renderAddDiscoModal={renderAddDiscoModal}
        />
      </Modal>

      <Modal
        isOpen={editSimsModal}
        style={{ content: { ...modal40x30.content, width: "50%", justifyContent: "flex-start" } }}
        ariaHideApp={false}
      >
        <EditSimModal
          setEditSimsModal={setEditSimsModal}
          setAddSimsModal={setAddSimsModal}
          sims={efecto.Sims}
          renderAddSimModal={renderAddSimModal}
        />
      </Modal>

      <Modal
        isOpen={editSdsModal}
        style={{ content: { ...modal40x30.content, width: "50%", justifyContent: "flex-start" } }}
        ariaHideApp={false}
      >
        <EditSdsModal
          setEditSdsModal={setEditSdsModal}
          setAddSdsModal={setAddSdModal}
          sds={efecto.Sds}
          renderAddSdModal={renderAddSdModal}
        />
      </Modal>
    </>
  );
}

export default AddEfectos;

const Title = styled.h4`
  border-bottom: 2px solid white;
  width: 120%;
  text-align: center;
  margin-bottom: 2%;
  padding-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 5%;
  color: white;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: max-content;
  border-bottom: 1px solid ${secondaryColor};
  padding-bottom: 10px;
  margin-block: 5px;
`;

const Label = styled.label`
  flex: 1;
`;

const Input = styled.input`
  ${input}
  font-size: medium;
  flex: 1;
  height: 30px;
  text-align: center;
`;

const Select = styled.select`
  ${select}
  font-size: medium;
  flex: 1;
  height: 30px;
  text-align: center;
`;

const SelectOpt = styled.option``;

const Button = styled.input`
  ${button}
  padding: 5px;
  padding-inline: 15px;
  text-decoration: none;
  background: white;
  border: 2px solid ${redColor};
  pointer-events: none;
  margin-bottom: -2.5%;
  margin-top: 1%;

  &:hover {
    cursor: pointer;
    background-color: white;
    color: ${principalColor};
    border: 2px solid transparent;
  }

  ${(props) =>
    props.complete === "true" &&
    css`
      pointer-events: all;
      border: 2px solid ${greenColor};
    `}
`;

const OptButton = styled.button`
  ${button}
  padding: 5px;
  padding-inline: 10px;
  text-decoration: none;
  background: white;
  border: 2px solid ${greenColor};
  margin-bottom: -2.5%;
  margin-top: 1%;

  &:hover {
    cursor: pointer;
    background-color: white;
    color: ${principalColor};
    border: 2px solid transparent;
  }
`;
