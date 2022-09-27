import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Variables from "../Styles/Variables";
import logo from "../Assets/logo.png";

function NavBar() {
  const location = useLocation();
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected(location.pathname);
  }, [location]);

  return (
    <NavBarContainer selected={selected}>
      <Container>
        <Logo src={logo} color="#fff" />
        <HomeLinks to="/">Inicio</HomeLinks>
        <HomeLinks to="/crearActa">Crear Acta</HomeLinks>
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
  background: ${Variables.principalColor};
  transition: all 1s ease;

  &:hover {
    background-color: ${Variables.navBarColor};
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  padding-top: 20%;
  padding-inline: 10px;
`;

const HomeLinks = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 7%;
  font-size: 1.1rem;
  padding: 20px;
  margin-bottom: 15%;
  border-radius: 10px;
  text-decoration: none;
  color: ${Variables.secondaryColor};
  background: #ffffff;
  transition: all 0.5s ease;

  &:hover {
    background: #ffffffb5;
  }
`;

const Logo = styled.img`
  width: 50%;
  margin-bottom: 30%;
`;
