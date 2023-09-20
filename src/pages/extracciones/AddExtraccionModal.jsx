import { useState, useEffect } from "react";
import { removeTipoExtraccion } from "redux/actions";
import { useDispatch } from "react-redux";
import { AddTipoExtraccionModal } from "./index";
import { Icons as I } from "assets/index";
import { HerramientasSoft, CardElement, Input, Select, BaseModal } from "components/index";

export function AddExtraccionModal({ extracciones, setExtracciones, setAddExtraccionModal, toast }) {
  const dispatch = useDispatch();
  const [addTipoExtraccionModal, setAddTipoExtraccionModal] = useState(false);
  const [tiposDeExtraccion, setTiposDeExtraccion] = useState([]);
  const [extraccion, setExtraccion] = useState({
    edit: false,
    herramientaSoft: "",
    herramientaSoftVersion: "",
    TipoExtraccions: tiposDeExtraccion,
  });

  useEffect(() => {
    const localExtraccion = JSON.parse(localStorage.getItem("currentExtraccion"));
    if (localExtraccion) {
      const VIndex = localExtraccion.herramientaSoft.lastIndexOf("V");
      setExtraccion({
        ...localExtraccion,
        herramientaSoft: localExtraccion.herramientaSoft.slice(0, VIndex).trim(),
        herramientaSoftVersion: localExtraccion.herramientaSoft.slice(VIndex),
      });
      setTiposDeExtraccion(localExtraccion.TipoExtraccions);
    }

    return () => {
      localStorage.setItem("currentExtraccion", null);
    };
  }, []);

  const handleExtraccionSubmit = (e) => {
    e.preventDefault();
    if (extraccion.herramientaSoft && extraccion.TipoExtraccions?.length > 0) {
      setAddExtraccionModal(false);
      setExtracciones([
        ...extracciones,
        { ...extraccion, herramientaSoft: extraccion.herramientaSoft + " " + extraccion.herramientaSoftVersion },
      ]);
      setExtraccion({
        herramientaSoft: "",
        herramientaSoftVersion: "V0.00",
        TipoExtraccions: tiposDeExtraccion,
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
      setExtraccion({ ...extraccion, TipoExtraccions: [...tiposDeExtraccion, tipoExtraccion] });
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

  console.log(extraccion);

  return (
    <>
      <header className="modalHeader">Agregar Extracciones</header>
      <form className="flex h-full w-full flex-col justify-center p-5 pt-0" onSubmit={handleExtraccionSubmit}>
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
          placeholder="V0.00"
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
          <I.plusDotted
            className={`icons w-10 !text-white ${
              extraccion.herramientaSoft && extraccion.herramientaSoftVersion ? "hover:!text-secondary" : "!text-secondary"
            }`}
            onClick={() =>
              extraccion.herramientaSoft && extraccion.herramientaSoftVersion
                ? handleAddTipoExtraccionButtonClick()
                : toast.warning("¡Primero debe seleccionar una heramienta de software y Versión!")
            }
          />
        </div>
        <div className="inputContainer !pb-0 pt-4">
          <input className="submitBtn" value="Guardar" type="submit" />
        </div>
      </form>
      <BaseModal
        isOpen={addTipoExtraccionModal}
        close={setAddTipoExtraccionModal}
        content={
          <AddTipoExtraccionModal
            nombre={extraccion.herramientaSoft + " " + extraccion.herramientaSoftVersion}
            handleTipoExtraccionSubmit={handleTipoExtraccionSubmit}
          />
        }
      />
    </>
  );
}
