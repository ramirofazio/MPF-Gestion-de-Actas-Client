import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
//* Redux
import { useSelector, useDispatch } from "react-redux";
import { createIntegrantes, removeIntegrante } from "../../../redux/actions";
//* Style
import { PersonAdd } from "@styled-icons/evaicons-solid/PersonAdd";
import { PersonRemove } from "@styled-icons/evaicons-solid/PersonRemove";
import { toast } from "react-toastify";

function AddIntegrantes() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentActa = useSelector((s) => JSON.parse(localStorage.getItem("currentActa")) || s.currentActa);
  const currentIntegrantes = useSelector((s) => JSON.parse(localStorage.getItem("currentIntegrantes")) || s.currentIntegrantes);

  const [integrantes, setIntegrantes] = React.useState(currentIntegrantes || []);
  const [integrante, setIntegrante] = React.useState({
    nombreYApellido: "",
    legajoOMatricula: "",
    cargo: "",
    locacion: "",
  });

  const handleAddIntegrante = () => {
    setIntegrantes([...integrantes, { ...integrante, acta_id: currentActa.id }]);
    setIntegrante({
      nombreYApellido: "",
      legajoOMatricula: "",
      cargo: "",
      locacion: "",
    });
  };

  const handleComplete = () => {
    //* Logica para habilitar el boton cuando esta todo completado
    const { nombreYApellido, legajoOMatricula, cargo, locacion } = integrante;

    if (nombreYApellido && legajoOMatricula && cargo && locacion) {
      return true;
    } else {
      return false;
    }
  };

  const handleRemove = (legajoOMatricula, id) => {
    dispatch(removeIntegrante(legajoOMatricula, id)); //* Si estoy editando, tengo que eliminar de la base de datos

    const newIntegrantes = integrantes.filter((i) => i.id !== id);
    localStorage.setItem("currentIntegrantes", JSON.stringify(newIntegrantes));
    setIntegrantes(newIntegrantes);
  };

  const handleSubmitIntegrantes = () => {
    if (integrantes.length > 0) {
      dispatch(createIntegrantes(integrantes));
    } else {
      toast.warning("¡Acta sin Integrantes!");
    }
  };

  return (
    <div className="paddingLeftContainer">
      <header className="header">
        <span data-aos="zoom-in" className="headerTitle">
          Creación de Integrantes
        </span>
      </header>
      <div className="flex min-h-[80%] w-full items-center justify-center  border-t-[3px] border-principal">
        <form className="mx-10 flex flex-[0.5] flex-col items-center justify-center">
          <div data-aos="fade-right" className="inputContainer flex-col">
            <label className="basicLabel">*Nombre y Apellido</label>
            <input
              className="formBigInput"
              disabled={currentActa.estado !== "en creacion"}
              type="text"
              name="nombreYApellido"
              value={integrante.nombreYApellido}
              placeholder="Nombre y Apellido"
              onChange={(e) => setIntegrante({ ...integrante, nombreYApellido: e.target.value })}
            />
          </div>

          <div data-aos="fade-left" className="inputContainer flex-col">
            <label className="basicLabel">*Legajo, matricula o DNI</label>
            <select
              className="formBigSelect"
              disabled={currentActa.estado !== "en creacion"}
              onChange={(e) => setIntegrante({ ...integrante, legajoOMatricula: e.target.value })}
            >
              <option>Seleccione una Opción</option>
              <option value="Legajo NRO° ">Legajo</option>
              <option value="Matricula NRO° ">Matricula</option>
              <option value="DNI NRO° ">DNI</option>
            </select>
          </div>

          <div data-aos="fade-left" className="inputContainer flex-col">
            <label className="basicLabel">*Legajo, matricula o DNI</label>
            <input
              className="formBigInput"
              disabled={currentActa.estado !== "en creacion"}
              type="text"
              name="legajoOMatricula"
              value={integrante.legajoOMatricula}
              placeholder="Legajo, matricula o DNI"
              onChange={(e) => setIntegrante({ ...integrante, legajoOMatricula: e.target.value })}
            />
          </div>
          <div data-aos="fade-right" className="inputContainer flex-col">
            <label className="basicLabel">*Cargo</label>
            <input
              className="formBigInput"
              disabled={currentActa.estado !== "en creacion"}
              type="text"
              name="cargo"
              value={integrante.cargo}
              placeholder="Cargo"
              onChange={(e) => setIntegrante({ ...integrante, cargo: e.target.value })}
            />
          </div>
          <div data-aos="fade-left" className="inputContainer flex-col">
            <label className="basicLabel">*Locacion</label>
            <select
              className="formBigSelect"
              value={integrante.locacion}
              onChange={(e) => setIntegrante({ ...integrante, locacion: e.target.value })}
              disabled={currentActa.estado !== "en creacion"}
            >
              <option value="">Locacion</option>
              <option value="presencial">Presencial</option>
              <option value="videollamada">Videollamada</option>
            </select>
          </div>
        </form>
        <div className="flex-[0.2]"></div>

        <div className="mx-10 flex h-full flex-[0.7] flex-col items-center justify-center overflow-y-scroll">
          {integrantes &&
            integrantes.map((i, index) => {
              return (
                <div
                  data-aos="zoom-in"
                  className="group mb-4 flex h-20 w-full items-center justify-around rounded-md border-2 border-principal px-4 shadow-md"
                  key={index}
                >
                  <div className="cardInfoContainer">
                    <span className="cardTitle text-md">Nombre y Apellido</span>
                    <br />
                    <span className="text-xs">{i.nombreYApellido}</span>
                  </div>
                  <div className="cardInfoContainer">
                    <span className="cardTitle text-md">Cargo</span>
                    <br />
                    <span className="text-xs">{i.cargo}</span>
                  </div>
                  <div className="cardInfoContainer">
                    <span className="cardTitle text-md">Locacion</span>
                    <br />
                    <span className="text-xs">{i.locacion}</span>
                  </div>
                  <PersonRemove
                    className="w-[25px] text-error transition hover:cursor-pointer hover:text-secondary group-hover:animate-pulse"
                    onClick={() =>
                      currentActa.estado !== "en creacion"
                        ? toast.error("¡No se puede eliminar un Integrante ya creado!")
                        : handleRemove(i.legajoOMatricula, i?.id)
                    }
                  />
                </div>
              );
            })}
        </div>
      </div>
      <div className="flex w-[50%] items-center justify-around">
        <NavLink className="basicBtnNoPadding px-10 py-2" onClick={() => navigate(-1)} to="#">
          Volver
        </NavLink>
        {currentActa.estado === "en creacion" && currentIntegrantes.length <= 0 ? (
          <>
            {integrante.nombreYApellido && integrante.legajoOMatricula && integrante.cargo && integrante.locacion ? (
              <NavLink
                className={`navLinkButtonPages group pointer-events-none border-2 border-error px-10 py-2 ${
                  handleComplete() && "pointer-events-auto animate-bounce border-success"
                }`}
                onClick={() => handleAddIntegrante()}
                to="#"
              >
                <PersonAdd className="mr-4 w-[25px] text-secondary transition group-hover:text-black" />
                Agregar a {integrante.nombreYApellido.split(" ")[0]}
              </NavLink>
            ) : (
              <NavLink className={"basicBtnNoPadding px-10 py-2"} onClick={() => handleSubmitIntegrantes()} to="/actas/crear/4">
                Siguente
              </NavLink>
            )}
          </>
        ) : (
          <>
            {integrante.nombreYApellido && integrante.legajoOMatricula && integrante.cargo && integrante.locacion && (
              <NavLink
                className={`navLinkButtonPages group pointer-events-none border-2 border-error px-10 py-2 ${
                  handleComplete() && "pointer-events-auto animate-bounce border-success"
                }`}
                onClick={() => handleAddIntegrante()}
                to="#"
              >
                <PersonAdd className="mr-4 w-[25px] text-secondary transition group-hover:text-black" />
                Agregar a {integrante.nombreYApellido.split(" ")[0]}
              </NavLink>
            )}

            {integrantes.length > currentIntegrantes.length ? (
              <NavLink className={"basicBtnNoPadding px-10 py-2"} onClick={() => handleSubmitIntegrantes()} to="/actas/crear/4">
                Siguente
              </NavLink>
            ) : (
              <NavLink className="basicBtnNoPadding px-10 py-2" to={"/actas/crear/4"}>
                Continuar
              </NavLink>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AddIntegrantes;
