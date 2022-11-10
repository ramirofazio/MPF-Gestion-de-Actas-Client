import React from "react";
import { Link } from "react-router-dom";
//* Styles
import styled from "styled-components";
import Variables from "../Styles/Variables";
import logo from "../Assets/logo.png";
//* Initializations
const { principalColor } = Variables;

function NavBar() {
  return (
    <NavBarContainer>
      <Container>
        <Logo src={logo} alt="logo" />
        <HomeLinks to="/actas/crear">Crear Acta</HomeLinks>
        <HomeLinks to="/consultas">Consultas</HomeLinks>
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
  background: ${principalColor};
  transition: all 0.5s ease;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-top: 20%;
  padding-inline: 5px;
  transition: all 0.5s ease;
`;

const HomeLinks = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 8%;
  font-size: larger;
  padding: 20px;
  margin-bottom: 15%;
  border-radius: 10px;
  text-decoration: none;
  background: #ffffff;
  color: ${Variables.principalColor};
  border: 2px solid #ffffff;

  transition: all 0.3s ease-in;

  &:hover {
    background: ${principalColor};
    border: 2px solid #ffffff;
    color: #ffffff;
  }
`;

const Logo = styled.img`
  width: 50%;
  margin-bottom: 30%;
  transition: all 0.5s ease;
`;
