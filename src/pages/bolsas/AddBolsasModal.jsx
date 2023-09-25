import React from "react";
import { useDispatch } from "react-redux";
import { createBolsas } from "../../redux/actions";
import { toast } from "react-toastify";

export function AddBolsasModal({ alternModal, acta_id }) {
  const dispatch = useDispatch();

  const [bolsa, setBolsa] = React.useState({
    acta_id: acta_id,
    fecha: new Date().toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    colorPrecinto: "",
    nroPrecinto: "",
    observaciones: "",
  });

  const handleSubmitBolsa = (e) => {
    e.preventDefault();
    //* Crea una bolsa nueva y blanquea los input
    if (bolsa.colorPrecinto && bolsa.nroPrecinto) {
      dispatch(createBolsas(bolsa));
      setBolsa({
        acta_id: acta_id,
        colorPrecinto: "",
        nroPrecinto: "",
        observaciones: "",
      });
      alternModal();
    } else {
      toast.warning("¡Faltan datos para crear la bolsa!");
    }
  };

  return (
    <>
      <header className="modalHeader">Agregar Bolsa</header>
      <form className="flex w-full flex-col justify-center p-5 pt-0" onSubmit={handleSubmitBolsa}>
        <div className="modalInputContainer">
          <label className="basicLabel !text-white">*Precinto de Apertura</label>
          <select
            className="formModalSelect"
            value={bolsa.colorPrecinto}
            onChange={(e) => setBolsa({ ...bolsa, colorPrecinto: e.target.value })}
          >
            <option value="">Color del Precinto</option>
            <option value="rojo">Rojo</option>
            <option value="verde">Verde</option>
            <option value="blanco">Blanco</option>
          </select>
        </div>
        <div className="modalInputContainer">
          <label className="basicLabel !text-white">*N° Precinto</label>
          <input
            className="formModalInput"
            type="number"
            name="N° Precinto"
            value={bolsa.nroPrecinto}
            placeholder="N° Precinto"
            onChange={(e) => setBolsa({ ...bolsa, nroPrecinto: e.target.value })}
          />
        </div>
        <div className="modalInputContainer">
          <label className="basicLabel !text-white">De su interior se extrae:</label>
          <textarea
            className="formModalInput !h-40 px-4"
            type="text"
            name="Observaciones/Descripcion de la Bolsa"
            value={bolsa.observaciones}
            placeholder="Observaciones/Descripcion de la Bolsa"
            onChange={(e) => setBolsa({ ...bolsa, observaciones: e.target.value })}
          />
        </div>

        <div className="inputContainer !pb-0 pt-4">
          <input type="submit" value="Agregar" className="submitBtn" />
        </div>
      </form>
    </>
  );
}
