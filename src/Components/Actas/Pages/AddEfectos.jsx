import React from "react";
//* Redux
import { createEfecto } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
//* Style
import styled, { css } from "styled-components";
import GlobalStyles from "../../../Styles/GlobalStyles";
import Variables from "../../../Styles/Variables";
import { Close } from "@styled-icons/ionicons-outline/Close";
import { toast } from "react-toastify";
//* Modal
import Modal from "react-modal";
//* Initializations
const { button, select, input } = GlobalStyles;
const { redColor, greenColor, secondaryColor, principalColor } = Variables;

const addModalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "40%",
    height: "50%",
    backgroundColor: principalColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: 0,
    overflowX: "hidden",
  },
};

function AddEfectos({ closeModal }) {
  const dispatch = useDispatch();

  const currentBolsas = useSelector((s) => s?.currentBolsas);

  const [addDiscosModal, setAddDiscosModal] = React.useState(false);
  const [addSimModal, setAddSimModal] = React.useState(false);

  const [efecto, setEfecto] = React.useState({
    bolsa_id: "",
    tipoDeElemento: "",
    marca: "",
    modelo: "",
    imei: "",
    //imei2: "",
    estado: "",
    sistemaOperativo: "",
    tipoSeguridad: "",
    desbloqueo: "",
    herramientaSoft: "",
    tipoExtraccion: "",
    descripcionTarea: "",
  });

  const [discos, setDiscos] = React.useState([]);
  const [disco, setDisco] = React.useState({
    tipoDeDisco: "",
    marca: "",
    modelo: "",
    almacenamiento: "",
  });

  const [sims, setSims] = React.useState([]);
  const [sim, setSim] = React.useState({
    empresaSim: "",
    serialSim: "",
    tipoExtraccionSim: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createEfecto(efecto, discos, sims));
    closeModal();
  };

  const handleDiscoSubmit = (e) => {
    e.preventDefault();
    setAddDiscosModal(false);
    setDiscos([...discos, disco]);
    setDisco({
      tipoDeDisco: "",
      marca: "",
      modelo: "",
      almacenamiento: "",
    });
    toast.success("Disco Guardado con Exito!");
  };

  const handleSimSubmit = (e) => {
    e.preventDefault();
    setAddSimModal(false);
    setSims([...sims, sim]);
    setSim({
      empresaSim: "",
      serialSim: "",
      tipoExtraccionSim: "",
    });
    toast.success("Disco Guardado con Exito!");
  };

  // const handleComplete = () => {
  //   const { bolsa_id, tipoDeElemento, marca, estado, herramientaSoft, tipoExtraccion, descripcionTarea } = efecto;

  //   if (bolsa_id && tipoDeElemento && marca && estado && herramientaSoft && tipoExtraccion && descripcionTarea) {
  //     return "true";
  //   } else {
  //     return "false";
  //   }
  // };

  const handleOptButtonClick = (e) => {
    e.preventDefault();
    switch (e.target.value) {
      case "sim": {
        setAddSimModal(true);
        break;
      }
      case "discos": {
        setAddDiscosModal(true);
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Title>Agregar Elemento</Title>
        <InputContainer>
          <Label>Nro Bolsa</Label>
          <Select value={efecto.bolsa_id} onChange={(e) => setEfecto({ ...efecto, bolsa_id: Number(e.target.value) })}>
            <SelectOpt value="">Nro Bolsa</SelectOpt>
            {currentBolsas.length !== 0 &&
              currentBolsas.map((b) => (
                <SelectOpt
                  value={b.id}
                  key={b.id}
                  style={b.colorPrecinto === "rojo" ? { color: redColor } : { color: greenColor }}
                >
                  {b.nroPrecinto}
                </SelectOpt>
              ))}
          </Select>
        </InputContainer>
        <InputContainer>
          <Label>Tipo de Elemento</Label>
          <Select
            value={efecto.tipoDeElemento}
            onChange={(e) => setEfecto({ ...efecto, tipoDeElemento: e.target.value })}
          >
            <SelectOpt value="">Tipo de Elemento</SelectOpt>
            <SelectOpt value="celular">Celular</SelectOpt>
            <SelectOpt value="tablet">Tablet</SelectOpt>
            <SelectOpt value="notebook">Notebook</SelectOpt>
            <SelectOpt value="pc">PC</SelectOpt>
          </Select>
        </InputContainer>
        <InputContainer>
          <Label>Marca</Label>
          <Input
            type="text"
            name="marca"
            value={efecto.marca}
            placeholder="Marca"
            onChange={(e) => setEfecto({ ...efecto, marca: e.target.value })}
          />
        </InputContainer>
        <InputContainer>
          <Label>Modelo</Label>
          <Input
            type="text"
            name="modelo"
            value={efecto.modelo}
            placeholder="Modelo"
            onChange={(e) => setEfecto({ ...efecto, modelo: e.target.value })}
          />
        </InputContainer>
        {efecto.tipoDeElemento === "celular" && (
          <InputContainer>
            <Label>IMEI</Label>
            <Input
              type="text"
              name="imei"
              value={efecto.imei}
              placeholder="Imei"
              onChange={(e) => setEfecto({ ...efecto, imei: e.target.value })}
            />
          </InputContainer>
        )}
        {/* <InputContainer>
            <Label>IMEI 2</Label>
            <Input
              type="text"
              name="imei 2"
              value={efecto.imei2}
              placeholder="Imei 2"
              onChange={(e) => setEfecto({ ...efecto, imei2: e.target.value })}
            />
          </InputContainer> */}
        <InputContainer>
          <Label>Estado</Label>
          <Select value={efecto.estado} onChange={(e) => setEfecto({ ...efecto, estado: e.target.value })}>
            <SelectOpt value="">Estado</SelectOpt>
            <SelectOpt value="completo">Completo</SelectOpt>
            <SelectOpt value="en proceso">En Proceso</SelectOpt>
          </Select>
        </InputContainer>
        <InputContainer>
          <Label>Sistema Operativo</Label>
          <Input
            type="text"
            name="sistemaOperativo"
            value={efecto.sistemaOperativo}
            placeholder="SistemaOperativo"
            onChange={(e) => setEfecto({ ...efecto, sistemaOperativo: e.target.value })}
          />
        </InputContainer>

        <InputContainer>
          <Label>Tipo de Seguridad</Label>
          <Select
            value={efecto.tipoSeguridad}
            onChange={(e) => setEfecto({ ...efecto, tipoSeguridad: e.target.value })}
          >
            <SelectOpt value="">Tipo de Seguridad</SelectOpt>
            <SelectOpt value="ninguna">Ninguna</SelectOpt>
            <SelectOpt value="patron">Patron</SelectOpt>
            <SelectOpt value="contraseña">Contraseña</SelectOpt>
            <SelectOpt value="pin">Pin</SelectOpt>
            <SelectOpt value="facial">Facial</SelectOpt>
            <SelectOpt value="huella">Huella</SelectOpt>
          </Select>
        </InputContainer>
        {efecto.tipoSeguridad === "ninguna" || efecto.tipoSeguridad === "" ? null : (
          <InputContainer>
            <Label>¿Desbloqueo?</Label>
            <Select value={efecto.desbloqueo} onChange={(e) => setEfecto({ ...efecto, desbloqueo: e.target.value })}>
              <SelectOpt value="">Desbloqueo</SelectOpt>
              <SelectOpt value="si">Si</SelectOpt>
              <SelectOpt value="no">No</SelectOpt>
            </Select>
          </InputContainer>
        )}
        <InputContainer>
          <Label>Herramienta Software</Label>
          <Select
            value={efecto.herramientaSoft}
            onChange={(e) => setEfecto({ ...efecto, herramientaSoft: e.target.value })}
          >
            <SelectOpt value="">Herramienta Software</SelectOpt>
            <SelectOpt value="ninguna">Ninguna</SelectOpt>
            <SelectOpt value="UFED">UFED</SelectOpt>
          </Select>
        </InputContainer>
        <InputContainer>
          <Label>Tipo de Extracción</Label>
          <Select
            value={efecto.tipoExtraccion}
            onChange={(e) => setEfecto({ ...efecto, tipoExtraccion: e.target.value })}
          >
            <SelectOpt value="">Tipo de Extracción</SelectOpt>
            <SelectOpt value="ninguna">Ninguna</SelectOpt>
            <SelectOpt value="fisica">Fisica</SelectOpt>
            <SelectOpt value="logica">Logica</SelectOpt>
            <SelectOpt value="fisica y logica">Ambas</SelectOpt>
          </Select>
        </InputContainer>
        <InputContainer style={{ flexDirection: "column", flex: 1.5 }}>
          <TextArea
            placeholder="Descripción Tarea"
            value={efecto.descripcionTarea}
            onChange={(e) => setEfecto({ ...efecto, descripcionTarea: e.target.value })}
          />
        </InputContainer>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", width: "100%" }}>
          <Button type="submit" value="Cargar Elemento" complete={"true"} />
          {efecto.tipoDeElemento === "celular" && (
            <OptButton onClick={(e) => handleOptButtonClick(e)} value="sim">
              Agregar SIM
            </OptButton>
          )}
          {efecto.tipoDeElemento === "notebook" && (
            <OptButton onClick={(e) => handleOptButtonClick(e)} value="discos">
              Agregar Discos
            </OptButton>
          )}
          {efecto.tipoDeElemento === "pc" && (
            <OptButton onClick={(e) => handleOptButtonClick(e)} value="discos">
              Agregar Discos
            </OptButton>
          )}
        </div>
      </Form>
      <Modal isOpen={addDiscosModal} style={addModalStyle} ariaHideApp={false}>
        <CloseIcon onClick={() => setAddDiscosModal(!addDiscosModal)} />
        <Form onSubmit={handleDiscoSubmit}>
          <Title>Agregar Disco</Title>
          <InputContainer>
            <Label>Tipo de Disco</Label>
            <Input
              type="text"
              name="tipo de Disco"
              value={disco.tipoDeDisco}
              placeholder="Tipo de Disco"
              onChange={(e) => setDisco({ ...disco, tipoDeDisco: e.target.value })}
            />
          </InputContainer>
          <InputContainer>
            <Label>Marca</Label>
            <Input
              type="text"
              name="marca"
              value={disco.marca}
              placeholder="Marca"
              onChange={(e) => setDisco({ ...disco, marca: e.target.value })}
            />
          </InputContainer>
          <InputContainer>
            <Label>Modelo</Label>
            <Input
              type="text"
              name="modelo"
              value={disco.Modelo}
              placeholder="Modelo"
              onChange={(e) => setDisco({ ...disco, modelo: e.target.value })}
            />
          </InputContainer>
          <InputContainer>
            <Label>almacenamiento (GB)</Label>
            <Input
              type="text"
              name="almacenamiento"
              value={disco.almacenamiento}
              placeholder="Almacenamiento"
              onChange={(e) => setDisco({ ...disco, almacenamiento: e.target.value })}
            />
          </InputContainer>
          <Button type="submit" value="Agregar Disco" complete={"true"} />
        </Form>
      </Modal>
      <Modal isOpen={addSimModal} style={addModalStyle} ariaHideApp={false}>
        <CloseIcon onClick={() => setAddSimModal(!addSimModal)} />
        <Form onSubmit={handleSimSubmit}>
          <Title>Agregar SIM</Title>
          <InputContainer>
            <Label>Empresa Sim</Label>
            <Input
              type="text"
              name="empresa sim"
              value={sim.empresaSim}
              placeholder="Empresa Sim"
              onChange={(e) => setSim({ ...sim, empresaSim: e.target.value })}
            />
          </InputContainer>
          <InputContainer>
            <Label>Serial Sim</Label>
            <Input
              type="text"
              name="serial sim"
              value={sim.serialSim}
              placeholder="Serial Sim"
              onChange={(e) => setSim({ ...sim, serialSim: e.target.value })}
            />
          </InputContainer>
          <InputContainer>
            <Label>Tipo de Extracción</Label>
            <Select
              value={sim.tipoExtraccionSim}
              onChange={(e) => setSim({ ...sim, tipoExtraccionSim: e.target.value })}
            >
              <SelectOpt value="">Tipo de Extracción</SelectOpt>
              <SelectOpt value="ninguna">Ninguna</SelectOpt>
              <SelectOpt value="fisica">Fisica</SelectOpt>
              <SelectOpt value="logica">Logica</SelectOpt>
              <SelectOpt value="fisica y logica">Ambas</SelectOpt>
            </Select>
          </InputContainer>
          <Button type="submit" value="Agregar Sim" complete={"true"} />
        </Form>
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
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-height: 100px;
  border-bottom: 1px solid ${secondaryColor};
`;

const Label = styled.label`
  flex: 1;
`;

const Input = styled.input`
  ${input}
  font-size: medium;
  flex: 1;
  min-height: 65%;
  text-align: center;
`;

const Select = styled.select`
  ${select}
  font-size: medium;
  flex: 1;
  min-height: 65%;
  text-align: center;
`;

const SelectOpt = styled.option``;

const TextArea = styled.textarea`
  ${input}
  font-size: medium;
  flex: 1;
  max-height: 100%;
  min-height: 100%;
  max-width: 100%;
  min-width: 100%;
  text-align: center;
`;

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
  padding-inline: 15px;
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

const CloseIcon = styled(Close)`
  position: absolute;
  right: 0;
  top: 0;
  width: 8%;
  margin-top: 1%;
  color: white;
  transition: all 0.5s ease;

  &:hover {
    color: ${secondaryColor};
    cursor: pointer;
  }
`;
