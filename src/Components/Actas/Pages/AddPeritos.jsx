import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
//* Redux
import { useSelector, useDispatch } from "react-redux";
import { createPeritos, removePerito } from "../../../redux/actions";
//* Style
import { PersonAdd } from "@styled-icons/evaicons-solid/PersonAdd";
import { PersonRemove } from "@styled-icons/evaicons-solid/PersonRemove";
import { toast } from "react-toastify";

function AddPeritos() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentActa = useSelector((s) => JSON.parse(localStorage.getItem("currentActa")) || s.currentActa);
  const currentPeritos = useSelector((s) => JSON.parse(localStorage.getItem("currentPeritos")) || s.currentPeritos);
  const users = useSelector((s) => JSON.parse(localStorage.getItem("users")) || s.users);

  const [peritos, setPeritos] = React.useState(currentPeritos);
  const [perito, setPerito] = React.useState({
    nombreYApellido: "",
    legajo: "",
    cargo: "",
  });

  const handleAddPerito = () => {
    setPeritos([...peritos, { ...perito, acta_id: currentActa.id }]);
    setPerito({
      nombreYApellido: "",
      legajo: "",
      cargo: "",
    });
  };

  const handleComplete = () => {
    //* Logica para habilitar el boton cuando esta todo completado
    const { nombreYApellido, legajo } = perito;

    if (nombreYApellido && legajo) {
      return true;
    } else {
      return false;
    }
  };

  const handleRemove = (legajo, id) => {
    if (id) {
      dispatch(removePerito(legajo, id)); //* Si estoy editando, tengo que eliminar de la base de datos
    }

    const newPeritos = peritos.filter((p) => p.legajo !== legajo);
    localStorage.setItem("currentPeritos", JSON.stringify(newPeritos));
    setPeritos(newPeritos);
  };

  const handleSubmitPeritos = () => {
    dispatch(createPeritos(peritos, navigate));
  };

  const peritoSelected = (value) => {
    if (value === "") {
      setPerito({
        nombreYApellido: "",
        legajo: "",
        cargo: "",
      });
    } else {
      let p = JSON.parse(value);
      setPerito({
        nombreYApellido: p.nombreYApellido,
        cargo: p.cargo,
        legajo: p.legajo,
      });
    }
  };
  return (
    <div className="paddingLeftContainer">
      <header className="header">
        <span data-aos="zoom-in" className="headerTitle">
          Creación de Peritos
        </span>
      </header>
      <div className="flex min-h-[80%] w-full items-center justify-center  border-t-[3px] border-principal">
        <form className="mx-10 flex flex-[0.5] flex-col items-center justify-center">
          <div data-aos="fade-right" className="inputContainer flex-col">
            <label className="basicLabel">*Elegir Perito</label>
            <select
              value={""}
              className="formBigSelect"
              onChange={(e) => peritoSelected(e.target.value)}
              disabled={currentActa.estado !== "en creacion"}
            >
              <option value="">Elegir Perito</option>
              {users && users.map((u) => u.username !== "admin" && <option value={JSON.stringify(u)}>{u.nombreYApellido}</option>)}
            </select>
          </div>
          <div data-aos="fade-left" className="inputContainer flex-col">
            <label className="basicLabel">Nombre y Apellido</label>
            <input
              className="formBigInput"
              disabled={true}
              type="text"
              name="nombreYApellido"
              value={perito.nombreYApellido}
              placeholder="Nombre y Apellido"
              onChange={(e) => setPerito({ ...perito, nombreYApellido: e.target.value })}
            />
          </div>
          <div data-aos="fade-right" className="inputContainer flex-col">
            <label className="basicLabel">Legajo</label>
            <input
              className="formBigInput"
              disabled={true}
              type="number"
              name="legajo"
              value={perito.legajo}
              placeholder="Legajo"
              onChange={(e) => setPerito({ ...perito, legajo: e.target.value })}
            />
          </div>
          <div data-aos="fade-left" className="inputContainer flex-col">
            <label className="basicLabel">Cargo</label>
            <input
              className="formBigInput"
              disabled={true}
              type="text"
              name="cargo"
              value={perito.cargo}
              placeholder="Cargo"
              onChange={(e) => setPerito({ ...perito, cargo: e.target.value })}
            />
          </div>
        </form>
        <div className="flex-[0.2]"></div>

        <div className="mx-10 flex h-full flex-[0.7] flex-col items-center justify-center overflow-y-scroll">
          {peritos &&
            peritos.map((i, index) => {
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
                    <span className="cardTitle text-md">Legajo</span>
                    <br />
                    <span className="text-xs">{i.legajo}</span>
                  </div>
                  <div className="cardInfoContainer">
                    <span className="cardTitle text-md">Cargo</span>
                    <br />
                    <span className="text-xs">{i.cargo}</span>
                  </div>
                  <PersonRemove
                    className="w-[25px] text-error transition hover:cursor-pointer hover:text-secondary group-hover:animate-pulse"
                    onClick={() =>
                      currentActa.estado !== "en creacion"
                        ? toast.error("¡No se puede eliminar un Perito ya creado!")
                        : handleRemove(i.legajo, i.id)
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
        {currentActa.estado === "en creacion" && currentPeritos.length <= 0 ? (
          <>
            {perito.nombreYApellido && perito.legajo ? (
              <NavLink
                className={`navLinkButtonPages group pointer-events-none border-2 border-error px-10 py-2 ${
                  handleComplete() && "pointer-events-auto animate-bounce border-success"
                }`}
                onClick={() => handleAddPerito()}
                to="#"
              >
                <PersonAdd className="mr-4 w-[25px] text-secondary transition group-hover:text-black" />
                Agregar a {perito.nombreYApellido.split(" ")[0]}
              </NavLink>
            ) : (
              <NavLink
                className={`navLinkButtonPages pointer-events-none border-2 border-error px-10 py-2 ${
                  peritos.length >= 1 && "pointer-events-auto animate-bounce border-success"
                }`}
                onClick={() => handleSubmitPeritos()}
                to="#"
              >
                Siguente
              </NavLink>
            )}
          </>
        ) : (
          <>
            {perito.nombreYApellido && perito.legajo && (
              <NavLink
                className={`navLinkButtonPages group pointer-events-none border-2 border-error px-10 py-2 ${
                  handleComplete() && "pointer-events-auto animate-bounce border-success"
                }`}
                onClick={() => handleAddPerito()}
                to="#"
              >
                <PersonAdd className="mr-4 w-[25px] text-secondary transition group-hover:text-black" />
                Agregar a {perito.nombreYApellido.split(" ")[0]}
              </NavLink>
            )}
            {peritos.length > currentPeritos.length ? (
              <NavLink className={"basicBtnNoPadding px-10 py-2"} onClick={() => handleSubmitPeritos()} to="#">
                Siguente
              </NavLink>
            ) : (
              <NavLink className="basicBtnNoPadding px-10 py-2" to={"/actas/crear/3"}>
                Continuar
              </NavLink>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AddPeritos;
