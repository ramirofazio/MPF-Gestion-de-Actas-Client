import axios from "axios";
//* Utils
import generateDoc from "../Components/Utils/template/generateDoc";
import editSavedActa from "../Components/Utils/template/editSavedActa";
import Variables from "../Styles/Variables";
import { toast } from "react-toastify";
import {
  GET_ACTAS,
  GET_ACTAS_FILTERED,
  CREATE_ACTA,
  CREATE_INTEGRANTES,
  CREATE_BOLSAS,
  CREATE_EFECTOS,
  GET_BUGS_REPORTS,
  CLEAR_STATES,
  ADMIN,
  CREATE_PERITOS,
  UPDATE_BOLSAS,
  UPDATE_EFECTOS,
  GET_USERS,
  SET_CURRENT_USER,
} from "./variables";

export function EditEfecto(efecto, discos, sims, sds, acta_id) {
  return function (dispatch) {
    axios
      .put(Variables.baseEndpoint + `/editEfecto`, { efecto, discos, sims, sds, acta_id })
      .then((res) => {
        if (res.status === 200) {
          toast.success("¡Elemento editado con exito!");
        }
        return dispatch({
          type: UPDATE_EFECTOS,
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
      });
  };
}

export function removeActa(acta_id) {
  return function (dispatch) {
    axios
      .delete(Variables.baseEndpoint + `/removeActa?acta_id=${acta_id}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success("¡Acta eliminada con exito!");
          return dispatch({
            type: GET_ACTAS,
            payload: res.data,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("¡Error al eliminar Elemento!");
      });
  };
}

export function removeEfecto(efecto_id, acta_id) {
  return function (dispatch) {
    axios
      .delete(Variables.baseEndpoint + `/removeEfecto?efecto_id=${efecto_id}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success("¡Elemento eliminado con exito!");
        }
        return dispatch({
          type: UPDATE_EFECTOS,
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
        toast.error("¡Error al eliminar Elemento!");
      });
  };
}

export function closeProcessActa(acta_id, navigate) {
  return function () {
    axios.put(Variables.baseEndpoint + `/closeProcessActa?acta_id=${acta_id}`).then((res) => {
      if (res.status === 200) {
        setTimeout(() => {
          editSavedActa(res.data.id, navigate, "/actas/crear/4");
        }, 1000);
      }
    });
  };
}

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
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return function (dispatch) {
    axios
      .post(Variables.baseEndpoint + "/addActa", { ...state })
      .then((res) => {
        if (res.status === 200) {
          if (currentUser.username === "admin") {
            navigate("/actas/crear/2");
          } else {
            dispatch(createPeritos([{ ...currentUser, acta_id: res.data.id, id: null }], navigate));
          }

          flag === "MPF/DEN"
            ? toast.success(`¡Acta ${res.data.nro_mpf} creada con exito!`)
            : toast.success(`¡Acta ${res.data.nro_coop} creada con exito!`);
        }
        return dispatch({
          type: CREATE_ACTA,
          payload: { ...res.data, flag },
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("¡Error al crear  acta!");
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
          toast.success("¡Peritos creados con exito!");
        }
        return dispatch({
          type: CREATE_PERITOS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("¡Error al crear Peritos!");
      });
  };
}

export function createIntegrantes(integrantes) {
  return function (dispatch) {
    axios
      .post(Variables.baseEndpoint + "/addIntegrantes", integrantes)
      .then((res) => {
        if (res.status === 200) {
          toast.success("¡Integrantes creados con exito!");
        }
        return dispatch({
          type: CREATE_INTEGRANTES,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("¡Error al crear Integrantes!");
      });
  };
}

export function createBolsas(bolsa) {
  return function (dispatch) {
    axios
      .post(Variables.baseEndpoint + "/addBolsa", bolsa)
      .then((res) => {
        if (res.status === 200) {
          toast.success(`¡Bolsa ${res.data.nroPrecinto} creada con exito!`);
        }
        return dispatch({
          type: CREATE_BOLSAS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("¡Error al crear bolsa!");
      });
  };
}

export function createEfecto(efecto, discos, sims, sds, extracciones, acta_id) {
  return function (dispatch) {
    axios
      .post(Variables.baseEndpoint + `/addEfecto?bolsa_id=${efecto.bolsa_id}`, { efecto, discos, sims, sds, extracciones })
      .then((res) => {
        if (res.status === 200) {
          toast.success("¡Elemento creado con exito!");
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
        toast.error("¡Error al crear Elemento!");
      });
  };
}

export function updateBolsa(state, acta_id) {
  return function (dispatch) {
    axios
      .put(Variables.baseEndpoint + "/updateBolsa", state)
      .then((res) => {
        if (res.status === 200) {
          toast.success(`¡Bolsa ${res.data.nroPrecinto} cerrada con exito!`);
        }
      })
      .then(() => {
        axios.get(Variables.baseEndpoint + `/getUpdatedBolsas?acta_id=${acta_id}`).then((res) => {
          if (res.status === 200) {
            return dispatch({
              type: UPDATE_BOLSAS,
              payload: res.data,
            });
          }
        });
      })
      .then(() => {
        axios.get(Variables.baseEndpoint + `/getActas`).then((res) => {
          if (res.status === 200) {
            const acta = res.data.find((a) => a.id === acta_id);
            return dispatch({
              type: CREATE_ACTA,
              payload: acta,
            });
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function removeBolsa(id, acta_id) {
  return function (dispatch) {
    axios
      .delete(Variables.baseEndpoint + `/removeBolsa?bolsa_id=${id}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success("¡Bolsa eliminada con exito!");
        }
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
        toast.error("¡Error al eliminar Bolsa!");
      });
  };
}

export function updateActa(observaciones, id, navigate) {
  return async function () {
    axios
      .put(Variables.baseEndpoint + "/updateActa", { observaciones, id })
      .then((res) => {
        navigate("/");
        toast.success(`¡Acta_${res.data.nro_mpf || res.data.nro_coop} cerrada con exito!`);
        localStorage.setItem("finalActa", JSON.stringify(res.data));
        generateDoc();
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function removePerito(legajo, id) {
  return function () {
    axios
      .delete(Variables.baseEndpoint + `/removePerito?legajo=${legajo}&id=${id}`)
      .then((res) => {
        if (res.status === 200) toast.success("¡Perito eliminado con exito!");
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function removeIntegrante(legajoOMatricula, id) {
  return function () {
    axios
      .delete(Variables.baseEndpoint + `/removeIntegrante?legajoOMatricula=${legajoOMatricula}&id=${id}`)
      .then((res) => {
        if (res.status === 200) toast.success("¡Integrante eliminado con exito!");
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
        if (res.status === 200) toast.success("¡Bug reportado con exito! Gracias por tu ayuda!");
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

export function getUsers() {
  return function (dispatch) {
    axios.get(Variables.baseEndpoint + "/getUsers").then((res) => {
      if (res.status === 200) {
        return dispatch({
          type: GET_USERS,
          payload: res.data,
        });
      }
    });
  };
}

export function setCurrentUser(currentUser) {
  return function (dispatch) {
    dispatch({
      type: SET_CURRENT_USER,
      payload: currentUser,
    });
  };
}

export function createUsers() {
  return function () {
    axios.post(Variables.baseEndpoint + "/addUser", [
      { id: 1, nombreYApellido: "", legajo: 0, cargo: "", username: "admin", password: "GIDSI12345" },
      { id: 2, nombreYApellido: "Esteban Diego Armando Bucci", legajo: 6004, cargo: "Oficial", username: "ebucci", password: "Ebucci6004" },
      {
        id: 3,
        nombreYApellido: "Federico Martin Palacios",
        legajo: 7069,
        cargo: "Auxiliar",
        username: "fpalacios",
        password: "Fpalacios7069",
      },
      {
        id: 4,
        nombreYApellido: "Pablo Javier Marques",
        legajo: 6330,
        cargo: "Escribiente",
        username: "pmarques",
        password: "Pmarques6330",
      },
      {
        id: 5,
        nombreYApellido: "Leandro Antonio Pollastrini",
        legajo: 6003,
        cargo: "Escribiente",
        username: "lpollastrini",
        password: "Lpollastrini6003",
      },
      {
        id: 6,
        nombreYApellido: "Sabrina Melisa Marzana Mendoza",
        legajo: 8773,
        cargo: "Auxiliar de Servicio",
        username: "smarzana",
        password: "Smarzana8773",
      },
      {
        id: 7,
        nombreYApellido: "Karina Marcela Valdez",
        legajo: 8765,
        cargo: "Auxiliar de Servicio",
        username: "kvaldez",
        password: "Kvaldez8765",
      },
      {
        id: 8,
        nombreYApellido: "Florencia Ailin Alvarez",
        legajo: 8772,
        cargo: "Auxiliar de Servicio",
        username: "falvarez",
        password: "Falvarez8772",
      },
      {
        id: 9,
        nombreYApellido: "Juan Ignacio Burgos",
        legajo: 20381,
        cargo: "",
        username: "jburgos",
        password: "Jburgos20381",
      },
    ]);
  };
}
