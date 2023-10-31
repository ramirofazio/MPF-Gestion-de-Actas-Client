import React from "react";
import { updatePrecintoBlanco } from "redux/actions";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

export function UpdatePrecintoBlanco({ bolsaId, closeModal }) {
  const dispatch = useDispatch();

  const [state, setState] = React.useState({
    bolsaId: bolsaId,
    nroPrecintoBlanco: "",
  });

  const handleCompleteSubmit = (e) => {
    e.preventDefault();
    if (state.nroPrecintoBlanco) {
      dispatch(updatePrecintoBlanco(state));
      closeModal();
    } else {
      toast.warning("¡Falta agregar el precinto blanco para editarlo!");
    }
  };

  return (
    <>
      <header className="modalHeader">Editar Precinto Blanco</header>
      <form className="flex w-full flex-col justify-center p-5 pt-0" onSubmit={handleCompleteSubmit}>
        <>
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
            <input className="submitBtn" type="submit" value={`Editar precinto ${state.nroPrecintoBlanco}`} />
          </div>
        </>
      </form>
    </>
  );
}
