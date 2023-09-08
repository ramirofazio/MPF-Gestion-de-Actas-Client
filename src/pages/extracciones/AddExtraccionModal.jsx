import { useState, useEffect } from "react";
import { removeTipoExtraccion } from "redux/actions";
import { useDispatch } from "react-redux";
import { AddTipoExtraccionModal } from "./index";
import Modal from "react-modal";
import { modal40x40 } from "utils/index";
import { Icons as I } from "assets/index";
import { HerramientasSoft, CardElement, Input, Select } from "components/index";

export function AddExtraccionModal({ extracciones, setExtracciones, setAddExtraccionModal, toast }) {
  const dispatch = useDispatch();

  const [addTipoExtraccionModal, setAddTipoExtraccionModal] = useState(false);
  const [tiposDeExtraccion, setTiposDeExtraccion] = useState([]);
  const [extraccion, setExtraccion] = useState({
    herramientaSoft: "",
    herramientaSoftVersion: "V0.00",
    tipoExtraccions: tiposDeExtraccion,
  });

  useEffect(() => {
    const localExtraccion = JSON.parse(localStorage.getItem("currentExtraccion"));
    if (localExtraccion) {
      console.log(localExtraccion);
      setTiposDeExtraccion(localExtraccion.TipoExtraccions);
      setExtraccion({
        herramientaSoft: localExtraccion.herramientaSoft,
        herramientaSoftVersion: localExtraccion.herramientaSoft.slice(localExtraccion.herramientaSoft.lastIndexOf("V")),
        tipoExtraccions: tiposDeExtraccion,
      });
    } else {
      return {
        herramientaSoft: "",
        herramientaSoftVersion: "V0.00",
        tipoExtraccions: tiposDeExtraccion,
      };
    }

    return () => {
      () => localStorage.setItem("currentExtraccion", null);
    };
  }, []);

  useEffect(() => {
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

  const handleOnChangeExtraccion = (e) => {
    const { name, value } = e.target;
    setExtraccion({
      ...extraccion,
      [name]: value,
    });
  };

  return (
    <>
      <header className="modalHeader" data-aos="fade-down">
        Agregar Extracciones
      </header>
      <form data-aos="zoom-in" className="flex h-full w-full flex-col justify-center p-5 pt-0" onSubmit={handleExtraccionSubmit}>
        <Select
          label="software"
          value={extraccion.herramientaSoft}
          onChange={(e) => {
            handleOnChangeExtraccion(e);
          }}
          name="herramientaSoft"
          options={<HerramientasSoft />}
        />
        <Input
          label="versión"
          value={extraccion.herramientaSoftVersion}
          name="herramientaSoftVersion"
          onChange={(e) => handleOnChangeExtraccion(e)}
        />
        <div className="flex w-full flex-1 flex-col items-center">
          <span className="basicLabel !text-md mb-8 !self-center !text-white">Extracciones</span>
          {tiposDeExtraccion.map((tEx) => (
            <div key={tEx.fakeId || tEx.id} className="mb-3 flex h-16 w-full items-center justify-around rounded-md bg-base p-2 text-black">
              <CardElement title={"tipo"} value={tEx.nombre} />
              <CardElement title={"estado"} value={tEx.estado} />
              {tEx.estado === "fallo" && <CardElement title={"observacion"} value={tEx.observacionFalla} />}
              <I.trashCan onClick={() => handleRemoveTipoExtraccion(tEx)} className="icons mr-2 w-4 text-white" />
            </div>
          ))}
          {extraccion.herramientaSoft && (
            <I.plusDotted
              data-aos="zoom-in"
              className="icons w-10 !text-white hover:!text-secondary"
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
        <I.close className="closeModalIcon" onClick={() => setAddTipoExtraccionModal(!addTipoExtraccionModal)} />
        <AddTipoExtraccionModal
          nombre={extraccion.herramientaSoft + " " + extraccion.herramientaSoftVersion}
          handleTipoExtraccionSubmit={handleTipoExtraccionSubmit}
        />
      </Modal>
    </>
  );
}
