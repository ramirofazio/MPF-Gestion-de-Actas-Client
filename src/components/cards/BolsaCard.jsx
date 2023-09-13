import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeEfecto, removeBolsa } from "redux/actions";
import { truncateText } from "utils/index";
import { EfectosCard, CardElement, BaseModal } from "components/index";
import { AddEfectos } from "pages/index";
import { Icons as I } from "assets/index";

export function BolsaCard({ bolsa, currentBolsas, currentActa, setSelectedBag, selectedBag, setCloseBagsModal, closeBagsModal }) {
  const dispatch = useDispatch();

  const [bolsaIdShowEfectos, setBolsaIdShowEfectos] = useState(false);
  const [addEfectosModal, setAddEfectosModal] = useState(false);

  const handleRemoveBolsa = (bolsaId) => {
    dispatch(removeBolsa(bolsaId, currentActa.id));
  };

  const handleRemoveEfecto = (efecto_id) => {
    if (currentActa.estado === "en creacion") {
      dispatch(removeEfecto(efecto_id, currentActa.id));
    }
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
    <BaseModal
      isOpen={addEfectosModal}
      close={setAddEfectosModal}
      content={<AddEfectos alternModal={() => setAddEfectosModal(!addEfectosModal)} selectedBag={selectedBag} />}
    />
  );

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
          <I.documentText className="icons ml-2 h-8 w-8 hover:cursor-default" />
        )}
        {bolsa.Efectos?.length <= 0 && (
          <I.trashCan
            className="icons ml-2 h-8 w-8"
            onClick={() => handleRemoveBolsa(bolsa.id)}
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Elimina la Bolsa"
          />
        )}
        {bolsa.estado === "cerrada" && <I.tag className=" icons ml-2 h-8 w-8 hover:cursor-default" />}
        {bolsa.estado === "cerrada en proceso" && <I.lock className=" icons ml-2 h-8 w-8 hover:cursor-default" />}
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
            <I.plusDotted
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
            <I.documentTextClock
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Cerrar Bolsa en proceso"
              className="icons h-8 w-8 hover:text-secondary/50"
              onClick={() => {
                setCloseBagsModal(!closeBagsModal);
                setSelectedBag({ id: bolsa.id, nroPrecinto: bolsa.nroPrecinto, estado: bolsa.estado });
              }}
            />
          ) : (
            askBolsasHasEfectos(bolsa) &&
            bolsa.estado === "abierta con efectos completos" && (
              <I.documentCheckMarck
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Abre ventana para agregar el precinto blanco ahora o despues"
                className="icons h-8 w-8 hover:text-secondary/50"
                onClick={() => {
                  setCloseBagsModal(!closeBagsModal);
                  setSelectedBag({ id: bolsa.id, nroPrecinto: bolsa.nroPrecinto, estado: bolsa.estado });
                }}
              />
            )
          )}
          {bolsa.Efectos.length !== 0 && (
            <I.arrowDown
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
      {renderAddEfectosModal()}
    </div>
  );
}
