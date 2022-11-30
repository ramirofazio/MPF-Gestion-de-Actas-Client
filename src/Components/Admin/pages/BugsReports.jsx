import React from "react";
import { useNavigate } from "react-router-dom";
//* Redux
import { useDispatch, useSelector } from "react-redux";
import { getBugsReports } from "../../../redux/actions";
//* Styles
import styled, { css } from "styled-components";
import GlobalStyles from "../../../Styles/GlobalStyles";
import Variables from "../../../Styles/Variables";
//* Initializations
const { enProcesoContainer, header, headerTitle } = GlobalStyles;
const { principalColor, secondaryColor } = Variables;

function BugsReports() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bugsReports = useSelector((s) => s.bugsReports);

  React.useEffect(() => {
    dispatch(getBugsReports());
  }, []);

  return (
    <Container>
      <Header>
        <Title>Reporte de Bugs</Title>
      </Header>
      <BugsReportsContainer>
        {bugsReports &&
          bugsReports.map((bug) => (
            <BugContainer key={bug.id} onClick={() => navigate(bug.pathname)}>
              <BugInfo id={"true"}>{bug.id}</BugInfo>
              <BugInfo description={"true"}>{bug.description}</BugInfo>
              <div style={{ textAlign: "start", height: "100%", flex: 0.2 }}>
                <BugInfo>{bug.fecha.slice(0, 10)}</BugInfo>
                <br />
                <BugInfo>...{bug.pathname}</BugInfo>
              </div>
            </BugContainer>
          ))}
      </BugsReportsContainer>
    </Container>
  );
}

export default BugsReports;

const Container = styled.div`
  ${enProcesoContainer}
`;

const Header = styled.header`
  ${header}
`;

const Title = styled.h1`
  ${headerTitle}
`;

const BugsReportsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  flex: 1;
  border-top: 2px solid ${principalColor};
  overflow: scroll;
  padding-top: 10%;
`;

const BugContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 85%;
  min-height: 100px;
  border: 2px solid ${principalColor};
  border-radius: 5px;
  padding: 10px;
  margin-block: 5px;

  &:hover {
    background-color: #00647335;
    cursor: pointer;
  }
`;

const BugInfo = styled.p`
  ${(p) =>
    p.id === "true" &&
    css`
      align-self: flex-start;
    `}

  ${(p) =>
    p.description === "true" &&
    css`
      flex: 1;
      display: flex;
      align-items: center;
      height: 130%;
      font-size: medium;
      color: ${secondaryColor};
      border-left: 2px solid ${principalColor};
      margin-left: 10px;
      padding-left: 15px;
    `}
`;
