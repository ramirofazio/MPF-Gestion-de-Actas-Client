import axios from "axios";
import Variables from "../Styles/Variables";

export const GET_ACTAS = "GET_ACTAS";
export const GET_EFECTOS = "GET_EFECTOS";
export const GET_ACTAS_EN_PROCESO = "GET_ACTAS_EN_PROCESO";
export const GET_ACTAS_EN_PROCESO_FILTERED = "GET_ACTAS_EN_PROCESO_FILTERED";
export const GET_EFECTOS_FROM_ACTA = "GET_EFECTOS_FROM_ACTA";

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

export function getAllEfectos() {
  return function (dispatch) {
    axios
      .get(Variables.baseEndpoint + "/getEfectos")
      .then((res) => {
        return dispatch({
          type: GET_EFECTOS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getEfectosFromActa(id) {
  return function (dispatch) {
    axios
      .get(Variables.baseEndpoint + `/getEfectos/${id}`)
      .then((res) => {
        return dispatch({
          type: GET_EFECTOS_FROM_ACTA,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getActasEnProceso() {
  return function (dispatch) {
    axios
      .get(Variables.baseEndpoint + "/getActas?enProceso=true")
      .then((res) => {
        return dispatch({
          type: GET_ACTAS_EN_PROCESO,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getActasEnProcesoFiltered(filtros) {
  return function (dispatch) {
    const { nroMpf, nroCij, nroDil } = filtros;
    axios
      .get(
        Variables.baseEndpoint +
          `/getActas?enProceso=true&mpf=${nroMpf}&cij=${nroCij}&dil=${nroDil}`
      )
      .then((res) => {
        return dispatch({
          type: GET_ACTAS_EN_PROCESO_FILTERED,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function sendEfectosIdsAndActaId({ actaId, efectosIds }) {
  axios
    .post(Variables.baseEndpoint + "/updateEfecto", { actaId, efectosIds })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  return function (dispatch) {};
}
