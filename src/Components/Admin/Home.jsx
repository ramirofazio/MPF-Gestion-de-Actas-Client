import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllActas } from "../../redux/actions";
//* Styles
import styled from "styled-components";
import GlobalStyles from "../../Styles/GlobalStyles";
import Variables from "../../Styles/Variables";
import { BugFill } from "@styled-icons/bootstrap/BugFill";
import { StatsChart } from "@styled-icons/ionicons-sharp/StatsChart";
import { FileRemove } from "@styled-icons/evaicons-solid/FileRemove";
//*
import * as XLSX from "xlsx";
//* Initializations
const { principalColor, secondaryColor } = Variables;
const { header, headerTitle, enProcesoContainer } = GlobalStyles;

function flatten(obj, prefix = "") {
  if (!obj || typeof obj !== "object") {
    return {};
  }
  return Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? prefix + "_" : "";
    if (Array.isArray(obj[k])) {
      obj[k].forEach((item, index) => {
        Object.assign(acc, flatten(item, `${pre}${k}_${index}`));
      });
    } else if (typeof obj[k] === "object") {
      Object.assign(acc, flatten(obj[k], pre + k));
    } else {
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {});
}

const convertirJSONaExcel = (allActas) => {
  if (!Array.isArray(allActas)) {
    return;
  }
  const flatData = allActas.map((a) => flatten(a));
  const worksheet = XLSX.utils.json_to_sheet(flatData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja 1");
  XLSX.writeFile(workbook, "Gestion_de_actas_DB.xlsx");
};

function Home() {
  const dispatch = useDispatch();

  const allActas = useSelector((s) => s.allActas);

  React.useEffect(() => {
    dispatch(getAllActas());
  }, []);

  return (
    <Container>
      <Header>
        <Title>Panel de Administrador</Title>
      </Header>
      <CardsContainer>
        <Card to="/admin/bugs">
          <CardTitle>Reporte de Bugs</CardTitle>
          <BugIcon />
        </Card>
        <Card to="#" onClick={() => convertirJSONaExcel(allActas)}>
          <CardTitle>Exportar DB</CardTitle>
          <StatsChartIcon />
        </Card>
        <Card to="/admin/eliminarActa">
          <CardTitle>Eliminar un Acta</CardTitle>
          <FileRemoveIcon />
        </Card>
      </CardsContainer>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  ${enProcesoContainer}
  flex-direction: column;
`;

const Header = styled.div`
  ${header}
`;

const Title = styled.span`
  ${headerTitle}
`;

const CardsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-top: 2px solid ${principalColor};
`;

const Card = styled(NavLink)`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 25px;
  width: 60%;
  min-height: 15%;
  margin-top: 5px;
  border-radius: 5px;
  border: 2px solid ${principalColor};
`;

const CardTitle = styled.span`
  color: ${secondaryColor};
  font-size: 20px;
  transition: all 0.3s ease;

  ${Card}:hover & {
    font-size: 22px;
  }
`;

const BugIcon = styled(BugFill)`
  width: 30px;
  color: ${secondaryColor};
  transition: all 0.3s ease;

  &:hover {
    color: black;
    cursor: pointer;
  }

  ${Card}:hover & {
    width: 35px;
    color: ${principalColor};
  }
`;

const StatsChartIcon = styled(StatsChart)`
  width: 30px;
  color: ${secondaryColor};
  transition: all 0.3s ease;

  &:hover {
    color: black;
    cursor: pointer;
  }

  ${Card}:hover & {
    width: 35px;
    color: ${principalColor};
  }
`;

const FileRemoveIcon = styled(FileRemove)`
  width: 30px;
  color: ${secondaryColor};
  transition: all 0.3s ease;

  &:hover {
    color: black;
    cursor: pointer;
  }

  ${Card}:hover & {
    width: 35px;
    color: ${principalColor};
  }
`;
