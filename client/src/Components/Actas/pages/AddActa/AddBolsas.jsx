import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
//* Redux
import { createBolsas } from "../../../../redux/actions";
//* Style
import styled, { css } from "styled-components";
import GlobalStyles from "../../../../Styles/GlobalStyles";
import Variables from "../../../../Styles/Variables";
import { useDispatch, useSelector } from "react-redux";
import { Close } from "@styled-icons/ionicons-outline/Close";
//* Modal
import Modal from "react-modal";
//* Doc
//import generateDoc from "../../generateDoc";
//* Components
import AddEfectos from "./AddEfectos";

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
  headerDescription,
  formContainer,
  button,
} = GlobalStyles;

function AddBolsas() {
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(false);
  const currentActa = useSelector((state) => state?.currentActa);
  const currentIntegrantes = useSelector((state) => state?.currentIntegrantes);
  const [bolsa, setBolsa] = useState({
    acta_id: currentActa.id,
    colorPrecinto: "",
    nroPrecinto: "",
    observaciones: "",
  });

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      width: "30%",
      height: "80%",
      backgroundColor: principalColor,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      padding: 0,
    },
  };

  const handleComplete = () => {};

  const handleClick = () => {
    dispatch(createBolsas(bolsa));
  };

  useEffect(() => {
    console.log(currentActa, currentIntegrantes);
  }, [currentIntegrantes]);

  return (
    <Container>
      <Header>
        <Title>Creacion de Bolsas</Title>
        <Description>Bolsas y Efectos</Description>
      </Header>
      <FormContainer>
        <Form>
          <div style={{ width: "100%", display: "flex", justifyContent: "space-around" }}>
            <InputContainer>
              <Label>Color del Precinto</Label>
              <Select
                value={bolsa.colorPrecinto}
                onChange={(e) => setBolsa({ ...bolsa, colorPrecinto: e.target.value })}
              >
                <SelectOpt>Color del Precinto</SelectOpt>
                <SelectOpt>Rojo</SelectOpt>
                <SelectOpt>Verde</SelectOpt>
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
          <InputContainer style={{ width: "100%" }}>
            <Label>Observaciones/Descripción de la Bolsa</Label>
            <Input
              type="number"
              name="Observaciones/Descripcion de la Bolsa"
              value={bolsa.observaciones}
              placeholder="Observaciones/Descripcion de la Bolsa"
              onChange={(e) => setBolsa({ ...bolsa, observaciones: e.target.value })}
            />
          </InputContainer>
        </Form>
      </FormContainer>
      <EfectosContainer>
        {/*
        {efectos
          ? efectos.map((efecto) => (
              <EfectoContainer key={efecto.id} estado={efecto.estado}>
                <Info>
                  <CardTitle>Nro Precinto</CardTitle>
                  <br />
                  {efecto.Bolsa.nro_precinto}
                </Info>
                <Info>
                  <CardTitle>Tipo</CardTitle>
                  <br />
                  {efecto.tipo}
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
                  <CardTitle>Estado</CardTitle>
                  <br />
                  <Estado estado={efecto.estado}>{efecto.estado}</Estado>
                </Info>
                <CheckBoxContainer>
                  {efecto.estado === "completo" ? (
                    <CheckIcon />
                  ) : (
                    <CheckBox type="checkbox" onClick={() => handleCheckClick(efecto.id)} />
                  )}
                </CheckBoxContainer>
              </EfectoContainer>
            ))
          : null}
          */}
      </EfectosContainer>
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <CloseIcon onClick={() => setIsOpen(!modalIsOpen)} />
        <AddEfectos />
      </Modal>
      <div style={{ display: "flex", width: "100%", justifyContent: "space-evenly" }}>
        <Button complete={"true"} onClick={() => setIsOpen(!modalIsOpen)}>
          Añadir Elementos
        </Button>
        <Button to={"/actas/crear/4"} onClick={() => handleClick()} complete={handleComplete()}>
          Siguente
        </Button>
      </div>
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

const Description = styled.h1`
  ${headerDescription}
`;

const FormContainer = styled.div`
  ${formContainer}
  height: 25%;
  min-height: 0;
  padding: 0;
  justify-content: center;
  border-bottom: 2px solid ${principalColor};
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

const Form = styled.form`
  ${form}
  justify-content: space-evenly;
  height: 35%;
`;

const Input = styled.input`
  ${input}
`;

const EfectosContainer = styled.div`
  flex: 1;
  width: 100%;
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
  width: 10%;
  color: white;
  transition: all 0.5s ease;
  align-self: flex-end;

  &:hover {
    color: ${secondaryColor};
    cursor: pointer;
  }
`;
