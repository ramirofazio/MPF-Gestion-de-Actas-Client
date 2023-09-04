import React from "react";

function AddSdModal({ sds, setSds, setAddSdModal, toast }) {
  React.useEffect(() => {
    return () => {
      localStorage.setItem("currentSd", null);
    };
  });

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
      <header className="modalHeader">
        <span data-aos="fade-down">{sd.edit ? "Editar Sd" : "Agregar Sd"}</span>
      </header>
      <form data-aos="zoom-in" className="flex w-full flex-col justify-center p-5 pt-0" onSubmit={handleSdSubmit}>
        <div className="modalInputContainer">
          <label className="basicLabel !text-white">Marca</label>
          <input
            className="formModalInput"
            type="text"
            name="marca"
            value={sd.marca}
            placeholder="Marca"
            onChange={(e) => setSd({ ...sd, marca: e.target.value.toUpperCase() })}
          />
        </div>
        <div className="modalInputContainer">
          <label className="basicLabel !text-white">Serial N°</label>
          <input
            className="formModalInput"
            type="text"
            name="serialNumber"
            value={sd.serialNumber}
            placeholder="Serial N°"
            onChange={(e) => setSd({ ...sd, serialNumber: e.target.value.toUpperCase() })}
          />
        </div>
        <div className="modalInputContainer">
          <label className="basicLabel !text-white">*Almacenamiento</label>
          <input
            className="formModalInput"
            type="text"
            name="almacenamiento"
            value={sd.almacenamiento}
            placeholder="500 GB / 1 TB"
            onChange={(e) => setSd({ ...sd, almacenamiento: e.target.value.toUpperCase() })}
          />
        </div>
        <div className="modalInputContainer">
          <label className="basicLabel !text-white">*Extracción</label>
          <select
            className="formModalSelect"
            value={sd.tipoExtraccionSd}
            onChange={(e) => setSd({ ...sd, tipoExtraccionSd: e.target.value })}
          >
            <option value="">Tipo de Extracción</option>
            <option value="ninguna">Ninguna</option>
            <option value="en proceso">En Proceso</option>
            <option value="fisica">Fisica</option>
            <option value="lógica ">Logica</option>
            <option value="sistema de archivos">Sitema de Archivos</option>
            <option value="lógica  avanzada">Logica Avanzada</option>
          </select>
        </div>
        <div className="mt-2 flex w-full items-center justify-around">
          <input className="submitBtn " type="submit" value="Guardar" />
        </div>
      </form>
    </>
  );
}

export default AddSdModal;
