import React from "react";

function AddDiscoModal({ discos, setDiscos, setAddDiscoModal, toast }) {
  React.useEffect(() => {
    return () => {
      localStorage.setItem("currentDisco", null);
    };
  });

  const [disco, setDisco] = React.useState(
    JSON.parse(localStorage.getItem("currentDisco")) || {
      tipoDeDisco: "",
      marca: "",
      modelo: "",
      almacenamiento: "",
      serialNumber: "",
      adquisicion: "",
      herramientaSoftDisco: "",
      estadoDisco: "",
      discoFallado: "",
      observacionFallaDisco: "",
    }
  );

  const handleDiscoSubmit = (e) => {
    e.preventDefault();
    if (disco.tipoDeDisco && disco.marca && disco.almacenamiento && disco.discoFallado && disco.estadoDisco) {
      setAddDiscoModal(false);
      setDiscos([...discos, disco]);
      setDisco({
        tipoDeDisco: "",
        marca: "",
        modelo: "",
        almacenamiento: "",
        serialNumber: "",
        adquisicion: "",
        herramientaSoftDisco: "",
        estadoDisco: "",
        discoFallado: "",
        observacionFallaDisco: "",
      });
      if (disco.edit) {
        toast.success("¡Disco Editado con Exito!");
      } else {
        toast.success("¡Disco Guardado con Exito!");
      }
    } else {
      toast.error("¡Faltan datos necesarios para el Elemento!");
    }
  };

  return (
    <>
      <header className="modalHeader">
        <span data-aos="fade-down">{disco.edit ? "Editar" : "Agregar"} Disco</span>
      </header>
      <form data-aos="zoom-in" className="flex w-full flex-col justify-center p-5 pt-0" onSubmit={handleDiscoSubmit}>
        <div className="modalInputContainer">
          <label className="basicLabel !text-white">*Tipo de Disco</label>
          <select
            className="formModalSelect"
            disabled={disco.edit}
            value={disco.tipoDeDisco}
            onChange={(e) => setDisco({ ...disco, tipoDeDisco: e.target.value })}
          >
            <option value="">Rigido / Solido</option>
            <option value="Disco Rigido">Disco Rigido</option>
            <option value="Disco Solido">Disco Solido</option>
            <option value="Disco Solido en Formato M.2">Disco Solido M.2</option>
            <option value="Disco Solido en Formato NVMe">Disco Solido NVMe</option>
          </select>
        </div>
        <div className="modalInputContainer">
          <label className="basicLabel !text-white">*Marca</label>
          <input
            className="formModalInput"
            type="text"
            name="marca"
            value={disco.marca}
            placeholder="Marca"
            onChange={(e) => setDisco({ ...disco, marca: e.target.value.toUpperCase() })}
          />
        </div>
        <div className="modalInputContainer">
          <label className="basicLabel !text-white">Modelo</label>
          <input
            className="formModalInput"
            type="text"
            name="modelo"
            value={disco.modelo}
            placeholder="Modelo"
            onChange={(e) => setDisco({ ...disco, modelo: e.target.value.toUpperCase() })}
          />
        </div>
        <div className="modalInputContainer">
          <label className="basicLabel !text-white">Serial Nº</label>
          <input
            className="formModalInput"
            type="text"
            name="serialNumber"
            value={disco.serialNumber}
            placeholder="Serial Nº"
            onChange={(e) => setDisco({ ...disco, serialNumber: e.target.value.toUpperCase() })}
          />
        </div>
        <div className="modalInputContainer">
          <label className="basicLabel !text-white">*almacenamiento</label>
          <input
            className="formModalInput"
            type="text"
            name="almacenamiento"
            value={disco.almacenamiento}
            placeholder="500 GB / 1 TB"
            onChange={(e) => setDisco({ ...disco, almacenamiento: e.target.value.toUpperCase() })}
          />
        </div>

        <div className="modalInputContainer">
          <label className="basicLabel !text-white">Herramienta Software</label>
          <select
            className="formModalSelect"
            value={disco.herramientaSoftDisco}
            onChange={(e) => setDisco({ ...disco, herramientaSoftDisco: e.target.value })}
          >
            <option value="">Herramienta Software</option>
            <option value="Cellebrite, UFED 4PC V7.60">UFED 4PC</option>
            <option value="Cellebrite, UFED PREMIUM V7.60.702">UFED PREMIUM</option>
            <option value="Magnet, AXIOM V6.10.0">AXIOM</option>
            <option value="Opentext, ENCASE V8.11">ENCASE</option>
            <option value="Grayshift, GREYKEY">GREYKEY</option>
            <option value="Magnet, DVR EXAMINER V3.50">DVR EXAMINER</option>
            <option value="TABLEAU TX1 V 22.3.0.3">TABLEAU TX1 V 22.3.0.3</option>
            <option value="TABLEAU TD3">TABLEAU TD3</option>
            <option value="TABLEAU FORENSIC BRIDGE (bloqueador de escritura)">TABLEAU FORENSIC BRIDGE (bloqueador de escritura)</option>
          </select>
        </div>

        <div className="modalInputContainer">
          <label className="basicLabel !text-white">*¿El Disco Falla?</label>
          <select
            className="formModalSelect"
            value={disco.discoFallado}
            onChange={(e) => setDisco({ ...disco, discoFallado: e.target.value })}
          >
            <option value="">Si / No</option>
            <option value="si">Si</option>
            <option value="no">No</option>
          </select>
        </div>

        {disco.discoFallado === "si" && (
          <div className="modalInputContainer">
            <label className="basicLabel !text-white">Observacion Falla</label>
            <input
              className="formModalInput"
              type="text"
              name="observacionFalla"
              value={disco.observacionFallaDisco}
              placeholder="¿Por que Falla?"
              onChange={(e) => setDisco({ ...disco, observacionFallaDisco: e.target.value })}
            />
          </div>
        )}
        <div className="modalInputContainer">
          <label className="basicLabel !text-white">*Estado</label>
          <select
            className="formModalSelect"
            value={disco.estadoDisco}
            onChange={(e) => setDisco({ ...disco, estadoDisco: e.target.value })}
          >
            <option value="">Estado</option>
            <option value="completo">Completo</option>
            <option value="en proceso">En Proceso</option>
          </select>
        </div>

        {disco.herramientaSoftDisco !== "" && disco.discoFallado === "no" && disco.estadoDisco === "completo" && (
          <div className="modalInputContainer">
            <label className="basicLabel !text-white">Adquisición</label>
            <select
              className="formModalSelect"
              value={disco.adquisicion}
              onChange={(e) => setDisco({ ...disco, adquisicion: e.target.value })}
            >
              <option value="">Con Exito / Fallo</option>
              <option value="con exito">Con Exito</option>
              <option value="fallo">Fallo</option>
            </select>
          </div>
        )}
        <div className="mt-2 flex w-full items-center justify-around">
          <input className="submitBtn" type="submit" value="Guardar" />
        </div>
      </form>
    </>
  );
}

export default AddDiscoModal;
