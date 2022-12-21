import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
//* Redux
import { useSelector, useDispatch } from "react-redux";
import { createIntegrantes, removeIntegrante } from "../../../redux/actions";
//* Style
import styled, { css } from "styled-components";
import GlobalStyles from "../../../Styles/GlobalStyles";
import Variables from "../../../Styles/Variables";
import { PersonAdd } from "@styled-icons/evaicons-solid/PersonAdd";
import { PersonRemove } from "@styled-icons/evaicons-solid/PersonRemove";
//* Initializations
const { redColor, greenColor, secondaryColor, principalColor } = Variables;
const {
  enProcesoContainer,
  header,
  headerTitle,
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentActa = useSelector((s) => s?.currentActa);

  const [integrantes, setIntegrantes] = React.useState(JSON.parse(localStorage.getItem("integrantes")) || []);
  const [integrante, setIntegrante] = React.useState({
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
    dispatch(removeIntegrante(dni)); //* Si estoy editando, tengo que eliminar de la base de datos

    const newIntegrantes = integrantes.filter((i) => i.dni !== dni);
    setIntegrantes(newIntegrantes);
  };

  const handleNext = () => {
    dispatch(createIntegrantes(integrantes, navigate));
  };

  return (
    <Container>
      <Header>
        <Title>Creación de Integrantes</Title>
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
                onChange={(e) => setIntegrante({ ...integrante, dni: e.target.value })}
              />
            </InputContainer>
            <InputContainer>
              <Label>Legajo o Matricula</Label>
              <Input
                type="number"
                name="legajoOMatricula"
                value={integrante.legajoOMatricula}
                placeholder="Legajo o Matricula"
                onChange={(e) => setIntegrante({ ...integrante, legajoOMatricula: e.target.value })}
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
                    {i.nombreYApellido}
                  </Info>
                  <Info>
                    <CardTitle>DNI</CardTitle>
                    <br />
                    {i.dni}
                  </Info>
                  <Info>
                    <CardTitle>Legajo o Matricula</CardTitle>
                    <br />
                    {i.legajoOMatricula}
                  </Info>
                  <Info>
                    <CardTitle>Cargo</CardTitle>
                    <br />
                    {i.cargo}
                  </Info>
                  <RemoveIcon onClick={() => handleRemove(i.dni)} />
                </IntegranteContainer>
              );
            })}
        </IntegrantesContainer>
      </SubContainer>

      {!localStorage.getItem("integrantes") ? (
        <Button complete={"true"} onClick={() => handleNext()}>
          Siguente
        </Button>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-around", width: "50%" }}>
          <Button complete={integrantes.length >= "1" ? "true" : "false"} onClick={() => handleNext()}>
            Volver a Crear
          </Button>
          <Button to={"/actas/crear/3"} complete={integrantes.length >= "1" ? "true" : "false"}>
            Continuar Asi
          </Button>
        </div>
      )}
    </Container>
  );
}

export default AddIntegrantes;

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
  flex: 1.2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  overflow-y: scroll;
  padding-inline: 2%;
  padding-top: 6%;
`;

const IntegranteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 12%;
  min-height: 12%;
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
