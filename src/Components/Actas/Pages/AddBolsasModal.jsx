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
      <form className="flex w-full flex-col" onSubmit={handleSubmitBolsa}>
        <div className="inputContainer flex-col">
          <label className="basicLabel">*Precinto de Apertura</label>
          <select
            className="formBigSelect"
            value={bolsa.colorPrecinto}
            onChange={(e) => setBolsa({ ...bolsa, colorPrecinto: e.target.value })}
          >
            <option value="">Color del Precinto</option>
            <option value="rojo">Rojo</option>
            <option value="verde">Verde</option>
            <option value="blanco">Blanco</option>
          </select>
        </div>
        <div className="inputContainer flex-col">
          <label className="basicLabel">*N° Precinto</label>
          <input
            className="formBigInput"
            type="number"
            name="N° Precinto"
            value={bolsa.nroPrecinto}
            placeholder="N° Precinto"
            onChange={(e) => setBolsa({ ...bolsa, nroPrecinto: e.target.value })}
          />
        </div>
        <div className="inputContainer flex-col">
          <label className="basicLabel ml-[30%]">
            Observaciones/Descripción de la Bolsa
          </label>
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <label className="basicLabel w-[40%]">De su interior se extrae:</label>
            <input
              className="formBigInput"
              type="text"
              name="Observaciones/Descripcion de la Bolsa"
              value={bolsa.observaciones}
              placeholder="Observaciones/Descripcion de la Bolsa"
              onChange={(e) => setBolsa({ ...bolsa, observaciones: e.target.value })}
            />
          </div>
        </div>

        <input type="submit" value="Agregar" className="submitBtn" />
      </form>
    </>
  );
};

export default AddBolsasModal;
