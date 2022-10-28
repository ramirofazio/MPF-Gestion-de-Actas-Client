import React, { useState } from "react";
//* Redux
import { useSelector } from "react-redux";
//* Style
import styled, { css } from "styled-components";
import GlobalStyles from "../../../../Styles/GlobalStyles";
import Variables from "../../../../Styles/Variables";
//* Initializations
const { redColor, greenColor } = Variables;
const { enProcesoContainer, header, headerTitle, headerDescription, button, formContainer } = GlobalStyles;

function AddIntegrantes() {
  const currentActa = useSelector((state) => state.currentActa);
  const [integrantes, setIntegrantes] = useState([]);
  const [integrante, setIntegrante] = useState({
    nombreYApellido: "",
    dni: "",
    legajoOMatricula: "",
    cargo: "",
  });

  const handleClick = () => {
    setIntegrantes([...integrantes, integrante]);
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

  return (
    <Container>
      <Header>
        <p>Acta Nro {currentActa.id}</p>
        <Title>Creacion de Suscriptores</Title>
        <Description>Encabezado</Description>
      </Header>

      <FormContainer>
        <form style={{ display: "flex", flexDirection: "column" }}>
          <input
            type="text"
            name="nombreYApellido"
            value={integrante.nombreYApellido}
            placeholder="Nombre y Apellido"
            onChange={(e) => setIntegrante({ ...integrante, nombreYApellido: e.target.value })}
          />
          <input
            type="text"
            name="dni"
            value={integrante.dni}
            placeholder="DNI"
            onChange={(e) => setIntegrante({ ...integrante, dni: e.target.value })}
          />
          <input
            type="text"
            name="legajoOMatricula"
            value={integrante.legajoOMatricula}
            placeholder="Legajo o Matricula"
            onChange={(e) => setIntegrante({ ...integrante, legajoOMatricula: e.target.value })}
          />
          <input
            type="text"
            name="cargo"
            value={integrante.cargo}
            placeholder="Cargo"
            onChange={(e) => setIntegrante({ ...integrante, cargo: e.target.value })}
          />
        </form>
        <AddButton onClick={() => handleClick()} complete={handleComplete()}>
          Agregar Suscriptor
        </AddButton>
      </FormContainer>

      <Button>Siguente</Button>
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

const Description = styled.h1`
  ${headerDescription}
`;

const AddButton = styled.button`
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

const Button = styled.button`
  ${button}
  text-decoration: none;
  background: white;
  border: 2px solid ${redColor};
  pointer-events: none;
`;

const FormContainer = styled.div`
  ${formContainer};
`;
