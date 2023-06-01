import React from "react";
//*Components
import AddTipoExtraccionModal from "./AddTipoExtraccionModal";
//* Style
import Modal from "react-modal";
import GlobalStyles from "../../../Styles/GlobalStyles";
import { PlusSquareDotted } from "@styled-icons/bootstrap/PlusSquareDotted";
import { Delete } from "@styled-icons/fluentui-system-filled/Delete";
//* Initializations
const { modal40x40 } = GlobalStyles;

function AddExtraccionModal({ extracciones, setExtracciones, setAddExtraccionModal, toast }) {
  React.useEffect(() => {
    return () => {
      localStorage.setItem("currentExtraccion", null);
    };
  });

  const [addTipoExtraccionModal, setAddTipoExtraccionModal] = React.useState(false);

  const [tiposDeExtraccion, setTiposDeExtraccion] = React.useState([]);
  const [extraccion, setExtraccion] = React.useState(
    JSON.parse(localStorage.getItem("currentExtraccion")) || {
      herramientaSoft: "",
      tipos: tiposDeExtraccion,
    }
  );

  const handleExtraccionSubmit = (e) => {
    e.preventDefault();
    if (extraccion.herramientaSoft && extraccion.tipos.length > 0) {
      setAddExtraccionModal(false);
      setExtracciones([...extracciones, extraccion]);
      setExtraccion({
        herramientaSoft: "",
        tipos: tiposDeExtraccion,
      });
      if (extraccion.edit) {
        toast.success("Extraccion Editada con Exito!");
      } else {
        toast.success("Extraccion Guardada con Exito!");
      }
    } else {
      toast.error("¡Faltan datos necesarios para la extraccion!");
    }
  };

  React.useEffect(() => {
    setExtraccion({ ...extraccion, tipos: tiposDeExtraccion });
  }, [tiposDeExtraccion]);

  const handleTipoExtraccionSubmit = (e, tipoExtraccion) => {
    e.preventDefault();
    if (tipoExtraccion.nombre && tipoExtraccion.estado) {
      setAddTipoExtraccionModal(false);
      setTiposDeExtraccion([...tiposDeExtraccion, tipoExtraccion]);
      toast.success("¡Tipos de extraccion guardadas con exito!");
    } else {
      toast.error("¡Faltan datos necesarios para el tipo de extraccion!");
    }
  };

  const handleAddTipoExtraccionButtonClick = () => {
    setAddTipoExtraccionModal(!addTipoExtraccionModal);
  };

  const handleRemoveTipoExtraccion = (fakeId) => {
    const newExtracciones = tiposDeExtraccion.filter((e) => e.fakeId !== fakeId);
    setTiposDeExtraccion(newExtracciones);
    toast.success("¡Tipo de extraccion eliminada con exito!");
  };

  return (
    <>
      <header className="modalHeader">
        <span data-aos="fade-down">Agregar Extracciones</span>
      </header>
      <form data-aos="zoom-in" className="flex h-full w-full flex-col justify-center p-5 pt-0" onSubmit={handleExtraccionSubmit}>
        <div className="modalInputContainer">
          <label className="basicLabel !text-white">Software</label>
          <select
            className="formModalSelect"
            value={extraccion.herramientaSoft}
            onChange={(e) => {
              console.log(e.target.value);
              setExtraccion({ ...extraccion, herramientaSoft: e.target.value });
            }}
          >
            <option value="">Seleccione Herramienta</option>
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
        <div className="flex w-full flex-1 flex-col items-center">
          <span className="basicLabel !text-md mb-8 !self-center !text-white">Extracciones</span>
          {tiposDeExtraccion &&
            tiposDeExtraccion.map((e) => (
              <div key={e.fakeId} className="mb-3 flex h-16 w-full items-center justify-around rounded-md bg-base p-2 text-black">
                <div className="cardInfoContainer">
                  <span className="cardTitle">Tipo</span>
                  <br />
                  {e.nombre}
                </div>
                <div className="cardInfoContainer">
                  <span className="cardTitle">Estado</span>
                  <br />
                  {e.estado}
                </div>
                {e.estado === "fallo" && (
                  <div className="cardInfoContainer">
                    <span className="cardTitle">Observacion</span>
                    <br />
                    {e.observacionFalla}
                  </div>
                )}
                <Delete onClick={() => handleRemoveTipoExtraccion(e.fakeId)} size={20} className="icons" />
              </div>
            ))}
          {extraccion.herramientaSoft && (
            <PlusSquareDotted
              data-aos="zoom-in"
              className="icons !text-white hover:!text-secondary"
              size={35}
              onClick={() =>
                extraccion.herramientaSoft
                  ? handleAddTipoExtraccionButtonClick()
                  : toast.warning("¡Primero debe seleccionar una heramienta de software!")
              }
            />
          )}
        </div>
        <div className="inputContainer !pb-0 pt-4">
          <input class="submitBtn" value="Guardar" type="submit" />
        </div>
      </form>
      <Modal isOpen={addTipoExtraccionModal} style={modal40x40} ariaHideApp={false}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="closeModalIcon"
          onClick={() => setAddTipoExtraccionModal(!addTipoExtraccionModal)}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <AddTipoExtraccionModal nombre={extraccion.herramientaSoft} handleTipoExtraccionSubmit={handleTipoExtraccionSubmit} />
      </Modal>
    </>
  );
}

export default AddExtraccionModal;
