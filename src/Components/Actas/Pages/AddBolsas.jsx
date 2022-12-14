import React from "react";
import { NavLink } from "react-router-dom";
//* Redux
import { useDispatch, useSelector } from "react-redux";
import { createBolsas } from "../../../redux/actions";
//* Style
import styled, { css } from "styled-components";
import GlobalStyles from "../../../Styles/GlobalStyles";
import Variables from "../../../Styles/Variables";
import { Close } from "@styled-icons/ionicons-outline/Close";
//* Modal
import Modal from "react-modal";
//* Components
import AddEfectos from "./AddEfectos";
import CloseModal from "./CloseModal";
//* Initializations
const { redColor, greenColor, yellowColor, principalColor, secondaryColor } = Variables;
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
  cardTitle,
  cardInfo,
} = GlobalStyles;
const addEfectosModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "30%",
    height: "90%",
    backgroundColor: principalColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: 0,
    overflowX: "hidden",
  },
};
const CloseModalStyles = {
  content: {
    ...addEfectosModalStyles.content,
    width: "40%",
    height: "40%",
  },
};

function AddBolsas() {
  const dispatch = useDispatch();

  const currentActa = useSelector((s) => s?.currentActa);
  const currentBolsas = useSelector((s) => JSON.parse(localStorage.getItem("currentBolsas")) || s?.currentBolsas);
  const currentEfectos = useSelector((s) => JSON.parse(localStorage.getItem("currentEfectos")) || s?.currentEfectos);

  const [addEfectosModal, setAddEfectosModal] = React.useState(false);
  const [closeModal, setCloseModal] = React.useState(false);

  const [bolsa, setBolsa] = React.useState({
    acta_id: currentActa.id,
    colorPrecinto: "",
    nroPrecinto: "",
    observaciones: "Un sobre, papel madera cerrado",
  });

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
    currentBolsas.map((bolsa) => {
      currentEfectos.map((efecto) => {
        if (efecto.bolsa_id === bolsa.id) {
          res = "true";
        } else {
          res = "false";
        }
      });
    });
    return res;
  };

  return (
    <Container>
      <Header>
        <Title>Creacion de Bolsas y Efectos</Title>
      </Header>
      <FormContainer>
        <Form onSubmit={handleSubmitBolsa}>
          <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
            <InputContainer>
              <Label>Color del Precinto</Label>
              <Select
                value={bolsa.colorPrecinto}
                onChange={(e) => setBolsa({ ...bolsa, colorPrecinto: e.target.value })}
              >
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
                  <Info style={bolsa.colorPrecinto === "rojo" ? { color: redColor } : { color: greenColor }}>
                    <CardTitle>Nro Precinto {bolsa.colorPrecinto === "rojo" ? "rojo" : "verde"}</CardTitle>
                    <br />
                    {bolsa.nroPrecinto}
                  </Info>
                </BolsaContainer>
              );
            })}
        </BolsasContainer>
      </FormContainer>
      <EfectosContainer>
        {currentEfectos.map((efecto) => {
          let nroPrecintoBolsa;
          let colorPrecintoBolsa;
          currentBolsas.map((b) =>
            b.id === efecto.bolsa_id
              ? (nroPrecintoBolsa = b.nroPrecinto) && (colorPrecintoBolsa = b.colorPrecinto)
              : null
          );
          return (
            <EfectoContainer key={efecto.id} estado={efecto.estado}>
              <Info style={colorPrecintoBolsa === "rojo" ? { color: redColor } : { color: greenColor }}>
                <CardTitle>Bolsa Nro</CardTitle>
                <br />
                {nroPrecintoBolsa}
              </Info>
              <Info>
                <CardTitle>Tipo</CardTitle>
                <br />
                {efecto.tipoDeElemento}
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
                <CardTitle>Tipo de Extraccion</CardTitle>
                <br />
                {efecto.tipoExtraccion}
              </Info>
              <Info>
                <CardTitle>Estado</CardTitle>
                <br />
                {efecto.estado}
              </Info>
            </EfectoContainer>
          );
        })}
      </EfectosContainer>
      <Modal isOpen={addEfectosModal} style={addEfectosModalStyles} ariaHideApp={false}>
        <CloseIcon onClick={() => setAddEfectosModal(!addEfectosModal)} />
        <AddEfectos closeModal={() => setAddEfectosModal(!addEfectosModal)} />
      </Modal>
      <div style={{ display: "flex", width: "100%", justifyContent: "space-evenly" }}>
        <Button
          complete={currentBolsas.length !== 0 ? "true" : "false"}
          onClick={() => setAddEfectosModal(!addEfectosModal)}
        >
          Añadir Elementos
        </Button>
        <Button onClick={() => setCloseModal(!closeModal)} complete={handleCompleteClose()}>
          Cerrar
        </Button>
      </div>
      <Modal isOpen={closeModal} style={CloseModalStyles} ariaHideApp={false}>
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

  border: ${(props) =>
    props.estado === "en proceso"
      ? `3px solid ${yellowColor}`
      : props.estado === "completo"
      ? `3px solid ${greenColor}`
      : `3px solid ${redColor}`};
`;

const Info = styled.span`
  ${cardInfo}
`;

const CardTitle = styled.strong`
  ${cardTitle}
`;

// const Estado = styled.span`
//   color: ${(props) =>
//     props.estado === "en proceso" ? yellowColor : props.estado === "completo" ? greenColor : redColor};
// `;
