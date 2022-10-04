import axios from "axios";
import Variables from "../Styles/Variables";

export const GET_ACTAS = "GET_ACTAS";
export const GET_EFECTOS = "GET_EFECTOS";
export const GET_ACTAS_EN_PROCESO = "GET_ACTAS_EN_PROCESO";
export const GET_ACTAS_EN_PROCESO_FILTERED = "GET_ACTAS_EN_PROCESO_FILTERED";

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

export function updateEfecto(acta) {
  console.log(acta);
  return function () {
    axios
      .post(`${Variables.baseEndpoint}/updateEfecto`, { acta })
      .then((res) => {
        if (res.status === 200) {
          console.log("Nueva acta creada con efecto Actualizado!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getActasEnProceso() {
  return function (dispatch) {
    axios
      .get(Variables.baseEndpoint + "/getActas?enproceso=true")
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
  console.log(filtros);
  return function (dispatch) {
    axios
      .get(Variables.baseEndpoint + "/getActas?enproceso=true", { filtros })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
