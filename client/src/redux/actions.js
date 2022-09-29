import axios from "axios";
import Variables from "../Styles/Variables";

export const GET_ACTAS = "GET_ACTAS";
export const GET_EFECTOS = "GET_EFECTOS";

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

export function updateEfecto(efecto) {
  return function () {
    axios
      .post(`${Variables.baseEndpoint}/updateEfecto`, { efecto })
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
