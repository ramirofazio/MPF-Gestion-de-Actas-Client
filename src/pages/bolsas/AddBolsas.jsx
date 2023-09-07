import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeBolsa, closeProcessActa, removeEfecto } from "redux/actions";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import Modal from "react-modal";
import { modal40x40, getSavedActa, truncateText } from "utils/index";
import { AddEfectos, CloseBagsModal, AddBolsasModal } from "pages/index";
import { EfectosCard, CardElement } from "components/cards";
import { Icons } from "Assets/index";

const modal30Width = {
  content: {
    ...modal40x40.content,
    width: "35%",
  },
};

export function AddBolsas() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentActa = useSelector((s) => JSON.parse(localStorage.getItem("currentActa")) || s.currentActa);
  const currentBolsas = useSelector((s) => JSON.parse(localStorage.getItem("currentBolsas")) || s.currentBolsas);

  const [loading, setLoading] = useState(false);
  const [addEfectosModal, setAddEfectosModal] = useState(false);
  const [addBolsasModal, setAddBolsasModal] = useState(false);
  const [closeBagsModal, setCloseBagsModal] = useState(false);
  const [selectedBag, setSelectedBag] = useState({ id: "", nroPrecinto: "", estado: "" });
  const [bolsaIdShowEfectos, setBolsaIdShowEfectos] = useState(false);

  const handleRemoveEfecto = (efecto_id) => {
    if (currentActa.estado === "en creacion") {
      dispatch(removeEfecto(efecto_id, currentActa.id));
    }
  };

  const handleCloseProcessActa = () => {
    const res = confirm("¿Estas seguro que quieres completar el acta?");
    if (res) {
      setLoading(true);
      dispatch(closeProcessActa(currentActa.id, navigate));
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
    dispatch(removeBolsa(bolsaId, currentActa.id));
  };

  const askBolsasHasEfectos = (bolsa) => {
    let res = false;
    if (bolsa) {
      if (bolsa.estado === "abierta con efectos en proceso" || bolsa.estado === "abierta con efectos completos") {
        res = true;
      }
      if (bolsa.estado === "abierta sin efectos") {
        res = false;
      }
    }
    return res;
  };

  const handleClickBolsaContainer = (bolsa_id) => {
    setBolsaIdShowEfectos(bolsaIdShowEfectos === bolsa_id ? false : bolsa_id);
  };

  const renderAddEfectosModal = () => (
    <Modal isOpen={addEfectosModal} style={modal30Width} ariaHideApp={false}>
      <Icons.close onClick={() => setAddEfectosModal(!addEfectosModal)} className="closeModalIcon" />
      <AddEfectos alternModal={() => setAddEfectosModal(!addEfectosModal)} selectedBag={selectedBag} />
    </Modal>
  );

  return (
    <div className="paddingLeftContainer">
      <header className="header headerTitle" data-aos="zoom-in">
        Creacion de Bolsas y Elementos
      </header>
      <div className="flex min-h-[80%] w-full  flex-col items-center justify-start overflow-y-scroll  border-t-[3px] border-principal">
        {currentBolsas.map((bolsa) => {
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
                  <Icons.documentText className="icons ml-2 h-8 w-8 hover:cursor-default" />
                )}
                {bolsa.Efectos?.length <= 0 && (
                  <Icons.trashCan
                    className="icons ml-2 h-8 w-8"
                    onClick={() => handleDeleteBolsa(bolsa.id)}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Elimina la Bolsa"
                  />
                )}
                {bolsa.estado === "cerrada" && <Icons.tag className=" icons ml-2 h-8 w-8 hover:cursor-default" />}
                {bolsa.estado === "cerrada en proceso" && <Icons.lock className=" icons ml-2 h-8 w-8 hover:cursor-default" />}
                <CardElement
                  title={`Precinto ${bolsa.colorPrecinto}`}
                  value={bolsa.nroPrecinto}
                  className={`${bolsa.colorPrecinto === "rojo" ? "!text-error" : bolsa.colorPrecinto === "verde" && "!text-success"}
`}
                />
                <CardElement title={"elementos"} value={bolsa.Efectos.length} />
                <CardElement title={"observación"} value={truncateText(bolsa.observaciones || "Ninguna observacion sobre la Bolsa", 80)} />
                <CardElement
                  title={"estado"}
                  value={bolsa.estado === "cerrada" ? `cerrada con precinto blanco N° ${bolsa.nroPrecintoBlanco}` : bolsa.estado}
                />
                <div className="cardInfoContainer flex !flex-[0.8] justify-around">
                  {bolsa.estado !== "cerrada" && (
                    <Icons.plusDotted
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Agregar Elementos a la Bolsa"
                      className="icons h-8 w-8 hover:text-secondary/50"
                      onClick={() => {
                        setAddEfectosModal(!addEfectosModal);
                        setSelectedBag({ id: bolsa.id, nroPrecinto: bolsa.nroPrecinto });
                      }}
                    />
                  )}
                  {askBolsasHasEfectos(bolsa) && bolsa.estado === "abierta con efectos en proceso" ? (
                    <Icons.documentTextClock
                      data-tooltip-id="my-tooltip"
                      data-tooltip-content="Cerrar Bolsa en proceso"
                      className="icons h-8 w-8 hover:text-secondary/50"
                      onClick={() => {
                        handleCloseBags();
                        setSelectedBag({ id: bolsa.id, nroPrecinto: bolsa.nroPrecinto, estado: bolsa.estado });
                      }}
                    />
                  ) : (
                    askBolsasHasEfectos(bolsa) &&
                    bolsa.estado === "abierta con efectos completos" && (
                      <Icons.documentCheckMarck
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Abre ventana para agregar el precinto blanco ahora o despues"
                        className="icons h-8 w-8 hover:text-secondary/50"
                        onClick={() => {
                          handleCloseBags();
                          setSelectedBag({ id: bolsa.id, nroPrecinto: bolsa.nroPrecinto, estado: bolsa.estado });
                        }}
                      />
                    )
                  )}
                  {bolsa.Efectos.length !== 0 && (
                    <Icons.arrowDown
                      className={`icons h-8 w-8 rounded-full transition hover:bg-touch ${bolsaIdShowEfectos === bolsa.id && "rotate-180"}`}
                      onClick={() => handleClickBolsaContainer(bolsa.id)}
                    />
                  )}
                </div>
              </div>
              {bolsaIdShowEfectos === bolsa.id && (
                <div className="flex h-full w-full flex-col items-center justify-start">
                  {bolsa.Efectos &&
                    bolsa.Efectos.map((efecto) => (
                      <EfectosCard
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
      {renderAddEfectosModal()}
      <Modal isOpen={addBolsasModal} style={modal30Width} ariaHideApp={false}>
        <Icons.close className="closeModalIcon" onClick={() => setAddBolsasModal(!addBolsasModal)} />
        <AddBolsasModal alternModal={() => setAddBolsasModal(!addBolsasModal)} acta_id={currentActa.id} />
      </Modal>
      <Modal isOpen={closeBagsModal} style={modal40x40} ariaHideApp={false}>
        <Icons.close className="closeModalIcon" onClick={() => setCloseBagsModal(!closeBagsModal)} />
        <CloseBagsModal closeModal={() => setCloseBagsModal(!closeBagsModal)} selectedBag={selectedBag} />
      </Modal>
    </div>
  );
}
