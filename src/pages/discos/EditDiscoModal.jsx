import React from "react";
import { Icons as I } from "assets";

export function EditDiscoModal({ setEditDiscosModal, setAddDiscosModal, discos, renderAddDiscoModal }) {
  const handleAddAnotherDisk = (e) => {
    e.preventDefault();
    setEditDiscosModal(false);
    setAddDiscosModal(true);
    renderAddDiscoModal();
  };

  const handleEditDisco = (disco) => {
    setEditDiscosModal(false);
    localStorage.setItem("currentDisco", JSON.stringify({ ...disco, edit: true }));
    setAddDiscosModal(true);
    renderAddDiscoModal();
  };

  return (
    <>
      <header className="modalHeader">Agregar o Editar Discos</header>
      <div data-aos="zoom-in" className="flex h-64 max-h-[50%] w-full flex-col items-center overflow-y-scroll p-4">
        {discos.map((d) => (
          <div className={`my-2 flex h-14  w-full items-center justify-center rounded-md border-2 border-white bg-white`}>
            {d.tipoDeDisco === "Disco Rígido" ? (
              <I.hdd className="ml-4 w-6 text-secondary" />
            ) : (
              <I.ssd className="ml-4 w-6 text-secondary" />
            )}
            <div className="cardInfoContainer">
              <span className="cardTitle">Marca</span>
              <br />
              {d.marca}
            </div>
            <div className="cardInfoContainer">
              <span className="cardTitle">S/N</span>
              <br />
              {d.serialNumber || "Ninguno"}
            </div>
            <div className="cardInfoContainer">
              <span className="cardTitle">Alm.</span>
              <br />
              {d.almacenamiento}
            </div>
            <div className="cardInfoContainer">
              <span className="cardTitle">Adquisicion</span>
              <br />
              {d.adquisicion}
            </div>
            <I.documentEdit className="icons mr-4 w-6" onClick={() => handleEditDisco(d)} />
          </div>
        ))}
        {discos.length === 0 && (
          <div className="flex h-full w-[50%] flex-col items-center justify-center">
            <span className="text-white">¡No hay Discos, agrega uno!</span>
            <I.appsAddIn className="mt-2 w-10 text-white" />
          </div>
        )}
      </div>
      <div className="my-2 self-center">
        <I.plusDotted
          data-aos="zoom-in"
          className="icons !text-white hover:!text-secondary"
          size={35}
          onClick={(e) => handleAddAnotherDisk(e)}
        />
      </div>
    </>
  );
}
