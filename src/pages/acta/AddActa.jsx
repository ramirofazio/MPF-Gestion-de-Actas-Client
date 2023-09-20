import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createActa } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "components/fields";

const fecha = new Date();
const horas = fecha.getHours().toString().padStart(2, "0");
const minutos = fecha.getMinutes().toString().padStart(2, "0");
let mes = new Intl.DateTimeFormat("es-ES", { month: "long" }).format(fecha);

export function AddActa() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector((s) => JSON.parse(localStorage.getItem("currentUser")) || s.currentUser);

  const [acta, setActa] = useState("");
  const [tipoDeActa, setTipoDeActa] = useState("");
  const [comeBack, setComeBack] = useState(false);

  const getLocalStorageOrState = () => {
    const currentActa = localStorage.getItem("currentActa");
    const localFlag = localStorage.getItem("actaFlag");

    if (currentActa && localFlag) {
      setActa(JSON.parse(currentActa));
      setTipoDeActa(localFlag);
      setComeBack(true); //* Si volvio para atras
    } else {
      setActa({
        solicitante: "",
        mpfOrDen: "",
        cij: "",
        dil: "",
        coop: "",
        nroCausa: "",
        caratula: "",
        dias: fecha.getDate(),
        mes: mes.charAt(0).toUpperCase() + mes.slice(1),
        anio: fecha.getFullYear(),
        hora: `${horas}:${minutos}`,
      });
      setTipoDeActa("Tipo de Acta");
    }
  };

  useEffect(() => {
    getLocalStorageOrState();
  }, []);

  const handleComplete = () => {
    const { solicitante, mpfOrDen, cij, dil, coop, nroCausa } = acta;
    if (tipoDeActa === "MPF/DEN") {
      if (solicitante && mpfOrDen && cij && dil) {
        return true;
      } else {
        return false;
      }
    } else if (tipoDeActa === "COOP") {
      if (solicitante && coop && nroCausa && cij && dil) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const handleClick = () => {
    dispatch(createActa(acta, tipoDeActa, navigate, dispatch));
  };

  return (
    <div className="paddingLeftContainer">
      <header className="header headerTitle" data-aos="zoom-in">
        Creación de Acta
      </header>
      <form className="flex min-h-[80%] w-full flex-col items-center justify-center overflow-y-scroll border-t-[3px] border-principal px-[30%] pt-5">
        <div data-aos="fade-down" className="inputContainer flex-col">
          <label className="basicLabel">*Tipo de Acta</label>
          <select className="formBigSelect" disabled={comeBack} onChange={(e) => setTipoDeActa(e.target.value)} value={tipoDeActa}>
            <option>Tipo de Acta</option>
            <option>MPF/DEN</option>
            <option>COOP</option>
          </select>
        </div>
        {tipoDeActa === "MPF/DEN" && (
          <>
            <div data-aos="fade-right" className="inputContainer flex-col">
              <label className="basicLabel">*Solicitante</label>
              <select
                className="formBigSelect"
                disabled={comeBack}
                onChange={(e) => setActa({ ...acta, solicitante: e.target.value })}
                value={acta.solicitante}
              >
                <option value="">Solicitante</option>
                <option>Área de Flagrancia Contravencional</option>
                <option>Equipo de Análisis de Casos de Comercialización de Estupefacientes</option>
                <option>Equipo Especializado en Casos de Violencia Institucional</option>
                <option>Fiscalía de Cámara PCyF Norte</option>
                <option>Fiscalía de Cámara PCyF Oeste</option>
                <option>Fiscalía de Cámara PCyF Sudeste</option>
                <option>Fiscalía PCyF Nº 1</option>
                <option>Fiscalía PCyF Nº 10</option>
                <option>Fiscalía PCyF Nº 11</option>
                <option>Fiscalía PCyF Nº 11 (Violencia Institucional)</option>
                <option>Fiscalía PCyF Nº 12</option>
                <option>Fiscalía PCyF Nº 12 (Informático)</option>
                <option>Fiscalía PCyF Nº 13</option>
                <option>Fiscalía PCyF Nº 14</option>
                <option>Fiscalía PCyF Nº 15</option>
                <option>Fiscalía PCyF Nº 16</option>
                <option>Fiscalía PCyF Nº 17</option>
                <option>Fiscalía PCyF Nº 18</option>
                <option>Fiscalía PCyF Nº 19</option>
                <option>Fiscalía PCyF Nº 2</option>
                <option>Fiscalía PCyF Nº 20</option>
                <option>Fiscalía PCyF Nº 21</option>
                <option>Fiscalía PCyF Nº 22 (Discriminación)</option>
                <option>Fiscalía PCyF Nº 22 (Discriminación)</option>
                <option>Fiscalía PCyF Nº 23</option>
                <option>Fiscalía PCyF Nº 24</option>
                <option>Fiscalía PCyF Nº 25</option>
                <option>Fiscalía PCyF Nº 26</option>
                <option>Fiscalía PCyF Nº 27</option>
                <option>Fiscalía PCyF Nº 28</option>
                <option>Fiscalía PCyF Nº 29</option>
                <option>Fiscalía PCyF Nº 3</option>
                <option>Fiscalía PCyF Nº 30</option>
                <option>Fiscalía PCyF Nº 30 (Informático)</option>
                <option>Fiscalía PCyF Nº 31</option>
                <option>Fiscalía PCyF Nº 32</option>
                <option>Fiscalía PCyF Nº 33</option>
                <option>Fiscalía PCyF Nº 34</option>
                <option>Fiscalía PCyF Nº 35</option>
                <option>Fiscalía PCyF Nº 35 (Eventos Masivos)</option>
                <option>Fiscalía PCyF Nº 36</option>
                <option>Fiscalía PCyF Nº 37</option>
                <option>Fiscalía PCyF Nº 38</option>
                <option>Fiscalía PCyF Nº 39</option>
                <option>Fiscalía PCyF Nº 4</option>
                <option>Fiscalía PCyF Nº 40</option>
                <option>Fiscalía PCyF Nº 40 (UFEMA)</option>
                <option>Fiscalía PCyF Nº 5</option>
                <option>Fiscalía PCyF Nº 6</option>
                <option>Fiscalía PCyF Nº 7</option>
                <option>Fiscalía PCyF Nº 7 (Informático)</option>
                <option>Fiscalía PCyF Nº 8</option>
                <option>Fiscalía PCyF Nº 9</option>
                <option>Fiscalía Transición 1</option>
                <option>Secretaria Judicial</option>
                <option>UFCEU - Unidad Coordinadora</option>
                <option>UFDCyFE - UIT Investigación (Área de Tenencia)</option>
                <option>UFDCyFE - UIT Investigación (Lesiones de Transito)</option>
                <option>UFDCyFE - Unidad de Intervención Temprana</option>
                <option>UFE - Área de Casos Especiales</option>
                <option>UFE - Equipo Especializado en Violencia de Género</option>
                <option>UFE - Unidad Coordinadora</option>
                <option>UFE - Unidad de Flagrancia</option>
                <option>UFE - Unidad de Intervención Temprana</option>
                <option>UFEIDE - Casos Fiscalía</option>
                <option>UFEIDE - Equipo de Análisis Preliminar</option>
                <option>UFEIDE - Equipo de Análisis Preliminar (Investigación)</option>
                <option>UFEIDE - Investigación</option>
                <option>UFEDyCI - Unidad Fiscal Especializada en Delitos y Contravenciones Informáticas</option>
                <option>UFN - Área de Casos Especiales</option>
                <option>UFN - Equipo Especializado en Violencia de Género</option>
                <option>UFN - Unidad Coordinadora</option>
                <option>UFN - Unidad de Flagrancia</option>
                <option>UFN - Unidad de Intervención Temprana</option>
                <option>UFO - Área de Casos Especiales</option>
                <option>UFO - Equipo Especializado en Violencia de Género</option>
                <option>UFO - Unidad Coordinadora</option>
                <option>UFO - Unidad de Flagrancia</option>
                <option>UFO - Unidad de Intervención Temprana</option>
                <option>UFS - Área de Casos Especiales</option>
                <option>UFS - Equipo Especializado en Violencia de Género</option>
                <option>UFS - Unidad Coordinadora</option>
                <option>UFS - Unidad de Flagrancia</option>
                <option>UFS - Unidad de Intervención Temprana</option>
                <option>UFSE - Área de Casos Especiales</option>
                <option>UFSE - Equipo Fiscal F</option>
                <option>UFSE - Equipo Fiscal G</option>
                <option>UFSE - Of. Ap. Int. Inicial</option>
                <option>UFSE - Unidad Coordinadora</option>
                <option>UFSE - Unidad de Intervención Temprana</option>
                <option>Unidad Coordinadora de Investigaciones Complejas</option>
                <option>Unidad de Apoyo de VD Este</option>
                <option>Unidad de Apoyo de VD Norte</option>
                <option>Unidad de Apoyo de VD Oeste</option>
                <option>Unidad de Apoyo de VD Sudeste</option>
                <option>Unidad de Apoyo de VD Sur</option>
              </select>
            </div>
            <div data-aos="fade-left" className="inputContainer flex-col">
              <label className="basicLabel">*Nro MPF/DEN</label>
              <input
                className="formBigInput"
                disabled={comeBack}
                type="text"
                name="MPF/DEN"
                value={!comeBack ? acta.mpfOrDen : acta.nro_mpf}
                placeholder="MPF/DEN"
                onChange={(e) => setActa({ ...acta, mpfOrDen: e.target.value })}
              />
            </div>
            <div data-aos="fade-right" className="inputContainer flex-col">
              <label className="basicLabel">*Nro CIJ</label>
              <input
                className="formBigInput"
                disabled={comeBack}
                type="text"
                name="CIJ"
                value={!comeBack ? acta.cij : acta.nro_cij}
                placeholder="CIJ"
                onChange={(e) => setActa({ ...acta, cij: e.target.value })}
              />
            </div>
            <div data-aos="fade-left" className="inputContainer flex-col">
              <label className="basicLabel">*Nro DIL</label>
              <input
                className="formBigInput"
                disabled={comeBack}
                type="text"
                name="DIL"
                value={!comeBack ? acta.dil : acta.nro_dil}
                placeholder="DIL"
                onChange={(e) => setActa({ ...acta, dil: e.target.value })}
              />
            </div>
          </>
        )}
        {tipoDeActa === "COOP" && (
          <>
            <div data-aos="fade-right" className="inputContainer flex-col">
              <label className="basicLabel">*Solicitante</label>
              <input
                className="formBigInput"
                disabled={comeBack}
                type="text"
                name="Solicitante"
                value={acta.solicitante}
                placeholder="Solicitante"
                onChange={(e) => setActa({ ...acta, solicitante: e.target.value })}
              />
            </div>
            <div data-aos="fade-left" className="inputContainer flex-col">
              <label className="basicLabel">*Nro Coop</label>
              <input
                className="formBigInput"
                disabled={comeBack}
                type="text"
                name="COOP"
                value={!comeBack ? acta.coop : acta.nro_coop}
                placeholder="COOP"
                onChange={(e) => setActa({ ...acta, coop: e.target.value })}
              />
            </div>
            <div data-aos="fade-right" className="inputContainer flex-col">
              <label className="basicLabel">*Nro Causa</label>
              <input
                className="formBigInput"
                disabled={comeBack}
                type="text"
                name="Nro Causa"
                value={!comeBack ? acta.nroCausa : acta.nro_causa}
                placeholder="Nro Causa"
                onChange={(e) => setActa({ ...acta, nroCausa: e.target.value })}
              />
            </div>
            <div data-aos="fade-left" className="inputContainer flex-col">
              <label className="basicLabel">Caratula</label>
              <input
                className="formBigInput"
                disabled={comeBack}
                type="text"
                name="Caratula"
                value={acta.caratula}
                placeholder="Caratula"
                onChange={(e) => setActa({ ...acta, caratula: e.target.value })}
              />
            </div>
            <div data-aos="fade-right" className="inputContainer flex-col">
              <label className="basicLabel">*Nro CIJ</label>
              <input
                className="formBigInput"
                disabled={comeBack}
                type="text"
                name="CIJ"
                value={!comeBack ? acta.cij : acta.nro_cij}
                placeholder="CIJ"
                onChange={(e) => setActa({ ...acta, cij: e.target.value })}
              />
            </div>
            <div data-aos="fade-left" className="inputContainer flex-col">
              <label className="basicLabel">*Nro DIL</label>
              <input
                className="formBigInput"
                disabled={comeBack}
                type="text"
                name="DIL"
                value={!comeBack ? acta.dil : acta.nro_dil}
                placeholder="DIL"
                onChange={(e) => setActa({ ...acta, dil: e.target.value })}
              />
            </div>
          </>
        )}
      </form>
      <div className="flex w-[50%] items-center justify-around">
        <NavLink className="basicBtnNoPadding px-10 py-2" onClick={() => navigate(-1)} to="#">
          Volver
        </NavLink>
        {!comeBack ? (
          <NavLink
            className={`navLinkButtonPages pointer-events-none border-2 border-error px-10 py-2 ${
              handleComplete() && "pointer-events-auto animate-bounce border-success"
            }`}
            onClick={() => handleClick()}
            to="#"
          >
            Siguente
          </NavLink>
        ) : (
          <NavLink className="basicBtnNoPadding px-10 py-2" to={currentUser.username === "admin" ? "/actas/crear/2" : "/actas/crear/3"}>
            Continuar
          </NavLink>
        )}
      </div>
    </div>
  );
}
