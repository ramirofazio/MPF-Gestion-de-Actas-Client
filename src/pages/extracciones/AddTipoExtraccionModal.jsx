import { Input, Select, States, TipoExtracciones } from "components/fields";
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
      <header className="modalHeader" data-aos="fade-down">Ah o
        Extracciones de {nombre}
      </header>
      <form
        data-aos="zoom-in"
        className="flex h-full w-full flex-col justify-center p-5 pt-0"
        onSubmit={(e) => handleTipoExtraccionSubmit(e, tipoDeExtraccion)}
      >
        <Select
          label={"*Extracción"}
          options={<TipoExtracciones />}
          value={tipoDeExtraccion.nombre}
          onChange={(e) => setTipoDeExtraccion({ ...tipoDeExtraccion, nombre: e.target.value })}
        />
        <Select
          label={"*Estado"}
          options={<States />}
          value={tipoDeExtraccion.estado}
          onChange={(e) => setTipoDeExtraccion({ ...tipoDeExtraccion, estado: e.target.value })}
        />

        {tipoDeExtraccion.estado === "fallo" && (
          <Input
            label={"Observación"}
            name="observacionFalla"
            value={tipoDeExtraccion.observacionFalla}
            placeholder="¿Por que Falla?"
            onChange={(e) => setTipoDeExtraccion({ ...tipoDeExtraccion, observacionFalla: e.target.value })}
          />
        )}
        <div className="inputContainer !pb-0 pt-4">
          <input className="submitBtn" value="Guardar" type="submit" />
        </div>
      </form>
    </>
  );
}
