import React from "react";
import { useDispatch } from "react-redux";
import { removeExtraccion } from "../../../redux/actions";
//* Style
import { PlusSquareDotted } from "@styled-icons/bootstrap/PlusSquareDotted";
import { DocumentEdit } from "@styled-icons/fluentui-system-regular/DocumentEdit";
import { AppsAddIn } from "@styled-icons/fluentui-system-regular/AppsAddIn";
import { Delete } from "@styled-icons/fluentui-system-filled/Delete";
import { toast } from "react-toastify";

function EditExtraccionModal({ setEditExtraccionesModal, setAddExtraccionModal, extracciones, renderAddExtraccionModal }) {
  const dispatch = useDispatch();

  const [thisExtracciones, setThisExtracciones] = React.useState([...extracciones]);

  console.log(extracciones);

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
      <header className="modalHeader">
        <span data-aos="fade-down">Agregar o Editar Extracciones</span>
      </header>
      <div data-aos="zoom-in" className="flex h-64 max-h-[50%] w-full flex-col items-center overflow-y-scroll p-4">
        {thisExtracciones.map((e) => (
          <div className={`mb-4 flex h-14 w-full items-center rounded-md border-2 border-white bg-white`}>
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
            <Delete onClick={() => handleRemoveExtraccion(e)} size={20} className="icons mr-4" />
          </div>
        ))}
        {thisExtracciones.length === 0 && (
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
