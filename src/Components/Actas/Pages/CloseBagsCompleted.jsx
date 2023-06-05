import React from "react";
//* Style
import { toast } from "react-toastify";

function CloseBagsCompleted({ closeModal, dispatch, selectedBag, updateBolsa, acta_id }) {
  const [state, setState] = React.useState({
    id: Number(selectedBag.id),
    nroPrecintoBlanco: "",
  });

  const handleCompleteSubmit = (e) => {
    e.preventDefault();
    if (state.nroPrecintoBlanco) {
      dispatch(updateBolsa(state, acta_id));
      closeModal();
    } else {
      toast.warning("¡Falta agregar el precinto blanco para cerrar la bolsa!");
    }
  };

  const handleCloseLater = (e) => {
    e.preventDefault();
    dispatch(updateBolsa(state, acta_id, "leaveInProccess"));
    closeModal();
  };

  return (
    <>
      <header className="modalHeader">
        <span data-aos="fade-down">Agregar Precinto Blanco</span>
      </header>
      <form data-aos="zoom-in" className="flex w-full flex-col justify-center p-5 pt-0" onSubmit={handleCompleteSubmit}>
        <div className="modalInputContainer">
          <label className="basicLabel !text-white">*Bolsa</label>
          <select className="formModalSelect" value={state.id} disabled={true}>
            <option>{selectedBag.nroPrecinto}</option>
          </select>
        </div>
        <div className="modalInputContainer">
          <label className="basicLabel !text-white">*Precinto Blanco</label>
          <input
            className="formModalInput"
            type="number"
            name="nroPrecintoBlanco"
            value={state.nroPrecintoBlanco}
            placeholder="Nro Precinto Blanco"
            onChange={(e) => setState({ ...state, nroPrecintoBlanco: e.target.value })}
          />
        </div>
        <div className="mt-2 flex w-full items-center justify-evenly">
          <input className="submitBtn" type="submit" value={`Cerrar Bolsa ${selectedBag.nroPrecinto}`} />
          <button className="submitBtn" onClick={handleCloseLater}>
            Cerrar Despues
          </button>
        </div>
      </form>
    </>
  );
}

export default CloseBagsCompleted;
