import React from "react";
import { Close } from "@styled-icons/ionicons-outline/Close";

function AddTipoExtraccionModal({ setAddTipoExtraccionModal, handleTipoExtraccionSubmit }) {
  const [tipoDeExtraccion, setTipoDeExtraccion] = React.useState({
    fakeId: Math.random(),
    nombre: "",
    estado: "",
    observacionFalla: "",
  });

  return (
    <>
      <Close
        size={30}
        className="cursor-pointer self-end text-white transition hover:text-gray-500"
        onClick={() => setAddTipoExtraccionModal(false)}
      />
      <h4 class="modalTitle">Agregar Tipos de Extraccion</h4>
      <form
        class="flex h-full w-full flex-col items-center p-5 text-white"
        onSubmit={(e) => handleTipoExtraccionSubmit(e, tipoDeExtraccion)}
      >
        <div class="inputContainer">
          <label class="flex-1">Extraccion</label>
          <select
            class="select"
            value={tipoDeExtraccion.nombre}
            onChange={(e) => setTipoDeExtraccion({ ...tipoDeExtraccion, nombre: e.target.value })}
          >
            <option value="">Tipo de Extracción</option>
            <option value="ninguna">Ninguna</option>
            <option value="fisica">Fisica</option>
            <option value="logica">Logica</option>
            <option value="sistema de archivos">Sitema de Archivos</option>
            <option value="logica avanzada">Logica Avanzada</option>
          </select>
        </div>
        <div class="inputContainer">
          <label class="flex-1">Estado</label>
          <select
            class="select"
            value={tipoDeExtraccion.estado}
            onChange={(e) => setTipoDeExtraccion({ ...tipoDeExtraccion, estado: e.target.value })}
          >
            <option value="">Seleccione el Estado</option>
            <option value="completo">Completo</option>
            <option value="en proceso">En Proceso</option>
            <option value="fallo">Fallo</option>
          </select>
        </div>

        {tipoDeExtraccion.estado === "fallo" && (
          <div class="inputContainer">
            <label class="flex-1">Observacion</label>
            <input
              className="select placeholder:text-black"
              type="text"
              name="observacionFalla"
              value={tipoDeExtraccion.observacionFalla}
              placeholder="¿Por que Falla?"
              onChange={(e) => setTipoDeExtraccion({ ...tipoDeExtraccion, observacionFalla: e.target.value })}
            />
          </div>
        )}
        <button class="submitBtn" type="submit">
          Agregar Tipo de Extraccion
        </button>
      </form>
    </>
  );
}

export default AddTipoExtraccionModal;
