import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getActasEnProceso, getActasEnProcesoFiltered } from "../../../../redux/actions";
//* Styles
import styled from "styled-components";
import GlobalStyles from "../../../../Styles/GlobalStyles";
import Variables from "../../../../Styles/Variables";
import { BoxArrowInUpRight } from "@styled-icons/bootstrap/BoxArrowInUpRight";
import { Search } from "@styled-icons/ionicons-sharp/Search";
import { toast } from "react-toastify";
//* Initializations
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
    if (state.nroMpf === "" && state.nroCij === "" && state.nroDil === "") {
      toast.error("Ningun filtro aplicado!");
    } else {
    }
    dispatch(getActasEnProcesoFiltered(state)); //* Mando al backend el pedido con filtros
    setState({
      //* Limpio los campos
      nroMpf: "",
      nroDil: "",
      nroCij: "",
      //date: "",
    });
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
        {actasEnProceso
          ? actasEnProceso.map((acta) => {
              let cantEfectosCompletos = 0;
              let cantEfectos = 0;
              acta.Bolsas.map((bolsa) => (cantEfectos += bolsa.Efectos.length));
              acta.Bolsas.map((bolsa) =>
                bolsa.Efectos.map(
                  (efecto) => (cantEfectosCompletos += efecto.estado === "completo")
                )
              );

              return (
                <ActaContainer to={`/efectos/en_proceso/${acta.id}`} key={acta.id}>
                  <Info>
                    <strong
                      style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}
                    >
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
                    <strong
                      style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}
                    >
                      CIJ
                    </strong>
                    <br />
                    {acta.nro_cij}
                  </Info>
                  <Info>
                    <strong
                      style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}
                    >
                      DIL
                    </strong>
                    <br />
                    {acta.nro_dil}
                  </Info>
                  <Info>
                    <strong
                      style={{ color: "black", fontWeight: 500, textDecoration: "underline" }}
                    >
                      Efectos
                    </strong>
                    <br />
                    {`${cantEfectosCompletos}/${cantEfectos}`}
                  </Info>
                  <Icon />
                </ActaContainer>
              );
            })
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
  margin-bottom: 20px;
`;

const ActaContainer = styled(NavLink)`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 95%;
  min-height: 12%;
  margin-top: 5px;
  border: 2px solid ${principalColor};
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
  font-size: 15px;
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
`;
