import React from "react";
import { useNavigate } from "react-router-dom";
import { removeActa } from "../../../redux/actions";
//* Styles
import { FileDownload } from "@styled-icons/remix-line/FileDownload";
import { DocumentEdit } from "@styled-icons/fluentui-system-regular/DocumentEdit";
import { FileRemove } from "@styled-icons/evaicons-solid/FileRemove";
import { Warning } from "@styled-icons/entypo/Warning";
import { FileEarmarkLock } from "@styled-icons/bootstrap/FileEarmarkLock";
import { EyeOutline } from "styled-icons/evaicons-outline";
//* Utils
import getSavedActa from "../template/getSavedActa";
import editSavedActa from "../template/editSavedActa";
import { useDispatch } from "react-redux";

function ActaCard({ acta, type }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [totalEfectos, setTotalEfectos] = React.useState(0);

  React.useEffect(() => {
    let sum = 0;
    acta.Bolsas.map((bolsa) => {
      sum += bolsa.Efectos.length;
    });
    setTotalEfectos(sum);
  }, []);

  return (
    <div
data-aos="fade-down"      className={`mt-2 flex  min-h-[65px] w-[95%] items-center rounded-md border-2 border-principal shadow-md ${
        acta.estado === "en proceso"
          ? "border-r-[15px] border-r-process"
          : acta.estado === "completa"
          ? "border-r-[15px] border-r-principal"
          : acta.estado === "deprecada"
          ? "border-r-[15px] border-r-error"
          : acta.estado === "en creacion"
          ? "border-r-[15px] border-r-secondary"
          : "border-r-[15px] border-r-principal"
      }`}
    >
      <div className="flex max-w-[90%] flex-1">
        <span className="cardInfoContainer">
          <span className="cardTitle">Fecha</span>
          <br />
          {acta.mes} {acta.dias}
        </span>
        {!acta.nro_coop && (
          <span className="cardInfoContainer">
            <span className="cardTitle">MPF</span>
            <br />
            {acta.nro_mpf}
          </span>
        )}
        {!acta.nro_mpf && (
          <span className="cardInfoContainer">
            <span className="cardTitle">COOP</span>
            <br />
            {acta.nro_coop}
          </span>
        )}
        <span className="cardInfoContainer">
          <span className="cardTitle">CIJ</span>
          <br />
          {acta.nro_cij}
        </span>
        <span className="cardInfoContainer">
          <span className="cardTitle">DIL</span>
          <br />
          {acta.nro_dil}
        </span>
        <span className="cardInfoContainer">
          <span className="cardTitle">Suscriptores</span>
          <br />
          {acta.Integrantes.length}
        </span>
        <span className="cardInfoContainer">
          <span className="cardTitle">Bolsas</span>
          <br />
          {acta.Bolsas.length}
        </span>
        <span className="cardInfoContainer">
          <span className="cardTitle">Efectos</span>
          <br />
          {totalEfectos}
        </span>
      </div>
      <div className="flex h-full w-[10%] items-center justify-around">
        {type === "remove" ? (
          <>
            <FileRemove
              className="icons w-6"
              onClick={() => dispatch(removeActa(acta.id))}
            />
          </>
        ) : (
          <>
            {acta.estado !== "en creacion" && (
              <FileDownload className="icons w-6" onClick={() => getSavedActa(acta.id)} />
            )}
            {acta.estado === "en creacion" && (
              <>
                <DocumentEdit
                  className="icons w-6"
                  onClick={() => editSavedActa(acta.id, navigate, "/actas/crear/1")}
                />
                <Warning className="w-6 text-process" />
              </>
            )}
            {acta.estado === "completa" && (
              <EyeOutline
                className="icons w-6"
                onClick={() => editSavedActa(acta.id, navigate, "/actas/crear/1")}
              />
            )}
            {(acta.estado === "en proceso" || acta.estado === "para completar") && (
              <FileEarmarkLock
                className="icons w-6"
                onClick={() => editSavedActa(acta.id, navigate, "/actas/crear/4")}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ActaCard;
