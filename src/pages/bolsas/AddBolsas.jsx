import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
//* Redux
import { useDispatch, useSelector } from "react-redux";
import { removeBolsa, closeProcessActa, removeEfecto } from "../../redux/actions";
//* Style
import { modal40x40 } from "../../helpers/globalVariables";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { PlusSquareDotted } from "@styled-icons/bootstrap/PlusSquareDotted";
import { DocumentTextClock } from "@styled-icons/fluentui-system-regular/DocumentTextClock";
//* Modal
import Modal from "react-modal";
//* Components
import AddEfectos from "./AddEfectos";
import CreateEfectosCards from "../../Components/Utils/efectos/CreateEfectosCards";
import CloseBagsModal from "./CloseBagsModal";
import getSavedActa from "../../Components/Utils/template/getSavedActa";
import AddBolsasModal from "./AddBolsasModal";

const modal30Width = {
  content: {
    ...modal40x40.content,
    width: "35%",
  },
};

function AddBolsas() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentActa = useSelector((s) => JSON.parse(localStorage.getItem("currentActa")) || s.currentActa);
  const currentBolsas = useSelector((s) => JSON.parse(localStorage.getItem("currentBolsas")) || s.currentBolsas);

  const [loading, setLoading] = React.useState(false);
  const [addEfectosModal, setAddEfectosModal] = React.useState(false);
  const [addBolsasModal, setAddBolsasModal] = React.useState(false);
  const [closeBagsModal, setCloseBagsModal] = React.useState(false);

  const [selectedBag, setSelectedBag] = React.useState({ id: "", nroPrecinto: "", estado: "" });

  const [bolsaIdShowEfectos, setBolsaIdShowEfectos] = React.useState(false);

  const handleRemoveEfecto = (efecto_id) => {
    if (currentActa.estado === "en creacion") {
      dispatch(removeEfecto(efecto_id, currentActa.id));
    }
  };

  const handleCloseProcessActa = () => {
    const res = confirm("¿Estas seguro que quieres completar el acta?");
    if (res) {
      setLoading(true);
      dispatch(closeProcessActa(currentActa.id, navigate)); //* Mando el ID para que el backend haga toda la logica
    }
  };

  const handleCloseBags = () => {
    if (currentActa.estado !== "para completar") {
      toast.warning("¡Una vez cerrada una bolsa no podra volver a crear mas bolsas ni agregar elementos a ninguna!", {
        position: "top-center",
        autoClose: 10000,
      });
    }
    setCloseBagsModal(!closeBagsModal);
  };

  const handleDeleteBolsa = (bolsaId) => {
    //* Borra una bolsa
    dispatch(removeBolsa(bolsaId, currentActa.id));
  };

  const renderAddEfectosModal = () => {
    return (
      <Modal isOpen={addEfectosModal} style={modal30Width} ariaHideApp={false}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="closeModalIcon"
          onClick={() => setAddEfectosModal(!addEfectosModal)}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <AddEfectos alternModal={() => setAddEfectosModal(!addEfectosModal)} selectedBag={selectedBag} />
      </Modal>
    );
  };

  const askBolsasHasEfectos = () => {
    //* Activa el btn de cerrar bolsas solo cuando estan abiertas con elementos dentro
    let res = false;
    if (currentBolsas.length !== 0) {
      currentBolsas.forEach((b) => {
        if (b.estado === "abierta con efectos en proceso" || b.estado === "abierta con efectos completos") {
          res = true;
        }
        if (b.estado === "abierta sin efectos") {
          res = false;
        }
      });
    }

    return res;
  };

  const renderAddBolsasModal = () => {
    return (
      <Modal isOpen={addBolsasModal} style={modal30Width} ariaHideApp={false}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="closeModalIcon"
          onClick={() => setAddBolsasModal(!addBolsasModal)}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>

        <AddBolsasModal alternModal={() => setAddBolsasModal(!addBolsasModal)} acta_id={currentActa.id} />
      </Modal>
    );
  };

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const handleClickBolsaContainer = (bolsa_id) => {
    setBolsaIdShowEfectos(bolsaIdShowEfectos === bolsa_id ? false : bolsa_id);
  };

  return (
    <div className="paddingLeftContainer">
      <header className="header">
        <span data-aos="zoom-in" className="headerTitle">
          Creacion de Bolsas y Elementos
        </span>
      </header>
      <div className="flex min-h-[80%] w-full  flex-col items-center justify-start overflow-y-scroll  border-t-[3px] border-principal">
        {currentBolsas &&
          currentBolsas.map((bolsa) => {
            return (
              <div
                className={`group my-2 flex w-[90%] flex-col items-center justify-start rounded-md border-2 border-principal shadow-md transition `}
                key={bolsa.id}
              >
                <div
                  className={`flex min-h-[14vh] w-full flex-row items-center justify-evenly ${
                    bolsaIdShowEfectos === bolsa.id && "mb-2 border-b-2 border-principal"
                  }`}
                >
                  {(bolsa.estado === "abierta con efectos completos" || bolsa.estado === "abierta con efectos en proceso") && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="icons ml-2 h-8 w-8 hover:cursor-default"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                      />
                    </svg>
                  )}
                  {bolsa.Efectos?.length <= 0 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="icons ml-2 h-8 w-8"
                      onClick={() => handleDeleteBolsa(bolsa.id)}
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Elimina la Bolsa"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  )}
                  {bolsa.estado === "cerrada" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className=" icons ml-2 h-8 w-8 hover:cursor-default"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                      />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                    </svg>
                  )}
                  {bolsa.estado === "cerrada en proceso" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className=" icons ml-2 h-8 w-8 hover:cursor-default"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                  )}
                  <div
                    className="cardInfoContainer"
                    style={
                      bolsa.colorPrecinto === "rojo" ? { color: "#FF0000" } : bolsa.colorPrecinto === "verde" ? { color: "#68BC00" } : null
                    }
                  >
                    <span className={`cardTitle capitalize`}>Precinto {bolsa.colorPrecinto}</span>
                    <br />
                    {bolsa.nroPrecinto}
                  </div>
                  <div className="cardInfoContainer">
                    <span className="cardTitle">Elementos</span>
                    <br />
                    {bolsa.Efectos.length}
                  </div>
                  <div className="cardInfoContainer">
                    <span className="cardTitle">Observacion</span>
                    <br />
                    {truncateText(bolsa.observaciones || "Ninguna observacion sobre la Bolsa", 80)}
                  </div>
                  <div className="cardInfoContainer">
                    <span className="cardTitle">Estado</span>
                    <br />
                    {bolsa.estado === "cerrada" ? `cerrada con precinto blanco N° ${bolsa.nroPrecintoBlanco}` : bolsa.estado}
                  </div>
                  <div className="cardInfoContainer flex !flex-[0.8] justify-around">
                    {currentBolsas.length > 0 && currentActa.estado === "en creacion" && (
                      <PlusSquareDotted
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Agregar Elementos a la Bolsa"
                        className="icons h-8 w-8 hover:text-secondary/50"
                        onClick={() => {
                          setAddEfectosModal(!addEfectosModal);
                          setSelectedBag({ id: bolsa.id, nroPrecinto: bolsa.nroPrecinto });
                        }}
                      />
                    )}
                    {askBolsasHasEfectos() && bolsa.estado === "abierta con efectos en proceso" ? (
                      <DocumentTextClock
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Cerrar Bolsa en proceso"
                        className="icons h-8 w-8 hover:text-secondary/50"
                        onClick={() => {
                          handleCloseBags();
                          setSelectedBag({ id: bolsa.id, nroPrecinto: bolsa.nroPrecinto, estado: bolsa.estado });
                        }}
                      />
                    ) : (
                      askBolsasHasEfectos() &&
                      bolsa.estado === "abierta con efectos completos" && (
                        <svg
                          data-tooltip-id="my-tooltip"
                          data-tooltip-content="Abre ventana para agregar el precinto blanco ahora o despues"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="icons h-8 w-8 hover:text-secondary/50"
                          onClick={() => {
                            handleCloseBags();
                            setSelectedBag({ id: bolsa.id, nroPrecinto: bolsa.nroPrecinto, estado: bolsa.estado });
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
                          />
                        </svg>
                      )
                    )}

                    {bolsa.Efectos.length !== 0 && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className={`icons h-8 w-8 rounded-full transition hover:bg-touch ${
                          bolsaIdShowEfectos === bolsa.id && "rotate-180"
                        }`}
                        onClick={() => handleClickBolsaContainer(bolsa.id)}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    )}
                  </div>
                </div>
                {bolsaIdShowEfectos === bolsa.id && (
                  <div className="flex h-full w-full flex-col items-center justify-start">
                    {bolsa.Efectos &&
                      bolsa.Efectos.map((efecto) => (
                        <CreateEfectosCards
                          efecto={efecto}
                          currentBolsas={currentBolsas}
                          estadoActa={currentActa.estado}
                          handleRemoveEfecto={handleRemoveEfecto}
                          renderAddEfectosModal={renderAddEfectosModal}
                          setAddEfectosModal={setAddEfectosModal}
                          key={efecto.id}
                        />
                      ))}
                  </div>
                )}
              </div>
            );
          })}
        {renderAddEfectosModal()}
        {renderAddBolsasModal()}
      </div>
      <div className="flex h-full w-full items-center justify-around">
        <NavLink className="basicBtnNoPadding px-10 py-2" onClick={() => navigate(-1)} to="#">
          Volver
        </NavLink>
        {(currentActa.estado === "en creacion" || currentActa.estado === "para completar") && (
          <>
            {currentActa.estado !== "para completar" && (
              <NavLink className="basicBtnNoPadding px-10 py-2" onClick={() => setAddBolsasModal(!addBolsasModal)} to="#">
                Agregar Bolsa
              </NavLink>
            )}
          </>
        )}
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
            {!loading && (
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
      <Modal isOpen={closeBagsModal} style={modal40x40} ariaHideApp={false}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="closeModalIcon"
          onClick={() => setCloseBagsModal(!closeBagsModal)}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <CloseBagsModal closeModal={() => setCloseBagsModal(!closeBagsModal)} selectedBag={selectedBag} />
      </Modal>
    </div>
  );
}

export default AddBolsas;
