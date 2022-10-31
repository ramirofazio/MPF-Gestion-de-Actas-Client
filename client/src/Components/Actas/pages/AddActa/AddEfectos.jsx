import React, { useState } from "react";
//* Redux
//* Style
import styled from "styled-components";
import GlobalStyles from "../../../../Styles/GlobalStyles";
//* Doc
//import generateDoc from "../../generateDoc";

//* Initializations
const { input, form, inputLabel, inputContainer, formContainer, select } = GlobalStyles;

function AddEfectos() {
  const [efecto, setEfecto] = useState({
    tipoDeElemento: "",
    marca: "",
    modelo: "",
    imei: "",
    imei2: "",
    estado: "",
    sistemaOperativo: "",
    seguridad: "",
    tipoSeguridad: "",
    desbloqueo: "",
    herramientaSoft: "",
    tipoExtraccion: "",
    descripcionTarea: "",
  });

  return (
    <FormContainer style={{ height: "100%", width: "90%" }}>
      <Form style={{ width: "100%" }}>
        <InputContainer style={{ width: "80%", marginBottom: "10px" }}>
          <Label style={{ color: "white" }}>Tipo de Elemento</Label>
          <Select
            value={efecto.tipoDeElemento}
            onChange={(e) => setEfecto({ ...efecto, tipoDeElemento: e.target.value })}
          >
            <SelectOpt value="">Tipo de Elemento</SelectOpt>
            <SelectOpt value="celular">Celular</SelectOpt>
            <SelectOpt value="tablet">Tablet</SelectOpt>
            <SelectOpt value="notebook">Notebook</SelectOpt>
            <SelectOpt value="pc">PC</SelectOpt>
            <SelectOpt value="hdd">Disco HDD</SelectOpt>
            <SelectOpt value="ssd">Disco SSD</SelectOpt>
            <SelectOpt value="sim">Tarjeta SIM</SelectOpt>
            <SelectOpt value="sd">Tarjeta SD</SelectOpt>
          </Select>
        </InputContainer>
        <InputContainer style={{ width: "80%", marginBottom: "10px" }}>
          <Label style={{ color: "white" }}>Marca</Label>
          <Input
            type="text"
            name="marca"
            value={efecto.marca}
            placeholder="Marca"
            onChange={(e) => setEfecto({ ...efecto, marca: e.target.value })}
          />
        </InputContainer>
        <InputContainer style={{ width: "80%", marginBottom: "10px" }}>
          <Label style={{ color: "white" }}>Modelo</Label>
          <Input
            type="text"
            name="modelo"
            value={efecto.modelo}
            placeholder="Modelo"
            onChange={(e) => setEfecto({ ...efecto, modelo: e.target.value })}
          />
        </InputContainer>
        <InputContainer style={{ width: "80%", marginBottom: "10px" }}>
          <Label style={{ color: "white" }}>IMEI</Label>
          <Input
            type="text"
            name="imei"
            value={efecto.imei}
            placeholder="Imei"
            onChange={(e) => setEfecto({ ...efecto, imei: e.target.value })}
          />
        </InputContainer>
        <InputContainer style={{ width: "80%", marginBottom: "10px" }}>
          <Label style={{ color: "white" }}>IMEI 2</Label>
          <Input
            type="text"
            name="imei 2"
            value={efecto.imei2}
            placeholder="Imei 2"
            onChange={(e) => setEfecto({ ...efecto, imei2: e.target.value })}
          />
        </InputContainer>
        <InputContainer style={{ width: "80%", marginBottom: "10px" }}>
          <Label style={{ color: "white" }}>Estado</Label>
          <Select value={efecto.estado} onChange={(e) => setEfecto({ ...efecto, estado: e.target.value })}>
            <SelectOpt value="">Estado</SelectOpt>
            <SelectOpt value="completo">Completo</SelectOpt>
            <SelectOpt value="en proceso">En Proceso</SelectOpt>
          </Select>
        </InputContainer>
        <InputContainer style={{ width: "80%", marginBottom: "10px" }}>
          <Label style={{ color: "white" }}>Sistema Operativo</Label>
          <Input
            type="text"
            name="sistemaOperativo"
            value={efecto.sistemaOperativo}
            placeholder="SistemaOperativo"
            onChange={(e) => setEfecto({ ...efecto, sistemaOperativo: e.target.value })}
          />
        </InputContainer>
        <InputContainer style={{ width: "80%", marginBottom: "10px" }}>
          <Label style={{ color: "white" }}>Seguridad</Label>
          <Input
            type="text"
            name="seguridad"
            value={efecto.seguridad}
            placeholder="Seguridad"
            onChange={(e) => setEfecto({ ...efecto, seguridad: e.target.value })}
          />
        </InputContainer>
        <InputContainer style={{ width: "80%", marginBottom: "10px" }}>
          <Label style={{ color: "white" }}>Tipo de Seguridad</Label>
          <Select
            value={efecto.tipoSeguridad}
            onChange={(e) => setEfecto({ ...efecto, tipoSeguridad: e.target.value })}
          >
            <SelectOpt value="">Tipo de Seguridad</SelectOpt>
            <SelectOpt value="ninguna">Ninguna</SelectOpt>
            <SelectOpt value="patron">Patron</SelectOpt>
            <SelectOpt value="contraseña">Contraseña</SelectOpt>
            <SelectOpt value="pin">Pin</SelectOpt>
            <SelectOpt value="facial">Facial</SelectOpt>
            <SelectOpt value="huella">Huella</SelectOpt>
          </Select>
        </InputContainer>
        <InputContainer style={{ width: "80%", marginBottom: "10px" }}>
          <Label style={{ color: "white" }}>Desbloqueo</Label>
          <Select value={efecto.desbloqueo} onChange={(e) => setEfecto({ ...efecto, desbloqueo: e.target.value })}>
            <SelectOpt value="">Desbloqueo</SelectOpt>
            <SelectOpt value="ninguna">Ninguna</SelectOpt>
            <SelectOpt value="patron">Patron</SelectOpt>
            <SelectOpt value="contraseña">Contraseña</SelectOpt>
            <SelectOpt value="pin">Pin</SelectOpt>
            <SelectOpt value="facial">Facial</SelectOpt>
            <SelectOpt value="huella">Huella</SelectOpt>
          </Select>
        </InputContainer>
        <InputContainer style={{ width: "80%", marginBottom: "10px" }}>
          <Label style={{ color: "white" }}>Herramiento Software</Label>
          <Select
            value={efecto.herramientaSoft}
            onChange={(e) => setEfecto({ ...efecto, herramientaSoft: e.target.value })}
          >
            <SelectOpt value="">Herramiento Software</SelectOpt>
            <SelectOpt value="ninguna">Ninguna</SelectOpt>
            <SelectOpt value="UFED">UFED</SelectOpt>
          </Select>
        </InputContainer>
        <InputContainer style={{ width: "80%", marginBottom: "10px" }}>
          <Label style={{ color: "white" }}>Tipo de Extracción</Label>
          <Select
            value={efecto.tipoExtraccion}
            onChange={(e) => setEfecto({ ...efecto, tipoExtraccion: e.target.value })}
          >
            <SelectOpt value="">Tipo de Extracción</SelectOpt>
            <SelectOpt value="ninguna">Ninguna</SelectOpt>
            <SelectOpt value="fisica">Fisica</SelectOpt>
            <SelectOpt value="logica">Logica</SelectOpt>
          </Select>
        </InputContainer>
      </Form>
    </FormContainer>
  );
}

export default AddEfectos;

const FormContainer = styled.div`
  ${formContainer}
  &::-webkit-scrollbar-thumb {
    background-color: #ffffff;
    border-radius: 5px;
  }
`;

const InputContainer = styled.div`
  ${inputContainer}
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
  font-size: medium;
  font-weight: 400;
`;
