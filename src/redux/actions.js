import axios from "axios";
//* Utils
import generateDoc from "../Components/Utils/template/generateDoc";
import Variables from "../Styles/Variables";
import { toast } from "react-toastify";

export const GET_ACTAS = "GET_ACTAS";
export const GET_ACTAS_FILTERED = "GET_ACTAS_FILTERED";
export const CREATE_ACTA = "CREATE_ACTA";
export const CREATE_PERITOS = "CREATE_PERITOS";
export const CREATE_INTEGRANTES = "CREATE_INTEGRANTES";
export const CREATE_BOLSAS = "CREATE_BOLSAS";
export const CREATE_EFECTOS = "CREATE_EFECTOS";
export const GET_BUGS_REPORTS = "GET_BUGS_REPORTS";
export const CLEAR_STATES = "CLEAR_STATES";
export const ADMIN = "ADMIN";
export const UPDATE_BOLSAS = "UPDATE_BOLSAS";

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

export function getActasFiltered(filters) {
  return function (dispatch) {
    return dispatch({
      type: GET_ACTAS_FILTERED,
      payload: filters,
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

export function createPeritos(peritos, navigate) {
  return function (dispatch) {
    axios
      .post(Variables.baseEndpoint + "/addPeritos", peritos)
      .then((res) => {
        if (res.status === 200) {
          navigate("/actas/crear/3");
          toast.success("Peritos creados con exito!");
        }
        return dispatch({
          type: CREATE_PERITOS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al crear Peritos");
      });
  };
}

export function createIntegrantes(integrantes, navigate) {
  return function (dispatch) {
    axios
      .post(Variables.baseEndpoint + "/addIntegrantes", integrantes)
      .then((res) => {
        if (res.status === 200) {
          navigate("/actas/crear/4");
          toast.success("Integrantes creados con exito!");
        }
        return dispatch({
          type: CREATE_INTEGRANTES,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al crear Integrantes");
      });
  };
}

export function createBolsas(bolsa) {
  return function (dispatch) {
    axios
      .post(Variables.baseEndpoint + "/addBolsa", bolsa)
      .then((res) => {
        if (res.status === 200) {
          toast.success(`Bolsa ${res.data.nroPrecinto} creada con exito!`);
        }
        return dispatch({
          type: CREATE_BOLSAS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al crear la bolsa");
      });
  };
}

export function createEfecto(efecto, discos, sims, sds, acta_id) {
  return function (dispatch) {
    axios
      .post(Variables.baseEndpoint + `/addEfecto?bolsa_id=${efecto.bolsa_id}`, { efecto, discos, sims, sds })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Efecto creado con exito!");
        }
        return dispatch({
          type: CREATE_EFECTOS,
          payload: res.data,
        });
      })
      .then(() => {
        axios.get(Variables.baseEndpoint + `/getUpdatedBolsas?acta_id=${acta_id}`).then((res) => {
          return dispatch({
            type: UPDATE_BOLSAS,
            payload: res.data,
          });
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error al crear Efecto");
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

export function removePerito(dni) {
  return function () {
    axios
      .delete(Variables.baseEndpoint + "/removePerito/" + dni)
      .then((res) => {
        if (res.status === 200) toast.success("Perito eliminado con exito!");
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

export function admin() {
  return function (dispatch) {
    return dispatch({
      type: ADMIN,
    });
  };
}
