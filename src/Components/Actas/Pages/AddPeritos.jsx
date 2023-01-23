import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
//* Redux
import { useSelector, useDispatch } from "react-redux";
import { createPeritos, removePerito } from "../../../redux/actions";
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

function AddPeritos() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentActa = useSelector((s) => JSON.parse(localStorage.getItem("currentActa")) || s.currentActa);

  const [peritos, setPeritos] = React.useState(JSON.parse(localStorage.getItem("peritos")) || []);
  const [perito, setPerito] = React.useState({
    nombreYApellido: "",
    dni: "",
    cargo: "",
  });

  const handleClick = () => {
    setPeritos([...peritos, { ...perito, acta_id: currentActa.id }]);
    setPerito({
      nombreYApellido: "",
      dni: "",
      cargo: "",
    });
  };

  const handleComplete = () => {
    //* Logica para habilitar el boton cuando esta todo completado
    const { nombreYApellido, dni, cargo } = perito;

    if (nombreYApellido && dni && cargo) {
      return "true";
    } else {
      return "false";
    }
  };

  const handleRemove = (dni) => {
    dispatch(removePerito(dni)); //* Si estoy editando, tengo que eliminar de la base de datos

    const newPeritos = peritos.filter((i) => i.dni !== dni);
    setPeritos(newPeritos);
  };

  const handleNext = () => {
    dispatch(createPeritos(peritos, navigate));
  };

  return (
    <Container>
      <Header>
        <Title>Creación de Peritos</Title>
      </Header>
      <SubContainer>
        <FormContainer>
          <Form>
            <InputContainer>
              <Label>Nombre y Apellido</Label>
              <Input
                type="text"
                name="nombreYApellido"
                value={perito.nombreYApellido}
                placeholder="Nombre y Apellido"
                onChange={(e) => setPerito({ ...perito, nombreYApellido: e.target.value })}
              />
            </InputContainer>
            <InputContainer>
              <Label>DNI</Label>
              <Input
                type="text"
                name="dni"
                value={perito.dni}
                placeholder="DNI"
                onChange={(e) => setPerito({ ...perito, dni: e.target.value })}
              />
            </InputContainer>
            <InputContainer>
              <Label>Cargo</Label>
              <Input
                type="text"
                name="cargo"
                value={perito.cargo}
                placeholder="Cargo"
                onChange={(e) => setPerito({ ...perito, cargo: e.target.value })}
              />
            </InputContainer>
          </Form>
          <AddButton onClick={() => handleClick()} complete={handleComplete()}>
            <AddIcon />
            Agregar
          </AddButton>
        </FormContainer>

        <IntegrantesContainer>
          {peritos &&
            peritos.map((i, index) => {
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

      {!JSON.parse(localStorage.getItem("peritos")) ? (
        <Button complete={peritos.length >= "1" ? "true" : "false"} onClick={() => handleNext()}>
          Siguente
        </Button>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-around", width: "50%" }}>
          <Button complete={peritos.length >= "1" ? "true" : "false"} onClick={() => handleNext()}>
            Volver a Crear
          </Button>
          <Button to={"/actas/crear/3"} complete={peritos.length >= "1" ? "true" : "false"}>
            Continuar Asi
          </Button>
        </div>
      )}
    </Container>
  );
}

export default AddPeritos;

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
