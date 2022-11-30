import axios from "axios";
import generateDoc from "../Components/Utils/generateDoc";
import Variables from "../Styles/Variables";
import { toast } from "react-toastify";

export const GET_ACTAS = "GET_ACTAS";
export const GET_ACTAS_FILTERED = "GET_ACTAS_FILTERED";
export const CREATE_ACTA = "CREATE_ACTA";
export const CREATE_INTEGRANTES = "CREATE_INTEGRANTES";
export const CREATE_BOLSAS = "CREATE_BOLSAS";
export const CREATE_EFECTOS = "CREATE_EFECTOS";
export const GET_BUGS_REPORTS = "GET_BUGS_REPORTS";
export const CLEAR_STATES = "CLEAR_STATES";

export function getAllActas() {
  return function (dispatch) {
    axios
      .get(Variables.baseEndpoint + "/getActas")
      .then((res) => {
        return dispatch({
          type: GET_ACTAS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getActasFiltered(filtros) {
  return function (dispatch) {
    return dispatch({
      type: GET_ACTAS_FILTERED,
      payload: filtros,
    });
  };
}

export function createActa(state, flag, navigate) {
  localStorage.setItem("actaFlag", flag);

  return function (dispatch) {
    axios
      .post(Variables.baseEndpoint + "/addActa", { ...state })
      .then((res) => {
        if (res.status === 200) {
          navigate("/actas/crear/2");
        }
        flag === "MPF/DEN"
          ? toast.success(`Acta ${res.data.nro_mpf} creada con exito!`)
          : toast.success(`Acta ${res.data.nro_coop} creada con exito!`);
        return dispatch({
          type: CREATE_ACTA,
          payload: { ...res.data, flag },
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al crear la acta");
      });
  };
}

export function createIntegrantes(integrantes, navigate) {
  localStorage.setItem("integrantes", JSON.stringify(integrantes));

  return function (dispatch) {
    axios
      .post(Variables.baseEndpoint + "/addIntegrantes", integrantes)
      .then((res) => {
        if (res.status === 200) navigate("/actas/crear/3");
        toast.success("Suscriptores creados con exito!");
        return dispatch({
          type: CREATE_INTEGRANTES,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function createBolsas(bolsa) {
  return function (dispatch) {
    axios
      .post(Variables.baseEndpoint + "/addBolsa", bolsa)
      .then((res) => {
        toast.success(`Bolsa ${res.data.nroPrecinto} creada con exito!`);
        return dispatch({
          type: CREATE_BOLSAS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function createEfecto(efecto) {
  return function (dispatch) {
    axios
      .post(Variables.baseEndpoint + `/addEfecto?bolsa_id=${efecto.bolsa_id}`, efecto)
      .then((res) => {
        toast.success("Elemento creado con exito!");
        let response = res.data;
        response.bolsa_id = efecto.bolsa_id;
        return dispatch({
          type: CREATE_EFECTOS,
          payload: response,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function updateBolsa(state) {
  return function () {
    axios
      .put(Variables.baseEndpoint + "/updateBolsa", state)
      .then((res) => {
        toast.success(`Bolsa ${res.data.nroPrecinto} cerrada con exito!`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function updateActa(observaciones, id, navigate) {
  return async function () {
    axios
      .put(Variables.baseEndpoint + "/updateActa", { observaciones, id })
      .then((res) => {
        navigate("/");
        toast.success(`Acta ${res.data.id} cerrada con exito!`);
        localStorage.setItem("finalActa", JSON.stringify(res.data));
        generateDoc();
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function removeIntegrante(dni) {
  return function () {
    axios
      .delete(Variables.baseEndpoint + "/removeIntegrante/" + dni)
      .then((res) => {
        if (res.status === 200) toast.success("Integrante eliminado con exito!");
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function createBugReport(bugReport) {
  return function () {
    axios
      .post(Variables.baseEndpoint + "/createBugReport", { bugReport })
      .then((res) => {
        if (res.status === 200) toast.success("Bug reportado con exito! Gracias por tu ayuda!");
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getBugsReports() {
  return function (dispatch) {
    axios
      .get(Variables.baseEndpoint + "/getBugsReports")
      .then((res) => {
        return dispatch({
          type: GET_BUGS_REPORTS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function clearStates() {
  return function (dispatch) {
    return dispatch({
      type: CLEAR_STATES,
    });
  };
}
