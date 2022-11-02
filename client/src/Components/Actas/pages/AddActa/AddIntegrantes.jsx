import React, { useState } from "react";
import { NavLink } from "react-router-dom";
//* Redux
import { useSelector, useDispatch } from "react-redux";
import { createIntegrantes } from "../../../../redux/actions";
//* Style
import styled, { css } from "styled-components";
import GlobalStyles from "../../../../Styles/GlobalStyles";
import Variables from "../../../../Styles/Variables";
import { PersonAdd } from "@styled-icons/evaicons-solid/PersonAdd";
import { PersonRemove } from "@styled-icons/evaicons-solid/PersonRemove";

//* Initializations
const { redColor, greenColor, secondaryColor, principalColor } = Variables;
const {
  enProcesoContainer,
  header,
  headerTitle,
  headerDescription,
  button,
  formContainer,
  inputContainer,
  inputLabel,
  form,
  input,
  cardTitle,
  cardInfo,
} = GlobalStyles;

function AddIntegrantes() {
  const dispatch = useDispatch();
  const currentActa = useSelector((state) => state?.currentActa);
  //const currentIntegrantes = useSelector((state) => state?.currentIntegrantes);

  const [integrantes, setIntegrantes] = useState([]);
  const [integrante, setIntegrante] = useState({
    nombreYApellido: "",
    dni: "",
    legajoOMatricula: "",
    cargo: "",
  });

  const handleClick = () => {
    setIntegrantes([...integrantes, { ...integrante, acta_id: currentActa.id }]);
    setIntegrante({
      nombreYApellido: "",
      dni: "",
      legajoOMatricula: "",
      cargo: "",
    });
  };

  const handleComplete = () => {
    //* Logica para habilitar el boton cuando esta todo completado
    const { nombreYApellido, dni, legajoOMatricula, cargo } = integrante;

    if (nombreYApellido && dni && legajoOMatricula && cargo) {
      return "true";
    } else {
      return "false";
    }
  };

  const handleRemove = (dni) => {
    const newIntegrantes = integrantes.filter((i) => i.dni !== dni);
    setIntegrantes(newIntegrantes);
  };

  const handleNextComplete = () => {
    if (integrantes.length > "1") {
      return "true";
    } else {
      return "false";
    }
  };

  const handleNext = () => {
    dispatch(createIntegrantes(integrantes));
  };

  return (
    <Container>
      <Header>
        <NroActa>Acta Nro {currentActa.id}</NroActa>
        <Title>Creacion de Suscriptores</Title>
        <Description>Encabezado</Description>
      </Header>

      <SubContainer>
        <FormContainer>
          <Form>
            <InputContainer>
              <Label>Nombre y Apellido</Label>
              <Input
                type="text"
                name="nombreYApellido"
                value={integrante.nombreYApellido}
                placeholder="Nombre y Apellido"
                onChange={(e) => setIntegrante({ ...integrante, nombreYApellido: e.target.value })}
              />
            </InputContainer>
            <InputContainer>
              <Label>DNI</Label>
              <Input
                type="number"
                name="dni"
                value={integrante.dni}
                placeholder="DNI"
                onChange={(e) => setIntegrante({ ...integrante, dni: Number(e.target.value) })}
              />
            </InputContainer>
            <InputContainer>
              <Label>Legajo o Matricula</Label>
              <Input
                type="number"
                name="legajoOMatricula"
                value={integrante.legajoOMatricula}
                placeholder="Legajo o Matricula"
                onChange={(e) => setIntegrante({ ...integrante, legajoOMatricula: Number(e.target.value) })}
              />
            </InputContainer>
            <InputContainer>
              <Label>Cargo</Label>
              <Input
                type="text"
                name="cargo"
                value={integrante.cargo}
                placeholder="Cargo"
                onChange={(e) => setIntegrante({ ...integrante, cargo: e.target.value })}
              />
            </InputContainer>
          </Form>
          <AddButton onClick={() => handleClick()} complete={handleComplete()}>
            <AddIcon />
            Agregar
          </AddButton>
        </FormContainer>

        <IntegrantesContainer>
          {integrantes &&
            integrantes.map((i, index) => {
              return (
                <IntegranteContainer key={index}>
                  <Info>
                    <CardTitle>Nombre y Apellido</CardTitle>
                    <br />
                    <br />
                    {i.nombreYApellido}
                  </Info>
                  <Info>
                    <CardTitle>DNI</CardTitle>
                    <br />
                    <br />
                    {i.dni}
                  </Info>
                  <Info>
                    <CardTitle>Legajo o Matricula</CardTitle>
                    <br />
                    <br />
                    {i.legajoOMatricula}
                  </Info>
                  <Info>
                    <CardTitle>Cargo</CardTitle>
                    <br />
                    <br />
                    {i.cargo}
                  </Info>
                  <RemoveIcon onClick={() => handleRemove(i.dni)} />
                </IntegranteContainer>
              );
            })}
        </IntegrantesContainer>
      </SubContainer>

      <Button to={"/actas/crear/3"} complete={handleNextComplete()} onClick={() => handleNext()}>
        Siguente
      </Button>
    </Container>
  );
}

export default AddIntegrantes;

const NroActa = styled.span`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10%;
  width: 10%;
  margin-right: 10px;
`;

const Container = styled.div`
  ${enProcesoContainer}
  padding-bottom: 10px;
`;

const Header = styled.header`
  ${header}
`;

const Title = styled.h1`
  ${headerTitle}
`;

const Description = styled.h1`
  ${headerDescription}
`;

const AddButton = styled.button`
  ${button}
  display: flex;
  align-items: center;
  justify-content: center;
  padding-block: 5px;
  padding-inline: 15px;
  margin: 0;
  font-size: small;
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

const FormContainer = styled.div`
  ${formContainer};
  flex: 1;
  border: none;
  min-height: 100%;
`;

const InputContainer = styled.div`
  ${inputContainer}
  width: 100%;
`;

const Label = styled.label`
  ${inputLabel}
`;
const Form = styled.form`
  ${form}
`;

const Input = styled.input`
  ${input}
`;

const AddIcon = styled(PersonAdd)`
  width: 20px;
  color: ${secondaryColor};
  transition: all 0.5s ease;
  margin-right: 10px;

  &:hover {
    color: black;
    cursor: pointer;
  }
`;

const RemoveIcon = styled(PersonRemove)`
  width: 20px;
  color: ${redColor};
  transition: all 0.5s ease;
  margin-right: 20px;

  &:hover {
    color: black;
    cursor: pointer;
  }
`;

const SubContainer = styled.div`
  height: 70%;
  width: 100%;
  display: flex;
  border-top: 2px solid ${principalColor};
`;

const IntegrantesContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
`;

const IntegranteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 12%;
  border: 2px solid ${principalColor};
  border-radius: 10px;
  margin-block: 5px;
`;

const Info = styled.span`
  ${cardInfo}
  font-size: small;
`;

const CardTitle = styled.strong`
  ${cardTitle}
`;
