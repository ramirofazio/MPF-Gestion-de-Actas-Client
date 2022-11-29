import React from "react";
import { useNavigate } from "react-router-dom";
//* Redux
import { useDispatch, useSelector } from "react-redux";
import { getBugsReports } from "../../redux/actions";
//* Styles
import styled, { css } from "styled-components";
import GlobalStyles from "../../Styles/GlobalStyles";
import Variables from "../../Styles/Variables";
//* Initializations
const { enProcesoContainer, header, headerTitle } = GlobalStyles;
const { principalColor } = Variables;

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bugsReports = useSelector((s) => s.bugsReports);

  React.useEffect(() => {
    dispatch(getBugsReports());
  }, []);

  return (
    <Container>
      <Header>
        <Title>Panel De Administrador</Title>
      </Header>
      <BugsReportsContainer>
        {bugsReports &&
          bugsReports.map((bug) => (
            <BugContainer key={bug.id} onClick={() => navigate(bug.pathname)}>
              <BugInfo id={"true"}>{bug.id}</BugInfo>
              <BugInfo>{bug.fecha.slice(0, 10)}</BugInfo>
              <BugInfo>...{bug.pathname}</BugInfo>
              <BugInfo>{bug.description}</BugInfo>
            </BugContainer>
          ))}
      </BugsReportsContainer>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  ${enProcesoContainer}
`;

const Header = styled.header`
  ${header}
`;

const Title = styled.h1`
  ${headerTitle}
`;

const BugContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  max-width: 25%;
  min-width: 25%;
  min-height: 20%;
  border: 2px solid ${principalColor};
  border-radius: 10px;
  overflow: hidden;
  padding: 10px;
  margin-inline: 15px;

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
    p.fecha === "true" &&
    css`
      align-self: flex-start;
    `}
`;

const BugsReportsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  flex: 1;
  border-top: 2px solid ${principalColor};
`;
