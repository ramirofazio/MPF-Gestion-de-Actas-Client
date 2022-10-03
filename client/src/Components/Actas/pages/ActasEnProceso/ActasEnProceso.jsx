import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getActasEnProceso } from "../../../../redux/actions";
//Utils
import GlobalStyles from "../../../../Styles/GlobalStyles";
import Variables from "../../../../Styles/Variables";
import { BoxArrowInUpRight } from "@styled-icons/bootstrap/BoxArrowInUpRight";
//Initializations
const { principalColor, secondaryColor, baseTransparentColor, yellowColor, greenColor } = Variables;

function ActasEnProceso() {
  const [state, setState] = useState({
    nroMpf: "",
    nroDil: "",
    nroCij: "",
    //date: "",
  });
  const actasEnProceso = useSelector((state) => state.actasEnProceso);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActasEnProceso());
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("es", options);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
  };

  return (
    <Container>
      <Header>
        <Title>Actas en Proceso</Title>
        <Description>
          En esta sección poder ver todos las Actas en proceso. <br /> Selecciona la que quieras
          para ver sus Efectos.
        </Description>
      </Header>
      <FilterContainer>
        <Form onChange={handleSubmit}>
          <InputContainer>
            <Label>Nro MPF</Label>
            <Input
              type="text"
              value={state.nroMpf}
              onChange={(e) => setState({ ...state, nroMpf: e.target.value })}
            />
          </InputContainer>
          <InputContainer>
            <Label>Nro CIJ</Label>
            <Input
              type="text"
              value={state.nroCij}
              onChange={(e) => setState({ ...state, nroCij: e.target.value })}
            />
          </InputContainer>
          <InputContainer>
            <Label>Nro DIL</Label>
            <Input
              type="text"
              value={state.nroDil}
              onChange={(e) => setState({ ...state, nroDil: e.target.value })}
            />
          </InputContainer>
          {/* <InputContainer>
            <InputDate
              type="date"
              value={state.date}
              onChange={(e) => setState({ ...state, date: e.target.value })}
            />
          </InputContainer> */}
        </Form>
      </FilterContainer>
      <CardsContainer>
        {actasEnProceso
          ? actasEnProceso.map((acta) => (
              <ActaContainer to="#" key={acta.id}>
                <Info>
                  <strong style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}>
                    Fecha
                  </strong>
                  <br />
                  {formatDate(acta.created_at)}
                </Info>
                {!acta.nro_coop && (
                  <Info>
                    <strong
                      style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}
                    >
                      MPF
                    </strong>
                    <br />
                    {acta.nro_mpf}
                  </Info>
                )}
                {!acta.nro_mpf && (
                  <Info>
                    <strong
                      style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}
                    >
                      COOP
                    </strong>
                    <br />
                    {acta.nro_coop}
                  </Info>
                )}
                <Info>
                  <strong style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}>
                    CIJ
                  </strong>
                  <br />
                  {acta.nro_cij}
                </Info>
                <Info>
                  <strong style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}>
                    DIL
                  </strong>
                  <br />
                  {acta.nro_dil}
                </Info>
                <Icon />
              </ActaContainer>
            ))
          : null}
      </CardsContainer>
    </Container>
  );
}

export default ActasEnProceso;

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
  font-size: 18px;
`;

const FilterContainer = styled.div`
  width: 95%;
  margin-bottom: -60px;
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

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 95%;
  flex: 1;
  margin-bottom: 10px;
  max-height: 60%;
  border-top: 2px solid ${secondaryColor};
`;

const ActaContainer = styled(NavLink)`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 95%;
  flex: 1;
  min-height: 8%;
  max-height: 10%;
  margin-top: 5px;
  border: 2px solid ${principalColor};
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    max-height: 12%;
    background-color: ${baseTransparentColor};
  }
`;

const Info = styled.span`
  flex: 1;
  color: ${secondaryColor};
  text-align: center;
  text-transform: capitalize;
`;

const Icon = styled(BoxArrowInUpRight)`
  width: 20px;
  margin-right: 40px;
  color: ${secondaryColor};
  transition: all 0.3s ease;

  &:hover {
    color: black;
    cursor: pointer;
  }

  ${ActaContainer}:hover & {
    width: 25px;
  }
`;
