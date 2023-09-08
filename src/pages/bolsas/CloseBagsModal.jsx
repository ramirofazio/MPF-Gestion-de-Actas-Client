import React from "react";
import { CloseBagsCompleted, CloseBagsInProcess } from "pages/index";
import { useDispatch, useSelector } from "react-redux";
import { updateBolsa } from "redux/actions";

export function CloseBagsModal({ closeModal, selectedBag }) {
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
