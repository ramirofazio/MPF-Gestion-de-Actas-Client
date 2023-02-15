import React from "react";
import { NavLink } from "react-router-dom";
//* Styles
import styled from "styled-components";
import GlobalStyles from "../../Styles/GlobalStyles";
import Variables from "../../Styles/Variables";
import { BugFill } from "@styled-icons/bootstrap/BugFill";
import { StatsChart } from "@styled-icons/ionicons-sharp/StatsChart";
import { FileRemove } from "@styled-icons/evaicons-solid/FileRemove";

//* Initializations
const { principalColor, secondaryColor } = Variables;
const { header, headerTitle, enProcesoContainer } = GlobalStyles;

function Home() {
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
        <Card to="/admin/estadisticas">
          <CardTitle>Estadisticas</CardTitle>
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
