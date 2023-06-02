import React from "react";
//* Style
import { toast } from "react-toastify";

function CloseBagsInProcess({ closeModal, dispatch, selectedBag, updateBolsa, acta_id }) {
  const [state, setstate] = React.useState({
    id: Number(selectedBag.id),
    leyenda:
      "Finalizadas las tareas técnicas pertinentes, los elementos quedan en resguardo dentro del laboratorio de informatica forense con control de acceso biometrico, puertas cerradas y videos con camara de seguridad las 24 horas, para continuar con las tareas la jornada siguente.",
  });

  const handleInProcessSubmit = (e) => {
    e.preventDefault();
    if (state.leyenda) {
      dispatch(updateBolsa(state, acta_id));
      closeModal();
    } else {
      toast.warning("¡Falta agregar la leyenda para la bolsa en proceso!");
    }
  };
  return (
    <>
      <header className="modalHeader">
        <span data-aos="fade-down">Dejar Bolsa en Proceso</span>
      </header>
      <form data-aos="zoom-in" className="flex w-full flex-col justify-center p-5 pt-0" onSubmit={handleInProcessSubmit}>
        <div className="modalInputContainer">
          <label className="basicLabel !text-white">*Bolsa</label>
          <select className="formModalSelect" value={state.id} disabled={true}>
            <option>{selectedBag.nroPrecinto}</option>
          </select>
        </div>
        <div className="modalInputContainer !h-32">
          <label className="basicLabel !text-white">*Leyenda</label>
          <textarea
            className="formModalInput !h-full !text-center"
            name="leyenda"
            value={state.leyenda}
            placeholder="Leyenda"
            onChange={(e) => setstate({ ...state, leyenda: e.target.value })}
          />
        </div>
        <div className="mt-2 flex w-full items-center justify-around">
          <input className="submitBtn " type="submit" value={`Guardar Bolsa ${selectedBag.nroPrecinto}`} />
        </div>
      </form>
    </>
  );
}

export default CloseBagsInProcess;
