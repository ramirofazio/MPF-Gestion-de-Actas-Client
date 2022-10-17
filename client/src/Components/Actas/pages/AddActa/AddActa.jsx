import React from "react";
//* Styles
import styled from "styled-components";
import GlobalStyles from "../../../../Styles/GlobalStyles";
//* Formik
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const { enProcesoContainer } = GlobalStyles;

function AddActa() {
  return (
    <StyledContainer>
      <StyledSubContainer></StyledSubContainer>

      <Formik
        initialValues={{
          nro_mpf: "",
          nro_coop: "",
          nro_cij: "",
          nro_dil: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log(values);
            setSubmitting(false);
          }, 400);
        }}
        validationSchema={Yup.object().shape({
          nro_mpf: Yup.number().required("Requerido"),
          nro_coop: Yup.number().required("Requerido"),
          nro_cij: Yup.number().required("Requerido"),
          nro_dil: Yup.number().required("Requerido"),
        })}
      >
        <StyledForm>
          <StyledRow>
            <StyledInputContainer>
              <ErrorMessage name="nro_mpf" render={(msg) => <StyledErrorMsj>{msg}</StyledErrorMsj>} />
              <StyledLabel htmlFor="nro_mpf">nro_mpf</StyledLabel>
              <StyledField name="nro_mpf" type="text" />
            </StyledInputContainer>

            <StyledInputContainer>
              <StyledLabel htmlFor="nro_coop">nro_coop</StyledLabel>
              <StyledField name="nro_coop" type="number" />
              <ErrorMessage name="nro_coop" render={(msg) => <StyledErrorMsj>{msg}</StyledErrorMsj>} />
            </StyledInputContainer>
          </StyledRow>

          <StyledRow>
            <StyledInputContainer>
              <StyledLabel htmlFor="nro_cij">nro_cij</StyledLabel>
              <StyledField name="nro_cij" type="number" />
              <ErrorMessage name="nro_cij" render={(msg) => <StyledErrorMsj>{msg}</StyledErrorMsj>} />
            </StyledInputContainer>

            <StyledInputContainer>
              <StyledLabel htmlFor="nro_dil">nro_dil</StyledLabel>
              <StyledField name="nro_dil" type="number" />
              <ErrorMessage name="nro_dil" render={(msg) => <StyledErrorMsj>{msg}</StyledErrorMsj>} />
            </StyledInputContainer>
          </StyledRow>

          <StyledBtnContainer>
            <StyledBtn type="submit">ENVIAR MENSAJE</StyledBtn>
          </StyledBtnContainer>
        </StyledForm>
      </Formik>
    </StyledContainer>
  );
}

export default AddActa;

const StyledContainer = styled.div`
  ${enProcesoContainer}
`;

const StyledSubContainer = styled.div`
  flex: 1;
  height: 100%;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30%;
  padding-inline: 50px;
  height: 100%;
`;

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 10%;
`;

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
  height: 100%;
  align-items: flex-start;
  justify-content: center;
`;

const StyledLabel = styled.label`
  margin-left: 10px;
  margin-bottom: 3px;
`;

const StyledField = styled(Field)`
  height: 40%;
  width: 100%;
  border: none;
  border-radius: 5px;
  background-color: #dadada;
  &:focus {
    outline: none;
  }
`;

const StyledErrorMsj = styled.p`
  color: red;
  margin: 0;
  padding: 0;
`;

const StyledBtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10%;
`;

const StyledBtn = styled.button`
  height: 40%;
  width: 40%;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
