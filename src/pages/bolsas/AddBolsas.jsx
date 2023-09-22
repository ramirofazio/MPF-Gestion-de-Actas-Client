import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeProcessActa } from "redux/actions";
import ClipLoader from "react-spinners/ClipLoader";
import { getOfStorage, getSavedActa } from "utils/index";
import { CloseBagsModal, AddBolsasModal } from "pages/index";
import { BolsaCard, BaseModal } from "components/index";

export function AddBolsas() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentActa = useSelector((s) => JSON.parse(localStorage.getItem("currentActa")) || s.currentActa);
  const currentBolsas = useSelector((s) => JSON.parse(localStorage.getItem("currentBolsas")) || s.currentBolsas);
  const currentEfectos = useSelector((s) => getOfStorage("currentEfectos") || s.currentEfectos);

  const [loading, setLoading] = useState(false);
  const [addBolsasModal, setAddBolsasModal] = useState(false);
  const [closeBagsModal, setCloseBagsModal] = useState(false);
  const [selectedBag, setSelectedBag] = useState({ id: "", nroPrecinto: "", estado: "" });
  const [allEfectosCompleted, setAllEfectosCompleted] = useState(false);

  const handleCloseProcessActa = () => {
    const res = confirm("¿Estas seguro que quieres completar el acta?");
    if (res) {
      setLoading(true);
      dispatch(closeProcessActa(currentActa.id, navigate));
    }
  };

  useEffect(() => {
    currentEfectos.map((e) => {
      e.estado === "completo" ? setAllEfectosCompleted(true) : setAllEfectosCompleted(false);
    });
  }, [currentEfectos]);

  return (
    <div className="paddingLeftContainer">
      <header className="header headerTitle" data-aos="zoom-in">
        Creacion de Bolsas y Elementos
      </header>
      <div className="flex min-h-[80%] w-full  flex-col items-center justify-start overflow-y-scroll  border-t-[3px] border-principal">
        {currentBolsas.map((bolsa) => (
          <BolsaCard
            bolsa={bolsa}
            currentBolsas={currentBolsas}
            currentActa={currentActa}
            setSelectedBag={setSelectedBag}
            selectedBag={selectedBag}
            setCloseBagsModal={setCloseBagsModal}
            closeBagsModal={closeBagsModal}
          />
        ))}
      </div>
      <div className="flex h-full w-full items-center justify-around">
        <NavLink className="basicBtnNoPadding px-10 py-2" onClick={() => navigate(-1)} to="#">
          Volver
        </NavLink>
        <NavLink className="basicBtnNoPadding px-10 py-2" onClick={() => setAddBolsasModal(!addBolsasModal)} to="#">
          Agregar Bolsa
        </NavLink>
        {currentActa.estado === "en proceso" && (
          <>
            <NavLink
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Imprime el acta en el estado actual con leyendas de que queda en proceso"
              className="basicBtnNoPadding px-10 py-2"
              onClick={() =>
                currentActa.observaciones !== "" ? getSavedActa(currentActa.id, navigate) : setCloseBagsModal(!closeBagsModal)
              }
              to="#"
            >
              Imprimir Acta en Proceso
            </NavLink>
            {!loading && allEfectosCompleted && (
              <NavLink
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Cambia los estados a completo para agregar los precintos blancos a las bolsas"
                className="basicBtnNoPadding px-10 py-2"
                onClick={() => handleCloseProcessActa()}
                to="#"
              >
                Completar Acta
              </NavLink>
            )}
            {loading && (
              <NavLink className="basicBtnNoPadding px-10 py-2" to="#">
                Completando elementos y bolsas
                <ClipLoader color={"black"} size={18} cssOverride={{ marginBottom: "-2%", marginLeft: "10px" }} loading={true} />
              </NavLink>
            )}
          </>
        )}
        {currentActa.estado === "completa" && (
          <>
            <NavLink
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Imprime el acta terminada"
              className="basicBtnNoPadding px-10 py-2"
              onClick={() =>
                currentActa.estado === "completa" ? getSavedActa(currentActa.id, navigate) : setCloseBagsModal(!closeBagsModal)
              }
              to="#"
            >
              Imprimir Acta
            </NavLink>
          </>
        )}
      </div>
      <BaseModal
        isOpen={addBolsasModal}
        close={setAddBolsasModal}
        content={<AddBolsasModal alternModal={() => setAddBolsasModal(!addBolsasModal)} acta_id={currentActa.id} />}
      />
      <BaseModal
        isOpen={closeBagsModal}
        close={setCloseBagsModal}
        content={<CloseBagsModal closeModal={() => setCloseBagsModal(!closeBagsModal)} selectedBag={selectedBag} />}
      />
    </div>
  );
}
