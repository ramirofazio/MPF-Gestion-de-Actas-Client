import React from "react";
//* Components
import CloseBagsCompleted from "./CloseBagsCompleted";
import CloseBagsInProcess from "./CloseBagsInProcess";
//* Redux
import { useDispatch, useSelector } from "react-redux";
import { updateBolsa } from "../../../redux/actions";

function CloseModal({ closeModal }) {
  const dispatch = useDispatch();

  const currentActa = useSelector((s) => JSON.parse(localStorage.getItem("currentActa")) || s.currentActa);
  const currentBolsas = useSelector((s) => JSON.parse(localStorage.getItem("currentBolsas")) || s?.currentBolsas);

  const [bagsInProcess, setBagsInProcess] = React.useState([]);
  const [bagsToClose, setBagsToClose] = React.useState([]);

  React.useEffect(() => {
    return () => {
      setBagsToClose([]);
      setBagsInProcess([]);
    };
  }, []);

  React.useEffect(() => {
    getPrecintos();
  }, [bagsToClose.length === 0 && bagsInProcess.length === 0]);

  const getPrecintos = () => {
    //* Bolsas completas
    const bagsCompleted = currentBolsas.filter((b) => {
      if (b.estado === "abierta con efectos completos") return b;
    });
    setBagsToClose(bagsCompleted);
    //* Bolsas en proceso
    const bagsInProcess = currentBolsas.filter((b) => {
      if (b.estado === "abierta con efectos en proceso") return b;
    });
    setBagsInProcess(bagsInProcess);
  };

  if (bagsToClose.length !== 0) {
    return (
      <CloseBagsCompleted
        closeModal={closeModal}
        dispatch={dispatch}
        bagsToClose={bagsToClose}
        updateBolsa={updateBolsa}
        acta_id={currentActa.id}
      />
    );
  } else if (bagsInProcess.length !== 0) {
    return (
      <CloseBagsInProcess
        closeModal={closeModal}
        dispatch={dispatch}
        bagsInProcess={bagsInProcess}
        updateBolsa={updateBolsa}
        acta_id={currentActa.id}
      />
    );
  }
}

export default CloseModal;
