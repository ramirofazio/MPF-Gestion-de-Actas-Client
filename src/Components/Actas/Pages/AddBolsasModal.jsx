import React from "react";
import { useDispatch } from "react-redux";
import { createBolsas } from "../../../redux/actions";

const AddBolsasModal = ({ alternModal, acta_id }) => {
  const dispatch = useDispatch();

  const [bolsa, setBolsa] = React.useState({
    acta_id: acta_id,
    colorPrecinto: "",
    nroPrecinto: "",
    observaciones: "",
  });

  const handleSubmitBolsa = (e) => {
    e.preventDefault();
    //* Crea una bolsa nueva y blanquea los input
    dispatch(createBolsas(bolsa));
    setBolsa({
      acta_id: acta_id,
      colorPrecinto: "",
      nroPrecinto: "",
      observaciones: "",
    });
    alternModal();
  };

  return (
    <>
      <header className="flex h-14 w-full items-center justify-center border-b-[3px] border-b-white text-white">
        <span>Agregar Bolsa</span>
      </header>
      <form
        className="flex w-full flex-col justify-center p-5 pt-0"
        onSubmit={handleSubmitBolsa}
      >
        <div className="inputContainer !justify-between py-8  !pb-0">
          <label data-aos="fade-right" className="basicLabel !text-white">
            *Precinto de Apertura
          </label>
          <select
            data-aos="fade-left"
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
        <div className="inputContainer  !justify-between py-8  !pb-0">
          <label data-aos="fade-right" className="basicLabel !text-white">
            *N° Precinto
          </label>
          <input
            data-aos="fade-left"
            className="formModalInput"
            type="number"
            name="N° Precinto"
            value={bolsa.nroPrecinto}
            placeholder="N° Precinto"
            onChange={(e) => setBolsa({ ...bolsa, nroPrecinto: e.target.value })}
          />
        </div>
        <div className="inputContainer  !justify-between py-8 !pb-0 ">
          <label data-aos="fade-right" className="basicLabel !text-white">
            De su interior se extrae:
          </label>
          <input
            data-aos="fade-left"
            className="formModalInput"
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
};

export default AddBolsasModal;
