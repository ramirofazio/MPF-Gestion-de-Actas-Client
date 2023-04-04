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
  select,
  selectOpt,
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

  const currentActa = useSelector((s) => JSON.parse(localStorage.getItem("currentActa")) || s.currentActa);
  const currentIntegrantes = useSelector((s) => JSON.parse(localStorage.getItem("currentIntegrantes")) || s.currentIntegrantes);

  const [integrantes, setIntegrantes] = React.useState(currentIntegrantes || []);
  const [integrante, setIntegrante] = React.useState({
    nombreYApellido: "",
    legajoOMatricula: "",
    cargo: "",
    locacion: "",
  });

  const handleClick = () => {
    setIntegrantes([...integrantes, { ...integrante, acta_id: currentActa.id }]);
    setIntegrante({
      nombreYApellido: "",
      legajoOMatricula: "",
      cargo: "",
      locacion: "",
    });
  };

  const handleComplete = () => {
    //* Logica para habilitar el boton cuando esta todo completado
    const { nombreYApellido, legajoOMatricula, cargo, locacion } = integrante;

    if (nombreYApellido && legajoOMatricula && cargo && locacion) {
      return "true";
    } else {
      return "false";
    }
  };

  const handleRemove = (legajoOMatricula) => {
    dispatch(removeIntegrante(legajoOMatricula, currentActa.id)); //* Si estoy editando, tengo que eliminar de la base de datos

    const newIntegrantes = integrantes.filter((i) => i.legajoOMatricula !== legajoOMatricula);
    localStorage.setItem("currentIntegrantes", JSON.stringify(newIntegrantes));
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
                disabled={currentActa.estado !== "en creacion"}
                type="text"
                name="nombreYApellido"
                value={integrante.nombreYApellido}
                placeholder="Nombre y Apellido"
                onChange={(e) => setIntegrante({ ...integrante, nombreYApellido: e.target.value })}
              />
            </InputContainer>
            <InputContainer>
              <Label>Legajo o Matricula</Label>
              <Input
                disabled={currentActa.estado !== "en creacion"}
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
                disabled={currentActa.estado !== "en creacion"}
                type="text"
                name="cargo"
                value={integrante.cargo}
                placeholder="Cargo"
                onChange={(e) => setIntegrante({ ...integrante, cargo: e.target.value })}
              />
            </InputContainer>
            <InputContainer>
              <Label>Locacion</Label>
              <Select value={integrante.locacion} onChange={(e) => setIntegrante({ ...integrante, locacion: e.target.value })}>
                <SelectOpt value="">Locacion</SelectOpt>
                <SelectOpt value="presencial">Presencial</SelectOpt>
                <SelectOpt value="videollamada">Videollamada</SelectOpt>
              </Select>
            </InputContainer>
          </Form>
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
                    <CardTitle>Legajo o Matricula</CardTitle>
                    <br />
                    {i.legajoOMatricula}
                  </Info>
                  <Info>
                    <CardTitle>Cargo</CardTitle>
                    <br />
                    {i.cargo}
                  </Info>
                  <Info>
                    <CardTitle>Locacion</CardTitle>
                    <br />
                    {i.locacion}
                  </Info>
                  <RemoveIcon onClick={() => handleRemove(i.legajoOMatricula)} />
                </IntegranteContainer>
              );
            })}
        </IntegrantesContainer>
      </SubContainer>
      <ButtonContainer>
        <Button onClick={() => navigate(-1)} complete={"true"} to="#">
          Volver
        </Button>
        {currentActa.estado === "en creacion" && currentIntegrantes.length <= 0 ? (
          <>
            {integrante.nombreYApellido && integrante.legajoOMatricula && integrante.cargo && integrante.locacion ? (
              <Button onClick={() => handleClick()} complete={handleComplete()}>
                <AddIcon />
                Agregar Integrante
              </Button>
            ) : (
              <Button complete={"true"} onClick={() => handleNext()} to="#">
                Siguente
              </Button>
            )}
          </>
        ) : (
          <Button to={"/actas/crear/4"} complete={"true"}>
            Continuar
          </Button>
        )}
      </ButtonContainer>
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
  font-size: small;
  padding: 10px;
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

const Select = styled.select`
  ${select}
`;

const SelectOpt = styled.option`
  ${selectOpt}
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

const ButtonContainer = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: space-around;
`;
