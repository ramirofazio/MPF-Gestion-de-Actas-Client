import React from "react";
//* Style
import { SdCardMini } from "@styled-icons/remix-fill/SdCardMini";
import { PlusSquareDotted } from "@styled-icons/bootstrap/PlusSquareDotted";
import { DocumentEdit } from "@styled-icons/fluentui-system-regular/DocumentEdit";
import { AppsAddIn } from "@styled-icons/fluentui-system-regular/AppsAddIn";

function EditSdsModal({ setEditSdsModal, setAddSdsModal, sds, renderAddSdModal }) {
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
      <header className="modalHeader">
        <span data-aos="fade-down">Agregar o Editar Sds</span>
      </header>
      <div data-aos="zoom-in" className="flex h-64 max-h-[50%] w-full flex-col items-center overflow-y-scroll p-4">
        {sds.map((s) => (
          <div className={`flex h-14 w-full items-center justify-center rounded-md border-2 border-white bg-white`}>
            <SdCardMini className="ml-4 w-6 text-secondary" />
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
            <DocumentEdit className="icons mr-4 w-6" onClick={() => handleEditSds(s)} />
          </div>
        ))}
        {sds.length === 0 && (
          <div className="flex h-full w-[50%] flex-col items-center justify-center">
            <span className="text-white">¡No hay Sds, agrega una!</span>
            <AppsAddIn className="mt-2 w-10 text-white" />
          </div>
        )}
      </div>
      <div className="my-2 self-center">
        <PlusSquareDotted
          data-aos="zoom-in"
          className="icons !text-white hover:!text-secondary"
          size={35}
          onClick={(e) => handleAddAnotherSd(e)}
        />
      </div>
    </>
  );
}

export default EditSdsModal;
