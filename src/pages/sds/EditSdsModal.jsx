import React from "react";
import { Icons as I } from "assets";

export function EditSdsModal({ setEditSdsModal, setAddSdsModal, sds, renderAddSdModal }) {
  const handleAddAnotherSd = (e) => {
    e.preventDefault();
    setEditSdsModal(false);
    setAddSdsModal(true);
    renderAddSdModal();
  };

  const handleEditSds = (sds) => {
    setEditSdsModal(false);
    localStorage.setItem("currentSd", JSON.stringify({ ...sds, edit: true }));
    setAddSdsModal(true);
    renderAddSdModal();
  };

  return (
    <>
      <header className="modalHeader">Agregar o Editar Sds</header>
      <div className="flex h-64 max-h-[50%] w-full flex-col items-center overflow-y-scroll p-4">
        {sds.map((s) => (
          <div className={`flex h-14 w-full items-center justify-center rounded-md border-2 border-white bg-white`}>
            <I.sdCard className="ml-4 w-6 text-secondary" />
            <div className="cardInfoContainer">
              <span className="cardTitle">Empresa</span>
              <br />
              {s.marca}
            </div>
            <div className="cardInfoContainer">
              <span className="cardTitle">S/N</span>
              <br />
              {s.serialSd || "Ninguno"}
            </div>

            <div className="cardInfoContainer">
              <span className="cardTitle">Extraccion</span>
              <br />
              {s.tipoExtraccionSd || "Ninguna"}
            </div>
            <I.documentEdit className="icons mr-4 w-6" onClick={() => handleEditSds(s)} />
          </div>
        ))}
        {sds.length === 0 && (
          <div className="flex h-full w-[50%] flex-col items-center justify-center">
            <span className="text-white">¡No hay Sds, agrega una!</span>
            <I.appsAddIn className="mt-2 w-10 text-white" />
          </div>
        )}
      </div>
      <div className="my-2 self-center">
        <I.plusDotted
          data-aos="zoom-in"
          className="icons !text-white hover:!text-secondary"
          size={35}
          onClick={(e) => handleAddAnotherSd(e)}
        />
      </div>
    </>
  );
}
