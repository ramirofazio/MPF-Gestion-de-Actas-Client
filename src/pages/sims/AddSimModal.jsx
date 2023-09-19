import React from "react";

export function AddSimModal({ sims, setSims, setAddSimsModal, toast }) {
  React.useEffect(() => {
    return () => {
      localStorage.setItem("currentSim", null);
    };
  });

  const [sim, setSim] = React.useState(
    JSON.parse(localStorage.getItem("currentSim")) || {
      empresaSim: "",
      serialSim: "",
      tipoExtraccionSim: "",
    }
  );

  const handleSimSubmit = (e) => {
    e.preventDefault();
    if (sim.tipoExtraccionSim) {
      setAddSimsModal(false);
      setSims([...sims, sim]);
      setSim({
        empresaSim: "",
        serialSim: "",
        tipoExtraccionSim: "",
      });
      if (sim.edit) {
        toast.success("¡Sim Editado con Exito!");
      } else {
        toast.success("¡Sim Guardado con Exito!");
      }
    } else {
      toast.error("¡Faltan datos necesarios para el Elemento!");
    }
  };
  return (
    <>
      <header className="modalHeader">
        <span data-aos="fade-down">{sim.edit ? "Editar Sim" : "Agregar SIM"}</span>
      </header>
      <form data-aos="zoom-in" className="flex w-full flex-col justify-center p-5 pt-0" onSubmit={handleSimSubmit}>
        <div className="modalInputContainer">
          <label className="basicLabel !text-white">Empresa Sim</label>
          <input
            className="formModalInput"
            type="text"
            name="empresa sim"
            value={sim.empresaSim}
            placeholder="Empresa Sim"
            onChange={(e) => setSim({ ...sim, empresaSim: e.target.value.toUpperCase() })}
          />
        </div>
        <div className="modalInputContainer">
          <label className="basicLabel !text-white">Serial Sim</label>
          <input
            className="formModalInput"
            type="text"
            name="serial sim"
            value={sim.serialSim}
            placeholder="Serial Sim"
            onChange={(e) => setSim({ ...sim, serialSim: e.target.value.toUpperCase() })}
          />
        </div>
        <div className="modalInputContainer">
          <label className="basicLabel !text-white">*Extracción</label>
          <select
            className="formModalSelect"
            value={sim.tipoExtraccionSim}
            onChange={(e) => setSim({ ...sim, tipoExtraccionSim: e.target.value })}
          >
            <option value="">Tipo de Extracción</option>
            <option value="en proceso">Pendiente</option>
            <option value="ninguna">Ninguna</option>
            <option value="física">Física</option>
            <option value="lógica ">Logica</option>
            <option value="sistema de archivos">Sistema de Archivos</option>
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
