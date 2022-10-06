import React, { useEffect, useState } from "react";
//* Utils
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getEfectosFromActa, sendEfectosIdsAndActaId } from "../../../../redux/actions";
//* Styles
import styled from "styled-components";
import GlobalStyles from "../../../../Styles/GlobalStyles";
import Variables from "../../../../Styles/Variables";
import { Check } from "@styled-icons/boxicons-regular/Check";
import { Search } from "@styled-icons/ionicons-sharp/Search";
import { toast } from "react-toastify";
//* Initializations
const { principalColor, secondaryColor, baseTransparentColor, yellowColor, greenColor, redColor } =
  Variables;

function EfectosEnProceso() {
  const [state, setState] = useState({
    nroMpf: "",
    nroDil: "",
    nroCij: "",
    //date: "",
  });
  const dispatch = useDispatch();
  const efectosParaCompletar = [];
  const efectosFromActa = useSelector((state) => state.efectosFromActa);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getEfectosFromActa(id));
  }, []);

  const handleSubmit = () => {
    if (efectosParaCompletar.length === 0) {
      toast.warning("selecciona un efecto!", { position: toast.POSITION.BOTTOM_LEFT });
    } else {
      sendEfectosIdsAndActaId({ actaId: id, efectosIds: efectosParaCompletar }); //* despacho datos
      toast.success("Acta completada con Exito", { position: toast.POSITION.BOTTOM_LEFT });
      setTimeout(() => {
        window.location.replace("/actas/en_proceso"); //* Vuelve a la pagina de actas una vez despachada
      }, 2500);
    }
  };

  return (
    <Container>
      <Header>
        <Title>Efectos</Title>
        <Description>
          En esta sección poder ver todos los Efectos del Acta. <br /> Selecciona los que quieras
          completar.
        </Description>
      </Header>
      <FilterContainer>
        <Form onSubmit={handleSubmit}>
          <InputContainer>
            <Label>Nro MPF</Label>
            <Input
              type="text"
              value={state.nroMpf}
              onChange={(e) => setState({ ...state, nroMpf: e.target.value })}
              maxLength={12}
            />
          </InputContainer>
          <InputContainer>
            <Label>Nro CIJ</Label>
            <Input
              type="text"
              value={state.nroCij}
              onChange={(e) => setState({ ...state, nroCij: e.target.value })}
              maxLength={12}
            />
          </InputContainer>
          <InputContainer>
            <Label>Nro DIL</Label>
            <Input
              type="text"
              value={state.nroDil}
              onChange={(e) => setState({ ...state, nroDil: e.target.value })}
              maxLength={12}
            />
          </InputContainer>
          {/* <InputContainer>
            <InputDate
              type="date"
              value={state.date}
              onChange={(e) => setState({ ...state, date: e.target.value })}
            />
          </InputContainer> */}
          <InputContainer
            style={{
              justifyContent: "flex-end",
              alignItems: "flex-start",
            }}
          >
            <Submit type="submit" />
            <SearchIcon />
          </InputContainer>
        </Form>
      </FilterContainer>
      <CardsContainer>
        {efectosFromActa
          ? efectosFromActa.map((efecto) => (
              <EfectoContainer key={efecto.id} estado={efecto.estado}>
                <Info>
                  <strong style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}>
                    Nro Precinto
                  </strong>
                  <br />
                  {efecto.Bolsa.nro_precinto}
                </Info>
                <Info>
                  <strong style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}>
                    Tipo
                  </strong>
                  <br />
                  {efecto.tipo}
                </Info>
                <Info>
                  <strong style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}>
                    Marca
                  </strong>
                  <br />
                  {efecto.marca}
                </Info>
                <Info>
                  <strong style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}>
                    Modelo
                  </strong>
                  <br />
                  {efecto.modelo}
                </Info>
                <Info>
                  <strong style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}>
                    Estado
                  </strong>
                  <br />
                  <Estado estado={efecto.estado}>{efecto.estado}</Estado>
                </Info>
                <CheckBoxContainer>
                  {efecto.estado === "completo" ? (
                    <CheckIcon />
                  ) : (
                    <CheckBox
                      type="checkbox"
                      onClick={() => efectosParaCompletar.push(efecto.id)}
                    />
                  )}
                </CheckBoxContainer>
              </EfectoContainer>
            ))
          : null}
      </CardsContainer>
      <ButtonContainer>
        <Button onClick={handleSubmit}>Completar</Button>
      </ButtonContainer>
    </Container>
  );
}

export default EfectosEnProceso;

const Container = styled.div`
  ${GlobalStyles.container}
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.header`
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  flex: 0.2;
`;

const Title = styled.h1`
  color: ${principalColor};
  font-size: 50px;
  text-decoration: underline;
  text-decoration-thickness: 2px;
`;

const Description = styled.p`
  color: ${secondaryColor};
  text-align: center;
  font-size: 16px;
`;

const FilterContainer = styled.div`
  width: 95%;
  margin-bottom: -30px;
`;

const Form = styled.form`
  display: flex;
`;

const InputContainer = styled.div`
  display: flex;
  width: 10%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const Label = styled.label`
  font-size: 13px;
  margin-bottom: 2px;
  color: ${secondaryColor};
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  text-align: center;
  border: 1px solid ${principalColor};
  border-radius: 5px;

  &:focus {
    outline: none;
  }
`;

const Submit = styled.input`
  position: absolute;
  width: 2%;
  opacity: 0;

  &:hover {
    cursor: pointer;
  }
`;

const SearchIcon = styled(Search)`
  width: 20%;
  color: ${secondaryColor};
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  max-height: 70%;
  min-height: 70%;
  border-top: 1px solid ${secondaryColor};
  overflow-y: scroll;
  padding-block: 10px;
  padding-bottom: 6%;
  margin-bottom: -100px;
`;

const EfectoContainer = styled.div`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 95%;
  min-height: 12%;
  margin-top: 5px;
  border: ${(props) =>
    props.estado === "en proceso"
      ? `2px solid ${principalColor}`
      : props.estado === "completo"
      ? `2px solid ${greenColor}`
      : `2px solid ${redColor}`};
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    min-height: 14%;
    background-color: ${baseTransparentColor};
  }
`;

const Info = styled.span`
  flex: 1;
  color: ${secondaryColor};
  text-align: center;
  text-transform: capitalize;
`;

const CheckBoxContainer = styled.div`
  flex: 0.4;
  text-align: center;
`;

const CheckBox = styled.input`
  &:hover {
    cursor: pointer;
  }
`;

const Estado = styled.span`
  color: ${(props) =>
    props.estado === "en proceso"
      ? yellowColor
      : props.estado === "completo"
      ? greenColor
      : redColor};
`;

const CheckIcon = styled(Check)`
  width: 30%;
  color: ${greenColor};
`;

const ButtonContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  width: 94%;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
`;

const Button = styled.button`
  width: auto;
  height: auto;
  padding: 10px;
  padding-inline: 20px;
  margin-bottom: 20px;
  margin-top: 20px;
  border-radius: 10px;
  border: 2px solid ${principalColor};
  color: ${secondaryColor};
  font-size: 15px;
  transition: all 0.3s ease-in;

  &:hover {
    cursor: pointer;
    background-color: ${principalColor};
    color: #fff;
  }
`;
