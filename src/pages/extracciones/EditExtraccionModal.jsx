import React from "react";
import { useDispatch } from "react-redux";
import { Icons as I } from "assets";
import { toast } from "react-toastify";

export function EditExtraccionModal({ setEditExtraccionesModal, setAddExtraccionModal, extracciones, renderAddExtraccionModal }) {
  const dispatch = useDispatch();

  const [thisExtracciones, setThisExtracciones] = React.useState([...extracciones]);

  const handleAddAnotherExtraccion = (e) => {
    e.preventDefault();
    setEditExtraccionesModal(false);
    setAddExtraccionModal(true);
    renderAddExtraccionModal();
  };

  const handleEditExtraccion = (e) => {
    setEditExtraccionesModal(false);
    localStorage.setItem("currentExtraccion", JSON.stringify({ ...e, edit: true }));
    setAddExtraccionModal(true);
    renderAddExtraccionModal();
  };

  const handleRemoveExtraccion = (e) => {
    const newExtracciones = thisExtracciones.filter((ex) => ex.id !== e.id);
    setThisExtracciones(newExtracciones);
    dispatch(removeExtraccion(e.id));
    toast.success("¡Extracción eliminada con éxito!");
  };

  return (
    <>
      <header className="modalHeader">Agregar o Editar Herramientas</header>
      <div className="flex h-64 max-h-[50%] w-full flex-col items-center overflow-y-scroll p-4">
        {thisExtracciones.map((e, index) => (
          <div className={`mb-4 flex h-14 w-full items-center rounded-md border-2 border-white bg-white`} key={index}>
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
            <I.documentEdit className="icons mr-4 w-6" onClick={() => handleEditExtraccion(e)} />
            <I.trashCan onClick={() => handleRemoveExtraccion(e)} size={20} className="icons mr-4" />
          </div>
        ))}
        {thisExtracciones.length === 0 && (
          <div className="flex h-full w-[50%] flex-col items-center justify-center">
            <span className="text-white">¡No hay herramientas, agrega una!</span>
            <I.appsAddIn className="mt-2 w-10 text-white" />
          </div>
        )}
      </div>
      <div className="my-2 text-center">
        <I.plusDotted
          data-aos="zoom-in"
          className="icons !text-white hover:!text-secondary"
          size={35}
          onClick={(e) => handleAddAnotherExtraccion(e)}
        />
      </div>
    </>
  );
}
