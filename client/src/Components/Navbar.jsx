import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import Variables from "../Styles/Variables";
import GlobalStyles from "../Styles/GlobalStyles";

function NavBar() {
  const location = useLocation();
  const [selected, setSelected] = useState(null);
  const [scrollDown, setScrollDown] = useState(false);

  useEffect(() => {
    setSelected(location.pathname);
  }, [location]);

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDown(scrollY > lastScrollY ? true : false);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDown]);

  return (
    <NavBarContainer selected={selected} scrollDown={scrollDown}>
      <Container>
        <HomeLinks to="/">Inicio</HomeLinks>
      </Container>
    </NavBarContainer>
  );
}

export default NavBar;

const NavBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 10vh;
  position: fixed;
  justify-content: space-evenly;

  background: blue;
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  animation: fadeIn 1s ease-in;
  z-index: 200;
  transition: all 1s ease;

  &:hover {
    background-color: ${Variables.navBarColor};
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(-5px);
    }
    25% {
      opacity: 0.25;
      transform: translateY(-2.5px);
    }
    50% {
      opacity: 0.5;
      transform: translateY(-1.8px);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  ${(props) =>
    props.scrollDown === true &&
    css`
      opacity: 0;
      transform: translateY(-100%);
      margin-top: 10px;

      &:hover {
        opacity: 1;
        transform: translateY(0);
        margin-top: 0;
      }
    `}
`;

const Container = styled.div`
  display: flex;
  flex: 2;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
`;

const HomeLinks = styled(Link)`
  ${GlobalStyles.a}
  color: white;
  transition: all 0.5s ease;
  font-size: 1.4rem;
`;
