import React from "react";
import { useNavigate } from "react-router-dom";
//* Styles
import styled from "styled-components";
import Variables from "../../../Styles/Variables";
import GlobalStyles from "../../../Styles/GlobalStyles";
import { FileDownload } from "@styled-icons/remix-line/FileDownload";
import { DocumentEdit } from "@styled-icons/fluentui-system-regular/DocumentEdit";
//* Utils
import getSavedActa from "../getSavedActa";
import editSavedActa from "../editSavedActa";
//* Initialization
const { secondaryColor } = Variables;
const { actaCardContainer, cardInfo, cardTitle } = GlobalStyles;

function ActaCard({ acta }) {
  const navigate = useNavigate();

  const [totalEfectos, setTotalEfectos] = React.useState(0);

  React.useEffect(() => {
    acta.Bolsas.map((bolsa) => {
      setTotalEfectos(totalEfectos + bolsa.Efectos.length);
    });
  }, []);

  /*
    ! ({acta, type}) type = "create" muestra cartas de creacion, cuando haya consultas ver que mostrar en la card, va a llegar type = "consulta"
  */

  return (
    <ActaContainer estado={acta.estado}>
      <Info>
        <CardTitle>Fecha</CardTitle>
        <br />
        {acta.mes} {acta.dias}
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
        <CardTitle>Suscriptores</CardTitle>
        <br />
        {acta.Integrantes.length}
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
      <DownloadIcon onClick={() => getSavedActa(acta.id)} />
      <EditIcon onClick={() => editSavedActa(acta.id, navigate)} />
    </ActaContainer>
  );
}

export default ActaCard;

const ActaContainer = styled.div`
  ${actaCardContainer}
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
