import React from "react";
//* Style
import { toast } from "react-toastify";

export function CloseBagsCompleted({ closeModal, dispatch, selectedBag, updateBolsa, acta_id, actaEstado }) {
  const [state, setState] = React.useState({
    id: Number(selectedBag.id),
    nroPrecintoBlanco: "",
  });

  const [show, setShow] = React.useState(false);

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

  React.useEffect(() => {
    if (actaEstado === "para completar" || selectedBag.estado === "abierta en proceso con elementos completos") {
      setShow(true);
    }
  }, []);

  return (
    <>
      <header className="modalHeader">Agregar Precinto Blanco</header>
      <form className="flex w-full flex-col justify-center p-5 pt-0" onSubmit={handleCompleteSubmit}>
        {show && (
          <>
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
              <button className="submitBtn" onClick={() => setShow(false)}>
                Volver
              </button>
              <input className="submitBtn" type="submit" value={`Agregar precinto ${state.nroPrecintoBlanco}`} />
            </div>
          </>
        )}
        {!show && (
          <div className="mt-2 flex w-full items-center justify-evenly">
            <button className="submitBtn !my-4 !py-4" onClick={handleCloseLater}>
              Agregar precinto despues
            </button>
            <button className="submitBtn !my-4 !py-4" onClick={() => setShow(true)}>
              Agregar precinto ahora
            </button>
          </div>
        )}
      </form>
    </>
  );
}
