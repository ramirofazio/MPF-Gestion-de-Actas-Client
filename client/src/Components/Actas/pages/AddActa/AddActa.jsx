import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
//* Redux
import { createActa } from "../../../../redux/actions";
//* Style
import styled, { css } from "styled-components";
import GlobalStyles from "../../../../Styles/GlobalStyles";
import Variables from "../../../../Styles/Variables";
import { useSelector, useDispatch } from "react-redux";

import generateDoc from "../../generateDoc";
//* Initializations
const { redColor, greenColor } = Variables;
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

function AddActa() {
  const dispatch = useDispatch();
  const acta = useSelector((state) => state?.currentActa);
  const [flag, setFlag] = useState("Tipo de Acta");
  const [state, setState] = useState({
    solicitante: "",
    mpfOrDen: "",
    cij: "",
    dil: "",
    coop: "",
    nroCausa: "",
    caratula: "",
  });

  useEffect(() => {
    //* Blanquea el estado cuando se cambia la flag
    setState({
      solicitante: "",
      mpfOrDen: "",
      cij: "",
      dil: "",
      coop: "",
      nroCausa: "",
      caratula: "",
    });
  }, [flag]);

  const handleComplete = () => {
    //* Logica para habilitar el boton cuando esta todo completado
    const { solicitante, mpfOrDen, cij, dil, coop, nroCausa, caratula } = state;
    if (flag === "MPF/DEN") {
      if (solicitante && mpfOrDen && cij && dil) {
        return "true";
      } else {
        return "false";
      }
    } else if (flag === "COOP") {
      if (solicitante && coop && nroCausa && caratula && cij && dil) {
        return "true";
      } else {
        return "false";
      }
    } else {
      return "false";
    }
  };

  const handleClick = () => {
    dispatch(createActa(state));
  };

  useEffect(() => {
    if (acta.length !== 0) {
      console.log(acta);
      generateDoc(acta, flag);
    }
  }, [acta]);

  return (
    <Container>
      <Header>
        <Title>Creacion de Acta</Title>
        <Description>Encabezado</Description>
      </Header>
      <FormContainer>
        <InputContainer>
          <Label>Tipo de Acta</Label>
          <Select onChange={(e) => setFlag(e.target.value)} value={flag}>
            <SelectOpt>Tipo de Acta</SelectOpt>
            <SelectOpt>MPF/DEN</SelectOpt>
            <SelectOpt>COOP</SelectOpt>
          </Select>
        </InputContainer>
        {flag === "MPF/DEN" ? (
          <>
            <InputContainer>
              <Label>Solicitante</Label>
              <Select onChange={(e) => setState({ ...state, solicitante: e.target.value })} value={state.solicitante}>
                <SelectOpt value="">Solicitante</SelectOpt>
                <SelectOpt>Área de Flagrancia Contravencional</SelectOpt>
                <SelectOpt>Equipo de Análisis de Casos de Comercialización de Estupefacientes</SelectOpt>
                <SelectOpt>Equipo Especializado en Casos de Violencia Institucional</SelectOpt>
                <SelectOpt>Fiscalía de Cámara PCyF Norte</SelectOpt>
                <SelectOpt>Fiscalía de Cámara PCyF Oeste</SelectOpt>
                <SelectOpt>Fiscalía de Cámara PCyF Sudeste</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 1</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 10</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 11</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 11 (Violencia Institucional)</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 12</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 12 (Informático)</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 13</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 14</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 15</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 16</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 17</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 18</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 19</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 2</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 20</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 21</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 22 (Discriminación)</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 22 (Discriminación)</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 23</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 24</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 25</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 26</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 27</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 28</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 29</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 3</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 30</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 30 (Informático)</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 31</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 32</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 33</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 34</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 35</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 35 (Eventos Masivos)</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 36</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 37</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 38</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 39</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 4</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 40</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 40 (UFEMA)</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 5</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 6</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 7</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 7 (Informático)</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 8</SelectOpt>
                <SelectOpt>Fiscalía PCyF Nº 9</SelectOpt>
                <SelectOpt>Fiscalía Transición 1</SelectOpt>
                <SelectOpt>Secretaria Judicial</SelectOpt>
                <SelectOpt>UFCEU - Unidad Coordinadora</SelectOpt>
                <SelectOpt>UFDCyFE - UIT Investigación (Área de Tenencia)</SelectOpt>
                <SelectOpt>UFDCyFE - UIT Investigación (Lesiones de Transito)</SelectOpt>
                <SelectOpt>UFDCyFE - Unidad de Intervención Temprana</SelectOpt>
                <SelectOpt>UFE - Área de Casos Especiales</SelectOpt>
                <SelectOpt>UFE - Equipo Especializado en Violencia de Género</SelectOpt>
                <SelectOpt>UFE - Unidad Coordinadora</SelectOpt>
                <SelectOpt>UFE - Unidad de Flagrancia</SelectOpt>
                <SelectOpt>UFE - Unidad de Intervención Temprana</SelectOpt>
                <SelectOpt>UFEIDE - Casos Fiscalía</SelectOpt>
                <SelectOpt>UFEIDE - Equipo de Análisis Preliminar</SelectOpt>
                <SelectOpt>UFEIDE - Equipo de Análisis Preliminar (Investigación)</SelectOpt>
                <SelectOpt>UFEIDE - Investigación</SelectOpt>
                <SelectOpt>UFN - Área de Casos Especiales</SelectOpt>
                <SelectOpt>UFN - Equipo Especializado en Violencia de Género</SelectOpt>
                <SelectOpt>UFN - Unidad Coordinadora</SelectOpt>
                <SelectOpt>UFN - Unidad de Flagrancia</SelectOpt>
                <SelectOpt>UFN - Unidad de Intervención Temprana</SelectOpt>
                <SelectOpt>UFO - Área de Casos Especiales</SelectOpt>
                <SelectOpt>UFO - Equipo Especializado en Violencia de Género</SelectOpt>
                <SelectOpt>UFO - Unidad Coordinadora</SelectOpt>
                <SelectOpt>UFO - Unidad de Flagrancia</SelectOpt>
                <SelectOpt>UFO - Unidad de Intervención Temprana</SelectOpt>
                <SelectOpt>UFS - Área de Casos Especiales</SelectOpt>
                <SelectOpt>UFS - Equipo Especializado en Violencia de Género</SelectOpt>
                <SelectOpt>UFS - Unidad Coordinadora</SelectOpt>
                <SelectOpt>UFS - Unidad de Flagrancia</SelectOpt>
                <SelectOpt>UFS - Unidad de Intervención Temprana</SelectOpt>
                <SelectOpt>UFSE - Área de Casos Especiales</SelectOpt>
                <SelectOpt>UFSE - Equipo Fiscal F</SelectOpt>
                <SelectOpt>UFSE - Equipo Fiscal G</SelectOpt>
                <SelectOpt>UFSE - Of. Ap. Int. Inicial</SelectOpt>
                <SelectOpt>UFSE - Unidad Coordinadora</SelectOpt>
                <SelectOpt>UFSE - Unidad de Intervención Temprana</SelectOpt>
                <SelectOpt>Unidad Coordinadora de Investigaciones Complejas</SelectOpt>
                <SelectOpt>Unidad de Apoyo de VD Este</SelectOpt>
                <SelectOpt>Unidad de Apoyo de VD Norte</SelectOpt>
                <SelectOpt>Unidad de Apoyo de VD Oeste</SelectOpt>
                <SelectOpt>Unidad de Apoyo de VD Sudeste</SelectOpt>
                <SelectOpt>Unidad de Apoyo de VD Sur</SelectOpt>
              </Select>
            </InputContainer>
            <Form>
              <InputContainer>
                <Label>Nro MPF/DEN</Label>
                <Input
                  type="number"
                  name="MPF/DEN"
                  value={state.mpfOrDen}
                  placeholder="MPF/DEN"
                  onChange={(e) => setState({ ...state, mpfOrDen: e.target.value })}
                />
              </InputContainer>
              <InputContainer>
                <Label>Nro CIJ</Label>
                <Input
                  type="number"
                  name="CIJ"
                  value={state.cij}
                  placeholder="CIJ"
                  onChange={(e) => setState({ ...state, cij: e.target.value })}
                />
              </InputContainer>
              <InputContainer>
                <Label>Nro DIL</Label>
                <Input
                  type="number"
                  name="DIL"
                  value={state.dil}
                  placeholder="DIL"
                  onChange={(e) => setState({ ...state, dil: e.target.value })}
                />
              </InputContainer>
            </Form>
          </>
        ) : flag === "COOP" ? (
          <Form style={{ display: "flex", flexDirection: "column" }}>
            <InputContainer>
              <Label>Solicitante</Label>
              <Input
                type="text"
                name="Solicitante"
                value={state.solicitante}
                placeholder="Solicitante"
                onChange={(e) => setState({ ...state, solicitante: e.target.value })}
              />
            </InputContainer>
            <InputContainer>
              <Label> Nro Coop</Label>
              <Input
                type="number"
                name="COOP"
                value={state.coop}
                placeholder="COOP"
                onChange={(e) => setState({ ...state, coop: e.target.value })}
              />
            </InputContainer>
            <InputContainer>
              <Label>Nro Causa</Label>
              <Input
                type="number"
                name="Nro Causa"
                value={state.nroCausa}
                placeholder="Nro Causa"
                onChange={(e) => setState({ ...state, nroCausa: e.target.value })}
              />
            </InputContainer>
            <InputContainer>
              <Label>Caratula</Label>
              <Input
                type="text"
                name="Caratula"
                value={state.caratula}
                placeholder="Caratula"
                onChange={(e) => setState({ ...state, caratula: e.target.value })}
              />
            </InputContainer>
            <InputContainer>
              <Label>Nro CIJ</Label>
              <Input
                type="number"
                name="CIJ"
                value={state.cij}
                placeholder="CIJ"
                onChange={(e) => setState({ ...state, cij: e.target.value })}
              />
            </InputContainer>
            <InputContainer>
              <Label>Nro DIL</Label>
              <Input
                type="number"
                name="DIL"
                value={state.dil}
                placeholder="DIL"
                onChange={(e) => setState({ ...state, dil: e.target.value })}
              />
            </InputContainer>
          </Form>
        ) : null}
      </FormContainer>
      <Button to={"/actas/crear/2"} onClick={() => handleClick()} complete={handleComplete()}>
        Siguente
      </Button>
    </Container>
  );
}

export default AddActa;

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

const FormContainer = styled.div`
  ${formContainer}
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
`;

const Input = styled.input`
  ${input}
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
