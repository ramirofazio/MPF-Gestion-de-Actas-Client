import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllActas, clearStates, admin } from "../../redux/actions";
//* Styles
import styled from "styled-components";
import GlobalStyles from "../../Styles/GlobalStyles";
//* Utils
import ActasCards from "../Utils/actasCards/ActasCards";
//* Initializations
const { enProcesoContainer, header, headerTitle } = GlobalStyles;

function Home() {
  const dispatch = useDispatch();

  const allActas = useSelector((s) => s.allActas); //* Me traigo todas las actas
  const adminState = useSelector((s) => JSON.parse(localStorage.getItem("admin")) || s.admin);

  React.useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const users = JSON.parse(localStorage.getItem("users"));
    if (currentUser) {
      if (adminState) {
        localStorage.clear();
        dispatch(clearStates());
        dispatch(getAllActas());
        dispatch(admin());
      } else {
        localStorage.clear();
        dispatch(clearStates());
        dispatch(getAllActas());
      }
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, []);

  return (
    <div className="paddingLeftContainer">
      <header className="header">
        <span className="headerTitle">Creación de Actas</span>
      </header>
      <ActasCards allActas={allActas} typeOfActa={"home"} />
    </div>
  );
}

export default Home;
