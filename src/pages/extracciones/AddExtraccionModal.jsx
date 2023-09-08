import React from "react";
import { AddTipoExtraccionModal } from "./index";
import Modal from "react-modal";
import { modal40x40 } from "utils/index";
import { PlusSquareDotted } from "@styled-icons/bootstrap/PlusSquareDotted";
import { Delete } from "@styled-icons/fluentui-system-filled/Delete";
import { removeTipoExtraccion } from "redux/actions";
import { useDispatch } from "react-redux";

export function AddExtraccionModal({ extracciones, setExtracciones, setAddExtraccionModal, toast }) {
  const dispatch = useDispatch();

  const localExtraccion = JSON.parse(localStorage.getItem("currentExtraccion"));
  const [addTipoExtraccionModal, setAddTipoExtraccionModal] = React.useState(false);
  const [tiposDeExtraccion, setTiposDeExtraccion] = React.useState([]);
  const [extraccion, setExtraccion] = React.useState(() => {
    if (localExtraccion) {
      setTiposDeExtraccion(localExtraccion.TipoExtraccions);
      return {
        ...localExtraccion,
        herramientaSoftVersion: "V0.00",
        tipoExtraccions: tiposDeExtraccion,
      };
    } else {
      return {
        herramientaSoft: "",
        herramientaSoftVersion: "V0.00",
        tipoExtraccions: tiposDeExtraccion,
      };
    }
  });

  React.useEffect(() => {
    return () => {
      localStorage.setItem("currentExtraccion", null);
    };
  }, []);

  React.useEffect(() => {
    setExtraccion({ ...extraccion, TipoExtraccions: tiposDeExtraccion });
  }, [tiposDeExtraccion]);

  const handleExtraccionSubmit = (e) => {
    e.preventDefault();
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

  const handleTipoExtraccionSubmit = (e, tipoExtraccion) => {
    e.preventDefault();
    if (tipoExtraccion.nombre && tipoExtraccion.estado) {
      setAddTipoExtraccionModal(false);
      setTiposDeExtraccion([...tiposDeExtraccion, tipoExtraccion]);
      toast.success("¡Tipos de extracción guardadas con éxito!");
    } else {
      toast.error("¡Faltan datos necesarios para el tipo de extracción!");
    }
  };

  const handleAddTipoExtraccionButtonClick = () => {
    setAddTipoExtraccionModal(!addTipoExtraccionModal);
  };

  const handleRemoveTipoExtraccion = (tEx) => {
    if (tEx.fakeId) {
      const newExtracciones = tiposDeExtraccion.filter((e) => e.fakeId !== tEx.fakeId);
      setTiposDeExtraccion(newExtracciones);
    } else {
      const newExtracciones = tiposDeExtraccion.filter((e) => e.id !== tEx.id);
      setTiposDeExtraccion(newExtracciones);
      dispatch(removeTipoExtraccion(tEx.id));
    }
    toast.success("¡Tipo de extracción eliminada con éxito!");
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
        <div className="flex w-full flex-1 flex-col items-center">
          <span className="basicLabel !text-md mb-8 !self-center !text-white">Extracciones</span>
          {tiposDeExtraccion.map((tEx) => (
            <div key={tEx.fakeId || tEx.id} className="mb-3 flex h-16 w-full items-center justify-around rounded-md bg-base p-2 text-black">
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
              {tEx.estado === "fallo" && (
                <div className="cardInfoContainer">
                  <span className="cardTitle">Observacion</span>
                  <br />
                  {tEx.observacionFalla}
                </div>
              )}
              <Delete onClick={() => handleRemoveTipoExtraccion(tEx)} size={20} className="icons" />
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
          <input className="submitBtn" value="Guardar" type="submit" />
        </div>
      </form>
      <Modal isOpen={addTipoExtraccionModal} style={modal40x40} ariaHideApp={false}>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="closeModalIcon"
          onClick={() => setAddTipoExtraccionModal(!addTipoExtraccionModal)}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <AddTipoExtraccionModal
          nombre={extraccion.herramientaSoft + " " + extraccion.herramientaSoftVersion}
          handleTipoExtraccionSubmit={handleTipoExtraccionSubmit}
        />
      </Modal>
    </>
  );
}
