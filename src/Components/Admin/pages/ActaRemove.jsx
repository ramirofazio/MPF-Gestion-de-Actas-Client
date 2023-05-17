import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllActas, clearStates, admin } from "../../../redux/actions";
//* Utils
import ActasCards from "../../Utils/actasCards/ActasCards";

function ActaRemoev() {
  const dispatch = useDispatch();

  const allActas = useSelector((s) => s.allActas); //* Me traigo todas las actas
  const adminState = useSelector((s) => s.admin);

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
        <span className="headerTitle">Eliminar un Acta</span>
      </header>
      <ActasCards allActas={allActas} typeOfCard={"remove"} />
    </div>
  );
}

export default ActaRemoev;
