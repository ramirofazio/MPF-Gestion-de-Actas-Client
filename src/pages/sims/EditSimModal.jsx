import React from "react";
//* Style
import { Icons as I } from "assets";

export function EditSimModal({ setEditSimsModal, setAddSimsModal, sims, renderAddSimModal }) {
  const handleAddAnotherSim = (e) => {
    e.preventDefault();
    setEditSimsModal(false);
    setAddSimsModal(true);
    renderAddSimModal();
  };

  const handleEditSim = (sim) => {
    setEditSimsModal(false);
    localStorage.setItem("currentSim", JSON.stringify({ ...sim, edit: true }));
    setAddSimsModal(true);
    renderAddSimModal();
  };

  return (
    <>
      <header className="modalHeader">
        <span data-aos="fade-down">Agregar o Editar Sims</span>
      </header>
      <div data-aos="zoom-in" className="flex h-64 max-h-[50%] w-full flex-col items-center overflow-y-scroll p-4">
        {sims.map((s) => (
          <div className={`flex h-14 w-full items-center justify-center rounded-md border-2 border-white bg-white`}>
            <I.simCard className="ml-4 w-6 text-secondary" />
            <div className="cardInfoContainer">
              <span className="cardTitle">Empresa</span>
              <br />
              {s.empresaSim}s
            </div>
            <div className="cardInfoContainer">
              <span className="cardTitle">S/N</span>
              <br />
              {s.serialSim || "Ninguno"}
            </div>

            <div className="cardInfoContainer">
              <span className="cardTitle">Extraccion</span>
              <br />
              {s.tipoExtraccionSim || "Ninguna"}
            </div>
            <I.documentEdit className="icons mr-4 w-6" onClick={() => handleEditSim(s)} />
          </div>
        ))}
        {sims.length === 0 && (
          <div className="flex h-full w-[50%] flex-col items-center justify-center">
            <span className="text-white">¡No hay Sims, agrega una!</span>
            <I.appsAddIn className="mt-2 w-10 text-white" />
          </div>
        )}
      </div>
      <div className="my-2 self-center">
        <I.plusSquareDotted
          data-aos="zoom-in"
          className="icons !text-white hover:!text-secondary"
          size={35}
          onClick={(e) => handleAddAnotherSim(e)}
        />
      </div>
    </>
  );
}
