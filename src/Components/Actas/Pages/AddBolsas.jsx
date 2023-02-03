import React from "react";
import { NavLink } from "react-router-dom";
//* Redux
import { useDispatch, useSelector } from "react-redux";
import { createBolsas, removeBolsa } from "../../../redux/actions";
//* Style
import styled, { css } from "styled-components";
import GlobalStyles from "../../../Styles/GlobalStyles";
import Variables from "../../../Styles/Variables";
import { Close } from "@styled-icons/ionicons-outline/Close";
import { TagLock } from "@styled-icons/fluentui-system-filled/TagLock";
import { LockClosed } from "@styled-icons/fluentui-system-filled/LockClosed";
import { Delete } from "@styled-icons/fluentui-system-filled/Delete";
//* Modal
import Modal from "react-modal";
//* Components
import AddEfectos from "./AddEfectos";
import CloseModal from "./CloseModal";
import CreateEfectosCards from "../../Utils/efectos/CreateEfectosCards";
//* Initializations
const { redColor, greenColor, principalColor, secondaryColor } = Variables;
const {
  select,
  input,
  form,
  inputLabel,
  inputContainer,
  enProcesoContainer,
  header,
  headerTitle,
  formContainer,
  button,
  cardInfo,
  cardTitle,
  modal40x40,
} = GlobalStyles;

const modal30x90 = {
  content: {
    ...modal40x40.content,
    width: "30%",
    height: "90%",
  },
};

function AddBolsas() {
  const dispatch = useDispatch();

  const currentActa = useSelector((s) => JSON.parse(localStorage.getItem("currentActa")) || s.currentActa);
  const currentBolsas = useSelector((s) => JSON.parse(localStorage.getItem("currentBolsas")) || s.currentBolsas);
  const currentEfectos = useSelector((s) => JSON.parse(localStorage.getItem("currentEfectos")) || s.currentEfectos);

  const [addEfectosModal, setAddEfectosModal] = React.useState(false);
  const [closeModal, setCloseModal] = React.useState(false);

  const [bolsa, setBolsa] = React.useState({
    acta_id: currentActa.id,
    colorPrecinto: "",
    nroPrecinto: "",
    observaciones: "un sobre, papel madera cerrado",
  });

  const handleDeleteBolsa = (bolsaId) => {
    dispatch(removeBolsa(bolsaId, currentActa.id));
  };

  const handleSubmitBolsa = (e) => {
    e.preventDefault();
    dispatch(createBolsas(bolsa));
    setBolsa({
      acta_id: currentActa.id,
      colorPrecinto: "",
      nroPrecinto: "",
      observaciones: "Un sobre, papel madera cerrado",
    });
  };

  const handleCompleteClose = () => {
    let res = "false";

    currentBolsas.forEach((b) => {
      b.estado === "abierta con efectos completos" || b.estado === "abierta con efectos en proceso" ? (res = "true") : (res = "false");
    });

    currentBolsas.forEach((b) => {
      if (b.estado === "cerrada" || b.estado === "cerrada en proceso") res = "true";
    });

    return res;
  };

  const handleCompleteEfectos = () => {
    let res = "false";
    currentBolsas.map((b) => {
      b.estado !== "cerrada" && b.estado !== "cerrada en proceso" ? (res = "true") : (res = "false");
    });

    return res;
  };

  return (
    <Container>
      <Header>
        <Title>Creacion de Bolsas y Elementos</Title>
      </Header>
      <FormContainer>
        <Form onSubmit={handleSubmitBolsa}>
          <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
            <InputContainer>
              <Label>Precinto de Apertura</Label>
              <Select value={bolsa.colorPrecinto} onChange={(e) => setBolsa({ ...bolsa, colorPrecinto: e.target.value })}>
                <SelectOpt value="">Color del Precinto</SelectOpt>
                <SelectOpt value="rojo">Rojo</SelectOpt>
                <SelectOpt value="verde">Verde</SelectOpt>
                <SelectOpt value="blanco">Blanco</SelectOpt>
              </Select>
            </InputContainer>
            <InputContainer>
              <Label>Nro Precinto</Label>
              <Input
                type="number"
                name="Numero Precinto"
                value={bolsa.nroPrecinto}
                placeholder="Numero Precinto"
                onChange={(e) => setBolsa({ ...bolsa, nroPrecinto: e.target.value })}
              />
            </InputContainer>
          </div>
          <InputContainer style={{ width: "100%", marginTop: "5%" }}>
            <Label>Observaciones/Descripción de la Bolsa</Label>
            <Input
              type="text"
              name="Observaciones/Descripcion de la Bolsa"
              value={bolsa.observaciones}
              placeholder="Observaciones/Descripcion de la Bolsa"
              onChange={(e) => setBolsa({ ...bolsa, observaciones: e.target.value })}
            />
          </InputContainer>
          <Submit
            type="submit"
            value="Cargar Bolsa"
            complete={bolsa.colorPrecinto && bolsa.nroPrecinto && bolsa.observaciones ? "true" : "false"}
          />
        </Form>
        <BolsasContainer>
          {currentBolsas &&
            currentBolsas.map((bolsa) => {
              return (
                <BolsaContainer key={bolsa.id}>
                  {bolsa.Efectos?.length <= 0 && <DeleteIcon onClick={() => handleDeleteBolsa(bolsa.id)} />}
                  <Info style={bolsa.colorPrecinto === "rojo" ? { color: redColor } : { color: greenColor }}>
                    <CardTitle>Nro Precinto {bolsa.colorPrecinto === "rojo" ? "rojo" : "verde"}</CardTitle>
                    <br />
                    {bolsa.nroPrecinto}
                  </Info>
                  {bolsa.estado === "cerrada" && <TagLockIcon />}
                  {bolsa.estado === "cerrada en proceso" && <LockClosedIcon />}
                </BolsaContainer>
              );
            })}
        </BolsasContainer>
      </FormContainer>
      <EfectosContainer>
        {currentEfectos &&
          currentEfectos.map((efecto) => <CreateEfectosCards efecto={efecto} currentBolsas={currentBolsas} key={efecto.id} />)}
      </EfectosContainer>
      <Modal isOpen={addEfectosModal} style={modal30x90} ariaHideApp={false}>
        <CloseIcon onClick={() => setAddEfectosModal(!addEfectosModal)} />
        <AddEfectos closeModal={() => setAddEfectosModal(!addEfectosModal)} />
      </Modal>
      <div style={{ display: "flex", width: "100%", justifyContent: "space-evenly" }}>
        <Button complete={handleCompleteEfectos()} onClick={() => setAddEfectosModal(!addEfectosModal)}>
          Añadir Elementos
        </Button>
        <Button onClick={() => setCloseModal(!closeModal)} complete={handleCompleteClose()}>
          Cerrar
        </Button>
      </div>
      <Modal isOpen={closeModal} style={modal40x40} ariaHideApp={false}>
        <CloseIcon onClick={() => setCloseModal(!closeModal)} />
        <CloseModal closeModal={() => setCloseModal(!closeModal)} />
      </Modal>
    </Container>
  );
}

export default AddBolsas;

const Container = styled.div`
  ${enProcesoContainer}
  justify-content: flex-start;
  padding-bottom: 10px;
`;

const Header = styled.header`
  ${header}
  margin-bottom: 2%;
`;

const Title = styled.h1`
  ${headerTitle}
`;

const FormContainer = styled.div`
  ${formContainer}
  flex-direction: row;
  height: 25%;
  min-height: 0;
  padding: 0;
  justify-content: space-between;
  border-bottom: 2px solid ${principalColor};
`;

const Form = styled.form`
  ${form}
  padding: 2%;
  flex: 1.2;
  justify-content: space-evenly;
  height: 35%;
`;

const InputContainer = styled.div`
  ${inputContainer}
`;

const Label = styled.label`
  ${inputLabel}
`;

const Select = styled.select`
  ${select}
`;

const SelectOpt = styled.option`
  font-size: medium;
  font-weight: 400;
`;

const Input = styled.input`
  ${input}
`;

const BolsasContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  height: 100%;
  padding-inline: 2%;
  overflow-y: scroll;
`;

const BolsaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  height: 25%;
  min-height: 25%;
  border: 3px solid ${principalColor};
  border-radius: 5px;
  margin-block: 5px;
`;

const EfectosContainer = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: scroll;
  padding-block: 15px;
`;

const Button = styled(NavLink)`
  ${button}
  text-decoration: none;
  background: white;
  border: 2px solid ${redColor};
  pointer-events: none;

  ${(props) =>
    props.complete === "true" &&
    css`
      pointer-events: all;
      border: 2px solid ${greenColor};
    `}
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

const TagLockIcon = styled(TagLock)`
  width: 6%;
  margin-right: 5%;
  color: ${secondaryColor};
`;

const LockClosedIcon = styled(LockClosed)`
  width: 6%;
  margin-right: 5%;
  color: ${secondaryColor};
`;

const DeleteIcon = styled(Delete)`
  width: 6%;
  margin-left: 5%;
  color: ${secondaryColor};

  &:hover {
    cursor: pointer;
  }
`;

const Submit = styled.input`
  ${button}
  padding: 2px;
  padding-inline: 15px;
  margin-top: 15px;
  text-decoration: none;
  background: white;
  border: 2px solid ${redColor};
  pointer-events: none;

  ${(props) =>
    props.complete === "true" &&
    css`
      pointer-events: all;
      border: 2px solid ${greenColor};
    `}
`;

const Info = styled.span`
  ${cardInfo}
`;

const CardTitle = styled.strong`
  ${cardTitle}
`;
