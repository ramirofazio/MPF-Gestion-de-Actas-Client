import { useEffect, useState } from "react";
import { Input, Select, TipoExtracciones } from "components/fields";

export function AddSimModal({ sims, setSims, setAddSimsModal, toast }) {
  useEffect(() => {
    return () => {
      localStorage.setItem("currentSim", null);
    };
  });

  const [sim, setSim] = useState(
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
      <header className="modalHeader" data-aos="fade-down">
        {sim.edit ? "Editar Sim" : "Agregar SIM"}
      </header>
      <form data-aos="zoom-in" className="flex w-full flex-col justify-center p-5 pt-0" onSubmit={handleSimSubmit}>
        <Input
          label={"Empresa Sim"}
          value={sim.empresaSim}
          placeholder="Empresa Sim"
          onChange={(e) => setSim({ ...sim, empresaSim: e.target.value.toUpperCase() })}
        />
        <Input
          label={"Serial Sim"}
          value={sim.serialSim}
          placeholder="Serial Sim"
          onChange={(e) => setSim({ ...sim, serialSim: e.target.value.toUpperCase() })}
        />
        <Select
          label={"*Extracción"}
          options={<TipoExtracciones />}
          value={sim.tipoExtraccionSim}
          onChange={(e) => setSim({ ...sim, tipoExtraccionSim: e.target.value })}
        />
        <div className="mt-2 flex w-full items-center justify-around">
          <input className="submitBtn " type="submit" value="Guardar" />
        </div>
      </form>
    </>
  );
}
