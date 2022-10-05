import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Variables from "../Styles/Variables";
import logo from "../Assets/logo.png";
import { loadDB } from "../redux/actions";

function NavBar() {
  return (
    <NavBarContainer>
      <Container>
        <Logo src={logo} alt="logo" />
        <HomeLinks to="/">Crear Acta</HomeLinks>
        <HomeLinks to="/consultas">Consultas</HomeLinks>
        <button onClick={loadDB}>Cargar DB</button>
      </Container>
    </NavBarContainer>
  );
}

export default NavBar;

const NavBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  height: 100%;
  position: fixed;
  background: ${Variables.principalColor};
  transition: all 0.5s ease;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  padding-top: 20%;
  padding-inline: 10px;
  transition: all 0.5s ease;
`;

const HomeLinks = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 8%;
  font-size: 1.1rem;
  padding: 20px;
  margin-bottom: 15%;
  border-radius: 10px;
  text-decoration: none;
  color: ${Variables.secondaryColor};
  background: #ffffff;
  transition: all 0.5s ease;

  &:hover {
    background: ${Variables.baseTransparentColor};
  }
`;

const Logo = styled.img`
  width: 50%;
  margin-bottom: 30%;
  transition: all 0.5s ease;
`;
