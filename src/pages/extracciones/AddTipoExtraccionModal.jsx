import React from "react";

export function AddTipoExtraccionModal({ nombre, handleTipoExtraccionSubmit }) {
  const [tipoDeExtraccion, setTipoDeExtraccion] = React.useState({
    fakeId: Math.random(),
    nombre: "",
    estado: "",
    observacionFalla: "",
  });

  return (
    <>
      <header className="modalHeader">
        <span data-aos="fade-down">Extracciones de {nombre}</span>
      </header>
      <form
        data-aos="zoom-in"
        className="flex h-full w-full flex-col justify-center p-5 pt-0"
        onSubmit={(e) => handleTipoExtraccionSubmit(e, tipoDeExtraccion)}
      >
        <div className="modalInputContainer">
          <label className="basicLabel !text-white">*Extraccion</label>
          <select
            className="formModalSelect"
            value={tipoDeExtraccion.nombre}
            onChange={(e) => setTipoDeExtraccion({ ...tipoDeExtraccion, nombre: e.target.value })}
          >
            <option value="">Tipo de Extracción</option>
            <option value="ninguna">Ninguna</option>
            <option value="física">Física</option>
            <option value="lógica">Lógica</option>
            <option value="sistema de archivos">Sitema de Archivos</option>
            <option value="lógica  avanzada">Logica Avanzada</option>
          </select>
        </div>
        <div className="modalInputContainer">
          <label className="basicLabel !text-white">*Estado</label>
          <select
            className="formModalSelect"
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
          <div className="modalInputContainer">
            <label className="basicLabel !text-white">Observacion</label>
            <input
              className="formModalInput"
              type="text"
              name="observacionFalla"
              value={tipoDeExtraccion.observacionFalla}
              placeholder="¿Por que Falla?"
              onChange={(e) => setTipoDeExtraccion({ ...tipoDeExtraccion, observacionFalla: e.target.value })}
            />
          </div>
        )}
        <div className="inputContainer !pb-0 pt-4">
          <input className="submitBtn" value="Guardar" type="submit" />
        </div>
      </form>
    </>
  );
}