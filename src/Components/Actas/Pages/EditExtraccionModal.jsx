import React from "react";
//* Style
import { PlusSquareDotted } from "@styled-icons/bootstrap/PlusSquareDotted";
import { DocumentEdit } from "@styled-icons/fluentui-system-regular/DocumentEdit";
import { AppsAddIn } from "@styled-icons/fluentui-system-regular/AppsAddIn";

function EditExtraccionModal({ setEditExtraccionesModal, setAddExtraccionModal, extracciones, renderAddExtraccionModal }) {
  const handleAddAnotherExtraccion = (e) => {
    e.preventDefault();
    setEditExtraccionesModal(false);
    setAddExtraccionModal(true);
    renderAddExtraccionModal();
  };

  const handleEditExtraccion = (e) => {
    console.log(e);
    setEditExtraccionesModal(false);
    //! Ver si aca no estoy haiendo algo mal cuando defino el localStorage
    localStorage.setItem("currentExtraccion", JSON.stringify({ ...e, edit: true }));
    setAddExtraccionModal(true);
    renderAddExtraccionModal();
  };

  return (
    <>
      <header className="modalHeader">
        <span data-aos="fade-down">Agregar o Editar Extracciones</span>
      </header>
      <div data-aos="zoom-in" className="flex h-64 max-h-[50%] w-full flex-col items-center overflow-y-scroll p-4">
        {extracciones.map((e) => (
          <div className={`flex h-14 w-full items-center rounded-md border-2 border-white bg-white`}>
            <div className="cardInfoContainer">
              <span className="cardTitle">Herramienta</span>
              <br />
              {e.herramientaSoft}
            </div>
            <div className="cardInfoContainer">
              <span className="cardTitle">Extracciones</span>
              <br />
              {e.TipoExtraccions.length}
            </div>
            <DocumentEdit className="icons mr-4 w-6" onClick={() => handleEditExtraccion(e)} />
          </div>
        ))}
        {extracciones.length === 0 && (
          <div className="flex h-full w-[50%] flex-col items-center justify-center">
            <span className="text-white">¡No hay extracciones, agrega una!</span>
            <AppsAddIn className="mt-2 w-10 text-white" />
          </div>
        )}
      </div>
      <div className="my-2 self-center">
        <PlusSquareDotted
          data-aos="zoom-in"
          className="icons !text-white hover:!text-secondary"
          size={35}
          onClick={(e) => handleAddAnotherExtraccion(e)}
        />
      </div>
    </>
  );
}

export default EditExtraccionModal;
