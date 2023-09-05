import React from "react";
//* Components
import CloseBagsCompleted from "./CloseBagsCompleted";
import CloseBagsInProcess from "./CloseBagsInProcess";
//* Redux
import { useDispatch, useSelector } from "react-redux";
import { updateBolsa } from "../../redux/actions";

function CloseModal({ closeModal, selectedBag }) {
  const dispatch = useDispatch();

  const currentActa = useSelector((s) => JSON.parse(localStorage.getItem("currentActa")) || s.currentActa);

  if (selectedBag.estado === "abierta con efectos completos") {
    return (
      <CloseBagsCompleted
        closeModal={closeModal}
        dispatch={dispatch}
        selectedBag={selectedBag}
        updateBolsa={updateBolsa}
        acta_id={currentActa.id}
        actaEstado={currentActa.estado}
      />
    );
  } else if (selectedBag.estado === "abierta con efectos en proceso") {
    return (
      <CloseBagsInProcess
        closeModal={closeModal}
        dispatch={dispatch}
        selectedBag={selectedBag}
        updateBolsa={updateBolsa}
        acta_id={currentActa.id}
      />
    );
  }
}

export default CloseModal;
