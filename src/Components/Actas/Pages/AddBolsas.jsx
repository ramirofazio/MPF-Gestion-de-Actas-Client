import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
//* Redux
import { useDispatch, useSelector } from "react-redux";
import { createBolsas, removeBolsa, closeProcessActa, removeEfecto } from "../../../redux/actions";
//* Style
import styled, { css } from "styled-components";
import GlobalStyles from "../../../Styles/GlobalStyles";
import Variables from "../../../Styles/Variables";
import { Close } from "@styled-icons/ionicons-outline/Close";
import { TagLock } from "@styled-icons/fluentui-system-filled/TagLock";
import { LockClosed } from "@styled-icons/fluentui-system-filled/LockClosed";
import { Delete } from "@styled-icons/fluentui-system-filled/Delete";
import { BoxSeam } from "@styled-icons/bootstrap/BoxSeam";
import ClipLoader from "react-spinners/ClipLoader";
//* Modal
import Modal from "react-modal";
//* Components
import AddEfectos from "./AddEfectos";
import CreateEfectosCards from "../../Utils/efectos/CreateEfectosCards";
import CloseModal from "./CloseModal";
import getSavedActa from "../../Utils/template/getSavedActa";
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
    height: "max-content",
  },
};

function AddBolsas() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentActa = useSelector((s) => JSON.parse(localStorage.getItem("currentActa")) || s.currentActa);
  const currentBolsas = useSelector((s) => JSON.parse(localStorage.getItem("currentBolsas")) || s.currentBolsas);
  const currentEfectos = useSelector((s) => JSON.parse(localStorage.getItem("currentEfectos")) || s.currentEfectos);

  const [loading, setLoading] = React.useState(false);
  const [addEfectosModal, setAddEfectosModal] = React.useState(false);
  const [closeBagsModal, setCloseBagsModal] = React.useState(false);
  const [bolsa, setBolsa] = React.useState({
    acta_id: currentActa.id,
    colorPrecinto: "",
    nroPrecinto: "",
    observaciones: currentActa.estado === "en creacion" ? "un sobre, papel madera cerrado" : "",
  });

  const handleRemoveEfecto = (efecto_id) => {
    if (currentActa.estado === "en creacion") {
      dispatch(removeEfecto(efecto_id, currentActa.id));
    }
  };

  const handleCloseProcessActa = () => {
    setLoading(true);
    dispatch(closeProcessActa(currentActa.id, navigate)); //* Mando el ID para que el backend haga toda la logica
  };

  const handleSubmitBolsa = () => {
    //* Crea una bolsa nueva y blanquea los input
    dispatch(createBolsas(bolsa));
    setBolsa({
      acta_id: currentActa.id,
      colorPrecinto: "",
      nroPrecinto: "",
      observaciones: "Un sobre, papel madera cerrado",
    });
  };

  const handleCompleteEfectos = () => {
    //* Activa o desactiva el btn de agregar Elementos segun los estados de las bolsas
    let res = "false";
    currentBolsas.map((b) => {
      b.estado !== "cerrada" && b.estado !== "cerrada en proceso" && currentActa.estado !== "para completar"
        ? (res = "true")
        : (res = "false");
    });

    return res;
  };

  const handleCompleteCloseBags = () => {
    //* Activa el btn de cerrar bolsas solo cuando estan abiertas con elementos dentro
    let res = "false";
    if (currentBolsas.length !== 0) {
      currentBolsas.forEach((b) => {
        if (b.estado === "abierta con efectos en proceso" || b.estado === "abierta con efectos completos") {
          res = "true";
        }
      });
    }

    return res;
  };

  const handleCloseBags = () => {
    if (currentActa.estado !== "para completar") {
      alert("¡Una vez cerrada una bolsa no podra volver a crear mas bolsas ni agregar elementos a ninguna!");
    }
    setCloseBagsModal(!closeBagsModal);
  };

  const handleDeleteBolsa = (bolsaId) => {
    //* Borra una bolsa
    dispatch(removeBolsa(bolsaId, currentActa.id));
  };

  return (
    <Container>
      <Header>
        <Title>Creacion de Bolsas y Elementos</Title>
      </Header>
      <FormContainer>
        <Form>
          <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
            <InputContainer>
              <Label>Precinto de Apertura</Label>
              <Select
                disabled={currentActa.estado === "en creacion" ? false : true}
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
              <Label>N° Precinto</Label>
              <Input
                type="number"
                name="N° Precinto"
                value={bolsa.nroPrecinto}
                placeholder="N° Precinto"
                onChange={(e) => setBolsa({ ...bolsa, nroPrecinto: e.target.value })}
                disabled={currentActa.estado === "en creacion" ? false : true}
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
              disabled={currentActa.estado === "en creacion" ? false : true}
            />
          </InputContainer>
        </Form>
        <BolsasContainer>
          {currentBolsas &&
            currentBolsas.map((bolsa) => {
              return (
                <BolsaContainer key={bolsa.id}>
                  <Info style={bolsa.colorPrecinto === "rojo" ? { color: redColor } : { color: greenColor }}>
                    <CardTitle>Nº Precinto {bolsa.colorPrecinto === "rojo" ? "rojo" : "verde"}</CardTitle>
                    <br />
                    {bolsa.nroPrecinto}
                  </Info>
                  <Info>
                    <CardTitle>Cant. Elementos</CardTitle>
                    <br />
                    {bolsa.Efectos.length}
                  </Info>
                  {(bolsa.estado === "abierta con efectos completos" || bolsa.estado === "abierta con efectos en proceso") && (
                    <BoxSeamIcon />
                  )}
                  {bolsa.Efectos?.length <= 0 && <DeleteIcon onClick={() => handleDeleteBolsa(bolsa.id)} />}
                  {bolsa.estado === "cerrada" && <TagLockIcon />}
                  {bolsa.estado === "cerrada en proceso" && <LockClosedIcon />}
                </BolsaContainer>
              );
            })}
        </BolsasContainer>
      </FormContainer>
      <EfectosContainer>
        {currentEfectos &&
          currentEfectos.map((efecto) => (
            <CreateEfectosCards
              efecto={efecto}
              currentBolsas={currentBolsas}
              estadoActa={currentActa.estado}
              handleRemoveEfecto={handleRemoveEfecto}
              key={efecto.id}
            />
          ))}
      </EfectosContainer>
      <Modal isOpen={addEfectosModal} style={modal30x90} ariaHideApp={false}>
        <CloseIcon onClick={() => setAddEfectosModal(!addEfectosModal)} />
        <AddEfectos closeModal={() => setAddEfectosModal(!addEfectosModal)} />
      </Modal>

      <div style={{ display: "flex", width: "100%", justifyContent: "space-evenly" }}>
        {currentActa.estado === ("en creacion" || "para completar") && currentBolsas.length === 0 ? (
          <>
            <Button
              complete={bolsa.colorPrecinto && bolsa.nroPrecinto && bolsa.observaciones && "true"}
              onClick={() => handleSubmitBolsa()}
              to="#"
            >
              Añadir Bolsa
            </Button>
          </>
        ) : (
          currentActa.estado !== ("completa" || "en proceso") && (
            <>
              <Button
                complete={
                  bolsa.colorPrecinto && bolsa.nroPrecinto && bolsa.observaciones && currentActa.estado === "en creacion"
                    ? "true"
                    : handleCompleteEfectos()
                }
                onClick={() =>
                  bolsa.colorPrecinto && bolsa.nroPrecinto && bolsa.observaciones && currentActa.estado === "en creacion"
                    ? handleSubmitBolsa()
                    : setAddEfectosModal(!addEfectosModal)
                }
                to="#"
              >
                {bolsa.colorPrecinto && bolsa.nroPrecinto && bolsa.observaciones && currentActa.estado === "en creacion"
                  ? "Añadir Bolsa"
                  : "Añadir Elementos"}
              </Button>
              <Button complete={handleCompleteCloseBags()} onClick={() => handleCloseBags()} to="#">
                Cerrar Bolsas
              </Button>
            </>
          )
        )}
        {currentActa.estado === "en proceso" && (
          <>
            <Button
              onClick={() =>
                currentActa.observaciones !== "" ? getSavedActa(currentActa.id, navigate) : setCloseBagsModal(!closeBagsModal)
              }
              complete={"true"}
              to="#"
            >
              Imprimir Acta en Proceso
            </Button>
            {!loading && (
              <Button onClick={() => handleCloseProcessActa()} complete={"true"} to="#">
                Cerrar Elementos en Proceso
              </Button>
            )}
            {loading && (
              <Button complete={"true"} to="#">
                Cerrando Elementos{" "}
                <ClipLoader color={"black"} size={18} cssOverride={{ marginBottom: "-2%", marginLeft: "10px" }} loading={true} />
              </Button>
            )}
          </>
        )}

        {currentActa.estado === "completa" && (
          <>
            <Button
              onClick={() =>
                currentActa.estado === "completa" ? getSavedActa(currentActa.id, navigate) : setCloseBagsModal(!closeBagsModal)
              }
              complete={"true"}
              to="#"
            >
              Imprimir Acta
            </Button>
          </>
        )}
      </div>

      <Modal isOpen={closeBagsModal} style={modal40x40} ariaHideApp={false}>
        <CloseIcon onClick={() => setCloseBagsModal(!closeBagsModal)} />
        <CloseModal closeModal={() => setCloseBagsModal(!closeBagsModal)} />
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

const BoxSeamIcon = styled(BoxSeam)`
  width: 6%;
  margin-right: 5%;
  color: ${secondaryColor};
`;

const DeleteIcon = styled(Delete)`
  width: 6%;
  margin-right: 5%;
  color: ${secondaryColor};
  transition: all 0.5s ease;

  &:hover {
    cursor: pointer;
    color: black;
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
