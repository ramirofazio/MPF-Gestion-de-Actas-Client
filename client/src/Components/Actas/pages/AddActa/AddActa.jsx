import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
//* Redux
import { createActa } from "../../../../redux/actions";
//* Style
import styled, { css } from "styled-components";
import GlobalStyles from "../../../../Styles/GlobalStyles";
import Variables from "../../../../Styles/Variables";
import { useDispatch } from "react-redux";
//* Initializations
const { redColor, greenColor } = Variables;
const { enProcesoContainer, header, headerTitle, headerDescription, formContainer, button } = GlobalStyles;

function AddActa() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    solicitante: "",
    mpfOrDen: "",
    cij: "",
    dil: "",
    coop: "",
    nroCausa: "",
    caratula: "",
  });

  const [flag, setFlag] = useState();

  useEffect(() => {
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

  return (
    <Container>
      <Header>
        <Title>Creacion de Acta</Title>
        <Description>Encabezado</Description>
      </Header>
      <FormContainer>
        <select onChange={(e) => setFlag(e.target.value)} value={flag}>
          <option>Tipo de Acta</option>
          <option>MPF/DEN</option>
          <option>COOP</option>
        </select>
        <select onChange={(e) => setState({ ...state, solicitante: e.target.value })} value={state.solicitante}>
          <option value="">Solicitante</option>
          <option>Área de Flagrancia Contravencional</option>
          <option>Equipo de Análisis de Casos de Comercialización de Estupefacientes</option>
          <option>Equipo Especializado en Casos de Violencia Institucional</option>
          <option>Fiscalía de Cámara PCyF Norte</option>
          <option>Fiscalía de Cámara PCyF Oeste</option>
          <option>Fiscalía de Cámara PCyF Sudeste</option>
          <option>Fiscalía PCyF Nº 1</option>
          <option>Fiscalía PCyF Nº 10</option>
          <option>Fiscalía PCyF Nº 11</option>
          <option>Fiscalía PCyF Nº 11 (Violencia Institucional)</option>
          <option>Fiscalía PCyF Nº 12</option>
          <option>Fiscalía PCyF Nº 12 (Informático)</option>
          <option>Fiscalía PCyF Nº 13</option>
          <option>Fiscalía PCyF Nº 14</option>
          <option>Fiscalía PCyF Nº 15</option>
          <option>Fiscalía PCyF Nº 16</option>
          <option>Fiscalía PCyF Nº 17</option>
          <option>Fiscalía PCyF Nº 18</option>
          <option>Fiscalía PCyF Nº 19</option>
          <option>Fiscalía PCyF Nº 2</option>
          <option>Fiscalía PCyF Nº 20</option>
          <option>Fiscalía PCyF Nº 21</option>
          <option>Fiscalía PCyF Nº 22 (Discriminación)</option>
          <option>Fiscalía PCyF Nº 22 (Discriminación)</option>
          <option>Fiscalía PCyF Nº 23</option>
          <option>Fiscalía PCyF Nº 24</option>
          <option>Fiscalía PCyF Nº 25</option>
          <option>Fiscalía PCyF Nº 26</option>
          <option>Fiscalía PCyF Nº 27</option>
          <option>Fiscalía PCyF Nº 28</option>
          <option>Fiscalía PCyF Nº 29</option>
          <option>Fiscalía PCyF Nº 3</option>
          <option>Fiscalía PCyF Nº 30</option>
          <option>Fiscalía PCyF Nº 30 (Informático)</option>
          <option>Fiscalía PCyF Nº 31</option>
          <option>Fiscalía PCyF Nº 32</option>
          <option>Fiscalía PCyF Nº 33</option>
          <option>Fiscalía PCyF Nº 34</option>
          <option>Fiscalía PCyF Nº 35</option>
          <option>Fiscalía PCyF Nº 35 (Eventos Masivos)</option>
          <option>Fiscalía PCyF Nº 36</option>
          <option>Fiscalía PCyF Nº 37</option>
          <option>Fiscalía PCyF Nº 38</option>
          <option>Fiscalía PCyF Nº 39</option>
          <option>Fiscalía PCyF Nº 4</option>
          <option>Fiscalía PCyF Nº 40</option>
          <option>Fiscalía PCyF Nº 40 (UFEMA)</option>
          <option>Fiscalía PCyF Nº 5</option>
          <option>Fiscalía PCyF Nº 6</option>
          <option>Fiscalía PCyF Nº 7</option>
          <option>Fiscalía PCyF Nº 7 (Informático)</option>
          <option>Fiscalía PCyF Nº 8</option>
          <option>Fiscalía PCyF Nº 9</option>
          <option>Fiscalía Transición 1</option>
          <option>Secretaria Judicial</option>
          <option>UFCEU - Unidad Coordinadora</option>
          <option>UFDCyFE - UIT Investigación (Área de Tenencia)</option>
          <option>UFDCyFE - UIT Investigación (Lesiones de Transito)</option>
          <option>UFDCyFE - Unidad de Intervención Temprana</option>
          <option>UFE - Área de Casos Especiales</option>
          <option>UFE - Equipo Especializado en Violencia de Género</option>
          <option>UFE - Unidad Coordinadora</option>
          <option>UFE - Unidad de Flagrancia</option>
          <option>UFE - Unidad de Intervención Temprana</option>
          <option>UFEIDE - Casos Fiscalía</option>
          <option>UFEIDE - Equipo de Análisis Preliminar</option>
          <option>UFEIDE - Equipo de Análisis Preliminar (Investigación)</option>
          <option>UFEIDE - Investigación</option>
          <option>UFN - Área de Casos Especiales</option>
          <option>UFN - Equipo Especializado en Violencia de Género</option>
          <option>UFN - Unidad Coordinadora</option>
          <option>UFN - Unidad de Flagrancia</option>
          <option>UFN - Unidad de Intervención Temprana</option>
          <option>UFO - Área de Casos Especiales</option>
          <option>UFO - Equipo Especializado en Violencia de Género</option>
          <option>UFO - Unidad Coordinadora</option>
          <option>UFO - Unidad de Flagrancia</option>
          <option>UFO - Unidad de Intervención Temprana</option>
          <option>UFS - Área de Casos Especiales</option>
          <option>UFS - Equipo Especializado en Violencia de Género</option>
          <option>UFS - Unidad Coordinadora</option>
          <option>UFS - Unidad de Flagrancia</option>
          <option>UFS - Unidad de Intervención Temprana</option>
          <option>UFSE - Área de Casos Especiales</option>
          <option>UFSE - Equipo Fiscal F</option>
          <option>UFSE - Equipo Fiscal G</option>
          <option>UFSE - Of. Ap. Int. Inicial</option>
          <option>UFSE - Unidad Coordinadora</option>
          <option>UFSE - Unidad de Intervención Temprana</option>
          <option>Unidad Coordinadora de Investigaciones Complejas</option>
          <option>Unidad de Apoyo de VD Este</option>
          <option>Unidad de Apoyo de VD Norte</option>
          <option>Unidad de Apoyo de VD Oeste</option>
          <option>Unidad de Apoyo de VD Sudeste</option>
          <option>Unidad de Apoyo de VD Sur</option>
        </select>
        {flag === "MPF/DEN" ? (
          <form>
            <input
              type="text"
              name="MPF/DEN"
              value={state.mpfOrDen}
              placeholder="MPF/DEN"
              onChange={(e) => setState({ ...state, mpfOrDen: e.target.value })}
            />
            <input
              type="text"
              name="CIJ"
              value={state.cij}
              placeholder="CIJ"
              onChange={(e) => setState({ ...state, cij: e.target.value })}
            />
            <input
              type="text"
              name="DIL"
              value={state.dil}
              placeholder="DIL"
              onChange={(e) => setState({ ...state, dil: e.target.value })}
            />
          </form>
        ) : flag === "COOP" ? (
          <form>
            <input
              type="text"
              name="COOP"
              value={state.coop}
              placeholder="COOP"
              onChange={(e) => setState({ ...state, coop: e.target.value })}
            />
            <input
              type="text"
              name="Nro Causa"
              value={state.nroCausa}
              placeholder="Nro Causa"
              onChange={(e) => setState({ ...state, nroCausa: e.target.value })}
            />
            <input
              type="text"
              name="Caratula"
              value={state.caratula}
              placeholder="Caratula"
              onChange={(e) => setState({ ...state, caratula: e.target.value })}
            />
            <input
              type="text"
              name="CIJ"
              value={state.cij}
              placeholder="CIJ"
              onChange={(e) => setState({ ...state, cij: e.target.value })}
            />
            <input
              type="text"
              name="DIL"
              value={state.dil}
              placeholder="DIL"
              onChange={(e) => setState({ ...state, dil: e.target.value })}
            />
          </form>
        ) : null}
      </FormContainer>
      <Button to={"/actas/crear/2"} onClick={() => dispatch(createActa(state))} complete={handleComplete()}>
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
