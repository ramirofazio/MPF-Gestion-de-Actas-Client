import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
//* Redux
import { useSelector, useDispatch } from "react-redux";
import { createPeritos, removePerito, setCurrentUser } from "../../../redux/actions";
//* Style
import styled, { css } from "styled-components";
import GlobalStyles from "../../../Styles/GlobalStyles";
import Variables from "../../../Styles/Variables";
import { PersonAdd } from "@styled-icons/evaicons-solid/PersonAdd";
import { PersonRemove } from "@styled-icons/evaicons-solid/PersonRemove";
import { toast } from "react-toastify";
//* Initializations
const { redColor, greenColor, secondaryColor, principalColor } = Variables;
const {
  enProcesoContainer,
  header,
  headerTitle,
  button,
  formContainer,
  inputContainer,
  select,
  selectOpt,
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
  const currentPeritos = useSelector((s) => JSON.parse(localStorage.getItem("currentPeritos")) || s.currentPeritos);
  const users = useSelector((s) => JSON.parse(localStorage.getItem("users")) || s.users);

  const [peritos, setPeritos] = React.useState(currentPeritos);
  const [perito, setPerito] = React.useState({
    nombreYApellido: "",
    legajo: "",
    cargo: "",
  });

  const handleAddPerito = () => {
    setPeritos([...peritos, { ...perito, acta_id: currentActa.id }]);
    setPerito({
      nombreYApellido: "",
      legajo: "",
      cargo: "",
    });
  };

  const handleComplete = () => {
    //* Logica para habilitar el boton cuando esta todo completado
    const { nombreYApellido, legajo, cargo } = perito;

    if (nombreYApellido && legajo && cargo) {
      return "true";
    } else {
      return "false";
    }
  };

  const handleRemove = (legajo) => {
    dispatch(removePerito(legajo, currentActa.id)); //* Si estoy editando, tengo que eliminar de la base de datos

    const newPeritos = peritos.filter((i) => i.legajo !== legajo);
    localStorage.setItem("currentPeritos", JSON.stringify(newPeritos));
    setPeritos(newPeritos);
  };

  const handleSubmitPeritos = () => {
    dispatch(createPeritos(peritos, navigate));
  };

  const peritoSelected = (p) => {
    setPerito({
      nombreYApellido: p.nombreYApellido,
      cargo: p.cargo,
      legajo: p.legajo,
    });
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
              <Label>Elegir Perito</Label>
              <Select onChange={(e) => peritoSelected(JSON.parse(e.target.value))}>
                <SelectOpt value="">Elegir Perito</SelectOpt>
                {users && users.map((u) => u.username !== "admin" && <SelectOpt value={JSON.stringify(u)}>{u.nombreYApellido}</SelectOpt>)}
              </Select>
            </InputContainer>
            <InputContainer>
              <Label>Nombre y Apellido</Label>
              <Input
                disabled={true}
                type="text"
                name="nombreYApellido"
                value={perito.nombreYApellido}
                placeholder="Nombre y Apellido"
                onChange={(e) => setPerito({ ...perito, nombreYApellido: e.target.value })}
              />
            </InputContainer>
            <InputContainer>
              <Label>Legajo</Label>
              <Input
                disabled={true}
                type="number"
                name="legajo"
                value={perito.legajo}
                placeholder="Legajo"
                onChange={(e) => setPerito({ ...perito, legajo: e.target.value })}
              />
            </InputContainer>
            <InputContainer>
              <Label>Cargo</Label>
              <Input
                disabled={true}
                type="text"
                name="cargo"
                value={perito.cargo}
                placeholder="Cargo"
                onChange={(e) => setPerito({ ...perito, cargo: e.target.value })}
              />
            </InputContainer>
          </Form>
          <AddButton onClick={() => handleAddPerito()} complete={handleComplete()}>
            <AddIcon />
            Agregar
          </AddButton>
        </FormContainer>

        <PeritosContainer>
          {peritos &&
            peritos.map((i, index) => {
              return (
                <PeritoContainer key={index}>
                  <Info>
                    <CardTitle>Nombre y Apellido</CardTitle>
                    <br />
                    {i.nombreYApellido}
                  </Info>
                  <Info>
                    <CardTitle>Legajo</CardTitle>
                    <br />
                    {i.legajo}
                  </Info>
                  <Info>
                    <CardTitle>Cargo</CardTitle>
                    <br />
                    {i.cargo}
                  </Info>
                  <RemoveIcon
                    onClick={() =>
                      currentActa.estado !== "en creacion"
                        ? toast.error("No se puede eliminar un Perito ya creado")
                        : handleRemove(i.legajo)
                    }
                  />
                </PeritoContainer>
              );
            })}
        </PeritosContainer>
      </SubContainer>

      {currentActa.estado === "en creacion" && currentPeritos.length <= 0 ? (
        <Button complete={peritos.length >= "1" ? "true" : "false"} onClick={() => handleSubmitPeritos()} to="#">
          Crear
        </Button>
      ) : (
        <Button to={"/actas/crear/3"} complete={peritos.length >= "1" ? "true" : "false"}>
          Continuar Asi
        </Button>
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

const Select = styled.select`
  ${select}
`;

const SelectOpt = styled.option`
  ${selectOpt}
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

const PeritosContainer = styled.div`
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

const PeritoContainer = styled.div`
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
