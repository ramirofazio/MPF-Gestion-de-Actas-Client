import React from "react";
import { Link } from "react-router-dom";
//* Style
import styled from "styled-components";
import Variables from "../../Styles/Variables";
import GlobalStyles from "../../Styles/GlobalStyles";
import { FileDownload } from "@styled-icons/remix-line/FileDownload";
import { DocumentEdit } from "@styled-icons/fluentui-system-regular/DocumentEdit";
//* Utils
import getSavedActa from "./getSavedActa";
import editSavedActa from "./editSavedActa";
//* Initialization
const { principalColor, secondaryColor, yellowColor, redColor, greenColor } = Variables;
const { cardsContainer, cardContainer, cardInfo, cardTitle, button } = GlobalStyles;

function CreateActasCards({ allActas }) {
  const actasToRender = allActas.filter((actas) => actas.estado !== "deprecado");

  return (
    <>
      <CardsContainer>
        {actasToRender
          ? actasToRender.map((acta) => {
              let totalEfectos = 0;
              acta.Bolsas.map((bolsa) => {
                totalEfectos += bolsa.Efectos.length;
              });

              return (
                <ActaContainer to={`/consultas/todas/${acta.id}`} key={acta.id} estado={acta.estado}>
                  <Info>
                    <CardTitle>Fecha</CardTitle>
                    <br />
                    {acta.fecha.slice(0, 10)}
                  </Info>
                  {!acta.nro_coop && (
                    <Info>
                      <CardTitle>MPF</CardTitle>
                      <br />
                      {acta.nro_mpf}
                    </Info>
                  )}
                  {!acta.nro_mpf && (
                    <Info>
                      <CardTitle>COOP</CardTitle>
                      <br />
                      {acta.nro_coop}
                    </Info>
                  )}
                  <Info>
                    <CardTitle>CIJ</CardTitle>
                    <br />
                    {acta.nro_cij}
                  </Info>
                  <Info>
                    <CardTitle>DIL</CardTitle>
                    <br />
                    {acta.nro_dil}
                  </Info>
                  <Info>
                    <CardTitle>Bolsas</CardTitle>
                    <br />
                    {acta.Bolsas.length}
                  </Info>
                  <Info>
                    <CardTitle>Efectos</CardTitle>
                    <br />
                    {totalEfectos}
                  </Info>
                  <Info>
                    <CardTitle>Estado</CardTitle>
                    <br />
                    <Estado estado={acta.estado}>{acta.estado}</Estado>
                  </Info>
                  <DownloadIcon onClick={() => getSavedActa(acta.id)} />
                  <EditIcon onClick={() => editSavedActa(acta.id)} />
                </ActaContainer>
              );
            })
          : null}
      </CardsContainer>
      <Button to="/actas/crear/1">Crear Acta</Button>
    </>
  );
}

export default CreateActasCards;

const CardsContainer = styled.div`
  ${cardsContainer}
  padding-bottom: 5%;
`;

const ActaContainer = styled.div`
  ${cardContainer}
  border: ${(props) =>
    props.estado === "en proceso"
      ? `2px solid ${principalColor}`
      : props.estado === "completo"
      ? `2px solid ${greenColor}`
      : `2px solid ${redColor}`};
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.estado === "en proceso" ? "#00647335" : props.estado === "completo" ? "#6aa84f35" : "#a84f4f35"};
  }
`;

const Info = styled.span`
  ${cardInfo}
`;

const CardTitle = styled.strong`
  ${cardTitle}
`;

const DownloadIcon = styled(FileDownload)`
  width: 25px;
  margin-right: 40px;
  color: ${secondaryColor};
  transition: all 0.3s ease;

  &:hover {
    color: black;
    cursor: pointer;
  }
`;

const EditIcon = styled(DocumentEdit)`
  width: 25px;
  margin-right: 40px;
  color: ${secondaryColor};
  transition: all 0.3s ease;

  &:hover {
    color: black;
    cursor: pointer;
  }
`;

const Estado = styled.span`
  color: ${(props) =>
    props.estado === "en proceso" ? yellowColor : props.estado === "completo" ? greenColor : redColor};
`;

const Button = styled(Link)`
  ${button}
  position: absolute;
  bottom: 0;
  margin-bottom: 10px;
  background-color: white;
  text-decoration: none;
`;
