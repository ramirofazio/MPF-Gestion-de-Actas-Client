// Importación de módulos y componentes necesarios
import React from "react";
import AddTipoExtraccionModal from "./AddTipoExtraccionModal";
import Modal from "react-modal";
import { modal40x40 } from "../../helpers/globalVariables";
import { PlusSquareDotted } from "@styled-icons/bootstrap/PlusSquareDotted";
import { Delete } from "@styled-icons/fluentui-system-filled/Delete";
import { removeTipoExtraccion } from "../../redux/actions";
import { useDispatch } from "react-redux";

// Definición del componente funcional AddExtraccionModal
function AddExtraccionModal({ extracciones, setExtracciones, setAddExtraccionModal, toast }) {
  const dispatch = useDispatch();
  // Obtener el valor de "currentExtraccion" del localStorage
  const localExtraccion = JSON.parse(localStorage.getItem("currentExtraccion"));

  // Estado local para el modal de agregar tipo de extracción
  const [addTipoExtraccionModal, setAddTipoExtraccionModal] = React.useState(false);

  // Estado local para los tipos de extracción y la extracción actual
  const [tiposDeExtraccion, setTiposDeExtraccion] = React.useState([]);
  const [extraccion, setExtraccion] = React.useState(() => {
    // Establecer los tipos de extracción y la extracción actual a partir del valor en localStorage
    if (localExtraccion) {
      setTiposDeExtraccion(localExtraccion.TipoExtraccions);
      return {
        ...localExtraccion,
        herramientaSoftVersion: "V0.00",
        tipoExtraccions: tiposDeExtraccion,
      };
    } else {
      // Establecer la extracción actual con valores iniciales si no hay valor en localStorage
      return {
        herramientaSoft: "",
        herramientaSoftVersion: "V0.00",
        tipoExtraccions: tiposDeExtraccion,
      };
    }
  });

  // Efecto secundario para limpiar el valor en localStorage
  React.useEffect(() => {
    return () => {
      localStorage.setItem("currentExtraccion", null);
    };
  }, []);

  // Efecto secundario para actualizar la extracción actual cuando cambian los tipos de extracción
  React.useEffect(() => {
    setExtraccion({ ...extraccion, TipoExtraccions: tiposDeExtraccion });
  }, [tiposDeExtraccion]);

  // Manejador de envío de la extracción
  const handleExtraccionSubmit = (e) => {
    e.preventDefault();
    // Verificar que se haya seleccionado una herramienta y se hayan agregado tipos de extracción
    if (extraccion.herramientaSoft && extraccion.TipoExtraccions.length > 0) {
      setAddExtraccionModal(false);
      setExtracciones([
        ...extracciones,
        { ...extraccion, herramientaSoft: extraccion.herramientaSoft + " " + extraccion.herramientaSoftVersion },
      ]);
      setExtraccion({
        herramientaSoft: "",
        herramientaSoftVersion: "V0.00",
        tipoExtraccions: tiposDeExtraccion,
      });
      if (extraccion.edit) {
        toast.success("¡Extracción editada con éxito!");
      } else {
        toast.success("¡Extracción guardada con éxito!");
      }
    } else {
      toast.error("¡Faltan datos necesarios para la extracción!");
    }
  };

  // Manejador de envío de un tipo de extracción
  const handleTipoExtraccionSubmit = (e, tipoExtraccion) => {
    e.preventDefault();
    // Verificar que se haya proporcionado el nombre y el estado del tipo de extracción
    if (tipoExtraccion.nombre && tipoExtraccion.estado) {
      setAddTipoExtraccionModal(false);
      setTiposDeExtraccion([...tiposDeExtraccion, tipoExtraccion]);
      toast.success("¡Tipos de extracción guardadas con éxito!");
    } else {
      toast.error("¡Faltan datos necesarios para el tipo de extracción!");
    }
  };

  // Manejador para mostrar u ocultar el modal de agregar tipo de extracción
  const handleAddTipoExtraccionButtonClick = () => {
    setAddTipoExtraccionModal(!addTipoExtraccionModal);
  };

  // Manejador para eliminar un tipo de extracción
  const handleRemoveTipoExtraccion = (tEx) => {
    if (tEx.fakeId) {
      //* Local no DB
      const newExtracciones = tiposDeExtraccion.filter((e) => e.fakeId !== tEx.fakeId);
      setTiposDeExtraccion(newExtracciones);
    } else {
      //* DB
      const newExtracciones = tiposDeExtraccion.filter((e) => e.id !== tEx.id);
      setTiposDeExtraccion(newExtracciones);
      dispatch(removeTipoExtraccion(tEx.id));
    }
    toast.success("¡Tipo de extracción eliminada con éxito!");
  };

  return (
    <>
      {/* Encabezado del modal */}
      <header className="modalHeader">
        <span data-aos="fade-down">Agregar Extracciones</span>
      </header>
      {/* Formulario de extracción */}
      <form data-aos="zoom-in" className="flex h-full w-full flex-col justify-center p-5 pt-0" onSubmit={handleExtraccionSubmit}>
        <div className="modalInputContainer">
          <label className="basicLabel !text-white">Software</label>
          {/* Selección de herramienta de software */}
          <select
            className="formModalSelect"
            value={extraccion.herramientaSoft}
            onChange={(e) => {
              setExtraccion({ ...extraccion, herramientaSoft: e.target.value });
            }}
          >
            <option value="">Seleccione Herramienta</option>
            <option value="Cellebrite, UFED 4PC">UFED 4PC</option>
            <option value="Cellebrite, UFED PREMIUM">UFED PREMIUM</option>
            <option value="Magnet, AXIOM">AXIOM</option>
            <option value="Opentext, ENCASE">ENCASE</option>
            <option value="Grayshift, GREYKEY">GREYKEY</option>
            <option value="Magnet, DVR EXAMINER">DVR EXAMINER</option>
            <option value="TABLEAU TX1">TABLEAU TX1</option>
            <option value="TABLEAU TD3">TABLEAU TD3</option>
            <option value="TABLEAU FORENSIC BRIDGE (bloqueador de escritura)">TABLEAU FORENSIC BRIDGE (bloqueador de escritura)</option>
          </select>
        </div>
        <div className="modalInputContainer">
          <label className="basicLabel !text-white">Versión</label>
          <input
            type="text"
            className="formModalInput"
            value={extraccion.herramientaSoftVersion}
            onChange={(e) => {
              setExtraccion({ ...extraccion, herramientaSoftVersion: e.target.value });
            }}
          />
        </div>
        {/* Lista de tipos de extracción */}
        <div className="flex w-full flex-1 flex-col items-center">
          <span className="basicLabel !text-md mb-8 !self-center !text-white">Extracciones</span>
          {tiposDeExtraccion.map((tEx) => (
            <div key={tEx.fakeId || tEx.id} className="mb-3 flex h-16 w-full items-center justify-around rounded-md bg-base p-2 text-black">
              {/* Información del tipo de extracción */}
              <div className="cardInfoContainer">
                <span className="cardTitle">Tipo</span>
                <br />
                {tEx.nombre}
              </div>
              <div className="cardInfoContainer">
                <span className="cardTitle">Estado</span>
                <br />
                {tEx.estado}
              </div>
              {/* Mostrar observación si el estado es "fallo" */}
              {tEx.estado === "fallo" && (
                <div className="cardInfoContainer">
                  <span className="cardTitle">Observacion</span>
                  <br />
                  {tEx.observacionFalla}
                </div>
              )}
              {/* Botón para eliminar el tipo de extracción */}
              <Delete onClick={() => handleRemoveTipoExtraccion(tEx)} size={20} className="icons" />
            </div>
          ))}
          {/* Botón para agregar un nuevo tipo de extracción */}
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
          {/* Botón de guardar */}
          <input className="submitBtn" value="Guardar" type="submit" />
        </div>
      </form>
      {/* Modal para agregar tipo de extracción */}
      <Modal isOpen={addTipoExtraccionModal} style={modal40x40} ariaHideApp={false}>
        {/* Icono para cerrar el modal */}
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
        {/* Componente para agregar tipo de extracción */}
        <AddTipoExtraccionModal
          nombre={extraccion.herramientaSoft + " " + extraccion.herramientaSoftVersion}
          handleTipoExtraccionSubmit={handleTipoExtraccionSubmit}
        />
      </Modal>
    </>
  );
}

export default AddExtraccionModal;
