import { Input, Select, TipoExtracciones } from "components/fields";
import React from "react";

export function AddSdModal({ sds, setSds, setAddSdModal, toast }) {
  React.useEffect(() => {
    return () => {
      localStorage.setItem("currentSd", null);
    };
  }, []);

  const [sd, setSd] = React.useState(
    JSON.parse(localStorage.getItem("currentSd")) || {
      marca: "",
      serialNumber: "",
      almacenamiento: "",
      tipoExtraccionSd: "",
    }
  );

  const handleSdSubmit = (e) => {
    e.preventDefault();
    if (sd.almacenamiento && sd.tipoExtraccionSd) {
      setAddSdModal(false);
      setSds([...sds, sd]);
      setSd({
        marca: "",
        serialNumber: "",
        almacenamiento: "",
        tipoExtraccionSd: "",
      });
      if (sd.edit) {
        toast.success("¡Sd Editada con Exito!");
      } else {
        toast.success("¡Sd Guardada con Exito!");
      }
    } else {
      toast.error("¡Faltan datos necesarios para el Elemento!");
    }
  };

  return (
    <>
      <header className="modalHeader" data-aos="fade-down">
        {sd.edit ? "Editar Sd" : "Agregar Sd"}
      </header>
      <form data-aos="zoom-in" className="flex w-full flex-col justify-center p-5 pt-0" onSubmit={handleSdSubmit}>
        <Input
          label={"Marca"}
          value={sd.marca}
          placeholder="Marca"
          onChange={(e) => setSd({ ...sd, marca: e.target.value.toUpperCase() })}
        />
        <Input
          label={"Serial N°"}
          value={sd.serialNumber}
          placeholder="Serial N°"
          onChange={(e) => setSd({ ...sd, serialNumber: e.target.value.toUpperCase() })}
        />
        <Input
          label={"*Almacenamiento"}
          value={sd.almacenamiento}
          placeholder="500 GB / 1 TB"
          onChange={(e) => setSd({ ...sd, almacenamiento: e.target.value.toUpperCase() })}
        />
        <Select
          label={"*Extracción"}
          options={<TipoExtracciones />}
          value={sd.tipoExtraccionSd}
          onChange={(e) => setSd({ ...sd, tipoExtraccionSd: e.target.value })}
        />
        <div className="mt-2 flex w-full items-center justify-around">
          <input className="submitBtn " type="submit" value="Guardar" />
        </div>
      </form>
    </>
  );
}
